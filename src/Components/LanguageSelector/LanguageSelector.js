import React,{useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LanguageSelector = () => {
    const [language, setlanguage] = useState('javascript');

  const handleChange = (event) => {
    setlanguage(event.target.value);
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
          <MenuItem value='c++'>C++</MenuItem>
        </Select>
        
      </FormControl>
  
   </>
  )
}

export default LanguageSelector