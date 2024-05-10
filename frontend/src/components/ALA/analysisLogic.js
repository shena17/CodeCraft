import axios from "axios";
import predefinedPatterns from "./ayalysisPatterns.json";

export async function analyzeCode(code, language) {
  const token = localStorage.getItem("token");

  // Perform the analysis for each predefined pattern
  const analysisResults = {};
  const tags = [];
  tags.push(language);

  Object.keys(predefinedPatterns).forEach((patternName) => {
    const pattern = new RegExp(predefinedPatterns[patternName], "g");

    // Perform the analysis
    const matches = code.match(pattern);

    // Store the analysis result for the current pattern
    const result = (analysisResults[patternName] = {
      containsMatch: !!matches, // Check if any matches were found
    });

    if (result.containsMatch) {
      // alert(`${language} Code contains ${patternName}`);

      tags.push(patternName);
    }
  });

  console.log(tags);

  try {
    const response = await axios.post(
      "http://localhost:8071/ala/createAla",
      {
        tags,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Notification sent successfully:", response.data);
  } catch (error) {
    console.log("Error sending notification:", error);
    console.log("Error sending notification:", error.response);
  }

  // return analysisResults;
}
