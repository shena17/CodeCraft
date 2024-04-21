import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Members() {
  
  const[users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  // useEffect(()=>{
  //   function getUsers(){
  //     axios.get("http://localhost:8071/get/users").then((res)=>{
  //     setUsers(res.data);
  //   }).catch((err)=>{
  //     alert(err.message);
  //   })
  //   }
  //   getUsers();
  // },[])



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = users.filter((user) =>
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
    <div>
        <h3 style={{marginLeft:40}}><b>All Users</b></h3>
        <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleSearch} />
        <a href = "/report"><button type="button" class="btn btn-primary" style={{marginLeft:30,backgroundColor:"#002D62"}}>Finalize Report</button></a>

      </form>
    {filteredUsers.length === 0 ? (
        <p style={{marginLeft:80}}>No users found.</p>
      ) : (
        filteredUsers.map(user => (
          <div key={user._id}>
            <table class="table table-success table-striped">
    <thead>
    <tr class="table-dark">
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Country</th>
      <th scope="col">DOB</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>


    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.country}</td>
      <td>{user.dob}</td>
      <td>{user.email}</td>
      <td>{user.email}</td>

    </tr>
  </tbody>
</table>
               
                <div className="btn-group" role="group" aria-label="Basic example" style={{padding:20}}>
                  <Link to={"/edit/"+user._id}><button type="button" style={{backgroundColor:"blue",width:200,marginLeft:80}}>Edit</button></Link>
                  <div>
            </div>
                </div>
              </div>
        ))
      )}
    
    </div>
    </>
  )
}
