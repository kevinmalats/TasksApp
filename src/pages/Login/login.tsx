import React from 'react';
import './Login.css'; 
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useStateLogin } from './Hooks/useStateLogin';

const Login: React.FC = () => {
    const {handleSubmit, username, password,handleUsernameChange,
         handlePasswordChange,handleOncloseSnackbar, message, color } = 
         useStateLogin();
    return (
  
     <div className="max-w-lg px-10 py-10 rounded bg-amber-500">
            
       <form onSubmit={handleSubmit} className="grid grid-rows-3 grid-cols-2 gap-3">
         <label> Username:      
                </label>
                <input className='rounded bg-white text-sky-500' type="text" value={username} onChange={e => handleUsernameChange(e)} />
      
                <label>
                    Password: 
                </label>
                <input className='rounded bg-white text-sky-500' type="password" value={password} onChange={e => handlePasswordChange(e)} />
                <input className='col-span-2 row-span-3 max-w-sm bg-sky-500 py-1' type="submit" value="Sign up" />
            </form>
            <Snackbar
            open={message != ""} 
            autoHideDuration={3000} 
            onClose={handleOncloseSnackbar}  
            >
              <Alert severity={color} variant="filled">
                 {message}
             </Alert>
            </Snackbar>
        </div>
    
    );
}

export default Login;