
//DECLARACIONES

let productosDiv = document.getElementById("productos")
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
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []
let btnTerminarCompra = document.getElementById("btnTerminarCompra")
let loader = document.getElementById("loader")

let fecha = document.getElementById("fecha")


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
                <p class="card-price">$${producto.precio}</p>
                <button id="agregarbtn${producto.id}" class="btn btn-outline-secondary">Agregar al carrito</a>
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
    let prodAgregado = productosEnCarrito.find((art)=>art.id == producto.id)
    if(prodAgregado == undefined){
        productosEnCarrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            title: `Se ha agregado un producto al carrito`,
            text: `${producto.producto} ${producto.modelo} ha sido agregado/a`,
            icon: "info",
            confirmButtonText: "Gracias",
            confirmButtonColor: "blueviolet",
            timer: 3000,
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
    total == 0 ? precioTotal.innerHTML = "El carrito se encuentra VACÍO" : precioTotal.innerHTML = `El precio es $${total}`
    return total
}

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
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
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardProducto.remove()
                let productoEliminar = array.find(art => art.id == productoCarrito.id)
                let posicion = array.indexOf(productoEliminar)
                array.splice(posicion, 1)
                localStorage.setItem("carrito", JSON.stringify(array))
                compraTotal(array)            
            })
        })
    compraTotal(array)
}

function terminarCompra(array){
    Swal.fire({
        title: 'Desea finalizar su compra?',
        text: "Recuerde que una vez finalizada no podra realizar cambios",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    })
    .then((result)=>{
        if(result.isConfirmed) {
            let totalComprasDescripcion = compraTotal(array)
            Swal.fire(`Gracias por confiar en nosotros! El total de su compra es $${totalComprasDescripcion}`, '', 'success')
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

inputBuscador.addEventListener("input", ()=>{
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

const DateTime = luxon.DateTime
setInterval(()=>{
    let fechaActual = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
fecha.innerHTML = `${fechaActual}`
}, 1000)