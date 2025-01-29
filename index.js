import bibliaDB from "./BIBLIADB.js";

const audioTimeOut = new Audio("./sound/silbato_corto.mp3")

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("./sw.js");
  }

function getCitaBiblicaRandom() {

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
    const { nombreLibro, cap, nVersiculos } = getCitaBiblicaRandom()
    const versiculo = Math.floor(Math.random() * nVersiculos)
    const libro = nombreLibro.replace("-", " ")

    citaBiblica.textContent = `${libro} ${cap}:${!versiculo ? 1 : versiculo}`
    iniciarTemporizador(0,10)
})

const iniciarTemporizador = (minutos=new Number(),segundos=new Number())=>{const timerElement = document.querySelector("#timer")

timerElement.textContent = minutos + ":" + segundos

const timerInterval = setInterval(() => {
    
    if (segundos == 1 && minutos == 0) {
        clearInterval(timerInterval)
        // timerElement.textContent = minutos + ":" + segundos
        // alert("Se te acabó el tiempo!")
        audioTimeOut.play()
        timerElement.textContent = "¡¡ TIEMPO !!"
    }else{
        segundos--
        timerElement.textContent = minutos + ":" + segundos
    }

    if (segundos == 0 && minutos > 0) {
        segundos = 59
        minutos--
    }
}, 1000)}