// Farm Telemetry and State Management Store
export const farmState = {
  authenticated: false,
  farmerName: "Ramesh Patel",
  farmerId: "RP-7492-PB",
  nodeId: "NODE-PUNJAB-04-A",
  currentFarm: "Green Acres Farm #4 (Punjab)",
  selectedLanguage: "en",
  currentTab: "dashboard",
  theme: "light",
  soundEnabled: true,
  deviceFrame: true, // desktop mockup container
  
  // Real-time simulated telemetry
  meshLatency: 14,
  batteryPercent: 94,
  sensorsOnline: 18,
  sensorsTotal: 18,
  airTemp: 34.2,
  humidity: 64,
  soilMoistureAvg: 41,
  reservoirPercent: 76,
  reservoirLiters: 32400,
  heatIndex: 37,
  solarLux: 78.5,
  waterSavedToday: 4200,
  waterSavedWeek: 28.4,
  waterSavedMonth: 112,
  
  // Direct Motor Controls
  motors: {
    pump1: { name: "Pump #1 (Canal)", status: "OFF", running: false, psi: 0 },
    borewell2: { name: "Borewell #2 (Zone B)", status: "SCHEDULED", running: false, psi: 42, time: "09:00 AM" }
  },

  // Zones data
  zones: {
    'zone-a': {
      id: 'A',
      name: 'North Field • Wheat & Tomato',
      crop: 'Wheat & Tomato (4.2 Ha)',
      moisture: 44,
      health: 89,
      status: 'Normal',
      statusText: 'Inspect Leaf Spots (Sector 2)',
      pest: 'Low',
      battery: 94,
      node: 'LoRa Node #01',
      temp: 32.1,
      alertClass: 'bg-surface-container text-on-surface',
      action: 'scan'
    },
    'zone-b': {
      id: 'B',
      name: 'East Plot • Cotton Hybrid BT',
      crop: 'Cotton Bt (3.8 Ha)',
      moisture: 29,
      health: 74,
      status: 'Urgent',
      statusText: 'IRRIGATE IMMEDIATELY: Moisture critical at 29%',
      pest: 'Low',
      battery: 88,
      node: 'LoRa Node #02',
      temp: 36.2,
      alertClass: 'bg-error-container text-on-error-container',
      action: 'irrigate'
    },
    'zone-c': {
      id: 'C',
      name: 'South Acres • G4 Chillies & Mustard',
      crop: 'Chilli & Mustard (2.5 Ha)',
      moisture: 42,
      health: 81,
      status: 'Alert',
      statusText: 'Pest Alert: Whitefly trap count +14',
      pest: 'HIGH',
      battery: 91,
      node: 'LoRa Node #03',
      temp: 33.8,
      alertClass: 'bg-surface-container text-on-surface',
      action: 'traps'
    },
    'zone-d': {
      id: 'D',
      name: 'West Canal Edge • Sugarcane Co-0238',
      crop: 'Sugarcane (6.0 Ha)',
      moisture: 48,
      health: 96,
      status: 'Optimal',
      statusText: 'Optimal condition. No interventions needed.',
      pest: 'Negligible',
      battery: 99,
      node: 'LoRa Node #04',
      temp: 31.4,
      alertClass: 'bg-secondary-container text-on-secondary-container',
      action: 'details'
    }
  },

  // AI Diagnostic history
  diagnosticsHistory: [
    {
      id: "scan-1",
      title: "Zone A · Tomato Foliage",
      disease: "Early Blight (Alternaria solani)",
      confidence: "91%",
      stage: "Stage II",
      severity: "Moderate",
      time: "Today, 08:42 AM",
      source: "Cam #2 · Zone A",
      status: "Review",
      statusColor: "bg-error-container text-on-error-container",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2251e?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "scan-2",
      title: "Zone B · Bt Cotton Leaf",
      disease: "Healthy Leaf Canopy",
      confidence: "98%",
      stage: "Healthy",
      severity: "None",
      time: "Yesterday, 04:15 PM",
      source: "Drone #4",
      status: "Healthy",
      statusColor: "bg-secondary-container text-on-secondary-container",
      image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "scan-3",
      title: "Zone C · Chilli Nursery",
      disease: "Leaf Curl Virus (Begomovirus)",
      confidence: "78%",
      stage: "Stage I",
      severity: "Monitored",
      time: "22 Oct, 11:30 AM",
      source: "Mobile Handheld",
      status: "Monitored",
      statusColor: "bg-surface-container-highest text-primary",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80"
    }
  ]
};
