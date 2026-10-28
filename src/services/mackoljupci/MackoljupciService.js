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

import { DATA_SOURCE } from "../../constants"
import mackoljupciServiceLocalStorage from "./MackoljupciServiceLocalStorage"
import mackoljupciServiceMemorija from "./mackoljupciServiceMemorija"


let Servis = null

switch(DATA_SOURCE){
    case 'memorija':
        Servis = mackoljupciServiceMemorija
        break
    case 'localStorage':
        Servis = mackoljupciServiceLocalStorage
        break
    default:
        Servis = null
}

// 3/4 od CRUD: Update

async function promijeni(sifra, mackoljubac){
    const index = nadiIndex(sifra)
    mackoljupci[index] = {...mackoljupci[index], ...mackoljubac}
    }

    const PrazanServis = {
      get: async () => ({data: []}),
        getBySifra: async (sifra) => ({data: {}}),
        dodaj: async (smjer) => {console.error('Servis nije implementiran')},
      promijeni: async (sifra, smjer) => {console.error('Servis nije implementiran')},
      obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

function nadiIndex(sifra){
    return mackoljupci.findIndex(s => s.sifra === parseInt(sifra))
} 

// 4/4 od CRUD: Delete
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    mackoljupci.splice(index,1)
}
const AktivniServis = Servis || PrazanServis



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (smjer) => AktivniServis.dodaj(smjer),
    promijeni: (sifra,smjer) => AktivniServis.promijeni(sifra,smjer),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}