
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

function StarField() {
  const points = useRef<THREE.Points>(null);
  const positions = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta / 10;
      points.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.002}
          sizeAttenuation={true}
          transparent={true}
          color="#9b87f5"
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export const DreamCanvas = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] as [number, number, number] }}>
        <StarField />
      </Canvas>
    </div>
  );
};
