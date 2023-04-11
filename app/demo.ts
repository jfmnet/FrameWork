class Demo {
    Show(): void {
        this.Show3D();

        //this.Tree();
        //this.Menu();
        //this.Input();
        //this.MaterialDesign2();
    }

    Show3D(): void {
        let app = new MaterialDesign2.AppBar({ text: "XWind" });
        let canvas: Canvas3D;

        let select = new MaterialDesign2.Button({ icon: "ads_click" });
        select.type = MaterialDesign2.ButtonType.APPBAR;
        select.onclick = ()=> {
            alert(1);
        };

        app.buttons.push(select);

        let draw = new MaterialDesign2.Button({ icon: "draw" });
        draw.type = MaterialDesign2.ButtonType.APPBAR;
        draw.onclick = ()=> {
            alert(1);
        };

        app.buttons.push(draw);

        canvas = app.Add(new Canvas3D()) as Canvas3D;
        app.Show();
    }

    Tree(): void {
        let tree = new FrameWork.TreeContainer();
        let parent1 = tree.Add(new FrameWork.TreeNode({ text: "Parent 1" })) as FrameWork.TreeNode;
        let parent2 = tree.Add(new FrameWork.TreeNode({ text: "Parent 2" })) as FrameWork.TreeNode;
        let parent3 = tree.Add(new FrameWork.TreeNode({ text: "Parent 3" })) as FrameWork.TreeNode;
        let parent4 = tree.Add(new FrameWork.TreeNode({ text: "Parent 4" })) as FrameWork.TreeNode;

        let child1 = parent1.Add(new FrameWork.TreeNode({ text: "Child 1" })) as FrameWork.TreeNode;
        let child2 = parent1.Add(new FrameWork.TreeNode({ text: "Child 2" })) as FrameWork.TreeNode;
        let child3 = parent1.Add(new FrameWork.TreeNode({ text: "Child 3" })) as FrameWork.TreeNode;
        let child4 = parent1.Add(new FrameWork.TreeNode({ text: "Child 4" })) as FrameWork.TreeNode;

        let child11 = child1.Add(new FrameWork.TreeNode({ text: "Child 11" })) as FrameWork.TreeNode;

        tree.Show();
    }

    Menu(): void {
        let tree = new FrameWork.MenuContainer();
        let parent1 = tree.Add(new FrameWork.Menu({ text: "Menu 1" })) as FrameWork.Menu;
        let parent2 = tree.Add(new FrameWork.Menu({ text: "Menu 2" })) as FrameWork.Menu;
        let parent3 = tree.Add(new FrameWork.Menu({ text: "Menu 3" })) as FrameWork.Menu;
        let parent4 = tree.Add(new FrameWork.Menu({ text: "Menu 4" })) as FrameWork.Menu;

        let child1 = parent1.Add(new FrameWork.Menu({ text: "Child 1" })) as FrameWork.Menu;
        let child2 = parent1.Add(new FrameWork.Menu({ text: "Child 2" })) as FrameWork.Menu;
        let child3 = parent1.Add(new FrameWork.Menu({ text: "Child 3" })) as FrameWork.Menu;
        let child4 = parent1.Add(new FrameWork.Menu({ text: "Child 4" })) as FrameWork.Menu;

        let child11 = child1.Add(new FrameWork.Menu({ text: "Child 11" })) as FrameWork.Menu;

        tree.Show();
    }

    Input(): void {
        let data = new InputData();
        let container = new FrameWork.Container();
        container.AddDataSource(data);
        container.Show();
    }

    MaterialDesign2(): void {
        let txtName = new MaterialDesign2.TextField({id: "txtName", text:"write your name"});
        txtName.type = MaterialDesign2.TextFieldType.OUTLINE;
        let txtCourse = new MaterialDesign2.TextField({id: "txtCourse", text:"write your course"});
        txtCourse.type = MaterialDesign2.TextFieldType.OUTLINE;
        let txtPassword = new MaterialDesign2.Password({id: "txtPass", text:"password"});
        txtPassword.type = MaterialDesign2.InputType.OUTLINE;
        let rdMale = new MaterialDesign2.Radio({ text:"Male", value: "male", id:"rdmal", name:"gender"});
        let rdFemale = new MaterialDesign2.Radio({text:"Female", value:"female", id:"rdfe", name:"gender"});
        let checkBook = new MaterialDesign2.CheckBox({id:"ckdBook", text:"Book"});
        let checkSport = new MaterialDesign2.CheckBox({id:"ckSport", text:"Sport"});
        let txtArea = new MaterialDesign2.TextArea({id: "txtArea", rownum: 4, colsnum: 22, maxCount: 50, text: "enter your story"}); 
        let Floatbutton = new MaterialDesign2.FloatingButton({icon:"add"});  
        Floatbutton.type = MaterialDesign2.FloatButtonType.MINI;
       
        let container = new FrameWork.Container();   
        container.classes.push("center");     
        container.Add(txtName);
        container.Add(txtCourse);
        container.Add(txtPassword);
        container.Add(rdMale);
        container.Add(rdFemale);
        container.Add(checkBook);
        container.Add(checkSport);
        container.Add(txtArea);
        container.Add(Floatbutton);      
        container.Show()
        
    }
    
}

class InputData {
    name = new FrameWork.InputString("Name", "Hello World");
    age = new FrameWork.InputNumber("Age", 6);
    button = new FrameWork.InputButton("Submit", 'Click me');    
    checkBox = new FrameWork.InputCheckBox("Gender", "Male");
    color = new FrameWork.InputColor("myColor", "red");
    date = new FrameWork.InputDate("Choose Date", "my-local-date");
    dateTime = new FrameWork.InputDateTime("choose Datetime", 'dt');
    email = new FrameWork.InputEmail("Email", 'dt@ait.asia');
    file = new FrameWork.InputFile("Choose File", null);
    hidden = new FrameWork.InputHidden("my secret","lianu");
    image = new FrameWork.InputImage("my image","photo");
    month = new FrameWork.InputMonth("choose month","January");
    password = new FrameWork.InputPassword("Password","lianu");
    radio = new FrameWork.InputRadio("Exam",null);
    range = new FrameWork.InputRange("5-3", "baby");
    reset = new FrameWork.InputReset("Reset", "testing button");
    search = new FrameWork.InputSearch("Search", "search my norch");
    submit  = new FrameWork.InputSubmit("submit", "submit button",() => {alert('ok');});
    telephone = new FrameWork.InputTelehone("Phone", "0934188674");
    time  = new FrameWork.InputTime("choose Time", "my time zone");
    url = new FrameWork.InputUrl("URl", "Event Url");
    week  = new FrameWork.InputWeek("week", "my week");
}