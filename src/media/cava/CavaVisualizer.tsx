import CavaViewModel from './CavaViewModel';
import { CAVA_CONSTANTS } from './constants';
import CavaBarSection from './CavaBarSection';

export type CavaVisualizerProps = {
  cavaViewModel: CavaViewModel;
  maxBarHeight: number;
  minBarHeight: number;
};

export default function CavaVisualizer({
  cavaViewModel,
  minBarHeight,
  maxBarHeight
}: CavaVisualizerProps) {
  // Divide by 2 since we have both top and bottom sections
  const sectionMaxHeight = maxBarHeight / 2;
  const sectionMinHeight = minBarHeight / 2;
  const cavaValues = cavaViewModel.getCavaValues();

  return (
    <box
      cssName="cava_visualizer"
      orientation={Gtk.Orientation.VERTICAL}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      spacing={CAVA_CONSTANTS.CONTAINER_SPACING}
      children={[
        <CavaBarSection
          values={cavaValues}
          type="top"
          maxBarHeight={sectionMaxHeight}
          minBarHeight={sectionMinHeight}
          barWidth={CAVA_CONSTANTS.BAR_WIDTH}
          spacing={CAVA_CONSTANTS.BAR_SPACING}
        />,
        <CavaBarSection
          values={cavaValues}
          type="bottom"
          maxBarHeight={sectionMaxHeight}
          minBarHeight={sectionMinHeight}
          barWidth={CAVA_CONSTANTS.BAR_WIDTH}
          spacing={CAVA_CONSTANTS.BAR_SPACING}
        />
      ]}
    />
  );
}
