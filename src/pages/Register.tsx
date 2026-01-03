import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Shield, Eye, EyeOff, AlertCircle, Leaf, ArrowLeft, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | '';
  nationality: string;
  
  // Address Information
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  
  // Employment Information
  hireDate: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Security
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    hireDate: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value as 'male' | 'female' }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError('Please fill in all required personal information fields.');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Please enter a valid email address.');
          return false;
        }
        break;
      case 2:
        if (!formData.dateOfBirth || !formData.nationality) {
          setError('Please fill in date of birth and nationality.');
          return false;
        }
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          setError('You must be at least 18 years old to register.');
          return false;
        }
        break;
      case 3:
        if (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
          setError('Please fill in all required address fields.');
          return false;
        }
        break;
      case 4:
        if (!formData.hireDate) {
          setError('Please select a hire date.');
          return false;
        }
        break;
      case 5:
        if (!formData.password || !formData.confirmPassword) {
          setError('Please enter and confirm your password.');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters long.');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match.');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to register the user
      // const response = await registerEmployee(formData);
      
      toast({
        title: 'Registration Successful!',
        description: 'Your account has been created. Please log in.',
      });
      
      navigate('/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

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
              Join Our<br />
              <span className="text-sidebar-primary">Growing Team</span>
            </h2>
            <p className="text-sidebar-foreground/70 text-lg max-w-md">
              Complete your registration to get started with our comprehensive HR management system.
            </p>
          </div>
          
          <div className="space-y-3">
            {[
              { step: 1, label: 'Personal Information', complete: currentStep > 1 },
              { step: 2, label: 'Additional Details', complete: currentStep > 2 },
              { step: 3, label: 'Address Information', complete: currentStep > 3 },
              { step: 4, label: 'Employment Details', complete: currentStep > 4 },
              { step: 5, label: 'Security Setup', complete: currentStep > 5 },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    item.complete
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : currentStep === item.step
                      ? 'bg-sidebar-accent text-sidebar-foreground border-2 border-sidebar-primary'
                      : 'bg-sidebar-accent/30 text-sidebar-foreground/50'
                  }`}
                >
                  {item.complete ? '✓' : item.step}
                </div>
                <span
                  className={`text-sm font-medium transition-all ${
                    currentStep === item.step
                      ? 'text-sidebar-foreground'
                      : 'text-sidebar-foreground/50'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sidebar-foreground/50 text-sm">
          <Leaf className="w-4 h-4" />
          <span>Sustainable HR Solutions</span>
        </div>
      </div>
      
      {/* Right side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
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
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-foreground">Employee Registration</h2>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Additional Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Additional Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">
                      Date of Birth <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup value={formData.gender} onValueChange={handleGenderChange}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationality">
                      Nationality <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      placeholder="United States"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Address Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Address Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">
                      Address Line 1 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      placeholder="123 Main Street"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      name="addressLine2"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State/Province <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      Postal Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder="10001"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Employment & Emergency Contact */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Employment Details</h3>
                    <div className="space-y-2">
                      <Label htmlFor="hireDate">
                        Hire Date <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="hireDate"
                        name="hireDate"
                        type="date"
                        value={formData.hireDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contact (Optional)</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Contact Name</Label>
                        <Input
                          id="emergencyContactName"
                          name="emergencyContactName"
                          placeholder="Jane Doe"
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                        <Input
                          id="emergencyContactPhone"
                          name="emergencyContactPhone"
                          type="tel"
                          placeholder="+1 (555) 987-6543"
                          value={formData.emergencyContactPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                        <Input
                          id="emergencyContactRelationship"
                          name="emergencyContactRelationship"
                          placeholder="Spouse, Parent, Sibling, etc."
                          value={formData.emergencyContactRelationship}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Security */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Security Setup</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div>
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={isLoading}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate('/login')}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Login
                    </Button>
                  )}
                </div>
                
                <div>
                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={handleNext} disabled={isLoading}>
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;