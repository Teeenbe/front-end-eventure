import React from 'react'
import Head from 'next/head'

// COMPONENTS
import ButtonGeneral from '../components/Button/Button'
import Countdown from '../components/Countdown2'
import styles from '../styles/index.module.css'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import Eventcard from '../components/EventCard/EventCard'
import { serverUrl } from '../environment'
import { DateTime } from 'luxon'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    media: {
        height: 300
    }
})

function Home({ event }) {
    const classes = useStyles()

    function convertDate() {
        const dateFromIso = new DateTime.fromISO(
            `${event.date}T${event.time}.000Z`
        )
        const localeDate = dateFromIso.toLocaleString({
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
        return localeDate
    }

    function shortenDescription() {
        if (!event.description) {
            return '...'
        }
        const descArray = event?.description.split('')
        let shortDesc = descArray?.splice(0, 200)
        shortDesc = shortDesc?.join('').trim()
        shortDesc += '...'
        return shortDesc
    }

    return (
        <div className={styles.background}>
            <Head>
                <title>eVenture</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.heading}>
                <div className={styles.animation}>
                    <ul className={styles.mask}>
                        <li>Develop</li>
                        <li>Learn</li>
                        <li>Grow</li>
                        <li>Discover</li>
                        <li>Develop</li>
                    </ul>
                    <ul>
                        <li>Learn</li>
                        <li>Grow</li>
                        <li>Discover</li>
                        <li>Develop</li>
                        <li>Learn</li>
                    </ul>
                </div>
                with our community at School of Code
            </div>

            <div className={styles.div}>
                <div className={styles.container}>
                    {/* <div className={styles.eventContainer}>
                       <Typography variant="h3">Upcoming Event</Typography>

                        <div className={styles.eventDetails}>
                        
                            <img src={event.banner}></img>

                            <Typography variant="h4">{event.title}</Typography>

                            <Typography variant="h5">
                                <span
                                    style={{
                                        backgroundColor: '#fafafa',
                                        padding: '0vw 0.5vw 0vw 0.5vw'
                                    }}
                                >
                                    {convertDate()}
                                </span>
                            </Typography>

                            <p className={styles.description}>
                                {shortenDescription()}
                            </p>

                            <Link href={`/event/${event.id}`}>
                                <ButtonGeneral text={'FIND OUT MORE'} />
                            </Link>
                        </div>
                    </div> */}
                    <Card className={styles.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={event.banner}
                                title={event.banner}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {event.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {shortenDescription()}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link href={`/event/${event.id}`}>
                                <ButtonGeneral text={'FIND OUT MORE'} />
                            </Link>
                        </CardActions>
                    </Card>

                    {/* <div className={styles.imageContainer}>
                        <img
                            src="SoC-other.jpg"
                            className={styles.img}
                            alt="Cohort 4 on Zoom"
                        ></img>
                    </div> */}
                    <div className={styles.imageContainer}>
                        <a
                            href="www.schoolofcode.co.uk"
                            className={styles.textWithBlurredBg}
                        >
                            <img
                                src="SoC-other.jpg"
                                alt="Cohort 4 on Zoom"
                            ></img>
                            <h2>Join the School of Code</h2>
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.countdown}>
                {event.date && (
                    <Countdown
                        eventDate={event.date}
                        eventTime={event.time}
                        className={styles.countdown}
                    />
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${serverUrl}/events/date`)
    const { payload } = await res.json()
    const upcomingEvents = payload
    return { props: { event: upcomingEvents[0] } }
}

export default Home
