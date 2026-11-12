import { z } from 'zod'

export const ShemaMackoljupci = z.object({
  ime: z.string()
    .trim()
    .min(1, "Tvoje ime sigurno ima više od 1 slova!")
    .min(2, "Ime mora imati najmanje 2 slova!")
    .max(20, "Ime mora imati najviše 20 slova!"),

  prezime: z.string()
    .trim()
    .min(1, "Prezime je obavezno i ne smije sadržavati samo razmake!")
    .min(3, "Prezime mora imati više od 3 slova!")
    .max(20, "Rijetko koje ime je duže od 20 znakova... ispravi :)"),

});
