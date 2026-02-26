/*import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PokeAPI } from "./api";
*/
type Props = {
  id: number;
  image: string;
  name: string;
  types: string[];
}
function Card(props: Props) {
  return (
    <div className="card">
      <div className="image-container">
        <div className="background-white"></div>
        <div className="image-wrapper">
          <img src={props.image} alt={props.name}/>
        </div>
      </div>
      <div className="card-number">#{props.id.toString().padStart(3, '0')}</div>
      <div className="card-name">{props.name}</div>
      <div className="card-types">
        {props.types.map((type) => <span className="type-badge" key={type}>{type}</span>)}
      </div>
    </div>
  );
}

export function Root() {
  return (
    <div className="Flax">
      <Card
        id={658}
        image=" https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/658.png"
        name="Greninja"
        types={["Water"]}
      />
      <Card
        id={458}
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/458.png"
        name="Mantyke"
        types={["Water", "Flying"]}
      />
    </div>
  );
}

/*
interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

async function fetchData(offset: number): Promise<PokemonCard[]> {
  const list = await PokeAPI.listPokemons(offset, 20);
  const pokemons = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {
      const pokemon = await PokeAPI.getPokemonByName(item.name);
      return pokemon;
    }),
  );

  return pokemons.map((item) => ({
    id: item.id,
    image: item.sprites.other?.["official-artwork"].front_default ?? "",
    name: item.name,
    types: item.types.map((type) => type.type.name),
  }));
}*/