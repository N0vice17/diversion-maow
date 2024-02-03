import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export function Card({ children, className }) {
  return (
    <div className={`${className} rounded flex bg-white border-gray-300 border p-12 gap-10 `}>{children}</div>
  )
}

export function Input({ className, label, type }) {
  return (
    <div className={className}>
      <p>{label} <a className="text-red-900">*</a></p>
      <input title="ankan" type={type} className="rounded w-full text-md p-2 border-red-700 border" />
    </div>
  )
}

export function AadharInputComponent() {
  const [aadharNumber, setAadharNumber] = useState("");
  const [isAadharValid, setIsAadharValid] = useState(false);
  const { setAadhar } = useAdharContext()

  const handleAadharChange = (e) => {
    const aadharValue = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(aadharValue) && aadharValue.length <= 12) {
      setAadharNumber(aadharValue);
      setIsAadharValid(aadharValue.length === 12);
    }

  };
  useEffect(() => setAadhar(aadharNumber), [isAadharValid])

  const inputStyle = {
    borderColor: isAadharValid ? 'green' : 'initial',
  };

  return (
    <div>
      <label htmlFor="aadharInput" style={{ display: 'block', marginBottom: '8px' }}>
        Aadhar Number (numeric, 12 digits):  <MandatorySymbol />
      </label>
      <input
        id="aadharInput"
        type="text"
        value={aadharNumber}
        onChange={handleAadharChange}
        style={inputStyle}
        maxLength="12"
        className="p-1 max-w border border-gray-200 text-xl"
      />
      {isAadharValid && <p style={{ color: 'green' }}>Aadhar number is valid!</p>}
    </div>
  );
}


export function OtpInput() {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input on entry
    if (element.value && index < 3) {
      element.nextSibling?.focus();
    }
  };

  const handleKeyUp = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      const prevSibling = event.target.previousSibling;
      if (prevSibling) {
        prevSibling.focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyUp={(e) => handleKeyUp(e, index)}
          className="w-12 h-12 border-2 border-gray-300 rounded text-center text-lg focus:border-blue-500 focus:outline-none"
          pattern="\d*"
        />
      ))}
    </div>
  );
}


export function VoterIdInputComponent() {
  const [voterId, setVoterIdNumber] = useState("");
  const [isVoterIdValid, setIsVoterIdValid] = useState(false);

  const {setVoterId} = useVoterContext()

  const handlePanChange = (e) => {
    const panValue = e.target.value.toUpperCase();
    const alphanumericRegex = /^[A-Z0-9]*$/;

    if (alphanumericRegex.test(panValue) && panValue.length <= 10) {
      setVoterIdNumber(panValue);
      setIsVoterIdValid(panValue.length === 10);
    }
  };
  useEffect(() => {setVoterId(voterId)}, [isVoterIdValid])


  const inputStyle = {
    borderColor: isVoterIdValid ? 'green' : 'initial',
  };

  return (
    <div>
      <label htmlFor="panInput" style={{ display: 'block', marginBottom: '8px' }}>
        Voter ID(alphanumeric, 10 characters): <MandatorySymbol />
      </label>
      <input
        id="panInput"
        type="text"
        value={voterId}
        onChange={handlePanChange}
        style={inputStyle}
        maxLength="10"
        className="p-1 max-w  border border-gray-200 text-xl"
      />
      {isVoterIdValid && <p style={{ color: 'green' }}>PAN is valid!</p>}
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DotLottiePlayer } from "@dotlottie/react-player";
import { useAdharContext } from "./AdharContext";
import { useVoterContext } from "./VoterContext";

export function Footer() {
  return (
    <footer className="footer w-full">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p>This is just a demo. The software is available under the MIT License.</p>
        <div className="helpline">
          <p>Helpline: <FontAwesomeIcon icon={faPhone} /> +1-234-567-8900</p>
          <p>
            Contact us on WhatsApp: <FontAwesomeIcon icon={faWhatsapp} /> +1-234-567-8901
          </p>
        </div>
        <div className="social-media">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
}


export function StepNavigator() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);

  const steps = [
    { path: '/', label: 'Enter Details' },
    { path: '/verification', label: 'Verification' },
    { path: '/connect', label: 'Connect Wallet' },
    { path: '/vote', label: 'Vote' },
  ];

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  // Find the index of the current step
  const currentStepIndex = steps.findIndex(step => step.path === currentPath);
  // Calculate the progress percentage
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full">
      <div className="relative w-full h-4 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-4 bg-blue-700 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          return (
            <div
              key={step.path}
              className={`absolute top-0 -mt-2 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center ${isActive ? 'bg-blue-700 text-white' : 'bg-gray-200'
                }`}
              style={{ left: `${(index / (steps.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs mt-2">
        {steps.map((step, index) => (
          <div key={step.path} className="text-center w-8">
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MandatorySymbol() {
  return <span className="text-red-700">*</span>
}


export function NavBar() {
  return (
    <>
      <nav className="h-10 bg-white"></nav>
      <div className="hidden xl:block h-5 bg-blue-700 shadow shadow-neutral-300"></div>
    </>
  )
}


export default function SurveillancePopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="z-100 fixed inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg max-w-sm w-full mx-auto p-6">
        <DotLottiePlayer
          src={"/a.lottie"}
          autoplay
        />
        <h2 className="text-lg font-semibold text-gray-900">Camera Surveillance</h2>
        <p className="text-gray-600">
          You are under camera surveillance. Please be aware that your actions are being monitored for security purposes.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}


// Add styles for the animation
const faqStyles = {
  transition: 'max-height 0.3s ease-in-out, padding 0.3s ease-in-out',
  overflow: 'hidden',
};

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Error of a Technical Nature?” 🛠️',
      answer: 'Contact 90-9990-91111.',
    },
    {
      question: '“Are my votes secure?” 🔒🗳️',
      answer: 'Yes, in brief.” ✅',
    },
    {
      question: 'How does blockchain enhance the security of online voting ?',
      answer: 'Blockchain technology provides inherent security by ensuring that original information is unchangeable. It acts as a single source of truth and tracks any recorded data. When applied to voting, this can lead to unaltered votes, increased transparency, improved online accessibility, and more organized voting processes',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left"
              >
                {faq.question}
                <span>{activeIndex === index ? '-' : '+'}</span>
              </button>
            </h3>
            <div
              style={{
                ...faqStyles,
                maxHeight: activeIndex === index ? '200px' : '0px',
                padding: activeIndex === index ? '1rem' : '0rem 1rem',
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
