class XWind {
    Show(): void {
        let menu = new FrameWork.RibbonMenuContainer();
        let file = menu.Add(new FrameWork.RibbonMenu({ text: "File" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));

        let design = menu.Add(new FrameWork.RibbonMenu({ text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));

        menu.Show();
    }

    // let app = new MaterialDesign2.AppBar({ text: "XWind" });
    // let canvas: Canvas3D;

    // let select = new MaterialDesign2.Button({ icon: "ads_click" });
    // select.type = MaterialDesign2.ButtonType.APPBAR;
    // select.onclick = ()=> {
    //     alert(1);
    // };

    // app.buttons.push(select);

    // let draw = new MaterialDesign2.Button({ icon: "polyline" });
    // draw.type = MaterialDesign2.ButtonType.APPBAR;
    // draw.onclick = ()=> {
    //     canvas.draw = CanvasDraw.Line;
    // };

    // app.buttons.push(draw);

    // let poly = new MaterialDesign2.Button({ icon: "change_history" });
    // poly.type = MaterialDesign2.ButtonType.APPBAR;
    // poly.onclick = ()=> {
    //     canvas.draw = CanvasDraw.Triangle;
    // };

    // app.buttons.push(poly);

    // Show(): void {
    //     let canvas = new Canvas3D();
    //     canvas.settings.allowvr = false;
    //     canvas.settings.allowdraw = true;
    //     canvas.Show();
    //}
}