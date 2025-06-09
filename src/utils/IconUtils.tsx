import { Astal } from "astal/gtk3";
import { GLib } from "astal";

export const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

export const fileExists = (path: string) =>
  GLib.file_test(path, GLib.FileTest.EXISTS);

export interface IconSourceProps {
  iconThemePath?: string;
  iconName?: string;
  iconPixmap?: string;
  fallbackIcon?: string;
  className?: string;
}

export function IconSource(props: IconSourceProps) {
  const {
    iconThemePath,
    iconName,
    iconPixmap,
    fallbackIcon = "application-x-executable-symbolic",
    className = "icon-source",
  } = props;

  if (iconThemePath && fileExists(iconThemePath)) {
    return (
      <box
        className={`${className}-image`}
        css={`
          background-image: url("${iconThemePath}");
          background-size: cover;
          background-position: center;
        `}
      />
    );
  }

  if (iconName && isIcon(iconName)) {
    return <icon className={`${className}-icon`} icon={iconName} />;
  }

  if (iconPixmap) {
    return <icon className={`${className}-pixmap`} icon={iconPixmap} />;
  }

  return <icon className={`${className}-fallback`} icon={fallbackIcon} />;
}
