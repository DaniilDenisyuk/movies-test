import cn from "classnames";
import "./ToastMessage.scss";

const ToastMessage = ({ appearance, children }) => (
  <div
    className={cn("toast-message", {
      "toast-message--error": appearance === "error",
      "toast-message--success": appearance === "success",
      "toast-message--info": appearance === "info",
    })}
  >
    {children}
  </div>
);

export default ToastMessage;
