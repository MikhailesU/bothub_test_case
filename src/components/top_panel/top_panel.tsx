import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState, TypedDispatch } from "../../redux"
import logo from './images/logo.png'
import tg from './images/tg-colored.png'
import business from './images/business-colored.png'
import agg from './images/bothub-agg.png'
import { useEffect, useRef, useState } from "react"
import { Selector } from "./selector"
import { Arrow } from "./images/arrow"
import { OpenClosMenu } from './images/menu'
import { opClMenu, setWindowSize } from "../../Slice"


export const TopPanel = () => {
    const [act, setAct] = useState(false)
    const [menu_to_mobile, setMobMenu] = useState(false)
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const languagePack = typedSelector(state => state.global_store.languagePack)
    const prod = useRef<HTMLDivElement>(null)
    const useTypedDispatch = () => useDispatch<TypedDispatch>()
    const dispatch = useTypedDispatch()
    const windowSize = typedSelector(state => state.global_store.windowSize)
    if (!act) {
        document.getElementById('products_header')?.blur();
    }
    useEffect(() => {
        if (prod.current) {
            const init = setTimeout(() => {
                prod.current!.style.opacity = '1'
                prod.current!.style.transform = 'none'
            }, 10);

            document.onvisibilitychange = () => {
                if (document.visibilityState === "hidden") {
                    {
                        if (act) document.getElementById('products_header')!.blur();
                    }
                }
            };
            document.onfullscreenchange = () => { if (act) document.getElementById('products_header')!.blur(); };

            return () => clearTimeout(init)
        }
        if (windowSize.width<1080) {setMobMenu(false)};
    }, [act])
    const Products = () => {
        const images = [agg, tg, business]
        return (
            <div className="products" ref={prod}>
                {languagePack.top_panel.products.map((product, im) =>
                    <div>
                        <img src={images[im]} />
                        <div>
                            <h4>{product.header}</h4>
                            <p>{product.text}</p>
                        </div>
                    </div>)}
            </div>
        )
    }
    const headers =
        <>
            <h4 className="products_header" id='products_header'
                onBlur={() => {
                    if (prod.current) prod.current!.style.opacity = '0';
                    setTimeout(() => {
                        setAct(!act)
                    }, 200)
                }}
                onClick={e => {
                    if (act) e.currentTarget.blur();
                    else { e.currentTarget.focus(); setAct(!act) }
                }}
                tabIndex={0}
            >
                {languagePack.top_panel.products_header}<Arrow /></h4>
            {(windowSize.width > 1080)?(act && Products()):
            (act && <div className="products_container">{Products()}</div>)}
            {languagePack.top_panel.headers.slice(0, -1).map(header =>
                <li key={header}>
                    <h4>
                        {header}
                    </h4>
                </li>)}
            {(windowSize.width < 1080) ?
                languagePack.top_panel.additionaly_headers.map(header =>
                    <li key={header}>
                        <h4>
                            {header}
                        </h4>
                    </li>) :
                <li key={languagePack.top_panel.headers[languagePack.top_panel.headers.length-1]}>
                    <h4>
                        {languagePack.top_panel.headers[languagePack.top_panel.headers.length-1]}
                    </h4>
                </li>
            }
        </>
    return (
        <div className="top_panel">
            <div className="top_panel_left">
                <div>
                    <img src={logo} />
                </div>
                {(windowSize.width >= 1080) &&
                    headers}
            </div>
            <div className="top_panel_right">
                <Selector />
                {(windowSize.width >= 660) &&
                    <button>{languagePack.top_panel.authorization}</button>}
                {(windowSize.width < 1080) &&
                    <div onClick={() => {
                        setMobMenu(!menu_to_mobile);
                        dispatch(opClMenu(null))
                    }}
                        style={{ boxSizing: 'content-box', width: '100%' }}><OpenClosMenu /></div>}
            </div>
            {(windowSize.width < 1080) && <span className="mobile_panel">
                {(windowSize.width < 1080) && menu_to_mobile &&
                    <span>{headers}</span>}
                {(windowSize.width < 660) && menu_to_mobile &&
                    <button>{languagePack.top_panel.authorization}</button>}
            </span>}
        </div>)
}