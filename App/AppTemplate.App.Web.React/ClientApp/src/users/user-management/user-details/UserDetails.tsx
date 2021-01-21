import { useParams } from "react-router-dom";
import CrudParams from 'core/crudParams';
import {Typography} from '@material-ui/core';
import React from 'react';

function UserDetails(){
    let { id } = useParams<CrudParams>();

    return (
        <Typography variant="h6">
            User {id}
        </Typography>
    );
}

export default UserDetails;
