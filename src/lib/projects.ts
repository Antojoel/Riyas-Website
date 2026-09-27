import raw from "@/data/projects.generated.json";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  group: string;
  category: "render" | "plan";
  isPortrait: boolean;
};

export type Project = {
  slug: string;
  name: string;
  order: number;
  cover: ProjectImage;
  groups: string[];
  images: ProjectImage[];
};

export const projects = raw as Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
