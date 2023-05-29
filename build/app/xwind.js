var XWind = /** @class */ (function () {
    function XWind() {
    }
    XWind.prototype.Show = function () {
        var menu = new FrameWork.RibbonMenuContainer();
        var file = menu.Add(new FrameWork.RibbonMenu({ text: "File" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));
        file.Add(new FrameWork.RibbonLargeButton({ icon: "account", text: "New Project" }));
        var design = menu.Add(new FrameWork.RibbonMenu({ text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        design.Add(new FrameWork.RibbonLargeButton({ icon: "folder", text: "Design" }));
        menu.Show();
    };
    return XWind;
}());
//# sourceMappingURL=xwind.js.map