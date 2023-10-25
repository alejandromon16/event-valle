import React from 'react'

interface LayoutI {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutI> = ({children}) => {
  return (
    <div>
      <h1>layout test</h1>
      {children}
    </div>
  )
}

export default Layout;
