// STAKING TOKEN HAS BEEN DEPLOYED TO ________ 0xfbF1E570d7d8AE46fBD2da9cb66427Db55638771
// STAKING CONTRACT HAS BEEN DEPLOYED TO ________ 0xd5148FA685322D8105c927Eb6940A2b4aDec6D79
// GAME CONTRACT HAS BEEN DEPLOYED TO ________ 0x4752d7864041872aeB1F6315216183b84411660B
// SUCCESSFULLY SENT 95 PERCENT , TXN HASH IS _____ 0x00f5941b7edfaac2a776cea942aabdf01051e900f5e6cd3994827f5e101a03e6
// FetchRandomWords was successfully deployed to _______ 0x6Ea2F4B47ffFaAE5D465C5Ac5F081f48c9271F36
import stakingContractabi from "./abis/Staking.abi.json";
import stakingToken from "./abis/StakingToken.abi.json";
import gameContractabi from "./abis/GameContract.abi.json";
import fetchRandomWords_abi from "./abis/FetchRandomWords.abi.json";

export const stakingTokens = "0xfbF1E570d7d8AE46fBD2da9cb66427Db55638771";
export const stakingContract = "0xd5148FA685322D8105c927Eb6940A2b4aDec6D79";
export const gameContract = "0x4752d7864041872aeB1F6315216183b84411660B";
export const fetchRandomWordsContract =
  "0x6Ea2F4B47ffFaAE5D465C5Ac5F081f48c9271F36";

export const stakingabit = stakingContractabi;
export const stakingTokenabi = stakingToken;
export const gameabi = gameContractabi;
export const fetchRandomWordsabi = fetchRandomWords_abi;
