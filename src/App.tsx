import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';

// Public Pages
import Home from './pages/public/Home';
import Explore from './pages/public/Explore';
import ParkingDetails from './pages/public/ParkingDetails';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import BecomeHost from './pages/public/BecomeHost';

// Driver Pages
import DriverLayout from './components/layout/DriverLayout';
import DriverDashboard from './pages/driver/Dashboard';
import DriverSearch from './pages/driver/Search';
import DriverMap from './pages/driver/Map';
import DriverBookings from './pages/driver/Bookings';
import BookingDetails from './pages/driver/BookingDetails';
import DriverFavorites from './pages/driver/Favorites';
import DriverVehicles from './pages/driver/Vehicles';
import DriverProfile from './pages/driver/Profile';
import DriverSettings from './pages/driver/Settings';
import DriverNotifications from './pages/driver/Notifications';
import DriverReviews from './pages/driver/Reviews';

// Host Pages
import HostLayout from './components/layout/HostLayout';
import HostDashboard from './pages/host/Dashboard';
import HostParking from './pages/host/Parking';
import HostParkingCreate from './pages/host/ParkingCreate';
import HostParkingEdit from './pages/host/ParkingEdit';
import HostBookings from './pages/host/Bookings';
import HostBookingDetails from './pages/host/BookingDetails';
import HostSessions from './pages/host/Sessions';
import HostMap from './pages/host/Map';
import HostEarnings from './pages/host/Earnings';
import HostReviews from './pages/host/Reviews';
import HostProfile from './pages/host/Profile';
import HostSettings from './pages/host/Settings';

// Checkout Pages
import BookingCheckout from './pages/checkout/BookingCheckout';
import BookingPayment from './pages/checkout/BookingPayment';
import BookingConfirmation from './pages/checkout/BookingConfirmation';
import BookingDirections from './pages/checkout/BookingDirections';
import BookingArrival from './pages/checkout/BookingArrival';
import BookingActive from './pages/checkout/BookingActive';
import BookingCompletion from './pages/checkout/BookingCompletion';

function App() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const user = useAppStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/parking/:id" element={<ParkingDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/host" element={<BecomeHost />} />

        {/* Driver Routes */}
        {isAuthenticated && user?.role !== 'host' && (
          <Route element={<DriverLayout />}>
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/driver/search" element={<DriverSearch />} />
            <Route path="/driver/map" element={<DriverMap />} />
            <Route path="/driver/bookings" element={<DriverBookings />} />
            <Route path="/driver/bookings/:id" element={<BookingDetails />} />
            <Route path="/driver/favorites" element={<DriverFavorites />} />
            <Route path="/driver/vehicles" element={<DriverVehicles />} />
            <Route path="/driver/profile" element={<DriverProfile />} />
            <Route path="/driver/settings" element={<DriverSettings />} />
            <Route path="/driver/notifications" element={<DriverNotifications />} />
            <Route path="/driver/reviews" element={<DriverReviews />} />
          </Route>
        )}

        {/* Checkout Routes */}
        {isAuthenticated && user?.role !== 'host' && (
          <>
            <Route path="/checkout/parking/:id/step1" element={<BookingCheckout />} />
            <Route path="/checkout/parking/:id/step2" element={<BookingPayment />} />
            <Route path="/checkout/booking/:id/confirmation" element={<BookingConfirmation />} />
            <Route path="/checkout/booking/:id/directions" element={<BookingDirections />} />
            <Route path="/checkout/booking/:id/arrival" element={<BookingArrival />} />
            <Route path="/checkout/booking/:id/active" element={<BookingActive />} />
            <Route path="/checkout/booking/:id/completion" element={<BookingCompletion />} />
          </>
        )}

        {/* Host Routes */}
        {isAuthenticated && user?.role !== 'driver' && (
          <Route element={<HostLayout />}>
            <Route path="/host/dashboard" element={<HostDashboard />} />
            <Route path="/host/parking" element={<HostParking />} />
            <Route path="/host/parking/create" element={<HostParkingCreate />} />
            <Route path="/host/parking/:id/edit" element={<HostParkingEdit />} />
            <Route path="/host/bookings" element={<HostBookings />} />
            <Route path="/host/bookings/:id" element={<HostBookingDetails />} />
            <Route path="/host/sessions" element={<HostSessions />} />
            <Route path="/host/map" element={<HostMap />} />
            <Route path="/host/earnings" element={<HostEarnings />} />
            <Route path="/host/reviews" element={<HostReviews />} />
            <Route path="/host/profile" element={<HostProfile />} />
            <Route path="/host/settings" element={<HostSettings />} />
          </Route>
        )}

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
