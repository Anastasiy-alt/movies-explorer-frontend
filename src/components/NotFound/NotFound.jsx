import { useHistory } from "react-router-dom";

function NotFound() {
    let history = useHistory();

    return (
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
            <button className="not-found__link button link" onClick={history.goBack}>Назад</button>
        </div>
    )
}

export default NotFound;