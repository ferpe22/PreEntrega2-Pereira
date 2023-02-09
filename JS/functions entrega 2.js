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
