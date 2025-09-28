import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brush, Palette, MonitorSmartphone } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    title: "Logo Design & Identity",
    description: "Crafting unique and memorable logos that define your brand's identity and make a lasting impression.",
    icon: <Brush className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-logo-design'),
  },
  {
    title: "Complete Branding Packages",
    description: "Developing a cohesive brand strategy with style guides, color palettes, and typography that tell your story.",
    icon: <Palette className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-branding'),
  },
  {
    title: "Web & UI/UX Design",
    description: "Designing intuitive and beautiful user interfaces for websites and applications that engage your audience.",
    icon: <MonitorSmartphone className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-web-design'),
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From a single logo to a complete brand overhaul, we offer tailored services to meet your creative needs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              {service.image && (
                <div className="aspect-video overflow-hidden">
                    <Image
                      src={service.image.imageUrl}
                      alt={service.image.description}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                      data-ai-hint={service.image.imageHint}
                    />
                </div>
              )}
              <CardHeader className="flex-row items-start gap-4">
                {service.icon}
                <CardTitle className="mt-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
