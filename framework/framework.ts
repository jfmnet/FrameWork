interface Window {
    JSZip: any;
    JSZipUtils: any;
    mdc: any;
    chrome: any;
}

interface Parameter {
    text?: any;
    value?: any;
    icon?: string;
    classes?: string[];
    onclick?: Function;
    ondrop?: Function;
    tag?: any;
    fileformat?: FILEFORMAT;
}

interface InputParam extends Parameter {
    id: any;
    name?: any;
    maxCount?: number ;
    rownum?: number;
    colsnum?: number;
    surfix?: any;
    prefix?: any;
}

enum Theme {
    LIGHT = 1,
    DARK = 2,
    SYSTEM = 3
}

enum FILEFORMAT {
    RAW = 1,
    TEXT = 2,
    ZIP = 3
}

enum INPUTTYPE {
    BUTTON = "button",
    CHECKBOX = "checkbox",
    COLOR = "color",
    DATE = "date",
    DATETIME = "datetime-local",
    EMAIL = "email",
    FILE = "file",
    HIDDEN = "hidden",
    IMAGE = "image",
    MONTH = "month",
    NUMBER = "number",
    PASSWORD = "password",
    RADIO = "radio",
    RANGE = "range",
    RESET = "reset",
    SEARCH = "search",
    SUBMIT = "submit",
    TELEPHONE = "tel",
    TEXT = "text",
    TIME = "time",
    URL = "url",
    WEEK = "week"
}

enum ORIENTATION {
    HORIZONTAL = 0,
    VERTICAL = 1
}

class FrameWork {
    //Default element tag
    element: string = "div";

    //HTML element of the control
    object: HTMLElement;

    //HTML element of the parent
    parent: HTMLElement;

    //List of child controls
    children: FrameWork[] = [];

    //Parent control
    parentControl: FrameWork;

    //List of classes
    classes: string[];

    //Onclick event
    onclick: Function;

    //Drag and drop event
    ondrop: Function;

    icon: string;
    text: string;
    tag: any;
    fileformat: FILEFORMAT = FILEFORMAT.RAW;

    data: any[] = [];

    enabled: boolean = true;
    readonly: boolean = false;

    static theme: Theme = Theme.SYSTEM;

    /**
     * Base constructor
     */
    constructor(param?: Parameter, classname?: string) {
        //Copy properties from parameter
        if (param) {
            for (let name in param) {
                this[name] = param[name];
            }
        }

        //Initialize classes
        this.classes = [];

        //Set classes from parameter
        if (param?.classes) {
            this.classes = param.classes;
        }

        //Add css class from parameter
        if (classname)
            this.classes.push(classname);
    }

    Show(parent?: any): void {
        this.object = document.createElement(this.element);

        for (let classname of this.classes)
            this.object.classList.add(classname);

        if (parent instanceof HTMLElement) {
            this.parent = parent;
            parent.appendChild(this.object);
        } else if (parent instanceof DocumentFragment) {
            parent.appendChild(this.object);
        }
        else if (parent instanceof FrameWork) {
            this.parent = parent.object;
            parent.object.appendChild(this.object);
        }
        else {
            this.parent = document.body;
            document.body.appendChild(this.object);
        }

        this.Refresh();
    }

    Refresh(): void {
        this.object.innerHTML = "";

        if (this.icon) {
            let icon = this.DisplayIcon(this.icon);
            this.object.appendChild(icon);
        }

        if (this.text) {
            let text = document.createElement("div");
            text.classList.add("text");
            text.innerHTML = this.text;
            this.object.append(text);
        }

        //Show children
        this.RenderChildren();

        //Initialize events
        this.Events();

        //Initialize drag and drop
        this.DragandDrop();
    }

    RenderChildren(): void {
        //Show children
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].Show(this.object);
        }

        this.RenderDataSource();
    };

    RenderDataSource(): void {
        let item: any;
        let input: FrameWork.Input;

        for (let data of this.data) {
            for (let name in data) {
                item = data[name];

                input = new FrameWork.Input({ text: item.text, value: item.value }, item.type);
                input.Show(this.object);
            }
        }
    }

    Clear(): void {
        this.object.innerHTML = "";
    }

    Add(object: FrameWork): FrameWork {
        //Add to the collections
        this.children.push(object);

        //Show if parents is already displayed
        if (this.object)
            object.Show(this.object);

        //Return the object
        return object;
    }

    AddDataSource(data: any): void {
        this.data.push(data);
    }

    Events(): void {
        if (this.onclick) {
            if (!this.readonly) {
                let self = this;

                this.object.onclick = function (e) {
                    e.stopPropagation();

                    if (self.enabled) {
                        if (self.onclick)
                            self.onclick(self);
                    }
                };
            }
        }
    };

    DragandDrop(): void {
        if (this.ondrop) {
            let self = this;

            this.object.addEventListener("dragover", function (e: DragEvent) {
                //Prevents default event from firing
                e.preventDefault();

                //Prevents firing of parent event handlers (prevents bubbling effect)
                e.stopPropagation();
            });

            this.object.addEventListener("dragenter", function (e: DragEvent) {
                //Prevents default event from firing
                e.preventDefault();

                //Prevents firing of parent event handlers (prevents bubbling effect)
                e.stopPropagation();
            });

            this.object.addEventListener("dragleave", function (e: DragEvent) {
            });

            this.object.addEventListener("drop", function (e: DragEvent) {
                var dataTransfer = e.dataTransfer;

                if (dataTransfer && dataTransfer.files.length) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (self.fileformat === FILEFORMAT.RAW) {
                        self.ondrop(dataTransfer.files);

                    } else {
                        // Use DataTransfer interface to access the file(s)
                        for (let i = 0; i < dataTransfer.files.length; i++) {

                            switch (self.fileformat) {
                                case FILEFORMAT.TEXT:
                                    var reader = new FileReader();
                                    reader.readAsText(dataTransfer.files[i]);

                                    reader.onload = function (readEvent) {
                                        self.ondrop(readEvent.target.result);
                                    };

                                    break;

                                case FILEFORMAT.ZIP:
                                    var zip = new window.JSZip();
                                    zip.loadAsync(dataTransfer.files[i])
                                        .then(function (zip: any) {
                                            zip.forEach(async (element: any) => {
                                                let content = await zip.file(element).async("string");
                                                self.ondrop(content);
                                            });
                                        }, function () {
                                            //Error
                                        });
                                    break;
                            }
                        }
                    }
                }
            });
        }
    }

    DisplayIcon(icon: string): HTMLElement {
        if (icon.includes(".jpg") || icon.includes(".png") || icon.includes(".b64")) {
            let element: HTMLImageElement;
            element = document.createElement("img");
            element.classList.add("icon");
            element.src = icon;
            return element;

        } else {
            let element: HTMLElement;
            element = document.createElement("i");
            element.classList.add("icon");
            element.classList.add("mdi");
            element.classList.add("mdi-" + icon);
            return element;
        }
    };

    static Get(url: string, resolve: Function, reject?: Function) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (resolve)
                    resolve(this.responseText);
            } else {
                if (reject)
                    resolve(this.responseText);
            }
        };

        xhttp.send();
    };

    static GetJSON(url: string, resolve: Function, reject?: Function) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (resolve)
                    resolve(JSON.parse(this.responseText));
            } else {
                if (reject)
                    resolve(this.responseText);
            }
        };

        xhttp.send();
    };

    static GetXML(url: string, resolve: Function, reject?: Function) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Content-type', 'text/xml; charset=utf-8');

        if (xhttp.overrideMimeType) {
            xhttp.overrideMimeType('text/xml');
        }

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (resolve)
                    resolve(this.responseXML);
            } else {
                if (reject)
                    resolve(this.responseText);
            }
        };

        xhttp.send();
    };
}

namespace FrameWork {
    //Containers

    export class Container extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "container");
        }
    }

    export class Expander extends FrameWork {
        private isExpanded: boolean = true;
        private header: HTMLElement;
        private headericon: HTMLElement;

        constructor(param?: Parameter) {
            super(param, "expander");

            this.icon = "chevron-down";
        }

        Refresh(): void {
            this.Clear();

            if (this.isExpanded)
                this.object.classList.add("expanded");

            this.header = document.createElement("div");
            this.header.classList.add("header");
            this.object.append(this.header);

            let text = document.createElement("div");
            text.classList.add("text");
            text.innerHTML = this.text;
            this.header.append(text);

            this.headericon = this.DisplayIcon(this.icon);
            this.header.appendChild(this.headericon);

            //Show children
            this.RenderChildren();

            //Initialize events
            this.Events();
        }

        Events(): void {
            let self = this;

            this.header.onclick = function (e) {
                e.stopPropagation();

                if (self.children.length) {
                    self.isExpanded = !self.isExpanded;
                    self.Expand(self.isExpanded);
                }
            };

        };

        Expand(value: boolean): void {
            if (value) {
                this.object.classList.add("expanded");
                this.headericon.classList.remove("mdi-chevron-up");
                this.headericon.classList.add("mdi-chevron-down");
            } else {
                this.object.classList.remove("expanded");
                this.headericon.classList.remove("mdi-chevron-down");
                this.headericon.classList.add("mdi-chevron-up");
            }
        }

    }

    export class ScrollContainer extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "scroll-container");
        }
    }

    export class SplitContainer extends FrameWork {
        orientation = ORIENTATION.HORIZONTAL;
        splittersize: number = 4;
        size: number[] = [];

        panel1: HTMLElement;
        panel2: HTMLElement;
        divider: HTMLElement;

        constructor(param?: Parameter) {
            super(param, "split-container");
        }

        Add(object: FrameWork): FrameWork {
            if (this.children.length != 0) {
                this.divider = document.createElement("div");
                this.divider.classList.add("divider");
                this.object.appendChild(this.divider);
            }

            //Add to the collections
            this.children.push(object);

            //Show if parents is already displayed
            if (this.object) {
                object.Show(this.object);

                if (this.children.length === 2) {
                    this.panel1 = this.children[0] ? this.children[0].object : undefined;
                    this.panel2 = this.children[1] ? this.children[1].object : undefined;
                    this.Resize();
                    this.Events();
                }
            }

            //Return the object
            return object;
        }

        RenderChildren(): void {
            //Show children
            for (let i = 0; i < this.children.length; i++) {
                if (i != 0) {
                    let divider = document.createElement("div");
                    divider.classList.add("divider");
                    this.object.appendChild(divider);
                }

                this.children[i].Show(this.object);
            }

            if (this.children.length === 2) {
                this.panel1 = this.children[0].object;
                this.panel2 = this.children[1].object;
                this.Resize();
            }
        }

        Events(): void {
            let self = this;

            if (this.divider) {
                this.divider.onmousedown = function (e) {
                    self.divider.style.zIndex = "1";
                    document.body.addEventListener("mousemove", MouseMove);
                };

                this.divider.onmouseup = function (e) {
                    self.divider.style.zIndex = "";
                    document.body.removeEventListener("mousemove", MouseMove);
                };
            }

            function MouseMove(e: MouseEvent) {
                if (self.orientation === ORIENTATION.VERTICAL)
                    self.divider.style.top = (e.clientY - self.parent.offsetTop) + "px";
                else
                    self.divider.style.left = (e.clientX - self.parent.offsetLeft) + "px";

                if (self.orientation === ORIENTATION.VERTICAL)
                    self.size = [e.clientY - self.parent.offsetTop - self.splittersize / 2];
                else
                    self.size = [e.clientX - self.parent.offsetLeft - self.splittersize / 2];

                self.Resize();
            }
        }

        Resize(): void {
            let width = this.parent.clientWidth;
            let height = this.parent.clientHeight;
            let gap = this.splittersize / 2;

            if (this.size.length) {
                if (this.orientation === ORIENTATION.VERTICAL) {
                    //Vertical
                    if (this.size[0] !== undefined) {
                        this.panel1.style.top = "0";
                        this.panel1.style.height = this.size[0] + "px";
                        this.panel1.style.left = "0";
                        this.panel1.style.right = "0";

                        this.panel2.style.bottom = "0";
                        this.panel2.style.top = (this.size[0] + this.splittersize) + "px";
                        this.panel2.style.left = "0";
                        this.panel2.style.right = "0";
                        this.panel2.style.height = "unset";

                        if (this.splittersize) {
                            this.divider.style.top = this.size[0] + "px";
                            this.divider.style.height = this.splittersize + "px";
                            this.divider.style.left = "0";
                            this.divider.style.right = "0";
                        }

                    } else if (this.size[1] !== undefined) {
                        this.panel1.style.top = "0";
                        this.panel1.style.height = this.size[1] + "px";
                        this.panel1.style.left = "0";
                        this.panel1.style.right = "0";

                        this.panel2.style.bottom = "0";
                        this.panel2.style.top = (this.size[1] + this.splittersize) + "px";
                        this.panel2.style.left = "0";
                        this.panel2.style.right = "0";

                        if (this.splittersize) {
                            this.divider.style.bottom = this.size[1] + "px";
                            this.divider.style.height = this.splittersize + "px";
                            this.divider.style.left = "0";
                            this.divider.style.right = "0";
                        }
                    }

                    this.divider.style.cursor = "n-resize";

                } else {
                    //Horizontal
                    if (this.size[0] !== undefined) {
                        this.panel1.style.left = "0";
                        this.panel1.style.width = this.size[0] + "px";
                        this.panel1.style.top = "0";
                        this.panel1.style.bottom = "0";

                        this.panel2.style.right = "0";
                        this.panel2.style.left = (this.size[0] + this.splittersize) + "px";
                        this.panel2.style.top = "0";
                        this.panel2.style.bottom = "0";
                        this.panel2.style.width = "unset";

                        if (this.splittersize) {
                            this.divider.style.left = this.size[0] + "px";
                            this.divider.style.width = this.splittersize + "px";
                            this.divider.style.top = "0";
                            this.divider.style.bottom = "0";
                        }

                    } else if (this.size[1] !== undefined) {
                        this.panel1.style.left = "0";
                        this.panel1.style.right = (this.size[1] + this.splittersize) + "px";
                        this.panel1.style.top = "0";
                        this.panel1.style.bottom = "0";

                        this.panel2.style.right = "0";
                        this.panel2.style.width = (this.size[1]) + "px";
                        this.panel2.style.top = "0";
                        this.panel2.style.bottom = "0";

                        if (this.splittersize) {
                            this.divider.style.right = this.size[1] + "px";
                            this.divider.style.width = this.splittersize + "px";
                            this.divider.style.top = "0";
                            this.divider.style.bottom = "0";
                        }

                        this.divider.style.cursor = "e-resize";
                    }
                }
            } else {
                if (this.orientation === ORIENTATION.VERTICAL) {
                    this.panel1.style.top = "0";
                    this.panel1.style.height = "calc(50% - " + gap + "px)";
                    this.panel1.style.left = "0";
                    this.panel1.style.right = "0";

                    this.panel2.style.bottom = "0";
                    this.panel2.style.height = "calc(50% - " + gap + "px)";
                    this.panel2.style.left = "0";
                    this.panel2.style.right = "0";
                    this.panel2.style.top = "unset";

                    if (this.splittersize) {
                        this.divider.style.top = "calc(50% - " + gap + "px)";
                        this.divider.style.height = this.splittersize + "px";
                        this.divider.style.left = "0";
                        this.divider.style.right = "0";
                    }

                    this.divider.style.cursor = "n-resize";

                } else {
                    this.panel1.style.left = "0";
                    this.panel1.style.width = "calc(50% - " + gap + "px)";
                    this.panel1.style.top = "0";
                    this.panel1.style.bottom = "0";

                    this.panel2.style.right = "0";
                    this.panel2.style.width = "calc(50% - " + gap + "px)";
                    this.panel2.style.top = "0";
                    this.panel2.style.bottom = "0";

                    if (this.splittersize) {
                        this.divider.style.left = "calc(50% - " + gap + "px)";
                        this.divider.style.width = this.splittersize + "px";
                        this.divider.style.top = "0";
                        this.divider.style.bottom = "0";
                    }

                    this.divider.style.cursor = "e-resize";
                }
            }
        }
    }

    export class TreeContainer extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "tree-container");
        }

        RenderChildren(): void {
            //Show children
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }
        };
    }

    export class MenuContainer extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "menu-container");
        }
    }

    export class ToolbarContainer extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "toolbar-container");
        }
    }

    export class TabContainer extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "tab-container");
        }
    }


    //Controls

    export class Menu extends FrameWork {
        body: HTMLElement;

        constructor(param?: Parameter) {
            super(param, "menu");
        }

        Refresh(): void {
            this.object.innerHTML = "";

            if (this.icon) {
                let icon = this.DisplayIcon(this.icon);
                this.object.appendChild(icon);
            }

            if (this.text) {
                let text = document.createElement("div");
                text.classList.add("text");
                text.innerHTML = this.text;
                this.object.append(text);
            }

            this.body = document.createElement("div");
            this.body.classList.add("menu-group");
            this.object.appendChild(this.body);

            //Show children
            this.RenderChildren();

            //Initialize events
            this.Events();

            //Initialize drag and drop
            this.DragandDrop();
        }

        RenderChildren(): void {
            //Show children
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.body);
            }
        };
    }

    export class Toolbar extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "toolbar");
        }
    }

    export class Tab extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "tab");
        }
    }

    export class TreeNode extends FrameWork {
        private isExpanded: boolean = false;
        private treeIcon: HTMLElement;
        private treeText: HTMLElement;

        level: number = 1;

        constructor(param?: Parameter) {
            super(param, "tree-node");
            this.icon = "menu-right";
        }

        Refresh(): void {
            this.object.innerHTML = "";
            this.object.classList.add("tree-node-level-" + this.level);

            let header = document.createElement("div");
            header.classList.add("tree-header");
            this.object.append(header);

            if (this.children.length)
                this.treeIcon = this.DisplayIcon(this.icon);
            else
                this.treeIcon = this.DisplayIcon("circle-small");

            header.appendChild(this.treeIcon);

            let icon = this.DisplayIcon("book-information-variant");
            header.appendChild(icon);

            if (this.text) {
                this.treeText = document.createElement("div");
                this.treeText.classList.add("text");
                this.treeText.innerHTML = this.text;
                header.append(this.treeText);
            }

            //Initialize events
            this.Events();

            //Show children
            this.RenderChildren();
        }

        RenderChildren(): void {
            //Show children
            for (let i = 0; i < this.children.length; i++) {
                let node = this.children[i] as TreeNode;
                node.level = this.level + 1;
                node.Show(this.object);
            }
        };

        Events(): void {
            if (this.treeIcon) {
                let self = this;

                this.treeIcon.onclick = function (e) {
                    e.stopPropagation();

                    if (self.children.length) {
                        self.isExpanded = !self.isExpanded;
                        self.Expand(self.isExpanded);
                    }
                };

                this.treeText.onclick = function (e) {
                    e.stopPropagation();

                    let selected = document.body.querySelector(".tree-node.selected");

                    if (selected)
                        selected.classList.remove("selected");

                    self.object.classList.add("selected");

                    if (self.onclick)
                        self.onclick(self);
                };
            }
        };

        Expand(value: boolean): void {
            if (value) {
                this.object.classList.add("expanded");
                this.treeIcon.classList.remove("mdi-menu-right");
                this.treeIcon.classList.add("mdi-menu-down");
            } else {
                this.object.classList.remove("expanded");
                this.treeIcon.classList.remove("mdi-menu-down");
                this.treeIcon.classList.add("mdi-menu-right");
            }
        }
    }

    //Inputs

    export class Input extends FrameWork {
        protected input: HTMLInputElement;
        type: INPUTTYPE;
        name: string;
        value: any;
        onchange: Function;

        constructor(param?: Parameter, type: INPUTTYPE = INPUTTYPE.TEXT) {
            super(param, "input");
            this.classes.push("inline");
            this.classes.push("textbox");

            this.type = type;
        }

        Refresh(): void {
            this.object.innerHTML = "";

            if (this.text) {
                let text = document.createElement("div");
                text.innerText = this.text;
                this.object.appendChild(text);

                let input = document.createElement("input");
                input.type = this.type;
                this.input = input;

                switch (this.type) {
                    case "checkbox":
                        if (this.value !== undefined)
                            input.checked = this.value;
                        break;

                    default:
                        if (this.value !== undefined)
                            input.value = this.value;
                        break;
                }

                if (this.name !== undefined)
                    input.name = this.name;

                this.object.appendChild(input);

                if (this.readonly)
                    input.setAttribute("disabled", "disabled");

            } else {
                let input = document.createElement("input");
                input.type = this.type;
                this.input = input;

                if (this.value !== undefined)
                    input.value = this.value;

                if (this.name !== undefined)
                    input.name = this.name;

                this.object.appendChild(input);

                if (this.readonly)
                    input.setAttribute("disabled", "disabled");
            }

            this.Events();
        };

        Events(): void {
            if (!this.readonly) {
                let input = this.object.querySelector("input");
                let self = this;

                switch (this.type) {
                    case "submit":
                        input.addEventListener('click', function (e) {
                            e.preventDefault();
                            if (self.onclick)
                                self.onclick();
                        });
                        break;

                    case "checkbox":
                        input.addEventListener('change', function (e) {
                            e.preventDefault();

                            self.value = this.checked;

                            if (self.onchange)
                                self.onchange(self);
                        });
                        break;

                    default:
                        input.addEventListener('change', function (e) {
                            e.preventDefault();
                            self.value = this.value;
                        });

                        input.addEventListener('input', function () {
                            self.value = this.value;
                        });

                        input.addEventListener('keydown', function (e) {
                            if (e.key === "Enter") {
                                if (self.onchange)
                                    self.onchange(self);
                            }
                        });
                        break;
                }
            }
        };

        Focus(): void {
            this.input.value = "";
            this.input.focus();
        }
    }

    export abstract class InputBase {
        abstract type: INPUTTYPE;
        text: string;
    }

    export class InputString extends InputBase {
        type = INPUTTYPE.TEXT;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputNumber extends InputBase {
        type = INPUTTYPE.NUMBER;
        value: number;

        constructor(text: string, value: number) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputCheckBox extends InputBase {
        type = INPUTTYPE.CHECKBOX;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputColor extends InputBase {
        type = INPUTTYPE.COLOR;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputDate extends InputBase {
        type = INPUTTYPE.DATE;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputDateTime extends InputBase {
        type = INPUTTYPE.DATETIME;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputEmail extends InputBase {
        type = INPUTTYPE.EMAIL;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputHidden extends InputBase {
        type = INPUTTYPE.HIDDEN;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputImage extends InputBase {
        type = INPUTTYPE.IMAGE;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputMonth extends InputBase {
        type = INPUTTYPE.MONTH;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputPassword extends InputBase {
        type = INPUTTYPE.PASSWORD;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputRadio extends InputBase {
        type = INPUTTYPE.RADIO;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputRange extends InputBase {
        type = INPUTTYPE.RANGE;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputReset extends InputBase {
        type = INPUTTYPE.RESET;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputSearch extends InputBase {
        type = INPUTTYPE.SEARCH;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputSubmit extends InputBase {
        type = INPUTTYPE.SUBMIT;
        value: string;
        onclick: Function;

        constructor(text: string, value: string, onclick?: Function) {
            super();
            this.text = text;
            this.value = value;
            this.onclick = onclick;
        }
    }

    export class InputTelehone extends InputBase {
        type = INPUTTYPE.TELEPHONE;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputTime extends InputBase {
        type = INPUTTYPE.TIME;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputUrl extends InputBase {
        type = INPUTTYPE.URL;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputWeek extends InputBase {
        type = INPUTTYPE.WEEK;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputFile extends InputBase {
        type = INPUTTYPE.FILE;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputButton extends InputBase {
        type = INPUTTYPE.BUTTON;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }
}

namespace MaterialDesign2 {
    export enum ButtonType {
        NONE = "",
        OUTLINED = "mdc-button--outlined",
        RAISED = "mdc-button--raised",
        APPBAR = "material-icons mdc-top-app-bar__action-item mdc-icon-button"
    }

    export enum FloatButtonType {
        REGULAR = "",
        MINI = "mdc-fab--mini",
        RETANGULAR = "mdc-fab--extended"
    }

    export enum TextFieldType {
        OUTLINENOLABEL,
        FILLEDNOLABEL,
        OUTLINE,
        FILLED,
        PRESUFFIX
    }

    export enum InputType {
        OUTLINE = "mdc-text-field--outlined",
        FILLED = "mdc-text-field--filled"
    }

    export class Button extends FrameWork {
        type: ButtonType = ButtonType.NONE;

        constructor(param?: Parameter) {
            super(param, "mdc-button");
            this.element = "button";
        }

        Refresh(): void {
            this.Clear();

            let classes = this.type.split(" ");

            if (this.type === ButtonType.APPBAR)
                this.object.classList.remove("mdc-button");

            for (let c of classes)
                if (c.trim() !== "")
                    this.object.classList.add(c.trim());

            if (this.icon) {
                let html = `
                    <div class="mdc-button__ripple"></div>
                    <i class="material-icons mdc-button__icon" aria-hidden="true">${this.icon}</i>
                    <span class="mdc-button__label">${this.text}</span>
                `;

                this.object.innerHTML = html;
            } else {
                let html = `
                    <div class="mdc-button__ripple"></div>
                    <span class="mdc-button__label">${this.text}</span>`;

                this.object.innerHTML = html;
            }

            if (this.type !== ButtonType.APPBAR)
                window.mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));

            this.Events();
        }
    }

    export class Anchor extends FrameWork {
        type: ButtonType = ButtonType.NONE;
        link: string;
        constructor(param?: Parameter) {
            super(param, "mdc-list-item");
            this.element = "a";
        }

        Refresh(): void {
            this.Clear();
            this.object.setAttribute('href', this.link == undefined ? "#" : this.link);
            let html = `<span class="mdc-list-item__ripple"></span>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">${this.icon}</i>
            <span class="mdc-list-item__text">${this.text}</span>`;
            this.object.innerHTML = html;
            this.Events();
        }
    }

    export class FloatingButton extends FrameWork {
        type: FloatButtonType = FloatButtonType.REGULAR;
        constructor(param?: Parameter) {
            super(param, "button");
        }
        Refresh(): void {
            this.Clear();
            let html;
            if (this.icon && this.text) {
                html = `
                    <button class="mdc-fab ${this.type} ">   
                        <div class="mdc-fab__ripple"></div>                      
                        <span class="mdc-fab__icon material-icons">${this.icon}</span>
                        <span class="mdc-fab__label">${this.text}</span>
                    </button>`;
            } else if (this.icon) {
                html = `
                    <button class="mdc-fab ${this.type}" aria-label="${this.icon}" >
                        <div class="mdc-fab__ripple"></div>
                        <span class="mdc-fab__icon material-icons">${this.icon}</span>
                    </button>`;
            } else if (this.text) {
                html = `
                    <button class="mdc-fab ${this.type}">
                        <div class="mdc-fab__ripple"></div>
                        <span class="mdc-fab__label">${this.text}</span>
                    </button>
                 `;
            } else {
                html = `
                    <div class="mdc-touch-target-wrapper">
                        <button class="mdc-fab mdc-fab--mini mdc-fab--touch">
                            <div class="mdc-fab__ripple"></div>
                            <span class="material-icons mdc-fab__icon">add</span>
                            <div class="mdc-fab__touch"></div>
                        </button>
                    </div>
                    `;
            }
            this.object.innerHTML = html;
            this.RenderChildren();
            this.Events();
        }
    }

    export class CheckBox extends FrameWork {
        id: string;
        value: any;

        constructor(param?: InputParam) {
            super(param, "check");
            this.id = param.id;
            this.value = param.value;
        }
        Refresh(): void {
            this.Clear();
                let html = `
                <div class="mdc-form-field">
                    <div class="mdc-checkbox">
                        <input type="checkbox" class="mdc-checkbox__native-control" id="${this.id}" value="${this.value}"/>
                        <div class="mdc-checkbox__background">
                            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                            <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                            </svg>
                            <div class="mdc-checkbox__mixedmark">
                            </div>
                        </div>
                        <div class="mdc-checkbox__ripple">
                        </div>
                    </div>
                    <label for="${this.id}">${this.text}</label>
                </div>
                `;
            this.object.innerHTML = html;
            //this.RenderChildren();
        }
    }    

    export class TextField extends FrameWork {
       id: string;
       type: TextFieldType = TextFieldType.OUTLINE;
       prefix: string ;
       surfix: string ;

        constructor(param?: InputParam) {
            super(param, "textField");
            this.id = param.id;
            this.prefix = param.prefix ?? "$";
            this.surfix = param.surfix ?? ".00";
        }

        Refresh(): void {
            this.Clear();
            let html;           
        
            if(this.type == TextFieldType.FILLED){
                html = `
                <label class="mdc-text-field mdc-text-field--filled ${this.id}">
                    <span class="mdc-text-field__ripple"></span>
                    <span class="mdc-floating-label" id="${this.id}">${this.text}</span>
                    <input class="mdc-text-field__input" type="text" aria-labelledby="${this.id}">
                    <span class="mdc-line-ripple"></span>
                </label>
                `;
            }else if(this.type == TextFieldType.OUTLINE){
                html = `
                <label class="mdc-text-field mdc-text-field--outlined ${this.id}">
                    <span class="mdc-notched-outline">
                        <span class="mdc-notched-outline__leading"></span>
                        <span class="mdc-notched-outline__notch">
                            <span class="mdc-floating-label" id="${this.id}">${this.text}</span>
                        </span>
                        <span class="mdc-notched-outline__trailing"></span>
                    </span>
                    <input type="text" class="mdc-text-field__input" aria-labelledby="${this.id}">
                </label>
                `;
            }else if(this.type == TextFieldType.FILLEDNOLABEL){
                html = `
                <label class="mdc-text-field mdc-text-field--filled mdc-text-field--no-label ${this.id}">
                    <span class="mdc-text-field__ripple"></span>
                    <input class="mdc-text-field__input" type="text" placeholder="${this.text}" aria-label="Label">
                    <span class="mdc-line-ripple"></span>
                </label>
                `;          
            }else if(this.type == TextFieldType.OUTLINENOLABEL){
                html = `
                <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--no-label ${this.id}">
                    <span class="mdc-notched-outline">
                    <span class="mdc-notched-outline__leading"></span>
                    <span class="mdc-notched-outline__trailing"></span>
                    </span>
                    <input class="mdc-text-field__input" type="text"  placeholder="${this.text}" aria-label="Label">
                </label>
                `;
            }else if (this.type == TextFieldType.PRESUFFIX){
                html = `
                <label class="mdc-text-field mdc-text-field--filled ${this.id}">
                    <span class="mdc-text-field__ripple"></span>
                    <span class="mdc-floating-label" id="my-label-id">Currency Value</span>
                    <span class="mdc-text-field__affix mdc-text-field__affix--prefix">${this.prefix}</span>
                    <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">
                    <span class="mdc-text-field__affix mdc-text-field__affix--suffix">${this.surfix}</span>
                    <span class="mdc-line-ripple"></span>
                </label>
                `;
            }

            this.object.innerHTML = html;       
            const text = new window.mdc.textField.MDCTextField(this.object.querySelector(`.${this.id}`));
            this.RenderChildren();
        }

        RenderChildren(): void {
            //Show children
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }
            this.RenderDataSource();
        };
    }

    export class TextArea extends FrameWork {
        id: string;     
        type: InputType = InputType.OUTLINE; 
        maxCount: number;
        rownum: number;
        colsnum: number;
 
        constructor(param?: InputParam) {
            super(param, "textArea");
            this.id = param.id;
            this.maxCount = param.maxCount ?? 100;
            this.rownum = param.rownum ?? 4;
            this.colsnum = param.colsnum ?? 30;
        }
 
         Refresh(): void {
             this.Clear();
             let html;
             if(this.type == InputType.FILLED){
                html = `
                    <label class="mdc-text-field ${this.type} mdc-text-field--textarea mdc-text-field--with-internal-counter ${this.id}">
                        <span class="mdc-notched-filled">
                            <span class="mdc-notched-filled__leading"></span>
                            <span class="mdc-notched-filled__notch">
                            <span class="mdc-floating-label" id="${this.id}">${this.text}</span>
                            </span>
                            <span class="mdc-notched-filled__trailing"></span>
                        </span>
                        <span class="mdc-text-field__resizer">
                            <textarea class="mdc-text-field__input" aria-labelledby="${this.id}" rows="${this.rownum}" cols="${this.colsnum}" maxlength="${this.maxCount}"></textarea>
                            <span class="mdc-text-field-character-counter">0 / ${this.maxCount}</span>
                        </span>
                    </label>
                `;
             }else if (this.type == InputType.OUTLINE){
                html = `
                <label class="mdc-text-field ${this.type} mdc-text-field--textarea mdc-text-field--with-internal-counter ${this.id}">
                    <span class="mdc-notched-outline">
                        <span class="mdc-notched-outline__leading"></span>
                        <span class="mdc-notched-outline__notch">
                        <span class="mdc-floating-label" id="${this.id}">${this.text}</span>
                        </span>
                        <span class="mdc-notched-outline__trailing"></span>
                    </span>
                    <span class="mdc-text-field__resizer">
                        <textarea class="mdc-text-field__input" aria-labelledby="${this.id}" rows="${this.rownum}" cols="${this.colsnum}" maxlength="${this.maxCount}"></textarea>
                        <span class="mdc-text-field-character-counter">0 / ${this.maxCount}</span>
                    </span>
                </label>
                `;
             }      
             this.object.innerHTML = html;       
             new window.mdc.textField.MDCTextField(document.querySelector(`.${this.id}`));
            //  new window.mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
             this.RenderChildren();
         }
 
         RenderChildren(): void {
             //Show children
             for (let i = 0; i < this.children.length; i++) {
                 this.children[i].Show(this.object);
             }
             this.RenderDataSource();
         };
    }

    export class Password extends FrameWork {
        id: string;
        type: InputType = InputType.OUTLINE;
 
         constructor(param?: InputParam) {
             super(param, "password");
             this.id = param.id;
         }
 
         Refresh(): void {
             this.Clear();
             let html;
             if(this.type == InputType.FILLED){
                html = `
                <label class="mdc-text-field mdc-text-field--filled  ${this.id}">
                    <span class="mdc-text-field__ripple"></span>
                    <span class="mdc-floating-label" id="${this.id}">${this.text}</span>
                    <input class="mdc-text-field__input" type="password" aria-labelledby="${this.id}" required minlength="8">
                    <span class="mdc-line-ripple"></span>
                </label>
             `;
             }else if(this.type == InputType.OUTLINE){
                html =`
                <label class="mdc-text-field mdc-text-field--outlined  ${this.id}">
                    <span class="mdc-notched-outline">
                    <span class="mdc-notched-outline__leading"></span>
                    <span class="mdc-notched-outline__notch">
                        <span class="mdc-floating-label" id="${this.id}">${this.text}</span>
                    </span>
                    <span class="mdc-notched-outline__trailing"></span>
                    </span>
                    <input class="mdc-text-field__input" type="password" aria-labelledby="${this.id}" required minlength="8" >
                </label>
                `;
             }           
             
             this.object.innerHTML = html;  
             new window.mdc.textField.MDCTextField(document.querySelector(`.${this.id}`));           
             this.RenderChildren();
         }
 
         RenderChildren(): void {
             //Show children
             for (let i = 0; i < this.children.length; i++) {
                 this.children[i].Show(this.object);
             } 
             this.RenderDataSource();
         };
    }

    export class Radio extends FrameWork {
        id: any;
        name: any;

        constructor(param?: InputParam) {
            super(param, "radio");
            this.id = param.id;
            this.name = param.name;
        }
        Refresh(): void {
            this.Clear(); 

        let html = `
            <div class="mdc-form-field">
                <div class="mdc-radio">
                    <input class="mdc-radio__native-control" type="radio" id="${this.id}" name="${this.name}">
                    <div class="mdc-radio__background">
                        <div class="mdc-radio__outer-circle"></div>
                        <div class="mdc-radio__inner-circle"></div>
                    </div>
                    <div class="mdc-radio__ripple"></div>
                </div>
                <label for="${this.id}">${this.text}</label>    
            </div>
        `;           
             
            this.object.innerHTML = html;
            const radio = new window.mdc.radio.MDCRadio(document.querySelector('.mdc-radio'));
            // const formField = new window.mdc.formField.MDCFormField(document.querySelector('.mdc-form-field'));
            // formField.input = radio;
            this.RenderChildren();
            this.Events();
        }
    }

    export class Dialogs extends FrameWork {
        dialog: any;
        showCancel: boolean = true;
        showOk: boolean = true;
        labelOk: string = "ok";

        constructor(param?: Parameter) {
            super(param, "Dialogs");
        }
          
        Refresh(): void {
            this.Clear();
            let html =     
            `<div class="mdc-dialog">
            <div class="mdc-dialog__container">
            <div class="mdc-dialog__surface" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title"
               aria-describedby="my-dialog-content">
               <div class="mdc-dialog__content" id="my-dialog-content">
                    Discard draft?
               </div>
               <div class="mdc-dialog__actions">`;
            if(this.showCancel){
                html += 
                `<button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                <div class="mdc-button__ripple"></div>
                <span class="mdc-button__label">Cancel</span>
                </button>`;
            }

            if(this.showOk){
                html += 
                `<button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">
                    <div class="mdc-button__ripple"></div>
                    <span class="mdc-button__label">${this.labelOk}</span>
                    </button>`;
            }

            html +=            
            `</div>
             </div>
             </div>
             <div class="mdc-dialog__scrim"></div>
             </div>`;
           console.log(html);
            
            this.object.innerHTML = html;
            this.RenderChildren();
            const dialog = new window.mdc.dialog.MDCDialog((document.querySelector('.mdc-dialog')));
            dialog.open();
           
            dialog.listen('MDCDialog:closing', function () {
                console.log("colse");
                //document.body.removeChild(document.querySelector(".mdc-dialog")); 
            });
            
        }

        RenderChildren(): void {
            //Show children
            console.log("render ....");
            console.log();

            for (let i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object.querySelector('.mdc-dialog__content'));
            }
            this.RenderDataSource();
        };
    }

    export class Cards extends FrameWork {
        contents: HTMLElement;
        width: number = 350;
        height: number = 350;
        backgroundImage: string;
        title: string;
        description: string;

        constructor(param?: Parameter) {
            super(param, "card");
        }

        Refresh(): void {
            this.Clear();

            let html = `
            <div class="mdc-card ">
                <div class="mdc-card__primary-action" tabindex="0">
                    <div class="mdc-card__media mdc-card__media--square  my-card__media_pic">                   
                    </div>                    
                    <div class="mdc-card__ripple"></div>
                </div>
                <div class="mdc-card-title">${this.title ?? ""}</div>
                <div class="mdc-card-content">${this.description ?? ""}</div>
                <div class="mdc-card__actions">
                    <div class="mdc-card__action-buttons">
                    <button class="mdc-button mdc-card__action mdc-card__action--button">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label">OK</span>
                    </button>
                    <button class="mdc-button mdc-card__action mdc-card__action--button">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label">Cancel</span>
                    </button>      
                    </div>                  
                </div>
            </div>
            `;
            this.object.setAttribute("style", `width:${this.width}px;height:${this.height}px`)

            this.object.innerHTML = html;
            this.contents = this.object.querySelector(".my-card__media_pic");
            this.contents.style.backgroundImage = `url('${this.backgroundImage}')`;                    
            this.RenderChildren();
        }

        RenderChildren(): void {
            //Show children
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }

            this.RenderDataSource();
        };
    }    

    export class AppBar extends FrameWork {
        contents: HTMLElement;
        buttons: Button[] = [];

        constructor(param?: Parameter) {
            super(param, "appbar");
        }

        Refresh(): void {
            this.Clear();
            
            let html = `
                <header class="mdc-top-app-bar">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <button id="app-action" class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">menu</button>
                        <span class="mdc-top-app-bar__title">${this.text}</span>
                    </section>
                    <section class="appbar-buttons mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    </section>
                </div>
                </header>
                <main class="appbar-body mdc-top-app-bar--fixed-adjust">
                </main>
            `;

            this.object.innerHTML = html;
            this.RenderChildren();
        }

        RenderChildren(): void {
            //Show children
            let body = document.querySelector(".appbar-body");

            for (let i = 0; i < this.children.length; i++) {
                if(this.children[i].classes.indexOf('navDrawer') != -1){
                    this.children[i].Show();
                }else{
                    this.children[i].Show(body);
                }
                
            }

            let buttons = document.querySelector(".appbar-buttons");

            for (let button of this.buttons) {
                button.Show(buttons);
            }
        };
    }

    export class Tabs extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "Tabs");
        }
        Refresh(): void {
            this.Clear();
            let html = `
            <div class="mdc-tab-bar" role="tablist">
            <div class="mdc-tab-scroller">
              <div class="mdc-tab-scroller__scroll-area">
                <div class="mdc-tab-scroller__scroll-content">
                  <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
                    <span class="mdc-tab__content">
                      <span class="mdc-tab__icon material-icons" aria-hidden="true">favorite</span>
                      <span class="mdc-tab__text-label">Favorites</span>
                    </span>
                    <span class="mdc-tab-indicator mdc-tab-indicator--active">
                      <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                    </span>
                    <span class="mdc-tab__ripple"></span>
                  </button>
                  <button class="mdc-tab " role="tab" aria-selected="true" tabindex="0">
                  <span class="mdc-tab__content">
                    <span class="mdc-tab__icon material-icons" aria-hidden="true">add</span>
                    <span class="mdc-tab__text-label">add</span>
                  </span>
                  <span class="mdc-tab-indicator ">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>
                </div>
              </div>
            </div>
          </div>
            `;
            
             
            this.object.innerHTML = html;

            const tabBar = new window.mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
            console.log(tabBar);
            this.RenderChildren();
            this.Events();
        }
    }

    export class ToolTips extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "ToolTips");
        }
        Refresh(): void {
            this.Clear();
            let html = `
            <div class="mdc-tooltip-wrapper--rich">
            <button class="mdc-button" data-tooltip-id="tt0" aria-haspopup="dialog" aria-expanded="false">
              <div class="mdc-button__ripple"></div>
              <span class="mdc-button__label">Button</span>
            </button>
            <div id="tt0" class="mdc-tooltip mdc-tooltip--rich" aria-hidden="true" role="dialog">
               <div class="mdc-tooltip__surface mdc-tooltip__surface-animation">
                  <h2 class="mdc-tooltip__title"> Lorem Ipsum </h2>
                  <p class="mdc-tooltip__content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                    pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
                    aliquam sit amet sit amet eros.
                    <a class="mdc-tooltip__content-link" href="google.com">link</a>
                  </p>
                  <div class="mdc-tooltip--rich-actions">
                     <button class="mdc-tooltip__action" aria-label="action">
                        action
                     </button>
                  </div>
               </div>
            </div>
          </div>
            `;
            
             
            this.object.innerHTML = html;

            const tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            console.log(tabBar);
            this.RenderChildren();
            this.Events();
        }
    }

    export class Switches extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "switch");
        }
        Refresh(): void {
            this.Clear();
        //     let html = `
        //     <button id="basic-switch" class="mdc-switch mdc-switch--unselected" type="button" role="switch" aria-checked="false">
        //     <div class="mdc-switch__track"></div>
        //     <div class="mdc-switch__handle-track">
        //       <div class="mdc-switch__handle">
        //         <div class="mdc-switch__shadow">
        //           <div class="mdc-elevation-overlay"></div>
        //         </div>
        //         <div class="mdc-switch__ripple"></div>
        //         <div class="mdc-switch__icons">
        //           <svg class="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
        //             <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
        //           </svg>
        //           <svg class="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
        //             <path d="M20 13H4v-2h16v2z" />
        //           </svg>
        //         </div>
        //       </div>
        //     </div>
        //   </button>
        //   <label for="basic-switch">Switching</label>
        //     `;

        let html = `
        <button id="selected-switch" class="mdc-switch mdc-switch--selected" type="button" role="switch" aria-checked="true">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__handle-track">
          <div class="mdc-switch__handle">
            <div class="mdc-switch__shadow">
              <div class="mdc-elevation-overlay"></div>
            </div>
            <div class="mdc-switch__ripple"></div>
            <div class="mdc-switch__icons">
              <svg class="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
                <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
              </svg>
              <svg class="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
                <path d="M20 13H4v-2h16v2z" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      <label for="selected-switch">off/on</label>
            `;
            
             
            this.object.innerHTML = html;

            // const tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            // console.log(tabBar);
            let sangpi = document.querySelectorAll('.mdc-switch');
            // for (const el in sangpi) {
            //     const switchControl = new window.mdc.switchControl.MDCSwitch(el);
            //   }
            const switchcontrol  = new window.mdc.switchControl.MDCSwitch(document.querySelector('.mdc-switch'))
            this.RenderChildren();
            this.Events();
        }
    }

    export class SnackBar extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "switch");
        }
        Refresh(): void {
            this.Clear();
        //     let html = `
        //     <button id="basic-switch" class="mdc-switch mdc-switch--unselected" type="button" role="switch" aria-checked="false">
        //     <div class="mdc-switch__track"></div>
        //     <div class="mdc-switch__handle-track">
        //       <div class="mdc-switch__handle">
        //         <div class="mdc-switch__shadow">
        //           <div class="mdc-elevation-overlay"></div>
        //         </div>
        //         <div class="mdc-switch__ripple"></div>
        //         <div class="mdc-switch__icons">
        //           <svg class="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
        //             <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
        //           </svg>
        //           <svg class="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
        //             <path d="M20 13H4v-2h16v2z" />
        //           </svg>
        //         </div>
        //       </div>
        //     </div>
        //   </button>
        //   <label for="basic-switch">Switching</label>
        //     `;

        let html = `
        <aside class="mdc-snackbar">
        <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
          <div class="mdc-snackbar__label" aria-atomic="false">
            Can't send photo. Retry in 5 seconds.
          </div>
          <div class="mdc-snackbar__actions" aria-atomic="true">
            <button type="button" class="mdc-button mdc-snackbar__action">
              <div class="mdc-button__ripple"></div>
              <span class="mdc-button__label">Retry</span>
            </button>
          </div>
        </div>
      </aside>
            `;
            
             
            this.object.innerHTML = html;

            // const tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            // console.log(tabBar);
            //let sangpi = document.querySelectorAll('.mdc-switch');
            // for (const el in sangpi) {
            //     const switchControl = new window.mdc.switchControl.MDCSwitch(el);
            //   }
            const snackbar  = new window.mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
            snackbar.open();
            this.RenderChildren();
            this.Events();
        }
    }

    export class Sliders extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "switch");
        }
        Refresh(): void {
            this.Clear();
   

        let html = `
        <div class="mdc-slider">
        <input class="mdc-slider__input" type="range" min="0" max="100" value="50" name="volume" aria-label="Continuous slider demo">
        <div class="mdc-slider__track">
          <div class="mdc-slider__track--inactive"></div>
          <div class="mdc-slider__track--active">
            <div class="mdc-slider__track--active_fill"></div>
          </div>
        </div>
        <div class="mdc-slider__thumb">
          <div class="mdc-slider__thumb-knob"></div>
        </div>
      </div>
            `;
            
             
            this.object.innerHTML = html;

            // const tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            // console.log(tabBar);
            //let sangpi = document.querySelectorAll('.mdc-switch');
            // for (const el in sangpi) {
            //     const switchControl = new window.mdc.switchControl.MDCSwitch(el);
            //   }
            const slider = new window.mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
            this.RenderChildren();
            this.Events();
        }
    }  

    export class NavDrawer extends FrameWork {
        headerName: string;
        headerEmail: string;
        headerImage: string;
        constructor(param?: Parameter) {
            super(param, "navDrawer");
        }
        Refresh(): void {
            this.Clear();  

        let html = 
            `<aside class="mdc-drawer mdc-drawer--modal mdc-drawer-full-height">
            <div class="mdc-drawer__header drawer-header">
                <div class="drawer-header-close">&#10006;</div>
                <img class="avatar" alt="Avatar" src="${this.headerImage}"/>
                <div class="mdc-drawer-text-group">
                    <h3 class="mdc-drawer__title">${this.headerName ?? "Name"}</h3>
                    <h6 class="mdc-drawer__subtitle">${this.headerEmail ?? "Email"}</h6> 
                </div>
            </div>        
            <div class="mdc-drawer__content">
            <hr class="mdc-list-divider">
                <nav class="mdc-list drawer-action-list"></nav>
            </div>
            </aside>
            <div class="mdc-drawer-scrim"></div>`;

            this.object.innerHTML = html;     
            //const listEl = document.querySelector('.mdc-drawer .mdc-list');
            // const list = window.mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
            // list.wrapFocus = true;

            const drawer = window.mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
            // console.log(drawer);
            // drawer.focusTrap = true;
            // const listEl = document.querySelector('#st');
            // const mainContentEl = document.querySelector('.main-content');

            // listEl.addEventListener('click', (event) => {                
            //     drawer.open = !drawer.open;
            // });
            let btn = this.object.parentNode.querySelector('#app-action');
            btn?.addEventListener('click', (event) =>{
                drawer.open = !drawer.open;
            })

            let btnClose = this.object.querySelector('.drawer-header-close');
            btnClose.addEventListener('click', (event) =>{
                drawer.open = false;
            });
            
            document.body.addEventListener('MDCDrawer:closed', () => {
                
            });
            this.RenderChildren();
            //this.Events();
        }

        RenderChildren(): void{
            let lst = this.object.querySelector('.drawer-action-list');
            for (let i = 0; i < this.children.length; i++) {                
                this.children[i].Show(lst);                      
            }
            this.RenderDataSource();
        }


    }

    export class Menu extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "menu");
        }
        Refresh(): void {
            this.Clear();  

        let html = `      
        <div class="mdc-menu mdc-menu-surface" id="demo-menu">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
          <li>
            <ul class="mdc-menu__selection-group">
              <li class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__graphic mdc-menu__selection-group-icon">
                  ...
                </span>
                <span class="mdc-list-item__text">Single</span>
              </li>
              <li class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__graphic mdc-menu__selection-group-icon">
                 ...
                </span>
                <span class="mdc-list-item__text">1.15</span>
              </li>
            </ul>
          </li>
          <li class="mdc-list-divider" role="separator"></li>
          <li class="mdc-list-item" role="menuitem">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">Add space before paragraph</span>
          </li>
          ...
        </ul>
      </div>    
            `;
            this.object.innerHTML = html;     
            const menu = new window.mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));
            menu.open = true;
            this.RenderChildren();
            this.Events();
        }
    }

    export class List extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "list");
        }
        Refresh(): void {
            this.Clear();  

        let html = `  
        <ul class="mdc-list">
        <li class="mdc-list-item" tabindex="0">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">Item 1 - Division 1</span>
        </li>
        <li class="mdc-list-item">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">Item 2 - Division 1</span>
        </li>
        <li role="separator" class="mdc-list-divider"></li>
        <li class="mdc-list-item">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">Item 1 - Division 2</span>
        </li>
        <li class="mdc-list-item">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">Item 2 - Division 2</span>
        </li>
      </ul>
            `;
            this.object.innerHTML = html;     
            const lis = new window.mdc.list.MDCList(document.querySelector('.mdc-list'));
            this.RenderChildren();
            this.Events();
        }
    }
    
    export class Chips extends FrameWork {
        constructor(param?: Parameter) {
            super(param, "chips");
        }
        Refresh(): void {
            this.Clear();  

        let html = `  
        <span class="mdc-evolution-chip-set" role="grid">
        <span class="mdc-evolution-chip-set__chips" role="presentation">
          <span class="mdc-evolution-chip" role="row" id="c0">
            <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell">
              <button class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" type="button" tabindex="0">
                <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
                <span class="mdc-evolution-chip__text-label">Chip one</span>
              </button>
            </span>
          </span>
          <span class="mdc-evolution-chip" role="row" id="c1">
            <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell">
              <button class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" type="button" tabindex="-1">
                <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
                <span class="mdc-evolution-chip__text-label">Chip two</span>
              </button>
            </span>
          </span>
        </span>
      </span>
            `;
            this.object.innerHTML = html;     
            const chip = new window.mdc.chips.MDCChipSet(document.querySelector('.mdc-evolution-chip-set'));
            this.RenderChildren();
            this.Events();
        }
    }
}