"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Frame, Disc, Cake, Droplets } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    title: "Flex Designing",
    description: "Professional flex designs for your business advertising. Price: ₹300 (design only).",
    icon: <Layers className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-flex-design'),
  },
  {
    title: "Photoframes",
    description: "Custom photoframe designs to cherish your memories. Price: ₹500 - ₹3000 (based on size).",
    icon: <Frame className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-photoframes'),
  },
  {
    title: "CDPs",
    description: "Creative Common Display Pictures for your social profiles. Price: ₹300.",
    icon: <Disc className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-cdps'),
  },
  {
    title: "Social Media Posters",
    description: "Eye-catching posters for birthdays and social media campaigns. Price: ₹250.",
    icon: <Cake className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-posters'),
  },
  {
    title: "Color Correction",
    description: "Professional color correction to make your photos pop. Price: ₹200.",
    icon: <Droplets className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(p => p.id === 'service-color-correction'),
  },
];

export function Services() {
  const handleServiceClick = (serviceTitle: string) => {
    const message = `Hello! I'm interested in your "${serviceTitle}" service. Please provide more details.`;
    const whatsappUrl = `https://wa.me/+918978015826?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From a single logo to a complete brand overhaul, we offer tailored services to meet your creative needs. Click a service to get in touch.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <Card key={service.title} onClick={() => handleServiceClick(service.title)} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
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
              <CardContent className="flex-1 pt-0">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
