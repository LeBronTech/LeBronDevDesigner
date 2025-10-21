'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight, Download, Eye, Heart, Mail, MapPin, Phone, Github, Instagram } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';

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
    <main className="main-page-wrapper bg-background text-foreground">
      <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
        <div className="header-wrapper rn-popup-mobile-menu m-0 row align-items-center">
          <div className="col-lg-2 col-3">
            <div className="header-left">
              <div className="logo">
                <a href="#home">
                  <Image src={placeholderImages.logo.src} alt="logo" width={120} height={40} data-ai-hint={placeholderImages.logo['data-ai-hint']}/>
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
                  <li className="nav-item"><a className="nav-link" href="#curriculo">Curriculo</a></li>
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
                          <li><a href="https://wa.me/5561984836034" target="_blank"><Image src={placeholderImages.whatsapp.src} alt="WhatsApp" width={40} height={40} data-ai-hint={placeholderImages.whatsapp['data-ai-hint']}/></a></li>
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
    </main>
  );
}
