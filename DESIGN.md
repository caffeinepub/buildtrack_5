# Design Brief

## Direction

Industrial Data System — construction management platform for real-time inventory and financial tracking across multiple project sites, designed for daily use by project managers and finance teams who demand precision and authority.

## Tone

Utilitarian industrial meets enterprise professionalism: no unnecessary decoration, every element serves data clarity. Authoritative without coldness—trustworthy precision.

## Differentiation

Persistent teal accent for live data indicators and warm orange for critical alerts create instant visual grammar for status scanning across dashboards and material tracking screens.

## Color Palette

| Token      | OKLCH       | Role                            |
| ---------- | ----------- | ------------------------------- |
| background | 0.98 0 0    | Clean light canvas              |
| foreground | 0.12 0 0    | High-contrast text              |
| primary    | 0.52 0.19 262 | Teal—data, links, primary action |
| accent     | 0.62 0.23 34  | Warm orange—alerts, warnings    |
| muted      | 0.92 0 0    | Subtle dividers, tertiary text  |
| destructive| 0.58 0.24 25  | Error states, deletions         |

## Typography

- Display: General Sans — geometric, neutral, modern sans-serif for headers and section titles
- Body: Inter — proven legibility at small sizes for dense data tables and forms
- Mono: JetBrains Mono — precision numbers, code, material IDs in inventory tables
- Scale: hero `text-3xl font-semibold`, h2 `text-xl font-semibold`, label `text-sm font-medium`, body `text-sm`

## Elevation & Depth

Zero-rounded cards with subtle elevation shadows (2px and 4px depth) create minimal visual separation; dark borders on input elements signal interactivity; sidebar sits flush with slight border separation.

## Structural Zones

| Zone    | Background            | Border           | Notes                               |
| ------- | --------------------- | ---------------- | ----------------------------------- |
| Header  | bg-card border-b      | 0.93 0 0 1px     | Navigation, project selector       |
| Sidebar | bg-sidebar            | bg-sidebar-border | Persistent nav, collapsible        |
| Content | bg-background         | —                | Alternating bg-muted/30 per section |
| Footer  | bg-muted/10 border-t  | 0.93 0 0 1px     | Legal, support links               |

## Spacing & Rhythm

Grid-based spacing (4px, 8px, 16px, 24px, 32px) with section gaps of 24–32px; dense data tables use 8px vertical spacing; cards maintain 16px padding; material list items 12px padding for compact scanning.

## Component Patterns

- Buttons: Square corners (0.25rem), teal primary, orange danger, grey secondary; hover raises 4px shadow
- Cards: 0.25rem corners, bg-card with elevation-1 shadow, 16px padding, border-muted/20
- Badges: Material status (in-stock=teal, low=orange, urgent=red), 0.25rem corners, font-mono weight 600
- Tables: Row hover bg-muted/20, sticky header, monospace numbers, teal row-select indicators

## Motion

- Entrance: Cards slide-up 0.3s ease on load; lists stagger via `animate-slide-up` with index delay
- Hover: Buttons raise shadow 0.2s smooth; table rows shift bg-muted/30; selects expand with accordion-down
- Live: Real-time values pulse at 2s interval (data-pulse animation) to signal fresh updates

## Constraints

- No gradients or decorative blur—data clarity over visual texture
- Sidebar always visible on desktop (md+), collapsible on mobile
- Charts use chart-1 through chart-5 tokens; no more than 5 series per chart
- All interactive elements must support keyboard navigation; focus rings use primary color

## Signature Detail

Teal vertical accent stripe (4px wide, primary color) on left of material shortage alerts and budget overrun cards signals critical status at a glance without relying on text.


