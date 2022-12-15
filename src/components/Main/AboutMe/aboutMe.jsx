import self from '../../../images/self.jpg';

function AboutMe() {
    return (
        <section className='section about'>
            <h2 className='section__title'>Студент</h2>
            <div className='about__block'>
                <div className='about__info'>
                    <h3 className='about__name'>Анастасия</h3>
                    <p className='about__about'>Фронтенд-разработчик, 22 года</p>
                    <p className='about__text'>Я родилась и живу в Ханты-Мансийске, закончила факультет экономики ЮГУ. Я люблю слушать музыку, смотреть фильмы, а ещё увлекаюсь спортом. Недавно начала кодить. Frontend привлекает меня тем, что результат проделанной работы виден сразу и здесь огромный простор для творчества.</p>
                    <div className='about__link'><a href='https://github.com/Anastasiy-alt' target='blank' className='link'>Github</a></div>
                </div>
                <img src={self} alt='Фото.' className='about__photo' />
            </div>
            <p className='about__portfolio'>Портфолио</p>
            <ul className='about__list'>
                <li className='about__point'><a className='link' href='https://github.com/Anastasiy-alt/how-to-learn' target='blank'>Статичный сайт</a><a className='link' href='https://github.com/Anastasiy-alt/how-to-learn'><span className='about__sign' target='blank'>↗</span></a></li>
                <li className='about__point'><a className='link' href='https://github.com/Anastasiy-alt/russian-travel' target='blank'>Адаптивный сайт</a><a className='link' href='https://github.com/Anastasiy-alt/russian-travel'><span className='about__sign' target='blank'>↗</span></a></li>
                <li className='about__point'><a className='link' href='https://github.com/Anastasiy-alt/react-mesto-api-full' target='blank'>Одностраничное приложение</a><a className='link' href='https://github.com/Anastasiy-alt/react-mesto-api-full'><span className='about__sign' target='blank'>↗</span></a></li>
            </ul>
        </section>
    )
};

export default AboutMe;