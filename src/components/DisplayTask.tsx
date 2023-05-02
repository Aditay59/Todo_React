import React, {ChangeEvent, useState} from 'react'
import { ITask } from './Interfaces';

interface X{
    Todo:ITask;
    delete(id:number):void;
}

const TaskList = (Props:X)=> {

    const[isChecked,setChecked] = useState(false);
    const [titl,setTitl] = useState("");
    const [stats,setStatus] = useState<string>("");


    // useEffect(()=>{
    //     console.log("State of title updated");
    // },[titl]);

    const checkHandler = (event:ChangeEvent<HTMLInputElement>):void =>{
        if(isChecked===true) {
            setChecked(false);
            setStatus("Pending");
            Props.Todo.status="Pending";
            //localStorage.seItem('toDoList',JSON.stringify([...Props.Todo[]]));
            //localStorage.setItem('toDoList',JSON.stringify());
            //Props.Todo.status=stats;
        }
        else {
            setChecked(true);
            setStatus("Done");
            Props.Todo.status="Done";
            //Props.Todo.status=stats;
        }
    }

    const deleteHandler = ():void =>{
        setChecked(false);
        Props.delete(Props.Todo.id);
    }

    const editHandler = () =>{
        const tsk = prompt("Enter new Task");
        if(tsk) {
            setTitl(tsk);
            Props.Todo.title = tsk;
        }
    }

    return (
        <>
        <div className='main'>
        <h1 className='head' style={isChecked?{textDecoration:'line-through',textDecorationColor:'red'}:{}}>{Props.Todo.title}</h1>
        <h3>{Props.Todo.status}
        <span><input className='chk' type='checkbox' checked={isChecked} onChange={checkHandler}/></span>&nbsp;&nbsp;
        <span> <button className='btn2' type='button' onClick={editHandler}>Edit</button> </span>
        {
            isChecked && (
                <span> <button className='btn3' type='button' onClick={deleteHandler}>Delete</button> </span>
            )
        }
        
        </h3>
        </div>
        </>
    )
  
}

export default TaskList;
