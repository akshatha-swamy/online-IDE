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

const Editorpage = () => {
    const initialFile = { id: Date.now(), name: 'Untitled1', type: 'file', content: '', parentId: null };
    const [files, setFiles] = useState([initialFile]);
    const [openFiles, setOpenFiles] = useState([initialFile]);
    const [selectedFile, setSelectedFile] = useState(initialFile);
    const [fileExplorerOpen, setFileExplorerOpen] = useState(true);
    const [contentState, setContentState] = useState({});
    const editorRef = useRef(null);

    const toggleFileExplorer = () => {
        setFileExplorerOpen(prevState => !prevState);
    };

    const handleSelectFile = (file) => {
        handleOpenFile(file);
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

    const getFileLanguage = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'js':
                return 'javascript';
            case 'py':
                return 'python';
            case 'java':
                return 'java';
            default:
                return 'plaintext';
        }
    };

    return (
        <>
            <Box width='100%' height='100%'>
                <Navbar onMenuIconClick={toggleFileExplorer} />
                <Stack direction='row' spacing={2} width='100%' height='100%'>
                    {fileExplorerOpen && (
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
                        <LanguageSelector />
                        <OpenedFiles
                            files={openFiles}
                            onFileSelect={setSelectedFile}
                            onFileClose={handleCloseFile}
                            selectedFileId={selectedFile?.id}
                        />
                        {selectedFile && (
                            <EditorComponent
                                height='90%'
                                editorRef={editorRef}
                                language={getFileLanguage(selectedFile.name)}
                                value={contentState[selectedFile.id] || ''}
                                setValue={(newValue) => {
                                    setContentState(prevState => ({ ...prevState, [selectedFile.id]: newValue }));
                                }}
                            />
                        )}
                    </Stack>
                    <Stack width={fileExplorerOpen ? '25%' : '40%'} gap={1}>
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
