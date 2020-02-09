import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import React from 'react'

const Example = props => {
  return (
    <div>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  );
};

Example.displayName = 'Example'

Example.propTypes = {}

Example.defaultProps = {}

export default Example
