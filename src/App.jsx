import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import Home from './components/Home';
import CodeEditor from './components/Editor';

const AppContainer = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Helmet>
          <title>Aurora</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<CodeEditor />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
