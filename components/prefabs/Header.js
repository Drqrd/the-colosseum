import styles from '@/scss/header.module.scss'

import IconButton from '@/primitives/IconButton'

import { r_user, r_currentPage, r_activeModal } from 'models/cache'

import { useReactiveVar } from '@apollo/client'

import Link from 'next/link'

import { mdiAccount, mdiLogin, mdiLogout } from '@mdi/js'

export default function Header(props) {

  const userState = useReactiveVar(r_user)
  const pageState = useReactiveVar(r_currentPage)

  const userIcons = userState.logged_in ? (
    <div className={styles.nav_container__right}>
      <IconButton
        size={2.4}
        rounded={true}
        icon={mdiAccount}
        onClick={a_account}
        textRight={'Account'}
        className={styles.nav_icon}
      />
      <IconButton
        size={2.4}
        rounded={true}
        icon={mdiLogout}
        onClick={a_logout(props.client)}
        textRight={'Logout'}
        className={styles.nav_icon}
      />
    </div>
  ) : (
    <div className={styles.nav_container__right}>
      <IconButton
        size={2.4}
        rounded={true}
        icon={mdiLogin}
        onClick={a_login}
        textRight={'Login'}
        className={styles.nav_icon}
      />
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>
        <div className={styles.nav_container__left}>
          <Link className={`${styles.button} ${pageState === 'HOME' ? styles.button__active : ''}`}
            onClick={a_home}
            href={'/'}
          >
            <h1 className={styles.text}>The Colosseum</h1>
          </Link>
          <Link className={`${styles.button} ${pageState === 'PREDICTIONS' ? styles.button__active : ''}`}
            onClick={a_predictions}
            href={'/predictions'}
          >
            <h3 className={styles.text}>Predictions</h3>
          </Link>
          <Link className={`${styles.button} ${pageState === 'DISCUSSIONS' ? styles.button__active : ''}`}
            onClick={a_discussions}
            href={'/discussions'}
          >
            <h3 className={styles.text}>Discussions</h3>
          </Link>
          <Link className={`${styles.button} ${pageState === 'GAMES' ? styles.button__active : ''}`}
            onClick={a_games}
            href={'/games'}
          >
            <h3 className={styles.text}>Games</h3>
          </Link>
          <Link className={`${styles.button} ${pageState === 'HALL_OF_FAME' ? styles.button__active : ''}`}
            onClick={a_hall_of_fame}
            href={'/hall-of-fame'}
          >
            <h3 className={styles.text}>Hall of Fame</h3>
          </Link>
          <Link className={`${styles.button} ${pageState === 'LEADERBOARDS' ? styles.button__active : ''}`}
            onClick={a_leaderboards}
            href={'/leaderboards'}
          >
            <h3 className={styles.text}>Leaderboards</h3>
          </Link>
          <Link className={`${styles.button} ${pageState === 'ABOUT' ? styles.button__active : ''}`}
            onClick={a_about}
            href={'/about'}
          >
            <h3 className={styles.text}>About</h3>
          </Link>
        </div> 
        {userIcons}
      </div>
    </div>
  )
}

function a_login() {
  r_activeModal('LOGIN')

}

function a_logout(client) {
  r_user({
    ...r_user(),
    logged_in: false,
  })
  client.resetStore()
}

function a_account() {
  console.log('Navigating to account...')
}

function a_home() {
  r_currentPage('HOME')
}
function a_predictions() {
  r_currentPage('PREDICTIONS')
}
function a_discussions() {
  r_currentPage('DISCUSSIONS')
}
function a_games() {
  r_currentPage('GAMES')
}
function a_hall_of_fame() {
  r_currentPage('HALL_OF_FAME')
}
function a_leaderboards() {
  r_currentPage('LEADERBOARDS')
}
function a_about() {
  r_currentPage('ABOUT')
}