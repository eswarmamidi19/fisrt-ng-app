import { Component, signal, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';

interface UserBooking {
  bookingId: number;
  name: string;
  address: string;
  phoneNumber: string;
  receiverName: string;
  receiverAddress: string;
  receiverPin: number;
  receiverPhoneNumber: string;
  parcelWeightInGrams: number;
  parcelContentDesc: string;
  parcelDeliveryType: string;
  parcelPackingPreference: string;
  parcelPickUpTime: string;
  parcelDropTime: string;
  serviceCost: number;
  parcelPaymentTime: string;
  bookingStatus: string;
}

@Component({
  selector: 'app-previous-bookings',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">
          @if (authService.isAdmin()) {
            All Users' Parcel Bookings (Admin View)
          } @else {
            Previous Parcel Bookings
          }
        </h1>
        
        <!-- Filter Bar -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
          <div class="flex flex-wrap gap-4">
            <select 
              [(ngModel)]="selectedDeliveryType"
              (ngModelChange)="applyFilters()"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Delivery Types</option>
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
              <option value="Overnight">Overnight</option>
              <option value="Same Day">Same Day</option>
            </select>
            
            <select 
              [(ngModel)]="selectedStatus"
              (ngModelChange)="applyFilters()"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="BOOKED">Booked</option>
              <option value="PICKED_UP">Picked Up</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            
            <input 
              type="date" 
              [(ngModel)]="selectedDate"
              (ngModelChange)="applyFilters()"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            
            <button 
              (click)="clearFilters()"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300">
              Clear Filters
            </button>
            
            <button 
              (click)="refreshBookings()"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
              Refresh
            </button>
          </div>
          
          <!-- Results count -->
          @if (filteredBookings().length !== previousBookings().length) {
            <div class="mt-2 text-sm text-gray-600">
              Showing {{ filteredBookings().length }} of {{ previousBookings().length }} bookings
            </div>
          }
          
          <!-- Admin info -->
          @if (authService.isAdmin() && previousBookings().length > 0) {
            <div class="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-md">
              <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Admin View: Displaying bookings from all users
            </div>
          }
        </div>

        <!-- Bookings List -->
        @if (isLoading()) {
          <div class="text-center py-12">
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            @if (authService.isAdmin()) {
              <p class="text-gray-600">Loading all users' bookings...</p>
            } @else {
              <p class="text-gray-600">Loading your bookings...</p>
            }
          </div>
        } @else if (errorMessage()) {
          <div class="text-center py-12">
            <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">{{ errorMessage() }}</h3>
            <button 
              (click)="refreshBookings()"
              class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
              Try Again
            </button>
          </div>
        } @else {
          <div class="space-y-4">
          @for (booking of filteredBookings(); track booking.bookingId) {
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="grid lg:grid-cols-3 gap-6">
                
                <!-- Left Column: Booking Details -->
                <div class="lg:col-span-2">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-2">
                      <h3 class="text-lg font-semibold text-gray-900">Parcel Delivery</h3>
                      <span [class]="getStatusClass(booking.bookingStatus)" class="px-3 py-1 rounded-full text-xs font-medium">
                        {{ booking.bookingStatus }}
                      </span>
                    </div>
                    @if (authService.isAdmin()) {
                      <div class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        User: {{ booking.name }}
                      </div>
                    }
                  </div>
                  
                  <div class="grid md:grid-cols-2 gap-4">
                    <!-- Booking Info -->
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">Booking Information</h4>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Booking ID:</strong> {{ booking.bookingId }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Payment Date:</strong> {{ formatDate(booking.parcelPaymentTime) }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Delivery Type:</strong> {{ booking.parcelDeliveryType }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Weight:</strong> {{ booking.parcelWeightInGrams / 1000 }} kg
                      </p>
                    </div>

                    <!-- Receiver Info -->
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">Receiver Details</h4>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Name:</strong> {{ booking.receiverName }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>Phone:</strong> {{ booking.receiverPhoneNumber }}
                      </p>
                      <p class="text-sm text-gray-600 mb-1">
                        <strong>PIN:</strong> {{ booking.receiverPin }}
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
                      <strong>Content:</strong> {{ booking.parcelContentDesc }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <strong>Packing:</strong> {{ booking.parcelPackingPreference }}
                    </p>
                  </div>

                  <!-- Timing -->
                  <div class="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">
                        <strong>Pickup:</strong> {{ formatDateTime(booking.parcelPickUpTime) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">
                        <strong>Expected Delivery:</strong> {{ formatDateTime(booking.parcelDropTime) }}
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

                  <!-- <div class="space-y-2">
                    <button class="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                    <button class="w-full px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition duration-300">
                      Track Package
                    </button>
                    @if (booking.bookingStatus === 'DELIVERED') {
                      <button class="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition duration-300">
                        Rebook Similar
                      </button>
                      <button class="w-full px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition duration-300">
                        Rate Service
                      </button>
                    }
                    @if (booking.bookingStatus === 'BOOKED') {
                      <button class="w-full px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition duration-300">
                        Cancel Booking
                      </button>
                    }
                  </div> -->
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
        }
      </div>
    </div>
  `
})
export class PreviousBookingsComponent implements OnInit {
  previousBookings = signal<UserBooking[]>([]);
  filteredBookings = signal<UserBooking[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  // Filter controls
  selectedDeliveryType = signal('');
  selectedStatus = signal('');
  selectedDate = signal('');

  private readonly API_URL = 'http://localhost:8080/api/booking';

  constructor(public authService: AuthService, private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  async loadBookings() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // Check if user is logged in
      if (!this.authService.isLoggedIn()) {
        this.errorMessage.set('Please log in to view your bookings.');
        this.previousBookings.set([]);
        this.filteredBookings.set([]);
        return;
      }

      console.log('Fetching bookings from API...');
      
      // Use different endpoints based on user role
      let response;
      if (this.authService.isAdmin()) {
        console.log('Loading all bookings for admin...');
        response = await this.bookingService.getAllBookings();
      } else {
        console.log('Loading user bookings...');
        response = await this.bookingService.getUserBookings();
      }

      console.log('API Response:', response);

      if (response && Array.isArray(response)) {
        // Convert the response to UserBooking format if needed
        const userBookings = response as any as UserBooking[];
        this.previousBookings.set(userBookings);
        this.filteredBookings.set(userBookings);
        console.log('Loaded bookings from API:', userBookings);
      } else {
        console.warn('Invalid response format:', response);
        this.errorMessage.set('Invalid response format from server.');
        this.previousBookings.set([]);
        this.filteredBookings.set([]);
      }

    } catch (error: any) {
      console.error('Error loading bookings from API:', error);
      
      // Handle different types of errors
      if (error.message?.includes('401')) {
        this.errorMessage.set('Authentication failed. Please log in again.');
      } else if (error.message?.includes('403')) {
        this.errorMessage.set('Access denied. You do not have permission to view bookings.');
      } else if (error.message?.includes('0') || error.message?.includes('network')) {
        this.errorMessage.set('Cannot connect to server. Please check if the backend is running.');
      } else {
        this.errorMessage.set(`Failed to load bookings: ${error.message || 'Unknown error'}`);
      }
      
      // Fallback: try to load from localStorage as backup
      try {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && (currentUser as any).bookings) {
          const userBookings = (currentUser as any).bookings as UserBooking[];
          this.previousBookings.set(userBookings);
          this.filteredBookings.set(userBookings);
          console.log('Loaded fallback bookings from localStorage:', userBookings);
          this.errorMessage.set('Loaded cached bookings (server unavailable)');
        } else {
          this.previousBookings.set([]);
          this.filteredBookings.set([]);
        }
      } catch (fallbackError) {
        console.error('Fallback loading failed:', fallbackError);
        this.previousBookings.set([]);
        this.filteredBookings.set([]);
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  applyFilters() {
    let filtered = this.previousBookings();

    // Filter by delivery type
    if (this.selectedDeliveryType()) {
      filtered = filtered.filter(booking => 
        booking.parcelDeliveryType.toLowerCase() === this.selectedDeliveryType().toLowerCase()
      );
    }

    // Filter by status
    if (this.selectedStatus()) {
      filtered = filtered.filter(booking => 
        booking.bookingStatus.toLowerCase() === this.selectedStatus().toLowerCase()
      );
    }

    // Filter by date
    if (this.selectedDate()) {
      const filterDate = new Date(this.selectedDate()).toDateString();
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.parcelPaymentTime).toDateString();
        return bookingDate === filterDate;
      });
    }

    this.filteredBookings.set(filtered);
  }

  clearFilters() {
    this.selectedDeliveryType.set('');
    this.selectedStatus.set('');
    this.selectedDate.set('');
    this.filteredBookings.set(this.previousBookings());
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
    switch (status.toLowerCase()) {
      case 'booked':
        return 'bg-blue-100 text-blue-800';
      case 'intransit':
      case 'in transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      // Handle legacy statuses
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'picked up':
      case 'pickedup':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
