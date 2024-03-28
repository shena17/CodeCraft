import "../styles/styles.css";
import Footer from "../Footer";
import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";

export default function EditTags() {

    const [tagid, setTagid] = useState("");
    const [tagname, setTagname] = useState("");
    const [tag, setTag] = useState("");
   
  
    const [error, setError] = useState();
  
    const params = useParams();
  
    const getSelectedTag = () => {
      axios.get(`http://localhost:8071/tags/${params.id}`)
        .then((response) => {
          console.log(response.data);
          setTagid(response.data.tagid);
          setTagname(response.data.tagname);
          setTag(response.data.tag);
         
        })
      }
  
      useEffect(()=>{
        getSelectedTag();
      },[]);
  
    const updateTagDetails = (e) => {
      e.preventDefault();
  
      let updateData = {
        tagid: tagid,
        tagname: tagname,
        tag: tag,
       
      }
  
      axios.put(`http://localhost:8071/tags/${params.id}`, updateData)
        .then(() => {
          alert("Tag details updated");
          window.location.href = "/admin/tags";

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
              <h2 className="text-uppercase text-center mb-5">Update Tag</h2>
              <form className="createUpdate" >
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example1cg">Tag ID</label>
                  <input type="text" id="tagid" className="form-control form-control-lg"  onChange={(e)=>
                    setTagid(e.target.value)}
                    value={tagid} />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">Tag Name</label>
                  <input type="text" id="tagname" className="form-control form-control-lg" onChange={(e)=>
                    setTagname(e.target.value)}
                    value={tagname} />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Tag</label>
                  <input type="text" id="tag" className="form-control form-control-lg" onChange={(e)=>
                    setTag(e.target.value)}
                    value={tag}/>
                </div>
                
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={updateTagDetails}>Update</button>
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
