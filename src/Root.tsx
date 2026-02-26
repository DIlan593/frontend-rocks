import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PokeAPI } from "./api";

type Props = {
  id: number;
  image: string;
  name: string;
  types: string[];
  onClick?: () => void;
}

interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

function Card(props: Props) {
  const primaryType = props.types[0]?.toLowerCase() || 'normal';
  const delay = (props.id % 10) * 0.1; // Sfalsamento del delay basato sull'ID
  
  return (
    <div className="card" onClick={props.onClick} style={{ cursor: 'pointer' }}>
    <div className={`image-section image-type-${primaryType}`}>
        <div className="image-container">
          <div className="background-white-small">
            <div className="image-wrapper" style={{ animationDelay: `${delay}s` }}>
              <img src={props.image} alt={props.name}/>
            </div>
          </div>
        </div>
      </div>
      <div className={`stats-section type-${primaryType}`}>
        <div className="card-number">#{props.id.toString().padStart(4, '0')}</div>
        <div className="card-name">{props.name}</div>
        <div className="card-types">
          {props.types.map((type) => <span className="type-badge" key={type}>{type}</span>)}
        </div>
      </div>
    </div>
  );
}

export function Root() {
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPokemons() {
      try {
        const allPokemons: PokemonCard[] = [];
        
        // Carica TUTTI i pokémon (cicla fino a 1100 per catturare tutte le generazioni)
        for (let i = 1; i <= 1100; i++) {
          try {
            const pokemon = await PokeAPI.getPokemonById(i);
            allPokemons.push({
              id: pokemon.id,
              image: pokemon.sprites.other?.["official-artwork"].front_default ?? pokemon.sprites.front_default ?? "",
              name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
              types: pokemon.types.map((type: any) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)),
            });
          } catch (error) {
            // Se un pokemon non viene trovato, continua con il prossimo
            continue;
          }
        }
        
        setPokemons(allPokemons);
        setFilteredPokemons(allPokemons);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel caricamento dei pokémon:", error);
        setLoading(false);
      }
    }

    fetchAllPokemons();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim() === "") {
      setFilteredPokemons(pokemons);
      return;
    }

    const lowerValue = value.toLowerCase();
    const results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerValue) ||
      pokemon.id.toString() === value.trim()
    );
    
    setFilteredPokemons(results);
  };

  const handlePokemonClick = (pokemonId: number) => {
    navigate(`/frontend-rocks/dettaglio/${pokemonId}`);
  };

  if (loading) {
    return <div className="Flax" style={{ fontSize: '24px', color: '#000' }}>Caricamento pokémon...</div>;
  }

  return (
    <div className="pokemon-container">
      <div className="search-bar-container">
        <h1 className="pokemon-title">Pokédex</h1>
        <input
          type="text"
          placeholder="Cerca per nome o numero..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-bar"
        />
        <p className="search-results-count">Risultati trovati: {filteredPokemons.length}</p>
      </div>
      <div className="Flax">
        {filteredPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            types={pokemon.types}
            onClick={() => handlePokemonClick(pokemon.id)}
          />
        ))}
      </div>
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