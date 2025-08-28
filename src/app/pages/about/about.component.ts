import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-bold mb-4">About BookingApp</h1>
          <p class="text-xl text-blue-100">Connecting you with the services you need, when you need them</p>
        </div>
      </div>

      <!-- Mission Section -->
      <div class="py-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              We are dedicated to revolutionizing the booking experience by providing a seamless, 
              reliable, and user-friendly platform that connects customers with high-quality services 
              across multiple industries.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast & Efficient</h3>
              <p class="text-gray-600">Lightning-fast booking process that saves you time and effort</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Trusted & Secure</h3>
              <p class="text-gray-600">Your data and transactions are protected with industry-leading security</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Customer Focused</h3>
              <p class="text-gray-600">24/7 support and personalized service to meet your unique needs</p>
            </div>
          </div>
        </div>
      </div>

    
     

      <!-- Stats Section -->
      <div class="py-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
          </div>
          
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div class="text-gray-600">Happy Customers</div>
            </div>
            
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">100K+</div>
              <div class="text-gray-600">Bookings Completed</div>
            </div>
            
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div class="text-gray-600">Service Partners</div>
            </div>
            
            <div>
              <div class="text-4xl font-bold text-blue-600 mb-2">25</div>
              <div class="text-gray-600">Cities Served</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="bg-blue-600 py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p class="text-xl text-blue-100 mb-8">Join thousands of satisfied customers who trust BookingApp</p>
          <div class="space-x-4">
            <button class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">
              Sign Up Now
            </button>
            <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {
}
