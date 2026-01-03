import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldOff, ArrowLeft } from 'lucide-react';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-8">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <ShieldOff className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
        
        <p className="text-muted-foreground mb-8">
          You do not have permission to access the HR Management System. 
          This system is restricted to HR personnel only.
        </p>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please contact your HR department.
          </p>
          
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
