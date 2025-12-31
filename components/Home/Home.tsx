
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Shield, Sparkles, Building2, Landmark, TreePine, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Bengaluru Skyline"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/20 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold uppercase tracking-wider">The Silicon Valley of India</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Fixing <span className="text-indigo-400">Bengaluru</span>,<br />One Ward at a Time.
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            A bridge between citizens and councillors. Report civic issues, track progress, and build a better Bengaluru with AI-powered efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* About Bengaluru Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Bengaluru: The Garden City turned Global Hub</h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Bengaluru, formerly known as Bangalore, is the capital of Karnataka. Once called the "Garden City of India" for its lush green spaces like Cubbon Park and Lalbagh, it has evolved into the "Silicon Valley of India," a global center for technology and innovation.
                </p>
                <p>
                  With rapid growth comes significant civic challenges. From traffic congestion and waste management to road maintenance and water supply, our 198+ wards require constant attention and community participation.
                </p>
                <p className="font-semibold text-slate-900">
                  Fix-My-Ward empowers you to play an active role in maintaining the grandeur of our city.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Landmark className="w-8 h-8 text-indigo-600 mb-2" />
                  <h4 className="font-bold text-slate-900">Culture</h4>
                  <p className="text-sm text-slate-500">Rich heritage meeting modern life.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <TreePine className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="font-bold text-slate-900">Greenery</h4>
                  <p className="text-sm text-slate-500">Preserving our garden legacy.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1605649440416-43f942621619?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" alt="Vidhana Soudha" />
              <img src="https://images.unsplash.com/photo-1590766948510-122170428d01?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-lg mt-8 hover:scale-105 transition-transform duration-500" alt="Bangalore Palace" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How it Works</h2>
            <p className="text-xl text-slate-500">Making civic reporting as easy as sending a message.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <MapPin className="w-7 h-7 text-indigo-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Spot & Pinpoint</h3>
              <p className="text-slate-600 leading-relaxed">
                See a pothole, broken light, or garbage pile? Just take a photo and pin it to your ward.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <Sparkles className="w-7 h-7 text-indigo-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">AI-Powered Reports</h3>
              <p className="text-slate-600 leading-relaxed">
                Our Gemini AI turns your quick notes into formal, professional reports for the councillor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <Zap className="w-7 h-7 text-indigo-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Track in Real-time</h3>
              <p className="text-slate-600 leading-relaxed">
                Watch as your councillor starts work, updates status, and resolves the issue in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Explore Our Beautiful City</h2>
              <p className="text-lg text-slate-500">From the colonial architecture of the Palace to the modern glass towers of Whitefield.</p>
            </div>
            <Link to="/signup" className="text-indigo-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              Join the movement <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-64 overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Bangalore Temple" />
            </div>
            <div className="h-64 overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1610444583731-9e1e0d4245cc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="City Street" />
            </div>
            <div className="h-64 overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1616843413587-9e3a37f7bbd8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Park" />
            </div>
            <div className="h-64 overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Nightscape" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to make a difference?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join thousands of citizens in Bengaluru who are actively reporting and resolving ward-level issues.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup" className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all shadow-lg">
                  Sign Up Now
                </Link>
                <Link to="/login" className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Building2 className="w-64 h-64" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
