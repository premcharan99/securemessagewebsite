import React, { useState } from 'react';
import MessageGenerator from './components/MessageGenerator';  // Import the 'Send' component
import MessageRetriever from './components/MessageRetriever';  // Import the 'Receive' component
import './styles.css';  // Import the CSS styles

function App() {
    const [activeComponent, setActiveComponent] = useState('send');  // Default to 'Send'

    return (
        <div>
            {/* Navbar for switching between components */}
            <nav className="navbar">
                <button 
                    onClick={() => setActiveComponent('send')} 
                    className={`nav-link ${activeComponent === 'send' ? 'active' : ''}`}
                >
                    Send
                </button>
                <button 
                    onClick={() => setActiveComponent('receive')} 
                    className={`nav-link ${activeComponent === 'receive' ? 'active' : ''}`}
                >
                    Receive
                </button>
            </nav>

            {/* Conditionally render the content based on activeComponent */}
            <div className="content-container">
                {activeComponent === 'send' ? <MessageGenerator /> : <MessageRetriever />}
            </div>
        </div>
    );
}

export default App;
