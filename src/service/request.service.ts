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

    return {
        props: {
            pokemons: data.pokemons
        },
    };
}


export async function getStaticProps(name: string) {
    const { data } = await client.query({
        query: gql`
        query Countries {
          countries {
            code
            name
            emoji
          }
        }
      `,
    });

    return {
        props: {
            countries: data.countries.slice(0, 4),
        },
    };
}