import { useState } from 'react'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'

function AudioPlayer({ text }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [utterance, setUtterance] = useState(null)

  const synth = window.speechSynthesis

  const handlePlay = () => {
    if (isPlaying) {
      synth.pause()
      setIsPlaying(false)
      return
    }

    const newUtterance = new SpeechSynthesisUtterance(text)
    newUtterance.onend = () => setIsPlaying(false)
    synth.speak(newUtterance)
    setUtterance(newUtterance)
    setIsPlaying(true)
  }

  const handleStop = () => {
    synth.cancel()
    setIsPlaying(false)
  }

  return (
    <div className="flex space-x-4 mt-4">
      <button onClick={handlePlay} className="bg-green-500 text-white p-2 rounded flex items-center space-x-2 hover:bg-green-600 transition">
        {isPlaying ? <FaPause /> : <FaPlay />} {isPlaying ? 'Pause' : 'Play Audio'}
      </button>
      <button onClick={handleStop} className="bg-red-500 text-white p-2 rounded flex items-center space-x-2 hover:bg-red-600 transition">
        <FaStop /> Stop
      </button>
    </div>
  )
}

export default AudioPlayer