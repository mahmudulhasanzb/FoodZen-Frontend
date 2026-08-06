import DashboardSideBar from '@/src/components/layouts/DashboardSideBar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='flex gap-3'>
      <DashboardSideBar/>
    {children}
    </main>
  )
}

export default layout
