import React from 'react';

const BoardItem = (props) => {
    return <div className={`board-item ${props.type}`}></div>;
}

export default BoardItem;