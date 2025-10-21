import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Portfolio from '@/components/sections/portfolio';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import AISuggester from '@/components/sections/ai-suggester';
import ContactForm from '@/components/sections/contact-form';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <AISuggester />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
