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
var Canvas2DSettings = /** @class */ (function () {
    function Canvas2DSettings() {
    }
    Canvas2DSettings.prototype.LightTheme = function () {
    };
    Canvas2DSettings.prototype.DarkTheme = function () {
    };
    return Canvas2DSettings;
}());
var Canvas2D = /** @class */ (function (_super) {
    __extends(Canvas2D, _super);
    function Canvas2D() {
        var _this = _super.call(this) || this;
        _this.settings = new Canvas2DSettings();
        var self = _this;
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (_a) {
            var matches = _a.matches;
            if (FrameWork.theme === Theme.LIGHT)
                _this.settings.LightTheme();
            else if (FrameWork.theme === Theme.DARK)
                _this.settings.DarkTheme();
            else if (FrameWork.theme === Theme.SYSTEM) {
                if (matches)
                    _this.settings.DarkTheme();
                else
                    _this.settings.LightTheme();
            }
            self.Render();
        });
        return _this;
    }
    Canvas2D.prototype.Refresh = function () {
        var self = this;
        this.Clear();
        //Canvas and context
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("tabindex", "1");
        this.context = this.canvas.getContext('2d');
        //Add canvas to dom
        this.object.appendChild(this.canvas);
        //Mouse
        //this.mouse = new XMouse(this);
        this.Resize();
        this.Events();
        //this.ShowToolbar();
        this.RefreshChildren();
        //Subscribe to the resize event
        window.addEventListener("resize", function () {
            self.Resize();
            self.ZoomAll();
        });
    };
    Canvas2D.prototype.Resize = function () {
    };
    Canvas2D.prototype.Render = function () {
    };
    Canvas2D.prototype.ZoomAll = function () {
    };
    return Canvas2D;
}(FrameWork));
//# sourceMappingURL=canvas2d.js.map