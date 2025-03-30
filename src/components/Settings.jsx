// import styled from '@emotion/styled';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Code, Type, Grid } from 'lucide-react';

// const Overlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.7);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
// `;

// const SettingsPanel = styled(motion.div)`
//   background: var(--settings-bg);
//   border-radius: 8px;
//   padding: 1.5rem;
//   width: 90%;
//   max-width: 500px;
//   max-height: 85vh;
//   overflow-y: auto;
//   color: var(--text-color);
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

//   &::-webkit-scrollbar {
//     width: 8px;
//   }

//   &::-webkit-scrollbar-track {
//     background: var(--settings-bg);
//   }

//   &::-webkit-scrollbar-thumb {
//     background: var(--border-color);
//     border-radius: 4px;
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
//   padding-bottom: 0.5rem;
//   border-bottom: 1px solid var(--border-color);
// `;

// const Title = styled.h2`
//   margin: 0;
//   font-size: 1.5rem;
//   font-weight: 600;
// `;

// const CloseButton = styled(motion.button)`
//   background: none;
//   border: none;
//   color: var(--text-color);
//   cursor: pointer;
//   padding: 0.5rem;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   svg {
//     width: 20px;
//     height: 20px;
//     stroke-width: 1.5;
//   }

//   &:hover {
//     background: var(--hover-bg);
//   }
// `;

// const Section = styled.div`
//   margin-bottom: 1.5rem;
// `;

// const SectionTitle = styled.h3`
//   display: flex;
//   align-items: center;
//   font-size: 1.1rem;
//   font-weight: 500;
//   margin-bottom: 1rem;
//   color: var(--text-color);

//   svg {
//     width: 18px;
//     height: 18px;
//     margin-right: 0.5rem;
//     stroke-width: 1.5;
//   }
// `;

// const OptionGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
//   gap: 0.75rem;
// `;

// const Option = styled(motion.button)`
//   background: var(--card-bg);
//   border: 1px solid var(--border-color);
//   border-radius: 6px;
//   padding: 0.75rem;
//   color: var(--text-color);
//   cursor: pointer;
//   transition: all 0.2s ease;
//   width: 100%;
//   text-align: center;

//   &.active {
//     background: var(--primary-color);
//     color: white;
//     border-color: var(--primary-color);
//   }

//   &:hover:not(.active) {
//     background: var(--hover-bg);
//   }
// `;

// const Settings = ({ isOpen, onClose, settings, onSettingsChange }) => {
//   if (!isOpen) return null;

//   const languages = ['javascript', 'typescript', 'python', 'html', 'css', 'json'];
//   const fontSizes = [12, 14, 16, 18, 20];

//   return (
//     <AnimatePresence>
//       <Overlay
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//       >
//         <SettingsPanel
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           onClick={e => e.stopPropagation()}
//         >
//           <Header>
//             <Title>Settings</Title>
//             <CloseButton
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onClose}
//             >
//               <X />
//             </CloseButton>
//           </Header>

//           <Section>
//             <SectionTitle>
//               <Code />
//               Language
//             </SectionTitle>
//             <OptionGrid>
//               {languages.map(lang => (
//                 <Option
//                   key={lang}
//                   className={settings.language === lang ? 'active' : ''}
//                   onClick={() => onSettingsChange('language', lang)}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {lang.charAt(0).toUpperCase() + lang.slice(1)}
//                 </Option>
//               ))}
//             </OptionGrid>
//           </Section>

//           <Section>
//             <SectionTitle>
//               <Type />
//               Font Size
//             </SectionTitle>
//             <OptionGrid>
//               {fontSizes.map(size => (
//                 <Option
//                   key={size}
//                   className={settings.fontSize === size ? 'active' : ''}
//                   onClick={() => onSettingsChange('fontSize', size)}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {size}px
//                 </Option>
//               ))}
//             </OptionGrid>
//           </Section>

//           <Section>
//             <SectionTitle>
//               <Grid />
//               Editor Options
//             </SectionTitle>
//             <OptionGrid>
//               <Option
//                 className={settings.minimap ? 'active' : ''}
//                 onClick={() => onSettingsChange('minimap', !settings.minimap)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Minimap
//               </Option>
//               <Option
//                 className={settings.lineNumbers ? 'active' : ''}
//                 onClick={() => onSettingsChange('lineNumbers', !settings.lineNumbers)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Line Numbers
//               </Option>
//               <Option
//                 className={settings.wordWrap ? 'active' : ''}
//                 onClick={() => onSettingsChange('wordWrap', !settings.wordWrap)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Word Wrap
//               </Option>
//             </OptionGrid>
//           </Section>
//         </SettingsPanel>
//       </Overlay>
//     </AnimatePresence>
//   );
// };

// export default Settings;

import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Type, Grid } from 'lucide-react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SettingsPanel = styled(motion.div)`
  background: var(--settings-bg);
  border-radius: 8px;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  color: var(--text-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--settings-bg);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CloseButton = styled(motion.button)`
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

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--text-color);

  svg {
    width: 18px;
    height: 18px;
    margin-right: 0.5rem;
    stroke-width: 1.5;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
`;

const Option = styled(motion.button)`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.75rem;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: center;

  &.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  &:hover:not(.active) {
    background: var(--hover-bg);
  }
`;

const Settings = ({ isOpen, onClose, settings, onSettingsChange }) => {
  if (!isOpen) return null;

  const languages = ['javascript', 'typescript', 'python', 'html', 'css', 'json'];
  const fontSizes = [12, 14, 16, 18, 20];

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <SettingsPanel
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <Header>
            <Title>Settings</Title>
            <CloseButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <X />
            </CloseButton>
          </Header>

          <Section>
            <SectionTitle>
              <Code />
              Language
            </SectionTitle>
            <OptionGrid>
              {languages.map(lang => (
                <Option
                  key={lang}
                  className={settings.language === lang ? 'active' : ''}
                  onClick={() => onSettingsChange('language', lang)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </Option>
              ))}
            </OptionGrid>
          </Section>

          <Section>
            <SectionTitle>
              <Type />
              Font Size
            </SectionTitle>
            <OptionGrid>
              {fontSizes.map(size => (
                <Option
                  key={size}
                  className={settings.fontSize === size ? 'active' : ''}
                  onClick={() => onSettingsChange('fontSize', size)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {size}px
                </Option>
              ))}
            </OptionGrid>
          </Section>

          <Section>
            <SectionTitle>
              <Grid />
              Editor Options
            </SectionTitle>
            <OptionGrid>
              <Option
                className={settings.minimap ? 'active' : ''}
                onClick={() => onSettingsChange('minimap', !settings.minimap)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Minimap
              </Option>
              <Option
                className={settings.lineNumbers ? 'active' : ''}
                onClick={() => onSettingsChange('lineNumbers', !settings.lineNumbers)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Line Numbers
              </Option>
              <Option
                className={settings.wordWrap ? 'active' : ''}
                onClick={() => onSettingsChange('wordWrap', !settings.wordWrap)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Word Wrap
              </Option>
            </OptionGrid>
          </Section>
        </SettingsPanel>
      </Overlay>
    </AnimatePresence>
  );
};

export default Settings;
