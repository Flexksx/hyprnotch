---
applyTo: "**"
---

Coding standards, domain knowledge, and preferences that AI should follow.

---

Of course. Here is the compressed Markdown documentation for the "Builtin Intrinsic Elements."

---

Builtin intrinsic elements are GTK widgets that you can use as lowercase JSX tags without an explicit import. For example, `<box />` is treated the same as `<Gtk.Box />`.

## Gtk4

### box

**`Gtk.Box`**

```jsx
<box orientation={Gtk.Orientation.HORIZONTAL}>
  <Child />
  <Child />
</box>
```

### button

**`Gtk.Button`**

```jsx
<button onClicked={() => print("clicked")}>
  <Child />
</button>
```

### centerbox

**`Gtk.CenterBox`**
Children are placed using the special `$type` prop.

```jsx
<centerbox orientation={Gtk.Orientation.HORIZONTAL}>
  <Child $type="start" />
  <Child $type="center" />
  <Child $type="end" />
</centerbox>
```

### drawingarea

**`Gtk.DrawingArea`**

```jsx
<drawingarea
  $={(self) =>
    self.set_draw_func((area, cr, width, height) => {
      // Drawing logic here
    })
  }
/>
```

### entry

**`Gtk.Entry`**

```jsx
<entry
  placeholderText="Start typing..."
  text=""
  onNotifyText={({ text }) => print(text)}
/>
```

### image

**`Gtk.Image`**

```jsx
<image
  file="/path/to/file.png"
  iconName="system-search-symbolic"
  pixelSize={16}
/>
```

### label

**`Gtk.Label`**

```jsx
<label
  label="<span foreground='blue'>text</span>"
  useMarkup
  wrap
  ellipsize={Pango.EllipsizeMode.END}
/>
```

### levelbar

**`Gtk.LevelBar`**

```jsx
<levelbar
  orientation={Gtk.Orientation.HORIZONTAL}
  widthRequest={200}
  value={0.5}
/>
```

### menubutton

**`Gtk.MenuButton`**
The second child is implicitly used as the popover content.

```jsx
<menubutton>
  <label>Button Content</label>
  <popover>
    <label>Popover Content</label>
  </popover>
</menubutton>
```

### overlay

**`Gtk.Overlay`**
The first child is the main content; subsequent children with `$type="overlay"` are layered on top.

```jsx
<overlay>
  <Child />
  <Child $type="overlay" />
</overlay>
```

### revealer

**`Gtk.Revealer`**

```jsx
<revealer
  transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
  revealChild={true}
  onNotifyChildRevealed={() => print("animation finished")}
>
  <Child />
</revealer>
```

### scrolledwindow

**`Gtk.ScrolledWindow`**

```jsx
<scrolledwindow maxContentHeight={500}>
  <Child />
</scrolledwindow>
```

### slider

**`Astal.Slider`**

```jsx
<slider
  value={0.5}
  min={0}
  max={1}
  onChangeValue={({ value }) => print(value)}
/>
```

### stack

**`Gtk.Stack`**
Children must be named using the `$type="named"` prop.

```jsx
<stack $={(self) => (self.visibleChildName = "child2")}>
  <Child $type="named" name="child1" />
  <Child $type="named" name="child2" />
</stack>
```

### switch

**`Gtk.Switch`**

```jsx
<switch active={true} onNotifyActive={({ active }) => print(active)} />
```

### togglebutton

**`Gtk.ToggleButton`**

```jsx
<togglebutton active={true} onToggled={({ active }) => print(active)} />
```

### window

**`Astal.Window`**

```jsx
<window
  visible
  namespace="bar"
  class="Bar"
  monitor={0}
  exclusivity={Astal.Exclusivity.EXCLUSIVE}
  keymode={Astal.Keymode.ON_DEMAND}
  anchor={
    Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT
  }
/>
```

---

## Gtk3

### box

**`Gtk.Box`**

```jsx
<box orientation={Gtk.Orientation.HORIZONTAL}>
  <Child />
</box>
```

### button

**`Gtk.Button`**

```jsx
<button onClicked={() => print("clicked")}>
  <Child />
</button>
```

### centerbox

**`Astal.CenterBox`**

```jsx
<centerbox orientation={Gtk.Orientation.HORIZONTAL}>
  <Child $type="start" />
  <Child $type="center" />
  <Child $type="end" />
</centerbox>
```

### circularprogress

**`Astal.CircularProgress`**

```jsx
<circularprogress value={0.5} startAt={0.75}>
  <icon icon="system-search-symbolic" />
</circularprogress>
```

```css
circularprogress {
  color: green;
  background-color: black;
  font-size: 6px; /* thickness */
}
```

