import {KeyboardEvent, ChangeEvent, useState, useEffect } from "react";
import { ITask } from "./Interfaces";
import TaskList  from "./DisplayTask";
import "../index.css";

export const Layout =() => {
    const[Id,setId] = useState(0);
    const [task,settask] = useState<string>("");
    const [todoList,setTodoList] = useState<ITask[]>([]);

    useEffect(() => {
        const storedTodoList = localStorage.getItem('todoList');
        if (storedTodoList) {
          setTodoList(JSON.parse(storedTodoList));
        }
      },[]);

    const handleChange = (event:ChangeEvent<HTMLInputElement>):void => {
        const val = event.target.value;
        console.log(val);
        settask(val);
    }

    const AddTask = ()=>{
        const newTask = {
            id:Id,
            title:task,
            status:"Pending"
        }
        let arr=[...todoList,newTask]
        setTodoList(arr);
        setId(Id+1);
        settask("");
        //localStorage.setItem('todoList', JSON.stringify(arr));   
    }

    const clickHandler = () =>{
        if(!task) {
            alert("Enter Your task in input box");
            return;
        }
        AddTask();
        //console.log(todoList);
    }
    const keyHandler = (event:KeyboardEvent<HTMLInputElement>):void =>{
        if(!task) {
            return;
        }
        if(event.key==='Enter') {
            AddTask();
        }
        //console.log(todoList);
    }

    const Delete = (id:number):void =>{
        setTodoList(todoList.filter((item)=>{
            return item.id!==id;
        }));
        //localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    return (
        
        <>
        <div className="container">
        <input type="text"  className="inpt" value={task} placeholder="Enter your task.." onKeyDown={keyHandler} onChange={handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn" onClick={clickHandler} >Add</button>
        </div>
        <br/><br/>
        
        <div className="tsklist">
            
            {
                todoList.map((item:ITask,index:number)=>(
                    <TaskList  Todo={item} key={index} delete={Delete}/>
                ))
            }
        </div>
        </>
    )

}

