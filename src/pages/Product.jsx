import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { AddProducts } from '../slice';
import { useNavigate } from 'react-router-dom';
import { toastMessage } from '../common/method';

const Product = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [values, setValues] = useState({
        img: {},
        title: '',
        description: '',
        qty: '',
        price: '',
        date: new Date(),
    });

    const addFields = () => {
        let isValid = true
        for (let key in values) {
            if (typeof values[key] === 'object') {
                if (!values[key].name) {
                    isValid = false;
                    break;
                }

            } else {
                if (values[key] === '') {
                    isValid = false;
                    break;
                }
            }
        }
        if (!isValid) {
            alert('Some fields are empty');
            return;
        }
        setData((prev) => ([...prev, values]));
    }

    const removeFields = (index) => {
        const store = [...data];
        const newData = store.filter((x, i) => i !== index);
        setData(newData);
    }

    const handleFile = (data) => {
        setValues((prev) => ({ ...prev, img: data }))
    }

    const handleSave = async () => {
        try {
            const formData = new FormData();
            for (let i = 0; i < data.length; i++) {
                formData.append("attachments", data[i].img);
            }
            formData.append("user_data", JSON.stringify(data));
            const response = await AddProducts(formData);
            if (response.data.code === 200) {
                toastMessage("success", response.data.message);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            }
        } catch (error) {
            toastMessage("error", 'Something went wrong')

        }
    }

    return (
        <>
            <InputGroup>
                <input
                    type="file"
                    name='attachments'
                    onChange={(e) => handleFile(e.target.files[0])} className='form-control'
                />
                <Form.Control
                    type='text'
                    onChange={(e) => setValues(() => ({ ...values, title: e.target.value }))}
                    value={values.title}
                    placeholder="Title"
                />
                <Form.Control
                    type='text'
                    onChange={(e) => setValues(() => ({ ...values, description: e.target.value }))}
                    value={values.description}
                    maxLength={250}
                    placeholder="Description"
                />
                <Form.Control
                    type='number'
                    onChange={(e) => setValues(() => ({ ...values, qty: e.target.value }))}
                    value={values.qty}
                    placeholder="qty"
                />
                <Form.Control
                    type='number'
                    onChange={(e) => setValues(() => ({ ...values, price: e.target.value }))}
                    value={values.price}
                    placeholder="price"
                />
                <Form.Control
                    type='date'
                    onChange={(e) => setValues(() => ({ ...values, date: e.target.value }))}
                    value={values.date}
                />
                <Button onClick={() => addFields()} variant='success'>Add</Button>
            </InputGroup>
            <div className='my-3'>
                {
                    data.map((itr, i) => {
                        return (
                            <InputGroup>
                                <Form.Control type='text' disabled value={itr.img.name} placeholder="Title" />
                                <Form.Control type='text' disabled value={itr.title} placeholder="Title" />
                                <Form.Control type='text' disabled value={itr.description} placeholder="Description" />
                                <Form.Control type='number' disabled value={itr.qty} placeholder="qty" />
                                <Form.Control type='number' disabled value={itr.price} placeholder="price" />
                                <Form.Control type='date' disabled value={itr.date} />
                                <Button onClick={() => removeFields(i)} variant='danger'>Remove</Button>
                            </InputGroup>
                        )
                    })
                }
            </div>
            <Button onClick={handleSave} disabled={data.length < 1}>Save</Button>
        </>
    )
}

export default Product
