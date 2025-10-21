import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Jane Doe',
    title: 'CEO, Innovate Inc.',
    quote: "LeBron Digital Hub transformed our online presence. Their attention to detail and creative solutions were outstanding. We've seen a significant increase in engagement since the relaunch.",
  },
  {
    id: 'testimonial-2',
    name: 'John Smith',
    title: 'Marketing Director, Solutions Co.',
    quote: "Working with Leandro was a breeze. He understood our vision perfectly and delivered a product that exceeded our expectations. Highly professional and skilled.",
  },
  {
    id: 'testimonial-3',
    name: 'Emily White',
    title: 'Founder, Creative Startup',
    quote: 'The design work was top-notch, capturing the essence of our brand. The entire process was collaborative and efficient. I couldn\'t be happier with the result.',
  },
];

export default function Testimonials() {
  const testimonialImages = PlaceHolderImages.filter(img => img.id.startsWith('testimonial-'));

  return (
    <section id="testimonials" className="w-full py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What My Clients Say</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-foreground/80 md:text-xl">
            Real feedback from satisfied partners.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const image = testimonialImages.find(img => img.id === testimonial.id) || testimonialImages[index];
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4">
                      <Card className="h-full shadow-lg">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                          <p className="mb-6 text-lg italic text-foreground/80">"{testimonial.quote}"</p>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              {image && <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />}
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
