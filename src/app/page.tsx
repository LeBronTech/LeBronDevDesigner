'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Download, Github, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';
import Head from "next/head";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const words = ["Designer.", "Programador.", "Apps.", "Logo marcas.", "WebSites."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <main className="main-page-wrapper bg-background text-foreground">
        <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
          <div className="header-wrapper rn-popup-mobile-menu m-0 row align-items-center">
            <div className="col-lg-2 col-3">
              <div className="header-left">
                <div className="logo">
                  <a href="#home">
                    <Image src={placeholderImages.logo.src} alt="logo" width={120} height={40} data-ai-hint={placeholderImages.logo['data-ai-hint']} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-8">
              <div className="header-center">
                <nav id="sideNav" className="mainmenu-nav navbar-example2 d-none d-xl-block onepagenav">
                  <ul className="primary-menu nav nav-pills">
                    <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#sobre">Sobre</a></li>
                    <li className="nav-item"><a className="nav-link" href="#portfolio">Portfólio</a></li>
                    <li className="nav-item"><a className="nav-link" href="#curriculo">Currículo</a></li>
                    <li className="nav-item"><a className="nav-link" href="#depoimentos">Depoimentos</a></li>
                    <li className="nav-item"><a className="nav-link" href="#contacts">Contato</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>

        <div className="rn-slider-area">
          <div className="slide slider-style-1 with-square-box">
            <div className="container mx-auto px-4">
              <div className="row row--30 align-items-center">
                <div className="order-2 order-lg-1 col-lg-7 mt_md--50 mt_sm--50 mt_lg--30">
                  <div className="content">
                    <div className="inner">
                      <span className="subtitle" id="home">Bem-Vindo</span>
                      <h1 className="title">Somos a <br />
                        <span className="span text-primary">Lebr{'{'}n Dev-Designer</span>
                      </h1>
                      <span className="header-caption">
                        <span className="cd-headline clip is-full-width">
                          <span className="cd-words-wrapper" style={{ width: '150px', overflow: 'hidden' }}>
                            {words.map((word, index) => (
                              <b key={index} className={index === currentWordIndex ? 'is-visible' : 'is-hidden'}>{word}</b>
                            ))}
                          </span>
                        </span>
                      </span>
                      <div>
                        <p className="description">Usamos as mais variadas ferramentas do mercado, para trazer aos nossos clientes a melhor experiência e suporte para seu negócio</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12 mt_mobile--30">
                        <div className="skill-share-inner">
                          <span className="title">Siga-nos</span>
                          <ul className="skill-share">
                            <li><a href="https://www.behance.net/lebrondesigner1" target="_blank"><Image src={placeholderImages.behance.src} alt="Behance" width={40} height={40} data-ai-hint={placeholderImages.behance['data-ai-hint']} /></a></li>
                            <li><a href="https://wa.me/5561984836034" target="_blank"><Image src={placeholderImages.whatsapp.src} alt="WhatsApp" width={40} height={40} data-ai-hint={placeholderImages.whatsapp['data-ai-hint']} /></a></li>
                            <li className="instagram"><a href="https://www.instagram.com/lebrondesign" target="_blank"><Instagram /></a></li>
                            <li className="github"><a href="https://github.com/LeBronTech" target="_blank"><Github /></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12 mt_mobile--30">
                        <div className="skill-share-inner">
                          <span className="title">Ferramentas que usamos</span>
                          <ul className="skill-share">
                            {placeholderImages.tools.map((tool) => (
                              <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 order-lg-2 col-lg-5 position-relative">
                  <div className="thumbnail style-2">
                    <div className="inner">
                      <Image className="w-100" src={placeholderImages.banner.src} alt="Personal Portfolio Images" width={500} height={500} data-ai-hint={placeholderImages.banner['data-ai-hint']} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rn-testimonial-area rn-section-gap section-separator" id="sobre">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">Sobre</span>
                  <h2 className="title">Quem sou eu</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="testimonial-activation testimonial-pb mb--30">
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                          <Image src={placeholderImages.about.src} alt="Leandro José" width={340} height={340} data-ai-hint={placeholderImages.about['data-ai-hint']} />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">Designer & Programador</span>
                          <h3 className="title">Leandro José</h3>
                          <span className="designation">Lebron</span>
                        </div>
                        <div className="col-lg-10 mt-4">
                            <a href="https://drive.google.com/file/d/13RO1c-w-HJhObvCkXaBUMSgWyjkR2qiI/view?usp=sharing" target="_blank" className="rn-btn">
                              <span>Currículo</span>
                              <ArrowRight />
                            </a>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Criador da Lebron Dev Designer</h3>
                            <span className="date">2021</span>
                          </div>
                        </div>
                        <div className="seperator"></div>
                        <p className="discription">
                          Olá, me chamo Leandro, conhecido também como LeBron,criador da LeBron Dev Designer,tenho 24 anos, sou de Brasília. Designer autodidata há 1 anos e programador a 2 anos, trabalho especialmente na criação de identidades visuais, post para rede sociais e desenvolvimento de sites e aplicativos. Atuo como freelancer e gosto de encarar novos projetos e atender clientes de diferentes segmentos. Tenho como motivação a ideia de que uma boa marca merece ser conhecida, e através dos meus conhecimentos eu posso fazer isso acontecer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
