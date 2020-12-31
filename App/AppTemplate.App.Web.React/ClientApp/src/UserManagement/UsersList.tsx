import React from 'react';
import {Columns, DataGrid, RowsProp} from '@material-ui/data-grid';
import {Typography} from '@material-ui/core';

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

class UsersList extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="h6">
                    Users
                </Typography>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection/>
                </div>
            </div>
        );
    }
}

export default UsersList;
