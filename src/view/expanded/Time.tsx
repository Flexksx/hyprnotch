import { Variable } from "astal";

export default function Time() {
  const time = Variable("").poll(1000, "date");
  return (
    <box>
      <label>{time.get().split(" ")[3]}</label>
    </box>
  );
}
