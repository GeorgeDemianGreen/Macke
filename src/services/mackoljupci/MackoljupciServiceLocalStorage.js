import { macke } from "./MackoljupciPodaci"

const STORAGE_KEY='macke'

function dohvatiSveIzStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get(){
    const mackoljupci = dohvatiSveIzStorage()
    return {data: [...macke]}
}

async function getBySifra(sifra){
    const mackoljupci = dohvatiSveIzStorage()
    return {data: mackoljupci.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(smjer){
    const mackoljupci = dohvatiSveIzStorage()
    if(mackoljupci.length === 0){
        smjer.sifra = 1
    }else{
        const maxSifra = Math.max(...mackoljupci.map(s => s.sifra))
        smjer.sifra = maxSifra + 1
    }
    mackoljupci.push(smjer)
    spremiUStorage(macke)
}



async function promijeni(sifra, smjer){
    const mackoljupci = dohvatiSveIzStorage()
    const index = mackoljupci.findIndex(s => s.sifra === parseInt(sifra))
    mackoljupci[index] = {...mackoljupci[index], ...smjer}
    spremiUStorage(mackoljupci)
}



async function obrisi(sifra){
    let macke = dohvatiSveIzStorage()
    macke = macke.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(macke)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}