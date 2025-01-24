import React, { useState, useEffect, useRef } from 'react';

let recognition: any = null;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true; // Enable continuous listening
  recognition.interimResults = true; // Show real-time results as speech is detected
  recognition.lang = 'en-US'; // Set language to English
  recognition.maxAlternatives = 10; // Only keep the most confident result
}

const SpeechRecognition = ({ onSpeechRecognized }: { onSpeechRecognized: (text: string) => void }) => {
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState(''); // Real-time speech text
  const [spokenText, setSpokenText] = useState(''); // Accumulated spoken text

  // To accumulate the speech
  const accumulatedTextRef = useRef<string>(''); 

  useEffect(() => {
    if (!recognition) {
      console.log('Speech recognition not supported');
      return;
    }

    recognition.onresult = (event: any) => {
      const speechToText = event.results[event.resultIndex][0].transcript;
      setInterimText(speechToText); // Real-time speech input

      // If it's the final result, add it to the accumulated text
      if (event.results[event.resultIndex].isFinal) {
        accumulatedTextRef.current += ` ${speechToText}`; // Append final text to accumulated text
      }

      // Update the state with the full accumulated text
      setSpokenText(accumulatedTextRef.current);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event);
    };

    // Start speech recognition when mouse is pressed
    const handleMouseDown = () => {
      recognition.start(); // Start recognition when mouse is pressed
      setListening(true);  // Indicate listening is in progress
      setInterimText('');   // Clear interim text on new session
      accumulatedTextRef.current = ''; // Clear accumulated text on new session
      setSpokenText(''); // Clear spoken text state
    };

    // Stop speech recognition when mouse is released
    const handleMouseUp = () => {
      recognition.stop(); // Stop recognition when mouse is released
      setListening(false); // Indicate recognition has stopped

      // Send the full accumulated text to the parent
      onSpeechRecognized(accumulatedTextRef.current);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [recognition, onSpeechRecognized]);

  return (
    <div>
      <h3>{listening ? 'Listening...' : 'Click & Hold to Speak'}</h3>
      <p>{interimText}</p> {/* Show real-time speech input */}
      <p><strong>Full Spoken Text:</strong></p>
      <p>{spokenText}</p> {/* Show accumulated spoken text */}
      {listening && <p>Release to stop...</p>}
    </div>
  );
};

export default SpeechRecognition;
