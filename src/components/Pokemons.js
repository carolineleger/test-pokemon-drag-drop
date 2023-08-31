import Card from "./Card";

const Pokemons = () => {
  const pokemons = []
  const pokemonsToshow = 10;
  const pokemon = {
    front: {
      id: "001",
      name: "Bulbasaur",
      description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
      image: "pokemon.png"
    },
    back: {
      id: "002",
      name: "Charmander",
      description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
      image: "charmander.png"
    }

  }

  for (let i = 0; i < pokemonsToshow; i++) {
    pokemons.push(
      <div className="pokemon" key={"pokemon" + i}>
        <div className="pokemon__inner">
          <div className="flip-card-front">
            <Card number={pokemon.front.id} 
                  image= {pokemon.front.image}
                  description= {pokemon.front.description}
                  name= {pokemon.front.name}/>
          </div>

          <div className="flip-card-back">
            <Card number={pokemon.back.id} 
                  image= {pokemon.back.image}
                  description= {pokemon.back.description}
                  name= {pokemon.back.name}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <section className="starters">
        <h2>Starters</h2>

        <div className="starters__content">
          <b>Starter pokemon</b><br/>
          Starter pokemon are the cutest pokemon in the world! They hold the world record for cuteness! 
        </div>
      </section>

      <section className="pokemons">
        {pokemons}
      </section>
    </div>
  );
}

export default Pokemons;
