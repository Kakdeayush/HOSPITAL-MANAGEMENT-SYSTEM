import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/forgot-password', null, {
        params: { email }
      });
      toast.success(res.data);
    } catch (err) {
      toast.error('Error sending reset link');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="input-field mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn-primary w-full">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;