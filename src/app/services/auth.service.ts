import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface User {
  userId: number;
  customerName: string;
  customerEmail: string;
  customerMobileNumber: string;
  customerAddress: string;
  customerPreferences: string;
  role: string;
  countryCode: string;
  bookings: any[];
}

export interface LoginRequest {
  user_id: number;
  password: string;
}

export interface LoginResponse {
  userId: number;
  customerName: string;
  customerEmail: string;
  customerMobileNumber: string;
  customerAddress: string;
  customerPreferences: string;
  role: string;
  countryCode: string;
  password: string;
  bookings: any[];
  // Optional field for token if backend sends it in response body as fallback
  token?: string;
}

export interface RegisterResponse {
  userId: number;
  customerName: string;
  customerEmail: string;
  customerMobileNumber: string;
  customerAddress: string;
  customerPreferences: string;
  role: string;
  countryCode: string;
  password: string;
  bookings: any[];
  message?: string;
}

export interface RegisterData {
  customer_name: string;
  email: string;
  countryCode: string;
  mobile_number: string;
  address: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/customers';
  private _isLoggedIn = signal(false);
  private _currentUser = signal<User | null>(null);
  private _authToken = signal<string | null>(null);

  // Public readonly signals
  isLoggedIn = this._isLoggedIn.asReadonly();
  currentUser = this._currentUser.asReadonly();
  authToken = this._authToken.asReadonly();

  constructor(private http: HttpClient) {
    // Check if user was previously logged in (e.g., from localStorage)
    this.checkStoredAuth();
  }

  async login(userId: number, password: string): Promise<boolean> {
    try {
      const loginRequest: LoginRequest = {
        user_id: userId,
        password: password
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      // Use observe: 'response' to get full HTTP response including headers
      const httpResponse = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, loginRequest, { 
          headers, 
          observe: 'response' 
        })
      );

      console.log('Login response received:', httpResponse);
      console.log('Response status:', httpResponse.status);
      console.log('Response headers keys:', httpResponse.headers.keys());
      
      // Log all headers for debugging
      httpResponse.headers.keys().forEach(key => {
        console.log(`Header ${key}:`, httpResponse.headers.get(key));
      });
      
      const response = httpResponse.body;
      
      if (response && response.userId) {
        const user: User = {
          userId: response.userId,
          customerName: response.customerName,
          customerEmail: response.customerEmail,
          customerMobileNumber: response.customerMobileNumber,
          customerAddress: response.customerAddress,
          customerPreferences: response.customerPreferences,
          role: response.role,
          countryCode: response.countryCode,
          bookings: response.bookings || []
        };

        // Extract Authorization token from response headers
        let authToken = httpResponse.headers.get('Authorization');
        
        // Try alternative header names in case of case sensitivity issues
        if (!authToken) {
          authToken = httpResponse.headers.get('authorization');
        }
        if (!authToken) {
          authToken = httpResponse.headers.get('AUTHORIZATION');
        }
        
        // Fallback: check if token is in response body (temporary workaround)
        if (!authToken && response.token) {
          authToken = response.token;
          console.log('Token found in response body as fallback');
        }
        
        if (authToken) {
          this._authToken.set(authToken);
          localStorage.setItem('authToken', authToken);
          console.log('Authorization token received and stored:', authToken);
        } else {
          console.warn('No Authorization header found in response');
          console.warn('Available headers:', httpResponse.headers.keys());
          
          // For debugging: try to access the header directly from browser network tab
          // This is a temporary fallback - in production, the backend should expose the header properly
          console.warn('If you can see the Authorization header in browser network tab but not here, it\'s a CORS issue');
          console.warn('Backend needs to expose Authorization header in CORS configuration');
        }

        this._currentUser.set(user);
        this._isLoggedIn.set(true);
        

        // Store in localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Provide more specific error handling
      if (error.status === 401) {
        console.error('Unauthorized: Invalid credentials');
      } else if (error.status === 404) {
        console.error('User not found');
      } else if (error.status === 500) {
        console.error('Server error');
      } else {
        console.error('Network or unknown error:', error.message);
      }
      
      return false;
    }
  }

  async register(userData: RegisterData): Promise<RegisterResponse | null> {
  
     try {
       const registrationRequest  : RegisterData  =  {
         customer_name: userData.customer_name,
         email: userData.email,
         mobile_number: userData.mobile_number,
         address: userData.address,
         countryCode: userData.countryCode,
         password: userData.password ,
         confirmPassword: userData.confirmPassword
       };


       const headers =  new HttpHeaders({
         'Content-Type': 'application/json'
       });

       const httpResponse =  await firstValueFrom(
        this.http.post<RegisterResponse>(`${this.API_URL}/auth/register`, registrationRequest, { 
          headers,
          observe: 'response'
        })
      );

      if (httpResponse.status === 200 && httpResponse.body) {
        console.log('User registered successfully:', httpResponse.body);
        return httpResponse.body;
      } else {
        console.error('Registration failed:', httpResponse);
        return null;
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return null;
    }
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this._currentUser.set(null);
    this._authToken.set(null);
    
    // Clear stored auth data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
  }

  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const authToken = localStorage.getItem('authToken');
    
    if (storedUser && isLoggedIn === 'true' && authToken) {
      try {
        const user = JSON.parse(storedUser);
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
        this._authToken.set(authToken);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken');
      }
    }
  }

  getUserDisplayName(): string {
    const user = this._currentUser();
    return user ? user.customerName : '';
  }

  // Check if user has a valid authentication token
  hasValidToken(): boolean {
    return !!this._authToken();
  }

  // Get current user info
  getCurrentUser(): User | null {
    return this._currentUser();
  }

  // Check if current user is admin
  isAdmin(): boolean {
    const user = this._currentUser();
    return user?.role?.toLowerCase() === 'admin';
  }

  // Get current auth token
  getToken(): string | null {
    return this._authToken();
  }

  // Method to get Authorization header for API calls
  getAuthHeader(): HttpHeaders {
    const token = this._authToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': token,
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Method to make authenticated API calls
  async makeAuthenticatedRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any): Promise<T | null> {
    try {
      const headers = this.getAuthHeader();
      let request;

      switch (method) {
        case 'GET':
          request = this.http.get<T>(url, { headers });
          break;
        case 'POST':
          request = this.http.post<T>(url, body, { headers });
          break;
        case 'PUT':
          request = this.http.put<T>(url, body, { headers });
          break;
        case 'DELETE':
          request = this.http.delete<T>(url, { headers });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return await firstValueFrom(request);
    } catch (error) {
      console.error(`${method} request failed:`, error);
      
      // If token expired or unauthorized, logout user
      if (error instanceof Error && error.message.includes('401')) {
        this.logout();
      }
      
      return null;
    }
  }
}
