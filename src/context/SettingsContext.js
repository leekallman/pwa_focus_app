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
        setExecuting({});
        setFocus(0)
    }

    function setCurrentTimer(active_state) {
        updateExecute({
            ...executing,
            active: active_state
        })
        setTimerTime(executing)
    }


    const updateExecute = (updatedSettings) => {
        setExecuting(updatedSettings);
        setTimerTime(updatedSettings)
    }
    const setTimerTime = evaluate => {
        switch (evaluate.active) {
            case 'focus':
                setFocus(evaluate.focus)
                break;

            case 'short':
                setFocus(evaluate.short)
                break;

            case 'long':
                setFocus(evaluate.long)
                break;

            default:
                setFocus(0)
                break;
        }
    }

    const children = ({ remainingTimer }) => {
        const minutes = Math.floor(remainingTimer / 60)
        const seconds = remainingTimer % 60

        return `${minutes} : ${seconds}`
    }


    return (
        <SettingsContext.Provider value={{
            stopTimer, updateExecute, focus, executing, startAnimate,
            startTimer, pauseTimer, reset, setCurrentTimer, children
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider
