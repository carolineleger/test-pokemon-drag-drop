import React from 'react';

const Card = ({
  number,
  name,
  image,
  description,
}) => (
  <>
     <span className="pokemon__number">#{number}</span>
    <div className="pokemon__image"><img src={require(`../assets/img/${image}`)} alt={name}/></div>
    <h3>{name}</h3>
    <p className="pokemon__description">{description}</p>
  </>
);

Card.defaultProps = {
  number: "001",
  title: "Pokemon",
  description: 'a pokemon card'
};

export default Card;