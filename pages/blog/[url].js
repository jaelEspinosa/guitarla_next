import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import Image from 'next/image'
import { formatearFecha } from "../../helpers"
import styles from '../../styles/Entrada.module.css'
import Link from 'next/link'


const EntradaBlog = ({entrada,carrito}) => {
  const router = useRouter()
  const {titulo, contenido, published_at, id, imagen }=entrada[0]
  
  
   return (
     <Layout 
     pagina={titulo}
     carrito={carrito}
     >
    <main className="contenedor">

      <h1 className="heading">{titulo}</h1>
      <article className={styles.entrada}>
        <Image layout="responsive" width={800} height={600} src={imagen.url}alt = {`imagen de ${titulo}`}></Image>
        <div className={styles.contenido}>
          <p className={styles.fecha}>{formatearFecha(published_at)}</p>
          <p className={styles.texto}>{contenido}</p>
        </div>
        <div className={styles.volver}>
          <Link  href='/blog'>volver atrás</Link>
        </div>
     </article>
      
      </main>
    </Layout>
  )
}
//***Se puede hacer con esta (getStaticPaths) y tambien se puede con getServerSideProps que esta comentada a partir de la linea 49*********

// utilizando getStaticPaths 

export async function getStaticPaths(){
  const url = `${process.env.API_URL}/blogs`
  const respuesta = await fetch(url)
  const entradas = await respuesta.json()
  const paths = entradas.map(entrada => ({
    params:{url: entrada.url}
    
  }))
  
  return{
    paths,
    fallback: false

  }

}


export async function getStaticProps({params:{ url }}){
  const urlBlog =`${process.env.API_URL}/blogs?url=${url}` 
  const respuesta = await fetch(urlBlog)
  const entrada = await respuesta.json()
    return {
    props:{
      entrada:entrada
    }
  }
}

// utilizando getServerSideProps

/* export async function getServerSideProps({query:{url}}){
  const urlBlog =`${process.env.API_URL}/blogs?url=${url}` 
  const respuesta = await fetch(urlBlog)
  const entrada = await respuesta.json()
  

  return {
    props:{
      entrada
    }
  }
} */

export default EntradaBlog