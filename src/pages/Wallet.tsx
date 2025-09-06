import { CreditCard, History, Gift, Share, Trophy, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Wallet = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Wallet</h1>
        <p className="text-muted-foreground">Manage payments and rewards</p>
      </div>

      {/* Quick Balance */}
      <Card className="mb-6 bg-gradient-earth text-earth-foreground shadow-soft">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-earth-foreground/90 mb-2">Next Premium Due</p>
            <h2 className="text-3xl font-bold mb-1">R305</h2>
            <p className="text-sm text-earth-foreground/90">Due: October 25, 2024</p>
            <Button variant="secondary" size="mobile" className="mt-4">
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-8 bg-warning rounded flex items-center justify-center">
                    <span className="text-xs font-bold">MTN</span>
                  </div>
                  <div>
                    <p className="font-medium">MTN MoMo</p>
                    <p className="text-sm text-muted-foreground">**** 7892</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Primary
                </Badge>
              </div>
              
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">FNB</span>
                  </div>
                  <div>
                    <p className="font-medium">FNB Bank Account</p>
                    <p className="text-sm text-muted-foreground">**** 4521</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Premium Payment</p>
                  <p className="text-sm text-muted-foreground">Sept 25, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R305</p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                    Paid
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Premium Payment</p>
                  <p className="text-sm text-muted-foreground">Aug 25, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R305</p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                    Paid
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Claim Payout</p>
                  <p className="text-sm text-muted-foreground">Aug 15, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-success">+R18,000</p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                    Received
                  </Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <Card className="bg-gradient-primary text-primary-foreground shadow-soft">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">875 Points</h3>
              <p className="text-primary-foreground/90 mb-4">You're a Crop Protector!</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-primary-foreground/80">Claims-Free</p>
                  <p className="font-semibold">8 months</p>
                </div>
                <div>
                  <p className="text-primary-foreground/80">Referrals</p>
                  <p className="font-semibold">3 farmers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="h-6 w-6 text-success" />
                  </div>
                  <p className="text-xs font-medium">Protector</p>
                </div>
                
                <div className="text-center p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift className="h-6 w-6 text-warning" />
                  </div>
                  <p className="text-xs font-medium">Good Streak</p>
                </div>
                
                <div className="text-center p-3 border rounded-lg opacity-50">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                    <Share className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-medium">Ambassador</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Redeem Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Premium Discount</p>
                  <p className="text-sm text-muted-foreground">10% off next payment</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">500 pts</p>
                  <Button variant="outline" size="sm">
                    Redeem
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Free Consultation</p>
                  <p className="text-sm text-muted-foreground">30min with farm expert</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">750 pts</p>
                  <Button variant="outline" size="sm">
                    Redeem
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Seed Voucher</p>
                  <p className="text-sm text-muted-foreground">R200 towards seeds</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1000 pts</p>
                  <Button variant="outline" size="sm" disabled>
                    Need 125 more
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Invite Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-accent/50 rounded-lg">
                <Gift className="h-12 w-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Earn R50 for each referral!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  When your friends sign up and buy their first policy, you both get rewarded.
                </p>
                <div className="space-y-2">
                  <Button variant="hero" size="wide">
                    <Share className="h-4 w-4" />
                    Share via WhatsApp
                  </Button>
                  <Button variant="outline" size="wide">
                    Copy Referral Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Sipho Ndlovu</p>
                  <p className="text-sm text-muted-foreground">Joined Sept 15, 2024</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Earned R50
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Nomsa Zulu</p>
                  <p className="text-sm text-muted-foreground">Joined Aug 28, 2024</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Earned R50
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Peter Mthethwa</p>
                  <p className="text-sm text-muted-foreground">Joined Aug 10, 2024</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Earned R50
                  </Badge>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Total referral earnings: <span className="font-semibold text-success">R150</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};