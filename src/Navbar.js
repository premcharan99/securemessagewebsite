import React, { useState } from 'react';
import MessageGenerator from './components/MessageGenerator';  // Make sure this path is correct
import MessageRetriever from './components/MessageRetriever';  // Make sure this path is correct
import './styles.css';  // Ensure this file has all relevant styles

function App() {
    const [activeComponent, setActiveComponent] = useState('send');  // Set the default active component to 'send'

    return (
        <div>
            {/* Navbar for switching between components */}
            <nav className="navbar">
                <button 
                    onClick={() => setActiveComponent('send')}  // Switch to 'send' component
                    className={`nav-link ${activeComponent === 'send' ? 'active' : ''}`}  // Apply 'active' class conditionally
                >
                    Send
                </button>
                <button 
                    onClick={() => setActiveComponent('receive')}  // Switch to 'receive' component
                    className={`nav-link ${activeComponent === 'receive' ? 'active' : ''}`}  // Apply 'active' class conditionally
                >
                    Receive
                </button>
            </nav>

            {/* Center the content based on selected component */}
            <div className="content-container">
                {activeComponent === 'send' && <MessageGenerator />}  {/* Show MessageGenerator when activeComponent is 'send' */}
                {activeComponent === 'receive' && <MessageRetriever />}  {/* Show MessageRetriever when activeComponent is 'receive' */}
            </div>
        </div>
    );
}

export default App;
