import { fetchApi } from "@/helpers/fetch-api"
import { PostResponse } from "@/interface/post";
import {notFound} from "next/navigation"
import PageHeader from '../../components/PageHeader';
import { formatDate } from "@/helpers/format-date-helper";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from 'next/image'
const getData= async(slug: string)=>{
  const path="/posts";
  const urlParamsObject={
    populate:"image",
    filters:{
      slug:slug
    }
  }

  //Desestructuramos el objeto data que devuelve una propiedad llamada data
  const {data}=await fetchApi(path,urlParamsObject)
  //La propiedad data es un array por lo tanto devolvemos el primer elemento
  return data[0]
}
interface Props {
  params :{
    slug: string
  }
}
const Slug = async({params}:Props) => {
  const {slug}=params
  const post:PostResponse = await getData(slug)
  
  if (!post){
    notFound()
  }

  const {title,body,description,createdAt,image} = post.attributes
  const {url,width,height} =image.data.attributes.formats.medium

  return (
    <div className="space-y-8">
      <PageHeader text={title} />
      <p className="text-gray-500">{formatDate(createdAt)}</p>
      <Image
      className="rounded-t-lg"
      src={url}
      alt={`image ${title}`}
      width={width}
      height={height}
      />
            

            <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
              {description}
            </p>
            <div className="prose">
              <MDXRemote source={body}/>
            </div>

    </div>
  )
}

export default Slug