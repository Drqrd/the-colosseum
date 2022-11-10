import styles from '@/scss/home.module.scss'

import Card from '@/primitives/Card'

import Grid, {Row, Col} from '@/primitives/Grid'

export default function Home() {
  return (
    <div className={styles.container}>
      <Grid
        layout={'row'}
      >
        <Row spaceBetween={10}>
          <Col spaceBetween={5}>
            <Row>
              <Card/>
            </Row>
            <Row>
              <Card/>
            </Row>
            <Row>
              <Card/>
            </Row>
          </Col>
          <Col>
            <Card/>
          </Col>
          <Col>
            <Card/>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}
