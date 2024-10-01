import React, { useState } from 'react';
import './Page.css';
import logo from '../../imgs/Logo.svg';
import { Pagination } from 'react-bootstrap';

const CreateProjectForm = () => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="pagination-container fixed-bottom mb-2">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(activePage > 1 ? activePage - 1 : 1)} />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === activePage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(activePage < totalPages ? activePage + 1 : totalPages)} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </div>
    
  );
};

export default CreateProjectForm;
