
//DECLARACIONES

let productosDiv = document.getElementById("productos")//imprimo los objetos en el DOM
let ordenarAlfabeticamente = document.getElementById("ordenarAlfabeticamente")
let ordenarMenorMayor = document.getElementById("ordenarMenorMayor")
let ordenarMayorMenor = document.getElementById("ordenarMayorMenor")
let inputBuscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let darkMode = JSON.parse(localStorage.getItem("modoOscuro"))
let guardarProductoBtn = document.getElementById("guardarProductoBtn")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []// hecha con Operador Logico (avanzado) OR
let btnTerminarCompra = document.getElementById("btnTerminarCompra")
let loader = document.getElementById("loader")


//FUNCIONES

function verCatalogo(array){
    productosDiv.innerHTML =""
    for(let producto of array){
    let nuevoProductoDiv = document.createElement("div")
    nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-3"
    nuevoProductoDiv.innerHTML = `
    <div class="col centrar">
        <div id="${producto.id}" class="card" style="width: 18rem;">
            <img src="./sources/img/${producto.imagen}" class="card-img-top" alt="${producto.producto} ${producto.modelo}">
            <div class="card-body centrar">
                <h3 class="card-title">${producto.producto} ${producto.modelo}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">$${producto.precio}</p>
                <button id="agregarbtn${producto.id}" class="btn btn-outline-success">Agregar al carrito</a>
            </div>
        </div>
    </div>
    `
    productosDiv.appendChild(nuevoProductoDiv)
    let agregarBtn = document.getElementById(`agregarbtn${producto.id}`)
    agregarBtn.onclick = ()=>{
        agregarAlCarrito(producto)
    }}
}

function ordenAlfabetico(array){
    const alfabeticamente = [].concat(array)
    alfabeticamente.sort((a,b)=> {
        if(a.producto > b.producto){
            return 1
        }if(a.producto < b.producto){
            return -1
        }
            return 0
    })
    console.log(alfabeticamente)  
    verCatalogo(alfabeticamente)
}

function ordenAscendente(array){
    const ascedente = [].concat(array)
    ascedente.sort((a,b)=> a.precio - b.precio)
    verCatalogo(ascedente)
}

function ordenDescendiente(array){
    const descendiente = [].concat(array)
    descendiente.sort((a,b)=> b.precio - a.precio)
    verCatalogo(descendiente)
}

function buscarInfo(search, array){
        let busquedaArray = array.filter(
            (art)=>art.producto.toLowerCase().includes(search.toLowerCase()) || art.modelo.toLowerCase().includes(search.toLowerCase())
        )
        busquedaArray.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencia con su busqueda</h3>`, verCatalogo(busquedaArray))
        : (coincidencia.innerHTML = "", verCatalogo(busquedaArray))
}

function agregarAlCarrito(producto){
    console.log(producto)
    let prodAgregado = productosEnCarrito.find((art)=>art.id == producto.id)
    if(prodAgregado == undefined){
        console.log(`El producto ${producto.producto} ${producto.modelo} se ha agregado al carrito con un precio de $${producto.precio}` )
        productosEnCarrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        console.log(productosEnCarrito)
        Swal.fire({
            title: `Ha agregado un producto :D`,
            text: `${producto.producto} ${producto.modelo} ha sido agregado/a`,
            icon: "info",
            confirmButtonText: "Gracias",
            confirmButtonColor: "blueviolet",
            timer: 3000, //se expresa en milisegundos
            imageUrl: `/sources/img/${producto.imagen}`,
            imageHeight: 150,
        })
    }else{
        console.log(`El producto ${producto.producto} ${producto.modelo} ya se encuentra en el carrito`)
        Swal.fire({
            text: `El producto "${producto.producto} ${producto.modelo}" ya se encuentra en el carrito`,
            icon: "info",
            timer: 1500,
            showConfirmButton: false,
        })
    }
}    

function compraTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio, 0)
    console.log("Acc con reduce " + total)
    total == 0 ? precioTotal.innerHTML = "El carrito se encuentra VACÍO" : precioTotal.innerHTML = `El precio es $${total}`
    return total
}

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
            console.log(productoCarrito.producto)
            modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id="productoCarrito${productoCarrito.id}" style="max-with: 540px;">
                <img class="card-img-top" height="300px" src="sources/img/${productoCarrito.imagen}" alt"${productoCarrito.producto}">
                <div class="card-body">
                    <h4 class="card-title">${productoCarrito.producto}</h4>
                    <p class="card-text">$${productoCarrito.precio}</p>
                    <button class="btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            `
        })
    array.forEach((productoCarrito)=>{
            document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", ()=>{
                console.log("btn eliminar funciona")
                //borrar del DOM
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                console.log(cardProducto)
                cardProducto.remove()
                //eliminar del array
                //busco por id el prod a eliminar
                let productoEliminar = array.find(art => art.id == productoCarrito.id)
                console.log(productoEliminar)
                //busco el indice
                let posicion = array.indexOf(productoEliminar)
                console.log(posicion)
                //splice (posicion donde trabajar, cant de elemento a eliminar)
                array.splice(posicion, 1)
                console.log(array)
                //eliminar storage (volver a setear)
                localStorage.setItem("carrito", JSON.stringify(array))
                //recalcular total
                compraTotal(array)            
            })
        })
    compraTotal(array)
}

