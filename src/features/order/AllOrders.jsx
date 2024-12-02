import { useSelector } from 'react-redux';
import { getAllorders } from './OrderApi';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AllOrders = () => {
  const [products, setProducts] = useState([]);
  let admin = useSelector(us => us.currentUser.currentUser)?.token;
  let navigate = useNavigate();
  let user = useSelector(us => us.currentUser.currentUser);
  console.log(user);
  console.log(admin);

  useEffect(() => {
    async function addSomeBags() {
        try {
            let res = await getAllorders(admin);
            setProducts(res.data);
            console.log(products)
        } catch (err) {
            console.log(err)
        }
    }

    addSomeBags();

}, []);
    return (
      <>
        <h1 style={{marginTop:'7%'}}>ההזמנות</h1>
        <div>{products.map(item=>item.productName)}</div>
        </>
      );
}
 
export default AllOrders;