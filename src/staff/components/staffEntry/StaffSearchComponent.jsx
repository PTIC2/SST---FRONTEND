import { useState } from 'react';
import { Search, User, MapPin, Calendar, Phone, Mail, Filter, UserPlus, Eye, Sparkles, Clock, Building } from 'lucide-react';

// Datos de ejemplo
const samplePersonnel = [
  {
    id: 1,
    name: 'Ana María González',
    position: 'Ingeniera de Sistemas',
    department: 'Tecnología',
    email: 'ana.gonzalez@empresa.com',
    phone: '+57 300 123 4567',
    joinDate: '2024-03-15',
    status: 'Activo',
    avatar: 'AG',
    location: 'Medellín',
    employeeId: 'EMP001'
  },
  {
    id: 2,
    name: 'Carlos Eduardo Ruiz',
    position: 'Gerente de Ventas',
    department: 'Comercial',
    email: 'carlos.ruiz@empresa.com',
    phone: '+57 301 234 5678',
    joinDate: '2023-11-20',
    status: 'Activo',
    avatar: 'CR',
    location: 'Bogotá',
    employeeId: 'EMP002'
  },
  {
    id: 3,
    name: 'María Isabel Torres',
    position: 'Analista Financiera',
    department: 'Finanzas',
    email: 'maria.torres@empresa.com',
    phone: '+57 302 345 6789',
    joinDate: '2024-01-10',
    status: 'Activo',
    avatar: 'MT',
    location: 'Cali',
    employeeId: 'EMP003'
  },
  {
    id: 4,
    name: 'Juan Pablo Herrera',
    position: 'Coordinador RRHH',
    department: 'Recursos Humanos',
    email: 'juan.herrera@empresa.com',
    phone: '+57 303 456 7890',
    joinDate: '2023-08-05',
    status: 'Activo',
    avatar: 'JH',
    location: 'Medellín',
    employeeId: 'EMP004'
  },
  {
    id: 5,
    name: 'Sofía Alejandra Vega',
    position: 'Diseñadora UX/UI',
    department: 'Diseño',
    email: 'sofia.vega@empresa.com',
    phone: '+57 304 567 8901',
    joinDate: '2024-02-28',
    status: 'Activo',
    avatar: 'SV',
    location: 'Medellín',
    employeeId: 'EMP005'
  }
];

const departments = ['Todos', 'Tecnología', 'Comercial', 'Finanzas', 'Recursos Humanos', 'Diseño'];

export const StaffSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [filteredPersonnel, setFilteredPersonnel] = useState(samplePersonnel);

  // Filtrar personal basado en búsqueda y departamento
  const handleSearch = (term, dept) => {
    let filtered = samplePersonnel;

    if (term) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(term.toLowerCase()) ||
        person.position.toLowerCase().includes(term.toLowerCase()) ||
        person.employeeId.toLowerCase().includes(term.toLowerCase()) ||
        person.email.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (dept !== 'Todos') {
      filtered = filtered.filter(person => person.department === dept);
    }

    setFilteredPersonnel(filtered);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term, selectedDepartment);
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    handleSearch(searchTerm, dept);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Inactivo':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-full text-sm text-blue-700 font-medium mb-4">
            <UserPlus className="w-4 h-4" />
            Módulo de Ingreso de Personal
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 mb-3">
            Buscador de Personal
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl">
            Encuentra y consulta información de colaboradores registrados en el sistema.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, cargo, ID o email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-slate-700"
              />
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-500" />
              <select
                value={selectedDepartment}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-slate-700"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                {filteredPersonnel.length} resultado{filteredPersonnel.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPersonnel.map((person, index) => (
            <div
              key={person.id}
              className="group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Background Decoration */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-600/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {person.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-slate-900 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {person.employeeId}
                    </p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(person.status)}`}>
                  {person.status}
                </span>
              </div>

              {/* Position & Department */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 font-medium">{person.position}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{person.department}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 truncate">{person.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500">{person.phone}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500">{person.location}</span>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500">
                    Ingreso: {new Date(person.joinDate).toLocaleDateString('es-ES')}
                  </span>
                </div>
                
                {/* Action Button */}
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  <Eye className="w-3 h-3" />
                  Ver Detalle
                </button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPersonnel.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No se encontraron resultados</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Intenta ajustar los filtros o usar diferentes términos de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}