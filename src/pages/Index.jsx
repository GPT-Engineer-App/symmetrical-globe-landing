import React, { useRef, useEffect } from 'react';
import { Container, Text, VStack, Box } from "@chakra-ui/react";
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Countdown from 'react-countdown';

const RotatingGlobe = () => {
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('https://threejsfundamentals.org/threejs/resources/images/earth.jpg', (texture) => {
      if (globeRef.current) {
        globeRef.current.material.map = texture;
        globeRef.current.material.needsUpdate = true;
      }
    });
  }, []);

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial />
    </mesh>
  );
};

const Index = () => {
  const targetDate = new Date('Sat Jul 27 2024 00:00:00 GMT+0000');

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgGradient="linear(to-r, gray.300, gray.600)">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" color="white">teleses.ai, coming soon</Text>
        <Box width="100%" height="400px">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingGlobe />
          </Canvas>
        </Box>
        <Text fontSize="lg" color="white">countdown to demo day</Text>
        <Countdown date={targetDate} renderer={({ days, hours, minutes, seconds }) => (
          <Text fontSize="lg" color="white">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</Text>
        )} />
      </VStack>
    </Container>
  );
};

export default Index;