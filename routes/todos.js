const express = require("express")
const { findById } = require("../models/todo")
const Todo = require("../models/todo")
const routes = express.Router()

routes.get("/", async(req, res) => {
    let todos = await Todo.find().sort({
        createAt: "desc"
    })
    res.render("todos/index", { todos: todos })
})
routes.get("/create", (req, res) => {
    res.render("todos/create")
})
routes.post("/create", async (req, res) => {
    let todo = new Todo({
        title: req.body.todoTitle,
        disc: req.body.todoDesc
    })
    await todo.save()
    res.redirect("/todos")
})
routes.get("/delete/:id",async(req,res)=>{
    await Todo.findByIdAndDelete({_id:req.params.id})
    res.redirect("/todos")
})
routes.get("/edit/:id",async (req,res)=>{
    let todo = await Todo.findById(req.params.id)
    res.render("todos/edit",{todo : todo})
})
routes.put("/edit/:id/update",async (req,res)=>{
    let todo = await Todo.findByIdAndUpdate(req.params.id,{
        title : req.body.todoTitle,
        disc : req.body.todoDesc
    })
    res.redirect("/")
})
routes.get("/show/:id",async (req,res)=>{
    let todo = await Todo.findById(req.params.id)
    res.render("todos/show",{todo:todo})
})
routes.get("/:id/complete",async (req,res)=>{
    let todo = await Todo.findByIdAndUpdate(req.params.id,{
        complite : true
    })
    res.redirect("/todos")
})

module.exports = routes