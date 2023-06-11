import Link from 'next/link'
import React from 'react'
interface Props{
    pagination:{
        page:number, //Pagina actual
        pageSize:number, // numero de elementos por pagina
        pageCount:number, //total de paginas
        total:number//total de elementos
    }
}
const PagePagination = ({pagination}:Props) => {
    const {page,pageSize,pageCount,total} = pagination
    const classNumber="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    const classNumberActive="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
    const classPrevious="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    const classNext="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  return (
    <nav aria-label="Page navigation example"
    className='text-center'
    >
  <ul className="inline-flex -space-x-px">
    <li>
    {/* SI la pagina es la 1 lo redireccionamos a la misma pagina 1, caso contrario si es otra pagina se lo retrocera a la anterior */}
      <Link href={page === 1 ? `/blog?page=${page}` :`/blog?page=${page-1}`}
      className={`${classPrevious} ${page===1 ? "opacity-50 pointer-events-none" :""}}`}>Previous</Link>
    </li>
    {/* <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li> */}
    {
        Array.from({length: pageCount}).map((_,ix:number)=>(<li>
            <Link href={`/blog?page=${ix+1}`} className={
                ix+1===page ? classNumberActive :classNumber
            }>
             {ix+1}
             </Link>
          </li>))
    }
    
    <li>
    <Link href={page === pageCount ? `/blog?page=${page}` :`/blog?page=${page-1}`}
      className={`${classNext} ${page===pageCount ? "opacity-50 pointer-events-none" :""}}`}>Next</Link>
    </li>
  </ul>
</nav>
  )
}

export default PagePagination