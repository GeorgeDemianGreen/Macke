import { macke } from "./MackaPodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...macke]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: macke.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(macka){
    if(macke.length === 0){
        macka.sifra = 1
    }else{
        macka.sifra = macke[macke.length - 1].sifra + 1
    }
    macke.push(macka)
}

// 3/4 od CRUD: Update

async function promijeni(sifra, macka){
    const index = nadiIndex(sifra)
    macke[index] = {...macke[index], ...macka}
}

function nadiIndex(sifra){
    return macke.findIndex(s => s.sifra === parseInt(sifra))
} 

// 4/4 od CRUD: Delete
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    macke.splice(index,1)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}