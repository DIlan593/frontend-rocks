import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import {data, Link} from "react-router";
export const RootRoute = () => {
    return <div>
        {data.map(item) =>{
            return <div>{item}</div>
        })}
    </div>
};
const data = [
    {
        id:1,
        image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"
        name: "Bulbasaur"
        types: ["grass", "poison"],
    ),
        }
    return null
}