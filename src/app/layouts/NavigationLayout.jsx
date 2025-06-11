import Logo from '../assets/imgs/LOGO_NS_SINFONDO.png';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, Search, User, ChevronDown, LogOut } from 'lucide-react';
import { useNavigationHook } from '../hooks/useNavigationHook';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

export const NavigationLayout = ({ children, title = '' }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { sidebarItems } = useNavigationHook(location.pathname);

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const sidebarVariants = {
    open: { 
      width: isMobile ? '85vw' : 280,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      width: isMobile ? '85vw' : 80,
      x: isMobile ? '-85vw' : 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const overlayVariants = {
    open: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/DashboardBackground.webp')`
          }}
        />
        
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-gradient-to-r from-yellow-300/10 to-cyan-400/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <motion.div 
          className={`sidebar bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-2xl relative overflow-hidden ${
            isMobile ? 'fixed left-0 top-0 h-full z-50' : ''
          }`}
          variants={sidebarVariants}
          animate={sidebarOpen ? "open" : "closed"}
        >
          {/* Mobile Close Button */}
          {isMobile && (
            <div className="absolute top-3 right-3 z-10">
              <motion.button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 text-gray-600" />
              </motion.button>
            </div>
          )}

          {/* Sidebar Header */}
          <div className={`${isMobile ? 'p-4 pt-6' : 'p-6'} border-b border-gray-100/50`}>
            <div className="flex items-center space-x-3">
              <motion.div 
                className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl flex items-center justify-center p-1`}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <img 
                  src={Logo} 
                  alt='logo ns' 
                  className={`${isMobile ? 'w-8 h-7' : 'w-10 h-9'} object-contain`} 
                />
              </motion.div>
              <AnimatePresence>
                {(sidebarOpen && !isMobile) || (sidebarOpen && isMobile) ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0 flex-1"
                  >
                    <h2 className={`font-bold text-gray-900 ${isMobile ? 'text-base' : 'text-lg'} truncate`}>
                      New Stetic
                    </h2>
                    <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'} truncate`}>
                      Sistema SST
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className={`${isMobile ? 'p-3' : 'p-4'} space-y-1 flex-1 overflow-y-auto`}>
            {sidebarItems.map((item, key) => {
              const Icon = item.icon;
              
              return (
                <Link 
                  to={item.path} 
                  key={key} 
                  className={`w-full flex items-center space-x-3 ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'} rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    item.isActive 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-[0.98]' 
                      : 'text-gray-600 hover:bg-gray-100/60 hover:text-gray-900 hover:scale-[0.98]'
                  }`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  {item.isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-xl"
                      layoutId="activeBackground"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} relative z-10 flex-shrink-0 ${item.isActive ? 'text-white' : ''}`} />
                  <AnimatePresence>
                    {((sidebarOpen && !isMobile) || (sidebarOpen && isMobile)) && (
                      <motion.span
                        className={`font-medium relative z-10 text-left min-w-0 flex-1 ${isMobile ? 'text-sm' : 'text-base'}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="truncate block">{item.label}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer - Solo en desktop */}
          {!isMobile && (
            <div className="p-4 border-t border-gray-100/50">
              <div className="flex items-center justify-center">
                <AnimatePresence>
                  {sidebarOpen ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-gray-400 text-center"
                    >
                      v1.0.0
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          <motion.header
            className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg px-3 sm:px-4 md:px-6 py-3 sm:py-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                <motion.button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="sidebar-toggle p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors duration-200 flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </motion.button>
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 truncate">
                    {title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block truncate">
                    New Stetic - Sistema SST
                  </p>
                </div>
              </div>

              {/* Center - Search (Hidden on mobile) */}
              <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar empleados, reportes..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
                {/* Mobile Search */}
                <motion.button
                  className="lg:hidden p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </motion.button>

                {/* Notifications */}
                <motion.button
                  className="p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors duration-200 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                </motion.button>

                {/* User Menu */}
                <div className="relative user-menu">
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-44 sm:w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-2 z-50"
                      >
                        <div className="px-3 sm:px-4 py-2 border-b border-gray-100/50">
                          <p className="font-medium text-gray-900 text-sm truncate">Admin User</p>
                          <p className="text-xs text-gray-500 truncate">admin@newstetic.com</p>
                        </div>
                        <div className="py-1">
                          <hr className="my-1 border-gray-100/50" />
                          <button 
                            className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 flex items-center space-x-2"
                            onClick={logout}
                          >
                            <LogOut className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">Cerrar Sesión</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};