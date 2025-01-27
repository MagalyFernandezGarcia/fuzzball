import React, { useState } from "react";
import * as fuzzball from "fuzzball";

const FuzzBallMatcher: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    bestMatch: string;
    score: number;
    isMatch: boolean;
  } | null>(null);

  const fakeValues = {
    fr: "Harry Potter à l'école des sorciers",
    en: "Harry Potter and the philosopher's stone",
    alt: "Harry Potter 1",
  };

  const handleMatch = () => {
    const scores = Object.entries(fakeValues).map(([key, response]) => {
      const score = fuzzball.ratio(input, response);
      return { key, response, score };
    });

    const bestMatch = scores.reduce((best, current) => 
      current.score > best.score ? current : best,
        { key: "", response: "", score: 0 }
    );

    const isMatch = bestMatch.score >= 80;

    setResult({
      bestMatch: bestMatch.response, score: bestMatch.score, isMatch})


  };

  return (
    <div>
      <h1>Fuzzball matcher</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Entrez votre réponse"
      />
      <button onClick={handleMatch}>Valider</button>
      {result && (
        <div>
          <h2>Résultat</h2>
          <p>Meilleure correspondance: {result.bestMatch}</p>
          <p>Pourcentage: {result.score}</p>
          <p>Correspondance suffisante: {result.isMatch ? "Oui" : "Non"}</p>
        </div>
      )}
    </div>
  );
};

export default FuzzBallMatcher;
