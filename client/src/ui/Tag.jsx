import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Tag({ label, hasDelete = false }) {
  return (
    <p className="flex select-none flex-row items-center justify-center gap-1 rounded-full bg-green-700 px-2 py-1 text-gray-100 shadow">
      <span className="text-[10px] drop-shadow-sm">
        {firstLetterUppercase(label)}
      </span>
      {hasDelete && (
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer text-sm drop-shadow-sm"
          onClick={hasDelete}
        />
      )}
    </p>
  );
}

export default Tag;
