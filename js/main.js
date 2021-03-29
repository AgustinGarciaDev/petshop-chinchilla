async function obtenerDatosApi() {
    
    try {
        const respuesta = await fetch("https://apipetshop.herokuapp.com/api/articulos")
        var data = await respuesta.json()
        
        myProgram(data)
     }
    catch (error) {
      error
    }
}
obtenerDatosApi()

 function myProgram(data) {
     
     
    let array = data.response
    const productos = document.querySelector("#productos")
    const productosJuguetes = document.querySelector(".juguetes")
    const productosFarmacia = document.querySelector(".farmacia")
    const tablaCarrito = document.querySelector(".carrito_compras")
    let carrito = []


   /* formulario */
   const formulario = document.querySelector("#form")
   const submitBtn = document.querySelector("#enviar")
   
    const stacts = {
   
     juguetes: [],
     medicamentos: [],
     pocoStockJuguetes: [],
     pocoStockMedicamento: [],
   }
   
   
   /* Separando  */
     
   function filtrarCategoria( arrayCategoria,categoria) {
     
     array.map(item => {
       
       if (item.tipo === categoria) {
         arrayCategoria.push(item)
     }
     })
     
   }    
   filtrarCategoria( stacts.juguetes , "Juguete") 
   filtrarCategoria( stacts.medicamentos ,"Medicamento") 
  

     /* Imprimir */

     if (productosJuguetes) {
       mostrarProductos(stacts.juguetes)

   }
   
     if (productosFarmacia){
             mostrarProductos(stacts.medicamentos)
     }

     function mostrarProductos(array) {
         
          array.map(producto => {

            let tengoOferta
           
            if (producto.stock < 5) { 
             tengoOferta = "Últimas unidades"
            } else {
             tengoOferta = ""
            }
            const cajita = document.createElement('div')
            cajita.className = "producto"

            cajita.innerHTML += `
             
                <div class="img_producto">
                      <img class ="img_p" src="${producto.imagen}" alt="">
                    </div>
                    <div class="info_producto">
                      <h3>${producto.nombre}</h3>
                    </div>
                    <div class="precio">
                      <p class="precio_producto"> $ ${producto.precio}</p>
                      <p> STOCK: <span> ${producto.stock} </span>
                    </div>
                     <div class="mostrarCartel">
                     <p>${tengoOferta}</p>
                     </div>
                    <div class="agregar_carrito">
                    <button id="${producto._id}"  class="btn" >Agregar al Carrito</button>
                        <button id="D-${producto._id}" class="descripcion_mostrar_btn">Leer mas</button>
                       <p id="O-${producto._id}" class="descripcion_oculta" > ${producto.descripcion} </p>
                    </div>

             `
            productos.appendChild(cajita)

            const texto = document.getElementById("O-" + producto._id)
 
            document.getElementById("D-" + producto._id).addEventListener('click', () => {
               
              if (texto.className === "descripcion_oculta") {
              texto.className = "descripcion_mostrar"
              }  else {
              texto.className = "descripcion_oculta"
              }

            })
            
      
          })
   
       
   }
      
} 