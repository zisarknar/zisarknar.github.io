import Link from 'next/link'
import type { Metadata } from 'next'
import shotaImage from '../../assets/images/shota_trail.png'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'
import PageTransition from '../components/PageTransition'
import TopNav from '../components/TopNav'
import Breadcrumb from '../components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Hobbies - ZISARKNAR.DEV',
  description: 'Personal interests and hobbies',
}

export default function Hobbies() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full bg-white text-gray-900">
        <TopNav />
        <SocialSidebar />

      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12">
            <Breadcrumb currentPage="Hobbies" />
          </div>

          {/* Title */}
          <div className="mb-24">
            <div className="space-y-2">
              <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-gray-900">
                HOBBIES
              </h1>
              <div className="w-24 h-1 bg-gray-900"></div>
            </div>
            <p className="text-xl text-gray-600 font-light mt-6 max-w-2xl">
              Beyond code, I find balance and inspiration through outdoor adventures and personal pursuits
            </p>
          </div>
        </div>
      </section>

      {/* Hiking Section */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                <img
                  src="/assets/hobbies/shota_trail.png" 
                  alt="Hiking in the mountains"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-gray-200"></div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-sm text-gray-500 tracking-wider">01 / OUTDOOR</div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight">HIKING</h2>
                <div className="w-20 h-1 bg-gray-900"></div>
              </div>

              <div className="space-y-6 text-base text-gray-700 leading-relaxed">
                <p>
                  Living in Japan has given me incredible access to some of the most beautiful mountain trails in the world.
                  Every weekend, I try to escape the city and immerse myself in nature, whether it&apos;s climbing Mount Takao
                  just outside Tokyo or tackling more challenging peaks in the Japanese Alps.
                </p>
                <p>
                  Hiking has become more than just a hobby—it&apos;s a form of meditation. The rhythm of walking,
                  the fresh mountain air, and the stunning views provide the perfect counterbalance to hours spent
                  coding and problem-solving. There&apos;s something deeply satisfying about reaching a summit after
                  a challenging climb.
                </p>
                <p>
                  My favorite trails include the Kamikochi Valley in Nagano, Mount Fuji (which I&apos;ve climbed twice),
                  and the coastal paths of the Izu Peninsula. Each hike offers its own unique challenges and rewards,
                  teaching me patience, perseverance, and the importance of taking things one step at a time—lessons
                  that translate surprisingly well to software development.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600 mt-1">Trails Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">3,776m</div>
                  <div className="text-sm text-gray-600 mt-1">Highest Peak</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">2x</div>
                  <div className="text-sm text-gray-600 mt-1">Mt. Fuji Climbs</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* More Hiking Images Gallery */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">TRAIL MEMORIES</h2>
              <div className="w-20 h-1 bg-gray-900"></div>
            </div>
            <p className="text-gray-600 mt-4 max-w-2xl">
              A collection of moments from my hiking adventures across Japan&apos;s diverse landscapes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Image 1 */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img
                  src="/assets/hobbies/dai_trail.JPEG"
                  alt="Mountain sunrise"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Alpine Dawn</h3>
                <p className="text-sm text-gray-600">Northern Alps at 5:30 AM. The early wake-up call was worth every second for this view.</p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img
                  src="/assets/hobbies/jin_trail.jpg"
                  alt="Forest trail"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Forest Path</h3>
                <p className="text-sm text-gray-600">Peaceful cedar forest trails near Nikko. The filtered sunlight creates a magical atmosphere.</p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img
                  src="/assets/hobbies/tanza_trail.png" 
                  alt="Summit view"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Summit Victory</h3>
                <p className="text-sm text-gray-600">Standing at 3,190m on Mount Hotaka. The sense of accomplishment is indescribable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </main>
    </PageTransition>
  )
}
