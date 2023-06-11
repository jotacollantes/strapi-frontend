import { getStrapiURL } from '@/helpers/api-helper'
import { fetchApi } from '@/helpers/fetch-api'
import React from 'react'
import PageHeader from '../components/PageHeader';
import PageCardImage from '../components/PageCardImage';
import { PostResponse } from '@/interface/post';
import PagePagination from '../components/PagePagination';


const getData= async(page=1,pageSize=2)=>{
    
    const path='/posts'

    //Creamos el objeto urlParamsObject par apandar los queryparams como objeto a la funcion fetchApi
    //*http://localhost:1337/api/posts?populate=*&filters[slug]=titulo-1&sort5[createdAt]=asc&pagination[page]=5&pagination[pageSize]=2
    
    const urlParamsObject={
      populate: "*",
      sort : {
        createdAt:'asc'
      },
      pagination:{
        page: page,
        pageSize: pageSize
      }

    }
    const {data,meta}=await fetchApi(path,urlParamsObject)
    //console.log(data)
    return {
      data,
      pagination: meta.pagination
    }
//Los componentes en next ahora pueden ser async
}
interface Props{
  searchParams: {
    page:string
  }
}

const Blog = async({searchParams}:Props) => {
  const {page}=searchParams  
  let pageNumber= page ? parseInt(page) : 1
   //Si el cliente ingresa cualquier valor que no es un numero o un valor menor a 1 se establece como pagina predeterminada la numero 1
  if (isNaN(pageNumber)|| pageNumber < 1 )
  {
    pageNumber=1
    console.log("Valor no valido como parametro de pagina. se establece a 1")  
  }
  

  const {data,pagination}=await getData(pageNumber)
    console.log({data})
    
    //console.log({pagination})
  return (
    <div className='space-y-8'>
      <PageHeader text={'Latest Post'} />
      <PagePagination pagination={pagination}/>
    {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    <div className='grid gap-4'>
      {
        data.map((post:PostResponse,ix:number)=>(<PageCardImage key={ix} post={post}/>))
      }
      
    </div>
    
    </div>
    
  )
}

export default Blog
