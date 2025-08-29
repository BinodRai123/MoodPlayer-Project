import FaceRecognition from './faceRecognition'
import AudioPlayer from './components/audioPlayer'
import { useState } from 'react'

const App = () => {
  const [songs, setSongs] = useState([])
  return (
    <div>
      <FaceRecognition setSongs={setSongs} />
      <AudioPlayer songs={songs} />
    </div>
  )
}

export default App
