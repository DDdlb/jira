import React, { useEffect, useState } from "react";

export const Test = ()=>{
    const [num, setNum] = useState(0)
    const [name, setName] = useState('asd')
    
    const add = ()=> setNum(num + 1)

    const getName = ()=>{
        console.log("getName");
        return name
    }

    useEffect(()=>{
        console.log("name eff");
        getName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])

    useEffect(()=>{
        console.log("num eff");
        getName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [num])

    return <div>
        <button onClick={add}>+</button>
        <button onClick={()=>setName('aaa')}>changeName</button>
        <p>{num}</p>
        <p>{getName()}</p>
    </div>
}