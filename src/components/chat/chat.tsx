import logo from './images/avatar.svg'
import send_button from './images/send_button.svg'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState, TypedDispatch } from "../../redux"
import { getBotResponse, initial_user_message, new_message } from "../../Slice"
import { useEffect, useRef } from "react"
import { Messages } from "./messages"

export const Chat = () => {
  const useTypedDispatch = () => useDispatch<TypedDispatch>()
  const dispatch = useTypedDispatch()
  const typedSelector: TypedUseSelectorHook<RootState> = useSelector
  const languagePack = typedSelector(state => state.global_store.languagePack)
  const ref = useRef<HTMLTextAreaElement>(null)
  const checker = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const init = setTimeout(() => {
      dispatch(initial_user_message())
    }, 1000);
    return () => clearTimeout(init)
  }, []);

  const handleSubmit = (event?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const send = () => {
      if (ref.current) {
        dispatch(new_message(ref.current.value.trim()))
        ref.current.value = ''
      }
      if (checker.current) dispatch(getBotResponse(checker.current.checked))
    }
    if (event) {
      event.preventDefault();
      if (ref.current) {
        if (ref.current.value.trim().replace(/\s/g, "") === '') { ref.current.value = ''; return }
        else {
          if (event.shiftKey ? false : true) {
            send()
          }
          else { ref.current.value += '\n' };
        };
      };
    } else {
      send()
    }
  }

  return (
    <div className='chatborder'>
      <div>
        <div className='chat'>
          <div className="chatheader">
            <div>
              <img src={logo} style={{ marginRight: '10px' }} />
              <div>
                <p style={{ flexWrap: 'nowrap', marginTop: '3%' }}>BotHub: СharGPT & Midjorney</p>
                <p style={{ color: '#616D8D', fontSize: 'calc(14px*var(--screen-factor))' }}>bot</p>
              </div>
            </div>
            <div>
              <p style={{ marginRight: '10px' }}>{languagePack.chat.context}</p>
              <label>
                <input type="checkbox" ref={checker} defaultChecked />
              </label>
            </div>
          </div>
          <Messages />
          <div className='inputRow'>
            <textarea placeholder={languagePack.chat.placeholder} ref={ref} onKeyDown={event => { event.key === 'Enter' && handleSubmit(event); }} />
            <img src={send_button} alt="Send" onClick={() => handleSubmit()} />
          </div>
        </div>
      </div>
    </div>
  )
}