function terminarCompra(array){
    Swal.fire({
        title: 'Desea terminar su compra?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    })
    .then((result)=>{
        /* Read more about isConfirmed, isDenied below */
        if(result.isConfirmed) {
            let totalComprasDescripcion = compraTotal(array)
            Swal.fire(`Gracias por su compra! El total de su compra ha sido $${totalComprasDescripcion}`, '', 'success')
            productosEnCarrito = []
            localStorage.removeItem("carrito") 
        }else{
            Swal.fire('Sus productos aun se encuentran en el carrito ', '', 'info')
        }
    })
}

function agregarProducto(array){
    let formAgregarProducto = document.getElementById("formAgregarProducto")

    const nuevoProducto = new Articulo(array.length+1, formAgregarProducto[0].value, formAgregarProducto[1].value, formAgregarProducto[2].value, parseInt(formAgregarProducto[3].value), "sin imagen.jpg")
    
    array.push(nuevoProducto)
    localStorage.setItem("garage", JSON.stringify(array))
    verCatalogo(array)

    formAgregarProducto.reset()

    Toastify({
        text: `${nuevoProducto.producto} ${nuevoProducto.modelo} ha sido agregado al stock`,
        duration: 2500,
        gravity: "top",
        position: "right",
        style:{
            background: "blueviolet",
            color: "white"
        },
    
    }).showToast()
}


//EVENTOS

inputBuscador.addEventListener("input", ()=>{ //el evento input trae lo que se esta escribiendo en el cuadro de dialogo
    buscarInfo(inputBuscador.value, garage)
})

ordenarAlfabeticamente.addEventListener("click", ()=>{
    ordenAlfabetico(garage)
})

ordenarMenorMayor.addEventListener("click", ()=>{
    ordenAscendente(garage)
})

ordenarMayorMenor.addEventListener("click", ()=>{
    ordenDescendiente(garage)
})

guardarProductoBtn.addEventListener("click", ()=>{
    agregarProducto(garage)
})

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})

btnTerminarCompra.addEventListener("click", ()=>{
    terminarCompra(productosEnCarrito)
})


//LLAMADOS CODIGO
setTimeout(()=>{
    loader.remove()
    verCatalogo(garage)
}, 1500)




//DESESTRUCTURACION DE OBJETOS

// let{producto, modelo, precio, imagen, cantidad} = producto2
// console.log(producto)
// console.log(modelo)
// console.log(precio)
// console.log(imagen)
// console.log(cantidad)
// modelo = "360"
// console.log(modelo)
// ////
// // producto2.modelo = "One XS 4k"
// // console.log(producto2)

// //DESEST CON ALIAS

// let {producto: product, modelo: model, precio: price} = producto3
// console.log(product)
// console.log(model)
// console.log(price)

// console.log(garage)
// console.log(...garage)

// let numeros = [5, 19, 1993, 7, 23, 25]

// console.log(Math.min(4, -8, 22, -813))
// console.log(Math.min(...numeros))


// let superProd4 = {
//     ...producto4,
//     cantHilos: 440,
//     color: "negro"
// }
// console.log(superProd4)


// Swal.fire({
//     title: 'Bienvenida/a',
//     text: 'Esta es una pagina de venta de garage',
//     icon: 'success',
//     confirmButtonText: 'Continuar'
// })

// Toastify({
//     text: "This is a toast",
//     duration: 3000,
//     destination: "https://github.com/apvarun/toastify-js",
//     newWindow: true,
//     close: true,
//     gravity: "top", // `top` or `bottom`
//     position: "right", // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover
//     style: {
//         background: "linear-gradient(to right, #00b09b, #96c93d)",
//     },
//     onClick: function(){} // Callback after click
// }).showToast();