### drawingarea

**`Gtk.DrawingArea`**

```jsx
<drawingarea
  onDraw={(self, cr) => {
    // Drawing logic here
  }}
/>
```

### entry

**`Gtk.Entry`**

```jsx
<entry
  onChanged={({ text }) => print("text changed", text)}
  onActivate={({ text }) => print("enter", text)}
/>
```

### eventbox

**`Astal.EventBox`**

```jsx
<eventbox
  onClick={(_, event) => {
    print(event.modifier, event.button);
  }}
/>
```

### icon

**`Astal.Icon`**

```jsx
<icon icon="/path/to/file.png" />
```

```css
icon {
  font-size: 16px; /* icon size */
}
```

### label

**`Astal.Label`**

```jsx
<label label="hello" maxWidthChars={16} wrap />
```

### levelbar

**`Astal.LevelBar`**

```jsx
<levelbar value={0.5} widthRequest={200} />
```

### overlay

**`Astal.Overlay`**
The first child is the main widget; subsequent children are overlays.

```jsx
<overlay>
  <Child>main content</Child>
  <Child>overlay 1</Child>
</overlay>
```

### revealer

**`Gtk.Revealer`**

```jsx
<revealer
  transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
  revealChild={true}
>
  <Child />
</revealer>
```

### scrollable

**`Astal.Scrollable`**

```jsx
<scrollable heightRequest={100}>
  <Child />
</scrollable>
```

### slider

**`Astal.Slider`**

```jsx
<slider widthRequest={100} onDragged={({ value }) => print(value)} />
```

### stack

**`Astal.Stack`**
Children must be named.

```jsx
<stack $={(self) => (self.visibleChildName = "child2")}>
  <Child name="child1" />
  <Child name="child2" />
</stack>
```

### switch

**`Gtk.Switch`**

```jsx
<switch active={true} onNotifyActive={({ active }) => print(active)} />
```

### togglebutton

**`Gtk.ToggleButton`**

```jsx
<togglebutton active={true} onToggled={({ active }) => print(active)} />
```

### window

**`Astal.Window`**
(Same properties as Gtk4 version)

```jsx
<window
  visible
  namespace="bar"
  monitor={0}
  exclusivity={Astal.Exclusivity.EXCLUSIVE}
/>
```

### **GTK CSS Theming**

Theming in `ags` is done via CSS, but it uses the GTK implementation. Not all web CSS features are supported. Always refer to the official GTK4 documentation for specifics on supported selectors and properties.

#### **Loading Stylesheets**

There are two primary ways to load CSS.

**1. On Application Start**

Pass CSS as a string to the `app.start` configuration. You can import `.css` or `.scss` files, which will be treated as strings, or define CSS inline.

```javascript
import app from "ags/gtk4/app";
import css from "./style.css";
import scss from "./style.scss";

const inlineCss = `
  window {
    background-color: transparent;
  }
`;

app.start({
  // Provide one or more stylesheets
  css: [css, scss, inlineCss],
});
```

**2. At Runtime**

Apply or reset CSS after the application has started.

- **`app.apply_css(path_or_string)`**: Applies a new stylesheet from a file path or a string. This is additive and will be applied on top of existing styles.
- **`app.reset_css()`**: Resets all previously applied stylesheets.

#### **Styling Widgets**

**Class-based Styling (Preferred)**

The best practice is to assign classes to widgets and define styles in your global stylesheets.

```jsx
// In your widget file
<box class="my-container"> ... </box>

// In your style.css
.my-container {
  padding: 1em;
  border: 1px solid red;
}
```

**Inline CSS Property (Use Sparingly)**

For rare cases where styles depend on a JavaScript value, you can use the `css` prop.
**Warning**: Styles from the `css` prop **do not cascade** to children. Avoid it for general styling.

```jsx
<box css="padding: 1em; border: 1px solid red;" />
```

#### **Debugging with the GTK Inspector**

To inspect the widget hierarchy, view applied CSS, and test selectors, run:

```bash
ags inspect
```

---

### **GTK CSS Reference Summary**

#### **Selectors**

GTK supports CSS selectors that match against a tree of nodes.

- **Element Name**: `scale`, `button`
- **Style Class**: `.my-class`
- **Widget Name (ID)**: `#my-widget-name` (GTK uses widget names as IDs)
- **Descendant**: `window label`
- **Direct Child**: `notebook > entry`
- **State Pseudo-classes**: `:active`, `:hover`, `:disabled`, `:checked`, `:focus`, `:indeterminate`, `:backdrop`.

#### **Properties and Values**

