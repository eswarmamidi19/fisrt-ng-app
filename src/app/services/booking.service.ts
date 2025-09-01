import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

export interface BookingRequest {
  receiver_name: string;
  receiverAddress: string;
  receiver_pin: number;
  receiver_phone_number: string;
  parcel_weight_grams: number;
  parcel_content_desc: string;
  parcel_delivery_type: string;
  parcel_packing_preference: string;
  parcel_pickup_time: string;
  parcel_drop_time: string;
  serviceCost: number;
}

export interface BookingResponse {
  bookingId: string;
  customerId: number;
  receiver_name: string;
  receiverAddress: string;
  receiver_pin: number;
  receiver_phone_number: string;
  parcel_weight_grams: number;
  parcel_content_desc: string;
  parcel_delivery_type: string;
  parcel_packing_preference: string;
  parcel_pickup_time: string;
  parcel_drop_time: string;
  serviceCost: number;
  status: string;
  bookingDate: string;
}

export interface Booking {
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

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_URL = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient, private authService: AuthService) {}

  async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
    try {
      // Get the authorization header from auth service
      const authHeader = this.authService.getAuthHeader();
      console.log('Auth Header:', authHeader);
      // Create headers with proper CORS configuration
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('authToken') || '',
      });
      
      console.log('Creating booking with data:', bookingData);
      console.log('Using headers:', headers);
      
      const response = await firstValueFrom(
        this.http.post<BookingResponse>(`${this.API_URL}/customer`, bookingData, { 
          headers,
          // Add response type explicitly
          responseType: 'json' as const
        })
      );
      
      console.log('Booking created successfully:', response);
      return response;
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get all bookings for the current user
   */
  async getUserBookings(): Promise<Booking[]> {
    try {
     const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('authToken') || '',
      });
      
      const response = await firstValueFrom(
        this.http.get<Booking[]>(`http://localhost:8080/api/bookings/user_bookings`, { 
          headers,
          responseType: 'json' as const
        })
      );
      
      console.log('User bookings retrieved:', response);
      return response;
    } catch (error: any) {
      console.error('Failed to get user bookings:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get booking by ID
   */
  async getBookingById(bookingId: string): Promise<Booking> {
    try {
      const headers = this.authService.getAuthHeader();
      
      const response = await firstValueFrom(
        this.http.get<Booking>(`${this.API_URL}/${bookingId}`, { headers })
      );
      
      console.log('Booking retrieved:', response);
      return response;
    } catch (error: any) {
      console.error('Failed to get booking:', error);
      throw this.handleError(error);
    }
  }
  /**
   * Get booking by ID
   */
  async getBookingStatusById(bookingId: number): Promise<Booking> {
    try {
     const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('authToken') || '',
      });
      
      const response = await firstValueFrom(
        this.http.get<Booking>(`${this.API_URL}/${bookingId}`, { headers , responseType: 'json' as const})
      );
      
      console.log('Booking retrieved:', response);
      return response;
    } catch (error: any) {
      console.error('Failed to get booking:', error);
      throw this.handleError(error);
    }
  }
  
  
  /**
   * Update booking status
   */
  async updateBookingStatus(bookingId: string, status: string): Promise<Booking> {
    try {
      const headers = this.authService.getAuthHeader();
      
      const response = await firstValueFrom(
        this.http.put<Booking>(`${this.API_URL}/${bookingId}/status`, { status }, { headers })
      );
      
      console.log('Booking status updated:', response);
      return response;
    } catch (error: any) {
      console.error('Failed to update booking status:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Cancel booking
   */
  async cancelBooking(bookingId: string): Promise<Booking> {
    try {
      const headers = this.authService.getAuthHeader();
      
      const response = await firstValueFrom(
        this.http.delete<Booking>(`${this.API_URL}/${bookingId}`, { headers })
      );
      
      console.log('Booking cancelled:', response);
      return response;
    } catch (error: any) {
      console.error('Failed to cancel booking:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Calculate service cost based on booking parameters
   */
  calculateServiceCost(
    weightGrams: number, 
    deliveryType: string, 
    packingPreference: string
  ): number {
    if (!weightGrams || !deliveryType) {
      return 0;
    }

    // Base calculation parameters
    const baseRatePerKg = 60; // Base rate per kg in INR
    const weight = weightGrams / 1000; // Convert grams to kg
    
    // Base cost calculation
    let baseCost = weight * baseRatePerKg;
    
    // Delivery type multipliers
    let deliveryMultiplier = 1;
    switch (deliveryType) {
      case 'Express':
        deliveryMultiplier = 2;
        break;
      case 'Overnight':
        deliveryMultiplier = 3;
        break;
      case 'Same Day':
        deliveryMultiplier = 4;
        break;
      default: // Standard
        deliveryMultiplier = 1;
    }
    
    // Packing preference additional costs
    let packingCost = 0;
    switch (packingPreference) {
      case 'Fragile':
        packingCost = 500;
        break;
      case 'Waterproof':
        packingCost = 300;
        break;
      case 'Temperature Controlled':
        packingCost = 800;
        break;
      case 'Heavy Duty':
        packingCost = 400;
        break;
      default: // Standard
        packingCost = 0;
    }
    
    // Final calculation
    const totalCost = (baseCost * deliveryMultiplier) + packingCost;
    return Math.round(totalCost);
  }

  /**
   * Validate booking data
   */
  validateBookingData(bookingData: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required fields validation
    if (!bookingData.receiver_name?.trim()) {
      errors.push('Receiver name is required');
    }
    if (!bookingData.receiverAddress?.trim()) {
      errors.push('Receiver address is required');
    }
    if (!bookingData.receiver_phone_number?.trim()) {
      errors.push('Receiver phone number is required');
    }
    if (!bookingData.parcel_content_desc?.trim()) {
      errors.push('Parcel content description is required');
    }
    if (!bookingData.parcel_delivery_type) {
      errors.push('Delivery type is required');
    }
    if (!bookingData.parcel_packing_preference) {
      errors.push('Packing preference is required');
    }
    if (!bookingData.parcel_pickup_time) {
      errors.push('Pickup time is required');
    }
    if (!bookingData.parcel_drop_time) {
      errors.push('Drop time is required');
    }

    // Numeric validations
    if (!bookingData.receiver_pin || bookingData.receiver_pin < 100000 || bookingData.receiver_pin > 999999) {
      errors.push('Please enter a valid 6-digit PIN code');
    }
    if (!bookingData.parcel_weight_grams || bookingData.parcel_weight_grams <= 0) {
      errors.push('Parcel weight must be greater than 0 grams');
    }
    if (!bookingData.serviceCost || bookingData.serviceCost <= 0) {
      errors.push('Service cost must be calculated and greater than 0');
    }

    // Date validations
    const pickupDate = new Date(bookingData.parcel_pickup_time);
    const dropDate = new Date(bookingData.parcel_drop_time);
    const now = new Date();

    if (pickupDate <= now) {
      errors.push('Pickup time must be in the future');
    }
    if (dropDate <= pickupDate) {
      errors.push('Drop time must be after pickup time');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Error {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.status) {
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid booking data. Please check your inputs.';
          break;
        case 401:
          errorMessage = 'You are not authorized. Please login again.';
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'Booking service not found. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message || 'Unknown error'}`;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    return new Error(errorMessage);
  }
}
