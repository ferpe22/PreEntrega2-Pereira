
function mostrarCatalogo(array){
    console.log("Este es nuestro catalogo:")
    for(let elemento of array){
    console.log(`ID# ${elemento.id}: ${elemento.producto} ${elemento.modelo}. Precio $${elemento.precio}`)
    }
}





function ordenAscendente(array){
    const ascedente = [].concat(array)
    ascedente.sort((a,b)=> a.precio - b.precio)
    mostrarCatalogo(ascedente)
}
function ordenDescendiente(array){
    const descendiente = [].concat(array)
    descendiente.sort((a,b)=> b.precio - a.precio)
    mostrarCatalogo(descendiente)
}
function ordenarPorPrecio(array){
    let ordenIngresado= parseInt(prompt(`Ingrese la opcion por la cual desea ordenar los productos:
    1-Ordenar de menor a mayor precio
    2-Ordenar de mayor a menor precio
    `))
    switch(ordenIngresado){
        case 1:
            ordenAscendente(array)
        break
        case 2:
            ordenDescendiente(array)
        break
        default:
            console.log(`La opcion ${ordenIngresado} ingresada NO ES VALIDA`)
        break
    }
}

function buscarArticulo(array){
    let articuloIngresado = prompt("Ingrese el articulo que desea buscar:")
    let articuloEncontrado = array.find(
        (art)=>art.producto.toLowerCase() === articuloIngresado.toLowerCase())
    if(articuloEncontrado == undefined){
        console.log(`El producto "${articuloIngresado}" no se encuentra dentro del catalogo`)
    }else{
        console.log(articuloEncontrado)
    }
    console.log(`Resultado de busqueda:
    Se ha encontrado el articulo ${articuloEncontrado.producto} ${articuloEncontrado.modelo} cuyo precio es $${articuloEncontrado.precio} y su ID#${articuloEncontrado.id}`)
}

function carritoCompra(array){
    mostrarCatalogo(array)
    let idComprar = parseInt(prompt("Ingrese el ID del producto que desea comprar"))
    const idEncontrado = array.find((art)=>art.id === idComprar)
    console.log(`Ha comprado el produto ${idEncontrado.producto} ${idEncontrado.modelo} por un valor de $${idEncontrado.precio}`)
}


function borrarArticulos(array){
    mostrarCatalogo(array)
    let articuloBorrar = parseInt(prompt("Ingrese el ID del articulo que sea borrar"))
    let idsArray = array.map((art)=>art.id) 
    let indexArray = idsArray.indexOf(articuloBorrar)
    array.splice(indexArray,1)
    mostrarCatalogo(array)
}


function desplegarMenu (){
    let salirMenu = false
    do{
        salirMenu = menuOpciones(salirMenu)
    }while(!salirMenu)
}

//////////////////////////////////////////////////////
///////////////////CARRITO DE COMPRAS/////////////////
//////////////////////////////////////////////////////

function menuOpciones(salir){
    let ingresarOpcion = prompt(`Ingrese la opcion deseada:
    1-Mostrar catalogo en pantalla
    2-Busqueda de articulo
    3-Ordenar productos por precio
    4-Comprar articulos por id
    5-Ingresar nuevo articulo (opcion para propietario)
    6-Borrar articulo (opcion para propietario)
    0-Salir del Menu`) 
    switch(ingresarOpcion){
        case "1":
            mostrarCatalogo(garage)
        break
        case "2":
            buscarArticulo(garage)
        break
        case "3":
            ordenarPorPrecio(garage)
        break
        case "4":
            carritoCompra(garage)
        break
        case "5":
            agregarProducto(garage) 
        break
        case "6":
            borrarArticulos(garage)
        break
        case "0":
            alert("Gracias por su compra!")
            salir = true
            return salir
        break
        default:
            console.log("Opcion No Válida")
        break
    }
}
// desplegarMenu()


// let etiquetasH3 = (document.getElementsByTagName("h3")) // devuelve como un array todo lo que encuentra en la etiqueta

// for(let nodo of etiquetasH3){
//     console.log(nodo.innerText)
// }

// let texto = document.getElementsByClassName("card-text")// lo mismo que antes pero por clase el lugar de etiqueta
// console.log(texto)
// console.log(texto[0])//buscar un objeto puntual del array, en este caso el objeto 0
// console.log(texto[0].innerText)//aca devuelve un atributo en particular del objeto en particular de array solicitado por CLASS

// let tituloDOM = document.getElementById("SegTitulo")
// console.log(tituloDOM)
// console.log(tituloDOM.innerText)
// // tituloDOM.innerText = `Nos vamos a la concha de la lora` // cambiar contenido de HTML con JS


// let tituloDos = document.querySelector("#SegTitulo")
// console.log(tituloDos)

// let listaPaises = document.querySelector("#listaPaises")
// console.log()

// // let paises = document.querySelector(".paises")
// let listaLi = document.querySelectorAll("li")// querySelectorAll campura todos los elementos de la class/id. si no ponemos all, solo trae el primero de los que encuentre
// console.log(listaLi)


// let listaCiudades = document.getElementById("listaCiudades")
// // listaCiudades.innerHTML = `<li class = "nuevaCiudad">Santiago del Estero</li>`// si pones igual sobreescribe todo lo que tenias en la variable listaCiudades
// listaCiudades.innerHTML += `
// <li class = "nuevaCiudad">Santiago del Estero</li>`//con += agregas informacion al variable
// listaCiudades.innerHTML += `
// <li id="ultimaCiudad">Córdoba</li>
// <p>Fin del listado</p>`

