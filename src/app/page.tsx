
'use client';
import Image from "next/image";
import { ArrowRight, Download, Github, Instagram, Layout, Slack, Smartphone, Pencil, Code, Bot } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';

export default function Home() {
  const words = ["Designer.", "Programador.", "Apps.", "Logo marcas.", "WebSites."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('education');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <>
      <main className="main-page-wrapper bg-background text-foreground p-6 md:p-10">
        <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
          {/* Header content can be added here if needed */}
        </header>

        <div id="home" className="rn-slider-area section-separator">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="content">
                  <span className="subtitle" style={{color: 'var(--color-subtitle)'}}>BEM-VINDO</span>
                  <h1 className="title text-5xl md:text-7xl font-bold">Somos a <br />
                    <span className="font-oxanium" style={{color: 'var(--color-primary)'}}>Lebr{'{'}n Dev-Designer</span>
                  </h1>
                  <div className="cd-headline clip is-full-width text-2xl md:text-3xl mt-4">
                    <span>Eu sou </span>
                    <span className="cd-words-wrapper" style={{ width: '200px', overflow: 'hidden' }}>
                      {words.map((word, index) => (
                        <b key={index} className={index === currentWordIndex ? 'is-visible' : 'is-hidden'}>{word}</b>
                      ))}
                    </span>
                  </div>
                  <p className="description mt-4 text-lg text-gray-400">
                    Usamos as mais variadas ferramentas do mercado, para trazer aos nossos clientes a melhor experiência e suporte para seu negócio.
                  </p>
                </div>
                <div className="mt-8">
                  <div className="mb-8">
                    <span className="title text-sm uppercase tracking-wider text-gray-400">Siga-nos</span>
                    <div className="flex gap-4 mt-4 justify-center lg:justify-start">
                      <a href="https://www.behance.net/lebrondesigner1" target="_blank" className="rn-btn"><Image src={placeholderImages.behance.src} alt="Behance" width={24} height={24} data-ai-hint={placeholderImages.behance['data-ai-hint']} /></a>
                      <a href="https://wa.me/5561984836034" target="_blank" className="rn-btn"><Image src={placeholderImages.whatsapp.src} alt="WhatsApp" width={24} height={24} data-ai-hint={placeholderImages.whatsapp['data-ai-hint']} /></a>
                      <a href="https://www.instagram.com/lebrondesign" target="_blank" className="rn-btn"><Instagram /></a>
                      <a href="https://github.com/LeBronTech" target="_blank" className="rn-btn"><Github /></a>
                    </div>
                  </div>
                  <div>
                    <span className="title text-sm uppercase tracking-wider text-gray-400">Ferramentas que usamos</span>
                    <div className="flex gap-4 mt-4 flex-wrap justify-center lg:justify-start">
                      {placeholderImages.tools.map((tool) => (
                        <div key={tool.alt} className="p-3 bg-card rounded-lg shadow-lg">
                          <Image src={tool.src} alt={tool.alt} width={32} height={32} data-ai-hint={tool['data-ai-hint']} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                  <Image src={placeholderImages.logo.src} alt="logo" width={200} height={67} data-ai-hint={placeholderImages.logo["data-ai-hint"]} className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="rn-testimonial-area rn-section-gap section-separator" id="sobre">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="subtitle" style={{color: 'var(--color-subtitle)'}}>SOBRE</span>
              <h2 className="title text-4xl md:text-5xl font-bold">Quem sou eu</h2>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/3 w-full">
                <div className="text-center p-6 rn-card">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image src={placeholderImages.about.src} alt="Leandro José" layout="fill" objectFit="cover" className="rounded-full" data-ai-hint={placeholderImages.about['data-ai-hint']}/>
                  </div>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Leandro José</h3>
                  <p className="text-sm text-muted-foreground">Designer & Programador</p>
                  <p className="text-sm text-primary">Lebron</p>
                  <a className="rn-btn w-full mt-4" href="https://drive.google.com/file/d/13RO1c-w-HJhObvCkXaBUMSgWyjkR2qiI/view?usp=sharing" target="_blank">
                    <Download className="mr-2" />
                    Currículo
                  </a>
                </div>
              </div>
              <div className="lg:w-2/3 w-full">
                <div className="card-description p-8 rounded-lg rn-card">
                  <div className="title-area mb-4">
                    <h3 className="title text-3xl font-bold">Criador da Lebron Dev Designer</h3>
                    <span className="date text-gray-500">2021</span>
                  </div>
                  <div className="seperator mb-4"></div>
                  <p className="discription text-lg">
                    Olá, me chamo Leandro, conhecido também como LeBron, criador da LeBron Dev Designer, tenho 24 anos, sou de Brasília. Designer autodidata há 1 ano e programador há 2 anos, trabalho especialmente na criação de identidades visuais, posts para redes sociais e desenvolvimento de sites e aplicativos. Atuo como freelancer e gosto de encarar novos projetos e atender clientes de diferentes segmentos. Tenho como motivação a ideia de que uma boa marca merece ser conhecida, e através dos meus conhecimentos eu posso fazer isso acontecer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rn-service-area rn-section-gap section-separator" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <span className="subtitle" style={{color: 'var(--color-subtitle)'}}>SERVIÇOS</span>
                <h2 className="title text-4xl md:text-5xl font-bold">O que fazemos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 rn-card">
                    <div className="icon mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Layout className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">WebSites</h3>
                    <p className="p-6 pt-0">Desenvolvimento de sites e landpages responsivos e otimizados.</p>
                </div>
                <div className="text-center p-6 rn-card">
                    <div className="icon mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Smartphone className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Aplicativos Mobile</h3>
                    <p className="p-6 pt-0">Desenvolvimento de aplicativos para IOS e Android.</p>
                </div>
                 <div className="text-center p-6 rn-card">
                    <div className="icon mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Slack className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Indentidade Visual</h3>
                    <p className="p-6 pt-0">Logo, cartão de visita, e todo o design com a cara do seu negócio.</p>
                </div>
                 <div className="text-center p-6 rn-card">
                    <div className="icon mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Instagram className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Rede Sociais</h3>
                    <p className="p-6 pt-0">Artes para posts no Instagram, Facebook, etc.</p>
                </div>
            </div>
          </div>
        </div>

        <footer className="rn-footer-area rn-section-gap section-separator">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <div className="logo">
                        <a href="#home">
                          <Image src={placeholderImages.logo.src} alt="logo" width={120} height={40} data-ai-hint={placeholderImages.logo["data-ai-hint"]} />
                        </a>
                    </div>
                    <p className="description mt-4">© 2025. Direitos reservados a <a target="_blank" href="https://github.com/LeBronTech" className="text-primary hover:underline">Lebron Tech.</a></p>
                </div>
            </div>
        </footer>

      </main>
    </>
  );
}

