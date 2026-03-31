import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { setToken, setRole } from '../utils/auth';
import { Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, role } = response.data;
      setToken(token);
      setRole(role);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('API login failed', err);
      const errorMsg = err.response?.data?.message || 'Failed to login. Please check credentials.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L100,100 L100,0 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="relative z-10 text-white max-w-lg text-center">
          <div className="bg-white/10 p-4 rounded-2xl w-24 h-24 mx-auto mb-8 flex items-center justify-center backdrop-blur-sm">
            <Activity size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">Welcome Back to HMS</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Manage your hospital operations efficiently.
            Access patient records, schedules, and more from one unified dashboard.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 lg:hidden">
              <Activity size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Login</h2>
            <p className="text-gray-500 mt-2">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@hospital.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg mt-8 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Don't have an account? <span
              onClick={() => navigate('/register')}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
