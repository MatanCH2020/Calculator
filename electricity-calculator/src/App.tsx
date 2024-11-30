import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ApplianceSelector from './components/ApplianceSelector';
import ConsumptionCalculator from './components/ConsumptionCalculator';
import ConsumptionChart from './components/ConsumptionChart';

interface Appliance {
  name: string;
  power: number;
  hours: number;
  category: string;
  custom?: boolean;
}

const App: React.FC = () => {
  const [selectedAppliances, setSelectedAppliances] = useState<Appliance[]>(() => {
    const saved = localStorage.getItem('selectedAppliances');
    return saved ? JSON.parse(saved) : [];
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('selectedAppliances', JSON.stringify(selectedAppliances));
  }, [selectedAppliances]);

  const handleApplianceAdd = (appliance: Appliance) => {
    setSelectedAppliances(prev => [...prev, appliance]);
  };

  const handleApplianceDelete = (applianceName: string) => {
    setSelectedAppliances(prev => prev.filter(a => a.name !== applianceName));
  };

  const handleExportImage = async () => {
    if (!containerRef.current) return;
    
    try {
      const { default: html2canvas } = await import('html2canvas');
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
    <Container maxWidth="lg" className="py-8" ref={containerRef}>
      <Box className="space-y-8">
        <Typography variant="h4" className="text-center font-bold text-gray-800 mb-8">
          מחשבון צריכת חשמל
        </Typography>

        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Box className="space-y-8">
            <Paper elevation={0} className="p-6 shadow-sm border border-gray-100">
              <ApplianceSelector onApplianceAdd={handleApplianceAdd} />
            </Paper>
          </Box>

          <Box className="space-y-8">
            <ConsumptionCalculator
              appliances={selectedAppliances}
              onDelete={handleApplianceDelete}
            />
          </Box>
        </Box>

        {selectedAppliances.length > 0 && (
          <>
            <Paper elevation={0} className="p-6 shadow-sm border border-gray-100">
              <ConsumptionChart appliances={selectedAppliances} />
            </Paper>

            <Box className="flex justify-center">
              <Button
                variant="contained"
                onClick={handleExportImage}
                startIcon={<SaveAltIcon />}
                className="bg-blue-600 hover:bg-blue-700"
              >
                שמור כתמונה
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default App;
