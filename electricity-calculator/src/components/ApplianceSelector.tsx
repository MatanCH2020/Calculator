import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Autocomplete,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import { categories, defaultAppliances, Appliance } from '../data/appliances';

interface ApplianceSelectorProps {
  onApplianceAdd: (appliance: Appliance) => void;
}

const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({ onApplianceAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [customName, setCustomName] = useState('');
  const [customPower, setCustomPower] = useState<number>(0);
  const [hours, setHours] = useState<number>(1);
  const [isCustomDialog, setIsCustomDialog] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance | null>(null);

  // Filter appliances based on search query and selected category
  const filteredAppliances = useMemo(() => {
    return defaultAppliances.filter(appliance => {
      const matchesSearch = appliance.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || appliance.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddAppliance = () => {
    if (selectedAppliance) {
      onApplianceAdd({
        ...selectedAppliance,
        hours: hours || selectedAppliance.hours,
      });
      setSelectedAppliance(null);
      setHours(1);
    }
  };

  const handleAddCustomAppliance = () => {
    if (customName && customPower > 0) {
      onApplianceAdd({
        name: customName,
        power: customPower,
        hours,
        category: selectedCategory || 'שונות',
      });
      setIsCustomDialog(false);
      setCustomName('');
      setCustomPower(0);
      setSelectedCategory('');
      setHours(1);
    }
  };

  return (
    <Card elevation={0} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
      <CardContent>
        <Typography variant="h5" className="mb-4 font-bold text-gray-800 flex items-center gap-2">
          <CategoryIcon className="text-purple-500" />
          בחירת מכשירי חשמל
        </Typography>

        <Grid container spacing={3} className="mb-4">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>קטגוריה</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="קטגוריה"
                className="bg-white"
              >
                <MenuItem value="">הכל</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="חיפוש מכשיר"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Box className="mb-4">
          <Autocomplete
            value={selectedAppliance}
            onChange={(_, newValue) => {
              setSelectedAppliance(newValue);
              if (newValue) {
                setHours(newValue.hours);
              }
            }}
            options={filteredAppliances}
            getOptionLabel={(option) => `${option.name} (${option.power}W)`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="בחר מכשיר חשמל"
                className="bg-white"
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Box>
                  <Typography variant="subtitle2">{option.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.power}W, {option.hours} שעות ביום
                  </Typography>
                </Box>
              </li>
            )}
          />
        </Box>

        <Grid container spacing={2} className="mb-4">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="שעות שימוש ביום"
              value={hours}
              onChange={(e) => setHours(Math.max(0, parseFloat(e.target.value) || 0))}
              className="bg-white"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} className="flex gap-2">
            <Button
              variant="contained"
              onClick={handleAddAppliance}
              disabled={!selectedAppliance}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              startIcon={<AddIcon />}
            >
              הוסף מכשיר
            </Button>
            <Tooltip title="הוסף מכשיר מותאם אישית">
              <IconButton
                onClick={() => setIsCustomDialog(true)}
                className="bg-blue-50 hover:bg-blue-100"
              >
                <ElectricBoltIcon className="text-blue-500" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Box className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`cursor-pointer ${
                cat === selectedCategory
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-white hover:bg-purple-50'
              }`}
            />
          ))}
        </Box>
      </CardContent>

      <Dialog open={isCustomDialog} onClose={() => setIsCustomDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-gradient-to-r from-purple-50 to-blue-50">
          הוספת מכשיר מותאם אישית
        </DialogTitle>
        <DialogContent className="space-y-4 pt-4">
          <TextField
            fullWidth
            label="שם המכשיר"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="bg-white"
          />
          <TextField
            fullWidth
            type="number"
            label="צריכת חשמל (וואט)"
            value={customPower || ''}
            onChange={(e) => setCustomPower(Math.max(0, parseInt(e.target.value) || 0))}
            className="bg-white"
          />
          <FormControl fullWidth>
            <InputLabel>קטגוריה</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="קטגוריה"
              className="bg-white"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="שעות שימוש ביום"
            value={hours}
            onChange={(e) => setHours(Math.max(0, parseFloat(e.target.value) || 0))}
            className="bg-white"
          />
        </DialogContent>
        <DialogActions className="bg-gray-50">
          <Button onClick={() => setIsCustomDialog(false)} color="inherit">
            ביטול
          </Button>
          <Button
            onClick={handleAddCustomAppliance}
            variant="contained"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={!customName || customPower <= 0}
          >
            הוסף מכשיר
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ApplianceSelector;
