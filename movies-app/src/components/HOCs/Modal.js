import { useClickOutside, useDisableScroll } from "../../hooks";
import { useRef } from "react";
import cn from "classnames";
import "./Modal.scss";

const ModalHOC = (Component) => {
  const Modal = (props) => {
    const { className, handleClose, ...rest } = props;
    const bodyRef = useRef();
    useClickOutside(bodyRef, handleClose);
    useDisableScroll();
    return (
      <div className={cn(className, "modal")}>
        <div className="modal__shadow-bg" />
        <div ref={bodyRef} className="modal__body">
          <span className="modal__close" onClick={handleClose} />
          <Component {...rest} />
        </div>
      </div>
    );
  };
  return Modal;
};

export default ModalHOC;
