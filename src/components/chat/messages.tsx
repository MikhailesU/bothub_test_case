import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, TypedDispatch } from "../../redux";
import user_avatar from './images/default-avatar.svg'
import bot_avatar from './images/gemini.svg'
import { useEffect } from "react";



export const Messages = () => {
  const typedSelector: TypedUseSelectorHook<RootState> = useSelector
  const chat_story = typedSelector(state => state.global_store.chat_story)
  const iswriting = typedSelector(state=>state.global_store.iswriting)
  useEffect(() => {
    const messagesElement = document.getElementById('messages');
    if (messagesElement) {
      messagesElement.scrollTo({
        top: messagesElement.scrollHeight,
        behavior: 'smooth'
      });
    };
    Array.from(document.getElementsByClassName('new')! as HTMLCollectionOf<HTMLElement>)
      .forEach(message => {
        message.classList.replace('new', 'old')
      });
  }, [chat_story]);

  return (
    <div className="messages" id="messages">
      {chat_story.slice(0,-1).map(message =>
          <li className={message.role}
            key={message.id + message.content + message.time?.toLocaleString() + (new Date).getMilliseconds()}>
            {message.role === 'assistant' ? <>
              <p>{'Gemini'}</p>
              <div>
                <img src={bot_avatar} />
                <span>{<div dangerouslySetInnerHTML={{ __html: (message.content) }} />}</span>
              </div>
            </> :
              <div>
                <p>{message.content}</p>
                <img src={user_avatar} />
              </div>}
          </li>
      )}
      {chat_story.slice(-1).map(message => {
        const last = message.time!.getSeconds() - (new Date).getSeconds() >= 2
        return (
          <li className={message.role}
            key={message.id + message.content + message.time?.toLocaleString() + (new Date).getMilliseconds()}>
            {message.role === 'assistant' ? <>
              <p>{'Gemini'}</p>
              <div className={last ? 'old' : 'new'}>
                <img src={bot_avatar} />
                <span>{<div dangerouslySetInnerHTML={{ __html: (message.content) }} />}</span>
              </div>
            </> :
              <div className={last ? 'old' : 'new'}>
                <p>{message.content}</p>
                <img src={user_avatar} />
              </div>}
          </li>)
      })}
      {iswriting&&<p>{'Gemini is typing...'}</p>}

    </div>)
}