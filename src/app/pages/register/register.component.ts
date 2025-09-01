import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Join BookingApp today
          </p>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" (ngSubmit)="onRegister()" #registerForm="ngForm">
            <!-- Customer Name -->
            <div>
              <label for="customer_name" class="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <div class="mt-1">
                <input
                  id="customer_name"
                  name="customer_name"
                  type="text"
                  [(ngModel)]="registerData.customer_name"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  [(ngModel)]="registerData.email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <!-- Mobile Number with Country Code -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div class="mt-1 flex">
                <select
                  name="countryCode"
                  [(ngModel)]="registerData.countryCode"
                  class="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+101">+101</option>
                </select>
                <input
                  id="mobile_number"
                  name="mobile_number"
                  type="tel"
                  [(ngModel)]="registerData.mobile_number"
                  required
                  class="flex-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            <!-- Address -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div class="mt-1">
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  [(ngModel)]="registerData.address"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                  placeholder="Enter your complete address"
                ></textarea>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  [(ngModel)]="registerData.password"
                  required
                  class="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  (click)="togglePasswordVisibility()"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    @if (showPassword()) {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    } @else {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    }
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div class="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  [type]="showConfirmPassword() ? 'text' : 'password'"
                  [(ngModel)]="registerData.confirmPassword"
                  required
                  class="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  (click)="toggleConfirmPasswordVisibility()"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    @if (showConfirmPassword()) {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    } @else {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    }
                  </svg>
                </button>
              </div>
            </div>

            <!-- Customer Preferences -->
            <div>
              <fieldset>
                <legend class="text-sm font-medium text-gray-700">Customer Preferences</legend>
                <div class="mt-2 space-y-2">
                  <div class="flex items-center">
                    <input
                      id="notifications"
                      name="notifications"
                      type="checkbox"
                      [(ngModel)]="registerData.customerPreferences.notifications"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="notifications" class="ml-2 block text-sm text-gray-900">
                      Email notifications
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="promotions"
                      name="promotions"
                      type="checkbox"
                      [(ngModel)]="registerData.customerPreferences.promotions"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="promotions" class="ml-2 block text-sm text-gray-900">
                      Promotional offers
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      [(ngModel)]="registerData.customerPreferences.newsletter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="newsletter" class="ml-2 block text-sm text-gray-900">
                      Newsletter subscription
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="smsAlerts"
                      name="smsAlerts"
                      type="checkbox"
                      [(ngModel)]="registerData.customerPreferences.smsAlerts"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="smsAlerts" class="ml-2 block text-sm text-gray-900">
                      SMS alerts
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                [(ngModel)]="registerData.agreeTerms"
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="agreeTerms" class="ml-2 block text-sm text-gray-900">
                I agree to the 
                <a href="#" class="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
                and 
                <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
              </label>
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

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                [disabled]="isLoading()"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                @if (isLoading()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                } @else {
                  Create Account
                }
              </button>
            </div>
          </form>

          <!-- Login Link -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div class="mt-6">
              <button
                type="button"
                (click)="goToLogin()"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Sign in instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  // Form data
  registerData = {
    customer_name: '',
    email: '',
    countryCode: '+91',
    mobile_number: '',
    address: '',
    password: '',
    confirmPassword: '',
    customerPreferences: {
      notifications: true,
      promotions: false,
      newsletter: false,
      smsAlerts: true
    },
    agreeTerms: false
  };

  // Component state
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  showError = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  async onRegister() {
    this.showError.set(true);
    this.errorMessage.set('');

    // Validate form
    if (!this.registerData.customer_name || !this.registerData.email || 
        !this.registerData.mobile_number || !this.registerData.address ||
        !this.registerData.password || !this.registerData.confirmPassword) {
      this.errorMessage.set('Please fill in all required fields');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    if (!this.registerData.agreeTerms) {
      this.errorMessage.set('Please agree to the terms and conditions');
      return;
    }

    this.isLoading.set(true);

    try {
      const registrationResponse = await this.authService.register(this.registerData);
      
      if (registrationResponse) {
        // Navigate to acknowledgment page with user data
        this.router.navigate(['/registration-success'], {
          queryParams: {
            userId: registrationResponse.userId.toString(),
            userInfo: encodeURIComponent(JSON.stringify({
              customerName: registrationResponse.customerName,
              customerEmail: registrationResponse.customerEmail,
              customerMobileNumber: registrationResponse.customerMobileNumber,
              countryCode: registrationResponse.countryCode
            }))
          }
        });
      } else {
        this.errorMessage.set('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.errorMessage.set('Registration failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
