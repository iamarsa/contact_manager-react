import React from "react";
import { Pagination } from "react-bootstrap";

const pagination = props => {
  const items = [];

  for (let i = 1; i <= Math.ceil(props.total / props.contactsPerPage); i++)
    items.push(
      <Pagination.Item key={i} onClick={() => props.paginate(i)}>
        {i}
      </Pagination.Item>
    );

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default pagination;
