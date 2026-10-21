import slika from '../assets/cat.png'
import { IME_APLIKACIJE } from '../constants'


export default function Home(){


    return(
        <>
            <div style={{textAlign: 'center'}}>
                <img src={slika} />
            </div>

            <p className='lead m-5 text-center'>
               Dobrodošli na {IME_APLIKACIJE}
            </p>

        </>
    )
}