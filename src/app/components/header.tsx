"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="https://res.cloudinary.com/dcstgair1/image/upload/v1759033670/rakesh_logo_2_kubzqw.png" 
              alt="Rakesh Designs Logo" 
              width={128} 
              height={32} 
              className="h-8 w-auto"
            />
          </Link>
        </div>
        
        <nav className="hidden items-center justify-center flex-1 text-sm md:flex">
          <button onClick={() => scrollTo("services")} className="transition-colors hover:text-foreground/80 text-foreground/60">
            Services
          </button>
        </nav>

        <div className="flex items-center justify-end">
          <Button onClick={() => scrollTo("services")}>Book a Service</Button>
        </div>
      </div>
    </header>
  );
}
