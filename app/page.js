'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-[#0F172A] text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#111827] shadow-md">
        <div className="flex items-center space-x-2 text-xl font-bold">
          <span className="text-purple-500">●</span>
          <span>AI Learn Hub</span>
        </div>
        <ul className="hidden md:flex space-x-8 font-medium text-gray-300">
          <li><Link href="/workspace">Home</Link></li>
          <li><Link href="/workspace/explore">Features</Link></li>
          <li><Link href="/workspace/billing">Courses</Link></li>
          <li><Link href="/workspace/profile">Testimonials</Link></li>
        </ul>
        <Link href="/workspace">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold">
            Get Started
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Unlock Your Potential with <span className="text-purple-500">AI-Powered Learning</span>
          </h1>
          <p className="mt-4 text-gray-300">
            AI Learn Hub offers personalized courses, intelligent tutors, and adaptive content to help you master new skills faster and more effectively. 🚀
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/workspace">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-white font-semibold rounded-lg">
              Explore Courses →
            </button></Link>
            <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank" rel="noopener noreferrer">
  <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 text-white font-semibold rounded-lg">
    How it Works 🧠
  </button>
</a>

          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <Image
            src="/hero.png"
            alt="Students using AI learning"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#1E293B] py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Learn Smarter, Not Harder</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Discover how our AI-driven features transform your learning experience, making it more personal, efficient, and engaging.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: 'Personalized Paths',
              desc: 'AI crafts unique learning journeys tailored to your pace and goals.',
              icon: '🎮'
            },
            {
              title: 'AI Tutors 24/7',
              desc: 'Get instant help and guidance from our intelligent AI tutors, anytime.',
              icon: '👨‍🏫'
            },
            {
              title: 'Adaptive Content',
              desc: 'Content that adjusts to your understanding for optimal learning.',
              icon: '📚'
            },
            {
              title: 'Skill Analytics',
              desc: 'Track your progress and identify areas for improvement.',
              icon: '📊'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#0F172A] border-t-4 border-purple-500 p-6 rounded-xl shadow-sm hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 px-8 bg-[#0F172A] text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your AI Learning Journey</h2>
        <p className="text-gray-400 mb-12">Getting started with AI Learn Hub is simple and quick. ⚡</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: '1',
              title: 'Sign Up Free',
              desc: 'Create your account in minutes and tell us your learning goals.',
              color: 'bg-violet-500'
            },
            {
              step: '2',
              title: 'Get Personalized Plan',
              desc: 'Our AI analyzes your needs and crafts a custom learning roadmap.',
              color: 'bg-pink-500'
            },
            {
              step: '3',
              title: 'Start Learning',
              desc: 'Dive into interactive lessons, get AI support, and track your progress.',
              color: 'bg-yellow-400 text-black'
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`${step.color} text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center`}>
                {step.step}
              </div>
              <h4 className="mt-4 text-lg font-semibold">{step.title}</h4>
              <p className="text-gray-400 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Courses Placeholder */}
      <section className="py-16 px-8 bg-[#1E293B] text-center">
        <h2 className="text-3xl font-bold mb-4">Explore Our Popular Courses</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Handpicked courses to kickstart or advance your AI journey. 🧠 Designed by experts, powered by AI.
        </p>
        {/* You can add course cards here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Sample Course Cards */}
          <div className="relative bg-[#0F172A] p-4 rounded-xl shadow-md">
            <Image src="/course1.png" alt="Course" width={400} height={250} className="rounded-lg" />
            <span className="absolute top-2 left-2 bg-yellow-500 text-black px-2 text-xs rounded-full">NEW</span>
            <h3 className="mt-4 font-semibold text-lg">Intro to AI Programming</h3>
          </div>
          <div className="relative bg-[#0F172A] p-4 rounded-xl shadow-md">
            <Image src="/course2.png" alt="Course" width={400} height={250} className="rounded-lg" />
            <span className="absolute top-2 left-2 bg-purple-600 text-white px-2 text-xs rounded-full">POPULAR</span>
            <h3 className="mt-4 font-semibold text-lg">Build AI Chatbots with Python</h3>
          </div>
          <div className="bg-[#0F172A] p-4 rounded-xl shadow-md">
            <Image src="/course3.png" alt="Course" width={400} height={250} className="rounded-lg" />
            <h3 className="mt-4 font-semibold text-lg">Master Machine Learning Basics</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
