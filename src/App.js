import './assets/css/App.css';
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
    BrowserRouter,
} from "react-router-dom";
import {Home, Login, Register, Prueba, Kanban, Users} from './pages/'
import RequireAuth from './auth/auth';
import Layout from './components/Layout/Layout';
import LayoutWithoutNavBar from './components/Layout/LayoutWithoutNavBar'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWithoutNavBar />}>
            <Route path="home" element={<Login/>} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            
          </Route>
          <Route element={<Layout />}>
            <Route path="kanban" element={<Kanban />} />
            <Route path="prueba" element={<Prueba />} />
            <Route path="users" element={<Users />} />
            
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  
                </RequireAuth>
                }
              />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>    
  );
}

export default App;
