import React from 'react';
import { Box,TextField, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Input = () => {
  return (
    <>
    <Box width='100%' height='100%' sx={{ display:'flex',flexDirection:'column',gap:'4px'}}>
        <Box width='100%' height='30px' sx={{background:'#D6FAFF',padding:'0 10px',display:'flex',justifyContent:'space-between',alignItems:'center'}} >
            <Typography>Input: </Typography>
            <CloseIcon/>
            </Box>
       <Box width='100%' height='100%' sx={{background:'white'}}>
       <TextField
          fullWidth
          id="outlined-multiline-flexible"
          multiline
          width='100%'
          maxRows={4}
          sx={{
            height:'100%',
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: 'transparent', 
                },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
              '& textarea': {
                height: '100%',
                overflow: 'auto',
              }
            }
          }}
          
        />
       </Box>

    </Box>
    </>
  )
}

export default Input