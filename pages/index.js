import Head from "next/head"
import Image from "next/image"
import BookMark from "../components/BookMark"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BookMark Manager</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BookMark />
    </div>
  )
}
