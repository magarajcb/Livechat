import { BrowserRouter, Routes,Route  } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import ProtectedRoute from "./routes/protectedRoute";

const App=()=>{
return(
  <>
  <BrowserRouter>
  <Routes>
   <Route path='/' element={<Home />} />
   <Route path='/login' element={<Login />}/>
   <Route path='/register' element={<Register />}/>
   <Route path='/chat' elemet={<ProtectedRoute>
    <Chat/>
   </ProtectedRoute>}/>
  </Routes>
  </BrowserRouter></>
)
}
export default App;