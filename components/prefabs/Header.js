import styles from '@/scss/header.module.scss'

import IconButton from '@/primitives/IconButton'

import { reactiveState } from 'models/cache'

import { useReactiveVar } from '@apollo/client'

import Link from 'next/link'

import { mdiAccount, mdiLogin, mdiLogout } from '@mdi/js'
import { useEffect } from 'react'

export default function Header() {

  const r_state = useReactiveVar(reactiveState)

  const userIcons = r_state.user.logged_in ? (
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
        onClick={a_logout}
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
          <Link className={`${styles.button} ${r_state.current_page === 'HOME' ? styles.button__active : ''}`}
            onClick={a_home}
            href={'/'}
          >
            <h1 className={styles.text}>DGG Brain Trust</h1>
          </Link>
          <Link className={`${styles.button} ${r_state.current_page === 'PREDICTIONS' ? styles.button__active : ''}`}
            onClick={a_predictions}
            href={'/predictions'}
          >
            <h3 className={styles.text}>Predictions</h3>
          </Link>
          <Link className={`${styles.button} ${r_state.current_page === 'DISCUSSIONS' ? styles.button__active : ''}`}
            onClick={a_discussions}
            href={'/discussions'}
          >
            <h3 className={styles.text}>Discussions</h3>
          </Link>
          <Link className={`${styles.button} ${r_state.current_page === 'GAMES' ? styles.button__active : ''}`}
            onClick={a_games}
            href={'/games'}
          >
            <h3 className={styles.text}>Games</h3>
          </Link>
          <Link className={`${styles.button} ${r_state.current_page === 'HALL_OF_FAME' ? styles.button__active : ''}`}
            onClick={a_hall_of_fame}
            href={'/hall-of-fame'}
          >
            <h3 className={styles.text}>Hall of Fame</h3>
          </Link>
          <Link className={`${styles.button} ${r_state.current_page === 'LEADERBOARDS' ? styles.button__active : ''}`}
            onClick={a_leaderboards}
            href={'/leaderboards'}
          >
            <h3 className={styles.text}>Leaderboards</h3>
          </Link>
          <Link className={`${styles.button} ${r_state.current_page === 'ABOUT' ? styles.button__active : ''}`}
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
  reactiveState({
    ...reactiveState(),
    active_modal: 'LOGIN'
  })

  console.log(reactiveState())

  /*
  reactiveState({
    ...reactiveState(),
    user: {
      ...user,
      logged_in: true
    }
  })
  */
}

function a_logout() {
  console.log('logging out...')
  reactiveState({
    ...reactiveState(),
    user: {
      ...user,
      logged_in: false
    }
  })
}

function a_account() {
  console.log('Navigating to account...')
}

function a_home() {
  reactiveState({
    ...reactiveState(),
    current_page: 'HOME'
  })
}

function a_predictions() {
  reactiveState({
    ...reactiveState(),
    current_page: 'PREDICTIONS'
  })
}

function a_discussions() {
  reactiveState({
    ...reactiveState(),
    current_page: 'DISCUSSIONS'
  })
}

function a_games() {
  reactiveState({
    ...reactiveState(),
    current_page: 'GAMES'
  })
}

function a_hall_of_fame() {
  reactiveState({
    ...reactiveState(),
    current_page: 'HALL_OF_FAME'
  })
}
function a_leaderboards() {
  reactiveState({
    ...reactiveState(),
    current_page: 'LEADERBOARDS'
  })
}
function a_about() {
  reactiveState({
    ...reactiveState(),
    current_page: 'ABOUT'
  })
}