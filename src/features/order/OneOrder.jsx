import './OneOrder.css';
import { useState } from "react";
import { getAllUsers } from '../user/UserApi';    // חיבור לקריאת כל המשתמשים
import { useEffect } from 'react';
import { updateorderSetOff } from './OrderApi';
const OneOrder = ({item,token}) => {
    const [userName, setUserName] = useState("");  // מצב לשם המשתמש
    const [users, setUsers] = useState([]); // מצב לכל המשתמשים
    const [status, setStatus] = useState(item.isSetOff); // מצב סטטוס הזמנה

    // חיפוש שם המשתמש על פי ה-userId
    useEffect(() => {
      const getUserName = () => {
        const user = users.find((user) => user._id === item.userId); // חיפוש לפי userId
        if (user) {
          setUserName(user.userName);  // עדכון שם המשתמש
        }
      };
  
      if (users.length > 0) {
        getUserName(); // הפעלת החיפוש לאחר שהמשתמשים התקבלו
      }
    }, [ users]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await getAllUsers();  // קריאה ל-API לקבלת כל המשתמשים
          setUsers(res.data); 
        } catch (err) {
          console.log(err);
        }
      };
      fetchUsers();
    }, []);

    const handleUpdateStatus = async () => {
        if (!status) {  // אם הסטטוס לא בוצע, נעדכן אותו
          try {
            const updatedStatus = true; // מצב "בוצע"
            await updateorderSetOff(item._id,token); // קריאה ל-API לעדכון הסטטוס
            setStatus(updatedStatus); // עדכון הסטטוס בקומפוננטה
          } catch (err) {
            console.log("Error updating status:", err);
          }
        }
      };

    const statusIcon = item.isSetOff 
    ? <i className="fas fa-check-circle" style={{ color: 'green' }}></i>  // אייקון בוצע
    : <i className="fas fa-times-circle" style={{ color: 'red' }}></i>;   // אייקון לא בוצע
    const [isOpen, setIsOpen] = useState(false);  // מצב פתיחה של התפריט

    const toggleProducts = () => {
      setIsOpen(!isOpen);  // שינוי מצב הפתיחה (פתוח/סגור)
    };
    return (
        <div className="order-card">
            <h3>פרטי הזמנה :</h3>
            <p><strong>כתובת:</strong> {item.address}</p>
            <p><strong>תאריך ההזמנה:</strong> {new Date(item.orderDate).toLocaleDateString()}</p>
            <p>
        <strong>סטטוס: </strong>
        {statusIcon}
        {/* כפתור קטן ליד הסטטוס */}
        {!status && (
          <button className="status-button" onClick={handleUpdateStatus}>
            <i className="fas fa-check"></i>
          </button>
        )}
      </p>
            <p><strong>הזמנה על שם:</strong> {userName}</p> {/* הצגת שם המשתמש */}
            
            {/* כפתור לפתיחה וסגירה של המוצרים */}
        <button onClick={toggleProducts}>
          {isOpen ? "הסתר מוצרים" : "הצג מוצרים"}
        </button>

        {/* הצגת המוצרים אם התפריט פתוח */}
        {isOpen && (
          <div className="product-list">
            {item.products.map((item, index) => (
              <div className="product-item" key={index}>
                {item.productName}
              </div>
            ))}
          </div>
        )}
        </div>
    );
};

export default OneOrder;
