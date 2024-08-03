import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Chat } from "./components/chat/chat";
import { RootState } from "./redux";
import { Posibilities } from "./components/possibilities/possibilities";
import mjrn from './components/image/mjrn.png'
import { Footer } from "./components/footer/footer";
import lattice from './components/image/lattice.svg'

export const Main = () => {
  const typedSelector: TypedUseSelectorHook<RootState> = useSelector
  const languagePack = typedSelector(state => state.global_store.languagePack)
  const isDesktop = ()=>{
    if (window.matchMedia('(max-width: 1080px)').matches) return languagePack.annotation.mobile;
    else return languagePack.annotation.desktop
  }
  return (
    <>
      <div className="preview">
        <div>
          <img src={lattice} className="backLattice" />
          <div className="annotation">
            <h1>{isDesktop().annotation_header}</h1>
            <p>{isDesktop().annotation_text}</p>
            <button>{isDesktop().button}</button>
          </div>
          <Chat />
        </div>
      </div>
      <Posibilities />
      <div className="midjorney">
        <img src={mjrn} />
        <div>
          <h2>{languagePack.midjourney.header}</h2>
          <p>{languagePack.midjourney.text}</p>
          <button>{languagePack.midjourney.button}</button>
        </div>
      </div>
      <Footer />
    </>
  )
}