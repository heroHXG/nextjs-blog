import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Foot from './footer'
const name = 'Chen pipi'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js"/>
        <meta property="og:image"
          content={`https://og-image.now.sh/${encodeURI(siteTitle)}.png?
theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img src="/images/profile.jpg" alt={name}
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link legacyBehavior href="/">
              <a>
                <img src="/images/profile.jpg" alt={name}
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`} />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link legacyBehavior href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />

      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link legacyBehavior href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <Foot/>
    </div>
  )
}