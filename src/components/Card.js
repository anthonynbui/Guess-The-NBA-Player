import { useEffect, useState } from "react";
import { getPlayerList } from "../api/utils";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/auth";
import { Autocomplete, TextField } from "@mui/material";

function Card() {
  const [rendered, setRendered] = useState(false);
  const [player, setPlayer] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [playerList, setPlayerList] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const playerCollectionsRef = collection(db, "nba-players");
  //513 active players

  const handlePlayerChange = (event, value) => {
    setSelectedPlayer(value);
  };

  function getRandomNumber() {
    // Generate a random number between 0 (inclusive) and 1 (exclusive)
    const randomNumber = Math.random();

    // Scale the random number to the range of 1 to 513
    const scaledNumber = Math.floor(randomNumber * 513) + 1;

    return scaledNumber;
  }

  const getPlayers = async () => {
    try {
      const playerDocs = query(
        playerCollectionsRef,
        where("randomnumber", "==", getRandomNumber())
      );
      const data = await getDocs(playerDocs);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlayer(filteredData[0]);
      setPlayerName(filteredData[0].name);
      setRendered(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getPlayers2 = async () => {
    try {
      const playerDocs = await getDocs(
        query(playerCollectionsRef, orderBy("id"), limit(1))
      );
      const randomPlayerDoc = playerDocs.docs[0];
      const randomPlayer = {
        ...randomPlayerDoc.data(),
        id: randomPlayerDoc.id,
      };
      console.log(randomPlayer);
      return randomPlayer;
    } catch (err) {
      console.log(err);
    }
  };

  const testPlayers = ["bob", "asf"];

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
    console.log(player);
  }, [player]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
      <Autocomplete
          disablePortal
          id="nba-player-guess"
          options={getPlayerList()}
          sx={{ paddingLeft: '40px',width: 300 }}
          onChange={handlePlayerChange}
          renderInput={(params) => <TextField {...params} label="NBA Player" />}
        />
        {rendered ? (
          <img src={player.image_url} width="400" alt="Player" />
        ) : (
          <span>?</span>
        )}
      </div>
              <Button onClick={getPlayers}>Randomize Player</Button>

    </div>
  );
}

export default Card;
