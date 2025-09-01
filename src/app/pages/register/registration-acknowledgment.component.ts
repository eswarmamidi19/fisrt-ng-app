import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-acknowledgment',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <!-- Success Icon -->
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            Welcome to BookingApp
          </p>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          <!-- User ID Display -->
          @if (userId()) {
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div class="text-center">
                <h3 class="text-lg font-medium text-blue-900 mb-2">
                  Your User ID
                </h3>
                <div class="bg-white border-2 border-blue-300 rounded-lg p-4 mb-4">
                  <span class="text-2xl font-bold text-blue-600 font-mono">
                    {{ userId() }}
                  </span>
                </div>
                <p class="text-sm text-blue-700">
                  Please save this User ID. You'll need it to log in to your account.
                </p>
              </div>
            </div>
          }

          <!-- User Information Summary -->
          @if (userInfo()) {
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h4 class="font-medium text-gray-900 mb-3">Account Details</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Name:</span>
                  <span class="font-medium text-gray-900">{{ userInfo()?.customerName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Email:</span>
                  <span class="font-medium text-gray-900">{{ userInfo()?.customerEmail }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Mobile:</span>
                  <span class="font-medium text-gray-900">{{ userInfo()?.countryCode }} {{ userInfo()?.customerMobileNumber }}</span>
                </div>
              </div>
            </div>
          }

          <!-- Important Notes -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-yellow-800">Important Notes</h4>
                <div class="mt-2 text-sm text-yellow-700">
                  <ul class="list-disc pl-5 space-y-1">
                    <li>Save your User ID in a secure place</li>
                    <li>Use your User ID and password to log in</li>
                    <li>Your account is now ready for parcel bookings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Copy User ID Button -->
          @if (userId()) {
            <div class="mb-6">
              <button
                (click)="copyUserId()"
                class="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Copy User ID
              </button>
            </div>
          }

          <!-- Success Message -->
          @if (copySuccess()) {
            <div class="mb-4 bg-green-50 border border-green-200 rounded-md p-3">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-800">
                    User ID copied to clipboard!
                  </p>
                </div>
              </div>
            </div>
          }

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              (click)="proceedToLogin()"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Proceed to Login
            </button>
            
            <button
              (click)="goToHome()"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegistrationAcknowledgmentComponent implements OnInit {
  userId = signal<string | null>(null);
  userInfo = signal<any>(null);
  copySuccess = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get data from route parameters or state
    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.userId.set(params['userId']);
      }
      
      if (params['userInfo']) {
        try {
          const userInfo = JSON.parse(decodeURIComponent(params['userInfo']));
          this.userInfo.set(userInfo);
        } catch (error) {
          console.error('Error parsing user info:', error);
        }
      }
    });

    // Also check for navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state;
      if (state['userId']) {
        this.userId.set(state['userId']);
      }
      if (state['userInfo']) {
        this.userInfo.set(state['userInfo']);
      }
    }
  }

  async copyUserId() {
    if (this.userId()) {
      try {
        await navigator.clipboard.writeText(this.userId()!);
        this.copySuccess.set(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.copySuccess.set(false);
        }, 3000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        // Fallback for older browsers
        this.fallbackCopyToClipboard(this.userId()!);
      }
    }
  }

  private fallbackCopyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.copySuccess.set(true);
      setTimeout(() => {
        this.copySuccess.set(false);
      }, 3000);
    } catch (error) {
      console.error('Fallback copy failed:', error);
    }
    
    document.body.removeChild(textArea);
  }

  proceedToLogin() {
    this.router.navigate(['/login'], {
      queryParams: { 
        userId: this.userId() 
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
