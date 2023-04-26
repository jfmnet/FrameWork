var XWind = /** @class */ (function () {
    function XWind() {
    }
    XWind.prototype.Show = function () {
        var app = new MaterialDesign2.AppBar({ text: "XWind" });
        var canvas;
        var select = new MaterialDesign2.Button({ icon: "ads_click" });
        select.type = MaterialDesign2.ButtonType.APPBAR;
        select.onclick = function () {
            alert(1);
        };
        app.buttons.push(select);
        var draw = new MaterialDesign2.Button({ icon: "polyline" });
        draw.type = MaterialDesign2.ButtonType.APPBAR;
        draw.onclick = function () {
            canvas.draw = CanvasDraw.Line;
        };
        app.buttons.push(draw);
        var poly = new MaterialDesign2.Button({ icon: "change_history" });
        poly.type = MaterialDesign2.ButtonType.APPBAR;
        poly.onclick = function () {
            canvas.draw = CanvasDraw.Triangle;
        };
        app.buttons.push(poly);
        canvas = app.Add(new Canvas3D());
        canvas.settings.allowvr = true;
        canvas.settings.allowdraw = false;
        app.Show();
    };
    return XWind;
}());
//# sourceMappingURL=xwind.js.map