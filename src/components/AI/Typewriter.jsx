import React, { useState, useEffect } from 'react';
import '../../assets/css/typewriter.css'; // Import the CSS file
import { formatText } from '../../utils/aihelper.js';
import '../../assets/css/FormattedText.css'


const Typewriter = ({ text, typingSpeed = 5 ,onComplete , pre=false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const { formattedText, codeBlocks } = formatText(text);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < formattedText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(formattedText.substring(0, index + 1));
        setIndex(index + 1); 
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if(onComplete){
      onComplete();
      // Attach copy-to-clipboard functionality
      const copyIcons = document.querySelectorAll('.copy-icon');

      copyIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
          const index = icon.getAttribute('data-code-index');
          const code = codeBlocks[index];
          navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard');
          }).catch(err => {
            console.error('Failed to copy text: ', err);
          });
        });
      });

      // Cleanup event listeners
      return () => {
        copyIcons.forEach((icon) => {
          icon.removeEventListener('click', () => {});
        });
      };
    }
  }, [formattedText, index, typingSpeed, codeBlocks]);

  if(!pre){

    return (
      <div dangerouslySetInnerHTML={{ __html: displayedText }} />
    );
  }else{
    return (
      <div className="typewriter" dangerouslySetInnerHTML={{ __html: formattedText }} />
      );
  }
};

export default Typewriter;
