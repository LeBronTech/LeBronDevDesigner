import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern, scalable e-commerce solution with a focus on user experience and performance.',
    tags: ['HTML', 'CSS', 'JS', 'React'],
  },
  {
    id: 'project-2',
    title: 'Creative Agency Site',
    description: 'A visually-driven portfolio website for a design agency, featuring fluid animations.',
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    id: 'project-3',
    title: 'Fintech Mobile App',
    description: 'A sleek and secure mobile banking application for seamless financial management.',
    tags: ['React Native', 'TypeScript'],
  },
  {
    id: 'project-4',
    title: 'SaaS Dashboard',
    description: 'An intuitive data visualization dashboard for a business intelligence platform.',
    tags: ['Vue.js', 'D3.js', 'Node.js'],
  },
];

export default function Portfolio() {
  const portfolioImages = PlaceHolderImages.filter(img => img.id.startsWith('project-'));

  return (
    <section id="portfolio" className="w-full py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Portfolio</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-foreground/80 md:text-xl">
            A selection of my work. See how I solve problems and create value.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => {
            const image = portfolioImages.find(img => img.id === project.id) || portfolioImages[index];
            return (
            <Card key={project.title} className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              {image && (
                <div className="relative h-60 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{project.title}</CardTitle>
                <CardDescription className="text-base text-foreground/70">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
}
