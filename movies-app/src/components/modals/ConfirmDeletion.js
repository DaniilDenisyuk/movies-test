import "./Confirm.scss";

const ConfirmDeletion = ({ onConfirm, onDecline }) => (
  <div className="confirm">
    <p className="confirm__message">
      Вы уверены, что хотите безвозвратно удалить фильм?
    </p>
    <div className="confirm__buttons">
      <button className="confirm__button" onClick={onConfirm}>
        Подтвердить
      </button>
      <button className="confirm__button" onClick={onDecline}>
        Отмена
      </button>
    </div>
  </div>
);

export default ConfirmDeletion;
