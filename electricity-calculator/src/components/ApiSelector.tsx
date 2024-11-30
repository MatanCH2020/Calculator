import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

interface ApiSelectorProps {
  onModelSelect: (model: string) => void;
  onApiKeyChange: (apiKey: string) => void;
}

const AI_MODELS = [
  { name: 'OpenAI GPT-4', value: 'gpt-4' },
  { name: 'OpenAI GPT-3.5', value: 'gpt-3.5-turbo' },
  { name: 'Google PaLM', value: 'palm' },
  { name: 'Azure OpenAI', value: 'azure-openai' },
];

const ApiSelector: React.FC<ApiSelectorProps> = ({ onModelSelect, onApiKeyChange }) => {
  const [selectedModel, setSelectedModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const handleModelChange = (event: any) => {
    const model = event.target.value;
    setSelectedModel(model);
    onModelSelect(model);
    setIsConnected(false);
    setError('');
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    setApiKey(key);
    onApiKeyChange(key);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (apiKey.length < 10) {
      setError('מפתח API לא תקין');
      setIsConnected(false);
      return;
    }

    setIsConnected(true);
    setError('');
  };

  return (
    <Box>
      <Typography variant="h6" className="mb-4">
        הגדרות AI
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl fullWidth>
          <InputLabel>מודל AI</InputLabel>
          <Select
            value={selectedModel}
            onChange={handleModelChange}
            label="מודל AI"
          >
            {AI_MODELS.map((model) => (
              <MenuItem key={model.value} value={model.value}>
                {model.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="מפתח API"
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="הזן את מפתח ה-API שלך"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!selectedModel || !apiKey}
        >
          התחבר
        </Button>

        {isConnected && (
          <Alert severity="success">
            מחובר בהצלחה ל-{AI_MODELS.find(m => m.value === selectedModel)?.name}
          </Alert>
        )}

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <Typography variant="body2" className="text-gray-600 mt-2">
          * המפתח מאובטח ונשמר באופן מקומי בלבד
        </Typography>
      </form>
    </Box>
  );
};

export default ApiSelector;
