import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark to-dark-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-serif italic gradient-text mb-4">
            Join the Stream
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Get exclusive access to new releases, virtual concerts, and connect with the movement. 
            Zero spam. Just soul.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-dark-200 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitted}
              className={`px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                isSubmitted
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-secondary to-accent text-dark hover:shadow-lg hover:shadow-secondary/30'
              }`}
            >
              {isSubmitted ? (
                <>
                  <Check size={20} />
                  Subscribed!
                </>
              ) : (
                <>
                  SUBSCRIBE
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          By subscribing, you agree to receive updates from sAIge. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
