import { DataGrid, type GridColDef, type GridRowId } from '@mui/x-data-grid';
import { Layout } from '../components/Layout/Layout';
import { GridContainer } from '../components/Grid/GridContainer';
import Spacer from '../components/ui/Spacer';
import { Box } from '@mui/material';
import type { ProductsType } from '../lib/types';
import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function TransactionsPage() {
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
    {
      field: 'image',
      headerName: 'Image',
      width: 130,
      renderCell: (params) => {
        return (
          <div className='flex-center-center-12'>
            <img style={{ width: 60 }} src={params.row.image} alt='' />
          </div>
        );
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 130,
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
      width: 130,
      valueGetter: (value, row) => {
        return row.isPublished ? 'Yes' : 'No';
      },
    },
    {
      field: 'featured',
      headerName: 'Featured',
      width: 130,
      valueGetter: (value, row) => {
        return row.featured ? 'Yes' : 'No';
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex-center-center-12'>
            <div>
              <Link to={'/product/' + params.row.id}>
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
        <h1>Transactions</h1>
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

export default TransactionsPage;

const rowsData: ProductsType[] = [
  {
    id: '1',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '2',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '3',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '4',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '5',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '6',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '7',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '8',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
  {
    id: '9',
    moreInfo:
      "Oldest Shirt: The oldest known shirt was found in Egypt and dates back to around 3000 BC. It was made from linen and had a tailored shape! T-Shirt Origin: The modern T-shirt evolved from undergarments used in the 19th century. The U.S. Navy started issuing them as standard undershirts in 1913.`T-Shirt` Name: It's called a `T-shirt` because of the shape it makes when laid flat—a T.",
    title: 'Shirt Jersey 3',
    description:
      'From Air Jordans that reshaped basketball culture to Flyknits spun like high-tech thread magic.',
    price: 90,
    image:
      'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
    images: [
      {
        colorName: 'red',
        image:
          'https://t3.ftcdn.net/jpg/07/15/01/58/240_F_715015801_j07s8OnaV9znfTan5uDVpmOL8OF793YH.png',
      },
      {
        colorName: 'blue',
        image:
          'https://static.vecteezy.com/system/resources/thumbnails/035/931/340/small_2x/ai-generated-realistic-set-of-male-blue-t-shirts-mockup-front-and-back-view-isolated-on-a-transparent-background-cut-out-png.png',
      },
    ],
    categories: ['shirts'],
    size: ['xs', 's', 'xl', 'xxl'],
    color: ['blue', 'red'],
    isPublished: true,
    inStock: true,
    featured: false,
    featuredBackgroundColor: '#d4b044',
    language: 'en',
    quantity: 1,
    _id: '682ae28d4bfe0c4d10679fce',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    __v: 0,
  },
];
