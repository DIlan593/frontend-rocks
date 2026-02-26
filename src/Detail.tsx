import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { PokeAPI } from "./api";

interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
  abilities: string[];
  baseExperience: number;
}

export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        if (!id) return;
        
        const pokemonData = await PokeAPI.getPokemonById(parseInt(id));
        
        setPokemon({
          id: pokemonData.id,
          name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
          image: pokemonData.sprites.other?.["official-artwork"].front_default ?? pokemonData.sprites.front_default ?? "",
          types: pokemonData.types.map((type: any) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)),
          height: pokemonData.height / 10, // Converti in metri
          weight: pokemonData.weight / 10, // Converti in kg
          stats: pokemonData.stats.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
          abilities: pokemonData.abilities.map((ability: any) => 
            ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)
          ),
          baseExperience: pokemonData.base_experience,
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Errore nel caricamento dei dettagli:", error);
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <div className="detail-loading">Caricamento dettagli...</div>;
  }

  if (!pokemon) {
    return <div className="detail-error">Pokémon non trovato</div>;
  }

  const primaryType = pokemon.types[0]?.toLowerCase() || 'normal';

  return (
    <div className="detail-container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Indietro
      </button>
      
      <div className={`detail-card image-type-${primaryType}`}>
        <div className="detail-header">
          <div className="detail-image-section">
            <img src={pokemon.image} alt={pokemon.name} className="detail-image" />
          </div>
          
          <div className="detail-info">
            <h1 className="detail-name">{pokemon.name}</h1>
            <p className="detail-id">#{pokemon.id.toString().padStart(4, '0')}</p>
            
            <div className="detail-types">
              {pokemon.types.map((type) => (
                <span key={type} className="type-badge">{type}</span>
              ))}
            </div>
            
            <div className="detail-stats-quick">
              <div className="stat-item">
                <span className="stat-label">Altezza:</span>
                <span className="stat-value">{pokemon.height} m</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Peso:</span>
                <span className="stat-value">{pokemon.weight} kg</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Esperienza Base:</span>
                <span className="stat-value">{pokemon.baseExperience}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="detail-body">
          <div className="detail-section">
            <h2>Statistiche Base</h2>
            <div className="stats-bars">
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="stat-bar-container">
                  <span className="stat-name">
                    {stat.name.charAt(0).toUpperCase() + stat.name.slice(1).replace('-', ' ')}
                  </span>
                  <div className="stat-bar">
                    <div 
                      className="stat-bar-fill" 
                      style={{ width: `${(stat.value / 150) * 100}%` }}
                    />
                  </div>
                  <span className="stat-number">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="detail-section">
            <h2>Abilità</h2>
            <div className="abilities">
              {pokemon.abilities.length > 0 ? (
                pokemon.abilities.map((ability) => (
                  <span key={ability} className="ability-badge">{ability}</span>
                ))
              ) : (
                <p>Nessuna abilità disponibile</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
