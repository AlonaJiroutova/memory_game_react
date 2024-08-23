import React from "react";
import "./Card.css";

function Card({ card, handleChoise, flipped, disabled, btnModeId }) {
  function handleClick() {
    if (!disabled) {
      handleChoise(card);
    }
  }
  return (
    <div className="card-component">
      <div className={flipped ? "flipped" : ""}>
        <img className="card-front" src={card.src} alt="card-front" />
        <img
          className="card-back"
          src={
            btnModeId === "ghibli-mode-btn"
              ? "/images/ghibli/Studio_Ghibli_dark.jpg"
              : btnModeId === "moomins-mode-btn"
              ? "/images/moomins/flower_logo.jpg"
              : btnModeId === "horror-mode-btn"
              ? "/images/horrors/pumpkin_logo.jpg"
              : ""
          }
          alt="card-back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Card;
