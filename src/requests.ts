import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  timeout: 1000,
})

const getProfile = (discordId: string) => {
  return instance
    .get("/accounts/" + discordId + "/profile")
    .then(response => response.data);
}

const getAccount = (discordId: string) => {
  return instance
    .get("/accounts/" + discordId)
    .then(response => response.data);
}

const getLastPlayedMatchId = (discordId: string) => {
  return instance
    .get("/accounts/" + discordId + "/lastgame")
    .then(response => response.data);
}

const getMatchAnalysis = (matchId: string) => {
  return instance
    .get("/analyses/" + matchId)
    .then(response => response.data);
}

const getAccountVerification = (discordId: string, summonerName: string) => {
  return instance
    .get("/accounts/verify/" + discordId + "/" + summonerName)
    .then(response => response.data);
}

export {
  getProfile,
  getAccount,
  getLastPlayedMatchId,
  getMatchAnalysis,
  getAccountVerification
}