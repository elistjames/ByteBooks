// Code initially copied from: https://www.kindacode.com/article/how-to-create-a-read-more-less-button-in-react/
import { useState } from "react";
import { Button } from "react-bootstrap";

import "./ExpandableText.css";

const ExpandableText = ({ children, descriptionLength, disabled}) => {
    const fullText = children;
  
    // Set the initial state of the text to be collapsed
    const [isExpanded, setIsExpanded] = useState(false);
  
    // This function is called when the read more/less button is clicked
    const toggleText = () => {
      setIsExpanded(!isExpanded);
    };
  
    if (disabled) {
        return <p>{ fullText }</p>
    }
    return (
      <p>
        {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}...`}
        <br></br><br></br>
        <div className="expand-button-container">
            <Button className="expand-button" onClick={toggleText}>
            {isExpanded ? 'Show less' : 'Show more'}
            </Button>
        </div>
      </p>
    );
  };

  export default ExpandableText;