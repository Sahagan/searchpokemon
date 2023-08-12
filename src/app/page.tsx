import Image from 'next/image'
import styles from './page.module.css'

//images
import pikachu from '../assets/pikachu.gif'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <span className={styles.highlight}>Search-Pokemon</span> Application
        </h1>
        <p className={styles.description}>
          Get ready to explore and discover your favorite Pokémon profiles!
        </p>
        <Image
            src={pikachu}
            alt="Pikachu"
            className={styles.image}
        />
      </main>
      <footer className={styles.footer}>
        develop by Sahagan Nuytoom
      </footer>
    </div>
  )
}
