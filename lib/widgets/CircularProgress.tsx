import { Gtk } from 'ags/gtk4';
import Gdk from 'gi://Gdk?version=4.0';
import Pango from 'gi://Pango?version=1.0';
import PangoCairo from 'gi://PangoCairo?version=1.0';

// Cairo is provided by GJS via the global `imports` object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Cairo: any = (globalThis as any).imports?.cairo;

export type CircularProgressProps = {
  value: number; // 0..1
  size?: number; // content width/height
  lineWidth?: number; // 0 => pie sector
  centerFilled?: boolean;
  radiusFilled?: boolean;
  centerFillColor?: string; // e.g. "#adadad"
  radiusFillColor?: string; // e.g. "#d3d3d3"
  progressFillColor?: string; // e.g. "#4a90d9"
  lineCap?: number; // Cairo.LineCap
  font?: string; // e.g. "URW Gothic"
  showText?: boolean; // draw percentage text
  class?: string;
  halign?: Gtk.Align;
  valign?: Gtk.Align;
};

export default function CircularProgress({
  value,
  size = 100,
  lineWidth = 6,
  centerFilled = false,
  radiusFilled = false,
  centerFillColor = '#adadad',
  radiusFillColor = '#d3d3d3',
  progressFillColor = '#4a90d9',
  lineCap = Cairo?.LineCap?.BUTT ?? 0,
  font = 'URW Gothic',
  showText = false,
  class: className,
  halign = Gtk.Align.CENTER,
  valign = Gtk.Align.CENTER
}: CircularProgressProps) {
  // clamp value
  const pct = Math.max(0, Math.min(1, value));

  return (
    <drawingarea
      contentWidth={size}
      contentHeight={size}
      class={className}
      halign={halign}
      valign={valign}
      $={self =>
        self.set_draw_func((area, cr, width, height) => {
          // Calculate geometry
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) / 2 - 1;

          // Normalize line width
          let lw = Math.max(0, Math.min(lineWidth, radius));
          let delta: number;
          if (radius - lw < 0) {
            delta = 0;
            lw = radius;
          } else {
            delta = radius - lw / 2;
          }

          // Helpers
          const setColor = (hex: string) => {
            const rgba = new Gdk.RGBA();
            if (rgba.parse(hex)) Gdk.cairo_set_source_rgba(cr, rgba);
          };

          cr.save();
          if (cr.setLineCap) cr.setLineCap(lineCap);
          if (cr.setLineWidth) cr.setLineWidth(lw);

          // Center fill
          if (centerFilled) {
            cr.arc(centerX, centerY, delta, 0, 2 * Math.PI);
            setColor(centerFillColor);
            cr.fill();
          }

          // Radius outline
          if (radiusFilled) {
            cr.arc(centerX, centerY, delta, 0, 2 * Math.PI);
            setColor(radiusFillColor);
            cr.stroke();
          }

          // Progress
          if (pct > 0) {
            setColor(progressFillColor);
            const start = -Math.PI / 2; // 12 o'clock
            const end = start + pct * 2 * Math.PI;
            if (lw === 0) {
              cr.moveTo(centerX, centerY);
              cr.arc(centerX, centerY, delta + 1, start, end);
              cr.fill();
            } else {
              cr.arc(centerX, centerY, delta, start, end);
              cr.stroke();
            }
          }

          // Optional text
          if (showText) {
            const ctx = (self as unknown as Gtk.Widget).get_style_context();
            const color = ctx.get_color();
            Gdk.cairo_set_source_rgba(cr, color);

            const layout = PangoCairo.create_layout(cr);
            layout.set_text(String(Math.round(pct * 100)), -1);
            let desc = Pango.FontDescription.from_string(`${font} 24`);
            layout.set_font_description(desc);
            PangoCairo.update_layout(cr, layout);
            let [w, h] = layout.get_size();
            cr.moveTo(centerX - w / Pango.SCALE / 2, centerY - 27);
            PangoCairo.show_layout(cr, layout);

            layout.set_text('PERCENT', -1);
            desc = Pango.FontDescription.from_string(`${font} 8`);
            layout.set_font_description(desc);
            PangoCairo.update_layout(cr, layout);
            [w, h] = layout.get_size();
            cr.moveTo(centerX - w / Pango.SCALE / 2, centerY + 13);
            PangoCairo.show_layout(cr, layout);
          }

          cr.restore();
        })
      }
    />
  );
}
