//import { useEffect } from "react"
import { useSelector } from 'react-redux'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import Aside from '../../components/Aside'

const SpeechToTextScreen = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const questionGetList = useSelector((state) => state.questionGetList)
  const { pages, quantity } = questionGetList

  if (!browserSupportsSpeechRecognition) {
    return <span>Trinh duyet khong ho tro chuc nang nay</span>
  }

  const type = 'speaking'
  const pageSize = 10

  return (
    <>
      <h1 className='text-center m-3'>Speaking</h1>
      <div className='row mt-3'>
        <div className='col-md-3 border'>
          <Aside
            pages={pages}
            quantity={quantity}
            pageSize={pageSize}
            type={type}
          />
        </div>
        <div className='col-md-9 border'>
          <div>
            <div className='my-3'>
              <strong>
                Microphone:{' '}
                {listening ? (
                  <span className='text-success'>on</span>
                ) : (
                  <span className='text-danger'>off</span>
                )}
              </strong>
            </div>
            <textarea
              id='textarea'
              defaultValue={transcript}
              rows='10'
              className='w-100 mb-3'
            ></textarea>
            <div className='mb-3'>
              <button
                className='btn btn-success me-3'
                onClick={(e) => {
                  e.preventDefault()
                  SpeechRecognition.startListening({ continuous: true })
                }}
              >
                Start
              </button>
              <button
                className='btn btn-danger me-3'
                onClick={(e) => {
                  e.preventDefault()
                  SpeechRecognition.stopListening()
                }}
              >
                Stop
              </button>
              <button className='btn btn-warning' onClick={resetTranscript}>
                Reset{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpeechToTextScreen
