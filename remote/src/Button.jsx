import React, { useState } from 'react'

const Button = () => {
    const [count, setCount] = useState(0)
  return (
    <div className="card">
       <h4>Remote application component</h4>
        <button onClick={() => setCount((count) => count + 1)}>
          click me {count}
        </button>
        
      </div>
  )
}

export default Button