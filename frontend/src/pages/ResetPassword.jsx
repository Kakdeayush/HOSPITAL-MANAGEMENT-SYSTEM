import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/reset-password', null, {
        params: { token, newPassword: password }
      });

      toast.success('Password reset successful');
      navigate('/login');
    } catch (err) {
      toast.error('Invalid token');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleReset} className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <input
          type="text"
          placeholder="Enter token"
          className="input-field mb-4"
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New password"
          className="input-field mb-4"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn-primary w-full">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;