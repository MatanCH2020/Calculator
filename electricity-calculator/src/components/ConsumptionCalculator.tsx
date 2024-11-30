import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Grid,
  Tooltip,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Appliance } from '../types/Appliance';

interface ConsumptionCalculatorProps {
  appliances: Appliance[];
  onApplianceRemove: (index: number) => void;
  electricityRate: number;
  onRateChange: (rate: number) => void;
}

const ConsumptionCalculator: React.FC<ConsumptionCalculatorProps> = ({
  appliances,
  onApplianceRemove,
  electricityRate,
  onRateChange,
}) => {
  const calculateDailyConsumption = (power: number, hours: number) => {
    return (power * hours) / 1000; // Convert to kWh
  };

  const calculateMonthlyCost = (dailyConsumption: number) => {
    return dailyConsumption * 30 * electricityRate;
  };

  const totalDailyConsumption = appliances.reduce(
    (sum, appliance) => sum + calculateDailyConsumption(appliance.power, appliance.hours),
    0
  );

  const totalMonthlyCost = calculateMonthlyCost(totalDailyConsumption);

  return (
    <Box>
      <Typography variant="h5" className="mb-6 font-bold text-gray-800 text-center">
        <CurrencyExchangeIcon className="text-green-500 mb-1 ml-2" />
        חישוב צריכת חשמל ועלויות
      </Typography>

      <Box className="mb-6">
        <TextField
          type="number"
          label="תעריף לקילוואט שעה (₪)"
          value={electricityRate}
          onChange={(e) => onRateChange(parseFloat(e.target.value) || 0)}
          className="bg-white rounded-lg"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <CurrencyExchangeIcon className="text-gray-400 ml-2" />,
          }}
        />
      </Box>

      <TableContainer component={Paper} className="mb-6 bg-white rounded-lg overflow-hidden">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold">מכשיר</TableCell>
              <TableCell align="center" className="font-bold">
                <ElectricBoltIcon className="text-yellow-500 ml-1" />
                הספק (וואט)
              </TableCell>
              <TableCell align="center" className="font-bold">
                <AccessTimeIcon className="text-blue-500 ml-1" />
                שעות ביום
              </TableCell>
              <TableCell align="center" className="font-bold">צריכה יומית (קוט"ש)</TableCell>
              <TableCell align="center" className="font-bold">עלות חודשית (₪)</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliances.map((appliance, index) => {
              const dailyConsumption = calculateDailyConsumption(appliance.power, appliance.hours);
              const monthlyCost = calculateMonthlyCost(dailyConsumption);

              return (
                <TableRow
                  key={`${appliance.name}-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell component="th" scope="row" className="font-medium">
                    {appliance.name}
                    <Typography variant="caption" color="textSecondary" display="block">
                      {appliance.category}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{appliance.power}</TableCell>
                  <TableCell align="center">{appliance.hours}</TableCell>
                  <TableCell align="center">
                    {dailyConsumption.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    {monthlyCost.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="הסר מכשיר">
                      <IconButton
                        onClick={() => onApplianceRemove(index)}
                        size="small"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <Typography variant="h6" className="text-center mb-4 font-bold text-gray-800">
          סיכום צריכה
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="p-4 bg-blue-50 text-center h-full">
              <Typography variant="subtitle1" className="mb-2 font-medium text-blue-800">
                צריכה יומית כוללת
              </Typography>
              <Typography variant="h5" className="font-bold text-blue-900">
                {totalDailyConsumption.toFixed(2)} קוט"ש
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="p-4 bg-green-50 text-center h-full">
              <Typography variant="subtitle1" className="mb-2 font-medium text-green-800">
                עלות חודשית מוערכת
              </Typography>
              <Typography variant="h5" className="font-bold text-green-900">
                ₪{totalMonthlyCost.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsumptionCalculator;
