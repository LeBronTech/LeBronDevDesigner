
'use client';
import placeholderImages from "../lib/placeholder-images.json";
import ProjectGridPage from "@/components/ProjectGridPage";

export default function WebsitesPage() {
  const projects = placeholderImages.portfolio.websites;
  return <ProjectGridPage pageTitle="Websites" projects={projects} />;
}
