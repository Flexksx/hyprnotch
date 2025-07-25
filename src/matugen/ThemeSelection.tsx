import ThemeSelectionViewModel from './ThemeSelectionViewModel';
import MatugenViewModel from './MatugenViewModel';
export default function ThemeSelection() {
  const themeSelectionViewModel = ThemeSelectionViewModel.getInstance();
  const matugenViewModel = MatugenViewModel.getInstance();
  const wallpapersBinding = themeSelectionViewModel.getWallpaperPaths();
  return (
    <box
      child={
        <scrollable
          cssName="theme_selection"
          child={
            <box
              children={wallpapersBinding.as(wallpapers =>
                wallpapers
                  .slice(0, 5)
                  .map(wallpaper => (
                    <box
                      cssName="wallpaper-item"
                      child={<icon icon={wallpaper} />}
                    />
                  ))
              )}
            />
          }
        />
      }
    />
  );
}
