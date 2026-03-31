import { useState, useEffect } from 'react';
import { Search, MoreVertical, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/users');
        const pats = response.data.filter(u => u.role === 'PATIENT') || [];
        setPatients(pats);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load patients list.');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients List</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view all registered patients.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10 bg-white"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100 uppercase tracking-wider">
                  <th className="p-4 pl-6 font-medium">Patient Details</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Registered Date</th>
                  <th className="p-4 pr-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{patient.name}</p>
                          {patient.lastVisit && <p className="text-xs text-gray-400">Last visit: {patient.lastVisit}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{patient.email}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {patient.role}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 font-medium">{patient.registeredDate || 'Recently'}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No patients found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
