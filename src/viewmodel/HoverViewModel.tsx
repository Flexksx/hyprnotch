import { Variable } from "astal";

export default class HoverViewModel {
  public isHovered = Variable<boolean>(false);
  constructor() {
    print("Started the hover view model");
  }
}
