import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function PrismScene({
  radius,
  sideNumber
}: {
  radius: number,
  sideNumber: number
}) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        shadows
        camera={{ position: [0, 20, 40], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <Prism radius={radius} sideNumber={sideNumber} />
      </Canvas>
    </div>
  );
}

function Prism({
  radius,
  sideNumber
}: {
  radius: number,
  sideNumber: number
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef(new THREE.Quaternion());

  const baseArea = (sideNumber / 2) * radius * radius * Math.sin((2 * Math.PI) / sideNumber);

  const perimeter = 2 * sideNumber * radius * Math.sin(Math.PI / sideNumber);

  const height = (1500 - 2 * baseArea) / perimeter;

  const applyRotation = (dx: number, dy: number) => {
    if (!meshRef.current) return;

    const axisX = new THREE.Vector3(1, 0, 0);
    const axisY = new THREE.Vector3(0, 1, 0);

    const qX = new THREE.Quaternion().setFromAxisAngle(axisX, dy);
    const qY = new THREE.Quaternion().setFromAxisAngle(axisY, dx);

    const delta = qY.multiply(qX);

    meshRef.current.quaternion.premultiply(delta);
    velocity.current.copy(delta);
  };

  useFrame(() => {
    if (!meshRef.current || isDragging.current) return;
    velocity.current.slerp(new THREE.Quaternion(), 0.08);
    meshRef.current.quaternion.premultiply(velocity.current);
  });

  const onPointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: any) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - prevPointer.current.x) * 0.01;
    const dy = (e.clientY - prevPointer.current.y) * 0.01;
    applyRotation(dx, dy);
    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <cylinderGeometry args={[radius, radius, height, sideNumber]} />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}