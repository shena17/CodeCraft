import predefinedPatterns from "./ayalysisPatterns.json";

export function analyzeCode(code) {
  // Perform the analysis for each predefined pattern
  const analysisResults = {};

  Object.keys(predefinedPatterns).forEach((patternName) => {
    const pattern = new RegExp(predefinedPatterns[patternName], "g");

    // Perform the analysis
    const matches = code.match(pattern);

    // Store the analysis result for the current pattern
    analysisResults[patternName] = {
      containsMatch: !!matches, // Check if any matches were found
      matchCount: matches ? matches.length : 0, // Count the number of matches
    };
  });

  return analysisResults;
}
