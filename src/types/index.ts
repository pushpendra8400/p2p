export interface ParkingSpace {
  id: string;
  name: string;
  address: string;
  city: string;
  locality: string;
  latitude: number;
  longitude: number;
  images: string[];
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;
  totalSpaces: number;
  availableSpaces: number;
  type: 'covered' | 'open';
  amenities: string[];
  security: string[];
  description: string;
  hostId: string;
  hostName: string;
  hostImage: string;
  hostRating: number;
  hostSince: string;
  isActive: boolean;
  isFeatured: boolean;
  evCharging: boolean;
  distance?: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  parkingId: string;
  parkingName: string;
  parkingImage: string;
  parkingAddress: string;
  userId: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePlate: string;
  checkIn: string;
  checkOut: string;
  duration: number;
  amount: number;
  taxes: number;
  totalAmount: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  arrivalOtp?: string;
  rating?: number;
  review?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'bike' | 'suv' | 'truck';
  licensePlate: string;
  color: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  role: 'driver' | 'host' | 'both';
  memberSince: string;
  totalBookings: number;
  rating: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  parkingId: string;
  parkingName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'reminder' | 'promotion' | 'system';
  isRead: boolean;
  createdAt: string;
}

export interface EarningsSummary {
  totalEarnings: number;
  todayEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  pendingPayout: number;
  totalBookings: number;
}

export interface HostSession {
  id: string;
  bookingId: string;
  driverName: string;
  driverPhone: string;
  vehicleName: string;
  vehiclePlate: string;
  parkingName: string;
  checkIn: string;
  checkOut: string;
  status: 'waiting' | 'active' | 'completed';
  arrivalOtp: string;
  isVerified: boolean;
  amount: number;
}

export interface SearchFilters {
  query: string;
  city: string;
  type: 'all' | 'covered' | 'open';
  priceRange: [number, number];
  rating: number;
  evCharging: boolean;
  security: boolean;
  sortBy: 'distance' | 'price' | 'rating' | 'popularity';
  viewMode: 'grid' | 'list' | 'map';
}
