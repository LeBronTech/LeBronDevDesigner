
'use client';
import Image from "next/image";
import { ArrowUp, Behance, Github, Instagram, Linkedin, MessageCircle, Layout, Smartphone, Slack } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWord, setCurrentWord] = useState('');

  useEffect(() => {
    if (index >= words.length) return; 

    if (isDeleting) {
      if (subIndex > 0) {
        const timer = setTimeout(() => {
          setSubIndex(subIndex - 1);
          setCurrentWord(words[index].substring(0, subIndex - 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }

    if (subIndex < words[index].length) {
      const timer = setTimeout(() => {
        setSubIndex(subIndex + 1);
        setCurrentWord(words[index].substring(0, subIndex + 1));
      }, 150);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIsDeleting(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [subIndex, isDeleting, index, words]);

  return (
    <span className="inline-block relative">
      {currentWord}
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

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      return () => window.removeEventListener('scroll', handleScroll);
    }

  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            <div className="logo">
              <a href="#home" className="flex items-center gap-2">
                <span className="text-3xl font-bold font-oxanium gradient-text">Lebr{"{"}o{"}"}n</span>
                <span className="text-sm tracking-widest">DEV<br/>DESIGNER</span>
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
                  <span className="subtitle">Bem-Vindo</span>
                  <h1 className="title">
                    Somos a <span className="oxanium-font gradient-text">Lebr{"{"}o{"}"}n Dev-Designer</span>
                  </h1>
                  <h2 className="text-4xl md:text-5xl mt-4 typing-container">
                    <TypingEffect words={["Apps.", "Websites.", "Logos."]} />
                  </h2>
                  <p className="description mt-6 mx-auto lg:mx-0">
                    Usamos as mais variadas ferramentas do mercado, para trazer aos nossos clientes a melhor experiência e suporte para seu negócio
                  </p>
                  <div className="flex flex-col lg:flex-row gap-8 mt-8 justify-center lg:justify-start">
                    <div className="social-share-inner-left">
                        <span className="title">Siga-nos</span>
                        <ul className="social-share flex list-none gap-4 mt-4">
                            <li><a href="https://www.behance.net/lebrondesigner1" target="_blank" className="rn-btn"><Image src={placeholderImages.behance.src} width={24} height={24} alt="behance" /></a></li>
                            <li><a href="https://wa.me/5561984836034" target="_blank" className="rn-btn"><Image src={placeholderImages.whatsapp.src} width={24} height={24} alt="whatsapp" /></a></li>
                            <li><a href="https://www.instagram.com/lebrondesign" target="_blank" className="rn-btn"><Instagram /></a></li>
                            <li><a href="https://github.com/LeBronTech" target="_blank" className="rn-btn"><Github /></a></li>
                        </ul>
                    </div>
                     <div className="skill-share-inner">
                        <span className="title">Ferramentas que usamos</span>
                        <ul className="skill-share flex flex-wrap list-none gap-4 mt-4">
                          {placeholderImages.tools.map(tool => (
                            <li key={tool.alt}><Image src={tool.src} width={30} height={30} alt={tool.alt} /></li>
                          ))}
                        </ul>
                    </div>
                  </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="thumbnail style-2">
                    <div className="inner">
                        <Image src={placeholderImages.banner.src} width={600} height={600} alt="Personal Portfolio Images" className="w-full" />
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
                <h2 className="text-4xl lg:text-5xl font-bold mt-2">Quem sou eu</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="card-info bg-card p-8 rounded-lg shadow-lg">
                  <div className="lg:flex">
                    <div className="card-thumbnail mb-6 lg:mb-0 lg:mr-8">
                        <Image src={placeholderImages.about.src} alt="Leandro José" width={300} height={300} className="rounded-lg" />
                    </div>
                    <div className="card-content">
                        <span className="subtitle mt--10">Designer & Programador</span>
                        <h3 className="title text-3xl font-bold mt-2">Leandro José</h3>
                        <span className="designation">Lebron</span>
                        <div className="mt-8">
                            <a href="https://drive.google.com/file/d/13RO1c-w-HJhObvCkXaBUMSgWyjkR2qiI/view?usp=sharing" target="_blank" className="rn-btn">
                                <span>Currículo</span>
                            </a>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="card-description bg-card p-8 rounded-lg shadow-lg">
                    <div className="title-area mb-4">
                        <h3 className="title text-2xl font-bold">Criador da Lebron Dev Designer</h3>
                        <span className="date text-sm text-gray-400">2021</span>
                    </div>
                    <p className="discription text-gray-300">
                        Olá, me chamo Leandro, conhecido também como LeBron,criador da LeBron Dev Designer,tenho 24 anos, sou de Brasília. Designer autodidata há 1 anos e programador a 2 anos, trabalho especialmente na criação de identidades visuais, post para rede sociais e desenvolvimento de sites e aplicativos. Atuo como freelancer e gosto de encarar novos projetos e atender clientes de diferentes segmentos. Tenho como motivação a ideia de que uma boa marca merece ser conhecida, e através dos meus conhecimentos eu posso fazer isso acontecer.
                    </p>
                </div>
              </div>
          </div>
        </div>

        <div id="portfolio" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">Portfólio</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Meu Portfólio</h2>
            </div>
            {/* Repeat for other categories */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2"><Layout /> Websites</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Portfolio items here */}
              </div>
            </div>
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2"><Smartphone /> Apps</h3>
              <div className="text-center text-gray-400">Em breve...</div>
            </div>
             <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2"><Slack /> Identidade Visual</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Portfolio items here */}
              </div>
            </div>
             <div>
              <h3 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2"><Instagram /> Rede Sociais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Portfolio items here */}
              </div>
            </div>
          </div>
        </div>

      </main>

      <div className="backto-top opacity-0 transition-opacity fixed bottom-8 right-8">
        <div className="rn-btn">
          <ArrowUp />
        </div>
      </div>
    </div>
  );
}
