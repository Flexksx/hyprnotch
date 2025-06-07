import FocusedClientViewModel from "../../hyprland/FocusedClientViewModel";

export default function FocusedClient() {
  const focusedClientViewModel = new FocusedClientViewModel();
  return (
    <box
      className={"focused_client_container"}
      child={
        <button
          className="focused_client"
          child={focusedClientViewModel.getFocusedClient().as((client) => {
            if (client) {
              return <label label={client.get_initial_title()} />;
            } else {
              return <label label={"No focused client"} />;
            }
          })}
        />
      }
    />
  );
}
