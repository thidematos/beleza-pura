import { useEffect, useRef } from "react";
import { useUI } from "../context/UIProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal() {
  const { toggleModal, modalContent } = useUI();

  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    return () => (document.body.style = "");
  }, []);

  const coverRef = useRef();

  return (
    <div
      ref={coverRef}
      className="absolute bottom-0 top-0 z-[998] h-full w-full bg-black/80"
      onClick={(e) => {
        if (e.target !== coverRef.current) return;
        toggleModal({ status: false, component: null });
      }}
    >
      <div className="centerXY absolute z-[999] min-h-[20%] rounded-lg bg-gray-100">
        <div className="relative h-full w-full">
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute right-5 top-5 cursor-pointer text-2xl"
            onClick={() => toggleModal({ status: false, component: null })}
          />
          {modalContent}
        </div>
      </div>
    </div>
  );
}

export default Modal;
