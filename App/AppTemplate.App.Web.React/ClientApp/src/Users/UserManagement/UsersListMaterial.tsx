import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

import {
    Columns,
    DataGrid,
    PageChangeParams,
    SortDirection,
    SortModelParams,
    ValueGetterParams
} from '@material-ui/data-grid';

import {Typography} from '@material-ui/core';

import {User} from './user';
import {SearchQuery} from 'Core/searchQuery';
import {ResultsList} from 'Core/resultsList';
import {parseIsoDate} from 'Core/formatting';


const columns: Columns = [
    {field: 'id', headerName: 'ID', flex:1 },
    {field: 'username', headerName: 'User Name', flex: 5},
    {field: 'fullName', headerName: 'Full name', flex: 10},
    {field: 'createdOn', headerName: 'Created On', flex: 10, type: 'dateTime',
        valueGetter: (p)=> parseIsoDate(p.value)},
    {field: 'email', headerName: 'Email', flex: 10},
];

function UsersList() {
    const [isLoading, setIsLoadingInternal] = useState(false);
    const setIsLoading = _.debounce((state: boolean) => setIsLoadingInternal(state), 300);

    const [items, setItems] = useState<User[]>([]);

    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState<SortDirection>('asc');

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        setIsLoading(true);

        let query: SearchQuery = {
            pageSize: pageSize,
            pageIndex: page -1,
            sortField: sortField,
            isDesc: sortOrder === 'desc',
            keyword: ''
        };

        axios.post<ResultsList<User>>('api/Users/Search', query)
            .then(res => {
                setItems(res.data.items);
                setTotalCount(res.data.totalCount);
            })
            .finally(() => setIsLoading(false));
    }, [page, pageSize, sortField, sortOrder]);

    const handlePageChange = (params: PageChangeParams) => {
        setPage(params.page);
    };

    const handleSortModelChange = (params: SortModelParams) => {
        setSortField(params.sortModel[0]?.field);
        setSortOrder(params.sortModel[0]?.sort);
    };

    return (
        <div>
            <Typography variant="h6">
                Users
            </Typography>
            <div>
                <DataGrid autoHeight={true}
                    key={'id'}
                    rows={items}
                    columns={columns}
                    loading={isLoading}
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
