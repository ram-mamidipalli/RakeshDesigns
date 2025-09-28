import { Header } from '@/app/components/header';
import { Hero } from '@/app/components/hero';
import { Services } from '@/app/components/services';
import { Footer } from '@/app/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
