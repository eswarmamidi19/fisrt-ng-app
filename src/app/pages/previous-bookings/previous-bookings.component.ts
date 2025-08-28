import { Component, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous-bookings',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Previous Parcel Bookings</h1>
        
        <!-- Filter Bar -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
          <div class="flex flex-wrap gap-4">
            <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Delivery Types</option>
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
              <option value="Overnight">Overnight</option>
              <option value="Same Day">Same Day</option>
            </select>
            
            <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Picked Up">Picked Up</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            
            <input type="date" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
              Apply Filters
            </button>
            
            <button 
              (click)="refreshBookings()"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
              Refresh
            </button>
          </div>
        </div>

        <!-- Bookings List -->
        <div class="space-y-4">
          @for (booking of previousBookings(); track booking.bookingId) {
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="grid lg:grid-cols-3 gap-6">
                
                <!-- Left Column: Booking Details -->
                <div class="lg:col-span-2">
                  <div class="flex items-center space-x-2 mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Parcel Delivery</h3>
                    <span [class]="getStatusClass(booking.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                      {{ booking.status }}
                    </span>
                  </div>
                  
                  <div class="grid md:grid-cols-2 gap-4">
                    <!-- Booking Info -->
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">Booking Information</h4>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Booking ID:</strong> {{ booking.bookingId }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Booking Date:</strong> {{ formatDate(booking.bookingDate) }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Delivery Type:</strong> {{ booking.parcel_delivery_type }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Weight:</strong> {{ booking.parcel_weight_grams / 1000 }} kg
                      </p>
                    </div>

                    <!-- Receiver Info -->
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">Receiver Details</h4>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Name:</strong> {{ booking.receiver_name }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Phone:</strong> {{ booking.receiver_phone_number }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>PIN:</strong> {{ booking.receiver_pin }}
                      </p>
                    </div>
                  </div>

                  <!-- Address & Content -->
                  <div class="mt-4">
                    <p class="text-sm text-gray-600 mb-2">
                      <strong>Delivery Address:</strong><br>
                      {{ booking.receiverAddress }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                      <strong>Content:</strong> {{ booking.parcel_content_desc }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <strong>Packing:</strong> {{ booking.parcel_packing_preference }}
                    </p>
                  </div>

                  <!-- Timing -->
                  <div class="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">
                        <strong>Pickup:</strong> {{ formatDateTime(booking.parcel_pickup_time) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">
                        <strong>Expected Delivery:</strong> {{ formatDateTime(booking.parcel_drop_time) }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Right Column: Actions & Cost -->
                <div class="lg:col-span-1">
                  <div class="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 class="font-medium text-gray-900 mb-2">Service Cost</h4>
                    <p class="text-2xl font-bold text-green-600">₹{{ booking.serviceCost }}</p>
                  </div>

                  <div class="space-y-2">
                    <button class="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                    <button class="w-full px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition duration-300">
                      Track Package
                    </button>
                    @if (booking.status === 'Delivered') {
                      <button class="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition duration-300">
                        Rebook Similar
                      </button>
                      <button class="w-full px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition duration-300">
                        Rate Service
                      </button>
                    }
                    @if (booking.status === 'Confirmed') {
                      <button class="w-full px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition duration-300">
                        Cancel Booking
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          } @empty {
            <div class="text-center py-12">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p class="text-gray-600">You haven't made any parcel bookings yet.</p>
              <button 
                onclick="window.location.href='/booking'"
                class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Create Your First Booking
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class PreviousBookingsComponent implements OnInit {
  previousBookings = signal<any[]>([]);

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    this.previousBookings.set(bookings);
  }

  refreshBookings() {
    this.loadBookings();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Picked Up':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Transit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
