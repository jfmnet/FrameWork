var Demo = /** @class */ (function () {
    function Demo() {
    }
    Demo.prototype.Show = function () {
        //this.Show3D();
        this.Tree();
        //this.Menu();
        //this.Input();
        //this.MaterialDesign2();
    };
    Demo.prototype.Show3D = function () {
        // let app = new MaterialDesign2.AppBar({ text: "XWind" });
        // let canvas: Canvas3D;
        // let select = new MaterialDesign2.Button({ icon: "ads_click"});
        // select.type = MaterialDesign2.ButtonType.APPBAR;
        // select.tooltip = "OK";
        // select.onclick = ()=> {
        //     let dia = new MaterialDesign2.Dialogs({text:"are you sure to process?"});
        //     dia.title = "Confirmation";
        //     dia.showCancel = false;
        //     dia.labelOk = "Process";
        //     dia.onclick = function(){
        //         console.log("okk");
        //     };
        //     dia.Show();
        // };
        // let drawer = new MaterialDesign2.NavDrawer();
        // drawer.headerEmail = 'bsangpi@ait.asia';
        // drawer.headerName = 'Biak Nei sang';
        // drawer.headerImage = 'https://th.bing.com/th/id/OIP.AA5M9TpxmIwgFwQKmdZ2jQHaLH?pid=ImgDet&rs=1';
        // let btnTest = new MaterialDesign2.Anchor({text: "Index", icon: "search"});  
        // btnTest.link = "https://sbcode.net/threejs/loaders-fbx/";
        // //btnTest.link = "https://www.w3schools.com/";
        // let btnHome = new MaterialDesign2.Anchor({text:"Home", icon:"home"});
        // drawer.Add(btnTest);
        // drawer.Add(btnHome);
        // app.drawer = drawer;
        // app.buttons.push(select);
        // let draw = new MaterialDesign2.Button({ icon: "draw"});
        // draw.type = MaterialDesign2.ButtonType.APPBAR;
        // draw.tooltip = "lian";
        // draw.onclick = ()=> {
        //     alert(1);
        // };
        // app.buttons.push(draw);
        // let drawONE = new MaterialDesign2.Button({ icon: "draw"});
        // drawONE.type = MaterialDesign2.ButtonType.APPBAR;
        // drawONE.tooltip = "lian";
        // drawONE.onclick = ()=> {
        //     alert(1);
        // };
        // app.buttons.push(drawONE);
        // // let test = new MaterialDesign2.Button({ icon: "draw" });
        // // test.type = MaterialDesign2.ButtonType.OUTLINED;
        // // test.tooltip = "draw";
        // // app.Add(test);
        // let test = new MaterialDesign2.ToolTips({icon:"favorite"});
        // test.tooltip = "sn";
        // let con1 = new FrameWork.Container();
        // con1.Add(test);
        // app.Add(con1);
        // // let test2 = new MaterialDesign2.ToolTips({icon: "search"});
        // // test2.tooltip = "sn2";
        // // let con2 = new FrameWork.Container();
        // // con2.Add(test2);
        // // app.Add(con2);
        // //canvas = app.Add(new Canvas3D()) as Canvas3D;
        // app.Show();
        var splitter = new FrameWork.SplitContainer();
        splitter.size = [300];
        //Inner splitter
        var leftsplit = new FrameWork.SplitContainer();
        leftsplit.orientation = ORIENTATION.VERTICAL;
        leftsplit.Add(new MaterialDesign2.Button({ text: "Click Me" }));
        splitter.Add(leftsplit);
        splitter.Show();
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
        var app = new MaterialDesign2.AppBar({ text: "XWind" });
        var canvas;
        // let select = new MaterialDesign2.Button({ icon: "ads_click" });
        // select.type = MaterialDesign2.ButtonType.APPBAR;
        // select.onclick = ()=> {
        //     alert(1);
        // };
        // app.buttons.push(select);
        // let draw = new MaterialDesign2.Button({ icon: "draw" });
        // draw.type = MaterialDesign2.ButtonType.APPBAR;
        // let dia = new MaterialDesign2.Dialogs({text: "Are you sure to process it?"});
        // dia.title = "confirmation";
        // dia.showCancel = true;
        // dia.onclick = function(e) {
        //     console.log("AIT Solutions...");            
        // }
        // draw.onclick = ()=> {          
        //     dia.Show();
        // };
        // app.buttons.push(draw);
        // canvas = app.Add(new Canvas3D()) as Canvas3D;
        // let drawer = new MaterialDesign2.NavDrawer();
        // drawer.headerEmail = 'bsangpi@ait.asia';
        // drawer.headerName = 'Biak Nei sang';
        // drawer.headerImage = 'https://th.bing.com/th/id/OIP.AA5M9TpxmIwgFwQKmdZ2jQHaLH?pid=ImgDet&rs=1';
        // let btnTest = new MaterialDesign2.Anchor({text: "Index", icon: "search"});  
        // btnTest.link = "https://sbcode.net/threejs/loaders-fbx/";
        // //btnTest.link = "https://www.w3schools.com/";
        // let btnHome = new MaterialDesign2.Anchor({text:"Home", icon:"home"});
        // drawer.Add(btnTest);
        // drawer.Add(btnHome);
        // //app.Add(drawer);
        // let btn = new MaterialDesign2.Button({icon: "search"});
        // btn.type = MaterialDesign2.ButtonType.OUTLINED;
        // btn.tooltip = "look";
        // btn.Show();
        // app.buttons.push(btn);
        // app.Show();
        // let tooltip = new MaterialDesign2.ToolTips({});
        // tooltip.Show();
        // let menu = new MaterialDesign2.SnackBar({text:"we are not the same."})
        // menu.Show();
        // let chip = new MaterialDesign2.Chips();
        // chip.Show();
        // let tooltip = new MaterialDesign2.ToolTips();
        // tooltip.Show();
        var test = new MaterialDesign2.Button({ icon: "draw" });
        test.type = MaterialDesign2.ButtonType.OUTLINED;
        test.tooltip = "draw";
        test.Show();
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