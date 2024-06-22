import React, { useState, useRef } from 'react';
import Navbar from '../navbar/Navbar';
import { Box, Stack, Button } from '@mui/material';
import FileExplorer from '../fileExplorer/FileExplorer';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import OpenedFiles from '../fileExplorer/OpenedFiles';
import EditorComponent from '../Editor/EditorComponent';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Input from '../outputAndInput/Input';
import Output from '../outputAndInput/Output';

const languageMap = {
    javascript: 'js',
    python: 'py',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    plaintext: 'txt'
};


const getFileLanguageAndExtension = (input) => {
    if (languageMap[input]) {
        return languageMap[input];
    }
    const extension = input.split('.').pop().toLowerCase();
    const language = Object.keys(languageMap).find(key => languageMap[key] === extension);
    return language || 'plaintext';
};

const Editorpage = () => {
    const initialFile = { id: Date.now(), name: 'Untitled1', type: 'file', content: '', parentId: null };
    const [files, setFiles] = useState([initialFile]);
    const [openFiles, setOpenFiles] = useState([initialFile]);
    const [selectedFile, setSelectedFile] = useState(initialFile);
    const [fileExplorerOpen, setFileExplorerOpen] = useState(true);
    const [contentState, setContentState] = useState({});
    const editorRef = useRef(null);
    const [examMode, setExamMode] = useState(false);
    const [previousState, setPreviousState] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    
    

    const toggleFileExplorer = () => {
        setFileExplorerOpen(prevState => !prevState);
    };

    const handleSelectFile = (file) => {
        handleOpenFile(file);
    };

    const handleExamModeStart = () => {

        setPreviousState({ files, openFiles, selectedFile, fileExplorerOpen, contentState });

        // Initialize a new blank file for exam mode
        const newFile = {
            id: 0,
            name: `Untitled.${getFileLanguageAndExtension(selectedLanguage)}`,
            language: selectedLanguage,
            content: ''
        };
        setFiles([newFile]);
        setOpenFiles([newFile]);
        setSelectedFile(newFile);
        setFileExplorerOpen(false);
        setExamMode(true);
      };

      const handleExamSubmit = () => {
        if (editorRef.current) {
          const content = editorRef.current.getValue();
          console.log('Submitted Exam Content:', content);
        }

        // Restore previous state after exam mode
        if (previousState) {
            setFiles(previousState.files);
            setOpenFiles(previousState.openFiles);
            setSelectedFile(previousState.selectedFile);
            setFileExplorerOpen(previousState.fileExplorerOpen);
            setContentState(previousState.contentState);
            setExamMode(false);
        }
      };

    const handleOpenFile = (file) => {
        console.log('Opening file:', file);

        if (!openFiles.find(openFile => openFile.id === file.id)) {
            setOpenFiles(prevOpenFiles => {
                console.log('Previous open files:', prevOpenFiles);
                const newOpenFiles = [file, ...prevOpenFiles];
                console.log('New open files:', newOpenFiles);
                return newOpenFiles;
            });
        } else {
            console.log('File is already open:', file);
        }

        setSelectedFile(file);
        console.log('Selected file set to:', file);
    };

    const handleCloseFile = (fileId) => {
        setOpenFiles(openFiles.filter(file => file.id !== fileId));
        if (selectedFile && selectedFile.id === fileId) {
            setSelectedFile(openFiles.length > 1 ? openFiles.find(file => file.id !== fileId) : null);
        }
    };

    const handleDeleteFile = (fileId) => {
        const deleteFilesRecursively = (fileId) => {
            const children = files.filter(file => file.parentId === fileId);
            children.forEach(child => deleteFilesRecursively(child.id));
            setFiles(files => files.filter(file => file.id !== fileId));
            setOpenFiles(openFiles => openFiles.filter(file => file.id !== fileId));
            // Remove content of the deleted file
            setContentState(prevState => {
                const newState = { ...prevState };
                delete newState[fileId];
                return newState;
            });
        };

        deleteFilesRecursively(fileId);

        // Set selected file to null if the deleted file was selected
        if (selectedFile && selectedFile.id === fileId) {
            setSelectedFile(openFiles.length > 1 ? openFiles.find(file => file.id !== fileId) : null);
        }
    };

    const handleRenameFile = (fileId, newName) => {
        setFiles(files.map(file => (file.id === fileId ? { ...file, name: newName } : file)));
        setOpenFiles(openFiles.map(file => (file.id === fileId ? { ...file, name: newName } : file)));
    };

    

    return (
        <>
            <Box width='100%' height='100%'>
                <Navbar 
                onMenuIconClick={toggleFileExplorer} 
                onExamModeStart={handleExamModeStart}
                onExamSubmit={handleExamSubmit}
          />
                <Stack direction='row' spacing={2} width='100%' height='100%'>
                    {!examMode && fileExplorerOpen && (
                        <Box width='15%'>
                            <FileExplorer
                                files={files}
                                setFiles={setFiles}
                                onFileSelect={handleSelectFile}
                                onFileDelete={handleDeleteFile}
                                onFileRename={handleRenameFile}
                                setOpenFiles={setOpenFiles}
                                selectedFileId={selectedFile?.id}
                            />
                        </Box>
                    )}
                    <Stack gap={1} flexGrow={1} sx={{ height: '100%' }}>
                        {examMode &&
                        <LanguageSelector setLanguage={setSelectedLanguage}
                        selectedFile={selectedFile}
                        updateFileName={handleRenameFile}/>}

                        <Box sx={{marginTop:examMode?0:7}}>
                        <OpenedFiles
                            files={openFiles}
                            onFileSelect={setSelectedFile}
                            onFileClose={handleCloseFile}
                            selectedFileId={selectedFile?.id}
                            examMode={examMode}
                        />
                        </Box>
                        
                        
                        {selectedFile && (
                            <Box sx={{ height: 'calc(60% - 40px)', overflow: 'auto' }}>
                                <EditorComponent
                                    height='100%'
                                    editorRef={editorRef}
                                    language={selectedLanguage}
                                    value={contentState[selectedFile.id] || ''}
                                    setValue={(newValue) => {
                                        setContentState(prevState => ({ ...prevState, [selectedFile.id]: newValue }));
                                    }}
                                />
                            </Box>
                        )}
                    </Stack>
                    <Stack width={fileExplorerOpen ? '25%' : '40%' } gap={1} >
                        <Box display='flex' justifyContent='space-between'height='10%' alignItems='end' marginBottom='10px'>
                            <Button sx={{ border: 'solid 1px #FD5BE3', width: '88px', height: '32px', color: '#FD5BE3', background: '#FFCAF7', fontSize: '13px', '&:hover': { background: '#FD5BE3', color: 'white' }, '& .css-dezh6x-MuiButtonBase-root-MuiButton-root': { padding: 0 } }}>
                                Run <PlayArrowIcon sx={{ fontSize: '18px', marginLeft: '7px' }} />
                            </Button>
                            <Box paddingRight={2} display='flex' gap={1}>
                                <FileCopyOutlinedIcon />
                                <FileDownloadOutlinedIcon />
                            </Box>
                        </Box>
                        <Box pr={2} height={fileExplorerOpen?'30%':'38%'}>
                            <Input />
                        </Box>
                        <Box pr={2} height='50%'>
                            <Output />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default Editorpage;
