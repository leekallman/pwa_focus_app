import { useState } from 'react'
import timeOutAlarm from '../assets/bell.mp3'

const alarm = new Audio(timeOutAlarm)
alarm.volume = 0.6


export default function useTimer() {
    // initial Session time
    let focusSessionDuration = 1
    let breakSessionDuration = 5
    let longBreakSessionDuration = 15
    
    const [timer, setTimer] = useState({
        focusInput: focusSessionDuration,
        breakInput: breakSessionDuration,
        longBreakInput: longBreakSessionDuration,
        isActive: false,
        focus: true,
        time: focusSessionDuration*60,
        key: 0,
        control: 'START'
    })
    const toggleTimer = e => {
        switch (e) {
            case 'CHANGEFOCUS':
            setTimer({
                ...timer,
                focusInput: (e.target.value),
                time: (e.target.value * 60),
                key: (e.target.value)
            })   
            break
            case 'CHANGEBREAK':
            setTimer({
                ...timer,
                breakInput:(e.target.value)
            })
            break
            case 'CHANGLONGEBREAK':
            setTimer({
                ...timer,
                longBreakInput:(e.target.value)
            })
            break
            case 'START':
            setTimer({ 
                ...timer, 
                isActive: true, 
                control: 'PAUSE' 
            })
            break
            case 'PAUSE':
            setTimer({ 
                ...timer, 
                isActive: false, 
                control: 'START' 
            })
            break
            case 'BREAK':
            setTimer({
                ...timer,
                isActive: true,
                control: 'PAUSE',
                focus: false,
                time: timer.breakInput*60,
                key: timer.breakInput*60
            })
            break
            case 'RESET':
            setTimer({
                ...timer,
                control: 'START',
                focus: true,
                time: timer.focusInput*60,
                key: timer.focusInput*60
            })
            break
            case 'COUNTDOWN':
            setTimer({
                ...timer,
                control: 'PAUSE',
                time: timer.time - 1000
            })
            break
            case 'TIMEFORBREAK':
            setTimer({
                ...timer,
                isActive: false,
                focus: false,
                time: timer.breakInput*60,
                key: timer.breakInput*60,
                control: 'BREAK'
            })
            alarm.play()
            break
            case 'TIMEFORRESET':
            setTimer({
                ...timer,
                isActive: false,
                focus: true,
                time: timer.focusInput*60,
                key: timer.focusInput*60,
                control: 'RESET'
            })
            alarm.play()
            break
            default:
            return
        }
    }
    return {timer, toggleTimer}
}

