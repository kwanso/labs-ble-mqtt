import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { ToggleButton } from './assets';
import Button from '@mui/material/Button';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import Slider from '@mui/material/Slider';

function App() {
  const reload = async () => {
    await fetch('http://localhost:3001/rest/off');
  }

  useEffect(() => {
    (async () => { await reload() })();
  }, [])

  const [turnOn, setTurnOn] = useState(false)
  const [lightsBlinking, setLightsBlinking] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null);
  const [randomBlinking, setRandomBlinking] = useState(false)

  const turnOnLed = async () => {
    try {
      await fetch(`http://localhost:3001/rest/${!turnOn ? 'on' : 'off'}`);
      setTurnOn(!turnOn);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const ledColor = async (color) => {
    setSelectedColor(color);
    try {
      await fetch(`http://localhost:3001/rest/on-${color}`);
    } catch (error) {
      console.log(error)
    }
  }

  const toggleLightsBlinking = async () => {
    setLightsBlinking(!lightsBlinking);
    try {
      if (lightsBlinking) {
        await fetch(`http://localhost:3001/rest/off`, {
          method: 'GET',
        });
      } else {
        await fetch(`http://localhost:3001/rest/blink`, {
          method: 'POST',
          body: JSON.stringify({ value: 1000 }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleRandomBlinking = async () => {
    setRandomBlinking(!randomBlinking);
    try {
      await fetch(`http://localhost:3001/rest/${!randomBlinking ? 'random-blink' : 'off'}`);
      setTurnOn(!turnOn);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const marks = [
    { value: 50, label: '50' },
    { value: 250, label: '250' },
    { value: 450, label: '450' },
    { value: 650, label: '650' },
    { value: 850, label: '850' },
    { value: 1050, label: '1050' },
  ];

  const handleSliderChange = async (newValue) => {
    try {
      await fetch(`http://localhost:3001/rest/blink`, {
        method: 'POST',
        body: JSON.stringify({ value: newValue?.target.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Box>
        <Typography color="white" sx={{ fontSize: '25px', mt: "5px", ml: "10px", fontWeight: '600' }} >
          IOT Raspberry Pi system design
        </Typography>
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '92vh', flexDirection: 'column' }}>
          <IconButton sx={{ background: 'none !important' }} onClick={turnOnLed}>
            <ToggleButton color={!turnOn ? "red" : "green"} sx={{ boxShadow: 'none !important' }} />
          </IconButton>
          <Box display="flex" gap='20px'>
            <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'red' } }} onClick={() => ledColor('red')} disabled={selectedColor === 'red'}>Red</Button>
            <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'green' } }} onClick={() => ledColor('green')} disabled={selectedColor === 'green'}>Green</Button>
            <Button variant="contained" sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'blue' } }} onClick={() => ledColor('blue')} disabled={selectedColor === 'blue'}>Blue</Button>
            <Button variant="contained" sx={{ backgroundColor: 'yellow', color: 'black', '&:hover': { backgroundColor: 'yellow' } }} onClick={() => ledColor('yellow')} disabled={selectedColor === 'yellow'}>Yellow</Button>
            <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'white' } }} onClick={() => ledColor('white')} disabled={selectedColor === 'white'}>White</Button>
            <Button
              variant="contained"
              onClick={toggleLightsBlinking}
              sx={{ backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'gray' } }}
              startIcon={!lightsBlinking ? <FlashOnIcon /> : <FlashOffIcon />}
            >
              {lightsBlinking ? 'Stop Blinking' : 'Start Blinking'}
            </Button>
            <Button
              variant="contained"
              onClick={toggleRandomBlinking}
              sx={{ background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(119,0,0,1) 100%)', color: 'white', '&:hover': { backgroundColor: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(30,21,40,0.742734593837535) 100%)' } }}
              startIcon={!randomBlinking ? <FlashOnIcon /> : <FlashOffIcon />}
            >
              Surprise Mode
            </Button>
          </Box>
          <Box>
            <Typography mt={10} sx={{ color: 'white' }}>Blinking speed in milliseconds</Typography>
          </Box>
          <Box sx={{ width: 500, mt: '30px' }}>
            <Slider
              aria-label="Blinking speed"
              defaultValue={250}
              max={1050}
              min={50}
              step={200}
              valueLabelDisplay="auto"
              marks={marks}
              sx={{
                "& .MuiSlider-valueLabel, & .MuiSlider-markLabel": {
                  color: 'white',
                },
              }}
              onChange={handleSliderChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
