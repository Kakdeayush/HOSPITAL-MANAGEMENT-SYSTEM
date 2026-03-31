import { useState, useEffect } from 'react';
import { Search, ChevronDown, CheckCircle, XCircle, Clock, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load appointments. Showing mock data.');
        setAppointments([
          { id: 1, patient: 'Priya Sharma', patientEmail: 'priya@gmail.com', doctor: 'Dr. Rahul Sharma', date: '2023-10-01', time: '10:00:00', status: 'COMPLETED' },
          { id: 2, patient: 'Gourav Bhatia', patientEmail: 'gourav@gmail.com', doctor: 'Dr. Sidharth Gupta', date: '2023-10-02', time: '14:00:00', status: 'SCHEDULED' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.put(`/appointments/${id}`, { status: 'CANCELLED' });
      toast.success('Appointment cancelled successfully');
      setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: 'CANCELLED' } : apt));
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel appointment');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const pName = apt.patient || `Patient ID: ${apt.patientId}` || '';
    const dName = apt.doctor || `Doctor ID: ${apt.doctorId}` || '';
    return pName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': 
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            <CheckCircle size={12} /> Completed
          </span>
        );
      case 'scheduled': 
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
            <Clock size={12} /> Scheduled
          </span>
        );
      case 'cancelled': 
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
            <XCircle size={12} /> Cancelled
          </span>
        );
      default: 
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage upcoming appointments.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10 bg-white shadow-sm"
            placeholder="Search by patient or doctor..."
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
                  <th className="p-4 font-medium">Doctor</th>
                  <th className="p-4 font-medium">Date & Time</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 pr-6 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {(apt.patient || 'P').charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{apt.patient || `Patient ID: ${apt.patientId}`}</p>
                          <p className="text-xs text-gray-500">{apt.patientEmail || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">{apt.doctor || `Doctor ID: ${apt.doctorId}`}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-gray-800">{apt.date || apt.appointmentDate || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{apt.time || apt.appointmentTime || 'N/A'}</p>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(apt.status || 'UNKNOWN')}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                          <button 
                            onClick={() => handleCancel(apt.id)}
                            className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium text-xs transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        <button className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No appointments found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
