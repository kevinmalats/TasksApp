import Modal from '../../components/Modal/modal';
import { TaskList } from '../../components/TaskList/TaskList';
import UseStateHome from './Hooks/useStateHome';

export default function Home() {
  const { tasks, modal,  handleSumbmit, updateTask, deleteTask } = UseStateHome();


  const FormBuild = () => {
   
    return(
      <div>
        <form onSubmit={e => handleSumbmit(e)}  className="grid grid-rows-4 grid-cols-2 gap-3">
          <label> Name of task:      
          </label>
            <input className='rounded bg-white text-sky-500' type="text" name='name'/>
      
            <label>
              Assigned to: 
            </label>
            <input className='rounded bg-white text-sky-500' type="text" name="assignedTo" />
            <label> Priority:      
            </label>
            <select name="priority" className='rounded bg-white text-sky-500'>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input className='col-span-1 row-span-1  bg-blue-500 rounded cursor-pointer' type="submit" value="Save" />
            <div className="col-span-1 row-span-1 ">
             <button className=" rounded  bg-red-500 text-white " onClick={()=> modal.handleOpenCloseModal(false)}>Cancel</button>
            </div>
        </form>
      </div>
  
    )
  }
  return (
    <>
     <header>
     <div className="z-10 fixed p-4 cursor-pointer right-10 mr-20 mt-10">
          <button className=" rounded pg-4 bg-blue-500 text-white " onClick={()=> modal.handleOpenCloseModal(!modal.isOpenModal)}>New Task</button>
      </div>
     </header>
      <div className="absolute text-center rounded top-40 left-5 bg-blue-500 h-80 w-6/12 p-10 mx-1.5">
        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      </div>
      <div className='relative h-screen flex items-center justify-center p-7' onClick={() => modal.handleOpenCloseModal(false)}>
      <Modal isOpen={modal.isOpenModal} handleOpenCloseModal={modal.handleOpenCloseModal}>
       <FormBuild />
      </Modal>
      </div>
    </>
  );
}
