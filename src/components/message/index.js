import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Message = ({type,message})=>{
    type=='success' ?  toast.success(message) : toast.error(message)
    
}
export default Message;