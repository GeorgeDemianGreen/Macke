
const STORAGE_KEY='macke'

function dohvatiSveIzStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get(){
    const macke = dohvatiSveIzStorage()
    return {data: [...macke]}
}

async function getBySifra(sifra){
    const macke = dohvatiSveIzStorage()
    return {data: macke.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(macka){
    const macke = dohvatiSveIzStorage()
    if(macke.length === 0){
        macka.sifra = 1
    }else{
        const maxSifra = Math.max(...macke.map(s => s.sifra))
        macka.sifra = maxSifra + 1
    }
    macke.push(macka)
    spremiUStorage(macke)
}



async function promijeni(sifra, macka){
    const macke = dohvatiSveIzStorage()
    const index = macke.findIndex(s => s.sifra === parseInt(sifra))
    macke[index] = {...macke[index], ...macka}
    spremiUStorage(macke)
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