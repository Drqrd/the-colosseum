import styles from '@/scss/header.module.scss'

import IconButton from '@/primitives/IconButton'

import { r_user, r_token,  r_currentPage, r_activeModal } from 'models/cache'

import { useReactiveVar, gql, useLazyQuery } from '@apollo/client'

import Link from 'next/link'

import { mdiAccount, mdiLogin, mdiLogout } from '@mdi/js'

export default function Header() {

  const tokenState = useReactiveVar(r_token)
  const pageState = useReactiveVar(r_currentPage)

  const userIcons = tokenState !== null ? <LoggedIcons/> : <NotLoggedIcons/>

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

function LoggedIcons() {
  const userInfo = useReactiveVar(r_user)

  return (
    <div className={styles.nav_container__right}>
      <Link
        href={`/account/${userInfo.username}`}
        className={styles.account}
      >
        <IconButton
          size={2.4}
          rounded={true}
          icon={mdiAccount}
          onClick={a_account}
          textRight={'Account'}
          className={styles.nav_icon}
        />
      </Link>
      <IconButton
        size={2.4}
        rounded={true}
        icon={mdiLogout}
        onClick={a_logout}
        textRight={'Logout'}
        className={styles.nav_icon}
      />
    </div>
  )
}

function NotLoggedIcons() {
  return (
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
}

function a_login() {
  r_activeModal('LOGIN')
}

function a_logout() {
  setTimeout(() => {
    r_token(null)
  }, 100)
}

function a_account() {
  r_currentPage('ACCOUNT')
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