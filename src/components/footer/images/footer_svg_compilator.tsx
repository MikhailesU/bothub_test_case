import shapes from './shapes_footer_icon.json'
const Tg_white = () =>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={shapes[0].tg_white} fill="white" />
    </svg>


const Tg_bot = () =>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d={shapes[0].tg_bot} fill="white" />
    </svg>

const Email = () =>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d={shapes[0].email} fill="white" />
    </svg>

const Our_blog = () =>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5228_314)">
            <circle cx="12" cy="12" r="12" fill="white" />
            <path d={shapes[0].our_blog} fill="black" />
        </g>
        <defs>
            <clipPath id="clip0_5228_314">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </svg>

const Habr = () =>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5228_319)">
            <path fill-rule="evenodd" clip-rule="evenodd" d={shapes[0].habr} fill="white" className='habr'/>
        </g>
        <defs>
            <clipPath id="clip0_5228_319">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </svg>

export const Images = [Tg_white(), Tg_bot(), Email(), Our_blog(), Habr(), Tg_white()]