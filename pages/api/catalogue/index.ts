import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { ICatalogue } from '../../../interfaces/catalogue';
import CatalogueProduct from '../../../models/CatalogueProduct';

type Data = {  message: string }
| ICatalogue[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
        switch (req.method) {
            case 'GET':
                return allCatalogueProducts(req, res);
                
        
            default:
                return res.status(400).json({ message: 'Bad request'});
        }





   
}

async function allCatalogueProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

   await db.connect();
   const CatalogueProducts = await CatalogueProduct.find().lean()
   await db.disconnect();

   return res.status(200).json(CatalogueProducts);

    
}
