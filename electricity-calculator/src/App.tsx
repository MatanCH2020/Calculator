import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Paper, Typography, Button, useTheme } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ApplianceSelector from './components/ApplianceSelector';
import ConsumptionCalculator from './components/ConsumptionCalculator';
import ConsumptionChart from './components/ConsumptionChart';
import { categories, defaultAppliances } from './data/appliances';
import { Appliance } from './types/Appliance';
import './App.css';

function App() {
  const [selectedAppliances, setSelectedAppliances] = useState<Appliance[]>([]);
  const [electricityRate, setElectricityRate] = useState<number>(0.4831);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // Load saved appliances from localStorage on mount
  useEffect(() => {
    const savedAppliances = localStorage.getItem('selectedAppliances');
    if (savedAppliances) {
      setSelectedAppliances(JSON.parse(savedAppliances));
    }

    const savedRate = localStorage.getItem('electricityRate');
    if (savedRate) {
      setElectricityRate(parseFloat(savedRate));
    }
  }, []);

  // Save appliances to localStorage when they change
  useEffect(() => {
    localStorage.setItem('selectedAppliances', JSON.stringify(selectedAppliances));
  }, [selectedAppliances]);

  // Save rate to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('electricityRate', electricityRate.toString());
  }, [electricityRate]);

  const handleApplianceAdd = (appliance: Appliance) => {
    setSelectedAppliances(prev => [...prev, appliance]);
  };

  const handleApplianceRemove = (index: number) => {
    setSelectedAppliances(prev => prev.filter((_, i) => i !== index));
  };

  const handleRateChange = (newRate: number) => {
    setElectricityRate(newRate);
  };

  const exportImage = async () => {
    if (!containerRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(containerRef.current);
      const image = canvas.toDataURL('image/png', 1.0);
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = image;
      downloadLink.download = 'electricity-consumption.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Failed to export image:', error);
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography 
        variant="h4" 
        className="text-center mb-8 font-bold text-gray-800"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
      >
        מחשבון צריכת חשמל חכם
      </Typography>

      <Box className="grid gap-6">
        <Paper 
          elevation={3} 
          className="p-6 bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <ApplianceSelector onApplianceAdd={handleApplianceAdd} />
        </Paper>

        <div ref={containerRef}>
          <Paper 
            elevation={3} 
            className="p-6 bg-gradient-to-br from-purple-50 to-blue-50"
          >
            <ConsumptionCalculator
              appliances={selectedAppliances}
              onApplianceRemove={handleApplianceRemove}
              electricityRate={electricityRate}
              onRateChange={handleRateChange}
            />
          </Paper>

          {selectedAppliances.length > 0 && (
            <Paper 
              elevation={3} 
              className="p-6 mt-6 bg-gradient-to-br from-blue-50 to-purple-50"
            >
              <ConsumptionChart appliances={selectedAppliances} />
              <Box className="flex justify-end mt-4">
                <Button
                  variant="outlined"
                  startIcon={<SaveAltIcon />}
                  onClick={exportImage}
                  className="text-blue-600 border-blue-600"
                >
                  שמור כתמונה
                </Button>
              </Box>
            </Paper>
          )}
        </div>
      </Box>
    </Container>
  );
}

export default App;
