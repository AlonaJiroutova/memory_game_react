import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const ghibliArr = [
  { "src": "./images/ghibli/kiki-jiji-flying.jpg", matched: false },
  { "src": "./images/ghibli/Jiji.jpg", matched: false },
  { "src": "./images/ghibli/mononoke.jpg", matched: false },
  { "src": "./images/ghibli/chihiro_haku.jpg", matched: false },
  { "src": "./images/ghibli/no-face.jpg", matched: false },
  { "src": "./images/ghibli/arietti.jpg", matched: false },
  { "src": "./images/ghibli/sofi_howl.jpg", matched: false },
  { "src": "./images/ghibli/mei.jpg", matched: false },
  { "src": "./images/ghibli/sho.jpg", matched: false },
];
const horrorArr = [
  { "src": "./images/horrors/frankenstein.jpg", matched: false },
  { "src": "./images/horrors/freddy.jpg", matched: false },
  { "src": "./images/horrors/ghostface.jpg", matched: false },
  { "src": "./images/horrors/jason.jpg", matched: false },
  { "src": "./images/horrors/pennywise_2.jpg", matched: false },
  { "src": "./images/horrors/michael_3.jpg", matched: false },
  { "src": "./images/horrors/chuky.jpg", matched: false },
  { "src": "./images/horrors/denny.jpg", matched: false },
  { "src": "./images/horrors/candyman.jpg", matched: false },
];
const moominArr = [
  { "src": "./images/moomins/littleMy_2.jpg", matched: false },
  { "src": "./images/moomins/sniff.jpg", matched: false },
  { "src": "./images/moomins/snufkin.jpg", matched: false },
  { "src": "./images/moomins/moomin_with_knife.jpg", matched: false },
  { "src": "./images/moomins/moomin_moominhouse.jpg", matched: false },
  { "src": "./images/moomins/moomin_snorkmaiden.jpg", matched: false },
  { "src": "./images/moomins/moominpapa_1.jpg", matched: false },
  { "src": "./images/moomins/moominmama_2.jpg", matched: false },
  { "src": "./images/moomins/moominhouse.jpg", matched: false },
];

let cardArr = [];
let btnModeId = "";

const year = new Date().getFullYear();

function App() {
  const [cards, setCards] = useState([]);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  function handleMode(e) {
    const btnId = e.target.id;
    switch (btnId) {
      case "ghibli-mode-btn":
        cardArr = [...ghibliArr];
        btnModeId = btnId;
        break;
      case "moomins-mode-btn":
        cardArr = [...moominArr];
        btnModeId = btnId;
        break;
      case "horror-mode-btn":
        cardArr = [...horrorArr];
        btnModeId = btnId;
        break;
      default:
        break;
    }

    return cardArr;
  }

  function shuffleCards() {
    const shaffeledCards = [...cardArr, ...cardArr]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shaffeledCards);
    setChoiseOne(null);
    setChoiseTwo(null);
  }
  function handleChoise(card) {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCards();
      } else {
        setTimeout(() => resetCards(), 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

  function resetCards() {
    setChoiseOne(null);
    setChoiseTwo(null);
    setDisabled(false);
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div
      className="App"
      id={
        btnModeId === "ghibli-mode-btn"
          ? "ghibli-background"
          : btnModeId === "moomins-mode-btn"
          ? "moomin-background"
          : btnModeId === "horror-mode-btn"
          ? "horror-background"
          : ""
      }
    >
      <h1 className="heading">Memory game</h1>
      <p className="rules">
        To start a new game, click on a selected mode button
      </p>
      <div className="btn-container">
        <button
          onClick={(e) => {
            handleMode(e);
            shuffleCards();
          }}
          className="mode-btn"
          id="ghibli-mode-btn"
        >
          Ghibli mode
        </button>
        <button
          onClick={(e) => {
            handleMode(e);
            shuffleCards();
          }}
          className="mode-btn"
          id="moomins-mode-btn"
        >
          Moomins mode
        </button>
        <button
          onClick={(e) => {
            handleMode(e);
            shuffleCards();
          }}
          className="mode-btn"
          id="horror-mode-btn"
        >
          Horror mode
        </button>
      </div>
      <div className="game-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
            btnModeId={btnModeId}
          />
        ))}
      </div>
      <div className="copyright-container">
        <p className="copyright">Copyright {year}</p>
      </div>
    </div>
  );
}

export default App;


