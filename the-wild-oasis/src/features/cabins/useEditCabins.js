import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabins() {
    const queryCLient = useQueryClient();

  const { isloading: isEditing, mutate:editCabin } = useMutation({
    mutationFn: ({newCabinData, id})=>createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("New cabin is created");
      queryCLient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
    return {isEditing, editCabin}
}

