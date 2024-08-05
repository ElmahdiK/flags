import React, { useState, useEffect } from "react";
import "./App.css";
const App = (_) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("Flag");

  const [searchTerm, setSearchTerm] = useState("");
  const [anthem, setAnthem] = useState("fr");

  const playAudio = (_name, _country) => {
    let _audio = document.querySelector("#audio");
    setCountry(_country);
    setAnthem(_name);
    setTimeout(() => _audio.play(), 500);
  };

  useEffect(() => {
    setLoading(true);
    const _pathCND = `https://flagcdn.com`;
    const _lang = `en`;
    fetch(`${_pathCND}/${_lang}/codes.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Data is loading...</p>;
  }
  return (
    <div>
      <header>
        <h1>FLAGS</h1>
        <input
          type="search"
          placeholder="Enter a country ..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </header>
      <ol>
        {Object.entries(data)
          .filter((val) => {
            if (
              searchTerm === "" ||
              val[1].toLowerCase().includes(searchTerm.toLowerCase())
            )
              return val;
          })
          .map(([key, value]) =>
            Object.keys(key).length < 3 ? (
              <li
                key={key}
                onClick={(event) => {
                  playAudio(key, value);
                }}
              >
                <img src={`https://flagcdn.com/` + key + `.svg`} alt={key} />
                <p>{value}</p>
              </li>
            ) : null
          )}
      </ol>

      <audio
        id="audio"
        controls
        data-anthem={anthem}
        src={`https://www.nationalanthems.info/${anthem}.mp3`}
      ></audio>
    </div>
  );
};

export default App;
