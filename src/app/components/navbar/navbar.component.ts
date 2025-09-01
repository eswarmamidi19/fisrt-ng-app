import { Component, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="bg-blue-600 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-white text-xl font-bold">BookingApp</h1>
            </div>
          </div>

          <!-- Navigation menu -->
          <div class="hidden md:flex items-center space-x-8">
            @if (!authService.isLoggedIn()) {
              <!-- Before login menu -->
              <button 
                (click)="showLogin()" 
                class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Login
              </button>
              <button 
                (click)="showRegister()" 
                class="bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Register
              </button>
            }

            @if (authService.isLoggedIn()) {
              <!-- After login menu -->
              <a routerLink="/booking" 
                 class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                New Booking
              </a>
              <a routerLink="/previous-bookings" 
                 class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Previous Bookings
              </a>
              <a routerLink="/tracking" 
                 class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Track Booking
              </a>
              <a routerLink="/contact" 
                 class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Contact Us
              </a>
              <a routerLink="/about" 
                 class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                About Us
              </a>
              
              <!-- Admin-only links -->
              @if (authService.isAdmin()) {
                <div class="relative group">
                  <button class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center">
                    Admin
                    <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div class="py-1">
                      <a routerLink="/admin/update-booking-status" 
                         class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Update Booking Status
                      </a>
                      <a routerLink="/admin/update-pickup-dates" 
                         class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Update Pickup Dates
                      </a>
                    </div>
                  </div>
                </div>
              }
              
              <!-- User profile -->
              <div class="flex items-center space-x-4">
                <span class="text-white text-sm">Welcome, {{ authService.getUserDisplayName() }}</span>
                <button 
                  (click)="logout()" 
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                  Logout
                </button>
              </div>
            }
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button 
              (click)="toggleMobileMenu()"
              class="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        @if (showMobileMenu()) {
          <div class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              @if (!authService.isLoggedIn()) {
                <button 
                  (click)="showLogin()" 
                  class="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                  Login
                </button>
                <button 
                  (click)="showRegister()" 
                  class="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                  Register
                </button>
              }

              @if (authService.isLoggedIn()) {
                <a routerLink="/booking" 
                   class="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                  New Booking
                </a>
                <a routerLink="/previous-bookings" 
                   class="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                  Previous Bookings
                </a>
                <a routerLink="/tracking" 
                   class="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                  Track Booking
                </a>
                <a routerLink="/contact" 
                   class="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                  Contact Us
                </a>
                <a routerLink="/about" 
                   class="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                  About Us
                </a>
                
                <!-- Admin-only links for mobile -->
                @if (authService.isAdmin()) {
                  <div class="border-t border-blue-500 pt-2 mt-2">
                    <div class="text-white px-3 py-2 text-sm font-medium">Admin Panel</div>
                    <a routerLink="/admin/update-booking-status" 
                       class="text-white hover:bg-blue-700 block px-6 py-2 rounded-md text-base font-medium">
                      Update Booking Status
                    </a>
                    <a routerLink="/admin/update-pickup-dates" 
                       class="text-white hover:bg-blue-700 block px-6 py-2 rounded-md text-base font-medium">
                      Update Pickup Dates
                    </a>
                  </div>
                }
                <div class="border-t border-blue-500 pt-4">
                  <span class="text-white block px-3 py-2 text-base font-medium">Welcome, {{ authService.getUserDisplayName() }}</span>
                  <button 
                    (click)="logout()" 
                    class="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                    Logout
                  </button>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </nav>
  `
})
export class NavbarComponent {
  showMobileMenu = signal(false);

  constructor(private router: Router, public authService: AuthService) {}

  // Methods for navigation and user actions
  showLogin() {
    this.router.navigate(['/login']);
  }

  showRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMobileMenu() {
    this.showMobileMenu.set(!this.showMobileMenu());
  }
}
