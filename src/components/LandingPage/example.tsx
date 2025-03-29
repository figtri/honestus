'use client'

import { StaggeredAnimation } from './staggered-animation'
import { useState, useEffect, useCallback } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

// Define testimonial data
const testimonials = [
  {
    id: 1,
    quote:
      'After my car accident, I was overwhelmed with medical bills and unable to work. Davoli & Associates fought for me and secured a settlement that covered all my expenses plus compensation for my pain and suffering. They were compassionate and professional every step of the way.',
    name: 'Maria Rodriguez',
    title: 'Car Accident Victim',
    image: '/testimonial-client1.jpg',
    alt: 'Maria Rodriguez',
    initials: 'MR',
  },
  {
    id: 2,
    quote:
      "The team at Davoli & Associates secured three times what the insurance company initially offered for my workplace injury. I couldn't be more grateful for their expertise and dedication to my case.",
    name: 'James Wilson',
    title: 'Workplace Injury Case',
    image: '/testimonial-client2.jpg',
    alt: 'James Wilson',
    initials: 'JW',
  },
  {
    id: 3,
    quote:
      'After my slip and fall in a grocery store, Davoli & Associates handled everything while I focused on recovery. Their expertise made all the difference in the outcome of my case.',
    name: 'Sarah Johnson',
    title: 'Premises Liability Case',
    image: '/testimonial-client3.jpg',
    alt: 'Sarah Johnson',
    initials: 'SJ',
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1)
  }, [current])

  // Auto-loop functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [nextSlide])

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  return (
    <section className="px-16 py-16 bg-[#e8e3ce]">
      <div className="max-w-4xl mx-auto text-center relative">
        <StaggeredAnimation delay={100} direction="up" distance={20}>
          <h2 className="text-black text-4xl font-bold mb-10">Client Success Stories</h2>
        </StaggeredAnimation>

        <StaggeredAnimation delay={300} direction="up" distance={25} threshold={0.2}>
          <div className="relative">
            <div
              className="text-black text-8xl absolute -left-12 top-0 font-serif font-bold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              &ldquo;
            </div>

            <div className="flex justify-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-amber-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>

            <div className="h-[320px] relative overflow-hidden mb-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute top-0 left-0 right-0 w-full h-full transition-all duration-1000 ease-in-out transform
                    ${
                      index === current
                        ? 'opacity-100 translate-x-0 z-10'
                        : index < current
                          ? 'opacity-0 -translate-x-8 z-0'
                          : 'opacity-0 translate-x-8 z-0'
                    }`}
                >
                  <div className="h-full flex flex-col justify-between">
                    <p className="text-black text-xl">{testimonial.quote}</p>

                    <div className="flex flex-col items-center justify-center mt-8">
                      <Avatar className="h-24 w-24 mb-4 border-2 border-amber-500 flex items-center justify-center">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.alt}
                          className="object-center"
                        />
                        <AvatarFallback className="bg-amber-100 text-amber-800 text-xl font-medium">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-black font-bold text-lg">{testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StaggeredAnimation>

        <StaggeredAnimation delay={500} direction="up" distance={15}>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </StaggeredAnimation>
      </div>
    </section>
  )
}
