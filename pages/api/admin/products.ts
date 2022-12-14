import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces/product';
import Product from '../../../models/Product';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );
type Data = 
| {  message: string }
| IProduct[]
| IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

           switch (req.method) {
            case 'GET':
                 return getProducts(req, res);
                
            case 'PUT':
                return updateProduct(req, res);
                
            case 'POST':
                return createProduct(req, res);
            default:
                return res.status(400).json({ message: 'Bad request' })
           }



    
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
     
    await db.connect()
    const products = await Product.find()
                                  .sort({gender: 'asc'})
                                  .lean();
    await db.disconnect();

     //Última parte sobre las imágenes en el dashboard / admin. No van antes.
  const updatedProducts = products.map( product => {
     product.images = product.images.map( image => {
       return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
  });
     return product;
   })
 
 
    
      return res.status(200).json(updatedProducts);
}


async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
      
     const { _id = '', images = [] } = req.body as IProduct;

     if(!isValidObjectId( _id ) ) {
          return res.status(400).json({ message: 'El id del producto no es válido'});
     }

     if( images.length < 4 ) {
          return res.status(400).json({ message: 'Es necesario al menos 2 imágenes'})
     }
    

    try {

      await db.connect();
      const product = await Product.findById(_id);
      if( !product ) {
          return res.status(400).json({ message: 'No existe producto con ese id'});
      }

      product.images.forEach( async(image) => {
           if( !images.includes(image)) {
             
              const [ fileId, extension ]= image.substring( image.lastIndexOf('/') + 1).split('.');
              await cloudinary.uploader.destroy( fileId );
           }
      })


      await product.update(req.body);
      await db.disconnect();

      return res.status(200).json( product );

    } catch (error) {
       console.log(error);
       await db.disconnect();
       return res.status(400).json({ message: 'Revisar la consola del servidor'});
    }



    
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { images = [] } = req.body as IProduct;
    
    if( images.length < 4 ) {
      return res.status(400).json({ message: 'El producto necesita al menos 4 imágenes'});
    }

    try {

     await db.connect();
     const productInDB = await Product.findOne({ slug: req.body.slug});

     if ( productInDB ) {
          return res.status(400).json({ message: 'Ya existe un producto con ese slug'});
     }

     const product = new Product( req.body );
     await product.save();
     await db.disconnect();
    
     return res.status(201).json( product );

    } catch (error) {
     console.log(error);
     await db.disconnect();
     return res.status(400).json({ message: 'Revisar la consola del servidor'});
    }
     
}

