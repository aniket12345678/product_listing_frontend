import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'

const Paginate = (props) => {
  const { total, allProducts, search, dateObj } = props;
  const [pageNumber, setPageNumber] = useState(1);

  const handlePageNumber = (data) => {
    setPageNumber(data)
    allProducts(search, dateObj, data)
  }
  const limit = Math.ceil(total / 3);

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageNumber(1)} />
      {
        pageNumber > 1 &&
        <Pagination.Prev onClick={() => handlePageNumber(pageNumber - 1)} />
      }
      {
        Array(limit).fill(0).map((x, i) => i + 1).map((itr) => {
          return (
            <Pagination.Item onClick={() => handlePageNumber(itr)} active={pageNumber === itr}>
              {itr}
            </Pagination.Item>
          )
        })
      }
      {
        pageNumber < limit &&
        <Pagination.Next onClick={() => handlePageNumber(pageNumber + 1)} />
      }
      <Pagination.Last onClick={() => handlePageNumber(limit)} />
    </Pagination>
  )
}

export default Paginate
