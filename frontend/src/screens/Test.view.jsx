import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/Navbar.jsx";
import { surveyData } from "../data/questions.js";
import { Fullscreen } from "lucide-react";

export default function SurveyPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [currentModule, setCurrentModule] = useState(0);
  const [answers, setAnswers] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const module = surveyData[currentModule];
  const totalModules = surveyData.length;

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to auth if the user is not logged in
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [`${currentModule}-${questionIndex}`]: answer,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Check if the user is logged in before making the API call
      if (user) {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });

        if (response.ok) {
          const data = await response.json();
          setReportData(data);
          // If the response is successful, navigate to /report with reportData in state
          navigate("/report", { state: { reportData: data } });
        } else {
          console.error("Failed to submit data");
        }
      } else {
        // Redirect to auth if the user is not logged in
        navigate("/auth");
      }
    } catch (err) {
      console.error("Error while submitting the survey", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextModule = () => {
    if (currentModule < totalModules - 1) {
      setCurrentModule(currentModule + 1);
    } else {
      handleSubmit(); // Submit survey if it's the last module
    }
  };

  const isModuleComplete = module.questions.every(
    (_, index) => answers[`${currentModule}-${index}`]
  );
  
  return (
    <>
     
      {/* Navbar */}
      <Navbar />

      {/* Survey Content */}
      <div className="min-h-screen bg-transparent flex justify-center items-center md:pt-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
          </div>
        ) : (
          <Card className="w-full max-w-6xl px-6 py-10 lg:px-16 lg:py-12 xl:px-20 xl:py-16 bg-white shadow-lg mx-4">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-blue-600">{module.module}</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Survey questions */}
              {module.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-6 text-left">
                  <h2 className="text-lg lg:text-xl font-medium mb-2">
                    {`Q${questionIndex + 1}. ${question.question}`}
                  </h2>
                  <br />
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-centre space-x-2"
                      >
                        <input
                          type="radio"
                          id={`q${questionIndex}-opt${optionIndex}`}
                          name={`q${questionIndex}`}
                          value={option}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                          onChange={() =>
                            handleAnswerChange(questionIndex, option)
                          }
                          checked={
                            answers[`${currentModule}-${questionIndex}`] ===
                            option
                          }
                        />
                        <label htmlFor={`q${questionIndex}-opt${optionIndex}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Next / Submit Button */}
              <Button
                onClick={handleNextModule}
                disabled={!isModuleComplete || !user}
                className="mt-4 w-full md:w-auto"
              >
                {currentModule === totalModules - 1
                  ? "Complete Survey"
                  : "Next Module"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
