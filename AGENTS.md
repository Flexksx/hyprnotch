# hyprnotch - hyprland shell project

## Tech used
GTK bindings in typescript
scss (only gtk compatible scss is supported)

### GTK Bindings  
Widget
Gtk3
Additional widget properties

These are properties that Astal additionally adds to Gtk.Widgets

    className: string - List of class CSS selectors separated by white space.
    css: string - Inline CSS. e.g label { color: white; }. If no selector is specified * will be assumed. e.g color: white; will be inferred as * { color: white; }.
    cursor: string - Cursor style when hovering over widgets that have hover states, e.g it won't work on labels. list of valid values.
    clickThrough: boolean - Lets click events through.

To have a full list of available properties, reference the documentation of the widget.

    Astal3 widgets
    Gtk3 widgets

Most common ones you will use frequently are

    halign
    valign
    hexpand
    vexpand

Additional widget methods
setup

setup is a convenience prop to remove the need to predefine widgets before returning them in cases where a reference is needed.

without setup

function MyWidget() {
    const button = new Widget.Button()
    // setup button
    return button
}

using setup

function MyWidget() {
    function setup(button: Widget.Button) {
        // setup button
    }

    return <buttons setup={setup} />
}

hook

Shorthand for connection and disconnecting to Subscribable and Connectable objects.

without hook

function MyWidget() {
    const id = gobject.connect("signal", callback)
    const unsub = variable.subscribe(callback)

    return <box
        onDestroy={() => {
            gobject.disconnect(id)
            unsub()
        }}
    />
}

with hook

function MyWidget() {
    return <box
        setup={(self) => {
            self.hook(gobject, "signal", callback)
            self.hook(variable, callback)
        }}
    />
}

toggleClassName

Toggle classNames based on a condition

function MyWidget() {
    return <box
        setup={(self) => {
            self.toggleClassName("classname", someCondition)
        }}
    />
}

How to use non builtin Gtk widgets

Using the astalify mixin you can subclass widgets to behave like builtin widgets. The astalify mixin will apply the following:

    set visible to true by default (Gtk3 widgets are invisible by default)
    make gobject properties accept and consume Binding objects
    add properties and methods listed above
    set up signal handlers that are passed as props prefixed with on

import GObject from "gi://GObject"
import { Gtk, Gdk, Widget, astalify, type ConstructProps } from "astal/gtk3"

// subclass, register, define constructor props
class ColorButton extends astalify(Gtk.ColorButton) {
    static { GObject.registerClass(this) }

    constructor(props: ConstructProps<
        ColorButton,
        Gtk.ColorButton.ConstructorProps,
        { onColorSet: [] } // signals of Gtk.ColorButton have to be manually typed
    >) {
        super(props as any)
    }
}

function MyWidget() {
    function setup(button: ColorButton) {

    }

    return <ColorButton
        setup={setup}
        useAlpha
        rgba={new Gdk.RGBA({
            red: 1,
            green: 0,
            blue: 0,
            alpha: 0.5,
        })}
        onColorSet={(self) => {
            print(self.rgba)
        }}
    />
}

INFO

Signal properties have to be annotated manually for TypeScript. You can reference Gtk3 and Astal3 for available signals.
TypeScript

Type of widgets are available through Widget. Here is an example Widget that takes in and handles a possibly Binding prop.

import { Binding, Variable } from "astal"
import { Widget } from "astal/gtk3"

export interface ToggleButtonProps extends Widget.ButtonProps {
    onToggled?: (self: Widget.Button, on: boolean) => void
    state?: Binding<boolean> | boolean
    child?: JSX.Element
}

export default function ToggleButton(btnprops: ToggleButtonProps) {
    const { state = false, onToggled, setup, child, ...props } = btnprops
    const innerState = Variable(state instanceof Binding ? state.get() : state)

    return <button
        {...props}
        setup={self => {
            setup?.(self)

            self.toggleClassName("active", innerState.get())
            self.hook(innerState, () => self.toggleClassName("active", innerState.get()))

            if (state instanceof Binding) {
                self.hook(state, () => innerState.set(state.get()))
            }
        }}
        onClicked={self => {
            onToggled?.(self, !innerState.get())
        }}
    >
        {child}
    </button>
}

