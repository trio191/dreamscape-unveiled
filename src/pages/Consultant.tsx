
import { useState } from "react";
import { Header } from "@/components/Header";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Book, Clock, CreditCard } from "lucide-react";

const Consultant = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dreamDescription: "",
    preferredTime: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Form submitted successfully!");
      setIsSubmitting(false);
      // In a real implementation, we would redirect to a payment gateway here
      // For now, we'll just reset the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        dreamDescription: "",
        preferredTime: ""
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col w-full pb-20">
      <StarryBackground />
      <Header />
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              <span className="text-dream-light-purple">Professional</span> Dream Consultation
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Connect with our certified dream analysts for a personalized interpretation 
              of your most complex or troubling dreams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card/40 backdrop-blur-sm border border-dream-purple/20 p-6 rounded-lg flex flex-col items-center text-center">
              <Book className="h-10 w-10 text-dream-light-purple mb-4" />
              <h3 className="font-medium text-white text-lg mb-2">Expert Guidance</h3>
              <p className="text-white/70 text-sm">
                Our consultants have years of experience analyzing dream symbolism.
              </p>
            </div>
            <div className="bg-card/40 backdrop-blur-sm border border-dream-purple/20 p-6 rounded-lg flex flex-col items-center text-center">
              <Clock className="h-10 w-10 text-dream-light-purple mb-4" />
              <h3 className="font-medium text-white text-lg mb-2">Quick Response</h3>
              <p className="text-white/70 text-sm">
                Get a response within 1 hour or receive a full refund.
              </p>
            </div>
            <div className="bg-card/40 backdrop-blur-sm border border-dream-purple/20 p-6 rounded-lg flex flex-col items-center text-center">
              <CreditCard className="h-10 w-10 text-dream-light-purple mb-4" />
              <h3 className="font-medium text-white text-lg mb-2">Secure Payment</h3>
              <p className="text-white/70 text-sm">
                Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
          
          <div className="bg-card/70 border-dream-purple/30 backdrop-blur-sm p-6 md:p-8 rounded-lg">
            <h2 className="text-xl font-medium text-dream-light-purple mb-6">
              Consultation Request Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="bg-muted/70 text-white border-dream-purple/30 placeholder:text-muted-foreground focus:border-dream-light-purple"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="bg-muted/70 text-white border-dream-purple/30 placeholder:text-muted-foreground focus:border-dream-light-purple"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="bg-muted/70 text-white border-dream-purple/30 placeholder:text-muted-foreground focus:border-dream-light-purple"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-white">Preferred Time for Call</Label>
                  <Input
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 2:00 PM EST"
                    className="bg-muted/70 text-white border-dream-purple/30 placeholder:text-muted-foreground focus:border-dream-light-purple"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dreamDescription" className="text-white">Dream Description</Label>
                <Textarea
                  id="dreamDescription"
                  name="dreamDescription"
                  value={formData.dreamDescription}
                  onChange={handleChange}
                  required
                  placeholder="Please describe your dream in detail..."
                  className="min-h-[150px] bg-muted/70 text-white border-dream-purple/30 placeholder:text-muted-foreground focus:border-dream-light-purple"
                />
              </div>
              
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-dream-purple hover:bg-dream-light-purple text-white font-medium py-6"
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment ($49.99)'}
                </Button>
              </div>
              
              <p className="text-white/60 text-sm text-center mt-4">
                By submitting, you agree to our <a href="#" className="text-dream-light-purple hover:underline">Terms of Service</a> and <a href="#" className="text-dream-light-purple hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consultant;
