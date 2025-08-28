import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Track Your Booking</h1>
        
        <!-- Search Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
              <input type="text" placeholder="Enter your booking ID" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex items-end">
              <button class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Track Booking
              </button>
            </div>
          </div>
        </div>

        <!-- Tracking Result -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Booking Status</h2>
          
          <!-- Sample tracking info -->
          <div class="space-y-4">
            <div class="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-900">Booking Confirmed</h3>
                <p class="text-sm text-gray-600">Your booking has been confirmed</p>
              </div>
              <div class="text-sm text-gray-500">Jan 15, 10:00 AM</div>
            </div>
            
            <div class="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-900">Service Provider Assigned</h3>
                <p class="text-sm text-gray-600">Driver: John Doe - Contact: +1234567890</p>
              </div>
              <div class="text-sm text-gray-500">Jan 15, 10:15 AM</div>
            </div>
            
            <div class="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-900">Service Started</h3>
                <p class="text-sm text-gray-600">Your service has started</p>
              </div>
              <div class="text-sm text-gray-500">Jan 15, 10:30 AM</div>
            </div>
            
            <div class="flex justify-between items-center p-4 bg-gray-100 rounded-lg opacity-50">
              <div>
                <h3 class="font-medium text-gray-900">Service Completed</h3>
                <p class="text-sm text-gray-600">Service completed successfully</p>
              </div>
              <div class="text-sm text-gray-500">Pending</div>
            </div>
          </div>     
        </div>
      </div>
    </div>
  `
})
export class TrackingComponent {
}
