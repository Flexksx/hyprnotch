export default function LoadingPlaceholder({
  width = 100,
  height = 80
}: {
  width?: number;
  height?: number;
}) {
  return (
    <box
      widthRequest={width}
      heightRequest={height}
      cssName="wallpaper_loading_placeholder"
      css={`
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.1) 25%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.1) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 6px;
      `}
    />
  );
}
