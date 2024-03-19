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
     </div>
         
   
  )
}
