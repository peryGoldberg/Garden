import { useEffect,useState } from "react";
import { getAllOrderByUserId  } from './OrderApi';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [myUser, setMyUser] = useState({});
    const [token, setToken] = useState();

  

    useEffect(()=>{
        async function getAllOrders() {
            const token = localStorage.getItem('token');
            const userStorage = localStorage.getItem('myUser');
            if (token) {
                console.log("token",token);
              setToken(token);
            }
            if(userStorage){
                
                const user = JSON.parse(userStorage); // המרת ה-string לאובייקט
               let copy={...user};
                setMyUser(copy); 
                 console.log("user",copy); 
               const userId = user._id;
                  try {
                console.log(userId);
                let res = await getAllOrderByUserId(userId,token);
                setOrders(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
              
            }
          
        }
       getAllOrders();
    },[])
    return ( 
        <>
        <h1 style={{margin:"50% 0%"}}>ההזמנות שלי</h1>
        </>
     );
}
 
export default MyOrders;