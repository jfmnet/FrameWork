var Demo = /** @class */ (function () {
    function Demo() {
    }
    Demo.prototype.Show = function () {
        //this.Show3D();
        //this.Tree();
        //this.Menu();
        //this.Input();
        this.MaterialDesign2();
    };
    Demo.prototype.Show3D = function () {
        var app = new MaterialDesign2.AppBar({ text: "XWind" });
        var canvas;
        var select = new MaterialDesign2.Button({ icon: "ads_click" });
        select.type = MaterialDesign2.ButtonType.APPBAR;
        select.onclick = function () {
            alert(1);
        };
        app.buttons.push(select);
        var draw = new MaterialDesign2.Button({ icon: "draw" });
        draw.type = MaterialDesign2.ButtonType.APPBAR;
        draw.onclick = function () {
            alert(1);
        };
        app.buttons.push(draw);
        canvas = app.Add(new Canvas3D());
        app.Show();
    };
    Demo.prototype.Tree = function () {
        var tree = new FrameWork.TreeContainer();
        var parent1 = tree.Add(new FrameWork.TreeNode({ text: "Parent 1" }));
        var parent2 = tree.Add(new FrameWork.TreeNode({ text: "Parent 2" }));
        var parent3 = tree.Add(new FrameWork.TreeNode({ text: "Parent 3" }));
        var parent4 = tree.Add(new FrameWork.TreeNode({ text: "Parent 4" }));
        var child1 = parent1.Add(new FrameWork.TreeNode({ text: "Child 1" }));
        var child2 = parent1.Add(new FrameWork.TreeNode({ text: "Child 2" }));
        var child3 = parent1.Add(new FrameWork.TreeNode({ text: "Child 3" }));
        var child4 = parent1.Add(new FrameWork.TreeNode({ text: "Child 4" }));
        var child11 = child1.Add(new FrameWork.TreeNode({ text: "Child 11" }));
        tree.Show();
    };
    Demo.prototype.Menu = function () {
        var tree = new FrameWork.MenuContainer();
        var parent1 = tree.Add(new FrameWork.Menu({ text: "Menu 1" }));
        var parent2 = tree.Add(new FrameWork.Menu({ text: "Menu 2" }));
        var parent3 = tree.Add(new FrameWork.Menu({ text: "Menu 3" }));
        var parent4 = tree.Add(new FrameWork.Menu({ text: "Menu 4" }));
        var child1 = parent1.Add(new FrameWork.Menu({ text: "Child 1" }));
        var child2 = parent1.Add(new FrameWork.Menu({ text: "Child 2" }));
        var child3 = parent1.Add(new FrameWork.Menu({ text: "Child 3" }));
        var child4 = parent1.Add(new FrameWork.Menu({ text: "Child 4" }));
        var child11 = child1.Add(new FrameWork.Menu({ text: "Child 11" }));
        tree.Show();
    };
    Demo.prototype.Input = function () {
        var data = new InputData();
        var container = new FrameWork.Container();
        container.AddDataSource(data);
        container.Show();
    };
    Demo.prototype.MaterialDesign2 = function () {
        var app = new MaterialDesign2.AppBar({ text: "XWind demo" });
        //adding appbar button
        var select = new MaterialDesign2.Button({ icon: "ads_click", text: 'open model file' }); //Appbar button type, text will be tooltip
        select.type = MaterialDesign2.ButtonType.APPBAR;
        select.onclick = function () {
            alert("open model");
        };
        var draw = new MaterialDesign2.Button({ icon: "draw", text: "drawer" });
        draw.type = MaterialDesign2.ButtonType.APPBAR;
        draw.onclick = function () {
            var dia = new MaterialDesign2.Dialogs({ text: "Are you sure to draw it?" });
            dia.title = "Confirmation";
            dia.onclick = function () {
                console.log("some process");
            };
            dia.showCancel = false;
            dia.Show();
        };
        app.buttons.push(select);
        app.buttons.push(draw);
        /* adding drawer */
        var drawer = new MaterialDesign2.NavDrawer();
        drawer.headerEmail = 'bsangpi@ait.asia';
        drawer.headerName = 'Mr. Sang pi';
        drawer.headerImage = 'https://th.bing.com/th/id/OIP.AA5M9TpxmIwgFwQKmdZ2jQHaLH?pid=ImgDet&rs=1';
        var btnW3 = new MaterialDesign2.Anchor({ text: "Home", icon: 'home' });
        btnW3.link = 'https://www.w3schools.com/';
        drawer.Add(btnW3);
        var btnSerach = new MaterialDesign2.Anchor({ text: "Search", icon: 'search' });
        btnSerach.link = 'https://www.google.com/';
        drawer.Add(btnSerach);
        app.drawer = drawer;
        app.Show();
        /*  tab bar demo */
        var tab = new MaterialDesign2.Tabs();
        //tabBar Button
        var btnTab1 = new MaterialDesign2.Button({ text: "Add", icon: "add" });
        btnTab1.type = MaterialDesign2.ButtonType.TABBAR;
        btnTab1.isActive = true;
        tab.buttons.push(btnTab1);
        var btnTab2 = new MaterialDesign2.Button({ text: "Favorite", icon: "favorite" });
        btnTab2.type = MaterialDesign2.ButtonType.TABBAR;
        tab.buttons.push(btnTab2);
        // tab content
        var container1 = new FrameWork.Container();
        container1.Add(new MaterialDesign2.Button({ text: "Tab 1 Content Adding" }));
        tab.Add(container1);
        var container2 = new FrameWork.Container();
        container2.Add(new MaterialDesign2.Button({ text: "Tab 2 Content Favorite" }));
        tab.Add(container2);
        //tab.Show();
    };
    return Demo;
}());
var InputData = /** @class */ (function () {
    function InputData() {
        this.name = new FrameWork.InputString("Name", "Hello World");
        this.age = new FrameWork.InputNumber("Age", 6);
        this.button = new FrameWork.InputButton("Submit", 'Click me');
        this.checkBox = new FrameWork.InputCheckBox("Gender", "Male");
        this.color = new FrameWork.InputColor("myColor", "red");
        this.date = new FrameWork.InputDate("Choose Date", "my-local-date");
        this.dateTime = new FrameWork.InputDateTime("choose Datetime", 'dt');
        this.email = new FrameWork.InputEmail("Email", 'dt@ait.asia');
        this.file = new FrameWork.InputFile("Choose File", null);
        this.hidden = new FrameWork.InputHidden("my secret", "lianu");
        this.image = new FrameWork.InputImage("my image", "photo");
        this.month = new FrameWork.InputMonth("choose month", "January");
        this.password = new FrameWork.InputPassword("Password", "lianu");
        this.radio = new FrameWork.InputRadio("Exam", null);
        this.range = new FrameWork.InputRange("5-3", "baby");
        this.reset = new FrameWork.InputReset("Reset", "testing button");
        this.search = new FrameWork.InputSearch("Search", "search my norch");
        this.submit = new FrameWork.InputSubmit("submit", "submit button", function () { alert('ok'); });
        this.telephone = new FrameWork.InputTelehone("Phone", "0934188674");
        this.time = new FrameWork.InputTime("choose Time", "my time zone");
        this.url = new FrameWork.InputUrl("URl", "Event Url");
        this.week = new FrameWork.InputWeek("week", "my week");
    }
    return InputData;
}());
//# sourceMappingURL=demo.js.map