import "../styles/styles.css";
import Footer from "../Footer";
import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";

export default function EditForums() {

    const [forumid, setForumid] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
   
  
    const [error, setError] = useState();
  
    const params = useParams();
  
    const getSelectedForum = () => {
      axios.get(`http://localhost:8071/forums/${params.id}`)
        .then((response) => {
          console.log(response.data);
          setForumid(response.data.forumid);
          setSubject(response.data.subject);
          setBody(response.data.body);
          setTags(response.data.tags);

         
        })
      }
  
      useEffect(()=>{
        getSelectedForum();
      },[]);
  
    const updateForumDetails = (e) => {
      e.preventDefault();
  
      let updateData = {
        forumid: forumid,
        subject: subject,
        body: body,
        tags: tags,

       
      }
  
      axios.put(`http://localhost:8071/forums/${params.id}`, updateData)
        .then(() => {
          alert("Forum details updated");
          window.location.href = "/admin/forums";

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
              <h2 className="text-uppercase text-center mb-5">Update Forum</h2>
              <form className="createUpdate" >
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example1cg">Forum ID</label>
                  <input type="text" id="forumid" className="form-control form-control-lg"  onChange={(e)=>
                    setForumid(e.target.value)}
                    value={forumid}  readOnly/>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">Subject</label>
                  <input type="text" id="subject" className="form-control form-control-lg" onChange={(e)=>
                    setSubject(e.target.value)}
                    value={subject} />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Body</label>
                  <input type="text" id="body" className="form-control form-control-lg" onChange={(e)=>
                    setBody(e.target.value)}
                    value={body}/>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Tags</label>
                  <input type="text" id="tags" className="form-control form-control-lg" onChange={(e)=>
                    setTags(e.target.value)}
                    value={tags}/>
                </div>
                
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={updateForumDetails}>Update</button>
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
