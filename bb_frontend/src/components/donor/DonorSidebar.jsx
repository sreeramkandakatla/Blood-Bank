import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, History, Droplet, Home } from 'lucide-react';

const DonorSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/donor/dashboard', icon: <Home size={20} /> },
    { name: 'Profile', path: '/donor/profile', icon: <User size={20} /> },
    { name: 'Donation History', path: '/donor/donations', icon: <History size={20} /> },
    { name: 'Request Blood', path: '/donor/request-blood', icon: <Droplet size={20} /> },
  ];

  return (
    <aside className="w-64 h-full bg-red-100 shadow-lg p-4">
      <h2 className="text-xl font-bold text-red-700 mb-6">Menu</h2>
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md hover:bg-red-200 ${
                isActive ? 'bg-red-300 font-semibold' : ''
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DonorSidebar;
