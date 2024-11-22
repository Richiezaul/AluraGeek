const URL = 'http://localhost:3001/Productos';

const productList = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`,{
        method:"DELETE",
        headers:{

          "Content-Type": "application/json"
        }
      });

      console.log(`Producto con id ${id} eliminado exitosamente`);

    } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    }
  };


  // const createProduct = async (name, price, image) => {
  //   try {
  //     const response = await fetch(URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, price, image }),
  //     });
  
  //     const data = await response.json();
  //     console.log("Solicitud POST exitosa:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error en la solicitud POST:", error);
  //   }
  // };


  const createProducts = async (nombre,price,img)=>{

    try{
    const data = await fetch(URL,{

      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({nombre,price,img})
    });
  }catch(error){

    console.error("Error en la solicitud POST:", error);

  }


  }


  export const servicesProducts = {

    productList,
    createProducts,
    deleteProduct

  };
