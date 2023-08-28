//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interfaces/IDIARandomOracle.sol";
import "./EncryptionContract.sol";

contract FetchRandomWords is EncryptionContract {
    address public randomOracle;

    // map rollers to requestIds
    mapping(address => uint256) private s_rollers;
    // map vrf results to rollers
    mapping(address => uint256) private s_results;
    //map users address to request time
    mapping(address => uint256) private s_lastRequestTime;

    event DiceRolled(uint256 indexed requestId, address indexed roller);

    constructor(
        address oracle,
        bytes32 _secretKey
    ) EncryptionContract(_secretKey) {
        randomOracle = oracle;
    }

    function getRandomValue(
        uint256 _round
    ) public view returns (string memory) {
        return IDIARandomOracle(randomOracle).getRandomValueFromRound(_round);
    }

    function fetchDailyWord() public {
        require(
            block.timestamp >= s_lastRequestTime[msg.sender] + 1 days,
            "Can only request once per day"
        );
        s_lastRequestTime[msg.sender] = block.timestamp;

        uint requestId = IDIARandomOracle(randomOracle).getLastRound();
        s_rollers[msg.sender] = requestId;

        emit DiceRolled(requestId, msg.sender);
    }

    function rollDice() public {
        // require(seed1 > 0, "Player 1 needs to commit their seed!");
        // require(seed2 > 0, "Player 2 needs to commit their seed!");
        require(
            block.timestamp >= s_lastRequestTime[msg.sender] + 1 days,
            "Can only request once per day"
        );
        uint latestRoundId = s_rollers[msg.sender];
        uint _round = latestRoundId + 2;

        require(
            IDIARandomOracle(randomOracle).getLastRound() >= _round,
            "Wait for the randmoness round to roll your dice."
        );

        string memory rand = getRandomValue(_round);
        uint256 playerResult = (uint256(keccak256(abi.encodePacked(rand))) +
            s_lastRequestTime[msg.sender]) % 261;

        s_results[msg.sender] = playerResult;

        emit DiceRolled(latestRoundId, msg.sender);
    }

    function word() public view returns (bytes32[5] memory) {
        require(s_results[msg.sender] != 0, "Dice not rolled");
        string memory userWord = getWord(s_results[msg.sender]);

        return encryptWord(userWord);
    }

    /**
     * @notice Get the word name from the id
     * @param id uint256
     * @return word name string
     */
    function getWord(uint256 id) private pure returns (string memory) {
        string[261] memory words = [
            "there",
            "their",
            "about",
            "would",
            "these",
            "other",
            "words",
            "could",
            "write",
            "first",
            "water",
            "after",
            "where",
            "right",
            "think",
            "three",
            "years",
            "place",
            "sound",
            "great",
            "again",
            "still",
            "every",
            "small",
            "found",
            "those",
            "never",
            "under",
            "might",
            "while",
            "house",
            "world",
            "below",
            "asked",
            "going",
            "large",
            "until",
            "along",
            "shall",
            "being",
            "often",
            "earth",
            "began",
            "since",
            "study",
            "night",
            "light",
            "above",
            "paper",
            "parts",
            "young",
            "story",
            "point",
            "times",
            "heard",
            "whole",
            "white",
            "given",
            "means",
            "music",
            "miles",
            "thing",
            "today",
            "later",
            "using",
            "money",
            "lines",
            "order",
            "group",
            "among",
            "learn",
            "known",
            "space",
            "table",
            "early",
            "trees",
            "short",
            "hands",
            "state",
            "black",
            "shown",
            "stood",
            "front",
            "voice",
            "kinds",
            "makes",
            "comes",
            "close",
            "power",
            "lived",
            "vowel",
            "taken",
            "built",
            "heart",
            "ready",
            "quite",
            "class",
            "bring",
            "round",
            "horse",
            "shows",
            "piece",
            "green",
            "stand",
            "birds",
            "start",
            "river",
            "tried",
            "least",
            "field",
            "whose",
            "girls",
            "leave",
            "added",
            "color",
            "third",
            "hours",
            "moved",
            "plant",
            "doing",
            "names",
            "forms",
            "heavy",
            "ideas",
            "cried",
            "check",
            "floor",
            "begin",
            "woman",
            "alone",
            "plane",
            "spell",
            "watch",
            "carry",
            "wrote",
            "clear",
            "named",
            "books",
            "child",
            "glass",
            "human",
            "takes",
            "party",
            "build",
            "seems",
            "blood",
            "sides",
            "seven",
            "mouth",
            "solve",
            "north",
            "value",
            "death",
            "maybe",
            "happy",
            "tells",
            "gives",
            "looks",
            "shape",
            "lives",
            "steps",
            "areas",
            "sense",
            "speak",
            "force",
            "ocean",
            "speed",
            "women",
            "metal",
            "south",
            "grass",
            "scale",
            "cells",
            "lower",
            "sleep",
            "wrong",
            "pages",
            "ships",
            "needs",
            "rocks",
            "eight",
            "major",
            "level",
            "total",
            "ahead",
            "reach",
            "stars",
            "store",
            "sight",
            "terms",
            "catch",
            "works",
            "board",
            "cover",
            "songs",
            "equal",
            "stone",
            "waves",
            "guess",
            "dance",
            "spoke",
            "break",
            "cause",
            "radio",
            "weeks",
            "lands",
            "basic",
            "liked",
            "trade",
            "fresh",
            "final",
            "fight",
            "meant",
            "drive",
            "spent",
            "local",
            "waxes",
            "knows",
            "train",
            "bread",
            "homes",
            "teeth",
            "coast",
            "thick",
            "brown",
            "clean",
            "quiet",
            "sugar",
            "facts",
            "steel",
            "forth",
            "rules",
            "notes",
            "units",
            "peace",
            "month",
            "verbs",
            "seeds",
            "helps",
            "sharp",
            "visit",
            "woods",
            "chief",
            "walls",
            "cross",
            "wings",
            "grown",
            "cases",
            "foods",
            "crops",
            "fruit",
            "stick",
            "wants",
            "stage",
            "sheep",
            "nouns",
            "plain",
            "drink",
            "bones",
            "apart",
            "turns"
        ];
        return words[id];
    }
}
