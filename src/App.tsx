import { useEffect } from 'react';
import Hero from './components/Hero';
import LatestRelease from './components/LatestRelease';
import MusicSection from './components/MusicSection';
import VideoSection from './components/VideoSection';
import GallerySection from './components/GallerySection';
import MerchSection from './components/MerchSection';
import About from './components/About';
import ConnectSection from './components/ConnectSection';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';

function App() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all elements with reveal classes
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-void text-white overflow-x-hidden animated-bg">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main>
        <Hero />
        <LatestRelease />
        <MusicSection />
        <VideoSection />
        <GallerySection />
        <MerchSection />
        <About />
        <ConnectSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Global Audio Player */}
      <GlobalAudioPlayer />
      
      {/* Ambient glow orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-neon-pink/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-neon-violet/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '4s' }} />
    </div>
  );
}

export default App;
