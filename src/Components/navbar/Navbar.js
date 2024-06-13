import React from 'react';
import { Box, Typography } from '@mui/material';
import { IoMenu } from "react-icons/io5";
import { hover } from '@testing-library/user-event/dist/hover';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <>
    <Box width='100%' display='flex' alignItems='center' boxShadow={3} sx={{backgroundColor:'white',justifyContent:'space-between',px:'10px',py:'3px'}}>
    <Box display='flex' gap='10px' alignItems='center' width='320px' >
        <Box display='flex' alignItems='center'  sx={{padding:'1px',borderRadius:'2px',cursor:'pointer','&:hover':{backgroundColor:"#DDDDDD"}}}>
        <IoMenu fontSize='30px' />
        </Box>
        
        <Typography fontSize='15px' fontFamily='Roboto'>Project Name</Typography>
    </Box>
    <Box width='320px' display='flex' justifyContent='center'>
    <Typography fontSize='20px' color='blue' fontFamily='Roboto'>IDE Name</Typography>
    </Box>
    <Box display='flex' gap='20px' alignItems='center' width='320px'>
        <Box display='flex' gap='20px' alignItems='center' margin='0 5px' fontSize='20px'>
        <SearchIcon sx={{'&:hover':{color:"#A9A9A9"},cursor:'pointer'}}/>
        <DarkModeIcon sx={{'&:hover':{color:"#A9A9A9"},cursor:'pointer'}}/>
        <SettingsIcon sx={{'&:hover':{color:"#A9A9A9"},cursor:'pointer'}}/>
        </Box>
        <Box display='flex' gap='20px' alignItems='center' fontSize='15px' fontFamily='Roboto'>
            <Box sx={{'&:hover':{color:"#A9A9A9"},cursor:'pointer'}}>Recents</Box>
            <Box sx={{'&:hover':{color:"#A9A9A9"},cursor:'pointer'}}>Login</Box>
            <Box sx={{'&:hover':{color:"#A9A9A9"},cursor:'pointer'}}>SignUp</Box>

        </Box>
    </Box>
    </Box>
    </>
  )
}

export default Navbar