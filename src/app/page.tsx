
'use client';
import Image from "next/image";
import { ArrowUp, Behance, Github, Instagram, Layout, Smartphone, Slack } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';
import { cn } from "@/lib/utils";

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[index];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? 100 : 150);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
      <span className="inline-block relative">
        {text}
        <span className="absolute top-0 right-0 -mr-1 w-0.5 h-full bg-primary animate-ping"></span>
      </span>
  );
};


export default function Home() {
  
  useEffect(() => {
    const backToTop = document.querySelector('.backto-top');
    if (backToTop) {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          backToTop.classList.add('opacity-100');
          backToTop.classList.remove('opacity-0');
        } else {
          backToTop.classList.remove('opacity-100');
          backToTop.classList.add('opacity-0');
        }
      };
      
      window.addEventListener('scroll', handleScroll);

      const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      backToTop.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        backToTop.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            <div className="logo">
              <a href="#home" className="flex items-center gap-2">
                <span className="text-3xl font-bold oxanium-font gradient-text">Lebr{"{"}o{"}"}n</span>
                <span className="text-sm tracking-widest uppercase">Dev<br/>Designer</span>
              </a>
            </div>
            <nav className="hidden md:flex mainmenu-nav">
              <ul className="primary-menu flex space-x-6">
                <li><a className="nav-link smoth-animation" href="#home">HOME</a></li>
                <li><a className="nav-link smoth-animation" href="#sobre">SOBRE</a></li>
                <li><a className="nav-link smoth-animation" href="#portfolio">PORTFÓLIO</a></li>
                <li><a className="nav-link smoth-animation" href="#curriculo">CURRÍCULO</a></li>
                <li><a className="nav-link smoth-animation" href="#depoimentos">DEPOIMENTOS</a></li>
                <li><a className="nav-link smoth-animation" href="#contacts">CONTATO</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-page-wrapper">
        <div id="home" className="min-h-screen flex items-center justify-center section-separator relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 text-center lg:text-left">
                  <span className="subtitle uppercase tracking-widest text-primary">Bem-Vindo</span>
                  <h1 className="title text-5xl md:text-6xl font-bold mt-4">
                    Somos a <span className="oxanium-font gradient-text">Lebr{"{"}o{"}"}n Dev-Designer</span>
                  </h1>
                  <h2 className="text-4xl md:text-5xl mt-4 typing-container">
                    <TypingEffect words={["Apps.", "Websites.", "Logos."]} />
                  </h2>
                  <p className="description mt-6 mx-auto lg:mx-0 max-w-xl text-lg text-gray-300">
                    Usamos as mais variadas ferramentas do mercado, para trazer aos nossos clientes a melhor experiência e suporte para seu negócio
                  </p>
                  <div className="flex flex-col lg:flex-row gap-8 mt-8 justify-center lg:justify-start">
                    <div className="social-share-inner-left">
                        <span className="title uppercase text-sm tracking-wider gradient-text">Siga-nos</span>
                        <ul className="social-share flex list-none gap-4 mt-4">
                            <li><a href="https://www.behance.net/lebrondesigner1" target="_blank" className="rn-btn"><Image src={placeholderImages.behance.src} width={24} height={24} alt="behance" /></a></li>
                            <li><a href="https://wa.me/5561984836034" target="_blank" className="rn-btn"><Image src={placeholderImages.whatsapp.src} width={24} height={24} alt="whatsapp" /></a></li>
                            <li><a href="https://www.instagram.com/lebrondesign" target="_blank" className="rn-btn"><Instagram /></a></li>
                            <li><a href="https://github.com/LeBronTech" target="_blank" className="rn-btn"><Github /></a></li>
                        </ul>
                    </div>
                     <div className="skill-share-inner">
                        <span className="title uppercase text-sm tracking-wider gradient-text">Ferramentas que usamos</span>
                        <ul className="skill-share flex flex-wrap list-none gap-4 mt-4">
                          {placeholderImages.tools.map(tool => (
                            <li key={tool.alt}><Image src={tool.src} width={30} height={30} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} /></li>
                          ))}
                        </ul>
                    </div>
                  </div>
              </div>
              <div className="order-1 lg:order-2 relative flex justify-center">
                <div className="thumbnail style-2">
                    <div className="inner">
                        <Image src={placeholderImages.banner.src} width={500} height={500} alt="Personal Portfolio Images" className="rounded-full w-full" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="sobre" className="py-24 section-separator">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <span className="text-primary uppercase tracking-widest">Sobre</span>
                <h2 className="text-4xl lg:text-5xl font-bold mt-2 gradient-text">Quem sou eu</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
                 {/* About content will be added here */}
              </div>
          </div>
        </div>

        <div id="portfolio" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">Portfólio</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 gradient-text">Meu Portfólio</h2>
            </div>
            {/* Portfolio content will be added here */}
          </div>
        </div>

        <div id="curriculo" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">Currículo</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 gradient-text">Minhas Habilidades</h2>
            </div>
             {/* Resume and Skills content will be added here */}
          </div>
        </div>

        <div id="depoimentos" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">Depoimentos</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 gradient-text">O que os clientes dizem</h2>
            </div>
             {/* Testimonials content will be added here */}
          </div>
        </div>
        
        <div id="contacts" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">Contato</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 gradient-text">Fale conosco</h2>
            </div>
             {/* Contact form will be added here */}
          </div>
        </div>

      </main>

      <footer className="py-8 section-separator">
        <div className="container mx-auto px-4 text-center">
            <div className="logo mb-4">
               <a href="#home" className="flex items-center gap-2 justify-center">
                <span className="text-3xl font-bold oxanium-font gradient-text">Lebr{"{"}o{"}"}n</span>
              </a>
            </div>
            <p className="description">© 2025. Direitos reservados a <a href="https://github.com/LeBronTech" target="_blank" className="text-primary hover:underline">Lebron Tech</a>.</p>
        </div>
      </footer>

      <div className="backto-top opacity-0 transition-opacity fixed bottom-8 right-8 cursor-pointer">
        <div className="rn-btn">
          <ArrowUp />
        </div>
      </div>
    </div>
  );
}
