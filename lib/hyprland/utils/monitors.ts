import { Gdk } from 'ags/gtk4';

export const sortMonitorsHorizontally = (monitors: Gdk.Monitor[]) => {
  return monitors.sort((a, b) => {
    const aGeom = a.get_geometry();
    const bGeom = b.get_geometry();
    return aGeom.x - bGeom.x;
  });
};
