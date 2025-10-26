
'use client';
import Image from "next/image";
import { Award, BookOpen, Code, Github, Instagram, Layout, Menu, Slack, Smartphone, ArrowUp, Circle, AppWindow, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import placeholderImages from './lib/placeholder-images.json';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle as SheetTitleComponent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AOS from 'aos';

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

  const handleToolClick = (toolName: string) => {
    setActiveTool(activeTool === toolName ? null : toolName);
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
    return ['Todos', ...Array.from(categories)];
  }, [portfolio]);

  const subCategories = useMemo(() => {
    if (activeFilter === 'Todos') return [];
    const cats = new Set(portfolio.filter(p => p.mainCategory === activeFilter).map(p => p.category).filter(Boolean) as string[]);
    return cats.size > 0 ? ['Todos', ...Array.from(cats)] : [];
  }, [activeFilter, portfolio]);


  const filteredProjects = useMemo(() => {
    let projects = portfolio;
    if (activeFilter !== 'Todos') {
      projects = projects.filter(p => p.mainCategory === activeFilter);
    }
    if (activeSubFilter !== 'Todos' && subCategories.length > 0) {
      projects = projects.filter(p => p.category === activeSubFilter);
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
                      <span className="title text-sm tracking-wider gradient-title-animation">Me siga!</span>
                      <ul className="social-share flex list-none gap-4 mt-4">
                            <li>
                              <a href="https://www.behance.net/lebrondesigner1" target="_blank" className="w-12 h-12 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                <Image src={placeholderImages.behance.src} width={30} height={30} alt="behance" data-ai-hint={placeholderImages.behance['data-ai-hint']} className="filter-primary" />
                              </a>
                            </li>
                            <li>
                              <a href="https://wa.me/5561984836034" target="_blank" className="w-12 h-12 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                <Image src={placeholderImages.whatsapp.src} width={30} height={30} alt="whatsapp" data-ai-hint={placeholderImages.whatsapp['data-ai-hint']} className="filter-primary" />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.instagram.com/lebrondesign" target="_blank" className="w-12 h-12 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                <Instagram size={30} className="text-primary filter-primary" />
                              </a>
                            </li>
                            <li>
                              <a href="https://github.com/LeBronTech" target="_blank" className="w-12 h-12 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
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

        <div id="ferramentas" className="py-24 section-separator">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12" data-aos="fade-up">
                  <h2 className="title text-4xl lg:text-5xl font-bold mt-2 font-secondary">Ferramentas Usadas</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                <div data-aos="fade-up" data-aos-delay="200">
                  <h3 className="text-2xl font-semibold mb-6 text-center gradient-title-animation">Design & Edição</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {placeholderImages.tools.design.map((tool, index) => (
                      <div 
                        key={index} 
                        className="relative"
                        data-aos="fade-up"
                        data-aos-delay={100 * index}
                      >
                        <button 
                          onClick={() => handleToolClick(tool.alt)}
                          className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg w-24 h-24 justify-center rn-btn transition-transform transform hover:scale-110" 
                          title={tool.alt}
                        >
                          <Image src={tool.src} width={40} height={40} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} />
                        </button>
                        {activeTool === tool.alt && (
                          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 bg-background/80 px-2 py-1 rounded-md z-10">
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
                    {placeholderImages.tools.development.map((tool, index) => {
                       const isSpecial = ['react', 'flutter', 'python'].includes(tool.alt.toLowerCase());
                       return (
                        <div 
                          key={index} 
                          className="relative"
                          data-aos="fade-up"
                          data-aos-delay={100 * index}
                        >
                          <button 
                            onClick={() => handleToolClick(tool.alt)}
                            className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg w-24 h-24 justify-center rn-btn transition-transform transform hover:scale-110" 
                            title={tool.alt}
                          >
                            <Image src={tool.src} width={40} height={40} alt={tool.alt} data-ai-hint={tool['data-ai-hint']} className={isSpecial ? 'filter-primary' : ''}/>
                          </button>
                          {activeTool === tool.alt && (
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 bg-background/80 px-2 py-1 rounded-md z-10">
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

        <div id="sobre" className="py-24 section-separator">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12" data-aos="fade-up">
                    <span className="subtitle uppercase tracking-widest gradient-title-animation">Sobre</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-2">Quem sou eu</h2>
                </div>
                <div className="grid grid-cols-1">
                    <div className="bg-card p-8 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
                            <div className="card-thumbnail flex-shrink-0">
                                <Image src={placeholderImages.about.src} width={250} height={250} alt="Leandro José" className="rounded-lg" data-ai-hint={placeholderImages.about['data-ai-hint']} />
                            </div>
                            <div className="card-content flex-grow">
                                <span className="subtitle mt-10 lg:mt-0 uppercase text-sm tracking-wider gradient-title-animation">Designer & Programador</span>
                                <h3 className="title text-3xl font-bold mt-2">Leandro José</h3>
                                <span className="designation text-lg">Lebron</span>
                                 <div className="mt-6 text-center">
                                    <span className="title text-sm tracking-wider gradient-title-animation">Siga-me</span>
                                      <ul className="social-share flex list-none gap-4 mt-2 justify-center">
                                        <li>
                                          <a href="https://www.behance.net/lebrondesigner1" target="_blank" className="w-24 h-24 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                            <Image src={placeholderImages.behance.src} width={40} height={40} alt="behance" data-ai-hint={placeholderImages.behance['data-ai-hint']} className="filter-primary"/>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="https://wa.me/5561984836034" target="_blank" className="w-24 h-24 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                            <Image src={placeholderImages.whatsapp.src} width={40} height={40} alt="whatsapp" data-ai-hint={placeholderImages.whatsapp['data-ai-hint']} className="filter-primary"/>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="https://www.instagram.com/lebrondesign" target="_blank" className="w-24 h-24 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                            <Instagram size={40} className="text-primary filter-primary" />
                                          </a>
                                        </li>
                                        <li>
                                          <a href="https://github.com/LeBronTech" target="_blank" className="w-24 h-24 bg-card shadow-lg rounded-lg flex items-center justify-center p-2 rn-btn">
                                            <Github size={40} className="text-primary filter-primary" />
                                          </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="seperator my-8 h-px bg-border"></div>
                        <p className="discription text-base text-gray-300 max-w-4xl mx-auto text-center">
                            Olá, me chamo Leandro, conhecido também como LeBron, criador da LeBron Dev Designer, tenho 24 anos, sou de Brasília. Designer autodidata há 1 anos e programador a 2 anos, trabalho especialmente na criação de identidades visuais, post para rede sociais e desenvolvimento de sites e aplicativos. Atuo como freelancer e gosto de encarar novos projetos e atender clientes de diferentes segmentos. Tenho como motivação a ideia de que uma boa marca merece ser conhecida, e através dos meus conhecimentos eu posso fazer isso acontecer.
                        </p>
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
            
            <div className="flex flex-wrap justify-center items-center gap-2 mb-12" data-aos="fade-up">
                <div className="flex flex-wrap justify-center gap-2 p-2 bg-card rounded-full shadow-lg">
                    {mainCategories.map(category => (
                        <Button
                          key={category}
                          variant={activeFilter === category ? "default" : "ghost"}
                          onClick={() => handleFilterClick(category)}
                          className="capitalize rounded-full px-6 transition-all duration-300"
                        >
                          {category}
                        </Button>
                    ))}
                </div>
                {subCategories.length > 0 && (
                   <div className="flex flex-wrap justify-center gap-1 p-1 bg-card/50 rounded-full mt-4">
                        {subCategories.map(category => (
                            <Button
                              key={category}
                              variant={activeSubFilter === category ? "secondary" : "ghost"}
                              size="sm"
                              onClick={() => handleSubFilterClick(category)}
                              className="capitalize rounded-full px-4 text-xs transition-all duration-300"
                            >
                              {category}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className={`transform transition-all duration-300 ${isAnimating ? 'animate-zoomOut' : 'animate-zoomIn'}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Card className="cursor-pointer overflow-hidden group bg-card">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <Image src={project.src} alt={project.title} width={400} height={300} className="rounded-t-lg object-cover h-60 w-full transition-transform duration-500 group-hover:scale-110" data-ai-hint={project['data-ai-hint']} />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white text-lg font-semibold">{project.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                      <CardDescription className="text-sm text-primary">{project.category || project.mainCategory}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="curriculo" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Currículo</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Minhas Habilidades</h2>
            </div>
            <Tabs defaultValue="formacao" className="w-full">
              <TabsList className="grid w-full grid-cols-2" data-aos="fade-up">
                <TabsTrigger value="formacao"><BookOpen className="mr-2" />Formação</TabsTrigger>
                <TabsTrigger value="habilidades"><Code className="mr-2" />Habilidades</TabsTrigger>
              </TabsList>
              <TabsContent value="formacao">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div data-aos="fade-up">
                        <span className="subtitle text-primary">2018-2020</span>
                        <h4 className="maintitle text-2xl font-bold mt-2">Faculdade</h4>
                        <div className="experience-list mt-4 space-y-6">
                            <Card>
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
                             <Card>
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
                             <Card>
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
            </Tabs>
          </div>
        </div>

        <div id="depoimentos" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <span className="subtitle uppercase tracking-widest gradient-title-animation">Depoimentos</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">O que os clientes dizem</h2>
            </div>
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

       <button className="backto-top opacity-0 transition-opacity fixed bottom-8 right-8 cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-card shadow-lg border-2 border-primary">
          <ArrowUp className="text-primary" />
        </button>
    </div>
  );
}

    
