const MATERIAL_ICONS_FONT_NAME = 'Material Symbols Rounded';
export default function MaterialIcon({
  iconName,
  pixelSize = 16
}: {
  iconName: string;
  pixelSize?: number;
}) {
  return (
    <label
      class="material-symbols-outlined"
      css={`
        font-size: ${pixelSize}px;
        font-family: '${MATERIAL_ICONS_FONT_NAME}';
      `}
    >
      {iconName}
    </label>
  );
}
