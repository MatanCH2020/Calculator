import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SaveIcon from '@mui/icons-material/Save';

interface Appliance {
  name: string;
  power: number;
  hours: number;
  category: string;
}

interface ConsumptionCalculatorProps {
  appliances: Appliance[];
  onDelete: (applianceName: string) => void;
}

const ConsumptionCalculator: React.FC<ConsumptionCalculatorProps> = ({
  appliances,
  onDelete,
}) => {
  const [electricityRate, setElectricityRate] = useState<number>(() => {
    const saved = localStorage.getItem('electricityRate');
    return saved ? parseFloat(saved) : 0.4831;
  });
  const [timeUnit, setTimeUnit] = useState<'hour' | 'day' | 'month'>('day');
  const [isRateEdited, setIsRateEdited] = useState(false);

  const handleRateChange = (value: number) => {
    setElectricityRate(value);
    setIsRateEdited(true);
  };

  const handleRateSave = () => {
    localStorage.setItem('electricityRate', electricityRate.toString());
    setIsRateEdited(false);
  };

  const getMultiplier = (unit: 'hour' | 'day' | 'month') => {
    switch (unit) {
      case 'hour':
        return 1;
      case 'day':
        return 24;
      case 'month':
        return 24 * 30;
      default:
        return 24;
    }
  };

  const calculateConsumption = (appliance: Appliance, unit: 'hour' | 'day' | 'month') => {
    const hoursForUnit = unit === 'hour' ? 1 : appliance.hours;
    const consumption = (appliance.power / 1000) * hoursForUnit;
    const cost = consumption * electricityRate;
    
    return {
      consumption: consumption.toFixed(2),
      cost: cost.toFixed(2),
    };
  };

  const totalConsumption = appliances.reduce((acc, appliance) => {
    return acc + parseFloat(calculateConsumption(appliance, timeUnit).consumption);
  }, 0);

  const totalCost = appliances.reduce((acc, appliance) => {
    return acc + parseFloat(calculateConsumption(appliance, timeUnit).cost);
  }, 0);

  return (
    <Box className="space-y-6">
      <Card elevation={0} className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
        <CardContent>
          <Typography variant="h5" className="mb-4 font-bold text-gray-800 flex items-center gap-2">
            <ElectricBoltIcon className="text-blue-500" />
            הגדרות חישוב
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box className="relative">
                <TextField
                  fullWidth
                  type="number"
                  label="תעריף חשמל (₪ לקוט״ש)"
                  value={electricityRate}
                  onChange={(e) => handleRateChange(parseFloat(e.target.value) || 0)}
                  InputProps={{
                    endAdornment: (
                      <Box className="flex items-center gap-1">
                        <Tooltip title="התעריף הביתי הממוצע הוא 0.4831 ₪ לקוט״ש">
                          <IconButton size="small">
                            <InfoIcon className="text-blue-400" />
                          </IconButton>
                        </Tooltip>
                        {isRateEdited && (
                          <Tooltip title="שמור תעריף">
                            <IconButton 
                              size="small" 
                              onClick={handleRateSave}
                              className="text-green-600 hover:text-green-700"
                            >
                              <SaveIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    ),
                  }}
                  className="bg-white"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>יחידת זמן</InputLabel>
                <Select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as 'hour' | 'day' | 'month')}
                  label="יחידת זמן"
                  className="bg-white"
                >
                  <MenuItem value="hour">שעה</MenuItem>
                  <MenuItem value="day">יום</MenuItem>
                  <MenuItem value="month">חודש</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} className="border border-gray-200">
        <CardContent>
          <Typography variant="h5" className="mb-4 font-bold text-gray-800 flex items-center gap-2">
            <AttachMoneyIcon className="text-green-500" />
            צריכת חשמל מפורטת
          </Typography>

          {appliances.length === 0 ? (
            <Box className="text-center py-8 bg-gray-50 rounded-lg">
              <Typography className="text-gray-500">
                לא נבחרו מכשירים עדיין
              </Typography>
            </Box>
          ) : (
            <div className="space-y-4">
              {appliances.map((appliance, index) => {
                const { consumption, cost } = calculateConsumption(appliance, timeUnit);
                return (
                  <Paper
                    key={`${appliance.name}-${index}`}
                    elevation={0}
                    className="p-4 hover:bg-gray-50 transition-colors border border-gray-100 rounded-lg"
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" className="font-medium">
                          {appliance.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {appliance.power}W, {appliance.hours} שעות ביום
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" className="text-blue-600">
                          {appliance.category}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2" color="textSecondary">
                          צריכה:
                        </Typography>
                        <Typography className="font-medium">
                          {consumption} קוט״ש
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2" color="textSecondary">
                          עלות:
                        </Typography>
                        <Typography className="font-medium text-green-600">
                          ₪{cost}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <IconButton
                          onClick={() => onDelete(appliance.name)}
                          color="error"
                          size="small"
                          className="hover:bg-red-50"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}

              <Divider className="my-6" />

              <Card elevation={0} className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" className="flex items-center gap-2">
                        <ElectricBoltIcon className="text-blue-500" />
                        סה״כ צריכה: 
                        <span className="font-bold">
                          {totalConsumption.toFixed(2)} קוט״ש
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" className="flex items-center gap-2">
                        <AttachMoneyIcon className="text-green-500" />
                        סה״כ עלות: 
                        <span className="font-bold text-green-600">
                          ₪{totalCost.toFixed(2)}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConsumptionCalculator;
