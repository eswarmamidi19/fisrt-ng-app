import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../../services/booking.service';

@Component({
  selector: 'app-update-booking-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Update Booking Status - All Users</h1>
        
        <!-- Search Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
              <input 
                type="text" 
                [(ngModel)]="searchBookingId"
                placeholder="Enter booking ID to update status (from all users)" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div class="flex items-end">
              <button 
                (click)="searchBooking()"
                [disabled]="isLoading()"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mr-2">
                @if (isLoading()) {
                  <span class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                } @else {
                  Search Booking
                }
              </button>
              <button 
                (click)="loadAllBookings()"
                [disabled]="isLoading()"
                class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Load All Users' Bookings
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

        <!-- Success Message -->
        @if (successMessage()) {
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">Success</h3>
                <div class="mt-2 text-sm text-green-700">
                  <p>{{ successMessage() }}</p>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Bookings Table -->
        @if (bookings().length > 0) {
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">All Users' Bookings</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receiver
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Update Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  @for (booking of bookings(); track booking.bookingId) {
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ booking.bookingId }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ booking.name }}</div>
                          <div class="text-sm text-gray-500">{{ booking.phoneNumber }}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ booking.receiverName }}</div>
                          <div class="text-sm text-gray-500">{{ booking.receiverPhoneNumber }}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full" [ngClass]="getStatusClass(booking.bookingStatus)">
                          {{ booking.bookingStatus }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select 
                          [(ngModel)]="booking.newStatus"
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option value="">Select Status</option>
                          <option value="BOOKED">BOOKED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PICKED_UP">PICKED UP</option>
                          <option value="IN_TRANSIT">IN TRANSIT</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          (click)="updateBookingStatus(booking)"
                          [disabled]="!booking.newStatus || isUpdating() === booking.bookingId"
                          class="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed">
                          @if (isUpdating() === booking.bookingId) {
                            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          } @else {
                            Update
                          }
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- No Results Message -->
        @if (searchPerformed() && bookings().length === 0 && !errorMessage()) {
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">No Bookings Found</h3>
                <div class="mt-2 text-sm text-yellow-700">
                  <p>No bookings found with the specified criteria.</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class UpdateBookingStatusComponent {
  searchBookingId = '';
  bookings = signal<(Booking & { newStatus?: string })[]>([]);
  isLoading = signal(false);
  isUpdating = signal<number | null>(null);
  errorMessage = signal('');
  successMessage = signal('');
  searchPerformed = signal(false);

  constructor(private bookingService: BookingService) {}

  async searchBooking() {
    if (!this.searchBookingId.trim()) {
      this.errorMessage.set('Please enter a booking ID');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.bookings.set([]);
    this.searchPerformed.set(false);

    try {
      const allBookings = await this.bookingService.getAllBookings();
      const booking = allBookings.find(b => b.bookingId.toString() === this.searchBookingId.trim());
      
      if (booking) {
        this.bookings.set([{ ...booking, newStatus: '' }]);
      } else {
        this.bookings.set([]);
      }
      this.searchPerformed.set(true);
      
    } catch (error: any) {
      console.error('Error searching booking:', error);
      this.errorMessage.set(error.message || 'Failed to search booking. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadAllBookings() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.searchBookingId = '';

    try {
      const allBookings = await this.bookingService.getAllBookings();
      this.bookings.set(allBookings.map(booking => ({ ...booking, newStatus: '' })));
      this.searchPerformed.set(true);
      
    } catch (error: any) {
      console.error('Error loading bookings:', error);
      this.errorMessage.set(error.message || 'Failed to load bookings. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateBookingStatus(booking: Booking & { newStatus?: string }) {
    if (!booking.newStatus) {
      this.errorMessage.set('Please select a new status');
      return;
    }

    this.isUpdating.set(booking.bookingId);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      await this.bookingService.updateBookingStatus(booking.bookingId.toString(), booking.newStatus);
      
      // Update the booking in the local array
      const updatedBookings = this.bookings().map(b => 
        b.bookingId === booking.bookingId 
          ? { ...b, bookingStatus: booking.newStatus!, newStatus: '' }
          : b
      );
      this.bookings.set(updatedBookings);
      
      this.successMessage.set(`Booking ${booking.bookingId} status updated to ${booking.newStatus} successfully!`);
      
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      this.errorMessage.set(error.message || 'Failed to update booking status. Please try again.');
    } finally {
      this.isUpdating.set(null);
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'BOOKED':
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'PICKED_UP':
      case 'IN_TRANSIT':
        return 'bg-yellow-100 text-yellow-800';
      case 'OUT_FOR_DELIVERY':
        return 'bg-orange-100 text-orange-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
