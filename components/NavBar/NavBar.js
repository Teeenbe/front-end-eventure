import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import LoginButton from '../LoginButton/index'
import Profile from '../Profile/index'
import Link from 'next/link'
import CreateEventButton from '../CreateButton/index'
import MyEventsButton from '../MyEvents'

import styles from './NavBar.module.css'
import { useStyles } from './NavBarMaterialCss.js'

const NavBar = () => {
    const { user, isAuthenticated } = useAuth0()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const classes = useStyles()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={styles.container}>
            <nav>
                {/* <div elevation="0" className={classes.box}> */}
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <div className={styles.linksContainer}>
                            <img
                                className={styles.logo}
                                id="logo"
                                src="/eVenture.png"
                                alt="logo"
                            />
                            <Link
                                variant="h6"
                                //color="textPrimary"
                                href="/"
                                className={classes.link}
                            >
                                <a className={styles.link}>HOME </a>
                            </Link>
                            <Link
                                href="/events-page"
                                variant="h6"
                                //color="textPrimary"
                                className={classes.link}
                            >
                                <a className={styles.link}>EVENTS</a>
                            </Link>
                            {user && (
                                <Link
                                    href="/my-events"
                                    variant="h6"
                                    //color="textPrimary"
                                    className={classes.link}
                                >
                                    <a className={styles.link}>MY EVENTS</a>
                                </Link>
                            )}
                            {isAuthenticated && Object.values(user)[0][0] && (
                                <Link
                                    href="/create-event-page"
                                    variant="h6"
                                    //color="textPrimary"
                                    className={classes.link}
                                >
                                    <a className={styles.link}>CREATE EVENT</a>
                                </Link>
                            )}
                        </div>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            {/* {isAuthenticated && Object.values(user)[0][0] && (
                                    <MenuItem onClick={handleClose}>
                                        <CreateEventButton />
                                    </MenuItem>
                                )}
                                <MenuItem onClick={handleClose}>
                                    <MyEventsButton />
                                </MenuItem> */}
                            <MenuItem onClick={handleClose}>
                                <LoginButton />
                            </MenuItem>
                        </Menu>
                        {!user ? (
                            <LoginButton />
                        ) : (
                            <>
                                <div>
                                    <div className={styles.profileLogin}>
                                        <Profile />

                                        <IconButton
                                            aria-label="more"
                                            aria-controls="long-menu"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            className={classes.menu}
                                        >
                                            <ChevronRight />
                                        </IconButton>
                                    </div>
                                </div>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                {/* </div> */}
            </nav>
        </div>
    )
}

export default NavBar
