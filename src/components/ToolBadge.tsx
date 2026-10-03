"use client";

import { useState } from "react";
import Image from "next/image";
import type { Tool } from "@/data/tools";

export function ToolBadge({ tool }: { tool: Tool }) {
  const { icon } = tool;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className="group flex items-center gap-2.5 rounded-xl border border-accent/35 bg-white/[0.04] px-3.5 py-2 text-sm text-paper backdrop-blur-md transition-all duration-300 [box-shadow:inset_0_0_14px_rgba(226,0,15,0.28),inset_0_1px_0_rgba(255,255,255,0.1),0_0_18px_rgba(226,0,15,0.14)] hover:-translate-y-0.5 hover:border-accent/70 hover:[box-shadow:inset_0_0_18px_rgba(226,0,15,0.42),inset_0_1px_0_rgba(255,255,255,0.14),0_0_24px_rgba(226,0,15,0.3)]">
      {icon.kind === "icon" ? (
        <icon.Icon className="h-5 w-5 shrink-0" style={{ color: icon.color }} />
      ) : imageFailed ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/15 text-[11px] font-semibold text-paper">
          {tool.name.charAt(0)}
        </span>
      ) : (
        <Image
          src={icon.src}
          alt=""
          width={20}
          height={20}
          unoptimized
          onError={() => setImageFailed(true)}
          className="h-5 w-5 shrink-0 rounded-[5px] object-contain"
        />
      )}
      {tool.name}
    </span>
  );
}
