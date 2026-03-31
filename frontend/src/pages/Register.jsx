import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PATIENT');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/users/register', {
                name,
                email,
                password,
                role,
            });

            toast.success('Registration successful! Please login.');
            navigate('/login'); // 🔥 Redirect to login after register
        } catch (err) {
            console.error('Register failed', err);
            const errorMsg =
                err.response?.data?.message || 'Registration failed';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Left Side */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 justify-center items-center p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M0,0 L100,100 L100,0 Z" fill="currentColor" />
                    </svg>
                </div>

                <div className="relative z-10 text-white max-w-lg text-center">
                    <div className="bg-white/10 p-4 rounded-2xl w-24 h-24 mx-auto mb-8 flex items-center justify-center backdrop-blur-sm">
                        <Activity size={48} className="text-white" />
                    </div>

                    <h1 className="text-5xl font-bold mb-6">Join HMS</h1>
                    <p className="text-blue-100 text-lg">
                        Create your account and start managing hospital operations efficiently.
                    </p>
                </div>
            </div>

            {/* Right Side Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">

                    <div className="text-center mb-10">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 lg:hidden">
                            <Activity size={24} />
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900">Register</h2>
                        <p className="text-gray-500 mt-2">
                            Create your account to get started
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                                placeholder="Ayush Kakde"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="example@email.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="input-field"
                            >
                                <option value="PATIENT">Patient</option>
                                <option value="DOCTOR">Doctor</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3 text-lg mt-6 flex justify-center items-center"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : 'Register'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-blue-600 font-medium hover:underline cursor-pointer"
                        >
                            Login here
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;