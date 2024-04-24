import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const musicModule = buildModule('MusicModule', (m) => {
  const music = m.contract('MusicToken', [
    '0x1A2cDc9Ea7dFc55aeaDb314bB8C3b09E938c989b',
  ]);

  return { music };
});

export default musicModule;
