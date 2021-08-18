const champ_emojis = require('../data/champ_emojis.json')
const rank_names = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"]

const random_champ_icon = () => {
  const obj_keys = Object.keys(champ_emojis);
  const ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
  return champ_emojis[ran_key]
}

exports.random_rank_icon = () => {
  const ran_rank = rank_names[Math.floor(Math.random() * rank_names.length)]
  return champ_emojis[ran_rank]
}

exports.champ_icon = (championName) => {
  championName = championName.replace(" ", "")
  return champ_emojis[championName] !== undefined ? champ_emojis[championName] : champ_emojis["Unknown"]
}

exports.loading_icon = () => {
  return champ_emojis["HappyCat"]
}