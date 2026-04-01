import { useState, useEffect } from 'react';
import { Calendar, Clock, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const BookAppointment = () => {

  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 FETCH REAL DATA
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load doctors");
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load patients");
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        doctorId: formData.doctor,
        patientId: formData.patient,
        appointmentDate: formData.date,
        appointmentTime: formData.time + ":00",
        status: "SCHEDULED"
      };

      await api.post('/appointments', payload);

      toast.success('Appointment booked successfully!');
      navigate('/appointments');

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to schedule appointment.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Book Appointment</h1>
        <p className="text-gray-500 mt-2">Schedule a new visit quickly and easily.</p>
      </div>

      <div className="card p-8 shadow-xl border-t-4 border-t-blue-600">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 🔹 PATIENT + DOCTOR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PATIENT */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User size={16} className="text-blue-600" />
                Select Patient
              </label>

              <select
                name="patient"
                required
                value={formData.patient}
                onChange={handleChange}
                className="input-field appearance-none bg-white cursor-pointer"
              >
                <option value="">Choose a patient...</option>

                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DOCTOR */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <UserPlus size={16} className="text-blue-600" />
                Select Doctor
              </label>

              <select
                name="doctor"
                required
                value={formData.doctor}
                onChange={handleChange}
                className="input-field appearance-none bg-white cursor-pointer"
              >
                <option value="">Choose a doctor...</option>

                {doctors.map(d => (
                  <option key={d.doctorId} value={d.doctorId}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 🔹 DATE + TIME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                Select Date
              </label>

              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="input-field bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                Select Time
              </label>

              <select
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="input-field appearance-none bg-white cursor-pointer"
              >
                <option value="">Choose a time slot...</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="16:15">04:15 PM</option>
              </select>
            </div>

          </div>

          {/* 🔹 BUTTON */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-lg flex justify-center items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Confirm Appointment'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookAppointment;