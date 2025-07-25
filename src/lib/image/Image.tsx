type ImageProps = {
  className?: string;
  src: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};

export default function Image({
  className,
  src,
  width,
  height,
  onClick
}: ImageProps) {
  const createSafeUrl = (path: string): string => {
    if (path.startsWith('/')) {
      return `file://${encodeURI(path)}`;
    }
    return path;
  };

  const safeUrl = createSafeUrl(src);

  // Create CSS that optimizes for performance
  const createBackgroundImageCss = (url: string): string => `
    background-image: url('${url}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    will-change: transform, opacity;
  `;

  return (
    <eventbox
      onClick={onClick}
      child={
        <box
          widthRequest={width}
          heightRequest={height}
          cssName={className}
          css={createBackgroundImageCss(safeUrl)}
        />
      }
    />
  );
}
