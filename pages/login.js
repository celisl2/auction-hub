import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import React from 'react'
import Link from 'next/link'

const Example = props => {
  return (
  // ...
});

    <div>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  )
}

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});

Example.displayName = 'Example'

Example.propTypes = {}

Example.defaultProps = {}

export default Example
