import { useState } from "react";
import "./PostGenerator.css";
import {generatePost} from '../assistant/googleai';
import ReactMarkdown from 'react-markdown'; 
import { ClipLoader } from "react-spinners";


const PostGenerator = () => {

    const [postIdea, setPostIdea] = useState('');
    const [tone, setTone] = useState('Professional');
    const [generatedPost, setGeneratedPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const[charCount, setCharCount] = useState(0);
    const [audienceFocus, setAudienceFocus] = useState('General');
    const [postType, setPostType] = useState('');
    const [isMarkdown, setIsMarkdown] = useState(false);
    
    const MAX_CHAR_LIMIT = 300;


    const handleTextChange= (e) =>{
        setPostIdea(e.target.value)
        setCharCount(e.target.value.length)
    }

    const handleGeneratePost = async () => {
        if(!postIdea.trim()){
            setError('Please enter a post idea.');
            return;
        }
        if (postIdea.length > MAX_CHAR_LIMIT) {
            setError(`Post idea exceeds ${MAX_CHAR_LIMIT} characters.`);
            return;
        }
        setError('');
        setLoading(true);

        try{
            const post = await generatePost(postIdea, tone, audienceFocus, postType, isMarkdown);
            setGeneratedPost(post);
        }catch(error){
            setError('Error generating post. Please try again.');
        }finally{
            setLoading(false);
        }

        // Mock API logic with delay
        // setTimeout(() => {
        //     const mockPost = `Here's a ${tone.toLowerCase()} post idea based on: "${postIdea}"`;
        //     setGeneratedPost(mockPost);
            
        // }, 2000); // Mock delay for demonstration
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(generatedPost);
        alert('Post copied to clipboard!');
    };

    return (
        <div className="post-generator-container">
            <div className="post-text-container">
                <textarea
                value={postIdea}
                placeholder={"What's your post idea?"}
                onChange={handleTextChange}
                maxLength={MAX_CHAR_LIMIT}
                />
                <p className="char-counter-container">{charCount}/{MAX_CHAR_LIMIT}</p>
            </div>
            
            <div className="post_options_container">
                <div className="tone-select options_item">
                    <label htmlFor="tone">Tone:
                        <span className="tooltip" data-tooltip="Select the desired tone of the post">❔</span>
                    </label>
                    <select
                        id="tone"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    >
                        <option value="Professional">Professional</option>
                        <option value="Casual">Casual</option>
                        <option value="Motivational">Motivational</option>
                        <option value="Humorous">Humorous</option>
                        <option value="Action-Oriented">Action Oriented</option>
                        <option value="Thought-Provoking">Thought Provoking</option>
                    </select>
                </div>

                {/* Audience Focus */}
                <div className="options_item">
                    <label htmlFor="audienceFocus">Audience Focus:
                        <span className="tooltip" data-tooltip="Specify your target audience">❔</span>
                    </label>
                    <select 
                        id = "audienceFocus"
                        value={audienceFocus} 
                        onChange={(e) => setAudienceFocus(e.target.value)}>
                    <option value="General">General</option>
                    <option value="Students/Early-career">Students/Early Career</option>
                    <option value="Developers">Developers</option>
                    <option value="Entrepreneurs">Entrepreneurs</option>
                    <option value="Creatives">Creatives</option>
                    <option value="Managers">Managers</option>
                    <option value="Recruiters">Recruiters</option>
                </select>
                </div>
                

                {/* Post Type */}
                <div className="options_item">
                    <label htmlFor="postType">Post Type:
                        <span className="tooltip" data-tooltip="Choose the type of the post content">❔</span>
                    </label>
                    <select 
                        id = "postType"
                        value={postType} 
                        onChange={(e) => setPostType(e.target.value)}>
                        <option value="">Select Post Type</option>
                        <option value="Informational">Informational</option>
                        <option value="Storytelling">Storytelling</option>
                        <option value="Achievement-Based">Achievement</option>
                        <option value="Call-to-Action">Call-to-Action</option>
                        
                    </select>
                </div>               
                
            </div>

            <div className="content-format">
                {/* <label htmlFor="markdownSwitch" className="switch-label">
                    
                </label> */}
                <label className="switch">
                    <input
                        type="checkbox"
                        id="markdownSwitch"
                        checked={isMarkdown}
                        onChange={() => setIsMarkdown(!isMarkdown)}
                    />
                    <span className="slider round"></span>
                </label>
                <span 
                    className="tooltip markdown-tooltip"
                    data-tooltip="Enable this option to generate content with Markdown formatting."
                >❔</span>
            </div>

            <button onClick={handleGeneratePost} disabled={loading}>
                 {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Generate Post'}
            </button>

            {error && <p className="error">{error}</p>}

            {generatedPost && (
                <div className="post-preview-container">
                    <h3>Generated Post:</h3>
                    <div className="post-preview">
                        <ReactMarkdown>{generatedPost}</ReactMarkdown>
                    </div>
                    <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
                </div>
            )}
            
        </div>
    )
}

export default PostGenerator;