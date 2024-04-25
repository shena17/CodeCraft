import "../styles/styles.css";
import Footer from "../Footer";
import React,{useEffect,useState} from "react";
import axios from "axios";

export default function AddResource() {
    const [resourceid, setResourceid] = useState("");
    const [type, setType] = useState("");
    const [attach, setAttach] = useState("");
    const [heading, setHeading] = useState("");

    function sendData(e){
            e.preventDefault();

        const newResource ={
            resourceid,
            type,
            attach,
            heading

        }

        axios.post("http://localhost:8071/resources/add",newResource ).then(()=>{
            alert("New Resource Added to the system")
            window.location.href='/admin/resources';

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
              <h2 className="text-uppercase text-center mb-5">Add Resource</h2>
              <form onSubmit={sendData} >
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example1cg">Resource ID</label>
                  <input type="text" id="resourceid" className="form-control form-control-lg"  required onChange={(e)=>{
                    setResourceid(e.target.value);
                        }}
                     />
                </div>
                <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example4cg">Resource Type</label>
                            <select id="reaction" className="form-select" required onChange={(e) => {
                              setType(e.target.value);
                            }}>
                              <option selected>Choose...</option>
                              <option>Video</option>
                              <option>Artical</option>
                              <option>Drive Link</option>
                            </select>
                          </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Resource AccessLink</label>
                  <input type="text" id="attach" className="form-control form-control-lg" required onChange={(e)=>{
                    setAttach(e.target.value);
                        }}
                    />
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Heading</label>
                  <input type="text" id="heading" className="form-control form-control-lg" required onChange={(e)=>{
                    setHeading(e.target.value);
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
