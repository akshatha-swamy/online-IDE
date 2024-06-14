import React from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const OpenedFiles = ({ files, onFileSelect, onFileClose,selectedFileId}) => {
  return (
    <>
    <Box display='flex' justifyContent='space-between'>
    <Stack direction="row" spacing={2}
    sx={{ height:'100%',
    display: 'flex', 
    flexDirection: 'row',
    alignItems:'center', 
    gap:'2px',
    listStyle: 'none',
     margin: 0,
    overflow:'scroll',
    scrollbarWidth:'none',
      width:'100%' }}>
       {files.map(file=>(
         <Item key={file.id}
         sx={{
           px: 1,
           height:'100%',
           color: '#434242',
           fontSize: '13px',
           display: 'flex',
           alignItems: 'center',
           cursor: 'pointer',
           width:'auto',
           justifyContent:'space-between',
           bgcolor: selectedFileId === file.id ? '#9AE7FF' : 'white',
           borderRadius:'0'
         }}
         onClick={() => onFileSelect(file)}>
            <InsertDriveFileIcon sx={{ fontSize: 13,mx:'2px' }} />{file.name} 
         <CloseIcon
           sx={{ fontSize: 13,ml:1}}
           onClick={(e) => {
             e.stopPropagation();
             onFileClose(file.id);
           }}
         /></Item>
       ))}
    </Stack>
    <FullscreenIcon sx={{margin:'0 10px'}}/>
    </Box>
     
    </>
  )
}

export default OpenedFiles