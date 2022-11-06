import React from 'react'
import { ShopLayout } from '../../components/layouts';
import { Typography, Grid, Chip, Link } from '@mui/material';

import NextLink from 'next/link';
import { DataGrid, GridRenderCellParams, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullName', headerName: 'Nombre Completo', width: 300},

    {
        field:'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden',
        width: 200,
        renderCell:  (params: GridRenderCellParams) => {
            return (
                params.row.paid
                   ? <Chip color='success' label='Pagada' variant='outlined' />
                   : <Chip color='error' label='No Pagada' variant='outlined' />
            )
        }
    },
    {
        field:'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell:  (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
];



interface Props {
   orders: IOrder[];
}

const HistoryPage: NextPage<Props>= ({orders}) => {

    const rows = orders.map((orders, idx) => ({
       id: idx + 1,
       paid: orders.isPaid,
       fullName: `${ orders.shippingAddress.firstName } ${ orders.shippingAddress.lastName }`,
       orderId: orders._id
    }))
    
  return (
    <ShopLayout>
         <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%'}}>
                <DataGrid
                     rows={ rows }
                     columns={columns}
                     pageSize={ 10 }
                     rowsPerPageOptions={ [10] }
                />
            </Grid>
         </Grid>

    </ShopLayout>
  )
}


import { GetServerSideProps, NextPage } from 'next';
import { jwt } from '../../utils';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces/order';

export const getServerSideProps: GetServerSideProps = async ({req}) => {
     
    const { token = '', lastName = '' } = req.cookies;
    let user;

    try {
        user = await jwt.isValidToken(token);
      } catch (error) {
        console.log(error)
      }
    
      if(!user) {
        return {
          redirect: {
            destination: `/auth/login?p=/orders/history`,
            permanent: false,
          }
        }
      }

      const orders = await dbOrders.getOrdersByUser(lastName);

    return {
        props: {
            orders
        }
    }
}


 export default HistoryPage;