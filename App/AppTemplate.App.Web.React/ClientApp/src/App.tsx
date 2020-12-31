import React from 'react';
import {AppBar, Button, makeStyles, Toolbar, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    navigateButton: {
        marginLeft: theme.spacing(2),
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        App Template
                    </Typography>
                    <Button color="inherit" className={classes.navigateButton}>Users</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default App;
