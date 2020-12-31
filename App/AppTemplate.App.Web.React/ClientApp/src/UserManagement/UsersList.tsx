import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Columns, DataGrid, RowsProp} from '@material-ui/data-grid';
import {Typography} from '@material-ui/core';
import {User} from './user';
import {SearchQuery} from '../Core/searchQuery';
import {ResultsList} from '../Core/resultsList';

const columns: Columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'username', headerName: 'User Name', width: 130},
    {field: 'fullName', headerName: 'Full name', width: 130},
    {field: 'createdOn', headerName: 'Created On', width: 200, type: 'dateTime'},
    {field: 'email', headerName: 'Email', width: 130},
];

const rows: RowsProp = [
    {id: 1, username: 'Snow', fullName: 'Jon Vissel', createdOn: new Date(), email: 'rr@rr.com'},
    {id: 2, username: 'Lannister', fullName: 'Cersei Iron', createdOn: new Date(), email: null},
];

function UsersList() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<User[]>([]);

    useEffect(() => {
        let query = new SearchQuery();
        axios.post<ResultsList<User>>('api/Users/Search', query)
            .then(res => {
                setIsLoaded(true);
                setItems(res.data.items);
            });
    },[]);

    return (
        <div>
            <Typography variant="h6">
                Users
            </Typography>
            { isLoaded &&
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid rows={items} columns={columns} pageSize={10}/>
                </div>
            }
        </div>
    );
}

export default UsersList;
