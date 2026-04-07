import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { Column, SortState } from "../../types";

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  rowKey?: (row: T) => string;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  onRowClick?: (row: T) => void;
  "data-ocid"?: string;
}

export function DataTable<T extends object>({
  columns,
  data,
  isLoading,
  rowKey,
  searchable,
  searchKeys = [],
  onRowClick,
  "data-ocid": ocid,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(null);
  const [query, setQuery] = useState("");

  const toggleSort = (key: string) => {
    setSort((prev) =>
      !prev || prev.key !== key
        ? { key, dir: "asc" }
        : prev.dir === "asc"
          ? { key, dir: "desc" }
          : null,
    );
  };

  const filtered =
    searchable && query
      ? data.filter((row) =>
          searchKeys.some((k) =>
            String((row as Record<keyof T, unknown>)[k] ?? "")
              .toLowerCase()
              .includes(query.toLowerCase()),
          ),
        )
      : data;

  const sorted = sort
    ? [...filtered].sort((a, b) => {
        const ar = a as Record<string, unknown>;
        const br = b as Record<string, unknown>;
        const av = ar[sort.key] ?? "";
        const bv = br[sort.key] ?? "";
        const cmp = String(av).localeCompare(String(bv), undefined, {
          numeric: true,
        });
        return sort.dir === "asc" ? cmp : -cmp;
      })
    : filtered;

  return (
    <div className="flex flex-col gap-2" data-ocid={ocid}>
      {searchable && (
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs h-8 text-sm rounded-none"
          data-ocid={ocid ? `${ocid}-search` : undefined}
        />
      )}
      <div className="border border-border overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() =>
                    col.sortable ? toggleSort(String(col.key)) : undefined
                  }
                  onKeyDown={(e) =>
                    col.sortable && (e.key === "Enter" || e.key === " ")
                      ? toggleSort(String(col.key))
                      : undefined
                  }
                  role={col.sortable ? "button" : undefined}
                  tabIndex={col.sortable ? 0 : undefined}
                  className={`px-3 py-2 text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap select-none ${col.sortable ? "cursor-pointer hover:text-foreground" : ""} ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable &&
                      (sort?.key === String(col.key) ? (
                        sort.dir === "asc" ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-3 h-3 opacity-40" />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no stable key
                  <tr key={i} className="border-b border-border">
                    {columns.map((col) => (
                      <td key={String(col.key)} className="px-3 py-2">
                        <Skeleton className="h-4 w-full rounded-none" />
                      </td>
                    ))}
                  </tr>
                ))
              : sorted.map((row, i) => {
                  const k = rowKey ? rowKey(row) : String(i);
                  return (
                    <tr
                      key={k}
                      data-ocid={ocid ? `${ocid}-row` : undefined}
                      onClick={() => onRowClick?.(row)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        onRowClick?.(row)
                      }
                      role={onRowClick ? "button" : undefined}
                      tabIndex={onRowClick ? 0 : undefined}
                      className={`border-b border-border last:border-0 hover:bg-muted/40 transition-colors duration-150 ${onRowClick ? "cursor-pointer" : ""}`}
                    >
                      {columns.map((col) => (
                        <td
                          key={String(col.key)}
                          className={`px-3 py-2 text-foreground ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}
                        >
                          {col.render
                            ? col.render(row)
                            : String(
                                (row as Record<string, unknown>)[
                                  col.key as string
                                ] ?? "",
                              )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
            {!isLoading && sorted.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-muted-foreground text-sm"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {sorted.length} record{sorted.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
