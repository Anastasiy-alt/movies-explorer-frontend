function Footer() {
    return (
        <footer className='footer'>
            <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className='footer__block'>
                <p className='footer__year'>@2023</p>
                <div className='footer__block-links'>
                    <a href='https://practicum.yandex.ru/' className='link footer__link' target='blank'>Яндекс.Практикум</a>
                    <a href='https://github.com/' className='link footer__link' target='blank'>Github</a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;