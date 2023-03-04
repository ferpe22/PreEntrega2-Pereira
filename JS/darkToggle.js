// let btnToggle = document.getElementById("toggleMode")

// if(localStorage.getItem("modoOscuro")){
//     if((JSON.parse(localStorage.getItem("modoOscuro")) == true)){
//         // btnToggle.innerText = `Light`
//         // btnToggle.className = `btn btn-light`
//     }
// }else{
//     localStorage.setItem("modoOscuro", false)
// }

// btnToggle.addEventListener("click", ()=>{
//     document.body.classList.toggle("darkMode")

//     if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
//         // btnToggle.innerText = `Light`
//         // btnToggle.className = `btn btn-light`
//         localStorage.setItem("modoOscuro", true)
//     }else{
//         // btnToggle.innerText = `Dark`
//         // btnToggle.className = `btn btn-dark`
//         localStorage.setItem("modoOscuro", false)
//     }
// })


let btnToggle = document.getElementById("toggleMode")
const isDarkStorageOn = localStorage.getItem("modoOscuro") === "true"

if (isDarkStorageOn) {
    document.body.classList.add("darkMode")
    btnToggle.checked = true
}

btnToggle.addEventListener("click", () => {
    const isDarkStorageOn = localStorage.getItem("modoOscuro") === "true"
    console.log(isDarkStorageOn)
    document.body.classList.toggle("darkMode")
    localStorage.setItem("modoOscuro", !isDarkStorageOn)
    btnToggle.checked = !isDarkStorageOn
})