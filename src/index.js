import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import { updateFunctionDeclaration } from "typescript";

const App = props => {
  const [radios, setRadios] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch("https://teclead.de/recruiting/radios")
      .then(resp => resp.json())
      .then(data => {
        setRadios(data.radios);
      });
  }, []);

  console.log("active", active);

  return (
    <div className="App">
      <h1 className="d-flex justify-content-between">
        <i className="fas fa-chevron-left" />
        <span className="header">STATIONS</span>
        <i className="fas fa-power-off" onClick={e => setActive(false)} />
      </h1>
      {radios.map((radio, index) => (
        <div className="grey" key={index}>
          <div className="line" onClick={e => setActive(radio.name)}>
            <div
              className={`d-flex justify-content-around center ${
                radio.name !== active ? "active && hidden" : ""
              }`}
            >
              <i className="fas fa-minus-circle" />
              <img src={radio.image} />
              <i className="fas fa-plus-circle" />
            </div>
            <div className="d-flex justify-content-between grey radio">
              <span className="name">{radio.name}</span>
              <span className="freq">{radio.frequency}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="bottom">
        <p className={`current ${active === false ? "active && hidden" : ""}`}>
          CURRENTLY PLAYING
        </p>
        <p className="name_bottom">{active}</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
