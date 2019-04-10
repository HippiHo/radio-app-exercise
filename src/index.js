import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

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

  console.log(active);

  return (
    <div className="App">
      <h1 className="d-flex justify-content-between">
        <i className="fas fa-chevron-left" />
        <span className="header">STATIONS</span>
        <i className="fas fa-power-off" />
      </h1>
      {radios.map((radio, index) => (
        <div>
          <div className="line" onClick={e => setActive(index)}>
            <div
              className={`d-flex justify-content-between ${
                index !== active ? "hidden" : ""
              }`}
            >
              <i className="fas fa-minus-circle" />
              <img src={radio.image} />
              <i className="fas fa-plus-circle" />
            </div>
            <p className="d-flex justify-content-between ">
              <span className="name">{radio.name}</span>
              <span className="freq">{radio.frequency}</span>
            </p>
          </div>
        </div>
      ))}
      <div className="bottom">
        <p className="current">CURRENTLY PLAYING</p>
        <p className="name_bottom">{active && radios[active].name}</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
