import React,{useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const getExtensionFromLanguage = (language) => {
  switch (language) {
    case 'javascript':
      return 'js';
    case 'python':
      return 'py';
    case 'java':
      return 'java';
    case 'c':
      return 'c';
    case 'cpp':
      return 'cpp';
    default:
      return 'txt';
  }
};

const LanguageSelector = ({setLanguage, selectedFile, updateFileName}) => {
    const [language, setLocalLanguage] = useState('javascript');

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
        setLocalLanguage(selectedLanguage);
        setLanguage(selectedLanguage); 

        if (selectedFile) {
          const newFileName = `Untitled.${getExtensionFromLanguage(selectedLanguage)}`;
          updateFileName(selectedFile.id, newFileName);
      }
   
  };


  
  return (
   <>
   <FormControl sx={{my:'8px', minWidth: 150,width:'150px',border:'#FF5C00',background:'#FFF2EB' }}>
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            '& .MuiSelect-select': {
              padding: '6px 12px',
              fontSize:'15px',
              backgroundColor: '#FFF2EB'
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF5C00',
                borderWidth: '1px'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF5C00', 
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF5C00',
              },
          }}
        >
            <MenuItem value="javascript">Javascript</MenuItem>
          
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value='cpp'>C++</MenuItem>
          <MenuItem value='c'>C</MenuItem>
        </Select>
        
      </FormControl>
  
   </>
  )
}

export default LanguageSelector