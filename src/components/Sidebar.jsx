import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, Plus, Edit, Check, X } from 'lucide-react';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow: hidden;
  width: ${props => props.isOpen ? '250px' : '0'};

  @media (max-width: 768px) {
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: -1;
      opacity: ${props => props.isOpen ? 1 : 0};
      pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
      transition: opacity 0.2s;
    }
  }
`;

const ToggleButton = styled(motion.button)`
  position: absolute;
  right: -30px;
  top: 10px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 0 4px 4px 0;
  background: var(--toolbar-bg);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 101;
  border: 1px solid var(--border-color);
  border-left: none;

  &:hover {
    background: var(--hover-bg);
  }

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.5;
  }

  @media (max-width: 768px) {
    top: 5px;
    right: -25px;
    width: 25px;
    height: 25px;
  }
`;

const SidebarContent = styled.div`
  padding: 1rem;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const FileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-right: 1rem;

  @media (max-width: 768px) {
    padding-right: 0.5rem;
  }
`;

const Title = styled.h2`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
`;

const NewFileButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 4px;
  
  &:hover {
    background: var(--hover-bg);
  }

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 1.5;
  }
`;

const FileItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  gap: 0.5rem;
  color: var(--text-color);
  position: relative;

  &:hover {
    background: var(--hover-bg);
  }

  &.active {
    background: var(--accent-bg);
    color: var(--accent-color);
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    margin-bottom: 0.2rem;
  }
`;

const FileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: var(--text-secondary);

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 1.5;
  }
`;

const FileName = styled.div`
  flex-grow: 1;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileActions = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  
  &:hover {
    background: var(--hover-bg);
  }

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 1.5;
  }
`;

const FileNameInput = styled.input`
  background: var(--editor-bg);
  border: 1px solid var(--accent-color);
  color: var(--text-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 150px;
  
  &:focus {
    outline: none;
  }
`;

const Sidebar = ({ activeFile, onFileChange, onNewFile, onWidthChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [files, setFiles] = useState([{ id: 1, name: 'untitled.js', content: '// Start coding here...\n' }]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      onWidthChange(250);
    } else {
      onWidthChange(0);
    }
  }, [isOpen, onWidthChange]);

  const getLanguageFromExtension = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const languageMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'rb': 'ruby',
      'php': 'php',
      'go': 'go',
      'rs': 'rust',
      'sql': 'sql',
      'md': 'markdown',
      'txt': 'plaintext'
    };
    return languageMap[ext] || 'plaintext';
  };

  const handleCreateFile = () => {
    const newFile = {
      id: Date.now(),
      name: `untitled${Date.now()}.js`,
      content: '// Start coding here...\n'
    };
    setFiles(prev => [...prev, newFile]);
    onNewFile(newFile);
    setEditingId(newFile.id);
    setEditValue(newFile.name);
  };

  const handleFileClick = (file) => {
    const language = getLanguageFromExtension(file.name);
    onFileChange(file.name, language, file.content);
  };

  const handleStartEdit = (id, name) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim()) {
      const updatedFiles = files.map(file => 
        file.id === id ? { ...file, name: editValue } : file
      );
      setFiles(updatedFiles);
      const editedFile = updatedFiles.find(f => f.id === id);
      if (editedFile) {
        onFileChange(editedFile.name, getLanguageFromExtension(editedFile.name), editedFile.content);
      }
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <SidebarContainer
      isOpen={isOpen}
      initial={false}
      animate={{ width: isOpen ? 250 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <ToggleButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </ToggleButton>

      <SidebarContent>
        <FileHeader>
          <Title>Files</Title>
          <NewFileButton
            onClick={handleCreateFile}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus />
          </NewFileButton>
        </FileHeader>

        <AnimatePresence>
          {files.map(file => (
            <FileItem
              key={file.id}
              onClick={() => handleFileClick(file)}
              className={activeFile === file.name ? 'active' : ''}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FileIcon>
                <FileText />
              </FileIcon>
              {editingId === file.id ? (
                <>
                  <FileNameInput
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveEdit(file.id);
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    autoFocus
                  />
                  <FileActions>
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveEdit(file.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Check />
                    </ActionButton>
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelEdit();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X />
                    </ActionButton>
                  </FileActions>
                </>
              ) : (
                <>
                  <FileName>{file.name}</FileName>
                  <FileActions>
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(file.id, file.name);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit />
                    </ActionButton>
                  </FileActions>
                </>
              )}
            </FileItem>
          ))}
        </AnimatePresence>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