- GTK supports a subset of standard CSS properties and adds its own, which are prefixed with **`-gtk-`**.
- **Data Types**: Supports standard units like `<length>` (`px`, `pt`, `em`, `rem`), `<percentage>` (`%`), and expressions via `calc()`.
- **Colors**: Can be defined using standard names (`red`), `rgb()`, `rgba()`, hex (`#ff00cc`), or with GTK's `@define-color` rule for variables.
  ```css
  @define-color my_color #f9a039;
  window {
    background-color: @my_color;
  }
  ```
- **Images**: Use `url()` for image files. Gradients are also supported (`linear-gradient`, `radial-gradient`, and the legacy `-gtk-gradient`).
- **Transitions & Animations**: Standard CSS `transition` properties and `@keyframes` animations are supported for dynamic effects on animatable properties.

#### **Key Bindings**

GTK supports custom key bindings via the `@binding-set` CSS rule, which can then be applied to widgets using the `-gtk-key-bindings` property.

```css
@binding-set my-bindings {
  bind "<alt>Left" { "move-cursor" (visual-positions, -1, 0) };
}

entry {
  -gtk-key-bindings: my-bindings;
}
```

### **File I/O**

Utilities for file operations are available from `ags/file`.

- **Read Files**:

  - `readFile(path: string): string`
  - `readFileAsync(path: string): Promise<string>`

- **Write Files**:

  - `writeFile(content: string, path: string): void`
  - `writeFileAsync(content: string, path: string): Promise<void>`

- **Monitor Files**: Recursively monitors a file or directory for changes.

  - `monitorFile(path: string, callback: (file: string, event: Gio.FileMonitorEvent) => void): Gio.FileMonitor`

---

### **Timeouts and Intervals**

Import from `astal/time`. These functions return an `AstalIO.Time` instance with `now` and `cancelled` signals.

- **`interval(interval: number, callback?: () => void)`**: Executes immediately and then repeats every `interval` milliseconds.
- **`timeout(timeout: number, callback?: () => void)`**: Executes once after `timeout` milliseconds.
- **`idle(callback?: () => void)`**: Executes when there are no higher-priority events.

<!-- end list -->

```javascript
// Example usage for interval, timeout, or idle
const timer = interval(1000, () => console.log("optional callback"));
timer.connect("now", () => console.log("tick"));
timer.connect("cancelled", () => console.log("cancelled"));

timer.cancel(); // Stop the timer
```

- **`createPoll`**: Creates a signal that polls for data only when it has at least one subscriber. Useful for efficient, on-demand polling.

  ```javascript
  // Signature for polling a shell command
  function createPoll<T>(init: T, interval: number, exec: string | string[], transform?: (stdout: string, prev: T) => T): Accessor<T>

  // Signature for polling a JS function
  function createPoll<T>(init: T, interval: number, fn: (prev: T) => T | Promise<T>): Accessor<T>

  // Example
  function Counter() {
    const counter = createPoll(0, 1000, (prev) => prev + 1);
    return <label label={counter((c) => c.toString())} />;
  }
  ```

---

### **Process Functions**

Import from `ags/process`.

- **`exec(cmd: string | string[]): string`**: Synchronously executes a command and returns its stdout. Throws an error on failure.

- **`execAsync(cmd: string | string[]): Promise<string>`**: Asynchronously executes a command and returns a promise with its stdout.

  **Note**: These functions do **not** use a shell. They don't expand environment variables (`$HOME`) or handle operators (`&&`, `||`). To use shell features, wrap the command in `bash -c`.

  ```bash
  exec(["bash", "-c", "command $VAR && other-command"]);
  ```

- **`subprocess(cmd, onOut?, onErr?)`**: Starts a long-running process. Provides stdout and stderr through optional callbacks or signals (`stdout`, `stderr`).

  ```javascript
  const proc = subprocess("some-command", (out) => console.log(out));
  proc.connect("stdout", (_, out) => console.log(out));
  ```

- **`createSubprocess(init, exec, transform?)`**: Creates a signal that starts a subprocess when the first subscriber appears and kills it when the last subscriber disconnects.

  ```javascript
  function Log() {
    const log = createSubprocess("", "journalctl -f");
    return <label label={log} />;
  }
  ```

---

### **HTTP Requests**

Import from `ags/fetch`. Uses a `fetch` API similar to the web standard.

```javascript
import { fetch, URL } from "ags/fetch";

const url = new URL("https://some-site.com/api");
url.searchParams.set("param", "value");

const res = await fetch(url, {
  method: "POST",
  body: JSON.stringify({ hello: "world" }),
  headers: { "Content-Type": "application/json" },
});

const json = await res.json();
```

### **ags Application Structure**

