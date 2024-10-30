import { faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUI } from "../../context/UIProvider";
import ConfirmDelete from "../../ui/ConfirmDelete";
import UpdateProduto from "./UpdateProduto";

function OptionsMenu({ dataID, queryKey, dataTitle, updateComponent }) {
  const { toggleModal } = useUI();

  return (
    <div className="flex flex-row items-center justify-center gap-6">
      <FontAwesomeIcon
        className="cursor-pointer text-brandGreen drop-shadow"
        icon={faGear}
        onClick={() => {
          toggleModal({
            status: true,
            component: updateComponent,
          });
        }}
      />
      <FontAwesomeIcon
        className="cursor-pointer text-red-800 drop-shadow"
        icon={faTrash}
        onClick={() =>
          toggleModal({
            status: true,
            component: (
              <ConfirmDelete
                dataTitle={dataTitle}
                dataID={dataID}
                queryKey={queryKey}
              />
            ),
          })
        }
      />
    </div>
  );
}

export default OptionsMenu;
