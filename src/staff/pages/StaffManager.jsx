import { motion } from 'framer-motion';
import { UserPlus, Stethoscope } from 'lucide-react';
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { Link } from 'react-router-dom';

const modules = [
  {
    title: 'Ingreso de Personal',
    description:'Coordina exámenes de ingreso, registra resultados médicos y crea historias ocupacionales para nuevos colaboradores.',
    icon: <UserPlus className="w-7 h-7 text-white" />,
    gradient: 'from-cyan-200 via-blue-500 to-cyan-600',
    to : '/ingreso-personal'
  },
  {
    title: 'Seguimiento y Exámenes Médicos',
    description: 'Agenda exámenes médicos periódicos, da seguimiento a condiciones de salud reportadas y consulta el historial clínico vinculado al ciclo laboral del colaborador.',
    icon: <Stethoscope className="w-7 h-7 text-white" />,
    gradient: 'from-green-200 via-green-500 to-green-600',
    to : '/seguimiento-examenes-medicos'
  },
];

export const StaffManager = () => {

  return (
    <NavigationLayout title="Gestión De Personal">
      <div className="space-y-14 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="text-center"
        >
          <h2 className="text-4xl font-bold text-black tracking-tight">
            Gestión De Personal
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
            Administra de forma centralizada todos los procesos médicos del personal: ingreso, controles periódicos y registros históricos.
          </p>
        </motion.div>

        {/* Modules */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
          {modules.map((mod, i) => {
            return (
              <Link to={mod.to} className="group relative p-6 bg-white/90 border border-gray-200 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" key={i}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}>
                {/* Glow ring */}
                <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-25 bg-gradient-to-br ${mod.gradient}`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${mod.gradient} shadow-lg transition-transform group-hover:rotate-6`}>
                  {mod.icon}
                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-bold text-gray-900">{mod.title}</h3>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {mod.description}
                </p>

                {/* Decorative Bottom Glow */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r ${mod.gradient} opacity-70`} />
              </motion.div>
              
              </Link>
            );
          })}
        </div>
      </div>
    </NavigationLayout>
  );
};
