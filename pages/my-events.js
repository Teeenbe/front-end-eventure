import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { useStyles } from '../styles/events-page-materialCss'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import Typography from '@material-ui/core/Typography'
import ButtonGeneral from '../components/Button/Button'
import EventCard from '../components/EventCard/EventCard'

// ENVIRONMENT
import { serverUrl } from '../environment'

function MyEventsPage() {
    const { user, getAccessTokenSilently } = useAuth0()
    console.log(user)
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (user) {
            async function getTicketsByUser() {
                const accessToken = await getAccessTokenSilently()
                console.log(accessToken)

                const response = await fetch(
                    `${serverUrl}/prot/tickets?email=${user.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )

                const data = await response.json()
                setEvents(data.payload)
            }

            getTicketsByUser()
            console.log(events)
        }
    }, [user])

    const classes = useStyles()

    return (
        <div>
            <Head>
                <title>eVenture</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {events && events.length > 0 ? (
                <div className={classes.eventpage}>
                    <Typography variant="h2">
                        Events you're signed up for:
                    </Typography>
                    {events.map((event) => (
                        <div key={event.id} className={classes.event}>
                            <Link
                                href="/event/[id]"
                                as={`/event/${event.event_id}`}
                            >
                                <a className={classes.linkSpecific}>
                                    <EventCard event={event} />
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexdirection: 'column',
                        alignItems: 'center',
                        alignContent: 'stretch',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        width: '75rem',
                        margin: '3rem auto 5rem auto'
                    }}
                >
                    <img
                        src="/NoTicketsYet.svg"
                        id="NoTicketsYet"
                        alt="You haven't signed up for any events yet."
                        style={{
                            width: '75 rem'
                        }}
                    />
                    <a href="/events-page">
                        <ButtonGeneral
                            style={{
                                padding: '1rem',
                                margin: '1rem',
                                fontSize: '1.2rem'
                            }}
                            text={'Sign up for events here!'}
                        ></ButtonGeneral>
                    </a>
                </div>
            )}
        </div>
    )
}

export default withAuthenticationRequired(MyEventsPage, {
    onRedirecting: () => <Loading />
})
