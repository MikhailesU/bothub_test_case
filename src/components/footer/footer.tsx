import { TypedUseSelectorHook, useSelector } from 'react-redux'
import alri from './images/alri.png'
import logo from './images/logo.png'
import { RootState } from '../../redux'
import { Images } from './images/footer_svg_compilator'

export const Footer = () => {
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const languagePack = typedSelector(state => state.global_store.languagePack)
    return (
        <div className='footer'>
            <div className='copyright'>
                <img src={logo} />
                <ul>
                    <li key={languagePack.footer.copyright[0]}>
                        <p>{languagePack.footer.copyright[0]}</p>
                    </li>
                    <li key={languagePack.footer.copyright[1]} className='lnk'>
                        <p>{languagePack.footer.copyright[1]}</p>
                    </li>
                </ul>
                <img src={alri} />
            </div>
            <div className='links'>
                {languagePack.footer.resourse_first.map(list =>
                    <ul key={list.header + 'ul'}>
                        <li key={list.header} className='links_header'>{list.header}</li>
                        {list.elements.map(li =>
                            <li key={li} className='lnk'>
                                <p>{li}</p>
                            </li>)}
                    </ul>)}
                {languagePack.footer.resourse_second.map(list =>
                    <ul key={list.header + 'ul'}>
                        <li key={list.header} className='links_header'>{list.header}</li>
                        {list.elements.map(li =>
                            <li key={li.link} className='lnk'>
                                <p>
                                    {Images[li.image]}
                                    {li.link}
                                </p>
                            </li>)}
                    </ul>)}
            </div>
        </div>
    )
}