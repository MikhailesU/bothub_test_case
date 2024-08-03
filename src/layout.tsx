import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TopPanel } from "./components/top_panel/top_panel";
import { Main } from "./main";
import { RootState, TypedDispatch } from "./redux";
import { useState } from "react";
import { setWindowSize } from "./Slice";

export const Layout = () => {
  const typedSelector: TypedUseSelectorHook<RootState> = useSelector
  const isMenu = typedSelector(state => state.global_store.openMobileMenu)
  const windowSize = typedSelector(state => state.global_store.windowSize)
  const useTypedDispatch = () => useDispatch<TypedDispatch>()
  const dispatch = useTypedDispatch()

  window.onresize = () => {dispatch(setWindowSize({
    width: window.innerWidth,
    height: window.innerHeight
})); console.log(document.documentElement.style.getPropertyValue("--screen-factor"))}

  document.documentElement.style.setProperty("--screen-factor", (() => {
    if (windowSize.width > 1920) return ((windowSize.width / 1920).toFixed(4));
    else if (windowSize.width <= 1920 && windowSize.width > 1080) return ((windowSize.width / 1920).toFixed(4));
    else if (windowSize.width <= 1080 && windowSize.width > 660) return ((windowSize.width / 1080).toFixed(4));
    else return (windowSize.width / 660).toFixed(4);
  })().toString());

  return (<>
    <TopPanel />
    {(isMenu&&windowSize.width<1080) ? <div /> : <Main />}
  </>)
}
