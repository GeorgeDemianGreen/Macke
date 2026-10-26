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

import { DATA_SOURCE } from "../../constants"
import MackaServiceLocalStorage from "./MackaServiceLocalStorage"
import MackaServiceMemorija from "./MackaServiceMemorija"


let Servis = null

switch(DATA_SOURCE){
    case 'memorija':
        Servis = MackaServiceMemorija
        break
    case 'localStorage':
        Servis = MackaServiceLocalStorage
        break
    default:
        Servis = null
}

// 3/4 od CRUD: Update

async function promijeni(sifra, macka){
    const index = nadiIndex(sifra)
    macke[index] = {...macke[index], ...macka}
    }

    const PrazanServis = {
      get: async () => ({data: []}),
        getBySifra: async (sifra) => ({data: {}}),
        dodaj: async (smjer) => {console.error('Servis nije implementiran')},
      promijeni: async (sifra, smjer) => {console.error('Servis nije implementiran')},
      obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

function nadiIndex(sifra){
    return macke.findIndex(s => s.sifra === parseInt(sifra))
} 

// 4/4 od CRUD: Delete
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    macke.splice(index,1)
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