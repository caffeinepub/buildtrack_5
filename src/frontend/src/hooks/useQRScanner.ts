import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QRResult {
  data: string;
  timestamp: number;
}

export interface QRScannerConfig {
  facingMode?: "user" | "environment";
  scanInterval?: number;
  maxResults?: number;
}

export interface CameraError {
  message: string;
  code?: string;
}

// jsQR type stub (loaded dynamically from CDN)
type JsQR = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
) => { data: string } | null;

declare global {
  interface Window {
    jsQR?: JsQR;
  }
}

const JSQR_CDN = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useQRScanner(config: QRScannerConfig = {}) {
  const {
    facingMode = "environment",
    scanInterval = 150,
    maxResults = 5,
  } = config;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [qrResults, setQrResults] = useState<QRResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jsQRLoaded, setJsQRLoaded] = useState(!!window.jsQR);
  const [error, setError] = useState<CameraError | null>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [currentFacingMode, setCurrentFacingMode] = useState<
    "user" | "environment"
  >(facingMode);

  // Check support
  useEffect(() => {
    setIsSupported(
      typeof navigator !== "undefined" &&
        !!navigator.mediaDevices &&
        !!navigator.mediaDevices.getUserMedia,
    );
  }, []);

  // Load jsQR from CDN
  useEffect(() => {
    if (window.jsQR) {
      setJsQRLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = JSQR_CDN;
    script.async = true;
    script.onload = () => setJsQRLoaded(true);
    script.onerror = () =>
      setError({
        message: "Failed to load QR decoder. Check your connection.",
      });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const stopScanning = useCallback(async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setIsActive(false);
  }, []);

  const startScanning = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;
    setIsLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      setIsScanning(true);

      intervalRef.current = setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !window.jsQR || video.readyState < 2) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = window.jsQR(
          imageData.data,
          imageData.width,
          imageData.height,
        );
        if (code) {
          setQrResults((prev) => {
            // Deduplicate within 2s
            const isDupe = prev.some(
              (r) => r.data === code.data && Date.now() - r.timestamp < 2000,
            );
            if (isDupe) return prev;
            return [{ data: code.data, timestamp: Date.now() }, ...prev].slice(
              0,
              maxResults,
            );
          });
        }
      }, scanInterval);

      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Camera access denied";
      setError({ message, code: "CAMERA_ERROR" });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, currentFacingMode, scanInterval, maxResults]);

  const switchCamera = useCallback(async (): Promise<boolean> => {
    await stopScanning();
    setCurrentFacingMode((m) => (m === "user" ? "environment" : "user"));
    return true;
  }, [stopScanning]);

  const clearResults = useCallback(() => setQrResults([]), []);

  const reset = useCallback(async () => {
    await stopScanning();
    setQrResults([]);
    setError(null);
  }, [stopScanning]);

  const retry = useCallback(async (): Promise<boolean> => {
    await reset();
    return startScanning();
  }, [reset, startScanning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  const isReady = (isSupported ?? false) && jsQRLoaded;
  const canStartScanning = isReady && !isLoading && !isScanning;

  return {
    qrResults,
    isScanning,
    jsQRLoaded,
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    startScanning,
    stopScanning,
    switchCamera,
    clearResults,
    reset,
    retry,
    videoRef,
    canvasRef,
    isReady,
    canStartScanning,
  };
}
