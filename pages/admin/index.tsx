import {
  AttachMoneyOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  CreditCardOffOutlined,
  GroupOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { SummaryTile } from "../../components/admin/SummaryTile";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import useSWR from "swr";
import { DashboardSummaryResponse } from "../../interfaces/dashboard";
import { useState, useEffect } from "react";

const DashboarPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000, // 30 segundos
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadísticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle="Ordenes totales"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />

        <SummaryTile
          title={paidOrders}
          subTitle="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />

        <SummaryTile
          title={notPaidOrders}
          subTitle="Ordenes pendientes"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subTitle="Clientes"
          icon={<GroupOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle="Products"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          subTitle="Sin Existencias"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 50 }} />
          }
        />
        <SummaryTile
          title={lowInventory}
          subTitle="Bajo inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 50 }}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subTitle="Actualización en:"
          icon={<AccessTimeOutlined color="primary" sx={{ fontSize: 50 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import { db } from "../../database";
import User from "../../models/User";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = "" } = req.cookies;
  const { _id = "" }: any = jwt.decode(token);

  await db.connect();
  const { role }: any = await User.findById(_id);
  console.log(role);
  await db.disconnect();

  if (role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default DashboarPage;
