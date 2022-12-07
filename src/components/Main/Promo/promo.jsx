import planet from '../../../images/promo_planet.svg'

function Promo() {
    return (
        <promo className='promo'>
            <div className='promo__layout'>
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button className='button promo__learn-more'>Узнать больше</button>
            </div>

            <img src={planet} alt='WEB-планета.' className='promo__picture' />
        </promo>
    )
};

export default Promo;