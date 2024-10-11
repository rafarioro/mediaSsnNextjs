import Image from "next/image";
import styles from "./page.module.css";
import Search from "@/components/Search";
import LogoImage from '../public/logo.jpg'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image 
            src={LogoImage}
            alt="Next.js logo"
            layout={'fill'}
            objectFit="contain"  
          />           
        </div>

        <Search />  
 
 
      </main>
      <footer className={styles.footer}> 
          <a
            href="/about/how-it-works"
            target="_blank"
            rel="noopener noreferrer"
          >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          How it works?
        </a>
      </footer>
    </div>
  );
}
