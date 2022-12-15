import MoviesCard from "../MoviesCard/MoviesCard";
import one from '../../../images/1.webp'
import two from '../../../images/2.webp'
import three from '../../../images/3.webp'
import four from '../../../images/4.webp'
import five from '../../../images/5.webp'
import six from '../../../images/6.webp'

function MoviesCardList() {
    return (
        <section className='cardlist'>
            <MoviesCard 
                title='Девять'
                time='1ч 20м'
                poster={six} />

            <MoviesCard 
                title='Тачки'
                time='1ч 20м'
                poster={five} />

            <MoviesCard 
                title='Ранго'
                time='1ч 20м'
                poster={four} />

            <MoviesCard
                title='Человек-паук: через вселенные'
                time='1ч 20м'
                poster={three} />

            <MoviesCard
                title='Валл-и'
                time='1ч 20м'
                poster={two} />

            <MoviesCard
                title='Рататуй'
                time='1ч 20м'
                poster={one} />
        </section>
    )
}

export default MoviesCardList;