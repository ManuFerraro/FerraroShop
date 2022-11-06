import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import Product from '../../../models/Product'
import { IProduct } from '../../../interfaces/product';


type Data = {  message: string }
| IProduct;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
             return getProductBySlug(req, res)
            
    
        default:
            return res.status(200).json({message: 'Bad request'})
    }


  
}

 async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {

    db.connect();
    const { slug } = req.query;
    const product = await Product.findOne({slug}).lean();
    db.disconnect();

    if (!product ) {
        return res.status(404).json({
            message: 'Producto no encontrado'
        })
    }

    
        product.images = product.images.map( image => {
          return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
     });
       
     
    return res.json( product );

    
}