// listaCiudades.className = "lista formato" //forma de agregar clases dentro de un nodo

// let nuevoLi = document.createElement("li")//Crear elementos
// nuevoLi.innerText = "Argentina"
// nuevoLi.className = "nuevoPais"
// console.log(nuevoLi)

// listaPaises.append(nuevoLi) // append es para agregar un nuevo elemento a alguna lado. Antes creamos el elemento con createElement y desp lo agregamos a una lista existente con append. Lo agrega al final
// listaPaises.prepend(nuevoLi) //prepend lo agrega a principio.

// // tituloDOM.remove() //borra un nodo.

// let ciudades = document.getElementsByClassName("ciudades")
// console.log(ciudades)
// ciudades[0].remove() // borramos el primer elemento del array ciudades. Bs As en este caso
// function saludosComi34150(){
//     console.log("Que tengas un feliz sábado")
//     alert("Nuestro primer evento")
// }
// function saludarAlumno(nombre){
//     console.log(`Hola ${nombre}`)
// }

// let botonClik = document.getElementById("eventoSemantico")
// console.log(botonClik)
// let inputAlumno = document.getElementById("nombreAlumno")
// console.log(inputAlumno)

// botonClik.onclick = saludosComi34150//cuando se asigna una funcion a un evento, no lleva parentesis
// botonClik.onclick = ()=>{
//     saludarAlumno(inputAlumno.value)
// }// si necesito invocar a una funcion que tiene parametros, convien usar la funcion arrow y dentro de ella la funcion a utilizar
// //con este evento semantico toma lo ultimo, trabaja en cascada
// console.log(inputAlumno.value)

// let eventoMultiple = document.getElementById("eventoMultiple")

// // eventoMultiple.addEventListener("click", saludosComi34150 )//tiene 2 parametros: 1° evento que quiero q escuche y 2° la funcion handler
// eventoMultiple.addEventListener("click", (event)=>{
//     saludarAlumno(inputAlumno.value)
//     console.log(event)
//     console.log(event.target)
//     console.log(event.type)
// })


// localStorage.setItem("cursoCoder", "34150")//agregar calve y valor en el storage
// localStorage.setItem("comidaFav", "asado")
// localStorage.setItem("comidaFav", "fideos" )

// let curso = localStorage.getItem("cursoCoder")// capturar info del storage. solo tiene un parametro y es la clave (o sea t trae el valor de ese clave)
// console.log(curso)
// console.log(localStorage.getItem("comidaFav"))
// console.log(localStorage.getItem("deporteFav")) //si no hay calve para lo buscado, devuelve null

// sessionStorage.setItem("cancion", "viva la vida")
// sessionStorage.setItem("banda", "coldplay")

// console.log(sessionStorage.getItem("banda"))
// console.log(sessionStorage.getItem("comidaFav"))

// localStorage.setItem("primerProducto", JSON.stringify(producto1))
// localStorage.setItem("misProductos", JSON.stringify(garage))
// console.log(localStorage.getItem("primerProducto"))
// console.log(JSON.parse(localStorage.getItem("primerProducto")))
// console.log(localStorage.getItem("misProductos"))
// console.log(JSON.parse(localStorage.getItem("misProductos")))

////////////////////////////////////////////////////////////////
//////////////////////TP CON DOM ////////////////////////
////////////////////////////////////////////////////////////////

//DECLARACIONES

let productosDiv = document.getElementById("productos")//imprimo los objetos en el DOM
let ordenarAlfabeticamente = document.getElementById("ordenarAlfabeticamente")
let ordenarMenorMayor = document.getElementById("ordenarMenorMayor")
let ordenarMayorMenor = document.getElementById("ordenarMayorMenor")
let inputBuscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let darkMode = JSON.parse(localStorage.getItem("modoOscuro"))
let guardarProductoBtn = document.getElementById("guardarProductoBtn")


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
verCatalogo(garage)


let productosEnCarrito
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}

function agregarAlCarrito(producto){
    // console.log(producto)
    console.log(`El producto ${producto.producto} ${producto.modelo} se ha agregado al carrito con un precio de $${producto.precio}` )
    productosEnCarrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    console.log(productosEnCarrito)
}    


function ordenAlfabetico(array){
    const alfabeticamente = [].concat(array)
    alfabeticamente.sort((a,b)=> {
        if(a.producto > b.producto){
            return 1
        }if(a.producto > b.producto){
            return -1
        }
            return 0
    })
    console.log(alfabeticamente)  
    verCatalogo(alfabeticamente)
}//VER ESTO EN EL AFTER 04.1 ya que no funciona

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

function agregarProducto(array){
    // let inputProducto = document.getElementById("productoInput")
    // let inputModelo = document.getElementById("modeloInput")
    // let inputDescripcion = document.getElementById("descripcionInput")
    // let inputPrecio = document.getElementById("precioInput")
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




// let botonDarkMode = document.getElementById("botonDarkMode")
// let botonLightMode = document.getElementById("botonLightMode")
// let eliminarModo = document.getElementById("botonDeleteMode")


// if(darkMode == true){
//     document.body.classList.add("darkMode")
// }

// botonDarkMode.addEventListener("click", ()=>{
//     console.log("Btn oscuro funciona")
//     document.body.classList.add("darkMode")
//     localStorage.setItem("modoOscuro", true)
// })
// botonLightMode.addEventListener("click", ()=>{
//     console.log("Btn claro funciona")
//     document.body.classList.remove("darkMode")
//     localStorage.setItem("modoOscuro", false)
// })
// eliminarModo.addEventListener("click", ()=>{
//     localStorage.removeItem("modoOscuro")
// }