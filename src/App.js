import './App.css';
import Login from './Componenets/Login';
import SignUp from './Componenets/SignUp';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './Home';
import {Provider} from 'react-redux'
import {store} from './Componenets/State/store'
import Profile from './Componenets/Profile';
import PostDiv from './Componenets/PostDiv'
import AllUsers from './Componenets/AllUsers';
import Settings from './Componenets/Settings'
import UserProfile from './Componenets/UserProfile'


function App() {


  return (
<Provider store={store}>

   <BrowserRouter>

        <Routes>

          <Route exact path="/" element={<Login />}/>

          <Route exact path="/signup" element={<SignUp />}/>

          <Route exact path="/home" element={<Home />}/>

          <Route exact path="/post" element={<><Home /><PostDiv/></>}/>

          <Route exact path="/users" element={<><Home /><AllUsers/></>}/>

          <Route exact path="/user" element={<><Home /><UserProfile/></>}/>

          <Route exact path="/setting" element={<><Home /><Settings/></>}/>

          <Route path= "/profile/:docID" element={<><Home /><Profile/></>}/>

        </Routes>

  </BrowserRouter>

</Provider>
  );
}

export default App;
