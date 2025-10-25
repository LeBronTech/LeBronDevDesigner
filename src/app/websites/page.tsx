
'use client';
import Image from "next/image";
import Link from "next/link";
import placeholderImages from "../lib/placeholder-images.json";
import { ProjectModal } from "@/components/ProjectModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WebsitesPage() {
  const projects = placeholderImages.portfolio.websites;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center mb-12">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-4xl font-bold ml-4">Websites</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectModal project={project} key={index}>
              <Card className="cursor-pointer hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <Image src={project.src} alt={project.title} width={400} height={300} className="rounded-t-lg object-cover h-60 w-full" data-ai-hint={project['data-ai-hint']} />
                </CardHeader>
                <CardContent>
                  <CardTitle>{project.title}</CardTitle>
                   <p className="mt-2 text-gray-400">Clique na Imagem para ver</p>
                </CardContent>
              </Card>
            </ProjectModal>
          ))}
        </div>
      </div>
    </div>
  );
}
