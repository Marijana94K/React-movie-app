
import * as React  from "react";
import Card from "./Card";
import { useEffect, useState } from "react";

let API_key = "&api_key=652f1a00f37b349859ad32f2a5cd154a";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["MOVIES", "TV SHOWS"];

const Main = () => {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState<string | undefined>();

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url_set]);

  const getData = (movieType: string | EventTarget) => {
    if (movieType === "MOVIES") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
      
    }
    if (movieType === "TV SHOWS") {
      url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
    }
    setUrl(url);
    console.log (movieData);

  };
  const searchMovie = (evt: { key: string }) => {
    if (evt.key === "Enter") {
      url =
        base_url +
        "/search/movie?api_key=652f1a00f37b349859ad32f2a5cd154a&query=" +
        search;
      setUrl(url);
      setSearch(" ");
    }
  };
  return (
    <>
      <div className="header">
        <nav>
          <ul>
            {arr.map((value, pos) => {
            
              return (
                
                <li>
                  <a
                    href="#"
                    key={pos}
                    id={value}
                    onClick={() => {
                     
                        
                      getData(value);
                      
                      
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="inputText"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            ></input>
            <button >
              Trazi
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {movieData.length === 0 ? (
          <p className="notfound">NOT FOUND</p>
        ) : (
          movieData.map((res, pos) => {
            return <Card info={res} key={pos} />;
          })
        )}
      </div>
    </>
  );
};
export default Main;
