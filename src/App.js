import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from './components/Header';
import Flag from './components/Flag';
import Audio from './components/Audio';
import Loading from "./components/Loading";

const DEFAULT_COUNTRY_NAME = `FLAGS`;
const DEFAULT_COUNTRY_CODE = `fr`;
const URL_CDN = `https://flagcdn.com`;
const LANG = `en`;
const URL_COUNTRIES_CODES = `${URL_CDN}/${LANG}/codes.json`;

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(DEFAULT_COUNTRY_NAME);
  const [anthem, setAnthem] = useState(DEFAULT_COUNTRY_CODE);
  const [searchTerm, setSearchTerm] = useState('');
  const audio = useRef(null);

  const playAudio = (_name, _country) => {
    setCountry(_country);
    setAnthem(_name);
    setTimeout(() => audio.current.play(), 500);
  };

  useEffect(() => {
    setLoading(true);
    fetch(URL_COUNTRIES_CODES)
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

  return loading ? <Loading /> : (
    <>
      <Header country={country} onChange={setSearchTerm} />
      <ul>
        {Object.entries(data)
          .filter((val) => {
            if (
              searchTerm === "" ||
              val[1].toLowerCase().includes(searchTerm.toLowerCase())
            )
              return val;
          })
          .map(([key, value]) =>
            Object.keys(key).length < 3 ? <Flag key={key} name={value} code={key} urlCdn={URL_CDN} onClick={playAudio} /> : null
          )}
      </ul>

      <Audio
        ref={audio}
        anthem={anthem} />
    </>
  );
};