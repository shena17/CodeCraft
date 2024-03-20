import React, { useEffect, useRef} from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import '../../styles/liveEditor.css'

export default function LiveEditor() { 
    
  const textareaRef = useRef(null);
  const editorRef = useRef(null);  

  useEffect(() => {

    async function init() {
        if(textareaRef.current && !editorRef.current){
            editorRef .current = Codemirror.fromTextArea(textareaRef.current, {
                mode: 'javascript',
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            })
        }
    
        return () => {
            if(editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current=null;
            }
        }
    }
    init()
  }, [])

  return (

    <div className='editorCenter'>
        <textarea id="realtimeEditor" ref={textareaRef}></textarea>

        <div className="row m-3">
            <div className="col">
                <div className='custom-textarea'>
                    <label for = "inputforCode">Input</label>
                    <textarea type="text" class="form-control" placeholder="First name" aria-label="First name"></textarea>
                    <label for = "outputforCode">Output</label>
                    <textarea type="text" class="form-control" placeholder="First name" aria-label="First name"></textarea>
                </div>
             </div>
        </div>

        <div className='chooseoption'>
                    <div class="col-12 w-25">
                        <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
                        <select class="form-select" id="inlineFormSelectPref">
                            <option selected>Choose...</option>
                            <option value="Java">Java</option>
                            <option value="Cpp">Cpp</option>
                            <option value="Python">Python</option>
                        </select>
                    </div>

    
        </div>

        <div className='successBtn'>
                        <button type="button" class="btn btn-outline-success"><i class="bi bi-play">Run the Code</i></button>
                    </div>     
    </div>
         
   
  )
}
