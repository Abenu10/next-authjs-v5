import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const ServerPage = async () => {
  const user = await currentUser();
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
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          💻 Server component
        </p>
      </CardHeader>
      <CardContent>
        <UserInfo
          label="💻 Server component"
          user={user}
        />
        <div className="space-y-4">
          <Input
            type="text"
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter a topic"
          />
          <Button onClick={handleGenerateQuiz}>
            Generate Quiz
          </Button>
        </div>
        {quizQuestions.length > 0 && (
          <div className="mt-4">
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
                <Button type="submit">
                  Next
                </Button>
              </form>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServerPage;
