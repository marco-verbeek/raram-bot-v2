import axios from 'axios';
import { config } from 'dotenv';
config();

const instance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
});

const getProfile = (id: string) => {
  return instance
    .get('/stats/summoners/' + id)
    .then((response) => response.data);
};

const getAccount = (id: string) => {
  return instance.get('/accounts/' + id).then((response) => response.data);
};

const getLastPlayedMatchId = (discordId: string) => {
  return instance
    .get('/accounts/' + discordId + '/last-game')
    .then((response) => response.data);
};

const getMatchAnalysis = (matchId: string) => {
  return instance
    .get('/analyses/' + matchId, { timeout: 10000 })
    .then((response) => response.data);
};

const getAccountVerification = (discordId: string, summonerName: string) => {
  return instance
    .get('/accounts/verify/' + discordId + '/' + summonerName)
    .then((response) => response.data);
};

const getChampionStats = (championName: string) => {
  return instance
    .get('/stats/champions/' + championName)
    .then((response) => response.data);
};

const getLeaderboards = () => {
  return instance.get('/leaderboards').then((response) => response.data);
};

export {
  getProfile,
  getAccount,
  getLastPlayedMatchId,
  getMatchAnalysis,
  getAccountVerification,
  getChampionStats,
  getLeaderboards,
};
