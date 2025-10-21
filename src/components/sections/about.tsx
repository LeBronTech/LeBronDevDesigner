import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-leandro');

  return (
    <section id="about" className="w-full bg-secondary/50 py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
        </div>
        <div className="mt-12">
          <Card className="overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative h-80 w-full md:h-full">
                {aboutImage && (
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    layout="fill"
                    objectFit="cover"
                    className="md:rounded-l-lg md:rounded-r-none"
                    data-ai-hint={aboutImage.imageHint}
                  />
                )}
              </div>
              <div className="p-8 md:col-span-2">
                <h3 className="mb-4 text-2xl font-bold text-primary">Leandro José</h3>
                <p className="mb-4 text-lg text-foreground/80">
                  I'm a passionate and results-driven web professional with over a decade of experience in the digital landscape. My journey began with a simple "Hello, World!" and has since evolved into a career dedicated to building beautiful, functional, and user-centric digital experiences.
                </p>
                <p className="mb-4 text-lg text-foreground/80">
                  My philosophy is simple: technology should serve people. I strive to create solutions that are not only technically excellent but also intuitive and enjoyable to use. Whether it's a complex web application or a clean-cut brand identity, I am committed to delivering quality that exceeds expectations.
                </p>
                <p className="text-lg text-foreground/80">
                  Let's collaborate to bring your vision to life.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
