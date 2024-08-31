import React from "react";
import { useEffect, useState } from "react";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const searchPokemon = (searchpoke) => {
    const filteredPokemon = pokemon.filter((poke) => {
      return poke.name.toLowerCase().includes(searchpoke.toLowerCase());
    });
    setFilteredPokemon(filteredPokemon);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    searchPokemon();
  };

  const handlerealtime = (e) => {
    const searchpoke = e.target.value;
    setSearch(searchpoke);
    searchPokemon(searchpoke);
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
        setFilteredPokemon(data.results);
      });
  }, []);

  return (
    <div className="px-10 flex ">
      <div className="flex-col flex gap-10 items-center flex-1 ">
        <div>
          <img src="./Pokemon.png" className=" w-[200px] " />
        </div>
        <div>
          <form className="flex gap-5" onSubmit={formSubmit}>
            <input
              placeholder="Search"
              type="text"
              onChange={handlerealtime}
              className=" border-yellow-500 focus:outline-none border-2 rounded-lg p-2  text-blue-400"
            />
            <img src="/search.svg" onClick={searchPokemon} />
          </form>
        </div>
        <div className="w-full">
          <h1 className=" text-[white]  text-4xl font-medium ml-[10px] mb-[30px]">
            Pokedex
          </h1>

          <div className="grid grid-cols-5  gap-4  justify-items-center  ">
            {filteredPokemon.map((poke, index) => {
              return (
                <div key={index - 1} className="">
                  <div className="">
                    <div class="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-gray-900">
                      <div class="absolute flex flex-col gap-10 items-center justify-center text-gray-900 z-[1] opacity-90 rounded-xl inset-0.5 bg-white ">
                        <div>
                          <img
                            src={`https://img.pokemondb.net/artwork/${poke.name}.jpg`}
                            className="w-42 h-32 object-cover "
                          />
                        </div>
                        <div>
                          <p class="text-2xl font-bold">{poke.name}</p>
                        </div>
                      </div>
                      <div class="absolute w-56 h-48 bg-yellow-500 blur-[50px] -left-1/2 -top-1/2"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
