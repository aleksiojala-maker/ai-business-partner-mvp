import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Library, 
  Settings, 
  Menu,
  X,
  PieChart
} from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-goodi-light text-goodi-teal font-semibold' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 shadow-sm z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-goodi-teal flex items-center justify-center text-white font-bold text-xl">
            G
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">Goodi</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink to="/" className={navClass}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/finance" className={navClass}>
            <PieChart size={20} />
            <span>Finance</span>
          </NavLink>
          <NavLink to="/library" className={navClass}>
            <Library size={20} />
            <span>Prompt Library</span>
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-slate-800 rounded-lg p-4 text-white">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Status</p>
            <p className="text-sm font-medium">Local Data: Secure</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200 shadow-sm z-20">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-goodi-teal flex items-center justify-center text-white font-bold">G</div>
             <span className="font-bold text-lg text-gray-800">Goodi</span>
          </div>
          <button onClick={toggleMenu} className="p-2 text-gray-600">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[60px] left-0 right-0 bottom-0 bg-white z-50 p-4 shadow-xl">
             <nav className="space-y-2">
              <NavLink to="/" onClick={toggleMenu} className={navClass}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/finance" onClick={toggleMenu} className={navClass}>
                <PieChart size={20} />
                <span>Finance</span>
              </NavLink>
              <NavLink to="/library" onClick={toggleMenu} className={navClass}>
                <Library size={20} />
                <span>Prompt Library</span>
              </NavLink>
              <NavLink to="/settings" onClick={toggleMenu} className={navClass}>
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;