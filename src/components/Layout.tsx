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
    
      useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }, [todoList]);

    const handleChange = (event:ChangeEvent<HTMLInputElement>):void => {
        const val = event.target.value;
        console.log(val);
        settask(val);

    }

    const clickHandler = () =>{
        if(!task) {
            alert("Enter Your task in input box");
            return;
        }
        const newTask = {
            id:Id,
            title:task,
            status:"Pending"
        }
        setTodoList([...todoList,newTask]);
        setId(Id+1);
        settask("");
        console.log(todoList);
    }
    const keyHandler = (event:KeyboardEvent<HTMLInputElement>):void =>{
        if(!task) {
            return;
        }
        if(event.key==='Enter') {
            const newTask = {
                id:Id,
                title:task,
                status:"Pending"
            }
            setTodoList([...todoList,newTask]);
            setId(Id+1);
            settask("");
        }
        console.log(todoList);
    }

    const Delete = (id:number):void =>{
        setTodoList(todoList.filter((item)=>{
            return item.id!==id;
        }));
    }

    return (
        <>
        <div className="container">
        <input type="text" className="inpt" value={task} placeholder="Enter your task.." onKeyDown={keyHandler} onChange={handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn" onClick={clickHandler} >Add</button>
        </div>
        <br/><br/>
        
        <div className="tsklist">
            
            {
                todoList.map((item,index)=>(
                    <TaskList  Todo={item} key={index} delete={Delete}/>
                ))
            }
        </div>
        </>
    )

}

