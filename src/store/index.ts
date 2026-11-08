import { create } from 'zustand';
import { User, Vehicle, Booking, ParkingSpace, Notification, SearchFilters, HostSession } from '../types';
import { demoUser, demoVehicles, demoBookings, demoParkingSpaces, demoNotifications, demoHostSessions } from '../data/demo';

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  isDemo: boolean;
  login: (user?: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;

  // Vehicles
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  setDefaultVehicle: (id: string) => void;

  // Parking
  parkingSpaces: ParkingSpace[];
  favorites: string[];
  toggleFavorite: (parkingId: string) => void;
  addParkingSpace: (parking: ParkingSpace) => void;
  updateParkingSpace: (id: string, updates: Partial<ParkingSpace>) => void;
  deleteParkingSpace: (id: string) => void;

  // Bookings
  bookings: Booking[];
  activeBooking: Booking | null;
  createBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  setActiveBooking: (booking: Booking | null) => void;

  // Host Sessions
  hostSessions: HostSession[];
  verifyArrival: (sessionId: string) => void;
  completeSession: (sessionId: string) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Search
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  city: 'Mumbai',
  type: 'all',
  priceRange: [0, 200],
  rating: 0,
  evCharging: false,
  security: false,
  sortBy: 'distance',
  viewMode: 'grid',
};

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  isAuthenticated: false,
  user: null,
  isDemo: false,
  login: (user?: User) => {
    set({
      isAuthenticated: true,
      user: user || demoUser,
      isDemo: !user,
      vehicles: demoVehicles,
      bookings: demoBookings,
      notifications: demoNotifications,
      hostSessions: demoHostSessions,
      favorites: ['p1', 'p4', 'p8'],
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      isDemo: false,
      vehicles: [],
      bookings: [],
      notifications: [],
      hostSessions: [],
      favorites: [],
      activeBooking: null,
    });
  },
  updateProfile: (updates) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
    }
  },

  // Vehicles
  vehicles: [],
  addVehicle: (vehicle) => set((state) => ({ vehicles: [...state.vehicles, vehicle] })),
  updateVehicle: (id, updates) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    })),
  deleteVehicle: (id) => set((state) => ({ vehicles: state.vehicles.filter((v) => v.id !== id) })),
  setDefaultVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) => ({ ...v, isDefault: v.id === id })),
    })),

  // Parking
  parkingSpaces: demoParkingSpaces,
  favorites: [],
  toggleFavorite: (parkingId) =>
    set((state) => ({
      favorites: state.favorites.includes(parkingId)
        ? state.favorites.filter((id) => id !== parkingId)
        : [...state.favorites, parkingId],
    })),
  addParkingSpace: (parking) => set((state) => ({ parkingSpaces: [...state.parkingSpaces, parking] })),
  updateParkingSpace: (id, updates) =>
    set((state) => ({
      parkingSpaces: state.parkingSpaces.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deleteParkingSpace: (id) =>
    set((state) => ({ parkingSpaces: state.parkingSpaces.filter((p) => p.id !== id) })),

  // Bookings
  bookings: [],
  activeBooking: null,
  createBooking: (booking) =>
    set((state) => ({ bookings: [booking, ...state.bookings] })),
  updateBooking: (id, updates) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    })),
  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status: 'cancelled' as const, paymentStatus: 'refunded' as const } : b
      ),
    })),
  setActiveBooking: (booking) => set({ activeBooking: booking }),

  // Host Sessions
  hostSessions: [],
  verifyArrival: (sessionId) =>
    set((state) => ({
      hostSessions: state.hostSessions.map((s) =>
        s.id === sessionId ? { ...s, isVerified: true, status: 'active' as const } : s
      ),
    })),
  completeSession: (sessionId) =>
    set((state) => ({
      hostSessions: state.hostSessions.map((s) =>
        s.id === sessionId ? { ...s, status: 'completed' as const } : s
      ),
    })),

  // Notifications
  notifications: [],
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  // Search
  searchFilters: defaultFilters,
  setSearchFilters: (filters) =>
    set((state) => ({ searchFilters: { ...state.searchFilters, ...filters } })),
  resetSearchFilters: () => set({ searchFilters: defaultFilters }),

  // UI
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
