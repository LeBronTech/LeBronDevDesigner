'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Download, Github, Instagram, Layout, Slack, Smartphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';
import Head from "next/head";
import { Progress } from "@/components/ui/progress";


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
      <Head>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <main className="main-page-wrapper">
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
                        <span className="span">Lebr{'{'}n Dev-Designer</span>
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
                        <div className="col-lg-10">
                            <Button asChild>
                              <a href="https://drive.google.com/file/d/13RO1c-w-HJhObvCkXaBUMSgWyjkR2qiI/view?usp=sharing" target="_blank">
                                <span>Currículo</span>
                                <ArrowRight />
                              </a>
                            </Button>
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

        <div className="rn-service-area rn-section-gap section-separator" id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-left" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true">
                  <h2 className="title">O que fazemos</h2>
                </div>
              </div>
            </div>
            <div className="row row--25 mt_md--10 mt_sm--10">
              <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30">
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <Layout />
                    </div>
                    <div className="content">
                      <h4 className="title"><a href="#portfolio">WebSites</a></h4>
                      <p className="description">Desenvolvimento de sites e landpages em html.</p>
                      <a className="read-more-button" href="#portfolio"><ArrowRight /></a>
                    </div>
                  </div>
                  <a className="over-link" href="#portfolio"></a>
                </div>
              </div>
              <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30">
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <Smartphone />
                    </div>
                    <div className="content">
                      <h4 className="title"><a href="#app">Aplicativos Mobile</a></h4>
                      <p className="description">Desenvolvimento de aplicativos para IOS e Android.</p>
                      <a className="read-more-button" href="#app"><ArrowRight /></a>
                    </div>
                  </div>
                  <a className="over-link" href="#app"></a>
                </div>
              </div>
              <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30">
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <Slack />
                    </div>
                    <div className="content">
                      <h4 className="title"><a href="#visual">Indentidade Visual</a></h4>
                      <p className="description">Logo marca,cartão de visita, e todo Designer com a cara do seu negocio.</p>
                      <a className="read-more-button" href="#visual"><ArrowRight /></a>
                    </div>
                  </div>
                  <a className="over-link" href="#visual"></a>
                </div>
              </div>
              <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30">
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <Instagram />
                    </div>
                    <div className="content">
                      <h4 className="title"><a href="#redes">Rede Sociais</a></h4>
                      <p className="description">Artes para posts no Instagram, Facebook etc...</p>
                      <a className="read-more-button" href="#redes"><ArrowRight /></a>
                    </div>
                  </div>
                  <a className="over-link" href="#redes"></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rn-portfolio-area rn-section-gap section-separator" id="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">Veja nosso portfólio e de seu feedback</span>
                  <h1 className="title">Portfólio</h1>
                </div>
              </div>
            </div>
            <div className="inner">
              <div className="section-title text-center">
                <div className="icon">
                  <h4 className="title sec-title"><Layout />Websites</h4>
                </div>
              </div>
              <div className="testimonial-activation testimonial-pb mb--30">
                <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                  <div className="inner">
                    <div className="card-info">
                      <div className="card-thumbnail">
                        <a href="https://lebrontech.github.io/Restaurante-Gusto/" target="_blank">
                          <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.website1.src} alt="Restaurante Gusto" data-ai-hint={placeholderImages.portfolio.website1['data-ai-hint']} />
                        </a>
                      </div>
                      <div className="card-content">
                        <h3 className="title">Restaurante Gusto</h3>
                        <span className="subtitle mt--10">Clique na Imagem</span>
                      </div>
                    </div>
                    <div className="card-description">
                      <div className="title-area">
                        <div className="title-info">
                          <div className="skill-share-inner">
                            <span className="subtitle">Ferramentas</span>
                            <ul className="skill-share">
                               {placeholderImages.portfolio.website1.tools.map((tool) => (
                                <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <span className="designation">
                        Site responsivo desenvolvido em HTML usando JavaScript e CSS, com design agradavel e intuitivo
                      </span>
                      <a href="https://lebrontech.github.io/Restaurante-Gusto/" target="_blank" className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                    </div>
                  </div>
                </div>

                <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                  <div className="inner">
                    <div className="card-info">
                      <div className="card-thumbnail">
                        <a href="https://ionelourencodecor.lojavirtualnuvem.com.br/" target="_blank">
                          <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.website2.src} alt="IoneDecor" data-ai-hint={placeholderImages.portfolio.website2['data-ai-hint']} />
                        </a>
                      </div>
                      <div className="card-content">
                        <h3 className="title">IoneDecor</h3>
                        <span className="subtitle mt--10">Clique na Imagem</span>
                      </div>
                    </div>
                    <div className="card-description">
                      <div className="title-area">
                        <div className="title-info">
                            <div className="skill-share-inner">
                              <span className="subtitle mt--10">Ferramentas</span>
                              <ul className="skill-share d-flex liststyle">
                                {placeholderImages.portfolio.website2.tools.map((tool) => (
                                  <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                                ))}
                              </ul>
                            </div>
                        </div>
                      </div>
                      <span className="designation">
                        Site responsivo desenvolvido para MARKETPLACE, com checkout e design minimalista                                       
                      </span>
                      <a href="https://ionelourencodecor.lojavirtualnuvem.com.br/" target="_blank" className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                    </div>
                  </div>
                </div>

                <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                  <div className="inner">
                    <div className="card-info">
                      <div className="card-thumbnail">
                        <a href="https://leandrolebron2203.wixsite.com/capital-arte" target="_blank">
                           <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.website3.src} alt="Capital Arte" data-ai-hint={placeholderImages.portfolio.website3['data-ai-hint']} />
                        </a>
                      </div>
                      <div className="card-content">
                        <h3 className="title">Capital Arte</h3>
                        <span className="subtitle mt--10">Clique na Imagem</span>
                      </div>
                    </div>
                    <div className="card-description">
                      <div className="title-area">
                        <div className="title-info">
                          <div className="skill-share-inner">
                            <span className="subtitle mt--10">Ferramentas</span>
                            <ul className="skill-share d-flex liststyle">
                              {placeholderImages.portfolio.website3.tools.map((tool) => (
                                  <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <span className="designation">
                        Site responsivo, institucional para apresentação da marca
                      </span>
                      <a href="https://leandrolebron2203.wixsite.com/capital-arte" target="_blank" className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="container" id="app">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center">
                    <div className="icon"><h4 className="title sec-title"><Smartphone />Apps</h4></div>
                    <div className="portfolio-slick-activation slick-arrow-style-one rn-slick-dot-style">
                      <div className="rn-portfolio-slick preview-type-gallery">
                        <div className="rn-portfolio portfolio-card-only-popup">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="#!"><Image loading="lazy" width="340" height="250" src="https://picsum.photos/seed/app1/340/250" alt="Burger Home" data-ai-hint="burger app" /></a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a>Burger Home</a>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="#!">Em Breve <ArrowRight /></a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rn-portfolio-slick preview-type-gallery">
                        <div className="rn-portfolio portfolio-card-only-popup">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="#!"><Image loading="lazy" width="340" height="250" src="https://picsum.photos/seed/app2/340/250" alt="Analise" data-ai-hint="analytics app" /></a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a>Analise</a>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="#!">Em Breve <ArrowRight /></a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rn-portfolio-slick preview-type-gallery">
                        <div className="rn-portfolio portfolio-card-only-popup">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="#!"><Image loading="lazy" width="340" height="250" src="https://picsum.photos/seed/app3/340/250" alt="Saude" data-ai-hint="health app" /></a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a >Saude</a>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="#!">Em Breve <ArrowRight /></a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rn-portfolio-area rn-section-gap section-separator" id="visual">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center">
                      <div className="inner">
                        <div className="icon">
                          <h4 className="title sec-title"><Slack />Identidade Visual</h4>
                        </div>
                      </div>
                      <div className="testimonial-activation testimonial-pb mb--30">
                        <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                          <div className="inner">
                            <div className="card-info">
                              <div className="card-thumbnail">
                                <a href="https://www.behance.net/lebrondesigner1" target="_blank">
                                  <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.identity1.src} alt="Doo&Dou" data-ai-hint={placeholderImages.portfolio.identity1['data-ai-hint']} />
                                </a>
                              </div>
                              <div className="card-content">
                                <h3 className="title">Doo&Dou</h3>
                                <span className="subtitle mt--10">Clique na Imagem</span>
                              </div>
                            </div>
                            <div className="card-description">
                              <div className="title-area">
                                <div className="title-info">
                                  <div className="skill-share-inner">
                                    <span className="subtitle mt--10">Ferramentas</span>
                                    <ul className="skill-share d-flex liststyle">
                                      {placeholderImages.portfolio.identity1.tools.map((tool) => (
                                        <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <span className="designation">Indentidade criada para passar confiaça aos donos dos pets, baseada na cor alaranjada</span>
                              <a href="https://www.instagram.com/lebrondesign/" target="_blank" className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                            </div>
                          </div>
                        </div>

                        <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                          <div className="inner">
                            <div className="card-info">
                              <div className="card-thumbnail">
                                <a href="https://www.instagram.com/lebrondesign/" target="_blank">
                                  <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.identity2.src} alt="Automotic" data-ai-hint={placeholderImages.portfolio.identity2['data-ai-hint']} />
                                </a>
                              </div>
                              <div className="card-content">
                                <h3 className="title">Automotic</h3>
                                <span className="subtitle mt--10">Clique na Imagem</span>
                              </div>
                            </div>
                            <div className="card-description">
                              <div className="title-area">
                                <div className="title-info">
                                  <div className="skill-share-inner">
                                    <span className="subtitle mt--10">Ferramentas</span>
                                    <ul className="skill-share d-flex liststyle">
                                      {placeholderImages.portfolio.identity2.tools.map((tool) => (
                                        <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <span className="designation">Indentidade criada com base na cor amarela, como a logo em formato arrendondado remetendo ao ramo automobilístico</span>
                              <a href="https://www.instagram.com/lebrondesign/" target="_blank" className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                            </div>
                          </div>
                        </div>

                        <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                          <div className="inner">
                            <div className="card-info">
                              <div className="card-thumbnail">
                                <a href="https://www.instagram.com/lebrondesign/" target="_blank">
                                  <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.identity3.src} alt="Capilar Ela" data-ai-hint={placeholderImages.portfolio.identity3['data-ai-hint']} />
                                </a>
                              </div>
                              <div className="card-content">
                                <h3 className="title">Capilar Ela</h3>
                                <span className="subtitle mt--10">Clique na imagem</span>
                              </div>
                            </div>
                            <div className="card-description">
                              <div className="title-area">
                                <div className="title-info">
                                  <div className="skill-share-inner">
                                    <span className="subtitle mt--10">Ferramentas</span>
                                    <ul className="skill-share d-flex liststyle">
                                      {placeholderImages.portfolio.identity3.tools.map((tool) => (
                                        <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <span className="designation">Indentidade baseada na cor rosa, fonte arredondada e em minúsculo para passar a impressão amigável</span>
                              <a href="https://www.instagram.com/lebrondesign/" target="_blank"  className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rn-portfolio-area rn-section-gap section-separator" id="redes">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center">
                      <div className="inner">
                        <div className="icon">
                          <h4 className="title sec-title"><Instagram />Rede Sociais</h4>
                        </div>
                      </div>
                      <div className="testimonial-activation testimonial-pb mb--30">
                        <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                          <div className="inner">
                            <div className="card-info">
                              <div className="card-thumbnail">
                                <a href="https://www.behance.net/gallery/189159481/Criativo-para-Rede-Socias" target="_blank">
                                  <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.social1.src} alt="Hamburgueria" data-ai-hint={placeholderImages.portfolio.social1['data-ai-hint']} />
                                </a>
                              </div>
                              <div className="card-content">
                                <h3 className="title">Hamburgueria</h3>
                                <span className="subtitle mt--10">Clique na Imagem</span>
                              </div>
                            </div>
                            <div className="card-description">
                              <div className="title-area">
                                <div className="title-info">
                                  <div className="skill-share-inner">
                                    <span className="subtitle">Ferramentas</span>
                                    <ul className="skill-share d-flex liststyle">
                                      {placeholderImages.portfolio.social1.tools.map((tool) => (
                                        <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <span className="designation">Criativos de Hamburgueria para rede socias<br /></span>
                              <a href="https://www.behance.net/gallery/189159481/Criativo-para-Rede-Socias" target="_blank" className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                            </div>
                          </div>
                        </div>
                        <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                          <div className="inner">
                            <div className="card-info">
                              <div className="card-thumbnail">
                                <a href="https://www.behance.net/gallery/189872917/Criativos-para-Pizzaria" target="_blank">
                                  <Image loading="lazy" width="340" height="250" src={placeholderImages.portfolio.social2.src} alt="Pizzaria" data-ai-hint={placeholderImages.portfolio.social2['data-ai-hint']} />
                                </a>
                              </div>
                              <div className="card-content">
                                <h3 className="title">Pizzaria</h3>
                                <span className="subtitle mt--10">Clique na Imagem</span>
                              </div>
                            </div>
                            <div className="card-description">
                              <div className="title-area">
                                <div className="title-info">
                                  <div className="skill-share-inner">
                                    <span className="subtitle mt--10">Ferramentas</span>
                                    <ul className="skill-share d-flex liststyle">
                                     {placeholderImages.portfolio.social2.tools.map((tool) => (
                                        <li key={tool.alt}><Image src={tool.src} alt={tool.alt} width={40} height={40} data-ai-hint={tool['data-ai-hint']} /></li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <span className="designation">Criativos de pizzaria para rede socias</span>
                              <a href="https://www.behance.net/gallery/189872917/Criativos-para-Pizzaria" target="_blank" className="rn-btn w-75 text-center"> <span>Ver projeto</span>  <ArrowRight /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rn-resume-area rn-section-gap section-separator" id="curriculo">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2 className="title">Currículo</h2>
                </div>
              </div>
            </div>
            <div className="row mt--45">
              <div className="col-lg-12">
                <ul className="rn-nav-list nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')} id="education-tab" data-bs-toggle="tab" href="#education" role="tab" aria-controls="education" aria-selected={activeTab === 'education'}>Formação</a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'professional' ? 'active' : ''}`} onClick={() => setActiveTab('professional')} id="professional-tab" data-bs-toggle="tab" href="#professional" role="tab" aria-controls="professional" aria-selected={activeTab === 'professional'}>Habilidades</a>
                  </li>
                </ul>

                <div className="rn-nav-content tab-content" id="myTabContents">
                  {activeTab === 'education' && (
                    <div id="education" role="tabpanel" aria-labelledby="education-tab">
                      <div className="personal-experience-inner mt--40">
                        <div className="row">
                          <div className="col-lg-6 col-md-12 col-12">
                            <div className="content">
                              <span className="subtitle">2018-2020</span>
                              <h4 className="maintitle">Faculdade</h4>
                              <div className="experience-list">
                                <div className="resume-single-list">
                                  <div className="inner">
                                    <div className="heading">
                                      <div className="title">
                                        <h4>Web Disigner</h4>
                                        <span>Faculdade Projeção</span>
                                      </div>
                                      <div className="date-of-time">
                                        <span>2018</span>
                                      </div>
                                    </div>
                                    <p className="description">Formação em Html,CSS,JavaScript e desenvolvimento do primeiro site.</p>
                                  </div>
                                </div>
                                <div className="resume-single-list">
                                  <div className="inner">
                                    <div className="heading">
                                      <div className="title">
                                        <h4> App Mobile</h4>
                                        <span></span>
                                      </div>
                                      <div className="date-of-time">
                                        <span>2019</span>
                                      </div>
                                    </div>
                                    <p className="description">Certificação de desnvolvimento em Android.</p>
                                  </div>
                                </div>
                                <div className="resume-single-list">
                                  <div className="inner">
                                    <div className="heading">
                                      <div className="title">
                                        <h4>Disigner</h4>
                                        <span></span>
                                      </div>
                                      <div className="date-of-time">
                                        <span>2020</span>
                                      </div>
                                    </div>
                                    <p className="description"> Certificação em photoshop,canvas,figma e coredraw.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'professional' && (
                  <div id="professional" role="tabpanel" aria-labelledby="professional-tab">
                    <div className="personal-experience-inner mt--40">
                      <div className="row row--40">
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="progress-wrapper">
                            <div className="content">
                              <span className="subtitle">Habilidades</span>
                              <h4 className="maintitle">Design</h4>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">PHOTOSHOP</h6>
                                <div className="progress"><Progress value={75} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">FIGMA</h6>
                                <div className="progress"><Progress value={75} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">ADOBE XD</h6>
                                <div className="progress"><Progress value={60} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">ADOBE ILLUSTRATOR</h6>
                                <div className="progress"><Progress value={70} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">Corel</h6>
                                <div className="progress"><Progress value={70} className="progress-bar" /></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 mt_sm--60">
                          <div className="progress-wrapper">
                            <div className="content">
                              <span className="subtitle">Habilidades</span>
                              <h4 className="maintitle">Development</h4>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">HTML</h6>
                                <div className="progress"><Progress value={85} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">CSS</h6>
                                <div className="progress"><Progress value={80} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">JAVASCRIPT</h6>
                                <div className="progress"><Progress value={70} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">SOFTWARE</h6>
                                <div className="progress"><Progress value={75} className="progress-bar" /></div>
                              </div>
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">PLUGIN</h6>
                                <div className="progress"><Progress value={70} className="progress-bar" /></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rn-testimonial-area rn-section-gap section-separator" id="depoimentos">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">O que os clientes dizem</span>
                  <h2 className="title">Depoimentos</h2>
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
                          <Image src="https://picsum.photos/seed/t1/340/340" alt="Testimonial-image" width={340} height={340} data-ai-hint="man portrait" />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">App</span>
                          <h3 className="title">Andersson Quentilha</h3>
                          <span className="designation">CEO de loja</span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Aplicativo para loja</h3>
                            <span className="date">Via Whatsapp</span>
                          </div>
                        </div>
                        <div className="seperator"></div>
                        <p className="discription">
                          Já fazia algum tempo que queria fazer um aplicativo para minha loja, entrei em contato com o Leandro que foi muito atencioso e tirou minhas dúvidas e em poucos dias já estava com o aplicativo funcionando.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                          <Image src="https://picsum.photos/seed/t2/340/340" alt="Testimonial-image" width={340} height={340} data-ai-hint="man portrait" />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">Site</span>
                          <h3 className="title">Jone Duone Joe</h3>
                          <span className="designation">Dono de Restaurante</span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Site para restaurante</h3>
                            <span className="date">Via Direct</span>
                          </div>
                        </div>
                        <div className="seperator"></div>
                        <p className="discription">
                          A equipe que trabalhou no nosso site foi extremamente profissional, ouvindo nossas necessidades e incorporando-as de forma criativa no design e funcionalidades. Também ficamos impressionados com a adaptabilidade do site para dispositivos móveis, permitindo que nossos clientes acessem e façam reservas de onde estiverem.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                           <Image src="https://picsum.photos/seed/t3/340/340" alt="Testimonial-image" width={340} height={340} data-ai-hint="woman portrait" />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">LogoTipo</span>
                          <h3 className="title">Ione Lourenço</h3>
                          <span className="designation">Produtora de Almofadas</span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Criação de Logo</h3>
                            <span className="date">Via Whatsapp</span>
                          </div>
                        </div>
                        <div className="seperator"></div>
                        <p className="discription">
                          A nova logo para nossa loja de almofadas capturou perfeitamente a essência do nosso negócio: simples, aconchegante e moderna.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rn-contact-area rn-section-gap section-separator" id="contacts">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <span className="subtitle">Contato</span>
                            <h2 className="title">Fale conosco</h2>
                        </div>
                    </div>
                </div>

                <div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
                    <div className="col-lg-5">
                        <div className="contact-about-area">
                            <div className="thumbnail">
                                <Image src="https://picsum.photos/seed/contact/500/500" alt="contact-img" width={500} height={500} data-ai-hint="office workspace" />
                            </div>
                            <div className="title-area">
                                <h4 className="title">Leandro</h4>
                                <span></span>
                            </div>
                            <div className="description">
                                <p>Estamos disponiveis tambem para trabalhos freelancer
                                </p>
                                <span className="telefone">Phone: <a href="https://api.whatsapp.com/send?phone=5561984836034&text=Olá%20gostaria%20de%20fazer%20um%20orçamento">61984836034</a></span>
                                <span className="mail">Email: <a href="mailto:lebronempresas@gmail.com?subject=&body=Ol%C3%A1%20gostaria%20de%20fazer%20um%20or%C3%A7amento">lebronempresas@gmail.com</a></span>
                            </div>
                            <div className="social-area">
                                <div className="name">Siga-nos</div>
                                <div className="social-icone">
                                    <a href="https://wa.me/5561984836034" target="_blank"><Image src={placeholderImages.whatsapp.src} alt="WhatsApp" width={40} height={40} data-ai-hint={placeholderImages.whatsapp['data-ai-hint']} /></a>
                                    <a href="https://www.behance.net/lebrondesigner1" target="_blank"><Image src={placeholderImages.behance.src} alt="Behance" width={40} height={40} data-ai-hint={placeholderImages.behance['data-ai-hint']} /></a>
                                    <a href="https://instagram.com/lebrondesign"><Instagram /></a> 
                                    <a href="https://github.com/LeBronTech"><Github /></a> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-aos-delay="600" className="col-lg-7 contact-input">
                        <div className="contact-form-wrapper">
                            <div className="introduce">
                                <form className="rnt-contact-form rwt-dynamic-form row" id="contact-form" method="POST" action="mail.php">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="contact-name">Seu nome</label>
                                            <input className="form-control form-control-lg" name="contact-name" id="contact-name" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="contact-phone">Telefone</label>
                                            <input className="form-control" name="contact-phone" id="contact-phone" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="contact-email">Email</label>
                                            <input className="form-control form-control-sm" id="contact-email" name="contact-email" type="email" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="subject">Assunto</label>
                                            <input className="form-control form-control-sm" id="subject" name="subject" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="contact-message">Sua Menssagem</label>
                                            <textarea name="contact-message" id="contact-message" cols={30} rows={10}></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="rn-footer-area rn-section-gap section-separator">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer-area text-center">
                            <div className="logo">
                                <a href="index.html">
                                  <Image src={placeholderImages.logo.src} alt="logo" width={120} height={40} data-ai-hint={placeholderImages.logo['data-ai-hint']} />
                                </a>
                            </div>
                            <p className="description mt--30">© 2025. Direitos reservados a <a target="_blank" href="https://github.com/LeBronTech">Lebron Tech.</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </main>
    </>
  );
}
