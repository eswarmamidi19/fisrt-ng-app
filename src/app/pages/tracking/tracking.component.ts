import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">
          @if (authService.isAdmin()) {
            Track Any Booking (Admin View)
          } @else {
            Track Your Booking
          }
        </h1>
        
        <!-- Search Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
              <input 
                type="text" 
                [(ngModel)]="searchBookingId"
                [placeholder]="authService.isAdmin() ? 'Enter any booking ID' : 'Enter your booking ID'" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div class="flex items-end">
              <button 
                (click)="searchBooking()"
                [disabled]="isLoading()"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                @if (isLoading()) {
                  <span class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    @if (authService.isAdmin()) {
                      Searching all bookings...
                    } @else {
                      Searching...
                    }
                  </span>
                } @else {
                  Track Booking
                }
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        @if (errorMessage()) {
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ errorMessage() }}</p>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Booking Details -->
        @if (foundBooking()) {
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-900">Booking Details</h2>
              @if (authService.isAdmin()) {
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Admin View
                </span>
              }
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">Booking Information</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Booking ID:</span>
                    <span class="font-medium">{{ foundBooking()!.bookingId }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Status:</span>
                    <span class="px-2 py-1 text-xs font-semibold rounded-full" [ngClass]="getStatusClass(foundBooking()!.bookingStatus)">
                      {{ foundBooking()!.bookingStatus }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Payment Date:</span>
                    <span class="font-medium">{{ formatDate(foundBooking()!.parcelPaymentTime) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Service Cost:</span>
                    <span class="font-medium">₹{{ foundBooking()!.serviceCost }}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">Sender Details</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Name:</span>
                    <span class="font-medium">{{ foundBooking()!.name }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Phone:</span>
                    <span class="font-medium">{{ foundBooking()!.phoneNumber }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Address:</span>
                    <p class="font-medium mt-1">{{ foundBooking()!.address }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Receiver Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex justify-between">
                  <span class="text-gray-600">Name:</span>
                  <span class="font-medium">{{ foundBooking()!.receiverName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Phone:</span>
                  <span class="font-medium">{{ foundBooking()!.receiverPhoneNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">PIN Code:</span>
                  <span class="font-medium">{{ foundBooking()!.receiverPin }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Address:</span>
                  <p class="font-medium mt-1">{{ foundBooking()!.receiverAddress }}</p>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Parcel Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex justify-between">
                  <span class="text-gray-600">Weight:</span>
                  <span class="font-medium">{{ foundBooking()!.parcelWeightInGrams }}g</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Delivery Type:</span>
                  <span class="font-medium">{{ foundBooking()!.parcelDeliveryType }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Packing:</span>
                  <span class="font-medium">{{ foundBooking()!.parcelPackingPreference }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Content:</span>
                  <span class="font-medium">{{ foundBooking()!.parcelContentDesc }}</span>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Timeline</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex justify-between">
                  <span class="text-gray-600">Pickup Time:</span>
                  <span class="font-medium">{{ formatDate(foundBooking()!.parcelPickUpTime) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Drop Time:</span>
                  <span class="font-medium">{{ formatDate(foundBooking()!.parcelDropTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- No Results Message -->
        @if (searchPerformed() && !foundBooking() && !errorMessage()) {
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">No Booking Found</h3>
                <div class="mt-2 text-sm text-yellow-700">
                  <p>No booking found with ID "{{ searchBookingId }}". 
                    @if (authService.isAdmin()) {
                      Please check the booking ID from any user's bookings and try again.
                    } @else {
                      Please check your booking ID and try again.
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class TrackingComponent {
  searchBookingId = '';
  foundBooking = signal<Booking | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');
  searchPerformed = signal(false);

  constructor(
    private bookingService: BookingService,
    public authService: AuthService
  ) {}

  async searchBooking() {
    if (!this.searchBookingId.trim()) {
      this.errorMessage.set('Please enter a booking ID');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.foundBooking.set(null);
    this.searchPerformed.set(false);

    try {
      // Use appropriate endpoint based on user role
      let allBookings;
      if (this.authService.isAdmin()) {
        allBookings = await this.bookingService.getAllBookings();
      } else {
        allBookings = await this.bookingService.getUserBookings();
      }
      
      const booking = allBookings.find(b => b.bookingId.toString() === this.searchBookingId.trim());
      
      this.foundBooking.set(booking || null);
      this.searchPerformed.set(true);
      
    } catch (error: any) {
      console.error('Error searching booking:', error);
      this.errorMessage.set(error.message || 'Failed to search booking. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'booked':
        return 'bg-blue-100 text-blue-800';
      case 'intransit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      // Handle legacy statuses if they still exist
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
      case 'picked up':
      case 'in transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }
}
