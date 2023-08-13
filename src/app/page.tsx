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
  //dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');


  const [showContent, setShowContent] = useState(false);
  const [showNotfound, setShowNotfound] = useState(false);
  const [pokemons, setPokemons] = useState<any>('');
  let [pokemonDetail, setPokemonDetail] = useState<any>('');
  const [showDetailContent, setShowDetailContent] = useState(false);

  const handleImageClick = async () => {
    await setPokemons(await getAllPokemon());
    await setShowImage(false);
    await setShowInput(true);
  };
  const handleInputChange = (name: any) => {
    setInputValue(name.target.value);
  };
  const handleDropdownItemClick = (selectedName:any) => {//dropdown
    setInputValue(selectedName);
    setShowDropdown(false);
  };

  const onCloseNotfound = () => {
    setShowNotfound(false);
    setShowInput(true);
  };
  const onCloseContent = () => {
    setShowContent(false);
    setShowInput(true);
  };
  const onSearchPokemon = async (inputValue: any) => {
    let findData = pokemons.find((pokemon: any) => pokemon.name.toLowerCase() === inputValue.toLowerCase()); //pokemon in pokemon array
    if (!findData) {
      setShowInput(false)
      setShowNotfound(true);
    } else {
      let seachPokemon = await getPokemon(findData.id, findData.name);
      setPokemonDetail(seachPokemon);
      setShowInput(false);
      setShowContent(true);
    };
  };
  const onDetail = async () => {
    setShowContent(false);
    setShowDetailContent(true);
  };
  const onBack = () => {
    setShowDetailContent(false);
    setShowContent(true);
  };
  const onEvolution = async (pokemonDetail: any) => {
    if (pokemonDetail.evolutions) {
      await (onSearchPokemon(pokemonDetail.evolutions[0].name));
    } else {
      alert(`${pokemonDetail.name} can not evolve.`)
    }
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
                onFocus={() => setShowDropdown(true)}
              />
              <button onClick={() => onSearchPokemon(inputValue)}>Proceed</button>
            </div>
          )}
          {showDropdown && (
            <div className={styles.dropdownContent}>
              {pokemons.map((pokemon:any, index:number) => (
                <div
                  key={index}
                  onClick={() => handleDropdownItemClick(pokemon.name)}
                >
                  {pokemon.name}
                </div>
              ))}
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
              <div className={styles.imagePokemon}>
                <Image
                  src={pokemonDetail.image}
                  alt="pokemon"
                  className={styles.pokemonImage}
                  width={150}
                  height={200}
                />
              </div>
              <div className={styles.typePokemon}>
                <p>type</p>
                <p className={styles.typeValue}>
                  {pokemonDetail.types.length === 1
                    ? pokemonDetail.types[0]
                    : pokemonDetail.types.join(' ')}
                </p>
              </div>
              <button className={styles.detailBtn} onClick={onDetail}>details</button>
              <button className={styles.evolveBtn} onClick={() => onEvolution(pokemonDetail)}>evolution</button>
              <button className={styles.closeContentBtn} onClick={onCloseContent}>Close</button>
            </div>
          )}
          {showDetailContent && (
            <div className={styles.contentDetailContainer}>
              <p className={styles.Name}>{pokemonDetail.name}</p>
              <div className={styles.pokemonDetail}>
                <p><span className={styles.key}>weight:</span> {pokemonDetail.weight.minimum} to {pokemonDetail.weight.maximum}</p>
                <p><span className={styles.key}>height:</span> {pokemonDetail.height.minimum} to {pokemonDetail.height.maximum}</p>
                <div className={styles.attackDetail}>
                  <div>
                    <p className={styles.key}>Fast Attacks</p>
                    {pokemonDetail.attacks.fast.map((attack: any, index: any) => (
                      <p key={index}>{attack.name} (Type: {attack.type}, Damage: {attack.damage})</p>
                    ))}
                  </div>
                  <div>
                    <p className={styles.key}>Special Attacks</p>
                    {pokemonDetail.attacks.special.map((attack: any, index: any) => (
                      <p key={index}>{attack.name} (Type: {attack.type}, Damage: {attack.damage})</p>
                    ))}
                  </div>
                </div>
                <p><span className={styles.key}>classification:</span> {pokemonDetail.classification}</p>
                <p><span className={styles.key}>resistant:</span> {pokemonDetail.resistant.length === 1
                  ? pokemonDetail.resistant[0]
                  : pokemonDetail.resistant.join(',')}</p>
                <p><span className={styles.key}>weaknesses:</span> {pokemonDetail.weaknesses.length === 1
                  ? pokemonDetail.weaknesses[0]
                  : pokemonDetail.weaknesses.join(',')}</p>
                <p><span className={styles.key}>fleeRate:</span> {pokemonDetail.fleeRate}</p>
                <p><span className={styles.key}>maxCP:</span> {pokemonDetail.maxCP}</p>
                <p><span className={styles.key}>maxHP:</span> {pokemonDetail.maxHP}</p>
              </div>
              <button className={styles.backContentBtn} onClick={onBack}>Back</button>
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


