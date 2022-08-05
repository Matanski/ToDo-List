const express=require("express");
const bodyParser=require("body-parser");

const date=require(__dirname+"/date.js");
console.log(date);


const { response } = require("express");
let items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

const app=express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(request,respond){


    let day = date.getDate();
    respond.render("list",{listTitle:day, newListItem:items});
});


app.post("/",function(request,respond){

    let item=request.body.newItem;

    if(request.body.list === "Work"){
        workItems.push(item);
        respond.redirect("/work");
    } else {
        items.push(item);
    respond.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List",newListItem:workItems});
});

app.post("/work",function(req,res){
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",function(req,res){
    res.render("about");
});


app.listen(3000,function(){
    console.log("Server has started on port 3000");
});




