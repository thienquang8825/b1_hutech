//import { useEffect } from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  /*useEffect(() => {
            SpeechRecognition.startListening({ continuous: true })
            console.log("listening starts")
      }, [])*/

  if (!browserSupportsSpeechRecognition) {
    return <span>Trinh duyet khong ho tro chuc nang nay</span>
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <textarea
        id='textarea'
        defaultValue={transcript}
        cols='50'
        rows='10'
      ></textarea>
      <button onClick={resetTranscript}>Reset </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          SpeechRecognition.startListening({ continuous: true })
          console.log('listening starts')
        }}
      >
        Start Listening
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          SpeechRecognition.stopListening()
          console.log('listening stops')
        }}
      >
        Stop Listening
      </button>
    </div>
  )
}

export default SpeechToText
