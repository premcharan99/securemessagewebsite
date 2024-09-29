import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; // Import the CSS file
import Prism from 'prismjs'; // Import Prism.js
import 'prismjs/themes/prism.css'; // Import Prism CSS for styling

const MessageRetriever = () => {
    const [code, setCode] = useState('');
    const [retrievedMessage, setRetrievedMessage] = useState('');

    const retrieveMessage = () => {
        axios.get(`http://localhost:5000/api/messages/retrieve/${code}`)
            .then(response => setRetrievedMessage(response.data.message))
            .catch(err => console.error('Error retrieving message:', err));
    };

    const copyMessage = () => {
        navigator.clipboard.writeText(retrievedMessage);
        alert('Message copied to clipboard');
    };

    // UseEffect for syntax highlighting
    useEffect(() => {
        Prism.highlightAll(); // Highlight the code in the message
    }, [retrievedMessage]);

    return (
        <div className="content-container">
            <h2 className="sub-title">Retrieve a Message</h2>
            <div className="input-container">
                <input
                    className="input"
                    type="text"
                    placeholder="Enter generated code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={retrieveMessage} className="retrieve-btn">Get Message</button>
            </div>
            {retrievedMessage && (
                <div className="output-container">
                    <pre className="message-output">
                        <code>
                            {retrievedMessage}
                        </code>
                    </pre>
                    <button onClick={copyMessage} className="copy-btn">Copy Message</button>
                </div>
            )}
        </div>
    );
};

export default MessageRetriever;
