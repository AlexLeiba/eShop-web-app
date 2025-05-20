import { DataGrid, type GridColDef, type GridRowId } from '@mui/x-data-grid';
import { Layout } from '../components/Layout/Layout';
import { GridContainer } from '../components/Grid/GridContainer';
import Spacer from '../components/ui/Spacer';
import { Box } from '@mui/material';
import type { UserType } from '../lib/types';
import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function UsersPage() {
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const paginationModel = { page: 0, pageSize: 10 };

  function handleDelete(rowId: string) {
    console.log('🚀 ~ handleDelete ~ selectedRows:', rowId);
  }

  // function handleEdit(rowId: string) {
  //   console.log('🚀 ~ handleEdit ~ selectedRows:', rowId);
  // }

  console.log('🚀 ~ UsersPage ~ selectedRows:', selectedRows);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userName', headerName: 'Username', width: 130 },
    {
      field: 'name',
      headerName: 'Full name',
      width: 150,
      valueGetter: (value, row) => `${row.name || ''} ${row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 200,
    },
    {
      field: 'isAdmin',
      headerName: 'Role',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 60,
      valueGetter: (value, row) => {
        return row.isAdmin ? 'Admin' : 'User';
      },
    },
    {
      field: 'createdAt',
      headerName: 'Joined At',
      width: 100,
      valueGetter: (value, row) =>
        new Date(row.createdAt).toLocaleDateString('en-US', {
          year: '2-digit',
          month: 'short',
          day: 'numeric',
        }),
      sortable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex-center-center-12'>
            <div>
              <Link to={'/user/' + params.row.id}>
                <IconEdit size={20} cursor={'pointer'} />
              </Link>
            </div>
            <div>
              <IconTrash
                size={20}
                color='#ff0000'
                cursor={'pointer'}
                onClick={() => handleDelete(params.row.id)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <GridContainer fluid>
        <h1>Users</h1>
        <Spacer size={24} />

        <Box sx={{ height: 650, width: '100%' }}>
          <DataGrid
            onRowSelectionModelChange={(e: { ids: Set<GridRowId> }) => {
              const selectedRowIds = Array.from(e.ids).map((id) => id);
              setSelectedRows(selectedRowIds);
            }}
            rows={rowsData.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            onPaginationModelChange={(e: {
              page: number;
              pageSize: number;
            }) => {
              setPage(e.page);
              setRowsPerPage(e.pageSize);
            }}
            // @ts-ignore
            rows={rowsData}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Box>
      </GridContainer>
    </Layout>
  );
}

export default UsersPage;

const rowsData: UserType[] = [
  {
    id: '1',
    _id: '1',
    lastName: 'Snow',
    name: 'Jon',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '2',
    _id: '2',
    lastName: 'Lannister',
    name: 'Cersei',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '3',
    _id: '3',
    lastName: 'Lannister',
    name: 'Jaime',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '4',
    _id: '4',
    lastName: 'Stark',
    name: 'Arya',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '5',
    _id: '5',
    lastName: 'Targaryen',
    name: 'Daenerys',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '6',
    _id: '6',
    lastName: 'Melisandre',
    name: 'name',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '7',
    _id: '7',
    lastName: 'Clifford',
    name: 'Ferrara',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '8',
    _id: '8',
    lastName: 'Frances',
    name: 'Rossini',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
  {
    id: '9',
    _id: '9',
    lastName: 'Roxie',
    name: 'Harvey',
    email: 'email@sa',
    isAdmin: false,
    userName: 'username here',
    createdAt: '11-02-25',
    updatedAt: '11-02-25',
  },
];
