// recording.js
export const startRecording = async (
  setRecording,
  setTranscript,
  mediaRecorderRef,
  audioChunksRef,
  recognitionRef
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      audioChunksRef.current = [];
    };

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setTranscript((prevTranscript) => prevTranscript + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onend = () => {
      setRecording(false);
    };

    mediaRecorderRef.current = mediaRecorder;
    recognitionRef.current = recognition;

    mediaRecorder.start();
    recognition.start();
    setRecording(true);

    setTranscript('');  // Clear the previous transcript
    audioChunksRef.current = [];  // Clear the previous audio chunks

  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
};

export const stopRecording = (
  setRecording,
  mediaRecorderRef,
  recognitionRef
) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
  }
  if (recognitionRef.current) {
    recognitionRef.current.stop();
  }
  
  setRecording(false);
};


export const formatAnswer = (text) => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formattedText = formattedText.replace(/\n\* /g, '<li>');
  formattedText = formattedText.replace(/<\/li>\n/g, '</li>');
  formattedText = formattedText.replace(/(\* <li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  formattedText = formattedText.replace(/\n\n/g, '</p><p>');
  formattedText = `<p>${formattedText}</p>`;
  return formattedText;
};

// export const fetchAnswer = async (transcript, setResTobeSend) => {
//   if (transcript.length > 0) {
//     try {
//       const response = await axios.post(
//         'https://microcominternationals.com/api/get-answer',
//         { api_key: apiKey, prompt: transcript },
//         { headers: { 'Accept': 'application/json' } }
//       );

//       const fullAnswer = formatAnswer(response.data.answer);
//       setResTobeSend(fullAnswer);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
// };
