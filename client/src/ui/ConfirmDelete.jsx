import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUI } from "../context/UIProvider";
import Button from "./Button";
import toast from "react-hot-toast";
import Loader from "./Loader";

function ConfirmDelete({ dataTitle, dataID, queryKey, mutateFunction }) {
  const { toggleModal } = useUI();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => mutateFunction(dataID),
    onSuccess: () => {
      toast.success(
        `${dataTitle.at(0).toUpperCase() + dataTitle.slice(1)} deletado!`,
      );
      toggleModal({ status: false, component: null });
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <p className="w-[70%] text-center text-xl drop-shadow">
        Você deseja mesmo excluir esse {dataTitle}?
      </p>
      {isPending ? (
        <Loader size="50px" />
      ) : (
        <div className="flex w-full flex-row items-center justify-center gap-6 px-6">
          <Button
            className="w-[35%] text-xs"
            padding="px-4 py-2"
            colors="bg-gray-500 hover:bg-green-800 text-gray-50"
            onClick={() => toggleModal({ status: false, component: null })}
          >
            Cancelar
          </Button>
          <Button
            colors="bg-red-800 hover:bg-red-700 text-gray-50"
            padding="px-4 py-2"
            className="w-[35%] text-xs"
            onClick={mutate}
          >
            Excluir
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm font-semibold text-red-600 drop-shadow-sm">
          Atenção!
        </p>
        <p className="text-xs drop-shadow">Essa ação não pode ser desfeita!</p>
      </div>
    </div>
  );
}

export default ConfirmDelete;
