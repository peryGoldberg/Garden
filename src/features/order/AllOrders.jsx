import { useSelector } from 'react-redux';
import { getAllorders } from './OrderApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OneOrder from './OneOrder';
import './AllOrders.css';
const AllOrders = () => {
  const [products, setProducts] = useState([]);
  let admin = useSelector((us) => us.currentUser.currentUser)?.token;
  let navigate = useNavigate();
  let user = useSelector((us) => us.currentUser.currentUser);
  console.log(user);
  console.log(admin);

  useEffect(() => {
    async function addSomeBags() {
      try {
        let res = await getAllorders(admin);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    addSomeBags();
  }, []);

  return (
    <>
      <h1>ההזמנות</h1>
      <div className="orders-container">
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className="order-card-wrapper">
              <OneOrder item={item} token={admin} />
            </div>
          ))
        ) : (
          <p>אין הזמנות</p>
        )}
      </div>
    </>
  );
};

export default AllOrders;
