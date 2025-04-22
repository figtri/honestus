'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface FormData {
  name: string
  email: string
  linkedinUrl: string
  websiteUrl: string
  reason: string
  description: string
}

interface FeatureRequestFormProps {
  onSubmitStatus?: (status: 'success' | 'error') => void
}

export const FeatureRequestForm: React.FC<FeatureRequestFormProps> = ({ onSubmitStatus }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    linkedinUrl: '',
    websiteUrl: '',
    reason: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2

  const formatUrl = (url: string, isLinkedIn = false): string => {
    if (!url) return '';
    
    // Clean the URL first (remove any leading/trailing spaces)
    let cleanUrl = url.trim();
    
    // LinkedIn-specific formatting
    if (isLinkedIn) {
      // Extract the username if a full LinkedIn URL is provided
      const linkedinRegex = /linkedin\.com\/in\/([^\/\?]+)/i;
      const match = cleanUrl.match(linkedinRegex);
      
      if (match && match[1]) {
        // If it's already a valid LinkedIn URL, ensure it has https://
        if (!cleanUrl.match(/^https?:\/\//i)) {
          return `https://www.linkedin.com/in/${match[1]}/`;
        }
        return cleanUrl;
      }
      
      // If just the username is provided without the full URL
      if (!cleanUrl.includes('linkedin.com')) {
        // Remove any @ symbol if present
        if (cleanUrl.startsWith('@')) {
          cleanUrl = cleanUrl.substring(1);
        }
        return `https://www.linkedin.com/in/${cleanUrl}/`;
      }
    }
    
    // General URL formatting
    if (!cleanUrl.match(/^https?:\/\//i)) {
      return `https://${cleanUrl}`;
    }
    
    return cleanUrl;
  };

  const isValidLinkedInUrl = (url: string): boolean => {
    if (!url) return true; // Empty value is valid (field is optional)
    
    // First, try to format it in case it's a username or partial URL
    const formattedUrl = formatUrl(url, true);
    
    // Check if it matches the LinkedIn profile URL pattern
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/i;
    return linkedinPattern.test(formattedUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Store raw input for all fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const validateStep1 = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           (formData.email.includes('@') && formData.email.includes('.'))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validate LinkedIn URL if provided
    if (formData.linkedinUrl && !isValidLinkedInUrl(formData.linkedinUrl)) {
      setSubmitStatus('error');
      onSubmitStatus?.('error');
      setIsSubmitting(false);
      alert('Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username/)');
      return;
    }

    try {
      // Format URLs before submission
      const formattedData = {
        ...formData,
        websiteUrl: formData.websiteUrl ? formatUrl(formData.websiteUrl) : '',
        linkedinUrl: formData.linkedinUrl ? formatUrl(formData.linkedinUrl, true) : '',
      };

      // Simulate network delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await fetch('/api/feature-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Submission error response:', data);
        throw new Error(data.error || 'Failed to submit');
      }

      console.log('Submission successful:', data);
      setSubmitStatus('success');
      onSubmitStatus?.('success');
      setFormData({
        name: '',
        email: '',
        linkedinUrl: '',
        websiteUrl: '',
        reason: '',
        description: '',
      });
      // Return to step 1 after successful submission
      setCurrentStep(1);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      onSubmitStatus?.('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-2">
        {[...Array(totalSteps)].map((_, i) => (
          <React.Fragment key={i}>
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                i + 1 === currentStep
                  ? 'border-[#E27145] bg-[#E27145]/20 text-[#E27145]'
                  : i + 1 < currentStep
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-white/30 bg-white/10 text-white/50'
              }`}
              animate={
                i + 1 === currentStep
                  ? { scale: [1, 1.1, 1], borderColor: ["#E27145", "#f5945c", "#E27145"] }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              {i + 1 < currentStep ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </motion.div>
            {i < totalSteps - 1 && (
              <div className={`w-12 h-0.5 ${
                i + 1 < currentStep ? 'bg-emerald-500' : 'bg-white/20'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )

  return (
    <motion.div
      className="w-full max-w-lg mx-auto bg-gradient-to-br from-[#291f2e]/95 to-[#1f1723]/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E27145] to-[#f5945c]">
            Share Your Story
          </h3>
          <p className="text-white/80 mt-2 text-sm">Join our community of voices and experiences</p>
        </motion.div>
      </div>
      
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className={`space-y-5 ${currentStep !== 1 ? 'hidden' : ''}`}
        >
          <div className="relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-14 bg-gradient-to-b from-[#E27145] to-transparent rounded-full opacity-70"></div>
            <motion.div variants={itemVariants} className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-white/90">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#E27145]/50 transition-all duration-300"
                placeholder="Your name"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-white/90">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#E27145]/50 transition-all duration-300"
              placeholder="your@email.com"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div variants={itemVariants} className="space-y-1">
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-white/90">
                LinkedIn <span className="text-white/50 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#E27145]/50 transition-all duration-300"
                placeholder="linkedin.com/in/username or just username"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-white/90">
                Website <span className="text-white/50 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#E27145]/50 transition-all duration-300"
                placeholder="https://..."
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="pt-4">
            <button
              type="button"
              onClick={nextStep}
              disabled={!validateStep1()}
              className={`w-full rounded-lg py-3 text-center font-semibold text-white shadow-lg transition-all duration-300
                ${!validateStep1()
                  ? 'bg-gray-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#E27145] to-[#d86535] hover:shadow-[0_0_15px_rgba(226,113,69,0.4)]'
                }`}
            >
              <span className="flex items-center justify-center">
                Continue
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate={currentStep === 2 ? "visible" : "hidden"}
          className={`space-y-5 ${currentStep !== 2 ? 'hidden' : ''}`}
        >
          <div className="relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-14 bg-gradient-to-b from-[#E27145] to-transparent rounded-full opacity-70"></div>
            <motion.div variants={itemVariants} className="space-y-1">
              <label htmlFor="reason" className="block text-sm font-medium text-white/90">
                Reason for Contact
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#E27145]/50 transition-all duration-300"
                placeholder="Brief reason for your request"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-white/90">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-[#E27145]/50 transition-all duration-300 resize-none"
              placeholder="Tell us more about your request..."
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-1/3 rounded-lg py-3 text-center font-medium text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-2/3 rounded-lg py-3 text-center font-semibold text-white shadow-lg transition-all duration-300
                ${isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#E27145] to-[#d86535] hover:shadow-[0_0_15px_rgba(226,113,69,0.4)]'
                }`}
            >
              {isSubmitting ? (
                <motion.span 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </motion.span>
              ) : (
                <span className="flex items-center justify-center">
                  Submit Your Story
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5-5m0 0l-5-5m5 5H4" />
                  </svg>
                </span>
              )}
            </button>
          </motion.div>
        </motion.div>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-center mt-6 p-4 rounded-lg"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-emerald-300 mb-1">Thank you!</h4>
              <p className="text-sm text-emerald-300/80">Your story has been submitted successfully.</p>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900/30 border border-red-500/30 text-red-300 text-center mt-6 p-4 rounded-lg"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-red-300 mb-1">Submission Failed</h4>
              <p className="text-sm text-red-300/80">There was an error submitting your story. Please try again.</p>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
} 