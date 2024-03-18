import React, { useState } from "react";
import { Button, Popover, Typography } from "@mui/material";
import "./Header.css";
import nba_logo from "../../assets/nba_logo.png";

function Header() {
  const [aboutPopover, setAboutPopover] = useState(null);
  const [howToPlayPopover, setHowToPlayPopover] = useState(null);

  const handleAboutClick = (event) => {
    setAboutPopover(event.currentTarget);
  };

  const handleAboutClose = () => {
    setAboutPopover(null);
  };

  const handleHowToPlayClick = (event) => {
    setHowToPlayPopover(event.currentTarget);
  };

  const handleHowToPlayClose = () => {
    setHowToPlayPopover(null);
  };

  const aboutText = (
    <Typography sx={{ p: 2, textAlign: 'center', maxWidth: '400px' }}>
      Welcome to Guess The NBA Player, a web application developed by Anthony Bui.
      I made this for NBA fanatics who are looking to test their player knowledge.
      How well can you name the NBA player based on little information?
    </Typography>
  );
  
  const howToPlayText = (
    <Typography sx={{ p: 2, textAlign: 'center', maxWidth: '400px' }}>
      Try and guess the NBA player, and see how high you can score! You get 3 guesses,
      and if you guess correctly then you get +5 points. Click and reveal the hints if you need help.
      For each hint you use though,
      1 point will be taken away from the potential score.
    </Typography>
  );

  return (
    <div>
      <div className="Header">
        <h1>        <img src={nba_logo} alt="NBA Logo" className="nba-logo" />

          Guess The NBA Player</h1>
        <Button color="inherit" onClick={handleAboutClick}>
          About
        </Button>
        <Popover
          open={Boolean(aboutPopover)}
          anchorEl={aboutPopover}
          onClose={handleAboutClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className="Popup">
            {aboutText}
          </div>
          
        </Popover>
        <Button color="inherit" onClick={handleHowToPlayClick}>
          How to Play
        </Button>
        <Popover
          open={Boolean(howToPlayPopover)}
          anchorEl={howToPlayPopover}
          onClose={handleHowToPlayClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className="Popup">
            {howToPlayText}
          </div>

        </Popover>
      </div>
    </div>
  );
}

export default Header;
