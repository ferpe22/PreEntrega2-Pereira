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