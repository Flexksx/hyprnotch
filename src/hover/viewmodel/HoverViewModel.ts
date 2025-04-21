import { Variable } from "astal";

export default class HoverViewModel {
  public isHovered = Variable<boolean>(false);
  constructor() {
    console.log("Started the hover view model");
  }
}
