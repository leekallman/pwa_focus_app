import React, { createContext, useState } from 'react'

export const SettingsContext = createContext();



const SettingsContextProvider = (props) => {
    const [focus, setFocus] = useState(0)
    const [executing, setExecuting] = useState({})
    const [startAnimate, setStartAnimate] = useState(false)

    function startTimer() {
        setStartAnimate(true)
    }

    function pauseTimer() {
        setStartAnimate(false)
    }

    function stopTimer() {
        setStartAnimate(false)
    }

    function reset() {
        setStartAnimate(false)

    }


    return (
        <SettingsContext.Provider value={{ stopTimer }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider
