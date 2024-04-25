import "../styles/styles.css";
import Footer from "../Footer";
import React,{useEffect,useState} from "react";
import axios from "axios";

export default function AddForum() {
    const [forumid, setForumid] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");

    function sendData(e){
            e.preventDefault();

        const newForum ={
            forumid,
            subject,
            body,
            tags

        }

        axios.post("http://localhost:8071/forums/add",newForum ).then(()=>{
            alert("New Forum Added to the system")
            window.location.href='/admin/forums';

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
              <h2 className="text-uppercase text-center mb-5">Add Forum</h2>
              <form onSubmit={sendData} >
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example1cg">Forum ID</label>
                  <input type="text" id="forumid" className="form-control form-control-lg"  required onChange={(e)=>{
                    setForumid(e.target.value);
                        }}
                     />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">Subject</label>
                  <input type="text" id="subject" className="form-control form-control-lg" required onChange={(e)=>{
                    setSubject(e.target.value);
                        }}
                     />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Body</label>
                  <input type="text" id="body" className="form-control form-control-lg" required onChange={(e)=>{
                    setBody(e.target.value);
                        }}
                    />
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Tags</label>
                  <input type="text" id="tags" className="form-control form-control-lg" required onChange={(e)=>{
                    setTags(e.target.value);
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
