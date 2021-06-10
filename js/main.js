/* Funcion */
async function obtenerDatosApi() {
    
    try {
      const respuesta = await fetch("https://apipetshop.herokuapp.com/api/articulos")
         
       var data = await respuesta.json()
        
   
        myProgram(data)
     }
    catch (error) {
      console.log(error)
    }
}
obtenerDatosApi()

 function myProgram(data) {
     

    let items = data.response
    const productos = document.querySelector("#productos")
    const productosJuguetes = document.querySelector(".juguetes")
    const productosFarmacia = document.querySelector(".farmacia")
    const vaciarCarrito = document.querySelector("#vaciarCarrito")
    var notyf = new Notyf()
   
    const stacts = {
   
     juguetes: [],
     medicamentos: [],
   }

   function filtrarPorCategoria( arrayCategoria,categoria) {
     
     items.map(item => {
       
       if (item.tipo === categoria) {
         arrayCategoria.push(item)
     }
     })
     
   }    
   filtrarPorCategoria( stacts.juguetes , "Juguete") 
   filtrarPorCategoria( stacts.medicamentos ,"Medicamento") 

     if (productosJuguetes) {
       mostrarProductos(stacts.juguetes)
        console.log("estas juguetes")
       }
   
     if (productosFarmacia){
       mostrarProductos(stacts.medicamentos)
       console.log("estas en farmacia")
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
                      <p class="precio_producto"> $ ${producto.precio} </p>
                      <p> STOCK: <span> ${producto.stock}</span>
                    </div>
                     <div>
                      <p class="mostrarCartel"> ${tengoOferta}</p>
                     </div>
                    <div class="agregar_carrito">
                    <button id="${producto._id}"  class="btn" >¡Hacé tu pedido!</button>
                        <button id="D-${producto._id}" class="descripcion_mostrar_btn">Ver más</button>
                       <p id="O-${producto._id}" class="descripcion_oculta" > ${producto.descripcion} </p>
                    </div> `
       productos.appendChild(cajita)
         
       const texto = document.getElementById("O-" + producto._id)
       const botonDescripcion = document.getElementById("D-" + producto._id)
       const botonComprar = document.getElementById(producto._id)
       botonDescripcion.addEventListener('click', () => {
               
         if (texto.className === "descripcion_oculta") {
           texto.className = "descripcion_mostrar"
           botonDescripcion.innerText = "Ver menos"
               
         } else {
           texto.className = "descripcion_oculta"
           botonDescripcion.innerText = "Ver más"
               
         }

       })
            
       botonComprar.addEventListener('click', redirecionCompra)     
      
     })
    
    
        let productosSelecionados = []

     if (localStorage.getItem('carrito')) {
       productosSelecionados = JSON.parse(localStorage.getItem('carrito'))
          
     }
     imprimirCarrito() 
     

     function redirecionCompra(e) {
       let producto = e.target.parentElement
        
       let idProducto = producto.querySelector("button").getAttribute("id")

       let objProducto = array.find(producto => producto._id === idProducto)
      
      
       productoDatos = {

         nombre: objProducto.nombre,
         id: objProducto._id,
         img: objProducto.imagen,
         precio: objProducto.precio,
         cantidad: 1,
         stock: objProducto.stock,
         total:objProducto.precio,
       }

      
       controlStock()
       imprimirCarrito()
       totalPrecioCarrito()
      
     }
    

     function totalPrecioCarrito() {
        
       if ("total") {
         
         let tablaTotal = document.querySelector("#totalPrecio")
        
       
       let totalPrecio = [] 

       productosSelecionados.map(producto =>  totalPrecio.push(producto.total))

      let sumaTotalProductos =  totalPrecio.reduce((acumulador, precio) => {
         
        return   acumulador + precio
 
      }, 0)
        
       
         
         if (productosSelecionados.length > 0) {
           tablaTotal.innerHTML = `<p class="totalProductoCarrito">TOTAL: $${sumaTotalProductos} </p> `
         } else {
           tablaTotal.innerHTML = `
           <img class="carritosvg" src="/img/carro-de-la-compra.svg" >
           <p class="totalProductoCarrito">Tu carrito está vacío</p>
            `
         }

         
       } else {
             let tablaTotal = document.querySelector("#totalPrecio")
       
       let totalPrecio = [] 

       productosSelecionados.map(producto =>  totalPrecio.push(producto.precio))

      let sumaTotalProductos =  totalPrecio.reduce((acumulador, precio) => {
         
        return   acumulador + precio
 
      }, 0)
       
            if (productosSelecionados.length > 0) {
              tablaTotal.innerHTML = `
           <p class="totalProductoCarrito">TOTAL: $${sumaTotalProductos} 
           </p> `
         }
       
       }

     }
    
     
      totalPrecioCarrito("precio")

       function imprimirCarrito() {
         
          document.getElementById("contenedorProductoList").innerHTML =""
         
         productosSelecionados.map(producto => {
           
      
           
           let contenedorProducto = document.createElement('div')
           contenedorProducto.classList = "producto_individual"

           contenedorProducto.innerHTML = `
           
                      <div> <img class="imagen_producto" src="${producto.img}"></div>
                      
                      <div class="texto_producto">
                            <p class="titulo_producto_carrito">${producto.nombre}</p>
                            <p id=${producto.precio} class="precio_producto_carrito"> $ ${producto.total}</p>
                        
                            <div class="contador"> <button id="+${producto.id}" class="btn_sumar_restado">+</button> <span>
                                    <p id= "D${producto.id}" class="cantidad_producto">${producto.cantidad}</p>
                                </span> <button id="-${producto.id}" class="btn_sumar_restado">-</button> </div>
                              <div> <button class="btn_delete" id="B${producto.id}" class="btn_sumar_restado">Borrar</button> </div>  
           </div>
           `

           document.getElementById("contenedorProductoList").appendChild(contenedorProducto)

         let btnSumar = document.getElementById("+" + producto.id)
         let btnRestar = document.getElementById("-" + producto.id)
         let contador = document.getElementById("D" + producto.id)
         let precio = document.getElementById(producto.precio)
         let botonBorrar = document.getElementById("B"+producto.id)
      
           sumarRestar(btnSumar, btnRestar, contador, precio)
           borrarProducto(botonBorrar)
           
         })
         
     }
     
     function borrarProducto(btnBorrar) {
       
     btnBorrar.addEventListener("click", (e) => {
       let idProducto = e.target.parentElement.querySelector("button").getAttribute("id")
       
       productosSelecionados = productosSelecionados.filter(producto => "B" + producto.id !== idProducto)
       
       localStorage.setItem('carrito' , JSON.stringify(productosSelecionados))
       imprimirCarrito()
       totalPrecioCarrito("total")
  
       })
     }
      
      function sumarRestar(sumar, restar, contador , precio) {
       
      sumar.addEventListener("click", (e) => {

        let nombreProducto = e.target.parentElement.parentElement.querySelector("p").textContent
        
          
          productosSelecionados.map(producto => {
                 
            if (producto.nombre === nombreProducto) {

                if (producto.cantidad < producto.stock) {
                 
                 producto.cantidad++ 
                 contador.innerText = `${producto.cantidad}`
                producto.total =  producto.precio   * producto.cantidad
              
                   precio.innerText= `$${producto.total }`
                    return  producto
               } else {
               notyf.error('No hay mas stock');
            }
             }

          })
        totalPrecioCarrito("total")
        
        
        })

        restar.addEventListener("click", (e) => {

        let nombreProducto = e.target.parentElement.parentElement.querySelector("p").textContent
        
            productosSelecionados.map(producto => {
            
              if (producto.nombre === nombreProducto) {
                if (producto.cantidad > 1) {
                     
                  producto.cantidad = producto.cantidad - 1
                  contador.innerText = `${producto.cantidad}`
                 
                  producto.total = producto.total -  producto.precio 
                  
                  precio.innerText = `$${producto.total}`
                  
      
                } else {
 
                  let nombreProducto = e.target.parentElement.parentElement.querySelector("p").textContent

                  productosSelecionados = productosSelecionados.filter(producto => producto.nombre !==  nombreProducto)
 
                    localStorage.setItem('carrito' , JSON.stringify(productosSelecionados))
                    imprimirCarrito()
                    totalPrecioCarrito("total")
                    totalPrecioCarrito()
                  
      
              }
              }
             
            })
          totalPrecioCarrito("total")
        })
     
      
      }
      
     function controlStock() {

     let productoRepetido = productosSelecionados.some(producto => producto.nombre === productoDatos.nombre)
       
          if (productoRepetido) {
           
            productosSelecionados.map(producto => {
             
             if (producto.nombre === productoDatos.nombre) {
                       
                                       
               if (producto.cantidad < producto.stock) {
                  notyf.success('Producto Agregado');
                 producto.cantidad++
                                                 
                 producto.total =  producto.precio   * producto.cantidad
                  
             
                 return producto
                
               } else {
               notyf.error('¡No hay mas stock!');
                 
               }
              }
              
           })
           
          } else {
            notyf.success('Producto Agregado');
            productosSelecionados.push(productoDatos)

            localStorage.setItem('carrito' , JSON.stringify(productosSelecionados))
            
         }
     }
     
     vaciarCarrito.addEventListener("click", (e) => {
      e.preventDefault()
     
     productosSelecionados = []
      localStorage.setItem('carrito' , JSON.stringify(productosSelecionados))
       imprimirCarrito()
       totalPrecioCarrito()
     
   })
   }


   
   
  


} 