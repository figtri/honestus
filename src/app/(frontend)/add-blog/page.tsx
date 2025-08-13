'use client'

import React, { useState } from 'react'

export default function AddBlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    description: '',
    category: '',
    publishedAt: new Date().toISOString().split('T')[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string; url?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await fetch('/next/add-blog-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.publishedAt ? `${formData.publishedAt}T00:00:00.000Z` : undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          url: data.post?.url,
        })
        // Reset form on success
        setFormData({
          title: '',
          content: '',
          slug: '',
          description: '',
          category: '',
          publishedAt: new Date().toISOString().split('T')[0],
        })
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to create blog post',
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error occurred',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({ 
      ...prev, 
      title,
      slug: generateSlug(title)
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2A4539] to-[#152A20] text-white py-24 pt-36 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-emerald-300">
            Add Blog Post
          </h1>
          <p className="text-xl text-gray-300">
            Copy content from Google Docs and create a new blog post
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-md backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-emerald-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
                placeholder="Enter the blog post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-emerald-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
                placeholder="blog-post-url-slug"
              />
              <p className="text-sm text-gray-400 mt-1">
                This will be the URL of your blog post
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-emerald-300 mb-2">
                Content * (Copy from Google Docs)
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 resize-vertical"
                placeholder="Paste your blog post content here..."
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-emerald-300 mb-2">
                SEO Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 resize-vertical"
                placeholder="Brief description for search engines..."
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-emerald-300 mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
                placeholder="e.g., Personal Stories, Technology, etc."
              />
            </div>

            {/* Published Date */}
            <div>
              <label htmlFor="publishedAt" className="block text-sm font-medium text-emerald-300 mb-2">
                Published Date
              </label>
              <input
                type="date"
                id="publishedAt"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-lg py-3 text-center font-semibold text-white shadow-lg transition-all duration-300
                  ${isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  }`}
              >
                {isSubmitting ? 'Creating Blog Post...' : 'Create Blog Post'}
              </button>
            </div>
          </form>

          {/* Result Message */}
          {result && (
            <div className={`mt-6 p-4 rounded-lg ${
              result.success 
                ? 'bg-emerald-500/10 border border-emerald-500/20' 
                : 'bg-red-500/10 border border-red-500/20'
            }`}>
              <p className={`font-medium ${result.success ? 'text-emerald-300' : 'text-red-300'}`}>
                {result.message}
              </p>
              {result.success && result.url && (
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-emerald-400 hover:text-emerald-300 underline"
                >
                  View the new blog post →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white/[0.02] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-300 mb-4">How to Use:</h3>
          <ol className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</span>
              <span>Open your Google Doc with the blog content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</span>
              <span>Copy all the content (Ctrl+A, Ctrl+C)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</span>
              <span>Paste it into the Content field above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">4</span>
              <span>Fill in the title and other details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">5</span>
              <span>Click "Create Blog Post" and you're done!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
