import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', content: 'Hi! I am your AI Learning Assistant. How can I help you today? 🤖' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Prepare history for API (exclude the very last user message which is sent as 'message')
            // actually the API expects history + message.
            // Let's send the history excluding the initial greeting if it's mock
            const history = messages.slice(1).map(m => ({
                role: m.role,
                content: m.content
            }));

            const res = await axios.post('/api/learning/chat', {
                message: userMessage.content,
                history: history
            });

            const botMessage = { role: 'model', content: res.data.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, fontFamily: 'Inter, sans-serif' }}>

            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    width: '350px',
                    height: '500px',
                    background: 'white',
                    borderRadius: '15px',
                    boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '20px',
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '15px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1.5rem' }}>🤖</span>
                            <span style={{ fontWeight: 'bold' }}>AI Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        padding: '15px',
                        overflowY: 'auto',
                        background: '#f8f9fa'
                    }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '10px'
                            }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '10px 15px',
                                    borderRadius: '15px',
                                    borderBottomRightRadius: msg.role === 'user' ? '0' : '15px',
                                    borderBottomLeftRadius: msg.role === 'model' ? '0' : '15px',
                                    background: msg.role === 'user' ? '#667eea' : 'white',
                                    color: msg.role === 'user' ? 'white' : '#333',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.4'
                                }}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                                <div style={{ background: 'white', padding: '10px 15px', borderRadius: '15px', borderBottomLeftRadius: '0', color: '#666' }}>
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} style={{
                        padding: '15px',
                        borderTop: '1px solid #eee',
                        display: 'flex',
                        gap: '10px',
                        background: 'white'
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '20px',
                                border: '1px solid #ddd',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            style={{
                                background: '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        fontSize: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default ChatAssistant;
