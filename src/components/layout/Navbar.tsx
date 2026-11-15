import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { variants, easing, durations } from '@/motion/tokens';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { isAuthenticated, user, logout } = useAppStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const navLinkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: durations.base,
        ease: easing,
      },
    }),
  };

  const mobileMenuVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -10 },
  };

  const mobileItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-border-light shadow-sm'
          : 'bg-transparent border-b border-border-light/0'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: durations.base, ease: easing }}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Car className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                MY<span className="text-primary">_PARKING</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <motion.div
              custom={0}
              variants={navLinkVariants}
              initial="initial"
              animate="animate"
            >
              <Link
                to="/explore"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group"
              >
                Explore
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: durations.fast, ease: easing }}
                />
              </Link>
            </motion.div>

            <motion.div
              custom={1}
              variants={navLinkVariants}
              initial="initial"
              animate="animate"
            >
              <Link
                to="/host"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group"
              >
                Become a Host
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: durations.fast, ease: easing }}
                />
              </Link>
            </motion.div>

            {isAuthenticated ? (
              <motion.div
                custom={2}
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                className="flex items-center gap-3"
              >
                <Link
                  to="/driver/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  <motion.img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-border"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  {user?.name?.split(' ')[0]}
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                custom={2}
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                className="flex items-center gap-2"
              >
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden border-t border-border-light bg-surface"
          variants={mobileMenuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="px-4 py-4 space-y-3">
            <motion.div variants={mobileItemVariants}>
              <Link
                to="/explore"
                className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
                onClick={() => setMenuOpen(false)}
              >
                Explore
              </Link>
            </motion.div>

            <motion.div variants={mobileItemVariants}>
              <Link
                to="/host"
                className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
                onClick={() => setMenuOpen(false)}
              >
                Become a Host
              </Link>
            </motion.div>

            {isAuthenticated ? (
              <>
                <motion.div variants={mobileItemVariants}>
                  <Link
                    to="/driver/dashboard"
                    className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                </motion.div>
                <motion.button
                  variants={mobileItemVariants}
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-error py-2 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.div
                variants={mobileItemVariants}
                className="flex gap-2 pt-2"
              >
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
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

