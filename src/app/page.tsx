'use client';
import Image from "next/image";
import { ArrowUp, Github, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import placeholderImages from './lib/placeholder-images.json';

export default function Home() {
  
  useEffect(() => {
    // Smooth scroll for one-page navigation
    const smothAnimation = document.querySelectorAll('.smoth-animation');
    smothAnimation.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - 50,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Back to top button
    const backToTop = document.querySelector('.backto-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          backToTop.classList.add('opacity-100');
          backToTop.classList.remove('opacity-0');
        } else {
          backToTop.classList.remove('opacity-100');
          backToTop.classList.add('opacity-0');
        }
      });

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

  }, []);

  return (
    <>
      <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
        <div className="header-wrapper rn-popup-mobile-menu m-0 row align-items-center">
          <div className="col-lg-2 col-6">
            <div className="header-left">
              <div className="logo">
                <a href="#home">
                  <Image src={placeholderImages.logo.src} alt="logo" width={120} height={40} data-ai-hint={placeholderImages.logo['data-ai-hint']} />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-6">
            <div className="header-center">
              <nav className="mainmenu-nav navbar-example2 d-none d-xl-block onepagenav">
                <ul className="primary-menu nav nav-pills">
                  <li className="nav-item"><a className="nav-link smoth-animation" href="#home">Home</a></li>
                  <li className="nav-item"><a className="nav-link smoth-animation" href="#sobre">Sobre</a></li>
                  <li className="nav-item"><a className="nav-link smoth-animation" href="#portfolio">Portfólio</a></li>
                  <li className="nav-item"><a className="nav-link smoth-animation" href="#curriculo">Currículo</a></li>
                  <li className="nav-item"><a className="nav-link smoth-animation" href="#depoimentos">Depoimentos</a></li>
                  <li className="nav-item"><a className="nav-link smoth-animation" href="#contacts">Contato</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="main-page-wrapper">
        <div id="home" className="rn-slider-area section-separator">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
              <div className="w-full lg:w-3/4 text-center lg:text-left">
                <div className="content">
                  <h1 className="title text-5xl md:text-7xl font-bold">
                    <span className="gradient-text">LebrOn</span>
                  </h1>
                  <p className="description mt-4 text-lg text-gray-400">
                    DEV-DESIGNER
                  </p>
                </div>
                <div className="mt-8 flex flex-col md:flex-row gap-12 justify-center lg:justify-start">
                  <div>
                    <span className="title text-sm uppercase tracking-wider text-gray-400">SIGA-NOS</span>
                    <div className="flex gap-4 mt-4">
                      <a href="https://www.behance.net/lebrondesigner1" target="_blank" className="rn-btn">
                        <Image src={placeholderImages.behance.src} alt="Behance" width={24} height={24} data-ai-hint={placeholderImages.behance['data-ai-hint']} />
                      </a>
                      <a href="https://wa.me/5561984836034" target="_blank" className="rn-btn"><MessageCircle /></a>
                      <a href="https://www.instagram.com/lebrondesign" target="_blank" className="rn-btn"><Instagram /></a>
                      <a href="https://github.com/LeBronTech" target="_blank" className="rn-btn"><Github /></a>
                    </div>
                  </div>
                  <div>
                    <span className="title text-sm uppercase tracking-wider text-gray-400">FERRAMENTAS QUE USAMOS</span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mt-4">
                      {placeholderImages.tools.map((tool) => (
                        <div key={tool.alt} className="p-3 bg-card rounded-lg shadow-lg flex items-center justify-center w-16 h-16">
                          <Image src={tool.src} alt={tool.alt} width={32} height={32} data-ai-hint={tool['data-ai-hint']} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="backto-top opacity-0 transition-opacity">
          <div>
            <ArrowUp />
          </div>
        </div>
      </main>

      <footer className="rn-footer-area rn-section-gap section-separator">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <div className="logo">
                    <a href="#home">
                      <Image src={placeholderImages.logo.src} alt="logo" width={120} height={40} data-ai-hint={placeholderImages.logo['data-ai-hint']}/>
                    </a>
                </div>
                <p className="description mt-4">© 2025. Direitos reservados a <a target="_blank" href="https://github.com/LeBronTech" className="text-primary hover:underline">Lebron Tech.</a></p>
            </div>
        </div>
    </footer>
    </>
  );
}
