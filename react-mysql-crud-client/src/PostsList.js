import React from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

const PostsList=()=>{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3002/getposts')
        .then(response=>setPosts(response.data))
    },[])
    const handleDelete=async (id)=>{
      await axios.delete(`http://localhost:3002/deletepost/${id}`);
      setPosts(posts.filter(post=>post.id!==id));
     }
    return(
         <div className="container mt-5">
              <h2>PostsList</h2>
              <table className="table table-striped">
                  <thead>
                    <tr>
                       <th>Id</th>
                       <th>title</th>
                       <th>Body</th>
                       <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        posts.map(
                            post=>(
                                <tr key={post.id}>
                                  <td>{post.id}</td>
                                  <td>{post.title}</td>
                                  <td>{post.body}</td>
                                  <td>
                                    <Link  to={`/edit/${post.id}`}  className="btn btn-warning btn-sm mr-2">Edit</Link>
                                    <button onClick={()=>handleDelete(post.id)}   className="btn btn-danger btn-sm">Delete</button> 
                                  </td>
                                </tr>
                            )
                        )
                    }
                  </tbody>
              </table>
         </div>   
    )
}
export default PostsList;