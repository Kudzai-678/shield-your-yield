import { Sprout, MapPin, Plus, Edit, Trash2, Camera, Router, Battery, Thermometer, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InteractiveFarmMap } from '@/components/ui/interactive-farm-map';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const Farm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'crops';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };
  return (
    <div className="p-3 sm:p-4 max-w-full overflow-hidden">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 truncate">Farm Registry</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your crops, livestock and farm details</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
          <TabsTrigger value="crops" className="text-xs sm:text-sm truncate">
            <span className="sm:hidden">Crops</span>
            <span className="hidden sm:inline">My Crops</span>
          </TabsTrigger>
          <TabsTrigger value="livestock" className="text-xs sm:text-sm truncate">
            <span className="sm:hidden">Animals</span>
            <span className="hidden sm:inline">Livestock</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="text-xs sm:text-sm truncate">Devices</TabsTrigger>
          <TabsTrigger value="location" className="text-xs sm:text-sm truncate">Location</TabsTrigger>
        </TabsList>

        {/* Crops Tab */}
        <TabsContent value="crops" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-2 text-lg sm:text-xl truncate">
                  <Sprout className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">Crop Inventory</span>
                </span>
                <Button variant="default" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Add Crop</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Maize (White)</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 flex-shrink-0">
                    Growing
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Area:</span>
                    <p className="font-medium truncate">5.2 hectares</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Season:</span>
                    <p className="font-medium truncate">2024 Summer</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Planted:</span>
                    <p className="font-medium truncate">October 2024</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Harvest:</span>
                    <p className="font-medium truncate">April 2025</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Photo</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Remove</span>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Sweet Potatoes</h3>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 flex-shrink-0">
                    Harvesting
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Area:</span>
                    <p className="font-medium truncate">2.8 hectares</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Season:</span>
                    <p className="font-medium truncate">2024 Summer</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Planted:</span>
                    <p className="font-medium truncate">September 2024</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Harvest:</span>
                    <p className="font-medium truncate">January 2025</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Photo</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Remove</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Livestock Tab */}
        <TabsContent value="livestock" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-2 text-lg sm:text-xl truncate">
                  <Sprout className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">Livestock Inventory</span>
                </span>
                <Button variant="default" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Add Animal</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Cattle Herd</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 flex-shrink-0">
                    Healthy
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Count:</span>
                    <p className="font-medium truncate">8 animals</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Breed:</span>
                    <p className="font-medium truncate">Nguni</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age Range:</span>
                    <p className="font-medium truncate">2-6 years</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Checkup:</span>
                    <p className="font-medium truncate">Aug 2024</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate hidden sm:inline">View Details</span>
                    <span className="truncate sm:hidden">Details</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Photo</span>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Goats</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 flex-shrink-0">
                    Healthy
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Count:</span>
                    <p className="font-medium truncate">12 animals</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Breed:</span>
                    <p className="font-medium truncate">Boer</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age Range:</span>
                    <p className="font-medium truncate">1-4 years</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Checkup:</span>
                    <p className="font-medium truncate">Sept 2024</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate hidden sm:inline">View Details</span>
                    <span className="truncate sm:hidden">Details</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Photo</span>
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
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-2 text-lg sm:text-xl truncate">
                  <Router className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">GPS Collars</span>
                </span>
                <Button variant="default" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Add Device</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">GPS Collar #001</h3>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <Wifi className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Online
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Linked to:</span>
                    <p className="font-medium truncate">Cow #005 (Nguni)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Battery:</span>
                    <div className="flex items-center gap-1">
                      <Battery className="h-3 w-3 text-success flex-shrink-0" />
                      <p className="font-medium">85%</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Location:</span>
                    <p className="font-medium truncate">2 hours ago</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium text-success truncate">Active</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate hidden sm:inline">Track Location</span>
                    <span className="truncate sm:hidden">Track</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Settings</span>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">GPS Collar #002</h3>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <WifiOff className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      Offline
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Linked to:</span>
                    <p className="font-medium truncate">Goat #003 (Boer)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Battery:</span>
                    <div className="flex items-center gap-1">
                      <Battery className="h-3 w-3 text-warning flex-shrink-0" />
                      <p className="font-medium">15%</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Location:</span>
                    <p className="font-medium truncate">6 hours ago</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium text-destructive truncate">Needs attention</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate hidden sm:inline">Last Known Location</span>
                    <span className="truncate sm:hidden">Last Location</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Settings</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Soil Sensors Section */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-2 text-lg sm:text-xl truncate">
                  <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">Soil Sensors</span>
                </span>
                <Button variant="default" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Add Sensor</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Moisture Sensor A</h3>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <Wifi className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Field:</span>
                    <p className="font-medium truncate">Maize Field (North)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Moisture Level:</span>
                    <p className="font-medium text-primary truncate">65% (Good)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Temperature:</span>
                    <p className="font-medium truncate">24°C</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Reading:</span>
                    <p className="font-medium truncate">15 mins ago</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate hidden sm:inline">View History</span>
                    <span className="truncate sm:hidden">History</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Settings</span>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Moisture Sensor B</h3>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <Wifi className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      Alert
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Field:</span>
                    <p className="font-medium truncate">Sweet Potato Field</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Moisture Level:</span>
                    <p className="font-medium text-warning truncate">25% (Low)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Temperature:</span>
                    <p className="font-medium truncate">28°C</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Reading:</span>
                    <p className="font-medium truncate">5 mins ago</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate hidden sm:inline">View History</span>
                    <span className="truncate sm:hidden">History</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none min-w-0">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Settings</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-2 text-lg sm:text-xl truncate">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">Farm Location</span>
                </span>
                <Button variant="default" size="sm" className="text-xs sm:text-sm flex-shrink-0">
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Update Location</span>
                  <span className="sm:hidden">Update</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Current Coordinates</h3>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 flex-shrink-0">
                    Verified
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Latitude:</span>
                    <p className="font-medium font-mono truncate">-25.7461</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Longitude:</span>
                    <p className="font-medium font-mono truncate">28.1881</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Province:</span>
                    <p className="font-medium truncate">Gauteng</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Updated:</span>
                    <p className="font-medium truncate">Nov 2024</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base mb-3">Farm Map</h3>
                <div className="w-full">
                  <InteractiveFarmMap isCompact={true} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};