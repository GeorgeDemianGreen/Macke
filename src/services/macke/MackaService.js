import { DATA_SOURCE } from "../../constants"
import MackaServiceLocalStorage from "./MackaServiceLocalStorage"
import MackaServiceMemorija from "./MackaServiceMemorija"


let Servis = null

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = MackaServiceMemorija
        break
    case 'localStorage':
        Servis = MackaServiceLocalStorage
        break
    default:
        Servis = null
}


const PrazanServis = {
    get: async () => ({ data: [] }),
    getBySifra: async (sifra) => ({ data: {} }),
    dodaj: async (smjer) => { console.error('Servis nije implementiran') },
    promijeni: async (sifra, smjer) => { console.error('Servis nije implementiran') },
    obrisi: async (sifra) => { console.error('Servis nije implementiran') }
}

const AktivniServis = Servis || PrazanServis



export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (smjer) => AktivniServis.dodaj(smjer),
    promijeni: (sifra, smjer) => AktivniServis.promijeni(sifra, smjer),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}