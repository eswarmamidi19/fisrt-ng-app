import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookingService, BookingRequest } from '../../services/booking.service';

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
            
            <!-- Sender Information Section -->
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Sender Information</h3>
                  <p class="text-sm text-gray-600">This information is auto-filled from your profile</p>
                </div>
                <button
                  type="button"
                  (click)="refreshSenderInfo()"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Refresh
                </button>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="sender_name" class="block text-sm font-medium text-gray-700 mb-2">
                    Sender Name *
                  </label>
                  <input
                    id="sender_name"
                    name="sender_name"
                    type="text"
                    [(ngModel)]="bookingData.sender_name"
                    required
                    readonly
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label for="sender_phone_number" class="block text-sm font-medium text-gray-700 mb-2">
                    Sender Phone Number *
                  </label>
                  <input
                    id="sender_phone_number"
                    name="sender_phone_number"
                    type="tel"
                    [(ngModel)]="bookingData.sender_phone_number"
                    required
                    readonly
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label for="sender_address" class="block text-sm font-medium text-gray-700 mb-2">
                  Sender Address *
                </label>
                <textarea
                  id="sender_address"
                  name="sender_address"
                  rows="3"
                  [(ngModel)]="bookingData.sender_address"
                  required
                  readonly
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                <p class="mt-1 text-xs text-gray-500">
                  To update this information, please edit your profile settings.
                </p>
              </div>
            </div>

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
                  required
                  placeholder="Enter 6-digit PIN code"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                    placeholder="Enter weight in grams"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    <option value="Standard">Standard</option>
                    <option value="Express">Express</option>
                    <option value="Overnight">Overnight</option>
                    <option value="Same Day">Same Day</option>
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
                  <option value="Standard">Standard</option>
                  <option value="Fragile">Fragile</option>
                  <option value="Waterproof">Waterproof</option>
                  <option value="Temperature Controlled">Temperature Controlled</option>
                  <option value="Heavy Duty">Heavy Duty</option>
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
              
              <div class="flex items-center justify-between">
                <span class="text-lg font-medium text-gray-700">Total Service Cost:</span>
                <span class="text-3xl font-bold text-green-600">₹{{ bookingData.serviceCost }}</span>
              </div>
              
              <div class="mt-2 text-sm text-gray-600">
                <p>Cost automatically calculated based on weight, delivery type, and packing preference.</p>
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
    // Sender Information (auto-filled from logged-in user)
    sender_name: '',
    sender_phone_number: '',
    sender_address: '',
    
    // Receiver Information
    receiver_name: '',
    receiverAddress: '',
    receiver_pin: 0,
    receiver_phone_number: '',
    
    // Parcel Information
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

  constructor(private router: Router, private authService: AuthService, private bookingService: BookingService) {
    // Auto-fill sender information from logged-in user
    this.loadSenderInformation();
  }

  loadSenderInformation() {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.bookingData.sender_name = currentUser.customerName || '';
      this.bookingData.sender_phone_number = currentUser.customerMobileNumber || '';
      this.bookingData.sender_address = currentUser.customerAddress || '';
    } else {
      // If no user is logged in, clear the fields and show an error
      this.bookingData.sender_name = '';
      this.bookingData.sender_phone_number = '';
      this.bookingData.sender_address = '';
      this.errorMessage.set('Please log in to create a booking. Sender information cannot be loaded.');
    }
  }

  refreshSenderInfo() {
    this.loadSenderInformation();
    // Show a brief success message
    this.successMessage.set('Sender information refreshed successfully!');
    setTimeout(() => {
      this.successMessage.set('');
    }, 2000);
  }

  calculateCost() {
    this.bookingData.serviceCost = this.bookingService.calculateServiceCost(
      this.bookingData.parcel_weight_grams,
      this.bookingData.parcel_delivery_type,
      this.bookingData.parcel_packing_preference
    );
  }

  async onCreateBooking() {
    this.errorMessage.set('');
    this.successMessage.set('');

    // Validate using booking service
    const validation = this.bookingService.validateBookingData(this.bookingData);
    if (!validation.isValid) {
      this.errorMessage.set(validation.errors.join(', '));
      return;
    }

    // Additional sender validation
    if (!this.bookingData.sender_name || !this.bookingData.sender_phone_number || 
        !this.bookingData.sender_address) {
      this.errorMessage.set('Sender information is missing. Please refresh the page or check your login status.');
      return;
    }

    this.isLoading.set(true);

    try {
      // Prepare the request body according to your API format
      const bookingRequest: BookingRequest = {
        receiver_name: this.bookingData.receiver_name,
        receiverAddress: this.bookingData.receiverAddress,
        receiver_pin: this.bookingData.receiver_pin,
        receiver_phone_number: this.bookingData.receiver_phone_number,
        parcel_weight_grams: this.bookingData.parcel_weight_grams,
        parcel_content_desc: this.bookingData.parcel_content_desc,
        parcel_delivery_type: this.bookingData.parcel_delivery_type,
        parcel_packing_preference: this.bookingData.parcel_packing_preference,
        parcel_pickup_time: this.bookingData.parcel_pickup_time,
        parcel_drop_time: this.bookingData.parcel_drop_time,
        serviceCost: this.bookingData.serviceCost
      };

      console.log('Creating booking with data:', bookingRequest);

      // Use booking service to create booking
      const response = await this.bookingService.createBooking(bookingRequest);

      console.log('Booking creation response:', response);

      // Also store booking in localStorage for previous bookings page (for demo purposes)
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const newBooking = {
        ...this.bookingData,
        bookingId: response.bookingId || 'BK' + Date.now(),
        bookingDate: new Date().toISOString(),
        status: 'Confirmed'
      };
      bookings.push(newBooking);
      localStorage.setItem('userBookings', JSON.stringify(bookings));

      this.successMessage.set('Booking created successfully! Booking ID: ' + (response.bookingId || newBooking.bookingId));
      
      // Reset form after 3 seconds and navigate
      setTimeout(() => {
        this.router.navigate(['/previous-bookings']);
      }, 3000);

    } catch (error: any) {
      console.error('Booking creation failed:', error);
      this.errorMessage.set(error.message || 'Failed to create booking. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
