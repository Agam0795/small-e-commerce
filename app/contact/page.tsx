'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/Button';
import { isValidEmail } from '@/lib/utils';

/**
 * Contact Page
 * Rendering Strategy: Client-Side Rendering (CSR) for form
 * Note: Could also be SSG with client-side form handling
 * Reason: Form requires client-side interactivity and validation
 */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!isValidEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📍 Visit Us</h3>
            <p className="text-gray-700">
              123 Tech Street<br />
              San Francisco, CA 94102<br />
              United States
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📞 Call Us</h3>
            <p className="text-gray-700">
              <strong>Customer Service:</strong> (555) 123-4567<br />
              <strong>Technical Support:</strong> (555) 987-6543<br />
              <strong>Hours:</strong> Mon-Fri 9AM-6PM PST
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">✉️ Email Us</h3>
            <p className="text-gray-700">
              <strong>General:</strong> support@techstore.com<br />
              <strong>Sales:</strong> sales@techstore.com<br />
              <strong>Returns:</strong> returns@techstore.com
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">💬 Live Chat</h3>
            <p className="text-gray-700 mb-4">
              Need immediate assistance? Our live chat support is available 24/7 to help you.
            </p>
            <Button variant="primary">
              Start Live Chat
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">🌐 Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-2xl">Facebook</a>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-2xl">Twitter</a>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-2xl">Instagram</a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">What are your shipping options?</h3>
            <p className="text-gray-700">
              We offer standard (5-7 days), express (2-3 days), and overnight shipping options for most products.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">What is your return policy?</h3>
            <p className="text-gray-700">
              We accept returns within 30 days of purchase for most items in original, unopened condition.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Do you offer technical support?</h3>
            <p className="text-gray-700">
              Yes! Our technical support team is available to help with product setup, troubleshooting, and questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
