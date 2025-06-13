import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { UserPlus, Stethoscope, Sparkles } from 'lucide-react';

const modules = [
  {
    title: 'Ingreso de Personal',
    description: 'Coordina exámenes de ingreso, registra resultados médicos y crea historias ocupacionales para nuevos colaboradores.',
    icon: <UserPlus className="w-8 h-8" />,
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    shadowColor: 'shadow-cyan-500/20',
  },
  {
    title: 'Seguimiento y Exámenes Médicos',
    description: 'Agenda exámenes médicos periódicos, da seguimiento a condiciones de salud reportadas y consulta el historial clínico vinculado al ciclo laboral del colaborador.',
    icon: <Stethoscope className="w-8 h-8" />,
    gradient: 'from-emerald-400 via-green-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-green-50',
    shadowColor: 'shadow-emerald-500/20',
    to: '/seguimiento-examenes-medicos',
  },
];

export const StaffManager = () => {
  const [hoveredModule, setHoveredModule] = useState(null);

  return (
    <NavigationLayout title="Gestión De Personal">
        <div className="space-y-16 pb-20">
          {/* Enhanced Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-full text-sm text-blue-700 font-medium">
              <Sparkles className="w-4 h-4" />
              Sistema de Gestión de Personal
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800">
              Gestión De Personal
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Administra de forma centralizada todos los procesos médicos del personal: ingreso, controles periódicos y registros históricos.
            </p>
          </div>

          {/* Enhanced Modules Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
            {modules.map((module, index) => (
              <Link
                key={index}
                to={module.to}
                className="group relative"
                onMouseEnter={() => setHoveredModule(index)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <div className={`
                  relative p-8 bg-gradient-to-br ${module.bgGradient} 
                  border border-white/50 backdrop-blur-xl rounded-3xl 
                  shadow-xl ${module.shadowColor} hover:shadow-2xl 
                  transition-all duration-500 hover:-translate-y-2 
                  overflow-hidden cursor-pointer
                  ${hoveredModule === index ? 'scale-[1.02]' : ''}
                `}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${module.gradient} opacity-10 blur-2xl transition-all duration-500 ${hoveredModule === index ? 'scale-150' : ''}`} />
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`
                      w-20 h-20 rounded-2xl flex items-center justify-center
                      bg-gradient-to-br ${module.gradient} shadow-xl
                      transition-all duration-500 group-hover:rotate-12 group-hover:scale-110
                      text-white
                    `}>
                      {module.icon}
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`
                      absolute inset-0 w-20 h-20 rounded-2xl
                      bg-gradient-to-br ${module.gradient} opacity-30 blur-xl
                      transition-all duration-500 group-hover:opacity-50 group-hover:blur-2xl
                    `} />
                  </div>

                  {/* Content */}
                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                        {module.title}
                      </h3>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      {module.description}
                    </p>
                    
                  </div>

                  {/* Bottom accent line */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl
                    bg-gradient-to-r ${module.gradient} 
                    transition-all duration-500
                    ${hoveredModule === index ? 'h-2' : ''}
                  `} />

                  {/* Hover overlay */}
                  <div className={`
                    absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 rounded-3xl
                  `} />
                </div>
              </Link>
            ))}
          </div>

        </div>
    </NavigationLayout>
  );
}