import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css'; // Import the CSS file

const MessageGenerator = () => {
    const [message, setMessage] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [codeVisible, setCodeVisible] = useState(false);
    const [timer, setTimer] = useState('');
    const [isGenerateActive, setIsGenerateActive] = useState(false);

    const generateCode = () => {
        if (!isGenerateActive) return;
        const code = Math.random().toString(36).substring(2, 8); // 6-char code
        axios.post('http://localhost:5000/api/messages/generate', { message, code })
            .then(() => {
                setGeneratedCode(code);
                setCodeVisible(true);
            })
            .catch(err => console.error('Error generating message:', err));
    };

    const copyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        alert("Code copied!");
    };

    const handleTimerChange = (e) => {
        setTimer(e.target.value);
        if (e.target.value) {
            setIsGenerateActive(true); // Activate generate button when timer is selected
        }
    };

    return (
        <div className="content-container">
            <h1 className="title">Secure Message Transfer</h1>
            <div className="input-section">
                <h2 className="sub-title">SEND</h2>
                <p>Generate your Unique code by entering the text and selecting the timer</p>
                <textarea
                    className="message-box"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                
                <div className="timer-container">
                    <label className="timer-label">Set Timer:</label>
                    <select className="timer-dropdown" value={timer} onChange={handleTimerChange}>
                        <option value="">Select Timer</option>
                        <option value="15 mins">15 mins</option>
                        <option value="30 mins">30 mins</option>
                        <option value="1 hr">1 hour</option>
                        <option value="2 hrs">2 hours</option>
                    </select>
                </div>

                <button 
                    className={`generate-btn ${isGenerateActive ? 'active' : ''}`} 
                    onClick={generateCode} 
                    disabled={!isGenerateActive}
                >
                    Generate
                </button>

                {codeVisible && (
                    <div className="output-section">
                        <label className="code-label">Your Unique Code:</label>
                        <input className="code-box" value={generatedCode} readOnly />
                        <button className="copy-btn" onClick={copyCode}>Copy</button>
                    </div>
                )}

                <p className="note">Note: The generated code will only be valid for the selected time.</p>
            </div>
        </div>
    );
};

export default MessageGenerator;
