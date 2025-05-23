import { DataGrid, type GridColDef, type GridRowId } from '@mui/x-data-grid';
import { Layout } from '../components/Layout/Layout';
import { GridContainer } from '../components/Grid/GridContainer';
import Spacer from '../components/ui/Spacer';
import { Box } from '@mui/material';
import type { ProductsType } from '../lib/types';
import React, { useEffect } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button/Button';
import '../components/ProductsPage/ProductsPage.scss';
import toast from 'react-hot-toast';
import { apiFactory } from '../lib/apiFactory';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/config';

function ProductsPage() {
  const userData = useSelector((state: RootState) => state.user.userData);

  const sessionToken = userData?.token || '';
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const paginationModel = { page: 0, pageSize: 10 };
  const [productsData, setProductsData] = React.useState<ProductsType[]>([]);

  async function fetchData() {
    const response = await apiFactory().getProducts(sessionToken);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    setProductsData(response.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(rowId: string) {
    try {
      toast.loading('Deleting...', {
        id: 'deletingToastId',
      });
      const response = await apiFactory().deleteProduct({
        productId: rowId,
        token: sessionToken,
      });
      if (response.error) {
        toast.error(response.error);
        return;
      }
      toast.success('Product was deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss('deletingToastId');
    }
  }
  function handleMultipleDelete() {
    console.log('🚀 ~ handleDelete ~ selectedRows:', selectedRows);
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image',
      headerName: 'Image',
      width: 130,
      renderCell: (params) => {
        return (
          <div className='flex-center-center-12'>
            <img
              style={{ width: 60, height: 40, objectFit: 'contain' }}
              src={params.row.image}
              alt=''
            />
          </div>
        );
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
    },
    {
      field: 'categories',
      headerName: 'Category',
      width: 130,
      valueGetter: (value, row) => row.categories[0],
    },
    {
      field: 'isPublished',
      headerName: 'Published',
      width: 100,
      valueGetter: (value, row) => {
        return row.isPublished ? 'Yes' : 'No';
      },
    },
    {
      field: 'featured',
      headerName: 'Featured',
      width: 80,
      valueGetter: (value, row) => {
        return row.featured ? 'Yes' : 'No';
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
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
      field: 'price',
      headerName: 'Price',
      width: 60,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex-center-center-12'>
            <div>
              <Link to={'/product/' + params.row._id}>
                <IconEdit size={20} cursor={'pointer'} />
              </Link>
            </div>
            <div>
              <IconTrash
                size={20}
                color='#ff0000'
                cursor={'pointer'}
                onClick={() => handleDelete(params.row._id)}
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
        <h1>Products</h1>
        <Spacer size={24} />

        <div className='add-new-product-wrapper'>
          {selectedRows.length > 0 ? (
            <>
              <div className='flex-center-row-4'>
                <p>Delete all selected rows: {selectedRows.length}</p>
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
          <Link to={'/new-product'}>
            <Button widthSize={200}>Add new product</Button>
          </Link>
        </div>
        <Box sx={{ height: 650, width: '100%' }}>
          <DataGrid
            onRowSelectionModelChange={(e: { ids: Set<GridRowId> }) => {
              const selectedRowIds = Array.from(e.ids).map((id) => id);
              setSelectedRows(selectedRowIds);
            }}
            rows={productsData?.slice(
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
            rows={productsData}
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

export default ProductsPage;
