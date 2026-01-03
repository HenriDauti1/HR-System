import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Users,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  Clock,
  FileText,
  DollarSign,
  Calendar,
  BarChart3,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavItem[];
  adminOnly?: boolean;
}

const navigation: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
  {
    label: 'Reports',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { label: 'Active Employees', href: '/reports/active-employees', icon: <Users className="w-4 h-4" /> },
      { label: 'Department Statistics', href: '/reports/department-statistics', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Attendance Summary', href: '/reports/attendance-summary', icon: <Clock className="w-4 h-4" /> },
      { label: 'Expiring Contracts', href: '/reports/expiring-contracts', icon: <FileText className="w-4 h-4" /> },
      { label: 'Leave Balance', href: '/reports/leave-balance', icon: <Calendar className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Administration',
    icon: <Settings className="w-5 h-5" />,
    adminOnly: true,
    children: [
      { label: 'Regions', href: '/admin/regions', icon: <Globe className="w-4 h-4" /> },
      { label: 'Countries', href: '/admin/countries', icon: <MapPin className="w-4 h-4" /> },
      { label: 'Departments', href: '/admin/departments', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Positions', href: '/admin/positions', icon: <Briefcase className="w-4 h-4" /> },
      { label: 'Employees', href: '/admin/employees', icon: <Users className="w-4 h-4" /> },
      { label: 'Employee History', href: '/admin/employee-history', icon: <Clock className="w-4 h-4" /> },
      { label: 'Attendance', href: '/admin/attendance', icon: <Clock className="w-4 h-4" /> },
      { label: 'Contracts', href: '/admin/contracts', icon: <FileText className="w-4 h-4" /> },
      { label: 'Payroll', href: '/admin/payroll', icon: <DollarSign className="w-4 h-4" /> },
      { label: 'Leaves', href: '/admin/leaves', icon: <Calendar className="w-4 h-4" /> },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Reports', 'Administration']);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children: NavItem[]) =>
    children.some(child => child.href && location.pathname === child.href);

  const filteredNavigation = navigation.filter(item => !item.adminOnly || isAdmin);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-gradient-sidebar flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">HRMS</h1>
              <p className="text-xs text-sidebar-foreground/60">Management System</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-sidebar-primary">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user?.positionName}
              </p>
            </div>
            <span className={cn(
              "px-2 py-0.5 text-xs font-medium rounded-full",
              isAdmin
                ? "bg-sidebar-primary/20 text-sidebar-primary"
                : "bg-sidebar-accent text-sidebar-accent-foreground"
            )}>
              {user?.role}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {filteredNavigation.map(item => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isParentActive(item.children)
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {item.label}
                      </span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.label) && (
                      <ul className="mt-1 ml-4 pl-4 border-l border-sidebar-border space-y-1">
                        {item.children
                          .filter(child => !child.adminOnly || isAdmin)
                          .map(child => (
                            <li key={child.label}>
                              <Link
                                to={child.href!}
                                onClick={onClose}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                                  isActive(child.href!)
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                )}
                              >
                                {child.icon}
                                {child.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href!}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive(item.href!)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
};

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden mr-2"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-foreground hidden sm:block">
          Welcome back, {user?.firstName}!
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-foreground">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </span>
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
