import {
  SiSketchup,
  SiTwinmotion,
  SiGooglegemini,
} from "react-icons/si";
import type { ComponentType, CSSProperties } from "react";
import { OpenAIIcon } from "@/components/brand-icons";

export type ToolIcon =
  | { kind: "icon"; Icon: ComponentType<{ className?: string; style?: CSSProperties }>; color: string }
  | { kind: "image"; src: string };

export type Tool = { name: string; icon: ToolIcon };

// Original brand marks in their own colors. Icon-kind ones are vector icons
// tinted with the brand color (OpenAI and Twinmotion are black by brand, so
// they're white to stay visible on the dark glass); image-kind ones are the
// official logo files in /public/logos.
export const tools: Tool[] = [
  { name: "AutoCAD", icon: { kind: "image", src: "/logos/autocad.svg" } },
  { name: "Revit", icon: { kind: "image", src: "/logos/revit.png" } },
  { name: "SketchUp", icon: { kind: "icon", Icon: SiSketchup, color: "#005F9E" } },
  {
    name: "Twinmotion",
    icon: { kind: "icon", Icon: SiTwinmotion, color: "#ffffff" },
  },
  { name: "D5 Render", icon: { kind: "image", src: "/logos/d5render.svg" } },
  { name: "Photoshop", icon: { kind: "image", src: "/logos/photoshop.svg" } },
  { name: "ChatGPT", icon: { kind: "icon", Icon: OpenAIIcon, color: "#ffffff" } },
  { name: "Gemini", icon: { kind: "icon", Icon: SiGooglegemini, color: "#8E75B2" } },
  { name: "Krea", icon: { kind: "image", src: "/logos/krea.png" } },
];
