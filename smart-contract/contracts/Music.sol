// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicToken is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => Music) private _musics;

    struct Music {
        string title;
        string artist;
        int year;
        string ipfsHash;
    }

    constructor(
        address initialOwner
    ) ERC721("SpotifyWeb3", "SW3") Ownable(initialOwner) {}

    function safeMint(
        string memory title,
        string memory artist,
        string memory ipfsHash,
        int year,
        address to
    ) external returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _musics[tokenId] = Music(title, artist, year, ipfsHash);
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, ipfsHash);
        return tokenId;
    }

    function getMusic(
        uint256 tokenId
    )
        external
        view
        returns (
            string memory title,
            string memory artist,
            string memory ipfsHash,
            int year
        )
    {
        Music storage music = _musics[tokenId];
        return (music.title, music.artist, music.ipfsHash, music.year);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
