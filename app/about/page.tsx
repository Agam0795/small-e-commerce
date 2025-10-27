import Link from 'next/link';
import Button from '@/components/Button';

/**
 * About Page
 * Rendering Strategy: Static Site Generation (SSG)
 * Reason: Content is static and doesn't change frequently
 */

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About TechStore</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for cutting-edge technology products and exceptional customer service since 2020.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          To provide customers with the latest technology products at competitive prices, backed by
          exceptional customer service and a seamless shopping experience. We believe in making
          technology accessible to everyone, from tech enthusiasts to everyday users.
        </p>
      </div>

      {/* Values Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
            <p className="text-gray-600">
              We carefully curate our product selection to ensure you receive only the best quality items
              from trusted brands.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your tech faster with our streamlined logistics and multiple shipping options available
              nationwide.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-3">Customer Care</h3>
            <p className="text-gray-600">
              Our dedicated support team is here to help you before, during, and after your purchase with
              expert guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Founded in 2020 by a team of tech enthusiasts, TechStore began with a simple mission: to make
            the latest technology accessible and affordable for everyone. What started as a small online
            shop has grown into a trusted destination for tech products across the nation.
          </p>
          <p>
            We understand that technology evolves rapidly, and staying up-to-date can be overwhelming. That&apos;s
            why we&apos;ve built a platform that not only offers the latest products but also provides detailed
            information, honest reviews, and expert guidance to help you make informed decisions.
          </p>
          <p>
            Today, we serve thousands of customers monthly, offering everything from smartphones and laptops
            to smart home devices and gaming accessories. Our commitment to quality, affordability, and
            exceptional customer service remains unwavering as we continue to grow and evolve.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
        <p className="text-gray-600 mb-6">
          Browse our extensive collection of tech products and find your next favorite gadget.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <Button variant="primary" size="large">
              Shop Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="large">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
