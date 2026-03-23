'use client'

import { useState } from 'react'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'
import PageTransition from '../components/PageTransition'
import TopNav from '../components/TopNav'
import Breadcrumb from '../components/Breadcrumb'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:zisarknar.me@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <PageTransition>
      <main className="min-h-screen w-full bg-white text-gray-900">
        <TopNav />
        <SocialSidebar />

        <section className="relative py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12">
              <Breadcrumb currentPage="Contact" />
            </div>

            {/* Title */}
            <div className="mb-16">
              <div className="space-y-2">
                <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-gray-900">
                  CONTACT
                </h1>
                <div className="w-24 h-1 bg-gray-900"></div>
              </div>
              <p className="text-xl text-gray-600 font-light mt-6 max-w-2xl">
                Have a project in mind or just want to say hello? I&apos;d love to hear from you.
              </p>
            </div>

            {/* Form */}
            <div className="max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                  <label className="text-xs tracking-wider text-gray-500 uppercase">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-300 py-3 text-gray-900 bg-transparent focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 text-sm"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs tracking-wider text-gray-500 uppercase">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-300 py-3 text-gray-900 bg-transparent focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs tracking-wider text-gray-500 uppercase">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-b border-gray-300 py-3 text-gray-900 bg-transparent focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 text-sm resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium tracking-wider"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
