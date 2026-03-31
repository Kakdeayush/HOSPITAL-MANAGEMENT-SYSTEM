import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Navbar />
        <main className="flex-1 p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
