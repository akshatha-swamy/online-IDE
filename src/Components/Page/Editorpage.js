import React from 'react';
import Navbar from '../navbar/Navbar';
import { Box, Stack,Button } from '@mui/material';
import FileExplorer from '../fileExplorer/FileExplorer';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import OpenedFiles from '../fileExplorer/OpenedFiles';
import EditorComponent from '../Editor/EditorComponent';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Input from '../outputAndInput/Input';
import Output from '../outputAndInput/Output';



const Editorpage = () => {
    
  return (
    <>
    <Box width='100%' height='100%'>
    <Navbar/>
    <Stack
     direction='row' spacing={2} width='100%'>
        <Box width='15%'>
        <FileExplorer />
        </Box>
   
    <Stack gap={1} width='60%'sx={{ height: '100%' }}>
    <LanguageSelector/>
    <OpenedFiles/>
    <EditorComponent/>
    </Stack>

    <Stack width='30%' gap={1}>
        <Box display='flex' justifyContent='space-between' alignItems='center' marginTop='60px' > 
        <Button sx={{border:'solid 1px #FD5BE3', width:'88px',height:'32px', color:'#FD5BE3',background:'#FFCAF7',fontSize:'13px','&:hover':{background:'#FD5BE3',color:'white'},'& .css-dezh6x-MuiButtonBase-root-MuiButton-root':{
            padding:0
        }}}>
            Run <PlayArrowIcon sx={{fontSize:'18px',marginLeft:'7px'}}/>
        </Button>
        <Box paddingRight={2} display='flex' gap={1}>
            <FileCopyOutlinedIcon/>
            <FileDownloadOutlinedIcon/>
        </Box>
        </Box> 
        <Box pr={2} height='30%'>
        <Input/>
        </Box>
        <Box pr={2} height='50%'>
        <Output/>
        </Box>
        
        
    </Stack>
    

    </Stack>
    </Box>
   
    </>
  )
}

export default Editorpage