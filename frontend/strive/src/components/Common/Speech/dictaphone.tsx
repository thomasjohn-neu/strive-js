import React, { useEffect, useCallback } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const appId = '1b6a0968-ba9d-447c-b729-c67b0d410b6a';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

interface Props {
  voiceTextupdate: (tab: string) => void;
}

const Dictaphone = (props: Props) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const updateTextDescriptionOverVoice = useCallback(
    (newText: string) => {
      props.voiceTextupdate(newText);
    },
    [props.voiceTextupdate]
  );

  useEffect(() => {
    if (transcript) {
      updateTextDescriptionOverVoice(transcript);
    }
  }, [transcript, updateTextDescriptionOverVoice]);

  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button
        type="button"
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >
        Hold to talk
      </button>
      {/* <p>{transcript}</p> */}
    </div>
  );
};

export default Dictaphone;
