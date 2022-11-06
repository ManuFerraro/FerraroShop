import { NextPage } from 'next';
import Image from 'next/image';
import styles from '../../styles/product/Slug.module.css';
import { ProductLayout } from '../../components/layouts/ProductLayout';
import { MdKeyboardBackspace } from 'react-icons/md';

import { IProduct, ISize } from '../../interfaces/product';
import { useState, useContext } from 'react';
import { SizeSelector } from '../../components/products/SizeSelector';
import { Button, CardActionArea, CardMedia } from "@mui/material";
import { ProductSlideshow } from '../../components/products/SlideProducts';



interface Props{
   product: IProduct
}




const SlugPage: NextPage<Props> = ({ product }) => {

   const [handleImage, setHandleImage] = useState(product.images[0]);
   const [sizeChange, setSizeChange] = useState(false);
   const [imageOpacity, setImageOpacity] = useState(false);


  const handleChange = (image: string) => {
     setHandleImage(image);
  }

  const handleSizeChange = () => {
     setSizeChange(!sizeChange);
  }
  
  const router = useRouter();

  const { addProductToCart } = useContext( CartContext )



  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
         _id: product._id,
         image: product.images[0],
         price: product.price,
         size: undefined,
         slug:product.slug, 
         title: product.title, 
         gender: product.gender, 
         quantity: 1, 
  })

  const onSelectedSize = (size: ISize ) => {
     setTempCartProduct( currentProduct => ({
      ...currentProduct,
        size
     }))
  }

 const onUpdatedQuantity = (quantity: number) => {
   setTempCartProduct( currentProduct => ({
      ...currentProduct,
        quantity
     }))

 }



  const onAddProduct = () => {
     if(!tempCartProduct.size) { return; }
     addProductToCart(tempCartProduct);
   //   router.push(`/cart?p=${router.asPath}`);
     
  }
console.log(handleImage)

  return (
      <ProductLayout>
        <div className={styles.columnsContainer}>
           <div className={styles.imagesContainer}>
              <ProductSlideshow images={product.images}  />
                 <div className={styles.slugBack}>
                        <MdKeyboardBackspace className={styles.slugBack_icon} />
                        <span>Back</span>
                 </div>
              <div className={styles.imagesRows}>
                 <div className={styles.imagesColumnI}>
                         
                         { 
                            product.images.map( (products, index) => (
                                
                              <div key={ index } className={styles.cardSmallImages} id='fs'>
                              
                                 { <Image 
                                  src={products}
                                  alt={product.title}
                                  width={100}
                                  height={100}
                                  onClick={ () => {handleChange(products)}}
                                 
                                /> }
                                
                              </div>
                               
                            ))

                         } 
                 </div>


                 <div className={styles.imagesColumnII}>
                                     <div className={styles.cardLargeImage}>
                                       
                                           {<Image 
                                                src={handleImage}
                                                alt={product.title}
                                                width= {700}
                                                height={740}
                                                
                                            />  }
                                       
                             
                                     </div>
                 </div>
              </div>
           </div>
           <div className={styles.descriptionContainer}>
                      <div className={styles.descriptionProducContainer}>
                              <div className={styles.description__title}>
                              {product.title}
                              </div>
                              <div className={styles.description__price}>
                                 {`$${product.price}`}
                              </div>
                              <div className={styles.description__color}>
                                      <span>COLOR</span>
                                      <span className={styles.descColor}>Bleu Cordiérite</span>
                              </div>
                              <div className={styles.description__img}>
                                     {  <Image
                                          src={product.images[3]}
                                          alt={product.title}
                                          width={60}
                                          height={60}
                                          style={{borderBottom: '3px solid black', paddingBottom:'1.8px'}}
                                         
                                      /> } 

                                 <CardActionArea>
                               <CardMedia
                                       image={product.images[3]}
                               />
                               </CardActionArea>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px'}}>
                                 <span>Cantidad</span>
                                 <ItemCounter
                                  currentValue={ tempCartProduct.quantity}
                                  updatedQuantity={ (newValue) => onUpdatedQuantity(newValue)}
                                  maxValue={ product.inStock > 10 ? 5 : product.inStock}
                                 />
                              </div>
                              <Button
                               className={styles.description__size} 
                               onClick={() =>  handleSizeChange()}
                               sx={{outline: 'none'}}
                               >
                                  <span>SIZE</span>
                                  <AiFillCaretDown className={styles.sizeButton} style={{transform: sizeChange ? 'rotate(180deg)' : 'none' }} />
                              </Button>
                             { sizeChange && <div className={styles.description__size__wrap}>
                                   <span>Size Guide</span>
                                   <SizeSelector selectedSize={tempCartProduct.size} size={product.sizes} onSelectedSize={ (size) => onSelectedSize(size)} />
                              </div> }
                              {
                                 (product.inStock > 0) ? (
                                    
                                       
                                          (tempCartProduct.size)
                                          ? <button className={styles.description__addToCart} onClick={ onAddProduct }>Add Product</button> 
                                          : <button className={styles.description__addToCart} onClick={ onAddProduct }>Select Size</button>
                                       
                                       
                                    
                                 ) : (
                                    <button className={styles.description__addToCart}>
                                        Product not avilable
                                    </button>
                                 )
                              }
                              

                              <div className={styles.description__description}>
                                          { product.description }
                              </div>
                              <div className={styles.description__subDescription}>
                                       <span>- Knit with motifs inspired by the design</span>
                                       <span>- High boatneck collar with rib trim</span>
                              </div>
                              <div className={styles.description__made}>
                                             Made in France
                              </div>
                      </div>
           </div>
        </div>


      </ProductLayout>
  )
}




import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
   const productSlug = await dbProducts.getAllProductSlug();

   return {
      paths: productSlug.map( ({ slug }) => ({

         params: {
               slug
         }
      

      })),

      fallback: "blocking"
   }
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetStaticProps } from 'next'
import { dbProducts } from '../../database';
import { ICartProduct } from '../../interfaces/cart';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart';
import { AiFillCaretDown } from 'react-icons/Ai';


export const getStaticProps:GetStaticProps = async ({ params }) => {
   
    const { slug = ''} = params as {slug: string};
    const product = await dbProducts.getProductBySlug(slug);
    

    if (!product ) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
     }


   return {
      props: {
         product
      },
      revalidate: 60 * 60 * 24
   }
}






export default SlugPage;