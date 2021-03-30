import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import mice from "./images/mice.png";
export default function SpeechToText(props) {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  if(transcript !== "") {
      setTimeout(()=>{props.showSpeech(transcript); resetTranscript(); SpeechRecognition.stopListening();}, 1000);
  }

  return(
      <div className="speeh-to-text">
    <img onClick={()=>{SpeechRecognition.startListening(); props.showSpeech(transcript, false)}} src={mice} alt="mice"/>
  </div>
  )
}
