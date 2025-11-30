"use client"

import { useState } from "react"

function Counter({data}) {
    const [count, setCount] = useState(0)
    console.log(data)
    return (
        <div>
            <p>user number is {data.length}</p>
            <button onClick={()=>setCount((c)=> c+1)}>{count}</button>
        </div>
    )
}

export default Counter
