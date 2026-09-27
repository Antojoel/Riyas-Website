"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionNavigate must be used within TransitionProvider");
  }
  return ctx.navigate;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const pendingHref = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (phase !== "idle") return;
      pendingHref.current = href;
      setPhase("in");
    },
    [phase]
  );

  function handleCoverComplete() {
    if (pendingHref.current) {
      router.push(pendingHref.current);
      pendingHref.current = null;
    }
    // give the new route a beat to paint behind the curtain
    requestAnimationFrame(() => {
      setTimeout(() => setPhase("out"), 150);
    });
  }

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {phase !== "idle" && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: phase === "in" ? "0%" : "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (phase === "in") handleCoverComplete();
            if (phase === "out") setPhase("idle");
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
        >
          <span className="font-display text-2xl tracking-wide text-paper">
            Riyas<span className="text-accent">.</span>
          </span>
        </motion.div>
      )}
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const navigate = useTransitionNavigate();
  const pathname = usePathname();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (href === pathname) {
          e.preventDefault();
          return;
        }
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
