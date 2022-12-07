// import planet from '../../../images/promo_planet.svg'

function AboutProject() {
    return (
        <AboutProject className='project'>

            <h2 className='section__title'>О проекте</h2>

            <div className='project__layout'>

                <article className='project__article'>
                    <h3 className='project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>

                <article className='project__article'>
                    <h3 className='project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
                
            </div>

            <article className='project__timeline'>
                <div className='project__one-week'>1 неделя</div>
                <p className='project__signature'>Back-end</p>
                <div className='project__four-weeks'>4 недели</div>
                <p className='project__signature'>Front-end</p>
            </article>

        </AboutProject>
    )
};

export default AboutProject;