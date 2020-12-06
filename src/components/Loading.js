import './Loading.css';
import React from 'react';

const Loading = props => {
  return (
    <div>
      {props.loading ? (
        <div className='lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className='info'>
          <p>{props.message}</p>
        </div>
      )}
    </div>
  );
};

export default Loading;
