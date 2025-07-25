type CavaBarProps = {
  value: number;
  width: number;
  valign: Gtk.Align;
  maxBarHeight: number;
  minBarHeight: number;
};

const CavaBar = ({
  value,
  width,
  valign,
  maxBarHeight,
  minBarHeight
}: CavaBarProps) => {
  const height = Math.max(value * maxBarHeight, minBarHeight);
  return (
    <box
      cssName={'cava_bar ' + (valign === Gtk.Align.END ? 'top' : 'bottom')}
      heightRequest={height}
      widthRequest={width}
      valign={valign}
      spacing={0}
    />
  );
};

export type CavaBarSectionProps = {
  values: Binding<number[]>;
  type: 'top' | 'bottom';
  maxBarHeight: number;
  minBarHeight: number;
  barWidth: number;
  spacing: number;
};

export default function CavaBarSection({
  values,
  type,
  maxBarHeight,
  minBarHeight,
  barWidth,
  spacing
}: CavaBarSectionProps) {
  const isTop = type === 'top';

  return (
    <box
      cssName={`cava_${type}`}
      halign={Gtk.Align.CENTER}
      valign={isTop ? Gtk.Align.END : Gtk.Align.START}
      spacing={spacing}
      children={values.as(values => {
        return values.map((value, index) => (
          <CavaBar
            value={value}
            width={barWidth}
            valign={isTop ? Gtk.Align.END : Gtk.Align.START}
            maxBarHeight={maxBarHeight}
            minBarHeight={minBarHeight}
          />
        ));
      })}
    />
  );
}
