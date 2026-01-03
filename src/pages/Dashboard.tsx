import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/layout/Layout';
import {
  Users,
  Building2,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

const statCards = [
  {
    label: 'Total Employees',
    value: '248',
    change: '+12%',
    icon: Users,
    trend: 'up',
  },
  {
    label: 'Departments',
    value: '12',
    change: '+2',
    icon: Building2,
    trend: 'up',
  },
  {
    label: 'Active Contracts',
    value: '186',
    change: '-3',
    icon: FileText,
    trend: 'down',
  },
  {
    label: 'Pending Leaves',
    value: '8',
    change: 'Today',
    icon: Calendar,
    trend: 'neutral',
  },
];

const recentActivities = [
  { action: 'New employee onboarded', name: 'Sarah Johnson', time: '2 hours ago', icon: CheckCircle2, color: 'text-success' },
  { action: 'Contract expiring soon', name: 'Michael Chen', time: '5 hours ago', icon: AlertTriangle, color: 'text-warning' },
  { action: 'Leave request approved', name: 'Emily Davis', time: '1 day ago', icon: Calendar, color: 'text-primary' },
  { action: 'Attendance recorded', name: 'James Wilson', time: '1 day ago', icon: Clock, color: 'text-info' },
];

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.firstName}! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className={`w-4 h-4 ${
                  stat.trend === 'up' ? 'text-success' :
                  stat.trend === 'down' ? 'text-destructive' :
                  'text-muted-foreground'
                }`} />
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-success' :
                  stat.trend === 'down' ? 'text-destructive' :
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{activity.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/reports/active-employees"
                className="flex items-center gap-3 p-3 rounded-lg bg-primary-light hover:bg-primary/10 transition-colors group"
              >
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  View Active Employees
                </span>
              </a>
              <a
                href="/reports/expiring-contracts"
                className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 hover:bg-warning/20 transition-colors group"
              >
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium text-foreground group-hover:text-warning transition-colors">
                  Expiring Contracts
                </span>
              </a>
              <a
                href="/reports/leave-balance"
                className="flex items-center gap-3 p-3 rounded-lg bg-info/10 hover:bg-info/20 transition-colors group"
              >
                <Calendar className="w-5 h-5 text-info" />
                <span className="text-sm font-medium text-foreground group-hover:text-info transition-colors">
                  Leave Balances
                </span>
              </a>
              {isAdmin && (
                <a
                  href="/admin/employees"
                  className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors group"
                >
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Manage Employees
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Role Info */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">Your Access Level</h2>
          <p className="text-muted-foreground">
            You are logged in as <strong className="text-primary">{user?.role}</strong> ({user?.positionName}).
            {isAdmin
              ? ' You have full access to all features including administration.'
              : ' You have read-only access to reports.'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
