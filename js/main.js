/* Funcion */
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
     

    let items = data.response
    const productos = document.querySelector("#productos")
    const productosJuguetes = document.querySelector(".juguetes")
    const productosFarmacia = document.querySelector(".farmacia")
      
    const stacts = {
   
     juguetes: [],
     medicamentos: [],
   }
   
   
   /* Separando  */
     
   function filtrarPorCategoria( arrayCategoria,categoria) {
     
     items.map(item => {
       
       if (item.tipo === categoria) {
         arrayCategoria.push(item)
     }
     })
     
   }    
   filtrarPorCategoria( stacts.juguetes , "Juguete") 
   filtrarPorCategoria( stacts.medicamentos ,"Medicamento") 
  

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
              tengoOferta = "Ultimas unidades"
              
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
                      <p class="precio_producto"> $ ${producto.precio} </p>
                      <p> STOCK: <span> ${producto.stock}</span>
                    </div>
                     <div>
                      <p class="mostrarCartel"> ${tengoOferta}</p>
                     </div>
                    <div class="agregar_carrito">
                    <button id="${producto._id}"  class="btn" >Hacé tu pedido!</button>
                        <button id="D-${producto._id}" class="descripcion_mostrar_btn">Ver más</button>
                       <p id="O-${producto._id}" class="descripcion_oculta" > ${producto.descripcion} </p>
                    </div>

             `
            productos.appendChild(cajita)
         
            const texto = document.getElementById("O-" + producto._id)
            const botonDescripcion = document.getElementById("D-" + producto._id)
            const botonComprar = document.getElementById( producto._id)
 
            botonDescripcion.addEventListener('click', () => {
               
              if (texto.className === "descripcion_oculta") {
                texto.className = "descripcion_mostrar"
               botonDescripcion.innerText = "Ver menos"
               
              }  else {
                texto.className = "descripcion_oculta"
               botonDescripcion.innerText = "Ver más"
               
              }

            })
            
            botonComprar.addEventListener('click' , redirecionCompra)
           
      
          })
        
       function redirecionCompra(e) {
         let producto = e.target.parentElement
        
         let idProducto = producto.querySelector("button").getAttribute("id")

         let objProducto = array.find(producto => producto._id === idProducto)

         let enviarMensaje = window.open(`https://api.whatsapp.com/send?phone=541123430495&text=Hola%20me%20gustaria%C3%ADa%20comprar%20el%20producto *${objProducto.nombre}*`)
       }
       
   }
      
} 