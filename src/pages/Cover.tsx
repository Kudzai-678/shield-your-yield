import { Shield, Plus, Eye, FileText, Calculator, Phone, MessageCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Cover = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Insurance Cover</h1>
        <p className="text-muted-foreground">Protect your farm assets with comprehensive coverage</p>
      </div>

      <Tabs defaultValue="quote" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quote">Quote & Buy</TabsTrigger>
          <TabsTrigger value="policies">My Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>

        {/* Quote & Buy Tab */}
        <TabsContent value="quote" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Get a Quote
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="hero" size="wide">
                <Plus className="h-5 w-5" />
                Insure Crops
              </Button>
              <Button variant="earth" size="wide">
                <Plus className="h-5 w-5" />
                Insure Livestock
              </Button>
              
              <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                <h3 className="font-semibold mb-2">Coverage Options</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>• Drought Protection</span>
                    <span className="text-primary">From R50/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Flood Protection</span>
                    <span className="text-primary">From R35/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Theft & Disease</span>
                    <span className="text-primary">From R75/month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Active Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Maize Crop Coverage</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Active
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Coverage:</span>
                    <p className="font-medium">R25,000</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Premium:</span>
                    <p className="font-medium">R125/month</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Perils:</span>
                    <p className="font-medium">Drought, Flood</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expires:</span>
                    <p className="font-medium">Dec 2024</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4" />
                    Download Proof
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Cattle Livestock Coverage</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Active
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Coverage:</span>
                    <p className="font-medium">R45,000</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Premium:</span>
                    <p className="font-medium">R180/month</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Animals:</span>
                    <p className="font-medium">8 Cattle</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expires:</span>
                    <p className="font-medium">Oct 2024</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4" />
                    Download Proof
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Submit New Claim</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="hero" size="wide">
                <Plus className="h-5 w-5" />
                Make a Claim
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Claim History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Drought Claim #DK2024001</h3>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    Processing
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Event:</span> Drought damage to maize crop</p>
                  <p><span className="text-muted-foreground">Submitted:</span> September 15, 2024</p>
                  <p><span className="text-muted-foreground">Estimated Payout:</span> R12,500</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                  Track Status
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Theft Claim #TH2024002</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Paid
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Event:</span> Livestock theft (3 cattle)</p>
                  <p><span className="text-muted-foreground">Submitted:</span> August 28, 2024</p>
                  <p><span className="text-muted-foreground">Payout:</span> R18,000</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  <Shield className="h-4 w-4" />
                  Completed
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Support & Emergency Section */}
      <div className="mt-8 space-y-4">
        {/* Support Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Support & Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" size="wide" className="justify-start">
                <HelpCircle className="h-5 w-5" />
                FAQ & Help Center
              </Button>
              <Button 
                variant="outline" 
                size="wide" 
                className="justify-start"
                onClick={() => window.open('https://wa.me/27123456789?text=Hello, I need help with my insurance', '_blank')}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Support
              </Button>
              <Button variant="outline" size="wide" className="justify-start">
                <Phone className="h-5 w-5" />
                Call Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Section */}
        <Card className="shadow-card border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Emergency Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="destructive" 
                size="wide" 
                className="justify-start"
                onClick={() => window.open('tel:+27123456789', '_self')}
              >
                <Phone className="h-5 w-5" />
                Emergency Contact
              </Button>
              <Button variant="outline" size="wide" className="justify-start border-destructive/50 text-destructive hover:bg-destructive/10">
                <AlertTriangle className="h-5 w-5" />
                Report Disaster
              </Button>
              <Button variant="outline" size="wide" className="justify-start border-destructive/50 text-destructive hover:bg-destructive/10">
                <Shield className="h-5 w-5" />
                Emergency Claim
              </Button>
            </div>
            <div className="mt-4 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-sm text-destructive font-medium">🚨 Emergency services available 24/7</p>
              <p className="text-xs text-muted-foreground mt-1">For urgent situations affecting your farm or livestock</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};