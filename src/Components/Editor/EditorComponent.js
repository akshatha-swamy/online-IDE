import React from 'react';
import { Box } from '@mui/material';
import { Editor } from '@monaco-editor/react';

const EditorComponent = () => {
  

  return (
    <Box display="flex" flexDirection="column" sx={{ margin: 0,flexGrow: 1,background:'white',padding:'5px'}}>
      <Editor
        height="80vh"
        width="100%"
        options={{
          scrollBeyondLastLine: false,
          overviewRulerBorder: false,
          find: {
            addExtraSpaceOnTop: false,
            autoFindInSelection: "always",
            seedSearchStringFromSelection: true,
            autoFindInSelection: false
          }
        }}
      />
    </Box>
  );
};

export default EditorComponent;
