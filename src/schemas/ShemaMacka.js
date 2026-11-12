import { z } from 'zod'

export const ShemaMacka = z.object({
  naziv: z.string()
    .trim()
    .min(1, "Mačka mora imati ime da bi te bolje ignorirala... i ne smije sadržavati samo razmake!")
    .min(2, "Ime mačke mora imati najmanje 2 slova!")
    .max(20, "Robert Southey mački je dao ime od 96 znaka... ti možeš samo 10!"),

  debljina: z.coerce.number({
    invalid_type_error: "Debljina mora biti broj!",
  })
    .min(1, "Debljina mora biti između 1 i 10, maca ti nije Obeliks!")
    .max(10, "Debljina mora biti između 1 i 10, maca ti nije Obeliks!"),

  boja: z.string()
    .trim()
    .min(1, "Boja je obavezna i ne smije sadržavati samo razmake!")
    .min(3, "Jesi li čuo za boju s manje od 3 znaka?")
    .max(50, "Nijedna boja nema 20 znakova..."),

    dlaka: z.string()
    .trim()
    .min(1, "Vrsta dlake je obavezna i ne smije sadržavati samo razmake!")
    .min(3, "Vrsta dlake mačke mora imati najmanje 3 slova!")
    .max(20, "Vrsta dlake mačke može imati najviše 20 slova!"),

    mazna: z.string()
    .trim()
    .min(1, "Maznost mačke određuje se opisom a ne brojem!")
    .min(3, "Maznost mačke broji se u tonama, znam, ali ipak unesi samo 3 slova. :)")
    .max(20, "Vrsta dlake mačke može imati najviše 20 slova!"),

});
