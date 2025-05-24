import { DataGrid, type GridColDef, type GridRowId } from '@mui/x-data-grid';
import { Layout } from '../components/Layout/Layout';
import { GridContainer } from '../components/Grid/GridContainer';
import Spacer from '../components/ui/Spacer';
import { Box } from '@mui/material';
import type { UserType } from '../lib/types';
import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { apiFactory } from '../lib/apiFactory';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/config';
import toast from 'react-hot-toast';

function UsersPage() {
  const userData = useSelector((state: RootState) => state.user.userData);

  const sessionToken = userData?.token || '';

  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const paginationModel = { page: 0, pageSize: 10 };
  const [usersData, setUsersData] = React.useState<UserType[]>([]);

  async function fetchData() {
    const response = await apiFactory().getUsers(sessionToken);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    setUsersData(response.data);
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(rowId: string) {
    try {
      const response = await apiFactory().deleteUser({
        userId: rowId,
        token: sessionToken,
      });
      if (response.error) {
        toast.error(response.error);
        return;
      }
      toast.success('User was deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss('deletingToastId');
    }
  }

  async function handleMultipleDelete() {
    const rowsToDelete: string[] = [];
    usersData?.forEach((item) => {
      if (
        selectedRows.includes(item.id) &&
        !item.isAdmin &&
        selectedRows.includes(item.id) &&
        !item.isUberAdmin
      ) {
        rowsToDelete.push(item.id);
      }
    });

    try {
      toast.loading('Deleting...', {
        id: 'deletingToastId',
      });
      const response = await apiFactory().deleteMultipleUsers({
        userIds: rowsToDelete as string[],
        token: sessionToken,
      });
      if (response?.error) {
        toast.error(response.error);
        return;
      }
      toast.success('Users were deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss('deletingToastId');
    }
  }

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
      width: 90,
      // valueGetter: (value, row) => {
      //   return row.isAdmin ? 'Admin' : 'User';
      // },
      renderCell: (params) => {
        if (params.row.isUberAdmin) {
          return (
            <p style={{ color: '#1376e1', fontWeight: 'bold' }}>UberAdmin</p>
          );
        }
        if (params.row.isAdmin) {
          return <p style={{ color: '#74cd48' }}>Admin</p>;
        }
        return <p style={{ color: '#d2ae1a' }}>User</p>;
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
            <Link
              to={'/user/' + params.row._id}
              className='flex-center-center-12'
            >
              <IconEdit size={20} cursor={'pointer'} />
            </Link>

            <IconTrash
              size={20}
              color={params.row.isAdmin ? '#000000' : '#ff0000'}
              cursor={params.row.isAdmin ? 'not-allowed' : 'pointer'}
              onClick={() => {
                params.row.isAdmin ? () => {} : handleDelete(params.row._id);
              }}
            />
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
        <div className='add-new-product-wrapper'>
          {selectedRows.length > 0 ? (
            <>
              <div className='flex-center-row-4'>
                <p>Delete all Selected rows: {selectedRows.length}</p>
                <IconTrash
                  color='#ff0000'
                  cursor={'pointer'}
                  onClick={handleMultipleDelete}
                />
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>

        <Box sx={{ height: 650, width: '100%' }}>
          <DataGrid
            onRowSelectionModelChange={(e: { ids: Set<GridRowId> }) => {
              console.log('first', e);
              const selectedRowIds = Array.from(e.ids).map((id) => id);
              setSelectedRows(selectedRowIds);
            }}
            rows={usersData?.slice(
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
            rows={usersData}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
            disableRowSelectionOnClick={true}
          />
        </Box>
      </GridContainer>
    </Layout>
  );
}

export default UsersPage;
