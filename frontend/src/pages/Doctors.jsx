import { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/users');
        const docs = response.data.filter(u => u.role === 'DOCTOR') || [];
        setDoctors(docs);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load doctors catalog.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctors Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view all registered doctors.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10 bg-white"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="card p-6 flex flex-col items-center text-center card-hover group">
            <div className="w-24 h-24 rounded-full bg-blue-100 mb-4 p-1 overflow-hidden relative">
              <div className="w-full h-full bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                {doctor.name.charAt(4)}
              </div>
            </div>
            
            <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
            <p className="text-blue-600 text-sm font-medium mb-4 bg-blue-50 px-3 py-1 rounded-full">{doctor.specialty || doctor.role}</p>
            
            <div className="w-full space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-500 gap-2 overflow-hidden">
                <Mail size={14} className="text-gray-400 shrink-0" />
                <span className="truncate">{doctor.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <Phone size={14} className="text-gray-400 shrink-0" />
                <span>{doctor.phone || 'N/A'}</span>
              </div>
            </div>

            <button className="w-full py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
              View Profile
              <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-lg">No doctors found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;
