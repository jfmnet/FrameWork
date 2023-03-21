interface Window {
    JSZip: any;
    JSZipUtils: any;
}

interface InputString {

}

enum Theme {
    LIGHT = 1,
    DARK = 2,
    SYSTEM = 3
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
    fileformat: FrameWork.FILEFORMAT = FrameWork.FILEFORMAT.RAW;

    data: any[] = [];

    enabled: boolean = true;
    readonly: boolean = false;

    static theme: Theme = Theme.SYSTEM;

    /**
     * Base constructor
     */
    constructor(param?: FrameWork.Parameter, classname?: string) {
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

                    if (self.fileformat === FrameWork.FILEFORMAT.RAW) {
                        self.ondrop(dataTransfer.files);

                    } else {
                        // Use DataTransfer interface to access the file(s)
                        for (let i = 0; i < dataTransfer.files.length; i++) {

                            switch (self.fileformat) {
                                case FrameWork.FILEFORMAT.TEXT:
                                    var reader = new FileReader();
                                    reader.readAsText(dataTransfer.files[i]);

                                    reader.onload = function (readEvent) {
                                        self.ondrop(readEvent.target.result);
                                    };

                                    break;

                                case FrameWork.FILEFORMAT.ZIP:
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
    //Default parameter
    export interface Parameter {
        text?: any;
        value?: any;
        icon?: string;
        classes?: string[];
        onclick?: Function;
        ondrop?: Function;
        tag?: any;
        fileformat?: FILEFORMAT;
    }

    export enum FILEFORMAT {
        RAW = 1,
        TEXT = 2,
        ZIP = 3
    }

    export enum INPUTTYPE {
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

    export enum ORIENTATION {
        HORIZONTAL = 0,
        VERTICAL = 1
    }

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
                        input.addEventListener('input', function () {
                            self.value = this.value;

                            if (self.onchange)
                                self.onchange(self);
                        });
                        break;
                }
            }
        };
    }

    export abstract class InputBase {
        abstract type: FrameWork.INPUTTYPE;
        text: string;
    }

    export class InputString extends InputBase {
        type = FrameWork.INPUTTYPE.TEXT;
        value: string;

        constructor(text: string, value: string) {
            super();
            this.text = text;
            this.value = value;
        }
    }

    export class InputNumber extends InputBase {
        type = FrameWork.INPUTTYPE.NUMBER;
        value: number;

        constructor(text: string, value: number) {
            super();
            this.text = text;
            this.value = value;
        }
    }
}