import axios from 'axios';

export async function getPokemonList() {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150"
  ).then((res) => res.json());
  return data.results;
}

function getRandomInt() {
  return Math.floor(Math.random() * 150);
}

export async function getRandomPokemon() {
  const randomNum = getRandomInt();

  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomNum}`
  ).then((res) => res.json());

  return data;
}

const options = {
  method: "GET",
  url: "https://api-nba-v1.p.rapidapi.com/players",
  params: {
    team: "1",
    season: "2023",
  },
  headers: {
    "X-RapidAPI-Key": "365e5f0952msh73fc543d504ba5bp1d375bjsn4debf6b56df9",
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
  },
};

export async function getNBAData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
