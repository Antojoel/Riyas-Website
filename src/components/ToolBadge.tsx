"use client";

import { useState } from "react";
import Image from "next/image";
import type { Tool } from "@/data/tools";

export function ToolBadge({ tool }: { tool: Tool }) {
  const { icon } = tool;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span
      className="group flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-paper-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
      style={icon.kind === "icon" ? ({ "--tool-color": icon.color } as React.CSSProperties) : undefined}
    >
      {icon.kind === "icon" ? (
        <icon.Icon className="h-[18px] w-[18px] shrink-0 text-white/75 transition-colors duration-300 group-hover:text-[var(--tool-color)]" />
      ) : imageFailed ? (
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm bg-white/15 text-[10px] font-semibold text-white/75">
          {tool.name.charAt(0)}
        </span>
      ) : (
        <Image
          src={icon.src}
          alt=""
          width={18}
          height={18}
          unoptimized
          onError={() => setImageFailed(true)}
          className="h-[18px] w-[18px] shrink-0"
        />
      )}
      {tool.name}
    </span>
  );
}
