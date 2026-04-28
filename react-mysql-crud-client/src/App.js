import React from "react";
import {BrowserRouter as Router,Route,Routes}from "react-router-dom";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import EditPost from "./EditPost";
import NavigationBar from "./NavBar"

const App=()=>{
  return(
    <Router>
      <div>
        <NavigationBar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<PostsList/>}/>
            <Route path="/create" element={<CreatePost/>}/>
            <Route path="/navbar" element={<NavigationBar/>}/>
            <Route path="/edit/:id" element={<EditPost/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
export default App;