Builtin Widgets

These widgets are available by default in JSX.

    box: Astal.Box

<box>Horizontal Box</box>

<box orientation={1}>Vertical Box</box>

button: Astal.Button

<button onClicked={self => print(self, "was clicked")}>
    Click Me
</button>

centerbox: Astal.CenterBox

<centerbox orientation={1}>
    <label vexpand valign={Gtk.Align.START} label="Start Widget" />
    <label label="Center Widget" />
    <label vexpand valign={Gtk.Align.END} label="End Widget" />
</box>

circularprogress: Astal.CircularProgress

<circularprogress value={.5} startAt={0.75} endAt={0.75}>
    <icon />
</circularprogress>

circularprogress {
    color: green;
    background-color: black;
    font-size: 6px;
    margin: 2px;
    min-width: 32px;
}

drawingarea: Gtk.DrawingArea

<drawingarea onDraw={drawingFunction} />

entry: Gtk.Entry

<window keymode={Astal.Keymode.ON_DEMAND}>
    <entry
        onChanged={self => print("text changed", self.text)}
        onActivate={self => print("enter", self.text)}
    />
</window>

eventbox: Astal.EventBox

<eventbox
    onClick={(_, event) => {
        print(event.modifier, event.button)
    }}
/>

icon: Astal.Icon

<icon icon={GLib.get_os_info("LOGO") || "missing-symbolic"} />

icon {
  font-size: 16px;
}

label: Astal.Label

<label label="hello" maxWidthChars={16} wrap />

levelbar: Astal.LevelBar

<levelbar value={0.5} widthRequest={200} />

overlay: Astal.Overlay

<overlay>
    <box heightRequest={40} widthRequest={40}>Child</box>
    <box className="overlay" valign={Gtk.Align.START} halign={Gtk.Align.END}>1</box>
</overlay>

revealer: Gtk.Revealer

<revealer
    setup={self => timeout(500, () => self.revealChild = true)}
    transitionType={Gtk.RevealerTransitionType.SLIDE_UP}>
    <label label="Child" />
</revealer>

scrollable: Astal.Scrollable

<scrollable heightRequest={100}>
    <box orientation={1}>
        {Array.from({ length: 10 }, (_, i) => (
            <button>{i}</button>
        ))}
    </box>
</scrollable>

slider: Astal.Slider

<slider widthRequest={100} onDragged={self => print("new value", self.value)} />

stack: Astal.Stack

<stack visibleChildName="child2">
    <label name="child1" label="child1" />
    <label name="child2" label="child2" />
</stack>

switch: Gtk.Switch

<switch onNotifyActive={self => print(self.active)} />

window: Astal.Window

    <window
        className="Bar"
        name="bar"
        namespace="bar"
        application={App}
        monitor={0}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        keymode={Astal.Keymode.ON_DEMAND}
    >
        <centerbox />
    </window>

Gtk4

The Gtk4 js library does not add any additional properties to the widgets, but it still has some additional properties that the constructors handle.

    type: string an arbitrary string that the Buildable interface uses.

    event handlers for EventControllers

type EventController<Self extends Gtk.Widget> = {
    onFocusEnter?: (self: Self) => void
    onFocusLeave?: (self: Self) => void

    onKeyPressed?: (self: Self, keyval: number, keycode: number, state: Gdk.ModifierType) => void
    onKeyReleased?: (self: Self, keyval: number, keycode: number, state: Gdk.ModifierType) => void
    onKeyModifier?: (self: Self, state: Gdk.ModifierType) => void

    onLegacy?: (self: Self, event: Gdk.Event) => void
    onButtonPressed?: (self: Self, state: Gdk.ButtonEvent) => void
    onButtonReleased?: (self: Self, state: Gdk.ButtonEvent) => void

    onHoverEnter?: (self: Self, x: number, y: number) => void
    onHoverLeave?: (self: Self) => void
    onMotion?: (self: Self, x: number, y: number) => void

    onScroll?: (self: Self, dx: number, dy: number) => void
    onScrollDecelerate?: (self: Self, vel_x: number, vel_y: number) => void
}

