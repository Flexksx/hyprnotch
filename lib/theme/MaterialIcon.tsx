const MATERIAL_ICONS_FONT_NAME = 'Material Symbols Rounded';
export default function MaterialIcon({
  className,
  iconName,
  iconSize = 18
}: {
  className: string;
  iconName: string;
  iconSize?: number;
}) {
  return (
    <label
      class={className}
      css={`
        font-family: '${MATERIAL_ICONS_FONT_NAME}';
        font-size: ${iconSize}px;
      `}
      label={iconName}
    />
  );
}
