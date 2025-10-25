
'use client';
import placeholderImages from "../lib/placeholder-images.json";
import ProjectGridPage from "@/components/ProjectGridPage";

export default function AppsPage() {
  const projects = placeholderImages.portfolio.apps;
  return <ProjectGridPage pageTitle="Apps" projects={projects} />;
}
