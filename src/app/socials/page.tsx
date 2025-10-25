
'use client';
import placeholderImages from "../lib/placeholder-images.json";
import ProjectGridPage from "@/components/ProjectGridPage";

export default function SocialsPage() {
  const projects = placeholderImages.portfolio.socials;
  return <ProjectGridPage pageTitle="Redes Sociais" projects={projects} />;
}
