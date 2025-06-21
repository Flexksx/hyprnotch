export default function SettingsMenu() {
  return (
    <box
      className="settings_menu"
      child={
        <box
          vertical={true}
          children={[
            <label>Settings Menu</label>,
            <button>Option 1</button>,
            <button>Option 2</button>,
            <button>Option 3</button>,
          ]}
        ></box>
      }
    ></box>
  );
}
