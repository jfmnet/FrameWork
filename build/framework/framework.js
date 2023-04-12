var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Theme;
(function (Theme) {
    Theme[Theme["LIGHT"] = 1] = "LIGHT";
    Theme[Theme["DARK"] = 2] = "DARK";
    Theme[Theme["SYSTEM"] = 3] = "SYSTEM";
})(Theme || (Theme = {}));
var FILEFORMAT;
(function (FILEFORMAT) {
    FILEFORMAT[FILEFORMAT["RAW"] = 1] = "RAW";
    FILEFORMAT[FILEFORMAT["TEXT"] = 2] = "TEXT";
    FILEFORMAT[FILEFORMAT["ZIP"] = 3] = "ZIP";
})(FILEFORMAT || (FILEFORMAT = {}));
var INPUTTYPE;
(function (INPUTTYPE) {
    INPUTTYPE["BUTTON"] = "button";
    INPUTTYPE["CHECKBOX"] = "checkbox";
    INPUTTYPE["COLOR"] = "color";
    INPUTTYPE["DATE"] = "date";
    INPUTTYPE["DATETIME"] = "datetime-local";
    INPUTTYPE["EMAIL"] = "email";
    INPUTTYPE["FILE"] = "file";
    INPUTTYPE["HIDDEN"] = "hidden";
    INPUTTYPE["IMAGE"] = "image";
    INPUTTYPE["MONTH"] = "month";
    INPUTTYPE["NUMBER"] = "number";
    INPUTTYPE["PASSWORD"] = "password";
    INPUTTYPE["RADIO"] = "radio";
    INPUTTYPE["RANGE"] = "range";
    INPUTTYPE["RESET"] = "reset";
    INPUTTYPE["SEARCH"] = "search";
    INPUTTYPE["SUBMIT"] = "submit";
    INPUTTYPE["TELEPHONE"] = "tel";
    INPUTTYPE["TEXT"] = "text";
    INPUTTYPE["TIME"] = "time";
    INPUTTYPE["URL"] = "url";
    INPUTTYPE["WEEK"] = "week";
})(INPUTTYPE || (INPUTTYPE = {}));
var ORIENTATION;
(function (ORIENTATION) {
    ORIENTATION[ORIENTATION["HORIZONTAL"] = 0] = "HORIZONTAL";
    ORIENTATION[ORIENTATION["VERTICAL"] = 1] = "VERTICAL";
})(ORIENTATION || (ORIENTATION = {}));
var FrameWork = /** @class */ (function () {
    /**
     * Base constructor
     */
    function FrameWork(param, classname) {
        //Default element tag
        this.element = "div";
        //List of child controls
        this.children = [];
        this.fileformat = FILEFORMAT.RAW;
        this.data = [];
        this.enabled = true;
        this.readonly = false;
        //Copy properties from parameter
        if (param) {
            for (var name_1 in param) {
                this[name_1] = param[name_1];
            }
        }
        //Initialize classes
        this.classes = [];
        //Set classes from parameter
        if (param === null || param === void 0 ? void 0 : param.classes) {
            this.classes = param.classes;
        }
        //Add css class from parameter
        if (classname)
            this.classes.push(classname);
    }
    FrameWork.prototype.Show = function (parent) {
        this.object = document.createElement(this.element);
        for (var _i = 0, _a = this.classes; _i < _a.length; _i++) {
            var classname = _a[_i];
            this.object.classList.add(classname);
        }
        if (parent instanceof HTMLElement) {
            this.parent = parent;
            parent.appendChild(this.object);
        }
        else if (parent instanceof DocumentFragment) {
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
    };
    FrameWork.prototype.Refresh = function () {
        this.object.innerHTML = "";
        if (this.icon) {
            var icon = this.DisplayIcon(this.icon);
            this.object.appendChild(icon);
        }
        if (this.text) {
            var text = document.createElement("div");
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
    };
    FrameWork.prototype.RenderChildren = function () {
        //Show children
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].Show(this.object);
        }
        this.RenderDataSource();
    };
    ;
    FrameWork.prototype.RenderDataSource = function () {
        var item;
        var input;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var data = _a[_i];
            for (var name_2 in data) {
                item = data[name_2];
                input = new FrameWork.Input({ text: item.text, value: item.value }, item.type);
                input.Show(this.object);
            }
        }
    };
    FrameWork.prototype.Clear = function () {
        this.object.innerHTML = "";
    };
    FrameWork.prototype.Add = function (object) {
        //Add to the collections
        this.children.push(object);
        //Show if parents is already displayed
        if (this.object)
            object.Show(this.object);
        //Return the object
        return object;
    };
    FrameWork.prototype.AddDataSource = function (data) {
        this.data.push(data);
    };
    FrameWork.prototype.Events = function () {
        if (this.onclick) {
            if (!this.readonly) {
                var self_1 = this;
                this.object.onclick = function (e) {
                    e.stopPropagation();
                    if (self_1.enabled) {
                        if (self_1.onclick)
                            self_1.onclick(self_1);
                    }
                };
            }
        }
    };
    ;
    FrameWork.prototype.DragandDrop = function () {
        if (this.ondrop) {
            var self_2 = this;
            this.object.addEventListener("dragover", function (e) {
                //Prevents default event from firing
                e.preventDefault();
                //Prevents firing of parent event handlers (prevents bubbling effect)
                e.stopPropagation();
            });
            this.object.addEventListener("dragenter", function (e) {
                //Prevents default event from firing
                e.preventDefault();
                //Prevents firing of parent event handlers (prevents bubbling effect)
                e.stopPropagation();
            });
            this.object.addEventListener("dragleave", function (e) {
            });
            this.object.addEventListener("drop", function (e) {
                var dataTransfer = e.dataTransfer;
                if (dataTransfer && dataTransfer.files.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (self_2.fileformat === FILEFORMAT.RAW) {
                        self_2.ondrop(dataTransfer.files);
                    }
                    else {
                        // Use DataTransfer interface to access the file(s)
                        for (var i = 0; i < dataTransfer.files.length; i++) {
                            switch (self_2.fileformat) {
                                case FILEFORMAT.TEXT:
                                    var reader = new FileReader();
                                    reader.readAsText(dataTransfer.files[i]);
                                    reader.onload = function (readEvent) {
                                        self_2.ondrop(readEvent.target.result);
                                    };
                                    break;
                                case FILEFORMAT.ZIP:
                                    var zip = new window.JSZip();
                                    zip.loadAsync(dataTransfer.files[i])
                                        .then(function (zip) {
                                        var _this = this;
                                        zip.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                            var content;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, zip.file(element).async("string")];
                                                    case 1:
                                                        content = _a.sent();
                                                        self_2.ondrop(content);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
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
    };
    FrameWork.prototype.DisplayIcon = function (icon) {
        if (icon.includes(".jpg") || icon.includes(".png") || icon.includes(".b64")) {
            var element = void 0;
            element = document.createElement("img");
            element.classList.add("icon");
            element.src = icon;
            return element;
        }
        else {
            var element = void 0;
            element = document.createElement("i");
            element.classList.add("icon");
            element.classList.add("mdi");
            element.classList.add("mdi-" + icon);
            return element;
        }
    };
    ;
    FrameWork.Get = function (url, resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (resolve)
                    resolve(this.responseText);
            }
            else {
                if (reject)
                    resolve(this.responseText);
            }
        };
        xhttp.send();
    };
    ;
    FrameWork.GetJSON = function (url, resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (resolve)
                    resolve(JSON.parse(this.responseText));
            }
            else {
                if (reject)
                    resolve(this.responseText);
            }
        };
        xhttp.send();
    };
    ;
    FrameWork.GetXML = function (url, resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Content-type', 'text/xml; charset=utf-8');
        if (xhttp.overrideMimeType) {
            xhttp.overrideMimeType('text/xml');
        }
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (resolve)
                    resolve(this.responseXML);
            }
            else {
                if (reject)
                    resolve(this.responseText);
            }
        };
        xhttp.send();
    };
    ;
    FrameWork.theme = Theme.SYSTEM;
    return FrameWork;
}());
(function (FrameWork) {
    //Containers
    var Container = /** @class */ (function (_super) {
        __extends(Container, _super);
        function Container(param) {
            return _super.call(this, param, "container") || this;
        }
        return Container;
    }(FrameWork));
    FrameWork.Container = Container;
    var Expander = /** @class */ (function (_super) {
        __extends(Expander, _super);
        function Expander(param) {
            var _this = _super.call(this, param, "expander") || this;
            _this.isExpanded = true;
            _this.icon = "chevron-down";
            return _this;
        }
        Expander.prototype.Refresh = function () {
            this.Clear();
            if (this.isExpanded)
                this.object.classList.add("expanded");
            this.header = document.createElement("div");
            this.header.classList.add("header");
            this.object.append(this.header);
            var text = document.createElement("div");
            text.classList.add("text");
            text.innerHTML = this.text;
            this.header.append(text);
            this.headericon = this.DisplayIcon(this.icon);
            this.header.appendChild(this.headericon);
            //Show children
            this.RenderChildren();
            //Initialize events
            this.Events();
        };
        Expander.prototype.Events = function () {
            var self = this;
            this.header.onclick = function (e) {
                e.stopPropagation();
                if (self.children.length) {
                    self.isExpanded = !self.isExpanded;
                    self.Expand(self.isExpanded);
                }
            };
        };
        ;
        Expander.prototype.Expand = function (value) {
            if (value) {
                this.object.classList.add("expanded");
                this.headericon.classList.remove("mdi-chevron-up");
                this.headericon.classList.add("mdi-chevron-down");
            }
            else {
                this.object.classList.remove("expanded");
                this.headericon.classList.remove("mdi-chevron-down");
                this.headericon.classList.add("mdi-chevron-up");
            }
        };
        return Expander;
    }(FrameWork));
    FrameWork.Expander = Expander;
    var ScrollContainer = /** @class */ (function (_super) {
        __extends(ScrollContainer, _super);
        function ScrollContainer(param) {
            return _super.call(this, param, "scroll-container") || this;
        }
        return ScrollContainer;
    }(FrameWork));
    FrameWork.ScrollContainer = ScrollContainer;
    var SplitContainer = /** @class */ (function (_super) {
        __extends(SplitContainer, _super);
        function SplitContainer(param) {
            var _this = _super.call(this, param, "split-container") || this;
            _this.orientation = ORIENTATION.HORIZONTAL;
            _this.splittersize = 4;
            _this.size = [];
            return _this;
        }
        SplitContainer.prototype.Add = function (object) {
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
        };
        SplitContainer.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                if (i != 0) {
                    var divider = document.createElement("div");
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
        };
        SplitContainer.prototype.Events = function () {
            var self = this;
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
            function MouseMove(e) {
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
        };
        SplitContainer.prototype.Resize = function () {
            var width = this.parent.clientWidth;
            var height = this.parent.clientHeight;
            var gap = this.splittersize / 2;
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
                    }
                    else if (this.size[1] !== undefined) {
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
                }
                else {
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
                    }
                    else if (this.size[1] !== undefined) {
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
            }
            else {
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
                }
                else {
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
        };
        return SplitContainer;
    }(FrameWork));
    FrameWork.SplitContainer = SplitContainer;
    var TreeContainer = /** @class */ (function (_super) {
        __extends(TreeContainer, _super);
        function TreeContainer(param) {
            return _super.call(this, param, "tree-container") || this;
        }
        TreeContainer.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }
        };
        ;
        return TreeContainer;
    }(FrameWork));
    FrameWork.TreeContainer = TreeContainer;
    var MenuContainer = /** @class */ (function (_super) {
        __extends(MenuContainer, _super);
        function MenuContainer(param) {
            return _super.call(this, param, "menu-container") || this;
        }
        return MenuContainer;
    }(FrameWork));
    FrameWork.MenuContainer = MenuContainer;
    var ToolbarContainer = /** @class */ (function (_super) {
        __extends(ToolbarContainer, _super);
        function ToolbarContainer(param) {
            return _super.call(this, param, "toolbar-container") || this;
        }
        return ToolbarContainer;
    }(FrameWork));
    FrameWork.ToolbarContainer = ToolbarContainer;
    var TabContainer = /** @class */ (function (_super) {
        __extends(TabContainer, _super);
        function TabContainer(param) {
            return _super.call(this, param, "tab-container") || this;
        }
        return TabContainer;
    }(FrameWork));
    FrameWork.TabContainer = TabContainer;
    //Controls
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu(param) {
            return _super.call(this, param, "menu") || this;
        }
        Menu.prototype.Refresh = function () {
            this.object.innerHTML = "";
            if (this.icon) {
                var icon = this.DisplayIcon(this.icon);
                this.object.appendChild(icon);
            }
            if (this.text) {
                var text = document.createElement("div");
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
        };
        Menu.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.body);
            }
        };
        ;
        return Menu;
    }(FrameWork));
    FrameWork.Menu = Menu;
    var Toolbar = /** @class */ (function (_super) {
        __extends(Toolbar, _super);
        function Toolbar(param) {
            return _super.call(this, param, "toolbar") || this;
        }
        return Toolbar;
    }(FrameWork));
    FrameWork.Toolbar = Toolbar;
    var Tab = /** @class */ (function (_super) {
        __extends(Tab, _super);
        function Tab(param) {
            return _super.call(this, param, "tab") || this;
        }
        return Tab;
    }(FrameWork));
    FrameWork.Tab = Tab;
    var TreeNode = /** @class */ (function (_super) {
        __extends(TreeNode, _super);
        function TreeNode(param) {
            var _this = _super.call(this, param, "tree-node") || this;
            _this.isExpanded = false;
            _this.level = 1;
            _this.icon = "menu-right";
            return _this;
        }
        TreeNode.prototype.Refresh = function () {
            this.object.innerHTML = "";
            this.object.classList.add("tree-node-level-" + this.level);
            var header = document.createElement("div");
            header.classList.add("tree-header");
            this.object.append(header);
            if (this.children.length)
                this.treeIcon = this.DisplayIcon(this.icon);
            else
                this.treeIcon = this.DisplayIcon("circle-small");
            header.appendChild(this.treeIcon);
            var icon = this.DisplayIcon("book-information-variant");
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
        };
        TreeNode.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                var node = this.children[i];
                node.level = this.level + 1;
                node.Show(this.object);
            }
        };
        ;
        TreeNode.prototype.Events = function () {
            if (this.treeIcon) {
                var self_3 = this;
                this.treeIcon.onclick = function (e) {
                    e.stopPropagation();
                    if (self_3.children.length) {
                        self_3.isExpanded = !self_3.isExpanded;
                        self_3.Expand(self_3.isExpanded);
                    }
                };
                this.treeText.onclick = function (e) {
                    e.stopPropagation();
                    var selected = document.body.querySelector(".tree-node.selected");
                    if (selected)
                        selected.classList.remove("selected");
                    self_3.object.classList.add("selected");
                    if (self_3.onclick)
                        self_3.onclick(self_3);
                };
            }
        };
        ;
        TreeNode.prototype.Expand = function (value) {
            if (value) {
                this.object.classList.add("expanded");
                this.treeIcon.classList.remove("mdi-menu-right");
                this.treeIcon.classList.add("mdi-menu-down");
            }
            else {
                this.object.classList.remove("expanded");
                this.treeIcon.classList.remove("mdi-menu-down");
                this.treeIcon.classList.add("mdi-menu-right");
            }
        };
        return TreeNode;
    }(FrameWork));
    FrameWork.TreeNode = TreeNode;
    //Inputs
    var Input = /** @class */ (function (_super) {
        __extends(Input, _super);
        function Input(param, type) {
            if (type === void 0) { type = INPUTTYPE.TEXT; }
            var _this = _super.call(this, param, "input") || this;
            _this.classes.push("inline");
            _this.classes.push("textbox");
            _this.type = type;
            return _this;
        }
        Input.prototype.Refresh = function () {
            this.object.innerHTML = "";
            if (this.text) {
                var text = document.createElement("div");
                text.innerText = this.text;
                this.object.appendChild(text);
                var input = document.createElement("input");
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
            }
            else {
                var input = document.createElement("input");
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
        ;
        Input.prototype.Events = function () {
            if (!this.readonly) {
                var input = this.object.querySelector("input");
                var self_4 = this;
                switch (this.type) {
                    case "submit":
                        input.addEventListener('click', function (e) {
                            e.preventDefault();
                            if (self_4.onclick)
                                self_4.onclick();
                        });
                        break;
                    case "checkbox":
                        input.addEventListener('change', function (e) {
                            e.preventDefault();
                            self_4.value = this.checked;
                            if (self_4.onchange)
                                self_4.onchange(self_4);
                        });
                        break;
                    default:
                        input.addEventListener('change', function (e) {
                            e.preventDefault();
                            self_4.value = this.value;
                        });
                        input.addEventListener('input', function () {
                            self_4.value = this.value;
                        });
                        input.addEventListener('keydown', function (e) {
                            if (e.key === "Enter") {
                                if (self_4.onchange)
                                    self_4.onchange(self_4);
                            }
                        });
                        break;
                }
            }
        };
        ;
        Input.prototype.Focus = function () {
            this.input.value = "";
            this.input.focus();
        };
        return Input;
    }(FrameWork));
    FrameWork.Input = Input;
    var InputBase = /** @class */ (function () {
        function InputBase() {
        }
        return InputBase;
    }());
    FrameWork.InputBase = InputBase;
    var InputString = /** @class */ (function (_super) {
        __extends(InputString, _super);
        function InputString(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.TEXT;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputString;
    }(InputBase));
    FrameWork.InputString = InputString;
    var InputNumber = /** @class */ (function (_super) {
        __extends(InputNumber, _super);
        function InputNumber(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.NUMBER;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputNumber;
    }(InputBase));
    FrameWork.InputNumber = InputNumber;
    var InputCheckBox = /** @class */ (function (_super) {
        __extends(InputCheckBox, _super);
        function InputCheckBox(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.CHECKBOX;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputCheckBox;
    }(InputBase));
    FrameWork.InputCheckBox = InputCheckBox;
    var InputColor = /** @class */ (function (_super) {
        __extends(InputColor, _super);
        function InputColor(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.COLOR;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputColor;
    }(InputBase));
    FrameWork.InputColor = InputColor;
    var InputDate = /** @class */ (function (_super) {
        __extends(InputDate, _super);
        function InputDate(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.DATE;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputDate;
    }(InputBase));
    FrameWork.InputDate = InputDate;
    var InputDateTime = /** @class */ (function (_super) {
        __extends(InputDateTime, _super);
        function InputDateTime(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.DATETIME;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputDateTime;
    }(InputBase));
    FrameWork.InputDateTime = InputDateTime;
    var InputEmail = /** @class */ (function (_super) {
        __extends(InputEmail, _super);
        function InputEmail(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.EMAIL;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputEmail;
    }(InputBase));
    FrameWork.InputEmail = InputEmail;
    var InputHidden = /** @class */ (function (_super) {
        __extends(InputHidden, _super);
        function InputHidden(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.HIDDEN;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputHidden;
    }(InputBase));
    FrameWork.InputHidden = InputHidden;
    var InputImage = /** @class */ (function (_super) {
        __extends(InputImage, _super);
        function InputImage(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.IMAGE;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputImage;
    }(InputBase));
    FrameWork.InputImage = InputImage;
    var InputMonth = /** @class */ (function (_super) {
        __extends(InputMonth, _super);
        function InputMonth(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.MONTH;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputMonth;
    }(InputBase));
    FrameWork.InputMonth = InputMonth;
    var InputPassword = /** @class */ (function (_super) {
        __extends(InputPassword, _super);
        function InputPassword(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.PASSWORD;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputPassword;
    }(InputBase));
    FrameWork.InputPassword = InputPassword;
    var InputRadio = /** @class */ (function (_super) {
        __extends(InputRadio, _super);
        function InputRadio(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.RADIO;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputRadio;
    }(InputBase));
    FrameWork.InputRadio = InputRadio;
    var InputRange = /** @class */ (function (_super) {
        __extends(InputRange, _super);
        function InputRange(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.RANGE;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputRange;
    }(InputBase));
    FrameWork.InputRange = InputRange;
    var InputReset = /** @class */ (function (_super) {
        __extends(InputReset, _super);
        function InputReset(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.RESET;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputReset;
    }(InputBase));
    FrameWork.InputReset = InputReset;
    var InputSearch = /** @class */ (function (_super) {
        __extends(InputSearch, _super);
        function InputSearch(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.SEARCH;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputSearch;
    }(InputBase));
    FrameWork.InputSearch = InputSearch;
    var InputSubmit = /** @class */ (function (_super) {
        __extends(InputSubmit, _super);
        function InputSubmit(text, value, onclick) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.SUBMIT;
            _this.text = text;
            _this.value = value;
            _this.onclick = onclick;
            return _this;
        }
        return InputSubmit;
    }(InputBase));
    FrameWork.InputSubmit = InputSubmit;
    var InputTelehone = /** @class */ (function (_super) {
        __extends(InputTelehone, _super);
        function InputTelehone(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.TELEPHONE;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputTelehone;
    }(InputBase));
    FrameWork.InputTelehone = InputTelehone;
    var InputTime = /** @class */ (function (_super) {
        __extends(InputTime, _super);
        function InputTime(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.TIME;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputTime;
    }(InputBase));
    FrameWork.InputTime = InputTime;
    var InputUrl = /** @class */ (function (_super) {
        __extends(InputUrl, _super);
        function InputUrl(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.URL;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputUrl;
    }(InputBase));
    FrameWork.InputUrl = InputUrl;
    var InputWeek = /** @class */ (function (_super) {
        __extends(InputWeek, _super);
        function InputWeek(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.WEEK;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputWeek;
    }(InputBase));
    FrameWork.InputWeek = InputWeek;
    var InputFile = /** @class */ (function (_super) {
        __extends(InputFile, _super);
        function InputFile(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.FILE;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputFile;
    }(InputBase));
    FrameWork.InputFile = InputFile;
    var InputButton = /** @class */ (function (_super) {
        __extends(InputButton, _super);
        function InputButton(text, value) {
            var _this = _super.call(this) || this;
            _this.type = INPUTTYPE.BUTTON;
            _this.text = text;
            _this.value = value;
            return _this;
        }
        return InputButton;
    }(InputBase));
    FrameWork.InputButton = InputButton;
})(FrameWork || (FrameWork = {}));
var MaterialDesign2;
(function (MaterialDesign2) {
    var ButtonType;
    (function (ButtonType) {
        ButtonType["NONE"] = "";
        ButtonType["OUTLINED"] = "mdc-button--outlined";
        ButtonType["RAISED"] = "mdc-button--raised";
    })(ButtonType = MaterialDesign2.ButtonType || (MaterialDesign2.ButtonType = {}));
    var FloatButtonType;
    (function (FloatButtonType) {
        FloatButtonType["REGULAR"] = "";
        FloatButtonType["MINI"] = "mdc-fab--mini";
        FloatButtonType["RETANGULAR"] = "mdc-fab--extended";
    })(FloatButtonType = MaterialDesign2.FloatButtonType || (MaterialDesign2.FloatButtonType = {}));
    var TextFieldType;
    (function (TextFieldType) {
        TextFieldType[TextFieldType["OUTLINENOLABEL"] = 0] = "OUTLINENOLABEL";
        TextFieldType[TextFieldType["FILLEDNOLABEL"] = 1] = "FILLEDNOLABEL";
        TextFieldType[TextFieldType["OUTLINE"] = 2] = "OUTLINE";
        TextFieldType[TextFieldType["FILLED"] = 3] = "FILLED";
        TextFieldType[TextFieldType["PRESUFFIX"] = 4] = "PRESUFFIX";
    })(TextFieldType = MaterialDesign2.TextFieldType || (MaterialDesign2.TextFieldType = {}));
    var InputType;
    (function (InputType) {
        InputType["OUTLINE"] = "mdc-text-field--outlined";
        InputType["FILLED"] = "mdc-text-field--filled";
    })(InputType = MaterialDesign2.InputType || (MaterialDesign2.InputType = {}));
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(param) {
            var _this = _super.call(this, param, "button") || this;
            _this.type = ButtonType.NONE;
            return _this;
        }
        Button.prototype.Refresh = function () {
            this.Clear();
            if (this.icon) {
                var html = "\n                <button class=\"mdc-button ".concat(this.type, "\">\n                    <div class=\"mdc-button__ripple\"></div>\n                    <i class=\"material-icons mdc-button__icon\" aria-hidden=\"true\">").concat(this.icon, "</i>\n                    <span class=\"mdc-button__label\">").concat(this.text, "</span>\n                </button>");
                this.object.innerHTML = html;
            }
            else {
                var html = "\n                <button class=\"mdc-button\">\n                    <div class=\"mdc-button__ripple\"></div>\n                    <span class=\"mdc-button__label\">".concat(this.text, "</span>\n                </button>");
                this.object.innerHTML = html;
            }
            window.mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
            this.Events();
        };
        return Button;
    }(FrameWork));
    MaterialDesign2.Button = Button;
    var FloatingButton = /** @class */ (function (_super) {
        __extends(FloatingButton, _super);
        function FloatingButton(param) {
            var _this = _super.call(this, param, "button") || this;
            _this.type = FloatButtonType.REGULAR;
            return _this;
        }
        FloatingButton.prototype.Refresh = function () {
            this.Clear();
            var html;
            if (this.icon && this.text) {
                html = "\n                    <button class=\"mdc-fab ".concat(this.type, " \">   \n                        <div class=\"mdc-fab__ripple\"></div>                      \n                        <span class=\"mdc-fab__icon material-icons\">").concat(this.icon, "</span>\n                        <span class=\"mdc-fab__label\">").concat(this.text, "</span>\n                    </button>");
            }
            else if (this.icon) {
                html = "\n                    <button class=\"mdc-fab ".concat(this.type, "\" aria-label=\"").concat(this.icon, "\" >\n                        <div class=\"mdc-fab__ripple\"></div>\n                        <span class=\"mdc-fab__icon material-icons\">").concat(this.icon, "</span>\n                    </button>");
            }
            else if (this.text) {
                html = "\n                    <button class=\"mdc-fab ".concat(this.type, "\">\n                        <div class=\"mdc-fab__ripple\"></div>\n                        <span class=\"mdc-fab__label\">").concat(this.text, "</span>\n                    </button>\n                 ");
            }
            else {
                html = "\n                    <div class=\"mdc-touch-target-wrapper\">\n                        <button class=\"mdc-fab mdc-fab--mini mdc-fab--touch\">\n                            <div class=\"mdc-fab__ripple\"></div>\n                            <span class=\"material-icons mdc-fab__icon\">add</span>\n                            <div class=\"mdc-fab__touch\"></div>\n                        </button>\n                    </div>\n                    ";
            }
            this.object.innerHTML = html;
            this.RenderChildren();
            this.Events();
        };
        return FloatingButton;
    }(FrameWork));
    MaterialDesign2.FloatingButton = FloatingButton;
    var CheckBox = /** @class */ (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox(param) {
            var _this = _super.call(this, param, "check") || this;
            _this.id = param.id;
            _this.value = param.value;
            return _this;
        }
        CheckBox.prototype.Refresh = function () {
            this.Clear();
            var html = "\n                <div class=\"mdc-form-field\">\n                    <div class=\"mdc-checkbox\">\n                        <input type=\"checkbox\" class=\"mdc-checkbox__native-control\" id=\"".concat(this.id, "\" value=\"").concat(this.value, "\"/>\n                        <div class=\"mdc-checkbox__background\">\n                            <svg class=\"mdc-checkbox__checkmark\" viewBox=\"0 0 24 24\">\n                            <path class=\"mdc-checkbox__checkmark-path\" fill=\"none\" d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n                            </svg>\n                            <div class=\"mdc-checkbox__mixedmark\">\n                            </div>\n                        </div>\n                        <div class=\"mdc-checkbox__ripple\">\n                        </div>\n                    </div>\n                    <label for=\"").concat(this.id, "\">").concat(this.text, "</label>\n                </div>\n                ");
            this.object.innerHTML = html;
            //this.RenderChildren();
        };
        return CheckBox;
    }(FrameWork));
    MaterialDesign2.CheckBox = CheckBox;
    var TextField = /** @class */ (function (_super) {
        __extends(TextField, _super);
        function TextField(param) {
            var _this = this;
            var _a, _b;
            _this = _super.call(this, param, "textField") || this;
            _this.type = TextFieldType.OUTLINE;
            _this.id = param.id;
            _this.prefix = (_a = param.prefix) !== null && _a !== void 0 ? _a : "$";
            _this.surfix = (_b = param.surfix) !== null && _b !== void 0 ? _b : ".00";
            return _this;
        }
        TextField.prototype.Refresh = function () {
            this.Clear();
            var html;
            if (this.type == TextFieldType.FILLED) {
                html = "\n                <label class=\"mdc-text-field mdc-text-field--filled ".concat(this.id, "\">\n                    <span class=\"mdc-text-field__ripple\"></span>\n                    <span class=\"mdc-floating-label\" id=\"").concat(this.id, "\">").concat(this.text, "</span>\n                    <input class=\"mdc-text-field__input\" type=\"text\" aria-labelledby=\"").concat(this.id, "\">\n                    <span class=\"mdc-line-ripple\"></span>\n                </label>\n                ");
            }
            else if (this.type == TextFieldType.OUTLINE) {
                html = "\n                <label class=\"mdc-text-field mdc-text-field--outlined ".concat(this.id, "\">\n                    <span class=\"mdc-notched-outline\">\n                        <span class=\"mdc-notched-outline__leading\"></span>\n                        <span class=\"mdc-notched-outline__notch\">\n                            <span class=\"mdc-floating-label\" id=\"").concat(this.id, "\">").concat(this.text, "</span>\n                        </span>\n                        <span class=\"mdc-notched-outline__trailing\"></span>\n                    </span>\n                    <input type=\"text\" class=\"mdc-text-field__input\" aria-labelledby=\"").concat(this.id, "\">\n                </label>\n                ");
            }
            else if (this.type == TextFieldType.FILLEDNOLABEL) {
                html = "\n                <label class=\"mdc-text-field mdc-text-field--filled mdc-text-field--no-label ".concat(this.id, "\">\n                    <span class=\"mdc-text-field__ripple\"></span>\n                    <input class=\"mdc-text-field__input\" type=\"text\" placeholder=\"").concat(this.text, "\" aria-label=\"Label\">\n                    <span class=\"mdc-line-ripple\"></span>\n                </label>\n                ");
            }
            else if (this.type == TextFieldType.OUTLINENOLABEL) {
                html = "\n                <label class=\"mdc-text-field mdc-text-field--outlined mdc-text-field--no-label ".concat(this.id, "\">\n                    <span class=\"mdc-notched-outline\">\n                    <span class=\"mdc-notched-outline__leading\"></span>\n                    <span class=\"mdc-notched-outline__trailing\"></span>\n                    </span>\n                    <input class=\"mdc-text-field__input\" type=\"text\"  placeholder=\"").concat(this.text, "\" aria-label=\"Label\">\n                </label>\n                ");
            }
            else if (this.type == TextFieldType.PRESUFFIX) {
                html = "\n                <label class=\"mdc-text-field mdc-text-field--filled ".concat(this.id, "\">\n                    <span class=\"mdc-text-field__ripple\"></span>\n                    <span class=\"mdc-floating-label\" id=\"my-label-id\">Currency Value</span>\n                    <span class=\"mdc-text-field__affix mdc-text-field__affix--prefix\">").concat(this.prefix, "</span>\n                    <input class=\"mdc-text-field__input\" type=\"text\" aria-labelledby=\"my-label-id\">\n                    <span class=\"mdc-text-field__affix mdc-text-field__affix--suffix\">").concat(this.surfix, "</span>\n                    <span class=\"mdc-line-ripple\"></span>\n                </label>\n                ");
            }
            this.object.innerHTML = html;
            var text = new window.mdc.textField.MDCTextField(this.object.querySelector(".".concat(this.id)));
            this.RenderChildren();
        };
        TextField.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }
            this.RenderDataSource();
        };
        ;
        return TextField;
    }(FrameWork));
    MaterialDesign2.TextField = TextField;
    var TextArea = /** @class */ (function (_super) {
        __extends(TextArea, _super);
        function TextArea(param) {
            var _this = this;
            var _a, _b, _c;
            _this = _super.call(this, param, "textArea") || this;
            _this.type = InputType.OUTLINE;
            _this.id = param.id;
            _this.maxCount = (_a = param.maxCount) !== null && _a !== void 0 ? _a : 100;
            _this.rownum = (_b = param.rownum) !== null && _b !== void 0 ? _b : 4;
            _this.colsnum = (_c = param.colsnum) !== null && _c !== void 0 ? _c : 30;
            return _this;
        }
        TextArea.prototype.Refresh = function () {
            this.Clear();
            var html;
            if (this.type == InputType.FILLED) {
                html = "\n                    <label class=\"mdc-text-field ".concat(this.type, " mdc-text-field--textarea mdc-text-field--with-internal-counter ").concat(this.id, "\">\n                        <span class=\"mdc-notched-filled\">\n                            <span class=\"mdc-notched-filled__leading\"></span>\n                            <span class=\"mdc-notched-filled__notch\">\n                            <span class=\"mdc-floating-label\" id=\"").concat(this.id, "\">").concat(this.text, "</span>\n                            </span>\n                            <span class=\"mdc-notched-filled__trailing\"></span>\n                        </span>\n                        <span class=\"mdc-text-field__resizer\">\n                            <textarea class=\"mdc-text-field__input\" aria-labelledby=\"").concat(this.id, "\" rows=\"").concat(this.rownum, "\" cols=\"").concat(this.colsnum, "\" maxlength=\"").concat(this.maxCount, "\"></textarea>\n                            <span class=\"mdc-text-field-character-counter\">0 / ").concat(this.maxCount, "</span>\n                        </span>\n                    </label>\n                ");
            }
            else if (this.type == InputType.OUTLINE) {
                html = "\n                <label class=\"mdc-text-field ".concat(this.type, " mdc-text-field--textarea mdc-text-field--with-internal-counter ").concat(this.id, "\">\n                    <span class=\"mdc-notched-outline\">\n                        <span class=\"mdc-notched-outline__leading\"></span>\n                        <span class=\"mdc-notched-outline__notch\">\n                        <span class=\"mdc-floating-label\" id=\"").concat(this.id, "\">").concat(this.text, "</span>\n                        </span>\n                        <span class=\"mdc-notched-outline__trailing\"></span>\n                    </span>\n                    <span class=\"mdc-text-field__resizer\">\n                        <textarea class=\"mdc-text-field__input\" aria-labelledby=\"").concat(this.id, "\" rows=\"").concat(this.rownum, "\" cols=\"").concat(this.colsnum, "\" maxlength=\"").concat(this.maxCount, "\"></textarea>\n                        <span class=\"mdc-text-field-character-counter\">0 / ").concat(this.maxCount, "</span>\n                    </span>\n                </label>\n                ");
            }
            this.object.innerHTML = html;
            new window.mdc.textField.MDCTextField(document.querySelector(".".concat(this.id)));
            //  new window.mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
            this.RenderChildren();
        };
        TextArea.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }
            this.RenderDataSource();
        };
        ;
        return TextArea;
    }(FrameWork));
    MaterialDesign2.TextArea = TextArea;
    var Password = /** @class */ (function (_super) {
        __extends(Password, _super);
        function Password(param) {
            var _this = _super.call(this, param, "password") || this;
            _this.type = InputType.OUTLINE;
            _this.id = param.id;
            return _this;
        }
        Password.prototype.Refresh = function () {
            this.Clear();
            var html;
            if (this.type == InputType.FILLED) {
                html = "\n                <label class=\"mdc-text-field mdc-text-field--filled  ".concat(this.id, "\">\n                    <span class=\"mdc-text-field__ripple\"></span>\n                    <span class=\"mdc-floating-label\" id=\"").concat(this.id, "\">").concat(this.text, "</span>\n                    <input class=\"mdc-text-field__input\" type=\"password\" aria-labelledby=\"").concat(this.id, "\" required minlength=\"8\">\n                    <span class=\"mdc-line-ripple\"></span>\n                </label>\n             ");
            }
            else if (this.type == InputType.OUTLINE) {
                html = "\n                <label class=\"mdc-text-field mdc-text-field--outlined  ".concat(this.id, "\">\n                    <span class=\"mdc-notched-outline\">\n                    <span class=\"mdc-notched-outline__leading\"></span>\n                    <span class=\"mdc-notched-outline__notch\">\n                        <span class=\"mdc-floating-label\" id=\"").concat(this.id, "\">").concat(this.text, "</span>\n                    </span>\n                    <span class=\"mdc-notched-outline__trailing\"></span>\n                    </span>\n                    <input class=\"mdc-text-field__input\" type=\"password\" aria-labelledby=\"").concat(this.id, "\" required minlength=\"8\" >\n                </label>\n                ");
            }
            this.object.innerHTML = html;
            new window.mdc.textField.MDCTextField(document.querySelector(".".concat(this.id)));
            this.RenderChildren();
        };
        Password.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }
            this.RenderDataSource();
        };
        ;
        return Password;
    }(FrameWork));
    MaterialDesign2.Password = Password;
    var Radio = /** @class */ (function (_super) {
        __extends(Radio, _super);
        function Radio(param) {
            var _this = _super.call(this, param, "radio") || this;
            _this.id = param.id;
            _this.name = param.name;
            return _this;
        }
        Radio.prototype.Refresh = function () {
            this.Clear();
            var html = "\n            <div class=\"mdc-form-field\">\n                <div class=\"mdc-radio\">\n                    <input class=\"mdc-radio__native-control\" type=\"radio\" id=\"".concat(this.id, "\" name=\"").concat(this.name, "\">\n                    <div class=\"mdc-radio__background\">\n                        <div class=\"mdc-radio__outer-circle\"></div>\n                        <div class=\"mdc-radio__inner-circle\"></div>\n                    </div>\n                    <div class=\"mdc-radio__ripple\"></div>\n                </div>\n                <label for=\"").concat(this.id, "\">").concat(this.text, "</label>    \n            </div>\n        ");
            this.object.innerHTML = html;
            var radio = new window.mdc.radio.MDCRadio(document.querySelector('.mdc-radio'));
            // const formField = new window.mdc.formField.MDCFormField(document.querySelector('.mdc-form-field'));
            // formField.input = radio;
            this.RenderChildren();
            this.Events();
        };
        return Radio;
    }(FrameWork));
    MaterialDesign2.Radio = Radio;
    var Dialogs = /** @class */ (function (_super) {
        __extends(Dialogs, _super);
        function Dialogs(param) {
            var _this = _super.call(this, param, "Dialogs") || this;
            _this.showCancel = true;
            _this.showOk = true;
            _this.labelOk = "ok";
            return _this;
        }
        Dialogs.prototype.Refresh = function () {
            this.Clear();
            var html = "<div class=\"mdc-dialog\">\n            <div class=\"mdc-dialog__container\">\n            <div class=\"mdc-dialog__surface\" role=\"alertdialog\" aria-modal=\"true\" aria-labelledby=\"my-dialog-title\"\n               aria-describedby=\"my-dialog-content\">\n               <div class=\"mdc-dialog__content\" id=\"my-dialog-content\">\n                    Discard draft?\n               </div>\n               <div class=\"mdc-dialog__actions\">";
            if (this.showCancel) {
                html +=
                    "<button type=\"button\" class=\"mdc-button mdc-dialog__button\" data-mdc-dialog-action=\"cancel\">\n                <div class=\"mdc-button__ripple\"></div>\n                <span class=\"mdc-button__label\">Cancel</span>\n                </button>";
            }
            if (this.showOk) {
                html +=
                    "<button type=\"button\" class=\"mdc-button mdc-dialog__button\" data-mdc-dialog-action=\"accept\">\n                    <div class=\"mdc-button__ripple\"></div>\n                    <span class=\"mdc-button__label\">".concat(this.labelOk, "</span>\n                    </button>");
            }
            html +=
                "</div>\n             </div>\n             </div>\n             <div class=\"mdc-dialog__scrim\"></div>\n             </div>";
            console.log(html);
            this.object.innerHTML = html;
            this.RenderChildren();
            var dialog = new window.mdc.dialog.MDCDialog((document.querySelector('.mdc-dialog')));
            dialog.open();
            dialog.listen('MDCDialog:closing', function () {
                console.log("colse");
                //document.body.removeChild(document.querySelector(".mdc-dialog")); 
            });
        };
        Dialogs.prototype.RenderChildren = function () {
            //Show children
            console.log("render ....");
            console.log();
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object.querySelector('.mdc-dialog__content'));
            }
            this.RenderDataSource();
        };
        ;
        return Dialogs;
    }(FrameWork));
    MaterialDesign2.Dialogs = Dialogs;
    var Cards = /** @class */ (function (_super) {
        __extends(Cards, _super);
        function Cards(param) {
            var _this = _super.call(this, param, "card") || this;
            _this.width = 350;
            _this.height = 350;
            return _this;
        }
        Cards.prototype.Refresh = function () {
            var _a, _b;
            this.Clear();
            var html = "\n            <div class=\"mdc-card \">\n                <div class=\"mdc-card__primary-action\" tabindex=\"0\">\n                    <div class=\"mdc-card__media mdc-card__media--square  my-card__media_pic\">                   \n                    </div>                    \n                    <div class=\"mdc-card__ripple\"></div>\n                </div>\n                <div class=\"mdc-card-title\">".concat((_a = this.title) !== null && _a !== void 0 ? _a : "", "</div>\n                <div class=\"mdc-card-content\">").concat((_b = this.description) !== null && _b !== void 0 ? _b : "", "</div>\n                <div class=\"mdc-card__actions\">\n                    <div class=\"mdc-card__action-buttons\">\n                    <button class=\"mdc-button mdc-card__action mdc-card__action--button\">\n                        <div class=\"mdc-button__ripple\"></div>\n                        <span class=\"mdc-button__label\">OK</span>\n                    </button>\n                    <button class=\"mdc-button mdc-card__action mdc-card__action--button\">\n                        <div class=\"mdc-button__ripple\"></div>\n                        <span class=\"mdc-button__label\">Cancel</span>\n                    </button>      \n                    </div>                  \n                </div>\n            </div>\n            ");
            this.object.setAttribute("style", "width:".concat(this.width, "px;height:").concat(this.height, "px"));
            this.object.innerHTML = html;
            this.contents = this.object.querySelector(".my-card__media_pic");
            this.contents.style.backgroundImage = "url('".concat(this.backgroundImage, "')");
            this.RenderChildren();
        };
        Cards.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(this.object);
            }
            this.RenderDataSource();
        };
        ;
        return Cards;
    }(FrameWork));
    MaterialDesign2.Cards = Cards;
    var AppBar = /** @class */ (function (_super) {
        __extends(AppBar, _super);
        function AppBar(param) {
            return _super.call(this, param, "appbar") || this;
        }
        AppBar.prototype.Refresh = function () {
            this.Clear();
            var html = "\n                <header class=\"mdc-top-app-bar\">\n                <div class=\"mdc-top-app-bar__row\">\n                    <section class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-start\">\n                        <button id=\"app-action\" class=\"material-icons mdc-top-app-bar__navigation-icon mdc-icon-button\" aria-label=\"Open navigation menu\">menu</button>\n                        <span class=\"mdc-top-app-bar__title\">Page title</span>\n                    </section>\n                    <section class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-end\" role=\"toolbar\">\n                        <button class=\"material-icons mdc-top-app-bar__action-item mdc-icon-button\" aria-label=\"Favorite\">favorite</button>\n                        <button class=\"material-icons mdc-top-app-bar__action-item mdc-icon-button\" aria-label=\"Search\">search</button>\n                        <button class=\"material-icons mdc-top-app-bar__action-item mdc-icon-button\" aria-label=\"Options\">more_vert</button>\n                    </section>\n                </div>\n                </header>\n                <main class=\"mdc-top-app-bar--fixed-adjust\">\n                    App content\n                </main>\n            ";
            this.object.innerHTML = html;
            //this.contents = this.object.querySelector("");
            this.RenderChildren();
        };
        AppBar.prototype.RenderChildren = function () {
            //Show children
            for (var i = 0; i < this.children.length; i++) {
                //    let tem = this.children[i].classes;
                //    if(tem.indexOf("navDrawer") != -1){
                //         this.children[i].Show();
                //    }else{
                //         this.children[i].Show(this.object);
                //    }    
                this.children[i].Show(this.object);
            }
            this.RenderDataSource();
        };
        ;
        return AppBar;
    }(FrameWork));
    MaterialDesign2.AppBar = AppBar;
    var Tabs = /** @class */ (function (_super) {
        __extends(Tabs, _super);
        function Tabs(param) {
            return _super.call(this, param, "Tabs") || this;
        }
        Tabs.prototype.Refresh = function () {
            this.Clear();
            var html = "\n            <div class=\"mdc-tab-bar\" role=\"tablist\">\n            <div class=\"mdc-tab-scroller\">\n              <div class=\"mdc-tab-scroller__scroll-area\">\n                <div class=\"mdc-tab-scroller__scroll-content\">\n                  <button class=\"mdc-tab mdc-tab--active\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">\n                    <span class=\"mdc-tab__content\">\n                      <span class=\"mdc-tab__icon material-icons\" aria-hidden=\"true\">favorite</span>\n                      <span class=\"mdc-tab__text-label\">Favorites</span>\n                    </span>\n                    <span class=\"mdc-tab-indicator mdc-tab-indicator--active\">\n                      <span class=\"mdc-tab-indicator__content mdc-tab-indicator__content--underline\"></span>\n                    </span>\n                    <span class=\"mdc-tab__ripple\"></span>\n                  </button>\n                  <button class=\"mdc-tab \" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">\n                  <span class=\"mdc-tab__content\">\n                    <span class=\"mdc-tab__icon material-icons\" aria-hidden=\"true\">add</span>\n                    <span class=\"mdc-tab__text-label\">add</span>\n                  </span>\n                  <span class=\"mdc-tab-indicator \">\n                    <span class=\"mdc-tab-indicator__content mdc-tab-indicator__content--underline\"></span>\n                  </span>\n                  <span class=\"mdc-tab__ripple\"></span>\n                </button>\n                </div>\n              </div>\n            </div>\n          </div>\n            ";
            this.object.innerHTML = html;
            var tabBar = new window.mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
            console.log(tabBar);
            this.RenderChildren();
            this.Events();
        };
        return Tabs;
    }(FrameWork));
    MaterialDesign2.Tabs = Tabs;
    var ToolTips = /** @class */ (function (_super) {
        __extends(ToolTips, _super);
        function ToolTips(param) {
            return _super.call(this, param, "ToolTips") || this;
        }
        ToolTips.prototype.Refresh = function () {
            this.Clear();
            var html = "\n            <div class=\"mdc-tooltip-wrapper--rich\">\n            <button class=\"mdc-button\" data-tooltip-id=\"tt0\" aria-haspopup=\"dialog\" aria-expanded=\"false\">\n              <div class=\"mdc-button__ripple\"></div>\n              <span class=\"mdc-button__label\">Button</span>\n            </button>\n            <div id=\"tt0\" class=\"mdc-tooltip mdc-tooltip--rich\" aria-hidden=\"true\" role=\"dialog\">\n               <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">\n                  <h2 class=\"mdc-tooltip__title\"> Lorem Ipsum </h2>\n                  <p class=\"mdc-tooltip__content\">\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur\n                    pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum\n                    aliquam sit amet sit amet eros.\n                    <a class=\"mdc-tooltip__content-link\" href=\"google.com\">link</a>\n                  </p>\n                  <div class=\"mdc-tooltip--rich-actions\">\n                     <button class=\"mdc-tooltip__action\" aria-label=\"action\">\n                        action\n                     </button>\n                  </div>\n               </div>\n            </div>\n          </div>\n            ";
            this.object.innerHTML = html;
            var tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            console.log(tabBar);
            this.RenderChildren();
            this.Events();
        };
        return ToolTips;
    }(FrameWork));
    MaterialDesign2.ToolTips = ToolTips;
    var Switches = /** @class */ (function (_super) {
        __extends(Switches, _super);
        function Switches(param) {
            return _super.call(this, param, "switch") || this;
        }
        Switches.prototype.Refresh = function () {
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
            var html = "\n        <button id=\"selected-switch\" class=\"mdc-switch mdc-switch--selected\" type=\"button\" role=\"switch\" aria-checked=\"true\">\n        <div class=\"mdc-switch__track\"></div>\n        <div class=\"mdc-switch__handle-track\">\n          <div class=\"mdc-switch__handle\">\n            <div class=\"mdc-switch__shadow\">\n              <div class=\"mdc-elevation-overlay\"></div>\n            </div>\n            <div class=\"mdc-switch__ripple\"></div>\n            <div class=\"mdc-switch__icons\">\n              <svg class=\"mdc-switch__icon mdc-switch__icon--on\" viewBox=\"0 0 24 24\">\n                <path d=\"M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z\" />\n              </svg>\n              <svg class=\"mdc-switch__icon mdc-switch__icon--off\" viewBox=\"0 0 24 24\">\n                <path d=\"M20 13H4v-2h16v2z\" />\n              </svg>\n            </div>\n          </div>\n        </div>\n      </button>\n      <label for=\"selected-switch\">off/on</label>\n            ";
            this.object.innerHTML = html;
            // const tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            // console.log(tabBar);
            var sangpi = document.querySelectorAll('.mdc-switch');
            // for (const el in sangpi) {
            //     const switchControl = new window.mdc.switchControl.MDCSwitch(el);
            //   }
            var switchcontrol = new window.mdc.switchControl.MDCSwitch(document.querySelector('.mdc-switch'));
            this.RenderChildren();
            this.Events();
        };
        return Switches;
    }(FrameWork));
    MaterialDesign2.Switches = Switches;
    var SnackBar = /** @class */ (function (_super) {
        __extends(SnackBar, _super);
        function SnackBar(param) {
            return _super.call(this, param, "switch") || this;
        }
        SnackBar.prototype.Refresh = function () {
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
            var html = "\n        <aside class=\"mdc-snackbar\">\n        <div class=\"mdc-snackbar__surface\" role=\"status\" aria-relevant=\"additions\">\n          <div class=\"mdc-snackbar__label\" aria-atomic=\"false\">\n            Can't send photo. Retry in 5 seconds.\n          </div>\n          <div class=\"mdc-snackbar__actions\" aria-atomic=\"true\">\n            <button type=\"button\" class=\"mdc-button mdc-snackbar__action\">\n              <div class=\"mdc-button__ripple\"></div>\n              <span class=\"mdc-button__label\">Retry</span>\n            </button>\n          </div>\n        </div>\n      </aside>\n            ";
            this.object.innerHTML = html;
            // const tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            // console.log(tabBar);
            //let sangpi = document.querySelectorAll('.mdc-switch');
            // for (const el in sangpi) {
            //     const switchControl = new window.mdc.switchControl.MDCSwitch(el);
            //   }
            var snackbar = new window.mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
            snackbar.open();
            this.RenderChildren();
            this.Events();
        };
        return SnackBar;
    }(FrameWork));
    MaterialDesign2.SnackBar = SnackBar;
    var Sliders = /** @class */ (function (_super) {
        __extends(Sliders, _super);
        function Sliders(param) {
            return _super.call(this, param, "switch") || this;
        }
        Sliders.prototype.Refresh = function () {
            this.Clear();
            var html = "\n        <div class=\"mdc-slider\">\n        <input class=\"mdc-slider__input\" type=\"range\" min=\"0\" max=\"100\" value=\"50\" name=\"volume\" aria-label=\"Continuous slider demo\">\n        <div class=\"mdc-slider__track\">\n          <div class=\"mdc-slider__track--inactive\"></div>\n          <div class=\"mdc-slider__track--active\">\n            <div class=\"mdc-slider__track--active_fill\"></div>\n          </div>\n        </div>\n        <div class=\"mdc-slider__thumb\">\n          <div class=\"mdc-slider__thumb-knob\"></div>\n        </div>\n      </div>\n            ";
            this.object.innerHTML = html;
            // const tabBar = new window.mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
            // console.log(tabBar);
            //let sangpi = document.querySelectorAll('.mdc-switch');
            // for (const el in sangpi) {
            //     const switchControl = new window.mdc.switchControl.MDCSwitch(el);
            //   }
            var slider = new window.mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
            this.RenderChildren();
            this.Events();
        };
        return Sliders;
    }(FrameWork));
    MaterialDesign2.Sliders = Sliders;
    var NavDrawer = /** @class */ (function (_super) {
        __extends(NavDrawer, _super);
        function NavDrawer(param) {
            return _super.call(this, param, "navDrawer") || this;
        }
        NavDrawer.prototype.Refresh = function () {
            var _a, _b;
            this.Clear();
            var html = "<aside class=\"mdc-drawer mdc-drawer--modal mdc-drawer-full-height\">\n            <div class=\"mdc-drawer__header drawer-header\">\n                <div class=\"drawer-header-close\">&#10006;</div>\n                <img class=\"avatar\" alt=\"Avatar\" src=\"".concat(this.headerImage, "\"/>\n                <div class=\"mdc-drawer-text-group\">\n                    <h3 class=\"mdc-drawer__title\">").concat((_a = this.headerName) !== null && _a !== void 0 ? _a : "Name", "</h3>\n                    <h6 class=\"mdc-drawer__subtitle\">").concat((_b = this.headerEmail) !== null && _b !== void 0 ? _b : "Email", "</h6> \n                </div>\n            </div>        \n            <div class=\"mdc-drawer__content\">\n            <hr class=\"mdc-list-divider\">\n                <nav class=\"mdc-list drawer-action-list\"></nav>\n            </div>\n            </aside>\n            <div class=\"mdc-drawer-scrim\"></div>");
            this.object.innerHTML = html;
            //const listEl = document.querySelector('.mdc-drawer .mdc-list');
            // const list = window.mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
            // list.wrapFocus = true;
            var drawer = window.mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
            // console.log(drawer);
            // drawer.focusTrap = true;
            // const listEl = document.querySelector('#st');
            // const mainContentEl = document.querySelector('.main-content');
            // listEl.addEventListener('click', (event) => {                
            //     drawer.open = !drawer.open;
            // });
            var btn = this.object.parentNode.querySelector('#app-action');
            btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function (event) {
                drawer.open = !drawer.open;
            });
            var btnClose = this.object.querySelector('.drawer-header-close');
            btnClose.addEventListener('click', function (event) {
                drawer.open = false;
            });
            document.body.addEventListener('MDCDrawer:closed', function () {
            });
            this.RenderChildren();
            //this.Events();
        };
        NavDrawer.prototype.RenderChildren = function () {
            var lst = this.object.querySelector('.drawer-action-list');
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].Show(lst);
            }
            this.RenderDataSource();
        };
        return NavDrawer;
    }(FrameWork));
    MaterialDesign2.NavDrawer = NavDrawer;
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu(param) {
            return _super.call(this, param, "menu") || this;
        }
        Menu.prototype.Refresh = function () {
            this.Clear();
            var html = "      \n        <div class=\"mdc-menu mdc-menu-surface\" id=\"demo-menu\">\n        <ul class=\"mdc-list\" role=\"menu\" aria-hidden=\"true\" aria-orientation=\"vertical\" tabindex=\"-1\">\n          <li>\n            <ul class=\"mdc-menu__selection-group\">\n              <li class=\"mdc-list-item\" role=\"menuitem\">\n                <span class=\"mdc-list-item__ripple\"></span>\n                <span class=\"mdc-list-item__graphic mdc-menu__selection-group-icon\">\n                  ...\n                </span>\n                <span class=\"mdc-list-item__text\">Single</span>\n              </li>\n              <li class=\"mdc-list-item\" role=\"menuitem\">\n                <span class=\"mdc-list-item__ripple\"></span>\n                <span class=\"mdc-list-item__graphic mdc-menu__selection-group-icon\">\n                 ...\n                </span>\n                <span class=\"mdc-list-item__text\">1.15</span>\n              </li>\n            </ul>\n          </li>\n          <li class=\"mdc-list-divider\" role=\"separator\"></li>\n          <li class=\"mdc-list-item\" role=\"menuitem\">\n            <span class=\"mdc-list-item__ripple\"></span>\n            <span class=\"mdc-list-item__text\">Add space before paragraph</span>\n          </li>\n          ...\n        </ul>\n      </div>    \n            ";
            this.object.innerHTML = html;
            var menu = new window.mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));
            menu.open = true;
            this.RenderChildren();
            this.Events();
        };
        return Menu;
    }(FrameWork));
    MaterialDesign2.Menu = Menu;
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(param) {
            return _super.call(this, param, "list") || this;
        }
        List.prototype.Refresh = function () {
            this.Clear();
            var html = "  \n        <ul class=\"mdc-list\">\n        <li class=\"mdc-list-item\" tabindex=\"0\">\n          <span class=\"mdc-list-item__ripple\"></span>\n          <span class=\"mdc-list-item__text\">Item 1 - Division 1</span>\n        </li>\n        <li class=\"mdc-list-item\">\n          <span class=\"mdc-list-item__ripple\"></span>\n          <span class=\"mdc-list-item__text\">Item 2 - Division 1</span>\n        </li>\n        <li role=\"separator\" class=\"mdc-list-divider\"></li>\n        <li class=\"mdc-list-item\">\n          <span class=\"mdc-list-item__ripple\"></span>\n          <span class=\"mdc-list-item__text\">Item 1 - Division 2</span>\n        </li>\n        <li class=\"mdc-list-item\">\n          <span class=\"mdc-list-item__ripple\"></span>\n          <span class=\"mdc-list-item__text\">Item 2 - Division 2</span>\n        </li>\n      </ul>\n            ";
            this.object.innerHTML = html;
            var lis = new window.mdc.list.MDCList(document.querySelector('.mdc-list'));
            this.RenderChildren();
            this.Events();
        };
        return List;
    }(FrameWork));
    MaterialDesign2.List = List;
    var Chips = /** @class */ (function (_super) {
        __extends(Chips, _super);
        function Chips(param) {
            return _super.call(this, param, "chips") || this;
        }
        Chips.prototype.Refresh = function () {
            this.Clear();
            var html = "  \n        <span class=\"mdc-evolution-chip-set\" role=\"grid\">\n        <span class=\"mdc-evolution-chip-set__chips\" role=\"presentation\">\n          <span class=\"mdc-evolution-chip\" role=\"row\" id=\"c0\">\n            <span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\" role=\"gridcell\">\n              <button class=\"mdc-evolution-chip__action mdc-evolution-chip__action--primary\" type=\"button\" tabindex=\"0\">\n                <span class=\"mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary\"></span>\n                <span class=\"mdc-evolution-chip__text-label\">Chip one</span>\n              </button>\n            </span>\n          </span>\n          <span class=\"mdc-evolution-chip\" role=\"row\" id=\"c1\">\n            <span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\" role=\"gridcell\">\n              <button class=\"mdc-evolution-chip__action mdc-evolution-chip__action--primary\" type=\"button\" tabindex=\"-1\">\n                <span class=\"mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary\"></span>\n                <span class=\"mdc-evolution-chip__text-label\">Chip two</span>\n              </button>\n            </span>\n          </span>\n        </span>\n      </span>\n            ";
            this.object.innerHTML = html;
            var chip = new window.mdc.chips.MDCChipSet(document.querySelector('.mdc-evolution-chip-set'));
            this.RenderChildren();
            this.Events();
        };
        return Chips;
    }(FrameWork));
    MaterialDesign2.Chips = Chips;
})(MaterialDesign2 || (MaterialDesign2 = {}));
//# sourceMappingURL=framework.js.map