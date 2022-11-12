import styles from '@/scss/home.module.scss'

import Card from '@/primitives/Card'

import Grid, {Row, Col} from '@/primitives/Grid'

export default function Home() {
  return (
    <div className={styles.container}>
      <Grid
        layout={'column'}
        spaceBetween={1.6}
      >
        <Row>
          <Card
            width={'100%'}
            height={'24rem'}
            className={styles.card_help_info}
          >
            <Card
              width={'24rem'}
              height={'100%'}
              className={styles.card_help_info__item}
            >
            </Card>
            <Card
              width={'24rem'}
              height={'100%'}
              className={styles.card_help_info__item}
            >
            </Card>
            <Card
              width={'24rem'}
              height={'100%'}
              className={styles.card_help_info__item}
            >
            </Card>
          </Card>
        </Row>
        <Row spaceBetween={1.6}>
          <Card
            height={'40rem'}
            width={'0rem'}
            className={styles.card_hot_predictions}
          >
          </Card>
          <Card
            height={'40rem'}
            width={'0rem'}
            className={styles.card_how_to_predict}
          >
          </Card>
          <Card 
            height={'40rem'} 
            width={'20rem'}
            className={styles.card_notifications}
          >
            <Card className={`${styles.card_notifications__item} ${styles.card_notifications__stream}`}
            >
            </Card>
            <Card className={`${styles.card_notifications__item} ${styles.card_notifications__upcoming_events}`}
              style={{display: 'flex', flexGrow: 1, flexDirection: 'row'}}
            >
            </Card>
          </Card>
        </Row>
        <Row spaceBetween={1.6}>
          <Card
            height={'35rem'}
            width={'45rem'}
          >
          </Card>
          <Card
            height={'35rem'}
            width={'0rem'}
            className={styles.card_main_website}
          >
          </Card>
          <Card
            height={'35rem'}
            width={'0rem'}
            className={styles.card_contact_destiny}
          >
          </Card>
        </Row>
      </Grid>
    </div>
  )
}
