import bibliaDB from "./BIBLIADB.js";

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("./sw.js");
  }

function getCitaBiblicaRandom(){

    const nRandLibro = Math.floor(Math.random() * bibliaDB.libros.length)
    
    const libro = bibliaDB.libros[nRandLibro]
    
    const capitulos = bibliaDB.versiculosPorCapitulo.reduce((acc, capitulo) => {
        if (capitulo.nombreLibro == libro.nombre) {
            // console.log(acc)
            return [...acc, capitulo]
        } else {
            return acc
        }
    }, [])
    
    const nRandCapitulo = Math.floor(Math.random() * (capitulos.length))
    console.log(nRandCapitulo)
    const capitulo = capitulos[nRandCapitulo]
    
    return { nombreLibro: capitulo.nombreLibro, cap: capitulo.cap, nVersiculos: capitulo.versiculos.length }
}

const btnRoll = document.querySelector("#btnRoll")

btnRoll.addEventListener("click", () => {
    const citaBiblica = document.querySelector("#citaBiblica")
    const {nombreLibro,cap,nVersiculos} = getCitaBiblicaRandom()
    const versiculo = Math.floor(Math.random() * nVersiculos)
    const libro = nombreLibro.replace("-"," ")

    citaBiblica.textContent = `${libro} ${cap}:${!versiculo?1:versiculo}`
})