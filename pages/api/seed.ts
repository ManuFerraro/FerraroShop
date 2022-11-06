import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database';
import { indexProducts } from '../../database/indexProducts';
import { initialData } from '../../database/seed-data';
import CatalogueProduct from '../../models/CatalogueProduct';
import Order from '../../models/Order';
import Product from '../../models/Product';
import User from '../../models/User';


type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if( process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este servicio'});
    }

   await db.connect();
   await Product.deleteMany();
   await Product.insertMany(initialData.products);
   await User.deleteMany();
   await User.insertMany(initialData.users);
   await CatalogueProduct.deleteMany();
   await CatalogueProduct.insertMany(indexProducts.catalogue);
   await Order.deleteMany()
   
   await db.disconnect();
      

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}
