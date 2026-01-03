import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Shield, Eye, EyeOff, AlertCircle, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ email, password });
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      if (message === 'ACCESS_DENIED') {
        navigate('/access-denied');
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-hero">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-sidebar p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sidebar-foreground">HRMS</h1>
              <p className="text-sm text-sidebar-foreground/60">Human Resource Management</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-sidebar-foreground leading-tight">
              Streamline Your<br />
              <span className="text-sidebar-primary">HR Operations</span>
            </h2>
            <p className="text-sidebar-foreground/70 text-lg max-w-md">
              Manage employees, track attendance, handle payroll, and more - all in one powerful platform.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '👥', label: 'Employee Management' },
              { icon: '📊', label: 'Analytics & Reports' },
              { icon: '💼', label: 'Contract Tracking' },
              { icon: '📅', label: 'Leave Management' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-xl bg-sidebar-accent/50 backdrop-blur"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm font-medium text-sidebar-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sidebar-foreground/50 text-sm">
          <Leaf className="w-4 h-4" />
          <span>Sustainable HR Solutions</span>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">HRMS</h1>
              <p className="text-sm text-muted-foreground">Management System</p>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground mt-2">Sign in to access your dashboard</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                size="xl"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">Demo Accounts:</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                  <span className="font-medium">Admin:</span>
                  <span>admin@hrms.com / admin123</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                  <span className="font-medium">Read-Only:</span>
                  <span>coordinator@hrms.com / coordinator123</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                  <span className="font-medium">No Access:</span>
                  <span>developer@hrms.com / developer123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
