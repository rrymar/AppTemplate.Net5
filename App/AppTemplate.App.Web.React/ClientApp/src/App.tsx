import React from 'react';
import {AppBar, Button, makeStyles, Toolbar, Link} from '@material-ui/core';
import {Link as RouterLink, Router, Route, Switch} from 'react-router-dom';
import UsersList from './UserManagement/UsersList';
import {createBrowserHistory} from 'history';

const useStyles = makeStyles((theme) => ({
    navigateButton: {
        marginLeft: theme.spacing(2),
    },
    pageContainer: {
        margin: theme.spacing(2),
    }
}));

const history = createBrowserHistory();

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <Router history={history}>
                <AppBar position="static">
                    <Toolbar>
                        <Link
                            variant="h6"
                            component={RouterLink}
                            color="inherit"
                            to="/">
                            App Template
                        </Link>
                        <Button
                            color="inherit"
                            className={classes.navigateButton}
                            component={RouterLink}
                            to="/users"
                        >
                            Users
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.pageContainer}>
                    <Switch>
                        <Route path="/users">
                            <UsersList/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
