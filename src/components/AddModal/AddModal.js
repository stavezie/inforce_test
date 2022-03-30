import React, {useEffect, useState} from 'react';
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import CommentInput from "../CommentInput/CommentInput";

const AddModal = ({show, handle, item, products}) => {
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [count, setCount] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [comments, setComments] = useState([])

    const handleChange = (comment, c, cIndex) => {
        if (comment.id) {
            const index = comments.findIndex(({id}) => id === comment.id)
            setComments([...comments.slice(0, index), comment, ...comments.slice(index + 1)])
        } else if (c.description === '') {
            setComments([...comments.slice(0, comments.length - 1), comment])
        } else {
            setComments([...comments.slice(0, cIndex), comment, ...comments.slice(cIndex + 1)])
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true)
            addProduct();
        }
    };

    useEffect(() => {
        setCount(item?.count || '')
        setName(item?.name || '' )
        setWidth(item?.size.width || '')
        setHeight(item?.size.height || '')
        setWeight(item?.weight || '')
        setComments(item?.comments || [])
    }, [item])

    const addProduct = () => {
        const newId = products[products.length - 1].id + 1;
        if (!item) {
            dispatch({type: 'ADD_PRODUCT', payload: {id: newId, imageUrl, name, count, size: {width, height}, weight, comments}})
        } else {
            const newItem = {id: item.id, imageUrl, name, count, size: {width, height}, weight, comments}
            const newProducts = products.map(i => i.id === item.id ? newItem : i);
            dispatch({type: 'UPDATE_PRODUCT', payload: newProducts})
        }
        handle()
        setCount('')
        setName('')
        setWidth('')
        setHeight('')
        setWeight('')
    }

    const computedComments = comments.map((c,cIndex) => (
        <CommentInput key={cIndex} comment={c} handleChange={(comment) => handleChange(comment, c, cIndex)}/>
    ))

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                        <FormControl value={name} required aria-label="Small" aria-describedby="inputGroup-sizing-sm" onInput={(e) => setName(e.target.value)}/>
                    </InputGroup>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Count</InputGroup.Text>
                        <FormControl value={count} required aria-label="Small" aria-describedby="inputGroup-sizing-sm" onInput={(e) => setCount(e.target.value)}/>
                    </InputGroup>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Width</InputGroup.Text>
                        <FormControl value={width} required aria-label="Small" aria-describedby="inputGroup-sizing-sm" onInput={(e) => setWidth(e.target.value)}/>
                    </InputGroup>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Height</InputGroup.Text>
                        <FormControl value={height} required aria-label="Small" aria-describedby="inputGroup-sizing-sm" onInput={(e) => setHeight(e.target.value)}/>
                    </InputGroup>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Weight</InputGroup.Text>
                        <FormControl value={weight} required aria-label="Small" aria-describedby="inputGroup-sizing-sm" onInput={(e) => setWeight(e.target.value)}/>
                    </InputGroup>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Image</InputGroup.Text>
                        <FormControl type='file' required aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setImageUrl(e.target.files[0].name)}/>
                    </InputGroup>

                    <div>
                        {computedComments}
                    </div>
                    <div>
                        <Button onClick={() => setComments([...comments, {description: ''}])}>AddComment</Button>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handle}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    );
};

export default AddModal;