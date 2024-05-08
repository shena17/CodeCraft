export function analyzeCode(code) {
  const pattern = /console\.log\(/g; // Define the pattern to search for

  // Perform the analysis
  const matches = code.match(pattern);

  // Return the analysis result
  return {
    containsConsoleLog: !!matches, // Check if any matches were found
    matchCount: matches ? matches.length : 0, // Count the number of matches
  };
}
