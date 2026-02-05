import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-primary">
            🎓 CodeMentor AI
          </div>
          <div className="space-x-4">
            <Link to="/login" className="px-6 py-2 text-primary hover:text-blue-700">
              Login
            </Link>
            <Link to="/register" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition">
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Learn to Code with
            <span className="text-primary"> AI Guidance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Personalized learning plans, intelligent code explanations, and progress tracking - all powered by AI
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition shadow-lg">
              Start Learning Free
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white text-primary rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-primary">
              Try Demo
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✨ No backend required • Works in demo mode • Perfect for learning
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-3">AI Code Explainer</h3>
            <p className="text-gray-600">
              Get instant, intelligent explanations of any code snippet tailored to your skill level
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-3">Learning Plans</h3>
            <p className="text-gray-600">
              Generate personalized study roadmaps based on your goals and available time
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your learning journey with detailed statistics and achievement tracking
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Set Your Goals</h3>
                <p className="text-gray-600">Tell us what you want to learn and your current skill level</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Get Your Plan</h3>
                <p className="text-gray-600">Receive a personalized learning roadmap with weekly topics and resources</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Learn & Practice</h3>
                <p className="text-gray-600">Use AI-powered code explanations and track your progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Supported Languages</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'PHP'].map(lang => (
              <span key={lang} className="px-6 py-3 bg-white rounded-full shadow text-gray-700 font-semibold">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of developers learning smarter with AI</p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-primary rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg">
            Get Started Now - It's Free!
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p className="mb-2">Built with ❤️ for the developer community</p>
          <p className="text-sm">React • TailwindCSS • Node.js • MongoDB • OpenAI</p>
        </footer>
      </div>
    </div>
  );
}

export default Landing;
