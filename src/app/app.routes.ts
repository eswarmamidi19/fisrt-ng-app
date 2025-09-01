import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'registration-success',
    loadComponent: () => import('./pages/register/registration-acknowledgment.component').then(m => m.RegistrationAcknowledgmentComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'previous-bookings',
    loadComponent: () => import('./pages/previous-bookings/previous-bookings.component').then(m => m.PreviousBookingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'tracking',
    loadComponent: () => import('./pages/tracking/tracking.component').then(m => m.TrackingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'admin/update-booking-status',
    loadComponent: () => import('./pages/admin/update-booking-status/update-booking-status.component').then(m => m.UpdateBookingStatusComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/update-pickup-dates',
    loadComponent: () => import('./pages/admin/update-pickup-dates/update-pickup-dates.component').then(m => m.UpdatePickupDatesComponent),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
