import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, Table} from "react-bootstrap";
import AddModal from "../AddModal/AddModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const Products = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [item, setItem] = useState(null)
    const handleModal = (modal, set, item) => {
        set(!modal)
        setItem(item)
    }

    const products = useSelector(state => state.products)
    const computedData = products.map((i, index) => {
        const comments = i.comments.map((c, index) => <div key={index}>{c.description}</div>)
        return (
            <tr key={index}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.count}</td>
                <td>{i.imageUrl}</td>
                <td>{i.size.width}</td>
                <td>{i.size.height}</td>
                <td>{i.weight}g</td>
                <td>{comments}</td>
                <td>
                    <div>
                        <Button
                            onClick={() => handleModal(showConfirmModal, setShowConfirmModal, i)}
                            variant="danger"
                        >
                            delete
                        </Button>
                    </div>
                </td>
                <td>
                    <div>
                        <Button
                            onClick={() => handleModal(showAddModal, setShowAddModal, i)}
                            variant="warning"
                        >
                            edit
                        </Button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <Button
                onClick={() => {
                    setItem(null)
                    handleModal(showAddModal, setShowAddModal)
                }}
            >
                Add Product
            </Button>
            <AddModal show={showAddModal} products={products} item={item}
                      handle={() => handleModal(showAddModal, setShowAddModal)}/>
            <ConfirmModal id={item ? item.id : null} products={products} show={showConfirmModal}
                          handle={() => handleModal(showConfirmModal, setShowConfirmModal)}/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Count</th>
                    <th>Url</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Comments</th>
                    <th>Delete Item</th>
                    <th>Edit Item</th>
                </tr>
                </thead>
                <tbody>
                {computedData}
                </tbody>
            </Table>
        </div>
    );
};

export default Products;