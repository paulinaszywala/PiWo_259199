import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Home from "./PageHome";
import PropertyDetail from "./PropertyDetail";

import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";

function App() {
  // const listofToDosDefault = ["Wpuścić psa", "Zrobić zadanie", "Zrobić obiad"];

  // //hook
  // const [toDoList, setToDoList] = useState(listofToDosDefault);

  // const [newToDo, setNewToDo] = useState(""); //ustawienie stanu
  // const handleNewTodo = (event) => {
  //   console.log(event.target.value);
  //   setNewToDo(event.target.value);
  // };

  // const handleAddNewToDo = () => {
  //   setToDoList(toDoList.concat(newToDo));
  //   setNewToDo("");
  // };

  // const listofToDosJSX = listofToDosDefault.map((it) => <p>{it}</p>);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
