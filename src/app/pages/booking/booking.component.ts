import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Create New Parcel Booking</h1>
          
          <form class="space-y-6" (ngSubmit)="onCreateBooking()" #bookingForm="ngForm">
            
            <!-- Receiver Information Section -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Receiver Information</h3>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="receiver_name" class="block text-sm font-medium text-gray-700 mb-2">
                    Receiver Name *
                  </label>
                  <input
                    id="receiver_name"
                    name="receiver_name"
                    type="text"
                    [(ngModel)]="bookingData.receiver_name"
                    required
                    placeholder="Enter receiver's full name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label for="receiver_phone_number" class="block text-sm font-medium text-gray-700 mb-2">
                    Receiver Phone Number *
                  </label>
                  <input
                    id="receiver_phone_number"
                    name="receiver_phone_number"
                    type="tel"
                    [(ngModel)]="bookingData.receiver_phone_number"
                    required
                    placeholder="Enter receiver's phone number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label for="receiverAddress" class="block text-sm font-medium text-gray-700 mb-2">
                  Receiver Address *
                </label>
                <textarea
                  id="receiverAddress"
                  name="receiverAddress"
                  rows="3"
                  [(ngModel)]="bookingData.receiverAddress"
                  required
                  placeholder="Enter complete delivery address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div class="mt-4">
                <label for="receiver_pin" class="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code *
                </label>
                <input
                  id="receiver_pin"
                  name="receiver_pin"
                  type="number"
                  [(ngModel)]="bookingData.receiver_pin"
                  (ngModelChange)="calculateCost()"
                  required
                  min="100000"
                  max="999999"
                  placeholder="Enter 6-digit PIN code"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <small class="text-gray-500 mt-1 block">PIN code affects distance-based charges</small>
              </div>
            </div>

            <!-- Parcel Information Section -->
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Parcel Information</h3>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="parcel_weight_grams" class="block text-sm font-medium text-gray-700 mb-2">
                    Parcel Weight (grams) *
                  </label>
                  <input
                    id="parcel_weight_grams"
                    name="parcel_weight_grams"
                    type="number"
                    [(ngModel)]="bookingData.parcel_weight_grams"
                    (ngModelChange)="calculateCost()"
                    required
                    min="1"
                    max="50000"
                    placeholder="Enter weight in grams"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <small class="text-gray-500 mt-1 block">Maximum 50kg (50,000 grams)</small>
                </div>

                <div>
                  <label for="parcel_delivery_type" class="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Type *
                  </label>
                  <select
                    id="parcel_delivery_type"
                    name="parcel_delivery_type"
                    [(ngModel)]="bookingData.parcel_delivery_type"
                    (ngModelChange)="calculateCost()"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select delivery type</option>
                    <option value="Standard">Standard (3-5 days)</option>
                    <option value="Express">Express (1-2 days) +₹200</option>
                    <option value="Overnight">Overnight (Next day) +₹500</option>
                    <option value="Same Day">Same Day +₹800</option>
                  </select>
                </div>
              </div>

              <div class="mt-4">
                <label for="parcel_content_desc" class="block text-sm font-medium text-gray-700 mb-2">
                  Parcel Content Description *
                </label>
                <textarea
                  id="parcel_content_desc"
                  name="parcel_content_desc"
                  rows="3"
                  [(ngModel)]="bookingData.parcel_content_desc"
                  required
                  placeholder="Describe the contents of the parcel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div class="mt-4">
                <label for="parcel_packing_preference" class="block text-sm font-medium text-gray-700 mb-2">
                  Packing Preference *
                </label>
                <select
                  id="parcel_packing_preference"
                  name="parcel_packing_preference"
                  [(ngModel)]="bookingData.parcel_packing_preference"
                  (ngModelChange)="calculateCost()"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select packing preference</option>
                  <option value="Standard">Standard (Free)</option>
                  <option value="Fragile">Fragile (+₹300)</option>
                  <option value="Waterproof">Waterproof (+₹250)</option>
                  <option value="Temperature Controlled">Temperature Controlled (+₹600)</option>
                  <option value="Heavy Duty">Heavy Duty (+₹400)</option>
                </select>
              </div>
            </div>

            <!-- Timing Information Section -->
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Pickup & Delivery Schedule</h3>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="parcel_pickup_time" class="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date & Time *
                  </label>
                  <input
                    id="parcel_pickup_time"
                    name="parcel_pickup_time"
                    type="datetime-local"
                    [(ngModel)]="bookingData.parcel_pickup_time"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label for="parcel_drop_time" class="block text-sm font-medium text-gray-700 mb-2">
                    Expected Delivery Date & Time *
                  </label>
                  <input
                    id="parcel_drop_time"
                    name="parcel_drop_time"
                    type="datetime-local"
                    [(ngModel)]="bookingData.parcel_drop_time"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <!-- Service Cost Section -->
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Service Cost</h3>
              
              <!-- Cost Breakdown -->
              @if (getCostBreakdown()) {
                <div class="bg-white p-4 rounded-lg mb-4 border">
                  <h4 class="font-medium text-gray-900 mb-3">Cost Breakdown</h4>
                  
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Weight Cost ({{ bookingData.parcel_weight_grams / 1000 }} kg @ ₹60/kg):</span>
                      <span class="font-medium">₹{{ getCostBreakdown().weightCost }}</span>
                    </div>
                    
                    @if (getCostBreakdown().deliveryTypeCost > 0) {
                      <div class="flex justify-between">
                        <span class="text-gray-600">{{ bookingData.parcel_delivery_type }} Delivery:</span>
                        <span class="font-medium">₹{{ getCostBreakdown().deliveryTypeCost }}</span>
                      </div>
                    }
                    
                    @if (getCostBreakdown().packingCost > 0) {
                      <div class="flex justify-between">
                        <span class="text-gray-600">{{ bookingData.parcel_packing_preference }} Packing:</span>
                        <span class="font-medium">₹{{ getCostBreakdown().packingCost }}</span>
                      </div>
                    }
                    
                    <div class="border-t pt-2 mt-2">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal:</span>
                        <span class="font-medium">₹{{ getCostBreakdown().subtotal }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">GST (18%):</span>
                        <span class="font-medium">₹{{ getCostBreakdown().gst }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
              
              <div class="flex items-center justify-between bg-green-100 p-3 rounded-lg">
                <span class="text-lg font-semibold text-gray-900">Total Service Cost:</span>
                <div class="flex items-center">
                  <span class="text-3xl font-bold text-green-600">₹{{ bookingData.serviceCost }}</span>
                </div>
              </div>
              
              <div class="mt-3 text-sm text-gray-600">
                <p>💡 <strong>Auto-calculated</strong> based on weight, delivery type, packing preference, and GST.</p>
                <p class="mt-1">📍 Distance factor included based on delivery PIN code.</p>
              </div>
            </div>

            <!-- Error Message -->
            @if (errorMessage()) {
              <div class="rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">
                      {{ errorMessage() }}
                    </h3>
                  </div>
                </div>
              </div>
            }

            <!-- Success Message -->
            @if (successMessage()) {
              <div class="rounded-md bg-green-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-green-800">
                      {{ successMessage() }}
                    </h3>
                  </div>
                </div>
              </div>
            }

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                (click)="goBack()"
                class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="isLoading() || !bookingForm.form.valid || bookingData.serviceCost === 0"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                @if (isLoading()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Booking...
                } @else {
                  Create Booking
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class BookingComponent {
  // Booking form data with empty initial values
  bookingData = {
    receiver_name: '',
    receiverAddress: '',
    receiver_pin: 0,
    receiver_phone_number: '',
    parcel_weight_grams: 0,
    parcel_content_desc: '',
    parcel_delivery_type: '',
    parcel_packing_preference: '',
    parcel_pickup_time: '',
    parcel_drop_time: '',
    serviceCost: 0
  };

  // Component state
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private router: Router) {
    // Initialize with empty form
  }

  calculateCost() {
    if (!this.bookingData.parcel_weight_grams || !this.bookingData.parcel_delivery_type) {
      this.bookingData.serviceCost = 0;
      return;
    }

    // Base calculation parameters
    const baseRatePerKg = 60; // Base rate per kg in INR
    const weight = this.bookingData.parcel_weight_grams / 1000; // Convert grams to kg
    
    // Weight-based calculation with tiers
    let weightCost = 0;
    if (weight <= 1) {
      weightCost = weight * baseRatePerKg;
    } else if (weight <= 5) {
      weightCost = 1 * baseRatePerKg + (weight - 1) * (baseRatePerKg * 0.8); // 20% discount for additional kg
    } else if (weight <= 10) {
      weightCost = 1 * baseRatePerKg + 4 * (baseRatePerKg * 0.8) + (weight - 5) * (baseRatePerKg * 0.6); // 40% discount for >5kg
    } else {
      weightCost = 1 * baseRatePerKg + 4 * (baseRatePerKg * 0.8) + 5 * (baseRatePerKg * 0.6) + (weight - 10) * (baseRatePerKg * 0.5); // 50% discount for >10kg
    }

    // Delivery type multiplier
    let deliveryMultiplier = 1;
    let deliveryTypeCost = 0;
    switch (this.bookingData.parcel_delivery_type) {
      case 'Standard':
        deliveryMultiplier = 1;
        deliveryTypeCost = 0;
        break;
      case 'Express':
        deliveryMultiplier = 1.8;
        deliveryTypeCost = 200;
        break;
      case 'Overnight':
        deliveryMultiplier = 2.5;
        deliveryTypeCost = 500;
        break;
      case 'Same Day':
        deliveryMultiplier = 3.5;
        deliveryTypeCost = 800;
        break;
    }

    // Packing preference additional costs
    let packingCost = 0;
    switch (this.bookingData.parcel_packing_preference) {
      case 'Standard':
        packingCost = 0;
        break;
      case 'Fragile':
        packingCost = 300;
        break;
      case 'Waterproof':
        packingCost = 250;
        break;
      case 'Temperature Controlled':
        packingCost = 600;
        break;
      case 'Heavy Duty':
        packingCost = 400;
        break;
    }

    // Distance-based cost (simulated based on PIN code difference)
    let distanceCost = 0;
    if (this.bookingData.receiver_pin && this.bookingData.receiver_pin > 0) {
      // Simulate distance calculation based on PIN code
      // In real scenario, this would use actual distance calculation APIs
      const pinString = this.bookingData.receiver_pin.toString();
      const pinDigitSum = pinString.split('').reduce((sum: number, digit: string) => sum + parseInt(digit), 0);
      distanceCost = Math.floor(pinDigitSum * 10); // Simple distance simulation
    }

    // Final cost calculation
    const baseCost = (weightCost * deliveryMultiplier) + deliveryTypeCost + packingCost + distanceCost;
    
    // Add service tax (18% GST)
    const gst = baseCost * 0.18;
    const finalCost = baseCost + gst;

    // Round to nearest 10
    this.bookingData.serviceCost = Math.round(finalCost / 10) * 10;

    // Minimum cost threshold
    if (this.bookingData.serviceCost < 100) {
      this.bookingData.serviceCost = 100;
    }
  }

  // Method to show cost breakdown
  getCostBreakdown(): any {
    if (!this.bookingData.parcel_weight_grams || !this.bookingData.parcel_delivery_type) {
      return null;
    }

    const weight = this.bookingData.parcel_weight_grams / 1000;
    const baseRatePerKg = 60;
    
    let weightCost = weight * baseRatePerKg;
    
    let deliveryTypeCost = 0;
    switch (this.bookingData.parcel_delivery_type) {
      case 'Express': deliveryTypeCost = 200; break;
      case 'Overnight': deliveryTypeCost = 500; break;
      case 'Same Day': deliveryTypeCost = 800; break;
    }

    let packingCost = 0;
    switch (this.bookingData.parcel_packing_preference) {
      case 'Fragile': packingCost = 300; break;
      case 'Waterproof': packingCost = 250; break;
      case 'Temperature Controlled': packingCost = 600; break;
      case 'Heavy Duty': packingCost = 400; break;
    }

    const subtotal = weightCost + deliveryTypeCost + packingCost;
    const gst = subtotal * 0.18;

    return {
      weightCost: Math.round(weightCost),
      deliveryTypeCost,
      packingCost,
      subtotal: Math.round(subtotal),
      gst: Math.round(gst),
      total: this.bookingData.serviceCost
    };
  }

  async onCreateBooking() {
    this.errorMessage.set('');
    this.successMessage.set('');

    // Validate form
    if (!this.bookingData.receiver_name || !this.bookingData.receiverAddress || 
        !this.bookingData.receiver_phone_number || !this.bookingData.parcel_content_desc) {
      this.errorMessage.set('Please fill in all required fields');
      return;
    }

    if (!this.bookingData.receiver_pin || this.bookingData.receiver_pin < 100000 || this.bookingData.receiver_pin > 999999) {
      this.errorMessage.set('Please enter a valid 6-digit PIN code');
      return;
    }

    this.isLoading.set(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store booking in localStorage for demo
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const newBooking = {
        ...this.bookingData,
        bookingId: 'BK' + Date.now(),
        bookingDate: new Date().toISOString(),
        status: 'Confirmed'
      };
      bookings.push(newBooking);
      localStorage.setItem('userBookings', JSON.stringify(bookings));

      this.successMessage.set('Booking created successfully! Booking ID: ' + newBooking.bookingId);
      
      // Reset form after 3 seconds and navigate
      setTimeout(() => {
        this.router.navigate(['/previous-bookings']);
      }, 3000);

    } catch (error) {
      this.errorMessage.set('Failed to create booking. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
