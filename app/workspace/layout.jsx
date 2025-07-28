import React from 'react'
import WorkspaceProvider from './provider'

function WorkSpaceLayout({children}) {
  return (
    <div>
        <WorkspaceProvider>{children}</WorkspaceProvider>
    </div>
  )
}

export default WorkSpaceLayout
