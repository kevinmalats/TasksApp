import React from "react";
import { ITask, State } from "../../pages/Home/Hooks/useStateHome";
import DeleteIcon from '@mui/icons-material/Delete';
 
interface TasksProps {
    tasks: ITask[];
    updateTask: (task:ITask) => void;
    deleteTask: (taskId:string) => void;
}


export const TaskList = (props: TasksProps) => {
    const { tasks, updateTask, deleteTask } = props;

    const handleChangeState = (e: React.ChangeEvent<HTMLSelectElement>, id:string) => {
      const task = tasks.find(task => task.id === id)
      if(task === undefined) return;
      task.state = (e.target.value as State)
      updateTask(task)
    }

    const Task = (props: { task: ITask }) => {
        const {task} = props
        return (
        <>
           <div className="">{task.name}</div>
                <div  className="">{task.assignedTo}</div>
                <div  className="">{task.priority}</div>
                <div  className="">
                    <select className="bg-blue-500 z-10 relative" name="state" defaultValue={task.state} onChange={(e)=> handleChangeState(e,task.id)}>
                        <option key={1} value="backlog">Backlog</option>
                        <option key={2} value="DOR">DOR</option>
                        <option key={3} value="Testing">Testing</option>
                        <option key={4} value="In Progress">In Progress</option>
                        <option key={5} value="Done">Done</option>
                    </select>
                </div>
                <div  className="cursor-pointer z-10" onClick={()=> deleteTask(task.id)}><DeleteIcon/></div>
        </>
        )
    }


    return (
        <>
            <ul className="w-full h-60 bg-white rounded">
             <div className="py-10 px-10 w-full ">
             {tasks.map(task=>
                <li className="border-b-2 border-indigo-500 grid  grid-cols-5 gap-3   text-zinc-700  w-full" key={task.id}>
                 <Task task={task}/>
                </li>
            )}
             </div>
            </ul>
        </>
    );
}




