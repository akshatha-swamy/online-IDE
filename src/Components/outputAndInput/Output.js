import React from 'react';
import { Box,TextField, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Output = () => {
  return (
    <>
    <Box width="100%" height='100%' sx={{ display:'flex',flexDirection:'column',gap:'4px'}}>
        <Box width='full' height='30px' sx={{background:'#D6FAFF',padding:'0 10px',display:'flex',justifyContent:'space-between',alignItems:'center'}} >
            <Typography>Output: </Typography>
            <CloseIcon/>
            </Box>
       <Box width='100%' height='100%' sx={{background:'white',padding:'10px'}}>
       <Box>
        Click 'Run' to see the Output
       </Box>
       </Box>

    </Box>
    </>
  )
}

export default Output