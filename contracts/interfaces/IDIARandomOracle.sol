// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDIARandomOracle {
    struct Random {
        string randomness;
        string signature;
        string previousSignature;
    }

    function setRandomValue(
        uint256 _round,
        string memory _randomness,
        string memory _signature,
        string memory _previousSignature
    ) external;

    function getValue(uint256 _round) external view returns (Random memory);

    function updateOracleUpdaterAddress(
        address newOracleUpdaterAddress
    ) external;

    function getRandomValueFromRound(
        uint256 _round
    ) external view returns (string memory);

    function getRandomValueFromRoundWithSignature(
        uint256 _round
    ) external view returns (Random memory);

    function getLastRound() external view returns (uint256);

    event OracleUpdate(string key, uint128 value, uint128 timestamp);
    event UpdaterAddressChange(address newUpdater);
}
