import React from 'react';

import {MenuProvider} from './MenuContext';

// Combine your providers here in case you have multiple contexts
// you want to use
const ContextProviders = ({children}) => {
  return (
    <MenuProvider>
      {children}
    </MenuProvider>
  )
}

export {MenuContext} from './MenuContext';
export default ContextProviders;