import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Columns, DataGrid, PageChangeParams, SortItem, SortModel, SortModelParams} from '@material-ui/data-grid';
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

const rows: User[] = [
    {
        id: 1, username: 'Snow', fullName: 'Jon Vissel',
        createdOn: new Date(), email: 'rr@rr.com', firstName: 'aa', lastName: 'sdd', isSystemUser: false
    },
];

function UsersList() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalCount, setTotalCount] = useState<number>(0);

    const [sortModel, setSortModel] = useState<SortModel>(
        [{field: 'id', sort: 'asc'}]
    );

    const handlePageChange = (params: PageChangeParams) => {
        setPage(params.page);
    };

    const handleSortModelChange = (params: SortModelParams) => {
        setSortModel(params.sortModel);
    };

    useEffect(() => {
        let query: SearchQuery = {
            pageSize: pageSize,
            pageIndex: page - 1,
            sortField: sortModel[0]?.field,
            isDesc: sortModel[0]?.sort === 'desc',
            keyword: ''
        };
        axios.post<ResultsList<User>>('api/Users/Search', query)
            .then(res => {
                setItems(res.data.items);
                setTotalCount(res.data.totalCount);
                setIsLoaded(true);
            });
    }, [page, sortModel, pageSize]);

    return (
        <div>
            <Typography variant="h6">
                Users
            </Typography>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    key={'id'}
                    rows={items}
                    columns={columns}
                    loading={!isLoaded}
                    pageSize={pageSize}
                    paginationMode={'server'}
                    rowCount={totalCount}
                    onPageChange={handlePageChange}
                    sortingMode={'server'}
                    onSortModelChange={handleSortModelChange}
                />
            </div>
        </div>
    );
}

export default UsersList;
