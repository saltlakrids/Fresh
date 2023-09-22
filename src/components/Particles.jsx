import React from 'react';
import Particles from 'react-tsparticles';
import particlesConfig from '../config/particles-config';

const MyParticles = ({ backgroundConfig }) => {
  const updatedParticlesConfig = {
    ...particlesConfig,
    background: backgroundConfig,
  };

  return <Particles params={updatedParticlesConfig} />;
};

export default MyParticles;
