import styled from 'styled-components';

interface VoiceVisualizerProps {
  onToggleListening: () => void;
}

const VisualizerContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function VoiceVisualizer({ onToggleListening }: VoiceVisualizerProps) {
  return (
    <VisualizerContainer onClick={onToggleListening}>
      {/* The main particle field is now the only visible element */}
    </VisualizerContainer>
  );
}
