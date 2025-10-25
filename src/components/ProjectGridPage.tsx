
'use client';
import Image from "next/image";
import Link from "next/link";
import { ProjectModal } from "@/components/ProjectModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  src: string;
  title: string;
  description: string;
  'data-ai-hint'?: string;
  category?: string;
}

interface ProjectGridPageProps {
  pageTitle: string;
  projects: Project[];
}

const SkeletonCard = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-60 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardContent>
    </Card>
);

export default function ProjectGridPage({ pageTitle, projects }: ProjectGridPageProps) {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const scrollPos = sessionStorage.getItem('scrollPosition');
    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos));
      sessionStorage.removeItem('scrollPosition');
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    sessionStorage.setItem('scrollPositionMain', window.scrollY.toString());
    window.history.back();
  };

  const categories = useMemo(() => {
    if (!projects) return [];
    const cats = new Set(projects.map(p => p.category).filter(Boolean));
    return ['Todos', ...Array.from(cats)];
  }, [projects]);


  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeFilter === 'Todos') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);


  if (!projects) {
    return (
        <div className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto px-4 py-16">
             <div className="flex items-center mb-12">
                <Button variant="outline" size="icon" onClick={handleBackClick}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-4xl font-bold ml-4">{pageTitle}</h1>
            </div>
            <p>Nenhum projeto encontrado.</p>
          </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center mb-8">
            <Button variant="outline" size="icon" onClick={handleBackClick}>
                <ArrowLeft />
            </Button>
            <h1 className="text-4xl font-bold ml-4">{pageTitle}</h1>
        </div>
        
        {categories.length > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeFilter === category ? 'default' : 'outline'}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading 
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            : filteredProjects.map((project, index) => (
                <ProjectModal project={project} key={index}>
                  <Card className="cursor-pointer hover:scale-105 transition-transform duration-300">
                    <CardHeader>
                      <Image src={project.src} alt={project.title} width={400} height={300} className="rounded-t-lg object-cover h-60 w-full" data-ai-hint={project['data-ai-hint']} />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{project.title}</CardTitle>
                      {project.description && <p className="mt-2 text-gray-400">{project.description}</p>}
                       {!project.description && <p className="mt-2 text-gray-400">Clique na Imagem para ver</p>}
                    </CardContent>
                  </Card>
                </ProjectModal>
              ))}
        </div>
      </div>
    </div>
  );
}
