import {KeyboardEvent, ChangeEvent, useState } from "react";
import { ITask } from "./Interfaces";
import TaskList  from "./DisplayTask";

export const Layout =() => {
    const[Id,setId] = useState(0);
    const [task,settask] = useState<string>("");
    const [todoList,setTodoList] = useState<ITask[]>([]);

    const handleChange = (event:ChangeEvent<HTMLInputElement>):void => {
        const val = event.target.value;
        console.log(val);
        settask(val);

    }

    const clickHandler = () =>{
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
    const keyHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
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
        <input type="text" value={task} placeholder="Enter your task.." onKeyDown={keyHandler} onChange={handleChange}/>
        <button type="button" onClick={clickHandler} >Add</button>
        <br/><br/>
        
        <div>
            
            {
                todoList.map((item,index)=>(
                    <TaskList Todo={item} key={index} delete={Delete}/>
                ))
            }
        </div>
        </>
    )

}

