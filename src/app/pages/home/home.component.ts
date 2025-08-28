import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Welcome to BookingApp
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100">
              Your one-stop solution for all booking needs
            </p>
            <div class="space-x-4">
              <button class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">
                Get Started
              </button>
              <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p class="text-lg text-gray-600">Experience seamless booking with our advanced features</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6 bg-white rounded-lg shadow-md">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p class="text-gray-600">Book your services in just a few clicks with our intuitive interface</p>
            </div>
            
            <div class="text-center p-6 bg-white rounded-lg shadow-md">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
              <p class="text-gray-600">Track your bookings in real-time and stay updated on their status</p>
            </div>
            
            <div class="text-center p-6 bg-white rounded-lg shadow-md">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-gray-600">Get help whenever you need it with our round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
}
