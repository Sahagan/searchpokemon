'use client'
//HEAD
import Head from 'next/head';

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
//images
import pikachu from '../assets/pikachu.gif'

export default function Home() {
  const [showImage, setShowImage] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const handleImageClick = () => {
    setShowImage(false);
  };
  const handleInputChange = (name: any) => {
    setInputValue(name.target.value);
  };
  const onSearchPokemon = () => {

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
          {!showImage && (
            <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              className={styles.input}
              onChange={handleInputChange}
              placeholder="Enter Pokemon Name.."
            />
            <button  onClick={onSearchPokemon}>Proceed</button>
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


