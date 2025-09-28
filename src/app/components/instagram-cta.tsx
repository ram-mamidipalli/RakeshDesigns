import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export function InstagramCta() {
  return (
    <section className="container my-16 md:my-24">
      <div className="rounded-lg bg-secondary p-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          See Our Work in Action
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Follow us on Instagram to see our latest designs, behind-the-scenes content, and client features.
        </p>
        <a href="https://www.instagram.com/rakesh_designs_03/" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="mt-8">
            <Instagram className="mr-2 h-5 w-5" />
            Follow on Instagram
          </Button>
        </a>
      </div>
    </section>
  );
}
