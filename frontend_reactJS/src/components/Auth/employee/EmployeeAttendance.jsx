import React from 'react'

const EmployeeAttendance = () => {
  return (
    <div>
    <div className="flex flex-col w-full lg:flex-row">
  <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">content</div> 
  <div className="divider lg:divider-horizontal">OR</div> 
  <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">content</div>
</div>
<div className="flex flex-col w-full border-opacity-50">
  <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
  <div className="divider">OR</div>
  <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
</div>
    </div>
  )
}

export default EmployeeAttendance