import { mackoljupci } from "./MackoljupciPodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...mackoljupci]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: mackoljupci.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(mackoljupci){
    if(mackoljupci.length === 0){
        mackoljupci.sifra = 1
    }else{
        mackoljupci.sifra = mackoljupci[mackoljupci.length - 1].sifra + 1
    }
    mackoljupci.push(mackoljupci)
}

// 3/4 od CRUD: Update

async function promijeni(sifra, mackoljupci){
    const index = nadiIndex(sifra)
    mackoljupci[index] = {...mackoljupci[index], ...mackoljupci}
}

function nadiIndex(sifra){
    return mackoljupci.findIndex(s => s.sifra === parseInt(sifra))
} 

// 4/4 od CRUD: Delete
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    mackoljupci.splice(index,1)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}