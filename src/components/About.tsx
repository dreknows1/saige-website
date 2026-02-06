import { MapPin, Music, Headphones, Star, Radio, Sparkles } from 'lucide-react';

const stats = [
  { value: "3,541", label: "Monthly Listeners" },
  { value: "12K+", label: "Streams" },
  { value: "16", label: "Tracks Released" },
  { value: "4", label: "Projects" }
];

const features = [
  {
    icon: Music,
    title: "Soulful Sound",
    description: "R&B vocals with emotive storytelling that connects with listeners on a deep level."
  },
  {
    icon: MapPin,
    title: "Boston Roots",
    description: "Born and raised in Springfield, MA now creating music from Boston, MA - authentic East Coast R&B energy."
  },
  {
    icon: Headphones,
    title: "Modern Production",
    description: "Blending traditional R&B soul with contemporary production techniques for today's sound."
  },
  {
    icon: Star,
    title: "AI-Assisted",
    description: "Pioneering artist using AI music tools like SUNO to create unique, innovative compositions."
  }
];

const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-violet/30 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="reveal text-center mb-20">
          <span className="font-tech text-neon-pink text-xs tracking-[0.3em] uppercase mb-4 block">
            The Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Meet <span className="gradient-text">Saige</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            A Boston-based R&B artist creating soulful music that bridges traditional R&B 
            with modern innovation. With emotive vocals and storytelling at the core, 
            Saige is pioneering a new wave of AI-assisted music creation.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Story */}
          <div className="reveal-left space-y-6">
            <div className="glass-neon rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center">
                  <Radio className="w-6 h-6 text-neon-pink" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">The Beginning</h3>
              </div>
              <p className="font-body text-white/70 leading-relaxed">
                Originally from Springfield, MA, Saige's musical journey began with a passion 
                for soulful R&B and storytelling. Moving to Boston opened doors to collaborate 
                with producers and artists in a thriving music scene.
              </p>
            </div>

            <div className="glass-neon rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">The Innovation</h3>
              </div>
              <p className="font-body text-white/70 leading-relaxed">
                Embracing the future of music production, Saige uses AI tools like SUNO 
                to craft unique sounds. The result is a distinctive blend: human emotion 
                and storytelling paired with cutting-edge music technology.
              </p>
            </div>

            <div className="glass-neon rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neon-violet/20 flex items-center justify-center">
                  <Music className="w-6 h-6 text-neon-violet" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">The Music</h3>
              </div>
              <p className="font-body text-white/70 leading-relaxed">
                "Heartbreaks Algorithm" is the debut album — 16 tracks that explore love, loss, 
                and healing. From the interlude "Act 1: The Birth" to soulful tracks like 
                "Me Gustas" and "So Dope", it's a journey through emotion and sound.
              </p>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="reveal-right relative">
            {/* Central orb */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink via-neon-violet to-neon-cyan rounded-full blur-[100px] opacity-30 animate-pulse-slow" />
              
              {/* Main visual */}
              <div className="relative h-full rounded-2xl overflow-hidden glass-neon">
                <img 
                  src="/assets/images/promo-7.png"
                  alt="Saige"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

                {/* Corner stats */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center p-3 rounded-xl bg-black/40 backdrop-blur-sm">
                      <div className="font-display text-2xl font-bold text-neon-pink">{stat.value}</div>
                      <div className="font-tech text-xs tracking-wider uppercase text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="reveal-scale group glass-neon rounded-2xl p-6 card-lift"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-violet/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-neon-pink" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-neon-pink transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="reveal mt-20 text-center">
          <blockquote className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-neon-pink/20 font-serif">"</div>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white/90 italic max-w-4xl mx-auto leading-relaxed">
              Music is about connection. 
              <span className="gradient-text"> Whether the tools are analog or AI-powered,</span> 
              <br className="hidden md:block" />
              the emotion has to be real.
            </p>
            <footer className="mt-6 font-tech text-sm tracking-widest uppercase text-white/40">
              — Saige
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
