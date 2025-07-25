import FocusedClientViewModel from '../../hyprland/FocusedClientViewModel';

export default function FocusedClient() {
  const focusedClientViewModel = new FocusedClientViewModel();
  return (
    <box
      cssName={'focused_client_container'}
      child={
        <button
          cssName="focused_client"
          child={focusedClientViewModel.getFocusedClient().as(client => {
            if (client) {
              return <label label={client.get_class()} />;
            } else {
              return <label label={'No focused client'} />;
            }
          })}
        />
      }
    />
  );
}