setup: (self): void setup function that runs after constructor

    // without `setup`
    function MyWidget() {
        const button = Widget.Button()
        // setup button
        return button
    }

    // using `setup`
    function MyWidget() {
        function setup(button: Widget.Button) {
            // setup button
        }

        return <buttons setup={setup} />
    }

There is also a hook utility

// without `hook`
function MyWidget() {
    const id = gobject.connect("signal", callback)
    const unsub = variable.subscribe(callback)

    return <box
        onDestroy={() => {
            gobject.disconnect(id)
            unsub()
        }}
    />
}

// with `hook`
import { hook } from "astal/gtk4"

function MyWidget() {
    return <box
        setup={(self) => {
            hook(self, gobject, "signal", callback)
            hook(self, variable, callback)
        }}
    />
}

How to use non builtin Gtk widgets

Using the astalify function you can create wrappers around widget constructors to make them behave like builtin widgets. The astalify function will do the followings:

    make gobject properties accept and consume Binding objects
    handle properties listed above
    set up signal handlers that are passed as props prefixed with on

import GObject from "gi://GObject"
import { Gtk, astalify, type ConstructProps } from "astal/gtk4"

type CalendarProps = ConstructProps<Gtk.Calendar, Gtk.Calendar.ConstructorProps>
const Calendar = astalify<Gtk.Calendar, Gtk.Calendar.ConstructorProps>(Gtk.Calendar, {
    // if it is a container widget, define children setter and getter here
    getChildren(self) { return [] },
    setChildren(self, children) {},
})

function MyWidget() {
    function setup(button: Gtk.Calendar) {

    }

    return <Calendar
        setup={setup}
        onDaySelected={(self) => {
            print(self.day)
        }}
    />
}

Builtin Widgets

These widgets are available by default in JSX.

    box: Astal.Box

<box>Horizontal Box</box>

<box orientation={1}>Vertical Box</box>

button: Gtk.Button

<button onClicked={self => print(self, "was clicked")}>
    Click Me
</button>

centerbox: Gtk.CenterBox

<centerbox orientation={1}>
    <label label="Start Widget" />
    <label label="Center Widget" />
    <label label="End Widget" />
</box>

entry: Gtk.Entry

<window keymode={Astal.Keymode.ON_DEMAND}>
    <entry
        onNotifyText={self => print("text changed", self.text)}
        onActivate={self => print("enter", self.text)}
    />
</window>

image: Gtk.Image

<image iconName={GLib.get_os_info("LOGO") || "missing-symbolic"} />

image {
  -gtk-icon-size: 16px;
}

label: Gtk.Label

<label label="hello" maxWidthChars={16} wrap />

levelbar: Gtk.LevelBar

<levelbar value={0.5} widthRequest={200} />

overlay: Gtk.Overlay

<overlay>
    <box heightRequest={40} widthRequest={40}>Child</box>
    <box type="overlay measure" >1</box>
    <box type="overlay clip" >2</box>
    <box type="overlay clip measure" >3</box>
</overlay>

revealer: Gtk.Revealer

<revealer
    setup={self => timeout(500, () => self.revealChild = true)}
    transitionType={Gtk.RevealerTransitionType.SLIDE_UP}>
    <label label="Child" />
</revealer>

slider: Astal.Slider

<slider widthRequest={100} onNotifyValue={self => print("new value", self.value)} />

stack: Gtk.Stack

<stack visibleChildName="child2">
    <label name="child1" label="child1" />
    <label name="child2" label="child2" />
</stack>

switch: Gtk.Switch

<switch onNotifyActive={self => print(self.active)} />

menubutton: Gtk.MenuButton and popover: Gtk.Popover

<menubutton>
  <label label="Button Content" />
  <popover>
    <label label="Popover Content" />
  </popover>
</menubutton>

window: Astal.Window

<window
    cssClasses={["Bar"]}
    name="bar"
    namespace="bar"
    application={App}
    monitor={0}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    keymode={Astal.Keymode.ON_DEMAND}
>
    <centerbox />
</window>

### Bindings
Binding

As mentioned before binding an object's state to another - so in most cases a Variable or a GObject.Object property to a widget's property - is done through the bind function which returns a Binding object.

Binding objects simply hold information about the source and how it should be transformed which Widget constructors can use to setup a connection between themselves and the source.

