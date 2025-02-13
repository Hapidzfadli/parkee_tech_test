import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut, Home, Car } from "lucide-react";
import { cn } from "../lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { label: "Check-In", route: "/check-in", icon: Car },
    { label: "Check-Out", route: "/check-out", icon: Car },
    { label: "Parking Status", route: "/status", icon: Home },
  ];

  return (
    <div className="relative">
      {/* Sidebar */}
      <section
        className={`transition-all duration-300 h-screen bg-blue-600 text-white ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <nav className="flex flex-col gap-2 h-full p-4">
          <h1 className={`text-xl font-bold mb-6 ${!isExpanded && "hidden"}`}>
            Parking POS
          </h1>

          {menuItems.map((item) => {
            const isActive = location.pathname === item.route;
            const Icon = item.icon;
            return (
              <Link
                to={item.route}
                key={item.label}
                className={`flex items-center rounded-lg p-2 transition-all ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-500"
                } ${isExpanded ? "justify-start" : "justify-center"}`}
              >
                <Icon className="h-6 w-6" />
                {isExpanded && <p className="ml-3">{item.label}</p>}
              </Link>
            );
          })}

          <button
            className={`flex items-center rounded-lg p-2 mt-auto transition-all hover:bg-red-500 ${
              isExpanded ? "justify-start" : "justify-center"
            }`}
          >
            <LogOut className="h-6 w-6" />
            {isExpanded && <p className="ml-3">Keluar</p>}
          </button>
        </nav>
      </section>

      {/* Tombol Toggle Sidebar */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md transition-all ${
          isExpanded ? "-right-4" : "-right-0 translate-x-full"
        }`}
      >
        {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </div>
  );
};

export default Sidebar;
