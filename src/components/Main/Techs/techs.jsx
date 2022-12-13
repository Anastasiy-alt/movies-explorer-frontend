function Techs() {
    return (
        <section className='section section_for_techs'>
            <h2 className='section__title'>Технологии</h2>
            <div className='techs__layout'>
                <h3 className='techs__subtitle'>7 технологий</h3>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className='techs__set'>
                    <article className='techs__block'><p className='techs__block-text'>HTML</p></article>
                    <article className='techs__block'><p className='techs__block-text'>CSS</p></article>
                    <article className='techs__block'><p className='techs__block-text'>JS</p></article>
                    <article className='techs__block'><p className='techs__block-text'>React</p></article>
                    <article className='techs__block'><p className='techs__block-text'>Git</p></article>
                    <article className='techs__block'><p className='techs__block-text'>Express.js</p></article>
                    <article className='techs__block'><p className='techs__block-text'>mongoDB</p></article>
                </div>
            </div>
        </section>
    )
};

export default Techs;