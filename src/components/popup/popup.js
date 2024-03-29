import yes from '../../images/yes.svg';
import no from '../../images/no.svg';

function PopupSuccess({ isOpen, onClose, isSuccess, messageSuccess, messageError }) {

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container popup__container_for_tooltip">
                <button className="button popup__close" type="button" onClick={onClose}></button>
                <img src={isSuccess ? yes : no} alt={isSuccess ? "Галочка." : "Крестик."} className="popup__icon" />
                <h3 className="popup__heading popup__heading_for_tooltip">{isSuccess ? messageSuccess : messageError}</h3>
            </div>
        </div>
    )
}

export default PopupSuccess;