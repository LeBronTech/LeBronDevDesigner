'use client';
import Image from "next/image";
import { ArrowUp, Behance, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImages from './lib/placeholder-images.json';
import { cn } from "@/lib/utils";

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWord, setCurrentWord] = useState('');

  useEffect(() => {
    if (index >= words.length) return; // Stop if index is out of bounds

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
      <span className="absolute right-[-2px] top-0 bottom-0 w-0.5 bg-foreground animate-ping" />
    </span>
  );
};


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
        <div id="home" className="min-h-screen flex items-center justify-center section-separator">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <span className="text-sm uppercase tracking-[5px] text-gray-400">BEM-VINDO</span>
              <h1 className="text-5xl md:text-7xl font-bold mt-4">Somos a</h1>
              <h2 className="text-5xl md:text-7xl font-bold mt-2">
                <span className="gradient-text">Lebr{"{"}o{"}"}n Dev-Designer</span>
              </h2>
              <h3 className="text-4xl md:text-6xl mt-4 typing-container">
                <TypingEffect words={["Apps.", "Websites.", "Logos."]} />
              </h3>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
                Usamos as mais variadas ferramentas do mercado, para trazer aos nossos clientes a melhor experiência e suporte para seu negócio
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="backto-top opacity-0 transition-opacity">
        <div>
          <ArrowUp />
        </div>
      </div>
    </div>
  );
}
