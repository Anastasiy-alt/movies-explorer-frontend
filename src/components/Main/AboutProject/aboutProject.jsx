// import planet from '../../../images/promo_planet.svg'

function AboutProject() {
    return (
        <aboutProject className='section section__for_project'>

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
                <div className='project__week project__week_amount_one'><p className='project__week-text'>1 неделя</p></div>
                <div className='project__week project__week_amount_four'><p className='project__week-text'>4 недели</p></div>
                <p className='project__signature'>Back-end</p>
                <p className='project__signature'>Front-end</p>
            </article>

        </aboutProject>
    )
};

export default AboutProject;