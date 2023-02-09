
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

let productosEnCarrito
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}


//FUNCIONES

function verCatalogo(array){
    productosDiv.innerHTML =""
    for(let producto of array){
    let nuevoProductoDiv = document.createElement("div")
    nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-3"
    nuevoProductoDiv.innerHTML = `
    <div class="col">
        <div id="${producto.id}" class="card" style="width: 18rem;">
            <img src="./sources/img/${producto.imagen}" class="card-img-top" alt="${producto.producto} ${producto.modelo}">
            <div class="card-body">
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

// function ordenAlfabetico(array){
//     const alfabeticamente = [].concat(array)
//     alfabeticamente.sort((a,b)=> {
//         if(a.producto > b.producto){
//             return 1
//         }if(a.producto > b.producto){
//             return -1
//         }
//             return 0
//     })
//     console.log(alfabeticamente)  
//     verCatalogo(alfabeticamente)
// }//VER ESTO EN EL AFTER 04.1 ya que no funciona

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
            // (art)=>art.producto.toLowerCase() == search.toLowerCase() || art.modelo.toLowerCase() == search.toLowerCase()
            (art)=>art.producto.toLowerCase().includes(search.toLowerCase()) || art.modelo.toLowerCase().includes(search.toLowerCase())
        )
        if(busquedaArray.length == 0){
            coincidencia.innerHTML = `<h3>No hay coincidencia con su busqueda</h3>`
            verCatalogo(busquedaArray)
        }else{
            coincidencia.innerHTML = ""
            verCatalogo(busquedaArray)
        }        
}

function agregarAlCarrito(producto){
    console.log(producto)
    let prodAgregado = productosEnCarrito.find((art)=>art.id == producto.id)
    if(prodAgregado == undefined){
        console.log(`El producto ${producto.producto} ${producto.modelo} se ha agregado al carrito con un precio de $${producto.precio}` )
        productosEnCarrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        console.log(productosEnCarrito)
    }else{
        console.log(`El producto ${producto.producto} ${producto.modelo} ya se encuentra en el carrito`)
    }
}    

function compraTotal(array){
    let acumulado = 0
    for(let producto of array){
        acumulado = acumulado + producto.precio
    }
    precioTotal.innerHTML = `El precio es ${acumulado}`
    return acumulado
}

function cargarProdcutosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach(
        (productoCarrito)=>{
            // console.log(productoCarrito.producto)
            modalBodyCarrito.innerHTML += `
            <div class="card border-primary m-3 id="productoCarrito${productoCarrito.id}"
            style="max-with: 540px;">
                <img class="card-img-top" height="300px" src="sources/img/${productoCarrito.imagen}" alt"${productoCarrito.producto}">
                <div class="card-body">
                    <h4 class="card-title">${productoCarrito.producto}</h4>
                    <p class="card-text">$${productoCarrito.precio}</p>
                    <button class="btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            `
        })
    compraTotal(array)
}

function agregarProducto(array){
    let formAgregarProducto = document.getElementById("formAgregarProducto")

    const nuevoProducto = new Articulo(array.length+1, formAgregarProducto[0].value, formAgregarProducto[1].value, formAgregarProducto[2].value, parseInt(formAgregarProducto[3].value), "sin imagen.jpg")
    
    array.push(nuevoProducto)
    localStorage.setItem("garage", JSON.stringify(array))
    verCatalogo(array)

    formAgregarProducto.reset()
}


//EVENTOS

inputBuscador.addEventListener("input", ()=>{ //el evento input trae lo que se esta escribiendo en el cuadro de dialogo
    buscarInfo(inputBuscador.value, garage)
})

// ordenarAlfabeticamente.addEventListener("click", ()=>{
//     ordenAlfabetico(garage)
// })

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
    cargarProdcutosCarrito(productosEnCarrito)
})


//LLAMADOS

verCatalogo(garage)