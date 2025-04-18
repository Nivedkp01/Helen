import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Retest = () => {
  const [value, setValue] = useState('')

  return (
    <div className="p-4">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Retest
