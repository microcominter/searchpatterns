import React, { useState, useEffect } from 'react';
import '../../assets/css/FormattedText.css'; // Make sure to create this CSS file

const FormattedText = ({ text }) => {
  const [formattedText, setFormattedText] = useState('');
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const formatText = (text) => {
      // Escape HTML characters to prevent XSS attacks
      text = text.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;");

      // Format strong text
      let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Extract code blocks and replace them with placeholders
      const codeBlocks = [];
      formattedText = formattedText.replace(/```([\s\S]*?)```/g, (match, code) => {
        codeBlocks.push(code);
        return `{{CODE_BLOCK_${codeBlocks.length - 1}}}`;
      });

      // Replace numbers with a newline and a list item
      formattedText = formattedText.replace(/(\d+\.) /g, '\n<li>$1 ');

      // Wrap all list items in <ul> tags
      formattedText = formattedText.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');

      // Remove multiple <ul> tags and nest items properly
      formattedText = formattedText.replace(/<\/ul>\s*<ul>/g, '');

      // Convert double newlines to paragraph tags
      formattedText = formattedText.replace(/\n\n/g, '</p><p>');

      // Ensure each list item starts on a new line
      formattedText = formattedText.replace(/\n<li>/g, '<li>');

      // Restore code blocks from placeholders
      codeBlocks.forEach((codeBlock, index) => {
        formattedText = formattedText.replace(`{{CODE_BLOCK_${index}}}`, 
          `<div class="code-container">
            <pre><code>${codeBlock}</code></pre>
            <button class="copy-button" onclick="copyToClipboard(${index})">Copy</button>
           </div>`);
      });

      // Wrap everything in a paragraph tag
      formattedText = `<p>${formattedText}</p>`;

      return { formattedText, codeBlocks };
    };

    const { formattedText, codeBlocks } = formatText(text);
    setFormattedText(formattedText);
    setCodeBlocks(codeBlocks);
  }, [text]);

  const copyToClipboard = (index) => {
    const code = codeBlocks[index];
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: formattedText }} />
  );
};

export default FormattedText;