- **Entry Point**: Every `ags` application starts with `app.start()`. `app` is a singleton instance of `Astal.Application`.

  ```javascript
  import app from "ags/gtk4/app";

  app.start({
    main() {
      // Instantiate root widgets here
      Bar(0);
      Bar(1); // e.g., for each monitor
    },
  });
  ```

- **Root Widget**: The top-level widget of any UI component must be a `<window>`.

  ```javascript
  import Gtk from "gi://Gtk";

  function Bar(monitor = 0) {
    return (
      <window class="Bar" monitor={monitor}>
        <box>Content of the widget</box>
      </window>
    );
  }
  ```

---

### **Widgets & JSX Syntax**

Widgets are JavaScript functions that return a `GObject.Object` (usually a `Gtk.Widget`) using JSX.

- `lowercase` tags (`<box>`) are built-in intrinsic widgets.
- `Capitalized` tags (`<MyButton>`) are custom widgets you define.

#### **Defining & Nesting Widgets**

```javascript
// Define a custom widget
function MyButton() {
  return (
    <button onClicked={(self) => console.log(self, "clicked")}>
      <label label="Click me!" />
    </button>
  );
}

// Nest it in another widget
function MyBar() {
  return (
    <window>
      <box>
        Click The button
        <MyButton />
      </box>
    </window>
  );
}
```

#### **Displaying Data**

Use curly braces `{}` to embed JavaScript variables and expressions inside JSX markup, both for content and attributes.

```javascript
function MyWidget() {
  const label = "hello";
  // Embed as content
  // return <button>{label}</button>

  // Embed as an attribute
  return <button label={label} />;
}
```

#### **Conditional Rendering**

Use standard JavaScript conditionals to control widget rendering. Falsy values are not rendered.

- **Ternary operator:** `return <box>{condition ? <True /> : <False />}</box>;`
- **Logical AND (for no else branch):** `return <box>{condition && <True />}</box>;`

#### **Rendering Lists**

Use array methods like `.map()` to render a list of widgets.

```javascript
function MyWidget() {
  const labels = ["label1", "label2", "label3"];
  return (
    <box>
      {labels.map((label) => (
        <label label={label} />
      ))}
    </box>
  );
}
```

---

### **Widget Communication**

#### **Signal Handlers**

Respond to events by defining handler functions and passing them as props.

```javascript
import Gtk from "gi://Gtk";

function MyButton() {
  function onClicked(self: Gtk.Button) {
    console.log(self, "was clicked");
  }
  return <button onClicked={onClicked} />;
}
```

#### **Props & Children**

A custom widget receives a single object as its parameter, containing all passed props. The `children` prop is special and contains any nested JSX elements.

```javascript
type Props = {
  myprop: string,
  children?: JSX.Element | Array<JSX.Element>, // JSX.Element is GObject.Object
};

function MyWidget({ myprop, children }: Props) {
  // ...
}

// `children` is a single <box /> element
<MyWidget myprop="hello">
  <box />
</MyWidget>;

// `children` is an array of two <box /> elements
<MyWidget myprop="hello">
  <box />
  <box />
</MyWidget>;
```

---

### **State Management & Dynamic Rendering**

State is managed via signals from `ags`.

- `createState`: A writable signal for local state.
- `createBinding`: A signal used to hook into `GObject` properties.

#### **State Example with `createState`**

Signals can be called as a function (`count((v) => ...)`) to transform their value for display.

```javascript
import { createState } from "ags";

function Counter() {
  const [count, setCount] = createState(0);

  function increment() {
    setCount((v) => v + 1);
  }

  // Transform the number signal into a string signal for the label
  const label = count((num) => num.toString());

  return (
    <box>
      <label label={label} />
      <button onClicked={increment}>Click to increment</button>
    </box>
  );
}
```

#### **Dynamic Rendering with `<With>`**

Renders content based on a signal's value.
**Warning**: When the value changes, the old widget is destroyed and a new one is appended, not preserving order. Wrap in a container to avoid layout shifts. It is often better to render the component permanently and toggle its `visible` property.

```javascript
import { With, Accessor } from "ags";

let value: Accessor<{ member: string } | null>;

<box>
  <With value={value}>
    {(value) => value && <label label={value.member} />}
  </With>
</box>;
```

#### **Dynamic List Rendering with `<For>`**

Renders a list of items from a signal array.
**Warning**: New items are always appended to the end of the parent container, not inserted in order. Wrap in a container to manage layout.

```javascript
import { For, Accessor, Binding } from "ags";

let list: Accessor<Array<any>>;

<box>
  <For each={list}>
    {(item, index: Binding<number>) => (
      <label label={index.as((i) => `${i}. ${item}`)} />
    )}
  </For>
</box>;
```

oding standards, domain knowledge, and preferences that AI should follow.
