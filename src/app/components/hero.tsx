"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-headphones');

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container my-8">
        <div className="rounded-lg bg-secondary p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
                        Crafting Visuals that Tell Your memories
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        High-quality graphic design services to elevate your brand.
                    </p>
                    <Button size="lg" className="mt-8" onClick={scrollToBooking}>
                        Explore Services
                    </Button>
                </div>
                <div className="relative h-64 md:h-80 w-full">
                    {heroImage && (
                        <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover rounded-lg"
                        priority
                        data-ai-hint={heroImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </div>
    </section>
  );
}
