import Image from 'next/image'
import styles from './page.module.css'
import { Scanner } from '@/Components/Scanner/Scanner'

export default function Home() {
  return (
    <main className={styles.main}>
      <Scanner />
    </main>
  )
}
