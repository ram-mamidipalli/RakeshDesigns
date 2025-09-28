import { Header } from '@/app/components/header';
import { Hero } from '@/app/components/hero';
import { ScrollingText } from '@/app/components/scrolling-text';
import { Services } from '@/app/components/services';
import { InstagramCta } from '@/app/components/instagram-cta';
import { Footer } from '@/app/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <ScrollingText />
        <Services />
        <InstagramCta />
      </main>
      <Footer />
    </div>
  );
}
