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
  Sparkles,
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
          className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-gradient-sidebar flex flex-col transition-transform duration-300 lg:translate-x-0 border-r border-sidebar-border/50",
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-sidebar-border/50">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-sidebar-primary/30 blur-xl rounded-full animate-pulse" />
              <div className="relative w-11 h-11 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">HRMS</h1>
              <p className="text-xs text-sidebar-foreground/60 font-medium">Management System</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-all"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="px-4 py-5 border-b border-sidebar-border/50">
          <div className="relative group">
            <div className="absolute inset-0 bg-sidebar-primary/10 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl bg-sidebar-accent/30 border border-sidebar-border/30 transition-all duration-300 group-hover:bg-sidebar-accent/50">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shadow-md ring-2 ring-sidebar-primary/30">
                  <span className="text-sm font-bold text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-sidebar-background" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate font-medium">
                  {user?.positionName}
                </p>
              </div>
              <span className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm",
                isAdmin
                  ? "bg-sidebar-primary/30 text-sidebar-primary ring-1 ring-sidebar-primary/40"
                  : "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredNavigation.map(item => (
            <div key={item.label} className="animate-slide-in">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                      isParentActive(item.children)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="transition-transform duration-200 group-hover:scale-110">
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    {expandedItems.includes(item.label) ? (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </button>
                  {expandedItems.includes(item.label) && (
                    <ul className="mt-1 ml-4 pl-4 border-l-2 border-sidebar-border/40 space-y-1 animate-slide-in">
                      {item.children
                        .filter(child => !child.adminOnly || isAdmin)
                        .map(child => (
                          <li key={child.label}>
                            <Link
                              to={child.href!}
                              onClick={onClose}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative overflow-hidden",
                                isActive(child.href!)
                                  ? "bg-gradient-primary text-sidebar-primary-foreground shadow-md font-medium"
                                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground font-normal"
                              )}
                            >
                              {isActive(child.href!) && (
                                <span className="absolute inset-0 bg-white/10 animate-pulse" />
                              )}
                              <span className="relative transition-transform duration-200 group-hover:scale-110">
                                {child.icon}
                              </span>
                              <span className="relative">{child.label}</span>
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
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                    isActive(item.href!)
                      ? "bg-gradient-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {isActive(item.href!) && (
                    <span className="absolute inset-0 bg-white/10 animate-pulse" />
                  )}
                  <span className="relative transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="relative">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border/50">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-all duration-200 group"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-medium">Sign Out</span>
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
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center px-4 lg:px-6 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden mr-2 hover:bg-primary/10 rounded-lg transition-all"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-foreground hidden sm:block bg-gradient-primary bg-clip-text text-transparent">
            Welcome back, {user?.firstName}!
          </h2>
          <Sparkles className="w-4 h-4 text-primary animate-pulse hidden sm:block" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-foreground">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-muted-foreground font-medium">{user?.email}</p>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shadow-md ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/30 group-hover:scale-105">
            <span className="text-sm font-bold text-white">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
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
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;