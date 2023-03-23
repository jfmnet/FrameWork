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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
                        input.addEventListener('input', function () {
                            self_4.value = this.value;
                            if (self_4.onchange)
                                self_4.onchange(self_4);
                        });
                        break;
                }
            }
        };
        ;
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
        };
        return Button;
    }(FrameWork));
    MaterialDesign2.Button = Button;
    var Cards = /** @class */ (function (_super) {
        __extends(Cards, _super);
        function Cards(param) {
            return _super.call(this, param, "button") || this;
        }
        Cards.prototype.Refresh = function () {
            this.Clear();
            var html = "\n            <div class=\"mdc-card\">\n                <div class=\"mdc-card__primary-action\">\n                    <div class=\"mdc-card__media mdc-card__media--square\">\n                        <div class=\"mdc-card__media-content\">".concat(this.text, "</div>\n                    </div>\n                    <div class=\"mdc-card__ripple\"></div>\n                </div>\n                <div class=\"mdc-card__actions\">\n                    <div class=\"mdc-card__action-buttons\">\n                    <button class=\"mdc-button mdc-card__action mdc-card__action--button\">\n                        <div class=\"mdc-button__ripple\"></div>\n                        <span class=\"mdc-button__label\">Action 1</span>\n                    </button>\n                    <button class=\"mdc-button mdc-card__action mdc-card__action--button\">\n                        <div class=\"mdc-button__ripple\"></div>\n                        <span class=\"mdc-button__label\">Action 2</span>\n                    </button>\n                    </div>\n                    <div class=\"mdc-card__action-icons\">\n                    <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\" title=\"Share\">share</button>\n                    <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\" title=\"More options\">more_vert</button>\n                    </div>\n                </div>\n            </div>\n            ");
            this.object.innerHTML = html;
            this.contents = this.object.querySelector("");
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
})(MaterialDesign2 || (MaterialDesign2 = {}));
//# sourceMappingURL=framework.js.map