class Binding<Value> {
    private transformFn: (v: any) => unknown
    private emitter: Subscribable<Value> | Connectable
    private prop?: string

    as<T>(fn: (v: Value) => T): Binding<T>
    get(): Value
    subscribe(callback: (value: Value) => void): () => void
}

A Binding can be constructed from an object implementing the Subscribable interface (usually a Variable) or an object implementing the Connectable interface and one of its properties (usually a GObject.Object instance).

function bind<T>(obj: Subscribable<T>): Binding<T>

function bind<
    Obj extends Connectable,
    Prop extends keyof Obj,
>(obj: Obj, prop: Prop): Binding<Obj[Prop]>

Subscribable and Connectable interface

Any object implementing one of these interfaces can be used with bind.

interface Subscribable<T> {
    subscribe(callback: (value: T) => void): () => void
    get(): T
}

interface Connectable {
    connect(signal: string, callback: (...args: any[]) => unknown): number
    disconnect(id: number): void
}

Example Custom Subscribable

When binding the children of a box from an array, usually not all elements of the array changes each time, so it would make sense to not destroy the widget which represents the element.
varmap.ts

import { type Subscribable } from "astal/binding"
import { Gtk } from "astal"

export class VarMap<K, T = Gtk.Widget> implements Subscribable {
    #subs = new Set<(v: Array<[K, T]>) => void>()
    #map: Map<K, T>

    #notifiy() {
        const value = this.get()
        for (const sub of this.#subs) {
            sub(value)
        }
    }

    #delete(key: K) {
        const v = this.#map.get(key)

        if (v instanceof Gtk.Widget) {
            v.destroy()
        }

        this.#map.delete(key)
    }

    constructor(initial?: Iterable<[K, T]>) {
        this.#map = new Map(initial)
    }

    set(key: K, value: T) {
        this.#delete(key)
        this.#map.set(key, value)
        this.#notifiy()
    }

    delete(key: K) {
        this.#delete(key)
        this.#notifiy()
    }

    get() {
        return [...this.#map.entries()]
    }

    subscribe(callback: (v: Array<[K, T]>) => void) {
        this.#subs.add(callback)
        return () => this.#subs.delete(callback)
    }
}


And this VarMap<key, Widget> can be used as an alternative to Variable<Array<Widget>>.

function MappedBox() {
    const map = new VarMap([
        [1, <MyWidget id={id} />]
        [2, <MyWidget id={id} />]
    ])

    const conns = [
        gobject.connect("added", (_, id) => map.set(id, MyWidget({ id }))),
        gobject.connect("removed", (_, id) => map.delete(id, MyWidget({ id }))),
    ]

    return <box onDestroy={() => conns.map(id => gobject.disconnect(id))}>
        {bind(map).as(arr => arr.sort(([a], [b]) => a - b).map(([,w]) => w))}
    </box>
}

Example Custom Connectable

Astal provides decorator functions that make it easy to subclass gobjects, however you can read more about GObjects and subclassing on gjs.guide.

Objects coming from libraries usually have a singleton gobject you can access with .get_default().

Here is an example of a Brightness library by wrapping the brightnessctl cli utility and by monitoring /sys/class/backlight
brightness.ts

import GObject, { register, property } from "astal/gobject"
import { monitorFile, readFileAsync } from "astal/file"
import { exec, execAsync } from "astal/process"

