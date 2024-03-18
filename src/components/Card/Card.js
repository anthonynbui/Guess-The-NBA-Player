import { useEffect, useState } from "react";
import { getPlayerList } from "../../api/utils";
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
import { db } from "../../config/auth";
import { Autocomplete, TextField } from "@mui/material";
import "./Card.css"; // Import the CSS file
import { createTheme } from '@mui/material/styles';
import mystery_player from "../../assets/mystery_player.png";
import green_check from "../../assets/green_check.png";
import red_x from "../../assets/red_x.png";

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
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
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


  const handlePlayerChange = (event, value) => {
    setSelectedPlayer(value);

    if (value === player.name) {
      console.log("Correct guess");
      resetPlayers();
      setCorrect(true);
      addScore(scoreToAdd);
      setScoreToAdd(5);
      setGuesses(3);
    } else {
      console.log("Incorrect guess");
      setIncorrect(true);
      decrementGuess();
    }
  };

  const decrementScore = () => {
    setScoreToAdd((prevScore) => Math.max(prevScore - 1, 0)); // Ensure scoreToAdd doesn't go below 0
  };  

  const decrementGuess = () => {
    setGuesses(guesses - 1);
  };

  const addScore = () => {
    setScore(score + scoreToAdd);
    const scoreElement = document.querySelector(".card-score");
    scoreElement.classList.add("increase-score-animation");
    setTimeout(() => {
      scoreElement.classList.remove("increase-score-animation");
    }, 500);
  };
  

  function resetPlayers() {
    // Set reveal to true to show the player
    setReveal(true);

    // After 5 seconds, hide the player, get new player, and reset guesses
    setTimeout(() => {
      setReveal(false); // Hide the player
      setCorrect(false);
      setIncorrect(false);
      getPlayers(); // Get a new player
      setGuesses(3); // Reset guesses
    }, 5000);
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
      <h5 className="card-guesses">Guesses: {guesses} </h5>
    </div>
    <div>
      {reveal ? (
        <>
<h2 className={reveal ? "player-name" : "hidden"}>
  <img src={correct ? green_check : red_x} width="50px" alt={correct ? "Correct" : "Incorrect"} />
  {playerName}
</h2>

        </>
      ) : null}
    </div>
  
    <div className="card-autocomplete">
      <img
        src={reveal ? player.image_url : mystery_player}
        className="card-image"
        alt={reveal ? "Player" : "MysteryPlayer"}
      />
      <Autocomplete
        disablePortal
        id="nba-player-guess"
        options={getPlayerList()}
        sx={{ paddingLeft: "40px", width: 300 }}
        onChange={handlePlayerChange}
        renderInput={(params) => <TextField {...params} label="Guess Player" />}
      />
    </div>
  
    {rendered ? (
      <div className="hint-button-container">
        <div>
          <Button
            variant="contained"
            size="large"
            className="hint-button"
          >
            Position: {player.position}
          </Button>
        </div>
        <div>
          <Button variant="contained" size="large">
            PPG: {(parseFloat(player.pts) / parseFloat(player.gp)).toFixed(1)}
          </Button>
        </div>
        <div>
          {hint1Clicked ? (
            <Button
              variant="contained"
              onClick={handleHint1Click}
              size="large"
            >
              Height: {player.height}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleHint1Click}
              size="large"
              sx={{ bgcolor: "ochre.main" }}
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
              Year Drafted: {player.draft_year}
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
              Current Team: {player.team}
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
      </div>
    ) : null}
  </div>
  
  );
}

export default Card;