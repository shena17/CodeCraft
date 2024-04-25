import "../styles/styles.css";
import Footer from "../Footer";
import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";

export default function EditResources() {

    const [resourceid, setResourceid] = useState("");
    const [type, setType] = useState("");
    const [attach, setAttach] = useState("");
    const [heading, setHeading] = useState("");
   
  
    const [error, setError] = useState();
  
    const params = useParams();
  
    const getSelectedResource = () => {
      axios.get(`http://localhost:8071/resources/${params.id}`)
        .then((response) => {
          console.log(response.data);
          setResourceid(response.data.resourceid);
          setType(response.data.type);
          setAttach(response.data.attach);
          setHeading(response.data.heading);

         
        })
      }
  
      useEffect(()=>{
        getSelectedResource();
      },[]);
  
    const updateResourceDetails = (e) => {
      e.preventDefault();
  
      let updateData = {
        resourceid: resourceid,
        type: type,
        attach: attach,
        heading: heading,

       
      }
  
      axios.put(`http://localhost:8071/resources/${params.id}`, updateData)
        .then(() => {
          alert("Resource details updated");
          window.location.href = "/admin/resources";

        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
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
              <h2 className="text-uppercase text-center mb-5">Update Resource</h2>
              <form className="createUpdate" >
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example1cg">Resource ID</label>
                  <input type="text" id="resourceid" className="form-control form-control-lg"  onChange={(e)=>
                    setResourceid(e.target.value)}
                    value={resourceid}  readOnly/>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">Resource Type</label>
                  <input type="text" id="type" className="form-control form-control-lg" onChange={(e)=>
                    setType(e.target.value)}
                    value={type} />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Access Link</label>
                  <input type="text" id="attach" className="form-control form-control-lg" onChange={(e)=>
                    setAttach(e.target.value)}
                    value={attach}/>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Heading</label>
                  <input type="text" id="heading" className="form-control form-control-lg" onChange={(e)=>
                    setHeading(e.target.value)}
                    value={heading}/>
                </div>
                
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={updateResourceDetails}>Update</button>
                </div>
                {error && <div className="error">{error}</div>}
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
