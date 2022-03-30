import React, {useState} from "react";
import {FormControl, InputGroup} from "react-bootstrap";

const CommentInput = ({comment, handleChange}) => {
    const [description, setDescription] = useState(comment.description)
    return (
        <div>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Comment</InputGroup.Text>
                <FormControl
                    type="text"
                    onInput={(e) => setDescription(e.target.value)}
                    onBlur={() => handleChange({...comment, description})}
                    value={description}
                    required
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
            </InputGroup>
        </div>
    );
};

export default CommentInput;