import { useEffect, useState } from "react";
import { getNBAData, getPokemonList, getRandomPokemon } from "../api/utils";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function Card() {
  const [pokemon, setPokemon] = useState({});
  const [rendered, setRendered] = useState(false);
  
  async function fetchRandomPokemonData() {
    try {
      const randPokemon = await getRandomPokemon();
      setPokemon(randPokemon);
      setRendered(true);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getNBAData();
  }, []);

  return (
    <div>
      <div>
        {rendered ? (
          <img src={pokemon.sprites.front_default} width="200" />
        ) : (
          <a>?</a>
        )}
      </div>
      <div>{rendered ? <h3>{pokemon.name}</h3> : ""}</div>
      <div>
        {rendered
          ? pokemon.types.map((t) => (
              <Button variant="contained">{t.type.name}</Button>
            ))
          : ""}
      </div>
      <div>
        <Button onClick={fetchRandomPokemonData}>Randomize</Button>
      </div>
    </div>
  );
}



export default Card;
