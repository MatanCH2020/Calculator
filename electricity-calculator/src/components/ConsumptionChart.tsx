import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Box, Typography, Grid, Paper } from '@mui/material';

interface Appliance {
  name: string;
  power: number;
  hours: number;
  category: string;
}

interface ConsumptionChartProps {
  appliances: Appliance[];
}

const COLORS = [
  '#3b82f6', // כחול
  '#10b981', // ירוק
  '#f59e0b', // כתום
  '#ef4444', // אדום
  '#8b5cf6', // סגול
  '#ec4899', // ורוד
  '#14b8a6', // טורקיז
  '#f97316', // כתום כהה
  '#6366f1', // אינדיגו
  '#84cc16', // ירוק בהיר
];

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ appliances }) => {
  const calculateDailyConsumption = (power: number, hours: number) => {
    return (power * hours) / 1000; // Convert to kWh
  };

  // נתונים לפי קטגוריות
  const categoryData = appliances.reduce((acc: any[], appliance) => {
    const consumption = calculateDailyConsumption(appliance.power, appliance.hours);
    const existingCategory = acc.find(item => item.name === appliance.category);
    
    if (existingCategory) {
      existingCategory.value += consumption;
    } else {
      acc.push({
        name: appliance.category,
        value: consumption
      });
    }
    
    return acc;
  }, []);

  // נתונים לפי מכשירים
  const applianceData = appliances.map(appliance => ({
    name: appliance.name,
    consumption: calculateDailyConsumption(appliance.power, appliance.hours)
  }));

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper className="p-3">
          <Typography variant="subtitle2">
            {payload[0].name}
          </Typography>
          <Typography variant="body2">
            {typeof payload[0].value === 'number' ? payload[0].value.toFixed(2) : '0'} קוט"ש
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper className="p-3">
          <Typography variant="subtitle2">
            {label}
          </Typography>
          <Typography variant="body2">
            {typeof payload[0].value === 'number' ? payload[0].value.toFixed(2) : '0'} קוט"ש
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="mb-4 text-center">
            התפלגות צריכה לפי קטגוריות
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value.toFixed(1)})`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="mb-4 text-center">
            צריכה יומית לפי מכשירים
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={applianceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis label={{ value: 'קוט"ש', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="consumption" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsumptionChart;
