import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Car } from 'lucide-react';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              MY<span className="text-primary">_PARKING</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Explore
            </Link>
            <Link to="/host" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Become a Host
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/driver/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-border"
                  />
                  {user?.name?.split(' ')[0]}
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border-light bg-surface animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/explore"
              className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
              onClick={() => setMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/host"
              className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
              onClick={() => setMenuOpen(false)}
            >
              Become a Host
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/driver/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-error py-2 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    navigate('/login');
                    setMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  fullWidth
                  onClick={() => {
                    navigate('/register');
                    setMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

