export const getStrapiURL = (path = "") => {
    //SI existe la variable de entorno utilice proces.env... y concatene el path o utilice el http://127.0.0.1 mas el path
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337"
    }${path}`;
  }