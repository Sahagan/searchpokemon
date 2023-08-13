import { gql } from "@apollo/client";
import client from "../client/apollo-client";

export async function getAllPokemon() {
    const { data } = await client.query({
        query: gql`
        query pokemons($first: Int!){
            pokemons(first: $first){
            id
            name
            }
        }
      `,
      variables: {
        "first": 160
      },
    });

    return data.pokemons;
}


export async function getPokemon(id: string,name: string) {
    const { data } = await client.query({
        query: gql`
        query pokemon($id: String, $name: String){
            pokemon(id: $id, name: $name){
              id
              number
              name
              weight{
                minimum
                maximum
              }
              height{
                minimum
                maximum
              }
              attacks{
                fast{
                  name
                  type
                  damage
                }
                special{
                  name
                  type
                  damage
                }
              }
              evolutions{
                id
                number
                name
                classification
                types
                resistant
                weaknesses
                fleeRate
                maxCP
                maxHP
                image
              }
              classification
              types
              resistant
              weaknesses
              fleeRate
              maxCP
              maxHP
              image
            }
          }
      `,
      variables: {
        "id": id,
        "name" : name
      },
    });
    if(!data){
        return `not found`
    }else{
        return data.pokemon;
    };
}