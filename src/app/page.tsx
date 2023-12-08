import { CustomScanner } from '@/Components/CustomScanner/CustomScanner'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <CustomScanner />
    </main>
  )
}
