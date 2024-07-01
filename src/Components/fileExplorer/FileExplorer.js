import React, { useState } from 'react';
import { Box, List, ListItem, TextField, ListItemText, Collapse, ListSubheader } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import FileDownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolderOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FileExplorer = ({ files = [], setFiles, onFileSelect, onFileDelete, selectedFileId, onFileRename, setOpenFiles }) => {
  const [renameId, setRenameId] = useState(null);
  const [newName, setNewName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [creatingItem, setCreatingItem] = useState(null);

  const handleCreateItem = (type) => {
    setCreatingItem({ type, name: '', parentId: selectedFolderId });
  };

  const handleSaveNewItem = () => {
  const newItem = {
    id: Date.now(),
    name: creatingItem.name || `Untitled${files.length + 1}`,
    type: creatingItem.type,
    parentId: creatingItem.parentId
  };
  setFiles(prevFiles => [...prevFiles, newItem]); // Update files state correctly
  if (creatingItem.parentId) {
    setExpandedFolders(prevState => ({
      ...prevState,
      [creatingItem.parentId]: true
    }));
  }
  setCreatingItem(null);
};

  const handleCancelNewItem = () => setCreatingItem(null);

  const handleRename = (id, name) => {
    setRenameId(id);
    setNewName(name);
  };

  const handleSaveRename = () => {
    onFileRename(renameId, newName);
    setFiles(files.map(file => (file.id === renameId ? { ...file, name: newName } : file)));
    setRenameId(null);
    setNewName('');
  };

  const handleToggleExpand = (id) => {
    setExpandedFolders(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSelectFolder = (id) => {
    setSelectedFolderId(prevId => (prevId === id ? null : id));
    setExpandedFolders(prevState => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleDelete = (id) => {
    const deleteFilesRecursively = (fileId) => {
      const children = files.filter(file => file.parentId === fileId);
      children.forEach(child => deleteFilesRecursively(child.id));
      setFiles(files => files.filter(file => file.id !== fileId));
      setOpenFiles(openFiles => openFiles.filter(file => file.id !== fileId)); // Fix here
    };
    deleteFilesRecursively(id);
    onFileDelete(id);
  };
  
  const deleteFolderContents = (parentId) => {
    const updatedFiles = files.filter(file => {
      if (file.parentId === parentId) {
        if (file.type === 'folder') {
          deleteFolderContents(file.id);
        }
        return false;
      }
      return true;
    });
    setFiles(updatedFiles);
  };
  

  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (renameId) {
        handleSaveRename();
      } else if (creatingItem) {
        if (creatingItem.name.trim() === '') {
          setCreatingItem({ ...creatingItem, name: `Untitled${files.length + 1}` });
        }
        handleSaveNewItem();
      }
    }
  };
  

  const handleBlur = () => {
    if (renameId) {
      handleSaveRename();
    } else if (creatingItem) {
      if (creatingItem.name.trim() === '') {
        handleCancelNewItem();
      } else {
        handleSaveNewItem();
      }
    }
  };


  const renderFileItem = (file, depth = 0) => {
    const isFolder = file.type === 'folder';
    const isExpanded = expandedFolders[file.id];
    const isSelected = selectedFileId === file.id || selectedFolderId === file.id;
    const paddingLeft = depth * 10;
    const isCreatingHere = creatingItem && creatingItem.parentId === file.id;

    return (
      <React.Fragment key={file.id}>
        <ListItem
          sx={{
            margin: 0,
            padding: 0,
            pl: `${paddingLeft}px`,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover .file-icons': {
              visibility: 'visible',
            },
            bgcolor: isSelected ? '#B6BBC4' : 'transparent',
          }}
          onClick={() => isFolder ? handleSelectFolder(file.id) : onFileSelect(file)}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <KeyboardArrowDownIcon onClick={(e) => {
                  e.stopPropagation();
                  handleToggleExpand(file.id);
                }} sx={{ fontSize: '13px' }} />
              ) : (
                <KeyboardArrowRightIcon onClick={(e) => {
                  e.stopPropagation();
                  handleToggleExpand(file.id);
                }} sx={{ fontSize: '13px' }} />
              )}
              <FolderIcon sx={{ fontSize: '13px' }} />
            </>
          ) : (
            <InsertDriveFileIcon sx={{ fontSize: '13px' }} />
          )}

          {renameId === file.id ? (
            <>
              <TextField
                value={newName}
                onChange={e => setNewName(e.target.value)}
                fullWidth
                autoFocus
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '5px',
                  },
                  '& .MuiInputBase-root': {
                    fontSize: '13px',
                  },
                }}
              />
             
            </>
          ) : (
            <>
              <ListItemText primary={file.name} sx={{ '.MuiTypography-root': { fontSize: '13px' } }} />
              <Box className="file-icons" sx={{ visibility: 'hidden', display: 'flex', gap: '8px' }}>
                <EditIcon sx={{ fontSize: '15px', cursor: 'pointer' }} onClick={() => handleRename(file.id, file.name)} />
                <DeleteOutlinedIcon sx={{ fontSize: '15px', cursor: 'pointer' }} onClick={() => handleDelete(file.id)} />
                <FileDownloadIcon sx={{ fontSize: '15px', cursor: 'pointer' }} />
              </Box>
            </>
          )}
        </ListItem>

        {isFolder && isExpanded && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {files.filter(child => child.parentId === file.id).map(child => renderFileItem(child, depth + 1))}
              {isCreatingHere && (
                <ListItem sx={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
                  <TextField
                    value={creatingItem.name}
                    onChange={e => setCreatingItem({ ...creatingItem, name: e.target.value })}
                    placeholder={`Enter ${creatingItem.type} name`}
                    fullWidth
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    sx={{
                      '& .MuiInputBase-input': {
                        padding: '5px',
                      },
                      '& .MuiInputBase-root': {
                        fontSize: '13px',
                      },
                    }}
                  />
                </ListItem>
              )}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box  bgcolor="#F5F5F5" pb={1} sx={{height:"100vh"}}>
      <List
        sx={{ width: '100%', maxWidth: 360, height: '100%', '& .css-cveggr-MuiListItemIcon-root': { minWidth: '200px' } , overflow:'scroll',scrollbarWidth:'none'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ bgcolor: '#D6FAFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', '& .css-1taviwp-MuiListSubheader-root': { lineHeight: '0' } }}
          >
            FILE EXPLORER
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ gap: '8px' }}>
              <NoteAddIcon sx={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => handleCreateItem('file')} />
              <CreateNewFolderIcon sx={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => handleCreateItem('folder')} />
            </Box>
          </ListSubheader>
        }
      >
        {creatingItem && creatingItem.parentId === null && (
          <ListItem sx={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
            <TextField
              value={creatingItem.name}
              onChange={e => setCreatingItem({ ...creatingItem, name: e.target.value })}
              placeholder={`Enter ${creatingItem.type} name`}
              fullWidth
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              sx={{
                '& .MuiInputBase-input': {
                  padding: '5px',
                },
                '& .MuiInputBase-root': {
                  fontSize: '13px',
                },
              }}
            />
          </ListItem>
        )}

        {files.filter(file => !file.parentId).map(file => renderFileItem(file))}
      </List>
    </Box>
  );
};

export default FileExplorer;
