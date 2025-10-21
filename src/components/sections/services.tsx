import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CodeXml, Palette, ServerCog } from 'lucide-react';

const services = [
  {
    icon: <CodeXml className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'Building responsive, high-performance websites and applications with modern technologies like HTML, CSS, and JavaScript.',
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: 'Graphic Design',
    description: 'Creating visually compelling brand identities, logos, and marketing materials that capture attention and communicate effectively.',
  },
  {
    icon: <ServerCog className="h-10 w-10 text-primary" />,
    title: 'IT Solutions',
    description: 'Providing robust IT infrastructure support, network management, and custom software solutions to streamline your business operations.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full bg-secondary/50 py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Services</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-foreground/80 md:text-xl">
            Offering a range of services to help your business succeed online and offline.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex transform flex-col items-center p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <CardHeader className="items-center p-0">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="mb-2 text-2xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-base text-foreground/70">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
