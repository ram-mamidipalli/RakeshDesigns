"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Frame, Disc, Cake, Droplets } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    title: "Flex Designing",
    description: "Professional flex designs for your business advertising.",
    price: "₹300 (design only)",
    icon: <Layers className="h-8 w-8 text-primary" />,
  },
  {
    title: "Photoframes",
    description: "Custom photoframe designs to cherish your memories.",
    price: "₹500 - ₹3000 (based on size)",
    icon: <Frame className="h-8 w-8 text-primary" />,
  },
  {
    title: "CDPs",
    description: "Creative Common Display Pictures for your social profiles.",
    price: "₹300",
    icon: <Disc className="h-8 w-8 text-primary" />,
  },
  {
    title: "Social Media Posters",
    description: "Eye-catching posters for birthdays and social media campaigns.",
    price: "₹250",
    icon: <Cake className="h-8 w-8 text-primary" />,
  },
  {
    title: "Color Correction",
    description: "Professional color correction to make your photos pop.",
    price: "₹200",
    icon: <Droplets className="h-8 w-8 text-primary" />,
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
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col transition-all hover:shadow-xl rounded-lg bg-card">
              <div className="p-6 flex flex-col flex-1">
                <CardHeader className="flex-row items-center gap-4 p-0">
                  {service.icon}
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 py-4 px-0">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-0 pt-4">
                  <p className="text-2xl font-bold">{service.price}</p>
                  <Button onClick={() => handleServiceClick(service.title)} className="w-full">
                    Book a Service
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
