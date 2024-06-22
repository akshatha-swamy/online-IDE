import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IoMenu } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = ({ onMenuIconClick, onExamModeStart, onExamSubmit}) => {
  const [menuIconSelected, setMenuIconSelected] = useState(false);
  const [projectName, setProjectName] = useState('Untitled');
  const [isEditing, setIsEditing] = useState(false);
  const [isExamMode, setIsExamMode] = useState(false);
  const [examSubmitDialogOpen, setExamSubmitDialogOpen] = useState(false);

  const handleMenuIconClick = () => {
    setMenuIconSelected(!menuIconSelected);
    onMenuIconClick();
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectNameClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleExamModeClick = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsExamMode(true);
      onExamModeStart();
    } catch (err) {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    
  }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement && isExamMode) {
      alert('You cannot exit fullscreen mode during the exam.');
      document.documentElement.requestFullscreen().catch((err) => {
        alert('Submitting the exam');
        handleExamSubmit();
      });
    }
  };


  const handleVisibilityChange = () => {
    if (document.hidden && isExamMode) {
      alert('You cannot switch tabs during the exam.');
      document.documentElement.requestFullscreen().catch((err) => {
        alert('Submitting the exam');
        handleExamSubmit();
      });
    }
  };


  const handleWindowBlur = () => {
    if (isExamMode) {
      alert('You cannot switch windows during the exam.');
      document.documentElement.requestFullscreen().catch((err) => {
        alert('Submitting the exam');
        handleExamSubmit();
      });
    }
  };

  const handleExamSubmit = () => {
    setIsExamMode(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
      });
    }
    setExamSubmitDialogOpen(false);
    onExamSubmit();
  };
  
  const handleOpenExamSubmitDialog = () => {
    setExamSubmitDialogOpen(true);
  };

  const handleCloseExamSubmitDialog = () => {
    setExamSubmitDialogOpen(false);
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => handleFullscreenChange();
    const visibilityChangeHandler = () => handleVisibilityChange();
    const windowBlurHandler = () => handleWindowBlur();

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('visibilitychange', visibilityChangeHandler);
    window.addEventListener('blur', windowBlurHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('visibilitychange', visibilityChangeHandler);
      window.removeEventListener('blur', windowBlurHandler);
    };
  }, [isExamMode]);

  return (
    <>
      <Box
        width='100%'
        display='flex'
        alignItems='center'
        boxShadow={3}
        sx={{ backgroundColor: 'white', justifyContent: 'space-between', px: '10px', py: '3px' }}
      >
        <Box display='flex' gap='10px' alignItems='center' width='320px'>
          <Box
            display='flex'
            alignItems='center'
            sx={{ padding: '1px', borderRadius: '2px', cursor: 'pointer', '&:hover': { backgroundColor: '#DDDDDD' } }}
          >
            <IoMenu fontSize='30px' onClick={handleMenuIconClick} />
          </Box>

          {isEditing ? (
            <TextField
              variant="outlined"
              value={projectName}
              onChange={handleProjectNameChange}
              size="small"
              autoFocus
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: '#A9A9A9',
                  },
                },
              }}
            />
          ) : (
            <Typography
              fontSize='15px'
              fontFamily='Roboto'
              onClick={handleProjectNameClick}
              sx={{ cursor: 'pointer', '&:hover': { color: '#A9A9A9' } }}
            >
              {projectName}
            </Typography>
          )}
        </Box>
        <Box width='320px' display='flex' justifyContent='center'>
          <Typography fontSize='20px' color='blue' fontFamily='Roboto'>IDE Name</Typography>
        </Box>
        <Box display='flex' gap='20px' alignItems='center' width='420px'>
          <Box display='flex' gap='20px' alignItems='center' margin='0 5px' fontSize='20px'>
          {isExamMode ? (
              <Button
                variant='outlined'
                onClick={handleOpenExamSubmitDialog}
                sx={{
                  fontSize: '10px',
                  padding: '4px',
                  width: '80px',
                  border: '1px solid black',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                  },
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant='outlined'
                onClick={handleExamModeClick}
                sx={{
                  fontSize: '10px',
                  padding: '4px',
                  width: '80px',
                  border: '1px solid black',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                  },
                }}
              >
                Exam Mode
              </Button>
            )}
            <SearchIcon sx={{ '&:hover': { color: '#A9A9A9' }, cursor: 'pointer' }} />
            <DarkModeIcon sx={{ '&:hover': { color: '#A9A9A9' }, cursor: 'pointer' }} />
            <SettingsIcon sx={{ '&:hover': { color: '#A9A9A9' }, cursor: 'pointer' }} />
          </Box>
          <Box display='flex' gap='20px' alignItems='center' fontSize='15px' fontFamily='Roboto'>
            <Box sx={{ '&:hover': { color: '#A9A9A9' }, cursor: 'pointer' }}>Recents</Box>
            <Box sx={{ '&:hover': { color: '#A9A9A9' }, cursor: 'pointer' }}>Login</Box>
            <Box sx={{ '&:hover': { color: '#A9A9A9' }, cursor: 'pointer' }}>SignUp</Box>
          </Box>
        </Box>
      </Box>

      <Dialog open={examSubmitDialogOpen} onClose={handleCloseExamSubmitDialog}>
        <DialogTitle>Submit Exam</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit the exam?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExamSubmitDialog}>Cancel</Button>
          <Button onClick={handleExamSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
