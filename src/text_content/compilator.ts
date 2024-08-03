import ru from './languages/ru.json'
import en from './languages/en.json'

export const setLanguagePack =(language: 'ru'|'en')=>{
    switch (language){
        case ('ru'): return ru
        case ('en'): return en
    }
}
export type language = typeof ru