import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Mail, Calendar, Shield, Quote } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 border border-gray-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 border border-gray-300 rounded-full opacity-30"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Clock className="h-8 w-8" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              TimeCapsule
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-gray-600 transition-all duration-300 hover:scale-105"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-gray-600 transition-all duration-300 hover:scale-105"
            >
              How It Works
            </Link>
            <Link
              href="/create"
              className="text-sm font-medium hover:text-gray-600 transition-all duration-300 hover:scale-105"
            >
              Create Message
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
        {/* Decorative elements */}
        <div
          className="absolute top-10 left-1/4 w-2 h-2 bg-black rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-20 right-1/3 w-1 h-1 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-black rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Large decorative quote marks */}
        <div className="absolute top-16 left-8 opacity-10">
          <Quote className="h-24 w-24 transform rotate-180" />
        </div>
        <div className="absolute bottom-16 right-8 opacity-10">
          <Quote className="h-24 w-24" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              A Letter to Your
              <br />
              <span className="italic relative">
                Future Self
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-20"></div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Capture this moment in time. Write a message to yourself and receive it exactly when you need it most.
              Your thoughts, dreams, and reflections, delivered to your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Write Your Message
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-black text-black hover:bg-gray-50 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-12 animate-float">
          <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/3 right-16 animate-float-delayed">
          <div className="w-6 h-6 border-2 border-gray-300 rotate-45"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-white">
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 relative">
              Why TimeCapsule?
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-black"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              More than just a message service—it's a bridge between who you are today and who you'll become.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50 group">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Personal Messages</h3>
              <p className="text-gray-600">
                Write heartfelt messages to your future self with complete privacy and security.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50 group">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Choose Your Date</h3>
              <p className="text-gray-600">
                Select any future date—from tomorrow to decades ahead—for message delivery.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50 group">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your messages are encrypted and stored securely until the perfect moment arrives.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50 group">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Perfect Timing</h3>
              <p className="text-gray-600">Receive your message exactly when you scheduled it, delivered with care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 relative">
              How It Works
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-black"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to connect with your future self
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-6 left-1/3 right-1/3 h-px bg-gradient-to-r from-black via-gray-400 to-black transform translate-y-6"></div>

              <div className="text-center relative">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Write</h3>
                <p className="text-gray-600">
                  Compose your message with thoughts, goals, dreams, or advice for your future self.
                </p>
              </div>

              <div className="text-center relative">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Schedule</h3>
                <p className="text-gray-600">
                  Choose the perfect date in the future when you want to receive your message.
                </p>
              </div>

              <div className="text-center relative">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Receive</h3>
                <p className="text-gray-600">
                  Get your message delivered exactly when you need it, like a gift from your past self.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Start Your Journey Through Time</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            What would you tell your future self? What dreams are you chasing? What wisdom would you share? The
            conversation starts now.
          </p>
          <Link href="/create">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create Your Time Capsule
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Clock className="h-6 w-6" />
              <span className="text-xl font-serif font-bold">TimeCapsule</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-black transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-black transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-black transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} TimeCapsule. Connecting you with your future self.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
