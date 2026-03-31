import { useState, useEffect } from 'react';
import { Users, UserPlus, Calendar, Activity, ChevronRight } from 'lucide-react';
import { getRole } from '../utils/auth';
import toast from 'react-hot-toast';
import api from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = getRole() || 'Admin';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, aptsRes] = await Promise.all([
          api.get('/users').catch(() => ({ data: [] })),
          api.get('/appointments').catch(() => ({ data: [] }))
        ]);
        
        const allUsers = usersRes.data || [];
        const allApts = aptsRes.data || [];
        
        const doctorsList = allUsers.filter(u => u.role === 'DOCTOR');
        const patientsList = allUsers.filter(u => u.role === 'PATIENT');

        setStats({
          doctors: doctorsList.length,
          patients: patientsList.length,
          appointments: allApts.length
        });
        
        setRecentAppointments(allApts.slice(0, 5)); // recent 5
        setRecentPatients(patientsList.slice(0, 5)); // recent 5
      } catch (err) {
        console.error(err);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome, {role} User</h1>
          <p className="text-gray-500 mt-2">Here is a summary of your hospital operations today.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Calendar size={18} />
          Today's Schedule
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-soft relative overflow-hidden group hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <UserPlus size={64} />
          </div>
          <div className="relative z-10">
            <p className="text-blue-100 font-medium text-sm lg:text-base uppercase tracking-wider mb-1">Total Doctors</p>
            <h3 className="text-4xl font-bold">{stats.doctors}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-2xl p-6 shadow-soft relative overflow-hidden group hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Users size={64} />
          </div>
          <div className="relative z-10">
            <p className="text-teal-100 font-medium text-sm lg:text-base uppercase tracking-wider mb-1">Total Patients</p>
            <h3 className="text-4xl font-bold">{stats.patients}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-2xl p-6 shadow-soft relative overflow-hidden group hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Activity size={64} />
          </div>
          <div className="relative z-10">
            <p className="text-orange-100 font-medium text-sm lg:text-base uppercase tracking-wider mb-1">Appointments</p>
            <h3 className="text-4xl font-bold">{stats.appointments}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="card flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Recent Appointments</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium pl-6">Patient Name</th>
                  <th className="p-4 font-medium">Time</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt, i) => (
                  <tr key={apt.id} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i === recentAppointments.length - 1 ? 'border-none' : ''}`}>
                    <td className="p-4 pl-6">
                      <p className="font-semibold text-gray-800">{apt.patient || `Patient ID: ${apt.patientId}`}</p>
                      <p className="text-xs text-gray-500">{apt.doctor || `Doctor ID: ${apt.doctorId}`}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{apt.date || apt.appointmentDate} • {apt.time || apt.appointmentTime}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="card flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Recent Patients</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium pl-6">Patient Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Registered Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient, i) => (
                  <tr key={patient.id} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i === recentPatients.length - 1 ? 'border-none' : ''}`}>
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {patient.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800">{patient.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{patient.email}</td>
                    <td className="p-4 text-sm text-gray-500 font-medium">{patient.registeredDate || 'Recently'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
