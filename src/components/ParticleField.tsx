import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  isListening: boolean;
  isSpeaking: boolean;
  volume: number;
  frequency: number[];
}

function InnerSphere({ isListening, isSpeaking, frequency }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!)
  const particleCount = 1500
  const radius = 3

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color = new THREE.Color()

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      if (isSpeaking) {
        color.set(Math.random() > 0.5 ? 0xff00ff : 0xffffff);
      } else if (isListening) {
        color.set(Math.random() > 0.5 ? 0x00ffff : 0x87cefa);
      } else {
        color.set(Math.random() > 0.5 ? 0x00ffff : 0xffffff);
      }
      color.toArray(colors, i3)
    }
    return [positions, colors]
  }, [isListening, isSpeaking])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      const audioLevel = isListening && frequency.length > 0 ? frequency.reduce((a: number, b: number) => a + b, 0) / frequency.length / 255 : 0;
      ref.current.scale.setScalar(1 + audioLevel * 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial size={0.1} vertexColors sizeAttenuation transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </Points>
  )
}

function OuterSphere({ isListening, isSpeaking, frequency }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!)
  const particleCount = 3500
  const radius = 8

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color = new THREE.Color()

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      if (isSpeaking) {
        color.set(Math.random() > 0.8 ? 0xff00ff : 0xffffff);
      } else if (isListening) {
        color.set(Math.random() > 0.8 ? 0x00ffff : 0x87cefa);
      } else {
        color.set(Math.random() > 0.8 ? 0x00ffff : 0xffffff);
      }
      color.toArray(colors, i3)
    }
    return [positions, colors]
  }, [isListening, isSpeaking])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      const audioLevel = isListening && frequency.length > 0 ? frequency.reduce((a: number, b: number) => a + b, 0) / frequency.length / 255 : 0;
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + audioLevel * 0.1);
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial size={0.08} vertexColors sizeAttenuation transparent opacity={0.7} blending={THREE.AdditiveBlending} />
    </Points>
  )
}

function SynapticLines({ isListening, frequency, isSpeaking }: ParticleFieldProps) {
  const ref = useRef<THREE.LineSegments>(null!)
  const numLines = 100

  const lines = useMemo(() => {
    const points = []
    for (let i = 0; i < numLines; i++) {
      points.push(new THREE.Vector3(), new THREE.Vector3())
    }
    return points
  }, [numLines])

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      const audioLevel = isListening && frequency.length > 0 ? frequency.reduce((a: number, b: number) => a + b, 0) / frequency.length / 255 : 0

      for (let i = 0; i < numLines; i++) {
        if (Math.random() > 0.95 || (isListening && Math.random() > 0.8)) {
          const i6 = i * 6
          const innerRadius = 3 * (1 + audioLevel * 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
          const outerRadius = 8 * (1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + audioLevel * 0.1)

          const theta1 = Math.random() * Math.PI * 2
          const phi1 = Math.acos(2 * Math.random() - 1)
          positions[i6] = innerRadius * Math.sin(phi1) * Math.cos(theta1)
          positions[i6 + 1] = innerRadius * Math.sin(phi1) * Math.sin(theta1)
          positions[i6 + 2] = innerRadius * Math.cos(phi1)

          const theta2 = theta1 + (Math.random() - 0.5) * 0.5
          const phi2 = phi1 + (Math.random() - 0.5) * 0.5
          positions[i6 + 3] = outerRadius * Math.sin(phi2) * Math.cos(theta2)
          positions[i6 + 4] = outerRadius * Math.sin(phi2) * Math.sin(theta2)
          positions[i6 + 5] = outerRadius * Math.cos(phi2)
        } else {
            const i6 = i * 6
            positions.fill(0, i6, i6 + 6)
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={numLines * 2}
          array={new Float32Array(lines.flatMap(p => p.toArray()))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={isSpeaking ? 0xff00ff : 0x00ffff} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
    </lineSegments>
  )
}

export default function ParticleField(props: ParticleFieldProps) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <InnerSphere {...props} />
        <OuterSphere {...props} />
        <SynapticLines {...props} />
      </Canvas>
    </div>
  )
}
