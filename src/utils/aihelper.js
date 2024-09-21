// formatText.js

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
        <button class="copy-button" data-code-index="${index}"><Clipboard2/> Copy</button>
        </div>`);
      });
      // <Clipboard2 class="copy-icon" data-code-index="${index}" />
      
  // Wrap everything in a paragraph tag
  formattedText = `<p>${formattedText}</p>`;

  return { formattedText, codeBlocks };
};





  const extractSummaryText = (html) => {
    const regex = /<strong>(.*?)<\/strong>/g;
    const matches = [];
    let match;
  
    while ((match = regex.exec(html)) !== null) {
      matches.push(match[1]);
    }
  
    return matches.join(', ');
  };
  

  const formatRelatedQuestions = (relatedQueriesObj) => {
    // Convert the object to an array of its values
    const questionsArray = Object.values(relatedQueriesObj);
  
    // Filter out the introductory sentence and any non-question strings
    const questions = questionsArray.filter(q => /^\d+\.\s/.test(q));
  
    // Remove the leading numbers and periods, then trim any extra spaces
    return questions.map(q => q.replace(/^\d+\.\s/, '').trim());
  };

  export {formatText,extractSummaryText,formatRelatedQuestions}; 