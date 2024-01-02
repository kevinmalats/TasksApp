import React, { memo }  from "react";
import { Snackbar } from "@material-ui/core";

interface IModalCreate {
 children:React.ReactNode;
 isOpen: boolean;
 handleOpenCloseModal: (value: boolean) => void;
}

const Modal: React.FC<IModalCreate> = memo(function Modal(props) {
    const { isOpen, children, handleOpenCloseModal } = props;
 return(
    <>
    {isOpen ? ( 
            
    <div onClick={(e) => e.stopPropagation()}  className="z-20 max-w-lg rounded bg-blue-400 h-full w-full   inset-0 flex items-center justify-center">
      {children}
           
        {/* <Snackbar
         open={message != ""} 
         autoHideDuration={3000} 
         onClose={handleOncloseSnackbar}  
         >
           <Alert severity={color} variant="filled">
              {message}
          </Alert>
         </Snackbar>*/}
      
     </div>
     ):null}
     </>
 )
})

export default Modal;