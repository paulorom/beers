import React, { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.punkapi.com/v2/beers"
});

function App() {
  const [beers, setBeers] = useState([]);
  const [beer, setBeer] = useState({});
  const [page, setPage] = useState(1); // Start from page 1 (instead of 0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(); // Fix the URL for pagination
        setBeers(response.data);
      } catch (error) {
        console.log("Request aborted");
      }
    };

    fetchData();
  }, [page]);

  const showBeer = async () => {
    try {
      const response = await axios.get(
        "https://api.punkapi.com/v2/beers/random"
      );
      setBeer(response.data[0]); // Since the response is an array, take the first element
    } catch (error) {
      console.log("Request aborted");
    }
  };

  const handleClick = () => {
    showBeer();
  };

  return (
    <div>
      <ul>
        {beers.map((beer, index) => (
          <li onClick={handleClick} key={index}>
            {beer.name}
          </li>
        ))}
      </ul>
      <ul>
        <li onClick={() => setPage(1)}>1</li>{" "}
        {/* Use arrow function to call setPage */}
        <li onClick={() => setPage(2)}>2</li>{" "}
        {/* Use arrow function to call setPage */}
        <li onClick={() => setPage(3)}>3</li>{" "}
        {/* Use arrow function to call setPage */}
      </ul>
      <div>
        <h2>Selected Beer</h2>
        <p>{beer.name}</p>
        <p>{beer.tagline}</p>
        {/* Display other properties of the selected beer as needed */}
      </div>
    </div>
  );
}

export default App;
