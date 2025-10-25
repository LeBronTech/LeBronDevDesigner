
'use client';
import Image from "next/image";
import { ArrowUp, Github, Instagram } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, words]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index, words]);


  return (
      <span className="inline-block relative">
        {text}
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
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            <div className="logo">
              <a href="#home">
                <Image src={placeholderImages.logo.src} width={184} height={40} alt="Lebron Dev-Designer logo" data-ai-hint={placeholderImages.logo['data-ai-hint']} />
              </a>
            </div>
            <nav className="hidden md:flex mainmenu-nav">
              <ul className="primary-menu flex space-x-6">
                <li><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold" href="#home">HOME</a></li>
                <li><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold" href="#sobre">SOBRE</a></li>
                <li><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold" href="#portfolio">PORTFÓLIO</a></li>
                <li><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold" href="#curriculo">CURRÍCULO</a></li>
                <li><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold" href="#depoimentos">DEPOIMENTOS</a></li>
                <li><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold" href="#contacts">CONTATO</a></li>
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
                  <span className="subtitle uppercase tracking-widest gradient-title-animation">Bem-Vindo</span>
                   <h1 className="title text-5xl md:text-6xl font-bold mt-4">
                    <span className="oxanium-font">Lebr{"{"}o{"}"}n Dev-Designer</span>
                  </h1>
                  <h2 className="text-4xl md:text-5xl mt-4 typing-container">
                    <TypingEffect words={["Apps.", "Websites.", "Logos."]} />
                  </h2>
                  <p className="description mt-6 mx-auto lg:mx-0 max-w-xl text-lg text-gray-300">
                    Usamos as mais variadas ferramentas do mercado, para trazer aos nossos clientes a melhor experiência e suporte para seu negócio
                  </p>
                  <div className="flex flex-col lg:flex-row gap-8 mt-8 justify-center lg:justify-start">
                    <div className="social-share-inner-left">
                        <span className="title uppercase text-sm tracking-wider gradient-title-animation">Me siga!</span>
                        <ul className="social-share flex list-none gap-4 mt-4">
                          <li><a href="https://www.behance.net/lebrondesigner1" target="_blank" className="w-16 h-16 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn"><Image src={placeholderImages.behance.src} width={30} height={30} alt="behance" className="filter-primary" /></a></li>
                          <li><a href="https://wa.me/5561984836034" target="_blank" className="w-16 h-16 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn"><Image src={placeholderImages.whatsapp.src} width={30} height={30} alt="whatsapp" className="filter-primary" /></a></li>
                          <li><a href="https://www.instagram.com/lebrondesign" target="_blank" className="w-16 h-16 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn"><Instagram size={30} className="text-primary" /></a></li>
                          <li><a href="https://github.com/LeBronTech" target="_blank" className="w-16 h-16 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn"><Github size={30} className="text-primary" /></a></li>
                        </ul>
                    </div>
                     <div className="flex flex-col lg:flex-row gap-8">
                        <div className="skill-share-inner">
                            <span className="title uppercase text-sm tracking-wider gradient-title-animation">Ferramentas de Design</span>
                            <ul className="skill-share flex flex-wrap list-none gap-4 mt-4">
                            {placeholderImages.tools.design.map(tool => (
                                <li key={tool.alt} className="w-16 h-16 bg-card shadow-lg rounded-lg flex items-center justify-center p-2">
                                  <Image src={tool.src} width={40} height={40} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} className="object-contain" />
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className="skill-share-inner">
                            <span className="title uppercase text-sm tracking-wider gradient-title-animation">Ferramentas de Desenvolvimento</span>
                             <ul className="skill-share flex flex-wrap list-none gap-4 mt-4">
                            {placeholderImages.tools.development.map(tool => (
                                <li key={tool.alt} className="w-16 h-16 bg-card shadow-lg rounded-lg flex items-center justify-center p-2">
                                  <Image src={tool.src} width={40} height={40} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} className="object-contain" />
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                  </div>
              </div>
              <div className="order-1 lg:order-2 relative flex justify-center">
                <div className="thumbnail shadow-lg rounded-lg">
                    <div className="inner">
                        <Image src={placeholderImages.banner.src} width={500} height={500} alt="Personal Portfolio Images" className="rounded-lg w-full" data-ai-hint={placeholderImages.banner['data-ai-hint']}/>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="sobre" className="py-24 section-separator">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <span className="subtitle uppercase tracking-widest gradient-title-animation">Sobre</span>
                <h2 className="text-4xl lg:text-5xl font-bold mt-2">Quem sou eu</h2>
              </div>
          </div>
        </div>

        <div id="portfolio" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Portfólio</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Meu Portfólio</h2>
            </div>
          </div>
        </div>

        <div id="curriculo" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Currículo</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Minhas Habilidades</h2>
            </div>
          </div>
        </div>

        <div id="depoimentos" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Depoimentos</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">O que os clientes dizem</h2>
            </div>
          </div>
        </div>
        
        <div id="contacts" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Contato</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Fale conosco</h2>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 section-separator">
        <div className="container mx-auto px-4 text-center">
            <div className="logo mb-4">
               <a href="#home" className="flex items-center gap-2 justify-center">
                <Image src={placeholderImages.logo.src} width={184} height={40} alt="Lebron Dev-Designer logo" data-ai-hint={placeholderImages.logo['data-ai-hint']} />
              </a>
            </div>
            <p className="description">© 2025. Direitos reservados a <a href="https://github.com/LeBronTech" target="_blank" className="text-primary hover:underline">Lebron Tech</a>.</p>
        </div>
      </footer>

      <div className="backto-top opacity-0 transition-opacity fixed bottom-8 right-8 cursor-pointer">
        <button className="w-16 h-16 flex items-center justify-center rounded-full bg-transparent border-2 border-primary rn-btn">
          <ArrowUp className="text-primary" />
        </button>
      </div>
    </div>
  );
}

