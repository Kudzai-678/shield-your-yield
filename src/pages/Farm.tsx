import { Sprout, MapPin, Plus, Edit, Trash2, Camera, Router, Battery, Thermometer, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Farm = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Farm Registry</h1>
        <p className="text-muted-foreground">Manage your crops, livestock and farm details</p>
      </div>

      <Tabs defaultValue="crops" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crops">My Crops</TabsTrigger>
          <TabsTrigger value="livestock">Livestock</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        {/* Crops Tab */}
        <TabsContent value="crops" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sprout className="h-5 w-5" />
                  Crop Inventory
                </span>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4" />
                  Add Crop
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Maize (White)</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Growing
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Area:</span>
                    <p className="font-medium">5.2 hectares</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Season:</span>
                    <p className="font-medium">2024 Summer</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Planted:</span>
                    <p className="font-medium">October 2024</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Harvest:</span>
                    <p className="font-medium">April 2025</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Sweet Potatoes</h3>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    Harvesting
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Area:</span>
                    <p className="font-medium">2.8 hectares</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Season:</span>
                    <p className="font-medium">2024 Summer</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Planted:</span>
                    <p className="font-medium">September 2024</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Harvest:</span>
                    <p className="font-medium">January 2025</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Livestock Tab */}
        <TabsContent value="livestock" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sprout className="h-5 w-5" />
                  Livestock Inventory
                </span>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4" />
                  Add Animal
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Cattle Herd</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Healthy
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Count:</span>
                    <p className="font-medium">8 animals</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Breed:</span>
                    <p className="font-medium">Nguni</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age Range:</span>
                    <p className="font-medium">2-6 years</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Checkup:</span>
                    <p className="font-medium">Aug 2024</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4" />
                    Photo
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Goats</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Healthy
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Count:</span>
                    <p className="font-medium">12 animals</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Breed:</span>
                    <p className="font-medium">Boer</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age Range:</span>
                    <p className="font-medium">1-4 years</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Checkup:</span>
                    <p className="font-medium">Sept 2024</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4" />
                    Photo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-4">
          {/* GPS Collars Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Router className="h-5 w-5" />
                  GPS Collars
                </span>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4" />
                  Add Device
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">GPS Collar #001</h3>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-success" />
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Online
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Linked to:</span>
                    <p className="font-medium">Cow #005 (Nguni)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Battery:</span>
                    <div className="flex items-center gap-1">
                      <Battery className="h-3 w-3 text-success" />
                      <p className="font-medium">85%</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Location:</span>
                    <p className="font-medium">2 hours ago</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium text-success">Active</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4" />
                    Track Location
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">GPS Collar #002</h3>
                  <div className="flex items-center gap-2">
                    <WifiOff className="h-4 w-4 text-destructive" />
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      Offline
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Linked to:</span>
                    <p className="font-medium">Goat #003 (Boer)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Battery:</span>
                    <div className="flex items-center gap-1">
                      <Battery className="h-3 w-3 text-warning" />
                      <p className="font-medium">15%</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Location:</span>
                    <p className="font-medium">6 hours ago</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium text-destructive">Needs attention</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4" />
                    Last Known Location
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Soil Sensors Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Soil Sensors
                </span>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4" />
                  Add Sensor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Moisture Sensor A</h3>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-success" />
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Field:</span>
                    <p className="font-medium">Maize Field (North)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Moisture Level:</span>
                    <p className="font-medium text-primary">65% (Good)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Temperature:</span>
                    <p className="font-medium">24°C</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Reading:</span>
                    <p className="font-medium">15 mins ago</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    View History
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Moisture Sensor B</h3>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-success" />
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      Alert
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Field:</span>
                    <p className="font-medium">Sweet Potato Field</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Moisture Level:</span>
                    <p className="font-medium text-warning">25% (Low)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Temperature:</span>
                    <p className="font-medium">28°C</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Reading:</span>
                    <p className="font-medium">5 mins ago</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    View History
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Farm Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Farm Name</label>
                  <p className="font-medium">Mthembu Family Farm</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Region</label>
                  <p className="font-medium">KwaZulu-Natal, Msinga</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                  <p className="font-medium">-28.7282° S, 30.4319° E</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Area</label>
                  <p className="font-medium">15.5 hectares</p>
                </div>
              </div>
              
              <div className="bg-muted/30 h-48 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Satellite view coming soon</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                  Update Location
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4" />
                  Use GPS
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};