'use client'
//HEAD
import Head from 'next/head';

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
//images
import pikachu from '../assets/pikachu.gif'
import { getAllPokemon, getPokemon } from '@/service/request.service';

export default function Home() {
  const [showImage, setShowImage] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showNotfound, setShowNotfound] = useState(false);
  let [pokemonDetail, setPokemonDetail] = useState<any>('');

  const handleImageClick = async () => {
    await setShowImage(false);
    await setShowInput(true);
  };
  const handleInputChange = (name: any) => {
    setInputValue(name.target.value);
  };

  const onCloseNotfound = () => {
    setShowNotfound(false);
    setShowInput(true);
  }
  const onSearchPokemon = async (inputValue: any) => {
    let pokemons: any = await getAllPokemon();
    let {id,name} = pokemons.find((pokemon: any) => pokemon.name.toLowerCase() === inputValue.toLowerCase()); //pokemon in pokemon array
    if (!id || !name) {
      setShowInput(false)
      setShowNotfound(true);
    } else {
      setShowInput(false);
      setShowContent(true);
      let seachPokemon = await getPokemon(id,name);
      setPokemonDetail(seachPokemon);
    };
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <span className={styles.highlight}>Search-Pokemon</span> Application
        </h1>
        <p className={styles.description}>
          Get ready to explore and discover your favorite Pokémon profiles!
        </p>
        <div className={styles.content}>
          {showImage && (
            <div className={styles.imageContainer}>
              <Image
                src={pikachu}
                alt="Pikachu"
                className={styles.image}
                onClick={handleImageClick}
              />
              <p className={styles.clickMessage} onClick={handleImageClick}>Click me to continue</p>
            </div>
          )}
          {showInput && (
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={inputValue}
                className={styles.input}
                onChange={handleInputChange}
                placeholder="Enter Pokémon Name.."
              />
              <button onClick={() => onSearchPokemon(inputValue)}>Proceed</button>
            </div>
          )}
          {showNotfound && (
            <div className={styles.notfoundContainer}>
              no pokemon name's {inputValue} in database
              <button onClick={onCloseNotfound}>Ok</button>
            </div>
          )}
          {showContent && (
            <div className={styles.contentContainer}>
              <p className={styles.Name}>{pokemonDetail.name}</p>
              <Image
                src={pokemonDetail.image}
                alt="pokemon"
                className={styles.pokemonImage}
                width={150}
                height={200}
              />
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        develop by Sahagan Nuytoom
      </footer>
    </div>
  )
};


