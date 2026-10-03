import {
  SiAutocad,
  SiAutodeskrevit,
  SiSketchup,
  SiTwinmotion,
  SiGooglegemini,
} from "react-icons/si";
import type { ComponentType } from "react";
import { OpenAIIcon, PhotoshopIcon } from "@/components/brand-icons";

export type ToolIcon =
  | { kind: "icon"; Icon: ComponentType<{ className?: string }>; color: string }
  | { kind: "image"; src: string };

export type Tool = { name: string; icon: ToolIcon };

// Icon-kind marks render as currentColor SVGs (white/75, brand color on
// hover). D5 Render and Krea have no vector mark on file, so they use the
// initials SVGs in /public/logos, which are pre-filled white/75.
export const tools: Tool[] = [
  { name: "AutoCAD", icon: { kind: "icon", Icon: SiAutocad, color: "#E51050" } },
  { name: "Revit", icon: { kind: "icon", Icon: SiAutodeskrevit, color: "#186BFF" } },
  { name: "SketchUp", icon: { kind: "icon", Icon: SiSketchup, color: "#005F9E" } },
  {
    name: "Twinmotion",
    // Twinmotion's brand color is black, which disappears on our dark
    // badges — fall back to white so the hover state stays visible.
    icon: { kind: "icon", Icon: SiTwinmotion, color: "#ffffff" },
  },
  { name: "D5 Render", icon: { kind: "image", src: "/logos/d5render.svg" } },
  { name: "Photoshop", icon: { kind: "icon", Icon: PhotoshopIcon, color: "#31A8FF" } },
  // OpenAI's brand color is black — white on hover so it stays visible.
  { name: "ChatGPT", icon: { kind: "icon", Icon: OpenAIIcon, color: "#ffffff" } },
  { name: "Gemini", icon: { kind: "icon", Icon: SiGooglegemini, color: "#8E75B2" } },
  { name: "Krea", icon: { kind: "image", src: "/logos/krea.svg" } },
];
