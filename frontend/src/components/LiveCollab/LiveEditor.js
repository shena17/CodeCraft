import React, { useEffect, useRef} from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import '../../styles/liveEditor.css'
import { Socket } from 'socket.io-client'
import ACTIONS from '../../Actions'

export default function LiveEditor({socketRef, roomId, onCodeChange}) { 
    
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

        editorRef.current.on('change', (instance, changes) => {
          //console.log('changes', changes)
          const {origin} = changes;
          const code = instance.getValue();
          onCodeChange(code);
          if(origin !== 'setValue'){
            socketRef.current.emit(ACTIONS.CODE_CHANGE, {
              roomId,
              code,
            })
          }
          //console.log(code);
        })

        return () => {
            if(editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current=null;
            }
        }
    }
    init()
  }, [])

  useEffect(() => {
    if(socketRef.current){
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if(code !== null){
            editorRef.current.setValue(code);
        }
      })
    }
  },[socketRef.current])

  return (

    <div className='editorCenter'>
        <textarea id="realtimeEditor" ref={textareaRef}></textarea>
    </div>
         
   
  )
}
