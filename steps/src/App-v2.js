import { useState } from "react";

const message = ["Learn React ❄", "Apply for jobs 💼", "Invest your income 🤑"];
export default function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
    </div>
  );
}
function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }
  return (
    <div>
      <button className="close" onClick={() => setIsOpen((open) => !open)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <Message step={step}>
            {message[step - 1]}
          </Message>
          <div className="buttons">
            <Button
              textColor={"#fff"}
              bgColor={"#7950f2"}
              onClick={handlePrevious}
            >
              <span>👈</span>Previous
            </Button>
            <Button textColor={"#fff"} bgColor={"#7950f2"} onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
function Message({step, children}) {
  return <div className="message">
    <h3>Step {step}:</h3>
    {children}
  </div>;
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
