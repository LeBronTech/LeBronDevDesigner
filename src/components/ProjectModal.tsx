
'use client';
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const ProjectModal = ({ project, children }: { project: any, children: React.ReactNode }) => (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{project.title}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1">
                     <Carousel className="w-full">
                        <CarouselContent>
                            {project.modalImages?.map((image: any, index: number) => (
                                <CarouselItem key={index}>
                                    <Image
                                        src={image.src}
                                        alt={`${project.title} - imagem ${index + 1}`}
                                        width={800}
                                        height={600}
                                        className="rounded-lg object-cover w-full h-auto"
                                        data-ai-hint={image['data-ai-hint']}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                 <div className="md:col-span-1 flex flex-col justify-center">
                    <DialogDescription className="mb-4">{project.description}</DialogDescription>
                    <div className="info-list mb-4">
                        <ul>
                            <li><strong>Cliente:</strong> <span>{project.client}</span></li>
                            <li><strong>Serviços:</strong> <span>{project.services}</span></li>
                        </ul>
                    </div>
                     <div className="mb-4">
                        <h4 className="font-semibold mb-2">Ferramentas:</h4>
                        <ul className="flex flex-wrap gap-2">
                             {project.tools.map((tool: any, index: number) => (
                                <li key={index} className="w-10 h-10 bg-card-foreground/10 rounded-md flex items-center justify-center p-1">
                                    <Image src={tool.src} width={24} height={24} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button asChild className="w-full mt-auto">
                        <Link href={project.url} target="_blank">
                            Ver projeto <ArrowUp className="w-4 h-4 ml-2 transform rotate-45" />
                        </Link>
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
);
