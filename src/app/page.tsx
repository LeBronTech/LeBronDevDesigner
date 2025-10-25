
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
                  <h1 className="title text-6xl font-bold">
                    Somos a <span className="oxanium-font gradient-text">Lebr{"{"}o{"}"}n Dev-Designer</span>
                  </h1>
                  <h2 className="text-4xl md:text-5xl mt-4 typing-container">
                    <TypingEffect words={["Apps.", "Websites.", "Logos."]} />
                  </h2>
                  <p className="description mt-6 mx-auto lg:mx-0 max-w-lg">
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
                <Card>
                  <CardContent className="p-8 lg:flex">
                    <div className="card-thumbnail mb-6 lg:mb-0 lg:mr-8">
                        <Image src={placeholderImages.about.src} alt="Leandro José" width={300} height={300} className="rounded-lg" />
                    </div>
                    <div className="card-content">
                        <span className="text-sm text-primary">Designer & Programador</span>
                        <h3 className="text-3xl font-bold mt-2">Leandro José</h3>
                        <span className="text-lg">Lebron</span>
                        <div className="mt-8">
                            <Button asChild>
                              <a href="https://drive.google.com/file/d/13RO1c-w-HJhObvCkXaBUMSgWyjkR2qiI/view?usp=sharing" target="_blank">
                                Currículo
                              </a>
                            </Button>
                        </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Criador da Lebron Dev Designer</CardTitle>
                    <CardContent className="text-sm text-gray-400">2021</CardContent>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                        Olá, me chamo Leandro, conhecido também como LeBron,criador da LeBron Dev Designer,tenho 24 anos, sou de Brasília. Designer autodidata há 1 anos e programador a 2 anos, trabalho especialmente na criação de identidades visuais, post para rede sociais e desenvolvimento de sites e aplicativos. Atuo como freelancer e gosto de encarar novos projetos e atender clientes de diferentes segmentos. Tenho como motivação a ideia de que uma boa marca merece ser conhecida, e através dos meus conhecimentos eu posso fazer isso acontecer.
                    </p>
                  </CardContent>
                </Card>
              </div>
          </div>
        </div>

        <div id="portfolio" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">Portfólio</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Meu Portfólio</h2>
            </div>
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

        <div id="curriculo" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest"></span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Currículo</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-3xl font-bold mb-8">Formação</h3>
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Web Designer</CardTitle>
                        <span className="text-primary">2018</span>
                      </div>
                      <p className="text-sm text-gray-400">Faculdade Projeção</p>
                    </CardHeader>
                    <CardContent>
                      <p>Formação em Html,CSS,JavaScript e desenvolvimento do primeiro site.</p>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>App Mobile</CardTitle>
                        <span className="text-primary">2019</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>Certificação de desnvolvimento em Android.</p>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Designer</CardTitle>
                        <span className="text-primary">2020</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>Certificação em photoshop,canvas,figma e coredraw.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-8">Habilidades</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">PHOTOSHOP</span>
                      <span className="text-sm font-medium text-gray-300">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">FIGMA</span>
                      <span className="text-sm font-medium text-gray-300">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">ADOBE XD</span>
                      <span className="text-sm font-medium text-gray-300">60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">ADOBE ILLUSTRATOR</span>
                      <span className="text-sm font-medium text-gray-300">70%</span>
                    </div>
                    <Progress value={70} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">Corel</span>
                      <span className="text-sm font-medium text-gray-300">70%</span>
                    </div>
                    <Progress value={70} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">HTML</span>
                      <span className="text-sm font-medium text-gray-300">85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">CSS</span>
                      <span className="text-sm font-medium text-gray-300">80%</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-gray-300">JAVASCRIPT</span>
                      <span className="text-sm font-medium text-gray-300">70%</span>
                    </div>
                    <Progress value={70} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="depoimentos" className="py-24 section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">O que os clientes dizem</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Depoimentos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {placeholderImages.testimonials.map((testimonial, index) => (
                <Card key={index}>
                    <CardHeader>
                        <Image src={testimonial.src} alt="Testimonial" width={100} height={100} className="rounded-full mx-auto" />
                    </CardHeader>
                    <CardContent className="text-center">
                        <h4 className="text-xl font-bold mt-4">Pessoa {index + 1}</h4>
                        <p className="text-gray-400 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div id="contacts" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest">Contato</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2">Fale conosco</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="contact-about-area bg-card p-8 rounded-lg">
                <div className="thumbnail mb-6">
                  <Image src={placeholderImages.contact.src} alt="contact-img" width={500} height={300} className="rounded-lg" />
                </div>
                <div className="title-area">
                  <h4 className="title text-3xl font-bold">Leandro</h4>
                </div>
                <div className="description">
                  <p>Estamos disponiveis tambem para trabalhos freelancer</p>
                  <span className="block mt-4">Telefone: <a href="https://api.whatsapp.com/send?phone=5561984836034&text=Olá%20gostaria%20de%20fazer%20um%20orçamento" className="hover:text-primary">61984836034</a></span>
                  <span className="block">Email: <a href="mailto:lebronempresas@gmail.com?subject=&body=Ol%C3%A1%20gostaria%20de%20fazer%20um%20or%C3%A7amento" className="hover:text-primary">lebronempresas@gmail.com</a></span>
                </div>
                <div className="social-area mt-6">
                  <div className="name">Siga-nos</div>
                  <div className="social-icone flex gap-4 mt-4">
                    <a href="https://wa.me/5561984836034" target="_blank" className="rn-btn"><Image src={placeholderImages.whatsapp.src} width={24} height={24} alt="whatsapp" /></a>
                    <a href="https://www.behance.net/lebrondesigner1" target="_blank" className="rn-btn"><Image src={placeholderImages.behance.src} width={24} height={24} alt="behance" /></a>
                    <a href="https://instagram.com/lebrondesign" className="rn-btn"><Instagram /></a>
                    <a href="https://github.com/LeBronTech" className="rn-btn"><Github /></a>
                  </div>
                </div>
              </div>
              <div className="contact-form-wrapper bg-card p-8 rounded-lg">
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="contact-name">Seu nome</label>
                      <input name="contact-name" id="contact-name" type="text" className="w-full bg-input p-3 rounded-md" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-phone">Telefone</label>
                      <input name="contact-phone" id="contact-phone" type="text" className="w-full bg-input p-3 rounded-md" />
                    </div>
                  </div>
                  <div className="form-group mt-6">
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" name="contact-email" type="email" className="w-full bg-input p-3 rounded-md" />
                  </div>
                  <div className="form-group mt-6">
                    <label htmlFor="subject">Assunto</label>
                    <input id="subject" name="subject" type="text" className="w-full bg-input p-3 rounded-md" />
                  </div>
                  <div className="form-group mt-6">
                    <label htmlFor="contact-message">Sua Mensagem</label>
                    <textarea name="contact-message" id="contact-message" rows={5} className="w-full bg-input p-3 rounded-md"></textarea>
                  </div>
                  <div className="mt-6">
                    <Button type="submit" className="w-full rn-btn">
                      <span>Enviar</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer className="py-8 section-separator">
        <div className="container mx-auto px-4 text-center">
            <div className="logo mb-4">
               <a href="#home" className="flex items-center gap-2 justify-center">
                <span className="text-3xl font-bold font-oxanium gradient-text">Lebr{"{"}o{"}"}n</span>
              </a>
            </div>
            <p className="description">© 2025. Direitos reservados a <a href="https://github.com/LeBronTech" target="_blank" className="text-primary hover:underline">Lebron Tech</a>.</p>
        </div>
      </footer>

      <div className="backto-top opacity-0 transition-opacity fixed bottom-8 right-8">
        <div className="rn-btn">
          <ArrowUp />
        </div>
      </div>
    </div>
  );
}

