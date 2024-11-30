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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SaveIcon from '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { categories, defaultAppliances, Appliance } from '../data/appliances';

interface ApplianceSelectorProps {
  onApplianceAdd: (appliance: Appliance) => void;
}

const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({ onApplianceAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [hours, setHours] = useState<number>(1);
  const [isCustomDialog, setIsCustomDialog] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance | null>(null);
  const [customName, setCustomName] = useState('');
  const [customPower, setCustomPower] = useState<number>(0);
  const [savedLists, setSavedLists] = useState<{ name: string; appliances: Appliance[] }[]>([]);
  const [isLoadListDialog, setIsLoadListDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isSaveListDialog, setIsSaveListDialog] = useState(false);

  const filteredAppliances = useMemo(() => {
    return defaultAppliances.filter(appliance => {
      const matchesCategory = !selectedCategory || appliance.category === selectedCategory;
      return matchesCategory;
    });
  }, [selectedCategory]);

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
        custom: true,
      });
      setIsCustomDialog(false);
      setCustomName('');
      setCustomPower(0);
      setSelectedCategory('');
      setHours(1);
    }
  };

  const handleSaveList = () => {
    if (newListName) {
      // Here you would get the current appliances from the parent component
      // For now, we'll just save a dummy list
      setSavedLists([...savedLists, { name: newListName, appliances: [] }]);
      setNewListName('');
      setIsSaveListDialog(false);
    }
  };

  const handleLoadList = (list: { name: string; appliances: Appliance[] }) => {
    list.appliances.forEach(appliance => onApplianceAdd(appliance));
    setIsLoadListDialog(false);
  };

  return (
    <Card elevation={3} className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
      <CardContent>
        <Typography variant="h5" className="mb-6 font-bold text-gray-800 text-center">
          <ElectricBoltIcon className="text-blue-500 mb-1 ml-2" />
          בחירת מכשירי חשמל
        </Typography>

        <Box className="mb-6">
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
                label="חפש והוסף מכשיר חשמל"
                className="bg-white rounded-lg"
                variant="outlined"
              />
            )}
            renderOption={(props, option) => (
              <li {...props} className="hover:bg-blue-50">
                <Box className="py-2">
                  <Typography variant="subtitle1" className="font-medium">
                    {option.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.power}W | {option.category} | {option.hours} שעות ביום
                  </Typography>
                </Box>
              </li>
            )}
          />
        </Box>

        <Grid container spacing={2} className="mb-6">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="שעות שימוש ביום"
              value={hours}
              onChange={(e) => setHours(Math.max(0, parseFloat(e.target.value) || 0))}
              className="bg-white rounded-lg"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <AccessTimeIcon className="text-gray-400 ml-2" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} className="flex gap-2">
            <Button
              variant="contained"
              onClick={handleAddAppliance}
              disabled={!selectedAppliance}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              startIcon={<AddIcon />}
            >
              הוסף מכשיר
            </Button>
            <Tooltip title="הוסף מכשיר מותאם אישית">
              <IconButton
                onClick={() => setIsCustomDialog(true)}
                className="bg-purple-50 hover:bg-purple-100"
              >
                <ElectricBoltIcon className="text-purple-500" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Box className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`cursor-pointer ${
                cat === selectedCategory
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-white hover:bg-blue-50'
              }`}
            />
          ))}
        </Box>

        <Box className="flex justify-end gap-2">
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={() => setIsSaveListDialog(true)}
            className="text-blue-600 border-blue-600"
          >
            שמור רשימה
          </Button>
          <Button
            variant="outlined"
            startIcon={<FolderOpenIcon />}
            onClick={() => setIsLoadListDialog(true)}
            className="text-purple-600 border-purple-600"
          >
            טען רשימה
          </Button>
        </Box>
      </CardContent>

      {/* Custom Appliance Dialog */}
      <Dialog open={isCustomDialog} onClose={() => setIsCustomDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-gradient-to-r from-blue-50 to-purple-50">
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
          <Autocomplete
            value={selectedCategory}
            onChange={(_, newValue) => setSelectedCategory(newValue || '')}
            options={categories}
            renderInput={(params) => (
              <TextField {...params} label="קטגוריה" className="bg-white" />
            )}
          />
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
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!customName || customPower <= 0}
          >
            הוסף מכשיר
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save List Dialog */}
      <Dialog open={isSaveListDialog} onClose={() => setIsSaveListDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-gradient-to-r from-blue-50 to-purple-50">
          שמירת רשימת מכשירים
        </DialogTitle>
        <DialogContent className="pt-4">
          <TextField
            fullWidth
            label="שם הרשימה"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="bg-white"
          />
        </DialogContent>
        <DialogActions className="bg-gray-50">
          <Button onClick={() => setIsSaveListDialog(false)} color="inherit">
            ביטול
          </Button>
          <Button
            onClick={handleSaveList}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!newListName}
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>

      {/* Load List Dialog */}
      <Dialog open={isLoadListDialog} onClose={() => setIsLoadListDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-gradient-to-r from-blue-50 to-purple-50">
          טעינת רשימת מכשירים
        </DialogTitle>
        <DialogContent className="pt-4">
          <List>
            {savedLists.map((list, index) => (
              <ListItem key={index} className="hover:bg-gray-50">
                <ListItemText primary={list.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleLoadList(list)}
                    className="text-blue-600"
                  >
                    <FolderOpenIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setSavedLists(savedLists.filter((_, i) => i !== index));
                    }}
                    className="text-red-600"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions className="bg-gray-50">
          <Button onClick={() => setIsLoadListDialog(false)} color="inherit">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ApplianceSelector;
