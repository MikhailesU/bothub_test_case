import { useDispatch } from 'react-redux'
import { Planet } from './images/lang'
import { TypedDispatch } from '../../redux'
import { change_language } from '../../Slice'
import { useEffect, useId, useRef, useState } from 'react'
import { Arrow } from './images/arrow'

export const Selector = () => {
    const useTypedDispatch = () => useDispatch<TypedDispatch>()
    const dispatch = useTypedDispatch()
    const header = useRef<HTMLParagraphElement>(null)
    const menu = useRef<HTMLParagraphElement>(null)
    const [visible, setVisible] = useState(false)
    if (!visible) {
        document.getElementById('base_sel')?.blur();
    }
    useEffect(() => {
        if (menu.current) {
            const init = setTimeout(() => {
                menu.current!.style.opacity = '1'
                menu.current!.style.transform = 'none'
            }, 10);

            document.onvisibilitychange = () => {
                if (document.visibilityState === "hidden") {
                    {
                        if(visible) document.getElementById('base_sel')!.blur();
                    }
                }
            };
            document.onfullscreenchange = () => {if(visible) document.getElementById('base_sel')!.blur()};
            return () => clearTimeout(init)
        }
    }, [visible])
    const SelectionMenu = () => {
        return (
            <div className='selection_menu' ref={menu}>
                <ul>
                    <li onClick={() => changeLanguage('ru')}>
                        <h4>RU</h4>
                    </li>
                    <li onClick={() => changeLanguage('en')}>
                        <h4>EN</h4>
                    </li>
                </ul>
            </div>
        )
    }
    const changeLanguage = (value: 'ru' | 'en' | null) => {
        setVisible(!visible)
        if (value) dispatch(change_language(value));
        switch (value) {
            case 'ru': if (header.current) header.current.textContent = 'RU'; break;
            case 'en': if (header.current) header.current.textContent = 'EN'; break;
            case null: return;
        }
    }
    return (<>
        <span className="language_selector" id='base_sel'
            onBlur={() => {
                if (menu.current) menu.current!.style.opacity = '0';
                setTimeout(() => {
                    changeLanguage(null)
                }, 200)
            }}
            onClick={e => {
                if (visible) e.currentTarget.blur();
                else { e.currentTarget.focus(); changeLanguage(null) }
            }}
            tabIndex={1}>
            <Planet />
            <h4 ref={header}>RU</h4>
            <Arrow />
        </span>
        {visible && SelectionMenu()}
    </>
    )
}