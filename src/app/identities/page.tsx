
'use client';
import placeholderImages from "../lib/placeholder-images.json";
import ProjectGridPage from "@/components/ProjectGridPage";

export default function IdentitiesPage() {
  const projects = placeholderImages.portfolio.identities;
  return <ProjectGridPage pageTitle="Identidade Visual" projects={projects} />;
}
