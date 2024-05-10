import React, { useRef, useState } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import "../../styles/codeEditor.css";
import { Editor } from "@monaco-editor/react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { LANGUAGE_VERSIONS } from "./constants";
import { CODE_SNIPPETS } from "./constants";
import Box from "@mui/material/Box";
import { executeCode } from "./api";
import LoadingButton from "@mui/lab/LoadingButton";
import CodeIcon from "@mui/icons-material/Code";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";

// Import the analyzeCode function
import { analyzeCode } from "../ALA/analysisLogic";

const languages = Object.entries(LANGUAGE_VERSIONS);

export default function CodeEditor() {
  const [loading, setLoading] = useState(false);

  const [alertTitle, setAlertTitle] = useState(true);
  const [alertBody, setAlertBody] = useState(true);
  const [open, setOpen] = useState(false);

  const editorRef = useRef();
  const [value, setValue] = useState("");

  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const [output, setOutput] = useState(null);

  const runCode = async () => {
    setLoading(true);
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) {
      setOpen(true);
      setAlertTitle("Cannot execute null");
      setAlertBody("Please enter your code in the editor");
      setLoading(false);
      return;
    }

    try {
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
    } catch (error) {
      console.log(error);
      setOpen(true);
      setAlertTitle("An error occurred");
      setAlertBody(error.message || "Unable to run code");
    } finally {
      setLoading(false);
    }

    // Perform code analysis
    analyzeCode(sourceCode, language);
  };

  return (
    <>
      <div className="codeAlert">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Collapse in={open}>
            <Alert
              variant="filled"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>{alertTitle}</AlertTitle>
              {alertBody}
            </Alert>
          </Collapse>
        </Stack>
      </div>
      <div className="mb-5">
        <div className="main-top">
          <div className="tutContainer">
            <div className="home-main pageMain codeEditorMain">
              <div className="topic topic-main pageTopic mt-2 codeEditorLeft">
                <div className="editorBtn mx-4">
                  <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    title={language}
                    data-bs-theme="black"
                  >
                    {languages.map(([language, version]) => (
                      <Dropdown.Item
                        onClick={() => onSelect(language)}
                        key={language}
                      >
                        {language}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>
                <Editor
                  height="85vh"
                  theme="vs-dark"
                  defaultLanguage={language}
                  defaultValue={CODE_SNIPPETS[language]}
                  onMount={onMount}
                  value={value}
                  onChange={(value) => setValue(value)}
                />
              </div>
              <div className="topic topic-main pageTopic mt-2 codeEditorRight">
                <div className="editorBtn ">
                  <LoadingButton
                    onClick={runCode}
                    endIcon={<CodeIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    color="success"
                  >
                    <span>Run Code</span>
                  </LoadingButton>
                </div>
                <Box className="codeOutput">
                  {output
                    ? output.map((line, i) => <p key={i}>{line}</p>)
                    : 'Click "Run Code" to see the output here'}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
