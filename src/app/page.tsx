
'use client';
import * as React from "react";
import { Award, BookOpen, Code, Github, Instagram, Layout, Menu, Eye, Smartphone, List, Grid, Circle, ArrowUpRight, X as CloseIcon, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import placeholderImages from './lib/placeholder-images.json';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle as SheetTitleComponent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AOS from 'aos';
import { cn } from "@/lib/utils";
import Image from "next/image";

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  return (
      <span className="inline-block relative">
        {words[index].substring(0, subIndex)}
        <span className="animate-ping">|</span>
      </span>
  );
};

const SkillBar = ({ skill, percentage }: { skill: string; percentage: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100); 
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full mb-4" data-aos="fade-up">
      <div className="flex justify-between items-center mb-1">
        <span className="text-foreground">{skill}</span>
        <span className="text-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full h-2 [&>*]:bg-gradient-to-r [&>*]:from-primary [&>*]:to-accent" />
    </div>
  );
};


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [activeSubFilter, setActiveSubFilter] = useState('Todos');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [portfolioView, setPortfolioView] = useState('grid');
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleToolClick = (toolName: string) => {
    setActiveTool(activeTool === toolName ? null : toolName);
  };
  
  const handleDelayedLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    setTimeout(() => {
      window.open(url, '_blank');
    }, 300);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
     const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

 const portfolio = useMemo(() => [
      ...placeholderImages.portfolio.websites,
      ...placeholderImages.portfolio.apps,
      ...placeholderImages.portfolio.identities,
      ...placeholderImages.portfolio.logos,
      ...placeholderImages.portfolio.socials,
  ], []);

  const mainCategories = useMemo(() => {
    const categories = new Set(portfolio.map(p => p.mainCategory));
    return ['Todos', 'Websites', 'Apps', 'Identidade Visual', 'Logos', 'Social Mídia'].filter(c => c === 'Todos' || categories.has(c));
  }, [portfolio]);


  const subCategories = useMemo(() => {
    if (activeFilter === 'Todos' || !activeFilter) return [];
    const subs = new Set(
      portfolio
        .filter(p => p.mainCategory === activeFilter && 'category' in p && p.category)
        .map(p => (p as { category?: string }).category)
        .filter(Boolean) as string[]
    );
    return ['Todos', ...Array.from(subs)];
  }, [portfolio, activeFilter]);

  const filteredProjects = useMemo(() => {
    let projects = portfolio;
    if (activeFilter !== 'Todos') {
      projects = projects.filter(p => p.mainCategory === activeFilter);
    }
    if (activeSubFilter !== 'Todos' && subCategories.length > 1) {
      projects = projects.filter(p => 'category' in p && p.category === activeSubFilter);
    }
    return projects;
  }, [portfolio, activeFilter, activeSubFilter, subCategories]);

  const handleFilterClick = (filter: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setActiveSubFilter('Todos');
      setIsAnimating(false);
    }, 300);
  };

  const handleSubFilterClick = (filter: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSubFilter(filter);
      setIsAnimating(false);
    }, 300);
  };
  
  const handleProjectClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };
  
  const LogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 8L9 16L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Websites': return <Layout className="mr-2 h-4 w-4" />;
      case 'Apps': return <Smartphone className="mr-2 h-4 w-4" />;
      case 'Identidade Visual': return <Eye className="mr-2 h-4 w-4" />;
      case 'Logos': return <LogoIcon />;
      case 'Social Mídia': return <Instagram className="mr-2 h-4 w-4" />;
      case 'Todos': return <Circle className="mr-2 h-4 w-4" />;
      default: return null;
    }
  };

   const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    window.location.href = url;
  };
  
   const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const lastPage = document.referrer;
      if (lastPage && (lastPage.includes('/websites') || lastPage.includes('/apps'))) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    };


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

  const navLinks = [
    { href: "#home", label: "HOME" },
    { href: "#sobre", label: "SOBRE" },
    { href: "#portfolio", label: "PORTFÓLIO" },
    { href: "#curriculo", label: "CURRÍCULO" },
    { href: "#depoimentos", label: "DEPOIMENTOS" },
    { href: "#contacts", label: "CONTATO" },
  ];

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
                {navLinks.map((link) => (
                  <li key={link.href}><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold" href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </nav>
             <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
                   <SheetHeader>
                    <SheetTitleComponent className="sr-only">Menu Principal</SheetTitleComponent>
                    <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image src={placeholderImages.logo.src} width={184} height={40} alt="Lebron Dev-Designer logo" data-ai-hint={placeholderImages.logo['data-ai-hint']} />
                    </a>
                  </SheetHeader>
                  <div className="flex flex-col h-full justify-between">
                    <nav className="flex-1 p-6">
                       <ul className="primary-menu flex flex-col space-y-4">
                        {navLinks.map((link) => (
                          <li key={link.href}><a className="nav-link smoth-animation gradient-title-animation uppercase font-bold text-lg" href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</a></li>
                        ))}
                      </ul>
                    </nav>
                     <div className="p-6 border-t">
                      <h4 className="text-2xl font-bold mb-4 gradient-title-animation">Social Mídia</h4>
                      <ul className="social-share flex list-none gap-4 mt-2 justify-center">
                          <li>
                            <a href="https://www.behance.net/lebrondesigner1" onClick={(e) => handleDelayedLinkClick(e, 'https://www.behance.net/lebrondesigner1')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                              <Image src={placeholderImages.behance.src} width={30} height={30} alt="behance" data-ai-hint={placeholderImages.behance['data-ai-hint']} className="filter-primary" />
                            </a>
                          </li>
                          <li>
                            <a href="https://wa.me/5561984836034" onClick={(e) => handleDelayedLinkClick(e, 'https://wa.me/5561984836034')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                              <Image src={placeholderImages.whatsapp.src} width={30} height={30} alt="whatsapp" data-ai-hint={placeholderImages.whatsapp['data-ai-hint']} className="filter-primary" />
                            </a>
                          </li>
                          <li>
                            <a href="https://www.instagram.com/lebrondesign" onClick={(e) => handleDelayedLinkClick(e, 'https://www.instagram.com/lebrondesign')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                              <Instagram size={30} className="text-primary filter-primary" />
                            </a>
                          </li>
                          <li>
                            <a href="https://github.com/LeBronTech" onClick={(e) => handleDelayedLinkClick(e, 'https://github.com/LeBronTech')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                              <Github size={30} className="text-primary filter-primary" />
                            </a>
                          </li>
                      </ul>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="main-page-wrapper">
        <div id="home" className="min-h-screen flex items-center justify-center section-separator relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 text-center lg:text-left" data-aos="fade-up">
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
              </div>
              <div className="order-1 lg:order-2 relative flex justify-center" data-aos="fade-up" data-aos-delay="200">
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
            <div className="grid grid-cols-1">
              <Card className="p-6 lg:p-8" data-aos="fade-up">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="card-thumbnail flex-shrink-0">
                    <Image src={placeholderImages.about.src} width={250} height={250} alt="Leandro José" className="rounded-lg shadow-lg" data-ai-hint={placeholderImages.about['data-ai-hint']}/>
                  </div>
                  <div className="card-content flex-grow text-center lg:text-left">
                    <div className="mb-4">
                        <h4 className="text-2xl font-bold mb-2 gradient-title-animation">Designer & Programador</h4>
                        <h3 className="title text-3xl font-bold">Leandro José</h3>
                        <span className="designation text-xl text-primary">Lebron</span>
                    </div>
                    <div className="mb-6">
                        <p className="discription text-lg text-muted-foreground leading-relaxed">
                            Olá, me chamo Leandro, conhecido também como LeBron, criador da LeBron Dev Designer, tenho 24 anos, sou de Brasília. Designer autodidata há 1 anos e programador a 2 anos, trabalho especialmente na criação de identidades visuais, post para rede sociais e desenvolvimento de sites e aplicativos. Atuo como freelancer e gosto de encarar novos projetos e atender clientes de diferentes segmentos. Tenho como motivação a ideia de que uma boa marca merece ser conhecida, e através dos meus conhecimentos eu posso fazer isso acontecer.
                        </p>
                    </div>
                     <div className="skill-share-inner">
                        <h4 className="text-xl font-bold mb-4 gradient-title-animation">Social Mídia</h4>
                        <ul className="social-share flex list-none gap-4 mt-2 justify-center lg:justify-start">
                            <li>
                              <a href="https://www.behance.net/lebrondesigner1" onClick={(e) => handleDelayedLinkClick(e, 'https://www.behance.net/lebrondesigner1')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                <Image src={placeholderImages.behance.src} width={30} height={30} alt="behance" data-ai-hint={placeholderImages.behance['data-ai-hint']} className="filter-primary" />
                              </a>
                            </li>
                            <li>
                              <a href="https://wa.me/5561984836034" onClick={(e) => handleDelayedLinkClick(e, 'https://wa.me/5561984836034')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                <Image src={placeholderImages.whatsapp.src} width={30} height={30} alt="whatsapp" data-ai-hint={placeholderImages.whatsapp['data-ai-hint']} className="filter-primary" />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.instagram.com/lebrondesign" onClick={(e) => handleDelayedLinkClick(e, 'https://www.instagram.com/lebrondesign')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                <Instagram size={30} className="text-primary filter-primary" />
                              </a>
                            </li>
                            <li>
                              <a href="https://github.com/LeBronTech" onClick={(e) => handleDelayedLinkClick(e, 'https://github.com/LeBronTech')} className="w-20 h-20 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                <Github size={30} className="text-primary filter-primary" />
                              </a>
                            </li>
                        </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="rn-service-area py-24 section-separator" id="features">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12" data-aos="fade-up">
                  <span className="subtitle uppercase tracking-widest gradient-title-animation">O que fazemos</span>
                  <h2 className="text-4xl lg:text-5xl font-bold mt-2 font-secondary">Nossos Serviços</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="text-center p-6" data-aos="fade-up" data-aos-delay="100">
                      <div className="icon mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Layout className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl mb-2">Websites</CardTitle>
                      <CardDescription>Criação de websites e landing pages responsivas, utilizando as tecnologias mais recentes para garantir performance e escalabilidade.</CardDescription>
                  </Card>
                  <Card className="text-center p-6" data-aos="fade-up" data-aos-delay="200">
                      <div className="icon mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Smartphone className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl mb-2">Aplicativos Mobile</CardTitle>
                      <CardDescription>Desenvolvimento de aplicativos nativos e multiplataforma para iOS e Android, focados em usabilidade e experiência do usuário.</CardDescription>
                  </Card>
                  <Card className="text-center p-6" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Eye className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl mb-2">Identidade Visual</CardTitle>
                      <CardDescription>Construção de identidades visuais completas, do conceito do logotipo à aplicação da marca em diversos pontos de contato (branding, UI/UX).</CardDescription>
                  </Card>
                  <Card className="text-center p-6" data-aos="fade-up" data-aos-delay="400">
                      <div className="icon mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Instagram className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl mb-2">Social Mídia</CardTitle>
                      <CardDescription>Criação e gerenciamento de conteúdo visual para mídias sociais, otimizando o engajamento e a presença digital da marca.</CardDescription>
                  </Card>
              </div>
          </div>
        </div>

        <div id="ferramentas" className="py-24 section-separator">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12" data-aos="fade-up">
                  <h2 className="text-4xl lg:text-5xl font-bold mt-2 font-secondary">Ferramentas Usadas</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                <div data-aos="fade-up" data-aos-delay="200">
                  <h3 className="text-2xl font-semibold mb-6 text-center gradient-title-animation">Design & Edição</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {placeholderImages.tools.design.map((tool, index) => (
                      <div 
                        key={index} 
                        className="relative group"
                        data-aos="fade-up"
                        data-aos-delay={`${index * 100}`}
                      >
                        <button 
                          onClick={() => handleToolClick(tool.alt)}
                           className={cn(
                            "w-20 h-20 shadow-lg rounded-lg flex items-center justify-center p-2 transition-all duration-300 transform-gpu tool-icon",
                            activeTool === tool.alt && "tool-icon-active"
                          )}
                          title={tool.alt}
                        >
                           <Image src={tool.src} width={40} height={40} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} className={cn("transition-all", activeTool === tool.alt ? 'filter-special-hover' : '' )}/>
                        </button>
                        {activeTool === tool.alt && (
                          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 bg-background/80 px-2 py-1 rounded-md z-10 whitespace-nowrap">
                            {tool.alt}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="400">
                  <h3 className="text-2xl font-semibold mb-6 text-center gradient-title-animation">Desenvolvimento</h3>
                   <div className="flex flex-wrap justify-center gap-4">
                    {[
                      ...placeholderImages.tools.development.filter(t => ['html', 'css'].includes(t.alt.toLowerCase())),
                      ...placeholderImages.tools.development.filter(t => !['html', 'css'].includes(t.alt.toLowerCase()))
                    ].map((tool, index) => {
                      if (!tool) return null;
                       return (
                        <div 
                          key={index} 
                          className="relative group"
                          data-aos="fade-up"
                          data-aos-delay={`${index * 100}`}
                        >
                          <button 
                            onClick={() => handleToolClick(tool.alt)}
                           className={cn(
                            "w-20 h-20 shadow-lg rounded-lg flex items-center justify-center p-2 transition-all duration-300 transform-gpu tool-icon",
                            activeTool === tool.alt && "tool-icon-active"
                          )}
                            title={tool.alt}
                          >
                             <Image src={tool.src} width={40} height={40} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} className={cn("transition-all", activeTool === tool.alt ? 'filter-special-hover' : '' )}/>
                          </button>
                          {activeTool === tool.alt && (
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 bg-background/80 px-2 py-1 rounded-md z-10 whitespace-nowrap">
                              {tool.alt}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div id="portfolio" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Portfólio</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 font-secondary">Meu Portfólio</h2>
            </div>
            
             <div className="flex flex-wrap gap-4 justify-center mb-8" data-aos="fade-up">
              {mainCategories.flatMap((category) => {
                  const subItems = activeFilter === category && subCategories.length > 1 ? subCategories : [];
                  return [
                      <Button
                          key={category}
                          variant={activeFilter === category ? 'default' : 'outline'}
                          onClick={() => handleFilterClick(category)}
                          className="rounded-full px-4 py-2 flex items-center justify-center text-sm"
                      >
                          {getCategoryIcon(category)}
                          <span className="ml-2">{category}</span>
                      </Button>,
                      ...subItems.map(sub => (
                          <Button
                              key={sub}
                              variant={activeSubFilter === sub ? 'secondary' : 'ghost'}
                              onClick={() => handleSubFilterClick(sub)}
                              className="rounded-full px-3 py-1 text-xs animate-zoomIn"
                          >
                              {sub}
                          </Button>
                      ))
                  ];
              })}
            </div>

            {activeFilter !== 'Logos' && (
              <div className="flex justify-center mb-8" data-aos="fade-up">
                <div className="inline-flex rounded-md shadow-sm bg-card p-1">
                  <Button onClick={() => setPortfolioView('list')} variant={portfolioView === 'list' ? 'default' : 'ghost'} className="px-4 py-2 text-sm font-medium">
                    <List className="w-4 h-4 mr-2"/>
                    Lista
                  </Button>
                  <Button onClick={() => setPortfolioView('grid')} variant={portfolioView === 'grid' ? 'default' : 'ghost'} className="px-4 py-2 text-sm font-medium">
                    <Grid className="w-4 h-4 mr-2" />
                    Grid
                  </Button>
                </div>
              </div>
            )}
            
            {portfolioView === 'list' && activeFilter !== 'Logos' ? (
                <div className={cn("transition-all duration-300 space-y-8", isAnimating ? 'animate-zoomOut' : 'animate-zoomIn')}>
                    {filteredProjects.map((project, index) => (
                        <Card 
                          key={`${project.title}-${index}-list`} 
                          className="w-full flex flex-col md:flex-row overflow-hidden" 
                          data-aos="fade-up" 
                          data-aos-delay={index * 100}
                        >
                          <div className="md:w-1/3">
                            <Image 
                              src={project.src} 
                              alt={project.title}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover" 
                              data-ai-hint={project['data-ai-hint']}
                            />
                          </div>
                          <div className="md:w-2/3 p-6 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-muted-foreground mb-4">{project.description}</p>
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="rn-btn inline-flex items-center text-sm self-start">
                                  Ver Projeto <ArrowUpRight className="w-4 h-4 ml-2"/>
                                </a>
                            )}
                          </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isAnimating && 'opacity-0',
                    activeFilter === 'Logos'
                      ? 'grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8'
                      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'
                  )}
                >
                  {filteredProjects.map((project, index) => (
                    <div
                      key={`${project.title}-${index}-grid`}
                      className={cn(
                        "relative aspect-square cursor-pointer [perspective:1000px] group",
                         isAnimating ? 'animate-zoomOut' : 'animate-zoomIn',
                      )}
                      onClick={() => handleProjectClick(index)}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <Card 
                        className={cn(
                          "w-full h-full rounded-lg overflow-hidden flip-card",
                          flippedCard === index && "flipped"
                        )}
                      >
                       <div className="flip-card-inner w-full h-full relative">
                          <div className="flip-card-front">
                            <Image 
                              src={project.src} 
                              alt={project.title} 
                              layout="fill" 
                              objectFit="cover"
                              data-ai-hint={project['data-ai-hint']}
                            />
                             {activeFilter === 'Logos' && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center">
                                    <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
                                </div>
                            )}
                          </div>
                          <div className="flip-card-back p-6 flex flex-col justify-end rounded-lg">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                               {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="rn-btn inline-flex items-center text-sm" onClick={(e) => e.stopPropagation()}>
                                  Ver Projeto <ArrowUpRight className="w-4 h-4 ml-2"/>
                                </a>
                               )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
            )}
          </div>
        </div>

        <div id="curriculo" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Currículo</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Minhas Habilidades</h2>
            </div>
            <Tabs defaultValue="habilidades" className="w-full">
              <TabsList className="grid w-full grid-cols-2" data-aos="fade-up">
                 <TabsTrigger value="habilidades"><Code className="mr-2" />Habilidades</TabsTrigger>
                <TabsTrigger value="formacao"><BookOpen className="mr-2" />Formação</TabsTrigger>
              </TabsList>
               <TabsContent value="habilidades">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div data-aos="fade-up" data-aos-delay="200">
                    <h4 className="text-2xl font-bold mb-4">Design</h4>
                    <SkillBar skill="Photoshop" percentage={75} />
                    <SkillBar skill="Figma" percentage={75} />
                    <SkillBar skill="Adobe XD" percentage={60} />
                    <SkillBar skill="Adobe Illustrator" percentage={70} />
                    <SkillBar skill="CorelDraw" percentage={70} />
                  </div>
                  <div data-aos="fade-up" data-aos-delay="400">
                    <h4 className="text-2xl font-bold mb-4">Desenvolvimento</h4>
                    <SkillBar skill="HTML" percentage={85} />
                    <SkillBar skill="CSS" percentage={80} />
                    <SkillBar skill="JavaScript" percentage={70} />
                    <SkillBar skill="React" percentage={75} />
                    <SkillBar skill="Node.js" percentage={70} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="formacao">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div data-aos="fade-up">
                        <span className="subtitle text-primary">2018-2020</span>
                        <h4 className="maintitle text-2xl font-bold mt-2">Faculdade</h4>
                        <div className="experience-list mt-4 space-y-6">
                            <Card className="rounded-full">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Web Designer</CardTitle>
                                            <CardDescription>Faculdade Projeção</CardDescription>
                                        </div>
                                        <div className="date-of-time">
                                            <span className="text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">2018</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>Formação em Html, CSS, JavaScript e desenvolvimento do primeiro site.</p>
                                </CardContent>
                            </Card>
                             <Card className="rounded-full">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>App Mobile</CardTitle>
                                        </div>
                                        <div className="date-of-time">
                                            <span className="text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">2019</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>Certificação de desnvolvimento em Android.</p>
                                </CardContent>
                            </Card>
                             <Card className="rounded-full">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Designer</CardTitle>
                                        </div>
                                        <div className="date-of-time">
                                            <span className="text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">2020</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>Certificação em photoshop,canvas,figma e coredraw.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

         <div id="depoimentos" className="py-24 section-separator">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12" data-aos="fade-up">
                    <span className="subtitle uppercase tracking-widest gradient-title-animation">Depoimentos</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-2">O que os clientes dizem</h2>
                </div>
                <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full max-w-4xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <CarouselContent>
                        {placeholderImages.testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                                <Card className="testimonial m-4">
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                        <Image src={testimonial.src} alt={testimonial.name} width={100} height={100} className="rounded-full mb-4 border-2 border-primary" data-ai-hint={testimonial['data-ai-hint']} />
                                        <div className="rating mb-4 flex">
                                            {[...Array(5)].map((_, i) => (
                                              <Image key={i} src="https://i.postimg.cc/yYFfQZzY/rating.png" alt="rating" width={20} height={20} />
                                            ))}
                                        </div>
                                        <h3 className="title text-xl font-bold mb-1">{testimonial.title}</h3>
                                        <span className="designation text-sm text-muted-foreground mb-4">{testimonial.designation}</span>
                                        <p className="discription text-lg leading-relaxed">{testimonial.description}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-50px]" />
                    <CarouselNext className="right-[-50px]" />
                </Carousel>
            </div>
        </div>
        
        <div id="contacts" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12" data-aos="fade-up">
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

       <button className="backto-top opacity-0 transition-opacity fixed bottom-8 right-8 cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-card shadow-lg border-2 border-primary z-50">
          <ArrowUp className="text-primary" />
        </button>
    </div>
  );
}
