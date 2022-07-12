import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import LoginButton from '../components/login-btn'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.title}>
          Login Page:
        </p>
        <LoginButton />
      </main>
    </div>
  )
}

export default Home
