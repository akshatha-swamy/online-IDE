import React from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const OpenedFiles = () => {
  return (
    <>
    <Box display='flex' justifyContent='space-between'>
    <Stack direction="row" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
    </Stack>
    <FullscreenIcon />
    </Box>
     
    </>
  )
}

export default OpenedFiles