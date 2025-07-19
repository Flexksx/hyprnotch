import ThemeSelectionViewModel from './ThemeSelectionViewModel';
import MatugenViewModel from './MatugenViewModel';
import { bind } from 'astal';

export default function ThemeSelection() {
  const themeSelectionViewModel = ThemeSelectionViewModel.getInstance();
  const matugenViewModel = MatugenViewModel.getInstance();
  const wallpapersBinding = themeSelectionViewModel.getWallpaperPaths();
  return (
    <box
      child={
        <scrollable
          className="theme_selection"
          child={
            <box
              children={wallpapersBinding.as(wallpapers =>
                wallpapers
                  .slice(0, 5)
                  .map(wallpaper => (
                    <box
                      className="wallpaper-item"
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
