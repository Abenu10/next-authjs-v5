import { useState } from "react";

const mockAIResponse = (topic) => {
  return [
    {
      question: `What is the main concept of ${topic}?`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      answer: "Option 1",
    },
    {
      question: `How does ${topic} impact daily life?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option B",
    },
  ];
};

const QuizPage = () => {
  const [topic, setTopic] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleGenerateQuiz = () => {
    const questions = mockAIResponse(topic);
    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
    setShowResults(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    } else {
      setShowResults(true);
    }
  };

  return (
    <div>
      <h1>AI-Powered Quiz App</h1>
      <div>
        <input
          type="text"
          value={topic}
          onChange={handleTopicChange}
          placeholder="Enter a topic"
        />
        <button onClick={handleGenerateQuiz}>Generate Quiz</button>
      </div>
      {quizQuestions.length > 0 && (
        <div>
          {showResults ? (
            <div>
              <h2>Your Score: {score}</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>{quizQuestions[currentQuestionIndex].question}</h2>
              {quizQuestions[currentQuestionIndex].options.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                    />
                    {option}
                  </label>
                </div>
              ))}
              <button type="submit">Next</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
