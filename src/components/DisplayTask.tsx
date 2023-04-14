import React, {ChangeEvent, useState} from 'react'
import { ITask } from './Interfaces';

interface X{
    Todo:ITask;
}

const TaskList = (Props:X)=> {

    const[isChecked,setChecked] = useState(false);

    const checkHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        if(isChecked===true) {
            setChecked(false);
            Props.Todo.status='Pending';
        }
        else {
            setChecked(true);
            Props.Todo.status='Done';
        }
    }

    return (
        <>
        <div>
        <h1 style={isChecked?{textDecoration:'line-through'}:{}}>{Props.Todo.title}</h1>
        <h3>{Props.Todo.status}
        <span><input type='checkbox' checked={isChecked} onChange={checkHandler}/></span>
        <span> <button type='button'>Delete</button> </span>
        </h3>
        </div>
        </>
    )
  
}

export default TaskList;
