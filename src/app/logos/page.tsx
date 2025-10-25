
'use client';
import placeholderImages from "../lib/placeholder-images.json";
import ProjectGridPage from "@/components/ProjectGridPage";

export default function LogosPage() {
  const projects = placeholderImages.portfolio.logos;
  return <ProjectGridPage pageTitle="Logos" projects={projects} />;
}
