import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import { BodyInfo } from '../components/ui/bodyproducts/BodyInfo';
import { Catalogue } from '../components/ui/catalogue/CatalogueList';
import { TopInfo } from '../components/ui/topinfo/TopInfo';
import useSWR from "swr";





const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

const HomePage: NextPage = () => {
   
  
  // const { products, isLoading } = useCatalogues('catalogue')
  const { data, error } = useSWR('/api/catalogue', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return (
    <ShopLayout> 
         <TopInfo />
         <Catalogue  catalogue={ data }/>
         <BodyInfo />
    </ShopLayout>
  )
}

export default HomePage;
