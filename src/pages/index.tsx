import type { NextPage } from 'next'
import {GetStaticProps} from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButtton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps{ 
  product:{
    priceId:string;
    amount:number;
  }
}

export default function Home ({product}:HomeProps) {
  return (
    < >
      <Head>
        <title>Home | ig.news</title>
   
      </Head>

      <main className={styles.contentContainer} >  
        <section className={styles.hero} >
          <span>Hey Welcome 👏 </span>
          <h1>News about the <span>React</span> world </h1>
          <p>
            Get acess to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Gril Coding" />
        
      </main>
    </>
  )
}

export const getStaticProps:GetStaticProps=async()=>{
  const price = await stripe.prices.retrieve('price_1JgDedDME4ivVO93wn84L70z',{
    expand:['product']
  })
  const product={
    priceId:price.id,
    amount:new Intl.NumberFormat('en-US',{
      style:'currency',
      currency:'USD'
    }).format(price.unit_amount/100)

  }
  return {
      props:{
        product,
  },
  revalidate:60*60*24
}
}

