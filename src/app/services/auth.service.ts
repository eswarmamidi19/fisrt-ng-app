import { Injectable, signal } from '@angular/core';

export interface User {
  customer_name: string;
  email: string;
  mobile_number: string;
  address: string;
  countryCode: string;
  customerPreferences: {
    notifications: boolean;
    promotions: boolean;
    newsletter: boolean;
    smsAlerts: boolean;
  };
}

export interface RegisterData {
  customer_name: string;
  email: string;
  countryCode: string;
  mobile_number: string;
  address: string;
  password: string;
  confirmPassword: string;
  customerPreferences: {
    notifications: boolean;
    promotions: boolean;
    newsletter: boolean;
    smsAlerts: boolean;
  };
  agreeTerms: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = signal(false);
  private _currentUser = signal<User | null>(null);

  // Public readonly signals
  isLoggedIn = this._isLoggedIn.asReadonly();
  currentUser = this._currentUser.asReadonly();

  constructor() {
    // Check if user was previously logged in (e.g., from localStorage)
    this.checkStoredAuth();
  }

  login(userId: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, accept any non-empty credentials
        if (userId && password) {
          const user: User = {
            customer_name: 'John Doe', // This would come from API response
            email: 'john.doe@example.com',
            mobile_number: '9876543210',
            address: '123 Main Street, City, State',
            countryCode: '+91',
            customerPreferences: {
              notifications: true,
              promotions: false,
              newsletter: true,
              smsAlerts: true
            }
          };
          
          this._currentUser.set(user);
          this._isLoggedIn.set(true);
          
          // Store in localStorage for persistence
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');
          
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  register(userData: RegisterData): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, just simulate successful registration
        console.log('User registered:', userData);
        
        // Store user data in localStorage for demo purposes
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        users.push({
          customer_name: userData.customer_name,
          email: userData.email,
          mobile_number: userData.mobile_number,
          address: userData.address,
          countryCode: userData.countryCode,
          customerPreferences: userData.customerPreferences,
          password: userData.password // In real app, this would be hashed
        });
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        resolve(true);
      }, 1000);
    });
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this._currentUser.set(null);
    
    // Clear stored auth data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
  }

  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (storedUser && isLoggedIn === 'true') {
      try {
        const user = JSON.parse(storedUser);
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
      }
    }
  }

  getUserDisplayName(): string {
    const user = this._currentUser();
    return user ? user.customer_name : '';
  }
}
