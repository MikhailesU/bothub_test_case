import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "../../redux"

export const Posibilities = () => {
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const languagePack = typedSelector(state => state.global_store.languagePack)
    const grad = 'rgba(28, 100, 242, 0.38) 9.34%, #121825 100%'
    const interactiveGrad=(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if (e.currentTarget)
        {const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        (e.currentTarget as HTMLDivElement).style.background=`radial-gradient(148.61% 110% at 
            ${Math.floor((e.clientX-rect.left)/rect.width*100)}% 
            ${Math.floor((e.clientY-rect.top)/rect.height*100)}%, 
            ${grad})`;
        }
        }
    return (
        <div className="possibilities">
            <h2>{languagePack.possibilities_header}</h2>
            <div>
                <div>
                    {languagePack.possibilities.map(el =>
                        <div key={el.header + 'div0'}>
                            <div key={el.header + 'div1'}>
                                <div key={el.header + 'div'} 
                                onMouseLeave={e=>{(e.target as HTMLDivElement).style.background=`radial-gradient(148.61% 147.95% at 17.46% -47.95%, ${grad})`}}
                                onMouseMove={e=>interactiveGrad(e)}>
                                    <h3 key={el.header}>{el.header}</h3>
                                    <p key={el.text}>{el.text}</p>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>)
}