import FocusedClientViewModel from "../../hyprland/FocusedClientViewModel";

export default function FocusedClient() {
  const focusedClientViewModel = new FocusedClientViewModel();
  return (
    <button
      className="focused_client"
      child={focusedClientViewModel.getFocusedClient().as((client) => {
        if (client) {
          return <label>{client.get_initial_title()}</label>;
        } else {
          return <label>No focused client</label>;
        }
      })}
    ></button>
  );
}
