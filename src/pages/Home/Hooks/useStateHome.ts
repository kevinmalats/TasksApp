import { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import moment from 'moment';
import { Get, Save } from '../../../Fetch/fetchwrapper';

export type Priority = 'Low' | 'Medium' | 'High';
export type State = 'DOR' | 'Backlog' | 'DONE' | 'Progress' | 'Testing';
export interface ITask {
  id: string;
  name: string;
  createAt: string;
  assignedTo: string;
  priority: Priority;
  state: State;
}
interface IHomeState {
  tasks: ITask[];
  handleSumbmit: (event: React.FormEvent<HTMLFormElement>) => void;
  modal: {
    handleOpenCloseModal: (value: boolean) => void;
    isOpenModal: boolean;
  };
  newTask: ITask | undefined;
  updateTask: (task: ITask) => void;
  deleteTask: (taskId: string) => void;
}
const InitialTask: ITask = {
  id: '',
  assignedTo: '',
  name: '',
  createAt: '',
  priority: 'Low',
  state: 'Backlog',
};

export default function UseStateHome(): IHomeState {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<ITask>(InitialTask);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const firstRender = useRef(1);

  ///**** HANDLES *****/
  const handleSumbmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentDate = moment();
    const newElement: ITask = {
      id: v4(),
      name: event.currentTarget.elements.namedItem('name').value,
      createAt: currentDate.format('YYYY-MM-DD HH:mm:ss'),
      assignedTo: event.currentTarget.elements.namedItem('assignedTo').value,
      priority: event.currentTarget.elements.namedItem('priority').value,
      state: 'Backlog',
    };
    setTasks((oldArray) => [...oldArray, newElement]);
    handleOpenCloseModal(false);
  };

  const handleOpenCloseModal = (value: boolean) => {
    setIsOpenModal(value);
  };

  const updateTask = (task: ITask) => {
    const tasksFilter: ITask[] = tasks.filter(
      (oldTask) => oldTask.id !== task.id,
    );
    tasksFilter.push(task);
    setTasks([...tasksFilter]);
  };

  const deleteTask = (taskId: string) => {
    const tasksFilter: ITask[] = tasks.filter(
      (oldTask) => oldTask.id !== taskId,
    );
    setTasks([...tasksFilter]);
  };

  const saveTask = () => {
    if (firstRender.current <= 1) {
      firstRender.current++;
      return;
    }
    Save(tasks, 'tasks');
  };

  const getTasks = async () => {
    const data = await Get('tasks');
    setTasks(data);
    console.log(data);
  };

  useEffect(() => {
    getTasks();
  }, []);
  useEffect(() => {
    saveTask();
  }, [tasks]);

  return {
    tasks,
    handleSumbmit,
    newTask,
    updateTask,
    deleteTask,
    modal: {
      handleOpenCloseModal,
      isOpenModal,
    },
  };
}
