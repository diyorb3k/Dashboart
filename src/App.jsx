import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Dashboard from "./components/Dashboard";
import Student from './components/Student';
import Techers from './components/Techers';
import { Paper } from "@mui/material";
import { Provider } from 'react-redux';
import store from './app/store'
import AddTodo from './components/AddTodo';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="student" element={<Student/>} />
            <Route path="teachers" element={<Techers/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
