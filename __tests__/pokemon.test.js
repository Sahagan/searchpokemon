import { request } from 'graphql-request'; // Import the request function

describe('Pokemon Types', () => {
  test('Bulbasaur is Grass type', async () => {
    const query = `
      query GetPokemon($name: String!) {
        pokemon(name: $name) {
          name
          types
        }
      }
    `;

    const variables = { name: 'Bulbasaur' };
    const data = await request('https://graphql-pokemon2.vercel.app', query, variables);

    expect(data.pokemon.types).toContain('Grass');
  });

  test('Charmander is Fire type', async () => {
    const query = `
      query GetPokemon($name: String!) {
        pokemon(name: $name) {
          name
          types
        }
      }
    `;

    const variables = { name: 'Charmander' };
    const data = await request('https://graphql-pokemon2.vercel.app', query, variables);

    expect(data.pokemon.types).toContain('Fire');
  });

  test('Squirtle is Water type', async () => {
    const query = `
      query GetPokemon($name: String!) {
        pokemon(name: $name) {
          name
          types
        }
      }
    `;

    const variables = { name: 'Squirtle' };
    const data = await request('https://graphql-pokemon2.vercel.app', query, variables);

    expect(data.pokemon.types).toContain('Water');
  });
});
