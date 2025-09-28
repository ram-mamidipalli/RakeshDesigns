"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 max-w-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
          Transforming Ideas into Visual Masterpieces
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
          Rakesh Designs - Your partner in creative, professional graphic design. Let's build your brand's future, today.
        </p>
        <Button size="lg" className="mt-8" onClick={scrollToBooking}>
          Book a Consultation
        </Button>
      </div>
    </section>
  );
}
