import "../styles/styles.css";
import Footer from "../Footer";
import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";

export default function EditTutorials() {

    const [tutorialid, setTutorialid] = useState("");
    const [url, setUrl] = useState("");
    const [attach, setAttach] = useState("");
    const [heading, setheading] = useState("");
    const [tags, setTags] = useState("");

   
  
    const [error, setError] = useState();
  
    const params = useParams();
  
    const getSelectedTutorial = () => {
      axios.get(`http://localhost:8071/tutorials/${params.id}`)
        .then((response) => {
          console.log(response.data);
          setTutorialid(response.data.tutorialid);
          setUrl(response.data.url);
          setAttach(response.data.attach);
          setheading(response.data.heading);
          setTags(response.data.tags);

         
        })
      }
  
      useEffect(()=>{
        getSelectedTutorial();
      },[]);
  
    const updateTutorialDetails = (e) => {
      e.preventDefault();
  
      let updateData = {
        tutorialid: tutorialid,
        url: url,
        attach: attach,
        heading: heading,
        tags: tags,

       
      }
  
      axios.put(`http://localhost:8071/tutorials/${params.id}`, updateData)
        .then(() => {
          alert("Tutorial details updated");
          window.location.href = "/admin/tutorials";

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
              <h2 className="text-uppercase text-center mb-5">Update Tutorial</h2>
              <form className="createUpdate" >
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example1cg">Tutorial ID</label>
                  <input type="text" id="tutorialid" className="form-control form-control-lg"  onChange={(e)=>
                    setTutorialid(e.target.value)}
                    value={tutorialid}  readOnly/>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">Video Link</label>
                  <input type="text" id="url" className="form-control form-control-lg" onChange={(e)=>
                    setUrl(e.target.value)}
                    value={url} />
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Resources acccess link</label>
                  <input type="text" id="attach" className="form-control form-control-lg" onChange={(e)=>
                    setAttach(e.target.value)}
                    value={attach}/>
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Heading</label>
                  <input type="text" id="heading" className="form-control form-control-lg" onChange={(e)=>
                    setheading(e.target.value)}
                    value={heading}/>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">Tags</label>
                  <input type="text" id="tags" className="form-control form-control-lg" onChange={(e)=>
                    setTags(e.target.value)}
                    value={tags}/>
                </div>
                
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={updateTutorialDetails}>Update</button>
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
