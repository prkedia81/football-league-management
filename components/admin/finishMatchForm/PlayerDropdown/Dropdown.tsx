import { useForm, Controller } from "react-hook-form";
import PlayersDropdown from "@/components/admin/finishMatchForm/PlayerDropdown/playerDropdown";

const MyForm = () => {
 const { handleSubmit, control } = useForm();

 const onSubmit = (data) => {
    console.log(data);
 };

 return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="selectedPlayer"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <PlayersDropdown
            players={[
              { id: 1, name: "Player 1" },
              { id: 2, name: "Player 2" },
              { id: 3, name: "Player 3" },
            ]}
            {...field}
          />
        )}
      />
      {/* Other form fields */}
      <button type="submit">Submit</button>
    </form>
 );
};
