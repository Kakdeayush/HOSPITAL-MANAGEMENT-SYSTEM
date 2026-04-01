import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare2, Calendar, LogOut, CheckSquare } from 'lucide-react';
import { logout } from '../utils/auth';

const Sidebar = () => {

  const role = localStorage.getItem("role"); // ✅ get role

  // 🔥 ALL NAV ITEMS WITH ROLE ACCESS
  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
      roles: ['ADMIN', 'DOCTOR', 'PATIENT']
    },
    {
      name: 'Doctors',
      path: '/doctors',
      icon: UserSquare2,
      roles: ['ADMIN'] // 🔴 admin only
    },
    {
      name: 'Patients',
      path: '/patients',
      icon: Users,
      roles: ['ADMIN'] // 🔴 admin only
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: Calendar,
      roles: ['ADMIN', 'DOCTOR'] // 🔴 + 🔵
    },
    {
      name: 'Book Appointment',
      path: '/book-appointment',
      icon: CheckSquare,
      roles: ['PATIENT'] // 🟢 only
    },
  ];

  // ✅ FILTER BASED ON ROLE
  const filteredNavItems = navItems.filter(item =>
    item.roles.includes(role)
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1e3a8a] text-white flex flex-col shadow-lg z-20 transition-all duration-300">
      
      {/* 🔹 LOGO */}
      <div className="flex items-center gap-3 p-6 border-b border-blue-800/50">
        <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#1e3a8a] font-bold text-xl">
          H
        </div>
        <h1 className="text-xl font-semibold tracking-wide">
          Hospital<br/>
          <span className="text-sm font-normal text-blue-200">Management</span>
        </h1>
      </div>

      {/* 🔹 NAVIGATION */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600/50 text-white shadow-inner font-medium' 
                    : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                }`
              }
            >
              <Icon size={20} className="shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* 🔹 LOGOUT */}
      <div className="p-4 border-t border-blue-800/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-blue-200 hover:bg-blue-800/50 hover:text-white rounded-xl transition-all duration-200"
        >
          <LogOut size={20} className="shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;