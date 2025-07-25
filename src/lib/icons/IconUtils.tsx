export const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

export const fileExists = (path: string) =>
  GLib.file_test(path, GLib.FileTest.EXISTS);

// Standard icon directories to search
const ICON_DIRS = [
  '/usr/share/icons/',
  '/usr/share/pixmaps/',
  `${GLib.get_home_dir()}/.local/share/icons/`,
  `${GLib.get_home_dir()}/.icons/`
];

export const findIconInDirs = (iconName: string): string | null => {
  if (!iconName) return null;

  const extensions = ['.png', '.svg', '.xpm', ''];

  const sizeDirs = ['48x48', '64x64', '128x128', 'scalable', 'apps', ''];

  const themes = ['hicolor', 'Adwaita', 'gnome', 'breeze', ''];

  for (const dir of ICON_DIRS) {
    for (const theme of themes) {
      for (const size of sizeDirs) {
        for (const ext of extensions) {
          const variations = [
            iconName,
            iconName.endsWith('-symbolic')
              ? iconName.replace('-symbolic', '')
              : `${iconName}-symbolic`
          ];

          for (const variation of variations) {
            const themePath = theme ? `${dir}${theme}/` : dir;
            const sizePath = size ? `${size}/apps/` : '';
            const fullPath = `${themePath}${sizePath}${variation}${ext}`;

            if (fileExists(fullPath)) {
              return fullPath;
            }
          }
        }
      }
    }
  }

  return null;
};

export const findIcon = (iconName: string): string | null => {
  if (!iconName) return null;

  if (isIcon(iconName)) return iconName;

  if (!iconName.includes('.')) {
    const symbolicName = `${iconName}-symbolic`;
    if (isIcon(symbolicName)) return symbolicName;

    if (iconName.endsWith('-symbolic')) {
      const nonSymbolicName = iconName.replace('-symbolic', '');
      if (isIcon(nonSymbolicName)) return nonSymbolicName;
    }

    const prefixes = ['application-', 'org.gnome.', 'com.', 'io.', 'net.', ''];
    for (const prefix of prefixes) {
      if (prefix && isIcon(`${prefix}${iconName}`))
        return `${prefix}${iconName}`;

      if (prefix && isIcon(`${prefix}${iconName}-symbolic`))
        return `${prefix}${iconName}-symbolic`;
    }

    const lowerName = iconName.toLowerCase();
    if (lowerName !== iconName && isIcon(lowerName)) return lowerName;
  }

  return findIconInDirs(iconName);
};

export const debugIconLookup = (iconName: string): void => {
  console.log(`[Icon Debug] Looking up icon: ${iconName}`);
  console.log(`[Icon Debug] Direct GTK lookup: ${isIcon(iconName)}`);

  const foundIcon = findIcon(iconName);
  console.log(
    `[Icon Debug] Enhanced lookup result: ${foundIcon || 'not found'}`
  );
};

export interface IconSourceProps {
  iconThemePath?: string;
  iconName?: string;
  fallbackIcon?: string;
  className?: string;
}

export function IconSource(props: IconSourceProps) {
  const {
    iconThemePath,
    iconName,
    fallbackIcon = 'application-x-executable-symbolic',
    className = 'icon-source'
  } = props;

  if (iconThemePath && fileExists(iconThemePath)) {
    return (
      <box
        cssName={`${className}-image`}
        css={`
          background-image: url('${iconThemePath}');
          background-size: cover;
          background-position: center;
        `}
      />
    );
  }

  if (iconName) {
    const foundIcon = findIcon(iconName);
    if (foundIcon) {
      if (foundIcon.includes('/')) {
        return (
          <box
            cssName={`${className}-image`}
            css={`
              background-image: url('${foundIcon}');
              background-size: cover;
              background-position: center;
            `}
          />
        );
      }
      return <icon cssName={`${className}-icon`} icon={foundIcon} />;
    }
  }

  return <icon cssName={`${className}-fallback`} icon={fallbackIcon} />;
}