const get = (args: string) => Number(exec(`brightnessctl ${args}`))
const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`)
const kbd = exec(`bash -c "ls -w1 /sys/class/leds | head -1"`)

@register({ GTypeName: "Brightness" })
export default class Brightness extends GObject.Object {
    static instance: Brightness
    static get_default() {
        if (!this.instance)
            this.instance = new Brightness()

        return this.instance
    }

    #kbdMax = get(`--device ${kbd} max`)
    #kbd = get(`--device ${kbd} get`)
    #screenMax = get("max")
    #screen = get("get") / (get("max") || 1)

    @property(Number)
    get kbd() { return this.#kbd }

    set kbd(value) {
        if (value < 0 || value > this.#kbdMax)
            return

        execAsync(`brightnessctl -d ${kbd} s ${value} -q`).then(() => {
            this.#kbd = value
            this.notify("kbd")
        })
    }

    @property(Number)
    get screen() { return this.#screen }

    set screen(percent) {
        if (percent < 0)
            percent = 0

        if (percent > 1)
            percent = 1

        execAsync(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
            this.#screen = percent
            this.notify("screen")
        })
    }

    constructor() {
        super()

        const screenPath = `/sys/class/backlight/${screen}/brightness`
        const kbdPath = `/sys/class/leds/${kbd}/brightness`

        monitorFile(screenPath, async f => {
            const v = await readFileAsync(f)
            this.#screen = Number(v) / this.#screenMax
            this.notify("screen")
        })

        monitorFile(kbdPath, async f => {
            const v = await readFileAsync(f)
            this.#kbd = Number(v) / this.#kbdMax
            this.notify("kbd")
        })
    }
}


And it can be used like any other library object.

function BrightnessSlider() {
    const brightness = Brightness.get_default()

    return <slider
        value={bind(brightness, "screen")}
        onDragged={({ value }) => brightness.screen = value}
    />
}

### Variables
Variable

import { Variable } from "astal"

Variable is just a simple object which holds a single value. It also has some shortcuts for hooking up subprocesses, intervals and other gobjects.

INFO

The Variable object imported from the "astal" package is not Astal.Variable.
Example Usage

const myvar = Variable("initial-value")

// whenever its value changes, callback will be executed
myvar.subscribe((value: string) => {
    console.log(value)
})

// settings its value
myvar.set("new value")

// getting its value
const value = myvar.get()

// binding them to widgets
Widget.Label({
    label: bind(myvar).as((value) => `transformed ${value}`),
    label: myvar((value) => `transformed ${value}`), // shorthand for the above
})

WARNING

Make sure to the transform functions you pass to :as() are pure. The .get() function can be called anytime by astal especially when deriving, so make sure there are no sideeffects.
Variable Composition

Using Variable.derive any Subscribable object can be composed.

const v1: Variable<number> = Variable(1)
const v2: Binding<number> = bind(obj, "prop")
const v3: Subscribable<number> = {
    get: () => 3,
    subscribe: () => () => {},
}

// first argument is a list of dependencies
// second argument is a transform function,
// where the parameters are the values of the dependencies in the order they were passed
const v4: Variable<number> = Variable.derive(
    [v1, v2, v3],
    (v1: number, v2: number, v3: number) => {
        return v1 * v2 * v3
    }
)

INFO

The types are only for demonstration purposes, you do not have to declare the type of a Variable, they will be inferred from their initial value.
Subprocess shorthands

Using .poll and .watch we can start subprocesses and capture their output. They can poll and watch at the same time, but they can only poll/watch once.

WARNING

The command parameter is passed to execAsync which means they are not executed in a shell environment, they do not expand ENV variables like $HOME, and they do not handle logical operators like && and ||.

If you want bash, run them with bash.

Variable("").poll(1000, ["bash", "-c", "command $VAR && command"])

const myVar = Variable(0)
    .poll(1000, "command", (out: string, prev: number) => parseInt(out))
    .poll(1000, ["bash", "-c", "command"], (out, prev) => parseInt(out))
    .poll(1000, (prev) => prev + 1)

const myVar = Variable(0)
    .watch("command", (out: string, prev: number) => parseInt(out))
    .watch(["bash", "-c", "command"], (out, prev) => parseInt(out))

You can temporarily stop them and restart them whenever.

myvar.stopWatch() // this kills the subprocess
myvar.stopPoll()

myvar.startListen() // launches the subprocess again
myvar.startPoll()

console.log(myvar.isListening())
console.log(myvar.isPolling())

Gobject connection shorthands

Using .observe you can connect gobject signals and capture their value.

const myvar = Variable("")
    .observe(obj1, "signal", () => "")
    .observe(obj2, "signal", () => "")

Dispose if no longer needed

This will stop the interval, force exit the subprocess and disconnect gobjects.

myVar.drop()

WARNING

Don't forget to drop derived variables or variables with either .poll, .watch or .observe when they are defined inside closures.

function MyWidget() {
    const myvar = Variable().poll()
    const derived = Variable.derive()

    return <box
        onDestroy={() => {
            myvar.drop()
            derived.drop()
        }}
    />
}