import { glasanje } from "./GlasanjePodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...glasanje]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: glasanje.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(glasanje){
    if(glasanje.length === 0){
        glasanje.sifra = 1
    }else{
        glasanje.sifra = glasanje[glasanje.length - 1].sifra + 1
    }
    glasanje.push(glasanje)
}

// 3/4 od CRUD: Update

async function promijeni(sifra, glasanje){
    const index = nadiIndex(sifra)
    glasanje[index] = {...glasanje[index], ...glasanje}
}

function nadiIndex(sifra){
    return glasanje.findIndex(s => s.sifra === parseInt(sifra))
} 

// 4/4 od CRUD: Delete
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    glasanje.splice(index,1)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}