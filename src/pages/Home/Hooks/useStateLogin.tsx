import {  useState, FormEvent } from 'react';
import { LoginFetch } from '../../../Fetch/fetchwrapper';
import { useNavigate } from 'react-router-dom';
import encryptPassword from '../../../utils/utils';
interface LoginState {
    username: string;
    password: string;
    handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleOncloseSnackbar: (event: React.FormEvent, reason:string) => void;
    color:Color;
    message: string;
  }
  type Color = "success" | "error" | "info" | "warning" ;

export const useStateLogin = (): LoginState => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState<Color>('success');

    const navigate = useNavigate();

    /// *** VALIDATION  *** ///

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    }

    /// *** HANDLES  *** ///
    const handleSubmit = async (event: React.FormEvent) => {
     
        event.preventDefault();
        if(!validateForm()){
            setMessage("Username and password are required");
            setColor("error");
            return;
        }
        const passwordHashed = await encryptPassword(password);
        const response = await LoginFetch(username, passwordHashed);
      
        if(response.codigoRetorno === "0001"){
            setMessage("Login success");
            setColor("success");
            navigate("/home");
        }else{          
            setMessage("Login failed user or password incorrect");
            setColor("error");
        }

    };

    const handleOncloseSnackbar = (event: React.FormEvent, reason:string) => {
        if(reason === "timeout"){
            setMessage("");
        }
    }
  

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return {
        username,
        password,
        handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUsernameChange(event),
        handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(event),
        handleSubmit,
        handleOncloseSnackbar,
        color,
        message
    }
}