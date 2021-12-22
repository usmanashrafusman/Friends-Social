import React , {useState,useEffect}from 'react'
import { collection,  doc , onSnapshot} from "firebase/firestore";
import {db,auth} from './FirebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import CardHeader from './CardHeader';


export default function AllUsers() {

    const [allUsers, setAllUsers] = useState([])

    
useEffect(() => {

    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(user)
          onSnapshot(collection(db, "Accounts"), (snapShot) =>
          setAllUsers(snapShot.docs.map((doc) => doc.data()))
        );
    
      
    
        }
      });
   
}, [])


    return (
        <div className="container" style={{marginLeft:"75px"}}>
        
           
                {allUsers.map((e, index) => (
                  <CardHeader
                    key={index}
                    src={e.userPhoto}
                    name={e.firstName + " " + e.lastName}
                  />
                ))}
     
           
        </div>
    )
}
