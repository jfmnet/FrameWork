class XWind {
    Show(): void {
        let app = new MaterialDesign2.AppBar({ text: "XWind" });
        let canvas: Canvas3D;

        let select = new MaterialDesign2.Button({ icon: "ads_click" });
        select.type = MaterialDesign2.ButtonType.APPBAR;
        select.onclick = ()=> {
            alert(1);
        };

        app.buttons.push(select);

        let draw = new MaterialDesign2.Button({ icon: "polyline" });
        draw.type = MaterialDesign2.ButtonType.APPBAR;
        draw.onclick = ()=> {
            canvas.draw = CanvasDraw.Line;
        };

        app.buttons.push(draw);

        let poly = new MaterialDesign2.Button({ icon: "change_history" });
        poly.type = MaterialDesign2.ButtonType.APPBAR;
        poly.onclick = ()=> {
            canvas.draw = CanvasDraw.Triangle;
        };

        app.buttons.push(poly);

        canvas = app.Add(new Canvas3D()) as Canvas3D;
        canvas.settings.allowvr = true;
        canvas.settings.allowdraw = false;
        app.Show();
    }
}