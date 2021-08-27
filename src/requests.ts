import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
})

const getProfile = (id: string) => {
  return instance
    .get("/stats/summoners/" + id)
    .then(response => response.data);
}

const getAccount = (id: string) => {
  return instance
    .get("/accounts/" + id)
    .then(response => response.data);
}

const getLastPlayedMatchId = (discordId: string) => {
  return instance
    .get("/accounts/" + discordId + "/last-game")
    .then(response => response.data);
}

const getMatchAnalysis = (matchId: string) => {
  return instance
    .get("/analyses/" + matchId, {timeout: 10000})
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