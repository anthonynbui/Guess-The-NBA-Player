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
import mystery_player from "./mystery_player.png";
import "./Card.css"; // Import the CSS file

function Card() {
  const [rendered, setRendered] = useState(false);
  const [player, setPlayer] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [playerList, setPlayerList] = useState({});
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(3);
  const [scoreToAdd, setScoreToAdd] = useState(5);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [hint1Clicked, setHint1Clicked] = useState(false);
  const [hint2Clicked, setHint2Clicked] = useState(false);
  const [hint3Clicked, setHint3Clicked] = useState(false);
  const [hint4Clicked, setHint4Clicked] = useState(false);
  const [reveal, setReveal] = useState(false);
  const playerCollectionsRef = collection(db, "nba-players");

  function getRandomNumber() {
    // Generate a random number between 0 (inclusive) and 1 (exclusive)
    const randomNumber = Math.random();

    // Scale the random number to the range of 1 to 513
    const scaledNumber = Math.floor(randomNumber * 453) + 1;

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
      setHint1Clicked(false);
      setHint2Clicked(false);
      setHint3Clicked(false);
      setHint4Clicked(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHint1Click = () => {
    setHint1Clicked(true);
    decrementScore();
  };

  const handleHint2Click = () => {
    setHint2Clicked(true);
    decrementScore();
  };

  const handleHint3Click = () => {
    setHint3Clicked(true);
    decrementScore();
  };

  const handleHint4Click = () => {
    setHint4Clicked(true);
    decrementScore();
  };

  const handlePlayerChange = (event, value) => {
    setSelectedPlayer(value);

    if (value === player.name) {
      console.log("Correct guess");
      resetPlayers();
      addScore(scoreToAdd);
      setScoreToAdd(5);
      setGuesses(3);
    } else {
      console.log("Incorrect guess");
      decrementGuess();
    }
  };

  const decrementScore = () => {
    setScoreToAdd(scoreToAdd - 1);
  };

  const decrementGuess = () => {
    setGuesses(guesses - 1);
  };

  const addScore = () => {
    setScore(score + scoreToAdd);
  };

  function resetPlayers() {
    // Set reveal to true to show the player
    setReveal(true);

    // After 3 seconds, hide the player, get new player, and reset guesses
    setTimeout(() => {
      setReveal(false); // Hide the player
      getPlayers(); // Get a new player
      setGuesses(3); // Reset guesses
    }, 3000);
  }

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
    if (guesses === 0) {
      resetPlayers();
    }
  }, [guesses]);

  useEffect(() => {
    console.log(player.name);
  }, [player]);

  return (
    <div className="card-container">
      <div>
        <h5 className="card-score">Score: {score}</h5>
        <h5 className="card-guesses">Guesses: {guesses}</h5>
      </div>
      <div className="card-autocomplete">
        <Autocomplete
          disablePortal
          id="nba-player-guess"
          options={getPlayerList()}
          sx={{ paddingLeft: "40px", width: 300, }}
          onChange={handlePlayerChange}
          renderInput={(params) => <TextField {...params} label="NBA Player" />}
        />
      </div>
      <div>
        {reveal ? (
          <img src={player.image_url} className="card-image" alt="Player" />
        ) : (
          <img
            src={mystery_player}
            className="card-image"
            alt="MysteryPlayer"
          />
        )}
      </div>
      {rendered ? (
        <div className="hint-button-container">
          <div>
            {hint1Clicked ? (
              <Button
                variant="contained"
                onClick={handleHint1Click}
                size="large"
                className="hint-button"
              >
                Position: {player.position}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleHint1Click}
                size="large"
                className="hint-button"
              >
                Hint 1
              </Button>
            )}
          </div>
          <div>
            {hint2Clicked ? (
              <Button
                variant="contained"
                onClick={handleHint2Click}
                size="large"
              >
                PPG:{" "}
                {(parseFloat(player.pts) / parseFloat(player.gp)).toFixed(1)}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleHint2Click}
                size="large"
              >
                Hint 2
              </Button>
            )}
          </div>
          <div>
            {hint3Clicked ? (
              <Button
                variant="contained"
                onClick={handleHint3Click}
                size="large"
              >
                Height: {player.height}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleHint3Click}
                size="large"
              >
                Hint 3
              </Button>
            )}
          </div>
          <div>
            {hint4Clicked ? (
              <Button
                variant="contained"
                onClick={handleHint4Click}
                size="large"
              >
                Team: {player.team}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleHint4Click}
                size="large"
              >
                Hint 4
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Card;
