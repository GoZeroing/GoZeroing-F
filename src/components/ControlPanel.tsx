import styled from 'styled-components'
import { Settings, Phone, PhoneOff } from 'lucide-react'

interface ControlPanelProps {
  isListening: boolean
  onToggleListening: () => void
  onSettings: () => void
}

const Panel = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  align-items: center;
`

const ControlButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => {
    switch (props.variant) {
      case 'primary':
        return 'linear-gradient(135deg, rgba(0, 255, 136, 0.9), rgba(102, 126, 234, 0.9))'
      case 'danger':
        return 'linear-gradient(135deg, rgba(255, 71, 87, 0.9), rgba(255, 165, 2, 0.9))'
      default:
        return 'rgba(255, 255, 255, 0.1)'
    }
  }};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'primary':
        return 'rgba(0, 255, 136, 0.5)'
      case 'danger':
        return 'rgba(255, 71, 87, 0.5)'
      default:
        return 'rgba(255, 255, 255, 0.2)'
    }
  }};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`

const StatusText = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-align: center;
`

export default function ControlPanel({
  isListening,
  onToggleListening,
  onSettings
}: ControlPanelProps) {
  return (
    <>
      <StatusText>
        {isListening
          ? 'Listening... Speak now'
          : 'Click the microphone to start'
        }
      </StatusText>

      <Panel>
        <ControlButton
          variant={isListening ? 'danger' : 'primary'}
          onClick={onToggleListening}
          title={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? (
            <PhoneOff size={20} color="white" />
          ) : (
            <Phone size={20} color="white" />
          )}
        </ControlButton>

        <ControlButton
          variant="secondary"
          onClick={onSettings}
          title="Settings"
        >
          <Settings size={20} color="white" />
        </ControlButton>
      </Panel>
    </>
  )
}
