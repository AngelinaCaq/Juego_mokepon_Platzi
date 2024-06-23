const sectionReiniciar = document.getElementById("reiniciar")
const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigos = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const botonMascotaJugador = document.getElementById('boton-mascota')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

const anchoMaxMapa = 350

let jugadorId = null
let enemigoId = null
let mascotaDeJugadorObjeto
let mokepones = []
let mokeponesEnemigos = []
let ataqueEnemigo = []
let opcionesDeMokepones
let inputRatigueya
let inputCapipepo
let inputHipodoge
let mascotaJugador
let ataquesMokepon
let botonAgua
let botonFuego
let botonTierra
let botones = []
let ataquesJugador = []
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigos = 0
let VidasJugador = 3
let VidasEnemigos = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mapa.webp'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

if (anchoDelMapa > anchoMaxMapa) {
    anchoDelMapa = anchoMaxMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "assets/mokepons_mokepon_hipodoge_attack.webp", 5, "./assets/hipodoge.png")

let capipepo = new Mokepon("Capipepo", "assets/mokepons_mokepon_capipepo_attack.webp", 5, "./assets/capipepo.webp")

let ratigueya = new Mokepon("Ratigueya", "assets/mokepons_mokepon_ratigueya_attack.webp", 5, "./assets/ratigueya.webp")


const HIPODOGE_ATAQUES = [{ nombre: "Agua", id: "boton-agua" },
{ nombre: "Agua", id: "boton-agua" },
{ nombre: "Agua", id: "boton-agua" },
{ nombre: "Fuego", id: "boton-fuego" },
{ nombre: "Tierra", id: "boton-tierra" }]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [{ nombre: "Agua", id: "boton-agua" },
{ nombre: "Fuego", id: "boton-fuego" },
{ nombre: "Tierra", id: "boton-tierra" },
{ nombre: "Tierra", id: "boton-tierra" },
{ nombre: "Tierra", id: "boton-tierra" }]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [{ nombre: "Agua", id: "boton-agua" },
{ nombre: "Fuego", id: "boton-fuego" },
{ nombre: "Fuego", id: "boton-fuego" },
{ nombre: "Fuego", id: "boton-fuego" },
{ nombre: "Tierra", id: "boton-tierra" }
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)



mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionesDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label for=${mokepon.nombre} class="tarjeta-mokepon">
            <p>${mokepon.nombre}</p>
            <img src= ${mokepon.foto}
            alt=${mokepon.nombre}/>
        </label>`

        contenedorTarjetas.innerHTML += opcionesDeMokepones

        inputRatigueya = document.getElementById('Ratigueya')
        inputCapipepo = document.getElementById('Capipepo')
        inputHipodoge = document.getElementById('Hipodoge')
    })


    sectionReiniciar.style.display = "none"
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.100.4:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        jugadorId = respuesta
                    })
            }
        })
}


function seleccionarMascotaJugador() {
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        return
    }
    sectionSeleccionarMascota.style.display = "none"
    sectionVerMapa.style.display = "flex"
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, { //Reemplazar localhost por tu ip para jugar en distintos dispositivos
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        ataquesMokepon = `
        <button id=${ataques.id} class="boton-ataque BAtaque">${ataques.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonAgua = document.getElementById('boton-agua')
    botonFuego = document.getElementById('boton-fuego')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'Fuego') {
                ataquesJugador.push('Fuego')
                boton.style.background = '#322835'
                boton.disabled = true
            } else if (e.target.textContent === 'Agua') {
                ataquesJugador.push('Agua')
                boton.style.background = '#322835'
                boton.disabled = true
            } else {
                ataquesJugador.push('Tierra')
                boton.style.background = '#322835'
                boton.disabled = true
            }
            if (ataquesJugador.length === 5) {
                enviarAtaques()
            }
        })
    })

}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, { //Reemplazar localhost por tu ip para jugar en distintos dispositivos
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataquesJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`) //Reemplazar localhost por tu ip para jugar en distintos dispositivos
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}



function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}



function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('Agua')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('Fuego')
    } else {
        ataqueEnemigo.push('Tierra')
    }
    iniciarPelea()
}

function iniciarPelea() {

    if (ataquesJugador.length === 5) {
        combate()
    }

}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)
    
    for (let i = 0; i < ataquesJugador.length; i++) {
        if (ataquesJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje("EMPATE")
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataquesJugador[i] == 'Fuego' && ataqueEnemigo[i] == 'Tierra') {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataquesJugador[i] == 'Agua' && ataqueEnemigo[i] == 'Fuego') {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataquesJugador[i] == 'Tierra' && ataqueEnemigo[i] == 'Agua') {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigos++
            spanVidasEnemigos.innerHTML = victoriasEnemigos
        }
    }
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigos) {
        crearMensajeFinal("Esto fue un empate")
    } else if (victoriasJugador > victoriasEnemigos) {
        crearMensajeFinal("GANASTE!!!!!!!!!!")
    } else {
        crearMensajeFinal("PERDISTE!!!!!!!!!!!!!!")
    }
}

function crearMensaje() {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaDeJugadorObjeto.x = mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.velocidadX
    mascotaDeJugadorObjeto.y = mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaDeJugadorObjeto.pintarMokepon()


    enviarPosicion(mascotaDeJugadorObjeto.x, mascotaDeJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, { //Reemplazar localhost por tu ip para jugar en distintos dispositivos
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            let mokeponEnemigo = null

                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon("Hipodoge", "/juego_mokepon/assets/mokepons_mokepon_hipodoge_attack.webp", 5, "./assets/hipodoge.png", enemigo.id)
                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon("Capipepo", "/juego_mokepon/assets/mokepons_mokepon_capipepo_attack.webp", 5, "./assets/capipepo.webp", enemigo.id)
                            } else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon("Ratigueya", "/juego_mokepon/assets/mokepons_mokepon_ratigueya_attack.webp", 5, "./assets/ratigueya.webp", enemigo.id)
                            }
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                            return mokeponEnemigo
                        })
                    })
            }
        })
}
function moverIzquierda() {
    mascotaDeJugadorObjeto.velocidadX = -10
}
function moverDerecha() {
    mascotaDeJugadorObjeto.velocidadX = 10
}
function moverAbajo() {
    mascotaDeJugadorObjeto.velocidadY = 10
}
function moverArriba() {
    mascotaDeJugadorObjeto.velocidadY = -10
}

function detenerMovimiento() {
    mascotaDeJugadorObjeto.velocidadX = 0
    mascotaDeJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break

        default:
            break
    }
}

function iniciarMapa() {
    mascotaDeJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaDeJugadorObjeto.y
    const abajoMascota = mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.alto
    const derechaMascota = mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.ancho
    const izquierdaMascota = mascotaDeJugadorObjeto.x


    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener('load', iniciarJuego)