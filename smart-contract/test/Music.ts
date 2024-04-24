import { expect } from 'chai';
import hre from 'hardhat';
import { getAddress, parseGwei } from 'viem';

const ownerAdress: `0x${string}` = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const deploy = async () => {
  const contract = await hre.viem.deployContract('MusicToken', [ownerAdress]);
  return contract;
};

describe('MusicToken', function () {
  it('should deploy Music contract', async function () {
    const contract = await deploy();
    expect(contract.address).to.not.be.undefined;
  });

  it('should mint tokens', async function () {
    const contract = await deploy();
    const mint = await contract.write.safeMint([
      'test',
      'teyik0',
      'hash',
      BigInt(2024),
      ownerAdress,
    ]);
    expect(mint).to.not.be.undefined;

    const mintToOther = await contract.write.safeMint([
      'test',
      'teyik0',
      'hash',
      BigInt(2024),
      '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
    ]);
    expect(mintToOther).to.not.be.undefined;
  });

  it('should get token', async function () {
    const contract = await deploy();
    const mint = await contract.write.safeMint([
      'test',
      'teyik0',
      'hash',
      BigInt(2024),
      ownerAdress,
    ]);
    const token = await contract.read.getMusic([BigInt(0)]);
    expect(token[0]).to.be.equal('test');
    expect(token[1]).to.be.equal('teyik0');
    expect(token[2]).to.be.equal('hash');
    expect(token[3]).to.be.equal(BigInt(2024));
  });
});
