import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Code, Settings, Save, Home as HomeIcon, Sun, Moon, Settings as SettingsIcon, Download, Eraser, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: var(--editor-bg);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #61DAFB 0%, #0078d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(135deg, #61DAFB 0%, #0078d4 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4rem;
  box-shadow: 0 4px 15px rgba(0, 120, 212, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 120, 212, 0.3);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
`;

const FeatureCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid var(--border-color);
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #0078d4;

  svg {
    width: 32px;
    height: 32px;
    stroke-width: 1.5;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code />,
      title: 'Smart Editor',
      description: 'Powerful code editor with syntax highlighting and auto-completion'
    },
    {
      icon: <Settings />,
      title: 'Customizable',
      description: 'Personalize your coding environment with themes and settings'
    },
    {
      icon: <Save />,
      title: 'File Management',
      description: 'Create, save, and organize your code files with ease'
    }
  ];

  return (
    <HomeContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Aurora
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        A modern, lightweight code editor for the web
      </Subtitle>
      <StartButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/editor')}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Start Coding
      </StartButton>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default Home;
