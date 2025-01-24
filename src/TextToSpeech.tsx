import React, { useState, useEffect } from 'react';

const TextToSpeech = ({ text }: { text: string }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length === 0) return;
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]);
      setIsLoading(false);
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }, []);

  // Function to speak the text with current settings
  const speakText = (text: string) => {
    if (text === '') {
      alert('Please enter some text to speak!');
      return;
    }

    if (isLoading || !selectedVoice) {
      alert('Voices are still loading, please wait.');
      return;
    }

    // Stop any current speech before starting a new one
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    speechSynthesis.speak(utterance);
  };

  // Automatically speak the text whenever it changes
  useEffect(() => {
    if (text) {
      speakText(text);
    }
  }, [text]); // Re-run when 'text' prop changes

  return (
    <div>
      {isLoading ? (
        <p>Loading voices...</p>
      ) : (
        <div>
          <label>Choose Voice:</label>
          <select onChange={(e) => setSelectedVoice(voices.find(voice => voice.name === e.target.value) || null)} value={selectedVoice?.name || ''}>
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <br />
          <label>Pitch: {pitch.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
          />
          <br />
          <label>Rate: {rate.toFixed(2)}</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
          />
          <br />
          <label>Volume: {volume.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
