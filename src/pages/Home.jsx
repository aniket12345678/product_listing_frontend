import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { FetchProducts } from '../slice';
import Paginate from '../components/Paginate';
import moment from 'moment';


const Home = () => {
    const [search, setSearch] = useState('');
    const [dateObj, setDateObj] = useState({
        startDate: '',
        endDate: ''
    });
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(10);

    useEffect(() => {
        allProducts(search, dateObj, 1);
    }, [search, dateObj]);

    function allProducts(search, dateObj, data) {
        FetchProducts(search, dateObj, data).then((res) => {
            setData(res.data.data.products);
            setTotalRecords(res.data.data.total_pages);
        }).catch((err) => {
            console.log('err:- ', err);
        })
    }

    function shorten(data) {
        return data.length > 50 ? data.slice(0, 50) + '...' : data
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <div>Start date</div>
                    <input
                        type="date"
                        className='form-control'
                        value={dateObj.startDate}
                        onChange={(e) => setDateObj(() => ({ ...dateObj, startDate: e.target.value }))}
                        max={dateObj.endDate}
                    />
                </Col>
                <Col md={6}>
                    <div>End date</div>
                    <input
                        type="date"
                        className='form-control'
                        value={dateObj.endDate}
                        onChange={(e) => setDateObj(() => ({ ...dateObj, endDate: e.target.value }))}
                        min={dateObj.startDate}
                    />
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((itr, i) => {
                            const { title, description, qty, price, date, _id } = itr;
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img
                                            src={`${import.meta.env.VITE_BASE_URL}/img/${_id}`}
                                            alt="alternate"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    </td>
                                    <td>{title}</td>
                                    <td>{shorten(description)}</td>
                                    <td>{qty}</td>
                                    <td>{price}</td>
                                    <td>{moment(date).format('M/D/yy')}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Paginate search={search} dateObj={dateObj} total={totalRecords} allProducts={allProducts} />
        </>
    )
}

export default Home
