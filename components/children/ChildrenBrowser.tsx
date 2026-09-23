"use client";

import { useState } from "react";
import { ChildCard } from "@/components/children/ChildCard";
import { Search } from "@/components/shared/icons";
import type { Child } from "@/lib/children-data";
import { classroom } from "@/lib/feed-data";

interface ChildrenBrowserProps {
  children: Child[];
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function ChildrenBrowser({ children }: ChildrenBrowserProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeText(query);
  const results = children.filter((child) =>
    normalizeText(child.name).includes(normalizedQuery),
  );

  return (
    <div>
      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-border bg-surface px-4 py-3">
        <Search className="shrink-0 text-placeholder-ink" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar niño…"
          className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-[#B6A99B]"
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink">
          SALA {classroom.name.toUpperCase()}
        </span>
        <span className="text-[13px] text-ink-subtle">{children.length} niños</span>
        <span className="h-px flex-1 bg-border-soft" />
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-2">
          {results.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-[14.5px] text-ink-muted">Sin resultados</p>
      )}
    </div>
  );
}
