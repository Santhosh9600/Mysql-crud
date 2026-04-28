import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreatePost=()=>{
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const navigate=useNavigate();

    //Data inserted code

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3002/addpost',{title,body})
        .then((response)=>
        {
            console.log(response.data);
            navigate('/');
        })
        .catch((error)=>
            {
                console.log(error);
                }
                );
    }
    return(
       
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                                    <h1>Create a NewPost</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                               <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                               </div>
                               <div className="form-group">
                                    <label>Body</label>
                                    <textarea className="form-control" value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                               </div>
                               <button type="submit" className="btn btn-primary">CreatePost</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreatePost;