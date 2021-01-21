import React from 'react';
import {Route} from 'react-router-dom';

import UsersList from './user-management/UsersList';
import UsersListAnt from './user-management/UsersListAnt';
import UsersListMaterial from './user-management/UsersListMaterial';

function Routes() {
    return (
        <React.Fragment>
            <Route path="/users">
                <UsersList/>
            </Route>
            <Route path="/users-ant">
                <UsersListAnt/>
            </Route>
            <Route path="/users-mat">
                <UsersListMaterial/>
            </Route>
        </React.Fragment>
    );
}

export default Routes;
