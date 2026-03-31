import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import { getRole } from '../utils/auth';

const Navbar = () => {
  const location = useLocation();
  const role = getRole() || 'Admin'; // fallback
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/doctors': return 'Doctors';
      case '/patients': return 'Patients';
      case '/appointments': return 'Appointments';
      case '/book-appointment': return 'Book Appointment';
      default: return 'Hospital Management';
    }
  };

  return (
    <header className="h-20 bg-background/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Placeholder functionality for Search and Bell */}
        
        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {role.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block pr-2">
            <p className="text-sm font-semibold text-gray-800 leading-tight">System User</p>
            <p className="text-xs text-gray-500 capitalize">{role.toLowerCase()}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
