import { BrowserRouter, Routes,Route  } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import ProtectedRoute from "./routes/protectedRoute";

const App=()=>{
return(
  <>
  <BrowserRouter>
  <Routes>
  <Route
  path="/"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
   <Route path='/login' element={<Login />}/>
   <Route path='/register' element={<Register />}/>
   <Route path='/chat' element={<ProtectedRoute>
    <Chat/>
   </ProtectedRoute>}/>
  </Routes>
  </BrowserRouter></>
)
}
export default App;