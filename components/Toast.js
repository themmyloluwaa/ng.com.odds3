import { Toast } from "react-bootstrap";

const ToastComponent = ({ show, message, variant }) => {
  if (show === true) {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "200px",
          backgroundColor: variant || "#fff"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0
          }}
        >
          <Toast>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{message.header}</strong>
            </Toast.Header>
            <Toast.Body>{message.body}</Toast.Body>
          </Toast>
        </div>
      </div>
    );
  }
};

export default ToastComponent;
