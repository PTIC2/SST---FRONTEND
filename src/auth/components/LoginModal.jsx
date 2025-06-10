import { Modal, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Lock, User, Building, Eye, EyeOff, X, Shield } from 'lucide-react';
import { useState } from 'react';

export const LoginModal = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm({
    defaultValues: {
      userType: '',
      username: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Login: ${data.username} como ${data.userType}`);
    reset();
    onClose();
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      x: 100,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.6,
        bounce: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: 100,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal 
          open={open} 
          onClose={onClose}
          closeAfterTransition
          sx={{
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)'
            }
          }}
        >
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ width: '100%', height: '100%' }}
          >
            <Box sx={{ 
              position: 'absolute',
              top: '5%',
              right: '5%',
              width: { xs: '90%', sm: '45%', md: '40%', lg: '35%' },
              maxWidth: '500px',
              bgcolor: 'transparent',
              outline: 'none'
            }}>
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                {/* Background with glassmorphism effect */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30" />
                
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <motion.div
                    className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300/20 to-yellow-400/20 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 blur-xl"
                    animate={{
                      scale: [1, 0.8, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Shield className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
                        <p className="text-sm text-gray-600">Accede a tu cuenta SST</p>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={onClose}
                      className="p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Username Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Usuario
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          {...register('username', { 
                            required: 'El usuario es requerido',
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                          })}
                          placeholder="Ingresa tu usuario"
                          className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 text-gray-700 font-medium shadow-sm placeholder-gray-400"
                        />
                      </div>
                      {errors.username && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-2 ml-1"
                        >
                          {errors.username.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register('password', { 
                            required: 'La contraseña es requerida',
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                          })}
                          placeholder="Ingresa tu contraseña"
                          className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 text-gray-700 font-medium shadow-sm placeholder-gray-400"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </motion.button>
                      </div>
                      {errors.password && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-2 ml-1"
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-4"
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-yellow-400 to-cyan-500 hover:from-yellow-500 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>Iniciando sesión...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            <span>Iniciar Sesión</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>

                  </form>
                </div>
              </motion.div>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};