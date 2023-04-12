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
        // let txtName = new MaterialDesign2.TextField({id: "txtName", text:"write your name"});
        // txtName.type = MaterialDesign2.TextFieldType.OUTLINE;
        // let txtCourse = new MaterialDesign2.TextField({id: "txtCourse", text:"write your course"});
        // txtCourse.type = MaterialDesign2.TextFieldType.OUTLINE;
        // let txtPassword = new MaterialDesign2.Password({id: "txtPass", text:"password"});
        // txtPassword.type = MaterialDesign2.InputType.OUTLINE;
        // let rdMale = new MaterialDesign2.Radio({ text:"Male", value: "male", id:"rdmal", name:"gender"});
        // let rdFemale = new MaterialDesign2.Radio({text:"Female", value:"female", id:"rdfe", name:"gender"});
        // let checkBook = new MaterialDesign2.CheckBox({id:"ckdBook", text:"Book"});
        // let checkSport = new MaterialDesign2.CheckBox({id:"ckSport", text:"Sport"});
        // let txtArea = new MaterialDesign2.TextArea({id: "txtArea", rownum: 4, colsnum: 22, maxCount: 50, text: "enter your story"}); 
        // let Floatbutton = new MaterialDesign2.FloatingButton({icon:"add"});  
        // Floatbutton.type = MaterialDesign2.FloatButtonType.MINI;
        // let container = new FrameWork.Container();   
        // container.classes.push("center");     
        // container.Add(txtName);
        // container.Add(txtCourse);
        // container.Add(txtPassword);
        // container.Add(rdMale);
        // container.Add(rdFemale);
        // container.Add(checkBook);
        // container.Add(checkSport);
        // container.Add(txtArea);
        // container.Add(Floatbutton);      
        // container.Show()
        var appbar = new MaterialDesign2.AppBar();
        var btnTest = new MaterialDesign2.Button({ text: "Index", icon: "home" });
        var drawer = new MaterialDesign2.NavDrawer();
        drawer.headerEmail = 'bsangpi@ait.asia';
        drawer.headerName = 'Mr. Biak Nei ';
        drawer.headerImage = 'https://th.bing.com/th/id/OIP.AA5M9TpxmIwgFwQKmdZ2jQHaLH?pid=ImgDet&rs=1';
        drawer.Add(btnTest);
        appbar.Add(drawer);
        //appbar.addAction();
        appbar.Show();
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