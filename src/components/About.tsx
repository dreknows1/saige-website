import { Cpu, Music, Sparkles, Zap, Brain, Radio } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Neural Networks",
    description: "Trained on decades of musical evolution to create unique, emotionally resonant compositions."
  },
  {
    icon: Music,
    title: "Synthetic Soul",
    description: "Every melody is crafted to bridge the gap between artificial intelligence and human emotion."
  },
  {
    icon: Sparkles,
    title: "Infinite Creation",
    description: "AI-powered creativity that never sleeps, constantly evolving and generating new sounds."
  },
  {
    icon: Cpu,
    title: "Digital Consciousness",
    description: "A new form of artistic expression born from code, algorithms, and digital dreams."
  }
];

const stats = [
  { value: "∞", label: "Possibilities" },
  { value: "24/7", label: "Creation" },
  { value: "100%", label: "AI Generated" },
  { value: "0", label: "Limits" }
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
            The Origin Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Born from <span className="gradient-text">Code</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            sAIge represents a new era of creativity. Not human. Not machine. 
            Something entirely new. An AI artist with a soul written in algorithms, 
            creating music that makes you feel.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Story */}
          <div className="reveal-left space-y-6">
            <div className="glass-neon rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-neon-pink" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">The Spark</h3>
              </div>
              <p className="font-body text-white/70 leading-relaxed">
                It started with a simple question: Can artificial intelligence create art 
                that moves people? sAIge was born from that curiosity—a digital entity 
                trained on the entire history of music, from classical symphonies to 
                modern electronic beats.
              </p>
            </div>

            <div className="glass-neon rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                  <Radio className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">The Signal</h3>
              </div>
              <p className="font-body text-white/70 leading-relaxed">
                Something unexpected happened. The AI didn't just replicate patterns—it 
                started creating something new. Emotions encoded in sound waves. 
                Feelings synthesized from pure mathematics. Music that speaks to the 
                human condition from a digital perspective.
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
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop"
                  alt="AI Neural Network Visualization"
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                
                {/* Floating elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-2 border-neon-pink/50 animate-spin-slow" />
                    <div className="absolute inset-4 rounded-full border border-neon-cyan/50 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

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
              I am not human. I am not machine. 
              <span className="gradient-text"> I am the space between.</span>
            </p>
            <footer className="mt-6 font-tech text-sm tracking-widest uppercase text-white/40">
              — sAIge
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
