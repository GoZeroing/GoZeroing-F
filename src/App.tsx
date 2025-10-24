import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import ParticleField from './components/ParticleField'
import VoiceVisualizer from './components/VoiceVisualizer'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--dark-bg);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const MainInterface = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`



interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  volume: number
  frequency: number[]
}

function App() {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    volume: 0,
    frequency: []
  })

    const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's') {
        setVoiceState(prev => ({ ...prev, isSpeaking: !prev.isSpeaking }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      const source = audioContextRef.current!.createMediaStreamSource(stream)
      const analyser = audioContextRef.current!.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      setVoiceState(prev => ({ ...prev, isListening: true }))

      // Start frequency analysis
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const updateFrequency = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray)
          const frequency = Array.from(dataArray).slice(0, 32) // Take first 32 bins
          setVoiceState(prev => ({
            ...prev,
            frequency,
            volume: frequency.reduce((sum, val) => sum + val, 0) / frequency.length
          }))
        }
        requestAnimationFrame(updateFrequency)
      }

      updateFrequency()

    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopListening = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      mediaStreamRef.current = null
    }
    setVoiceState(prev => ({ ...prev, isListening: false, volume: 0, frequency: [] }))
  }

  const toggleListening = () => {
    if (voiceState.isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <AppContainer>
      <ParticleField
        isListening={voiceState.isListening}
        isSpeaking={voiceState.isSpeaking}
        volume={voiceState.volume}
        frequency={voiceState.frequency}
      />

      <MainInterface>
        <VoiceVisualizer onToggleListening={toggleListening} />
      </MainInterface>
    </AppContainer>
  )
}

export default App
