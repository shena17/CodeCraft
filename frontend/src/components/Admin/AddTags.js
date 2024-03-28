import "../styles/styles.css";
import Footer from "../Footer";
import React,{useEffect,useState} from "react";
import axios from "axios";

export default function AddTags() {
    const [tagid, setTagid] = useState("");
    const [tagname, setTagname] = useState("");
    const [tag, setTag] = useState("");

    function sendData(e){
            e.preventDefault();

        const newTag ={
            tagid,
            tagname,
            tag
        }

        axios.post("http://localhost:8071/tags/add",newTag ).then(()=>{
            alert("New Tag Added to the system")
            window.location.href='/admin/tags';

        }).catch((err)=>{
            alert(err)
        })
        }
        
    
  return (
    <>
     <section className="vh-100 bg-image" style={{backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")'}}>
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: 15}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Add Tag</h2>
              <form onSubmit={sendData} >
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example1cg">Tag ID</label>
                  <input type="text" id="tagid" className="form-control form-control-lg"  required onChange={(e)=>{
                    setTagid(e.target.value);
                        }}
                     />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">Tag Name</label>
                  <input type="text" id="tagname" className="form-control form-control-lg" required onChange={(e)=>{
                    setTagname(e.target.value);
                        }}
                     />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Tag</label>
                  <input type="text" id="tag" className="form-control form-control-lg" required onChange={(e)=>{
                    setTag(e.target.value);
                        }}
                    />
                </div>
                
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" >Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    <Footer></Footer>
    </>
  )
}
