import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Sun, Moon, Settings as SettingsIcon, Download, Eraser, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SettingsComponent from './Settings';
import Sidebar from './Sidebar';

const EditorContainer = styled(motion.div)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--editor-bg);
  margin-left: ${props => props.sidebarWidth}px;
  transition: margin-left 0.2s ease;
  position: relative;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--toolbar-bg);
  border-bottom: 1px solid var(--border-color);
`;

const ToolbarGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.5;
  }

  &:hover {
    background: var(--hover-bg);
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background: var(--editor-bg);
`;

const StatusBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  background: var(--toolbar-bg);
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-secondary);
  z-index: 10;

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 11px;
  }
`;

const CodeEditor = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('vs-dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    language: 'javascript',
    fontSize: 14,
    minimap: true,
    lineNumbers: true,
    wordWrap: false,
  });
  const [code, setCode] = useState('// Welcome to Code Canvas!\n// Start coding here...\n');
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [activeFile, setActiveFile] = useState('untitled.js');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [fileContents, setFileContents] = useState({
    'untitled.js': '// Welcome to Code Canvas!\n// Start coding here...\n'
  });

  const handleFileChange = (fileName, language, content) => {
    // Save current file content before switching
    setFileContents(prev => ({
      ...prev,
      [activeFile]: code
    }));

    setActiveFile(fileName);
    if (language) {
      setSettings(prev => ({ ...prev, language }));
    }
    // Use saved content or provided content or default
    const newContent = content || fileContents[fileName] || '// Start coding here...\n';
    setCode(newContent);
  };

  const handleNewFile = (file) => {
    // Save current file content
    setFileContents(prev => ({
      ...prev,
      [activeFile]: code,
      [file.name]: file.content
    }));

    setActiveFile(file.name);
    setCode(file.content);
  };

  const handleEditorChange = (value) => {
    setCode(value);
    // Update file contents in state
    setFileContents(prev => ({
      ...prev,
      [activeFile]: value
    }));
  };

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column,
      });
    });

    // Configure auto-closing pairs for different languages
    monaco.languages.getLanguages().forEach(lang => {
      monaco.languages.setLanguageConfiguration(lang.id, {
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
          { open: '`', close: '`' },
          { open: '<', close: '>' },
        ],
        autoCloseBefore: '> ) } ] } \' " `',
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
          { open: '`', close: '`' },
          { open: '<', close: '>' },
        ]
      });
    });

    // Add HTML tag auto-closing
    if (settings.language === 'html') {
      editor.onKeyDown((e) => {
        if (e.keyCode === monaco.KeyCode.Enter) {
          const model = editor.getModel();
          const position = editor.getPosition();
          const lineContent = model.getLineContent(position.lineNumber - 1);
          
          // Check if the previous line contains an opening HTML tag
          const tagMatch = lineContent.match(/<(\w+)[^>]*>(?!.*<\/\1>)/);
          if (tagMatch) {
            const tag = tagMatch[1];
            const indent = lineContent.match(/^\s*/)[0];
            const nextIndent = indent + '  ';
            
            // Insert closing tag with proper indentation
            const insertText = `\n${nextIndent}\n${indent}</${tag}>`;
            editor.executeEdits('auto-close', [{
              range: new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
              ),
              text: insertText,
            }]);
            
            // Move cursor to the indented line
            editor.setPosition({
              lineNumber: position.lineNumber + 1,
              column: nextIndent.length + 1,
            });
            e.preventDefault();
          }
        }
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the editor?')) {
      setCode('// Start coding here...\n');
    }
  };

  const getIcon = (LightIcon, DarkIcon) => {
    return theme === 'vs-dark' ? DarkIcon : LightIcon;
  };

  return (
    <>
      <Sidebar
        activeFile={activeFile}
        onFileChange={handleFileChange}
        onNewFile={handleNewFile}
        onWidthChange={setSidebarWidth}
      />
      <EditorContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sidebarWidth={sidebarWidth}
      >
        <Toolbar>
          <ToolbarGroup>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              title="Back to Home"
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSettingsOpen(true)}
              title="Settings"
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              title={theme === 'vs-dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'vs-dark' ? <Sun /> : <Moon />}
            </IconButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              title="Copy Code"
            >
              <Copy />
            </IconButton>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              title="Download Code"
            >
              <Download />
            </IconButton>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              title="Clear Editor"
            >
              <Eraser />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <EditorWrapper>
          <Editor
            height="100%"
            language={settings.language}
            value={code}
            theme={theme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              fontSize: settings.fontSize,
              minimap: { enabled: settings.minimap },
              lineNumbers: settings.lineNumbers ? 'on' : 'off',
              wordWrap: settings.wordWrap ? 'on' : 'off',
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorSmoothCaretAnimation: true,
              cursorBlinking: 'smooth',
              padding: { top: 10, bottom: 30 },
              fontFamily: '"Fira Code", monospace',
              automaticLayout: true,
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              autoClosingDelete: 'always',
              autoIndent: 'full',
              autoSurround: 'languageDefined',
              bracketPairColorization: true,
              formatOnPaste: true,
              formatOnType: true,
              suggestOnTriggerCharacters: true,
              tabCompletion: 'on',
            }}
          />
          <StatusBar>
            <div>
              {activeFile} - {settings.language.charAt(0).toUpperCase() + settings.language.slice(1)}
            </div>
            <div>
              Ln {cursorPosition.line}, Col {cursorPosition.column}
            </div>
          </StatusBar>
        </EditorWrapper>

        <SettingsComponent
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </EditorContainer>
    </>
  );
};

export default CodeEditor;
