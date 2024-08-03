import { useState } from "react"

export const OpenClosMenu = () => {
    const [isActive, setActive] = useState(false)
    const animation = () => {
        if (!isActive) {
            document.getElementById('line1')!.setAttribute('d', 'M3 2.5L15 14.5')
            document.getElementById('line2')!.style.opacity = '0'
            document.getElementById('line3')!.setAttribute('d', 'M3 14.5L15 2.5')
        }
        else {
            document.getElementById('line1')!.setAttribute('d', 'M2 4.5L16 4.5')
            document.getElementById('line2')!.style.opacity = '1'
            document.getElementById('line3')!.setAttribute('d', 'M2 12.5L16 12.5')
        }
        setActive(!isActive)
    }
    return (
        <button  onClick={animation}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path stroke="#fff" stroke-width="2" stroke-linecap="round" d="M2 4.5L16 4.5" id="line1" style={{ transition: 'd 0.2s linear' }} />
                <path stroke="#fff" stroke-width="2" stroke-linecap="round" d="M2 8.5L16 8.5" style={{ opacity: 1, transition: 'opacity 0.2s linear' }} id="line2" />
                <path stroke="#fff" stroke-width="2" stroke-linecap="round" d="M2 12.5L16 12.5" id="line3" style={{ transition: 'd 0.2s linear' }} />
            </svg>
        </button>
    )
}