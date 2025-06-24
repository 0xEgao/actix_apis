'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ArrowLeft, Send, Sparkles } from 'lucide-react';

export default function CreateMessagePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '', // Changed from subject to match backend
    message: '',
    deliveryDate: '',
    deliveryTime: '12:00',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Format unlock_at to ISO string (e.g., "2025-06-14T11:53:12.922961Z")
    const unlockAt = new Date(`${formData.deliveryDate}T${formData.deliveryTime}:00`).toISOString();

    const payload = {
      name: formData.name,
      email: formData.email,
      title: formData.title,
      message: formData.message,
      unlock_at: unlockAt,
    };

    try {
      const response = await fetch('https://timecapsule-u7ec.onrender.com/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create time capsule');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        title: '',
        message: '',
        deliveryDate: '',
        deliveryTime: '12:00',
      });
      alert('Your time capsule message has been created! You’ll receive it on the scheduled date.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the time capsule');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 border border-gray-200 rounded-full opacity-30 animate-pulse"></div>
        <div
          className="absolute top-60 right-20 w-32 h-32 border border-gray-300 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-28 h-28 border border-gray-200 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-36 h-36 border border-gray-300 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: '3s' }}
        ></div>

        {/* Floating sparkles */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Sparkles className="h-4 w-4 text-gray-400 opacity-50" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float-delayed">
          <Sparkles className="h-3 w-3 text-gray-500 opacity-40" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float">
          <Sparkles className="h-5 w-5 text-gray-400 opacity-30" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Clock className="h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              TimeCapsule
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-2 text-sm font-medium hover:text-gray-600 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent"></div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 relative">
              Create Your Time Capsule
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-black opacity-30"></div>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Write a message to your future self. Choose when you want to receive it, and we'll deliver it exactly when
              you need it most.
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-2 border-gray-100 shadow-2xl bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-gray-200 opacity-50"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-gray-200 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-gray-200 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-gray-200 opacity-50"></div>

            <CardHeader className="text-center pb-6 relative">
              <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-gray-600" />
                Your Message
                <Sparkles className="h-6 w-6 text-gray-600" />
              </CardTitle>
              <CardDescription className="text-base">
                Take a moment to reflect and write something meaningful to your future self.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-black focus:ring-black transition-all duration-300 hover:shadow-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-black focus:ring-black transition-all duration-300 hover:shadow-md"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="What is this message about?"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-black focus:ring-black transition-all duration-300 hover:shadow-md"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Dear future me,

What are you thinking about right now? What are your hopes and dreams? What challenges are you facing? What advice would you give yourself?

Take your time and write from the heart..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={12}
                      className="border-gray-300 focus:border-black focus:ring-black resize-none transition-all duration-300 hover:shadow-md"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {formData.message.length} characters
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Write as much as you'd like. This is your space to be honest and reflective.
                  </p>
                </div>

                {/* Delivery Date and Time */}
                <div className="space-y-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-400 to-black opacity-20"></div>
                  <h3 className="font-serif font-semibold text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    When should we deliver this?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate" className="text-sm font-medium">
                        Delivery Date
                      </Label>
                      <Input
                        id="deliveryDate"
                        name="deliveryDate"
                        type="date"
                        min={today}
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-black focus:ring-black transition-all duration-300 hover:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime" className="text-sm font-medium">
                        Delivery Time
                      </Label>
                      <Input
                        id="deliveryTime"
                        name="deliveryTime"
                        type="time"
                        value={formData.deliveryTime}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-black focus:ring-black transition-all duration-300 hover:shadow-md"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Choose a meaningful date—your birthday, an anniversary, or just when you think you'll need to hear
                    from your past self.
                  </p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 text-sm text-center">
                    Time capsule created successfully!
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white py-3 text-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send to Future Me'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <p>
              Your message will be securely stored and delivered exactly when you've requested. You can create as many
              time capsules as you'd like.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}