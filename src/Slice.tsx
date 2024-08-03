import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Configuration, OpenAIApi } from "openai-edge";
import { RootState } from "./redux";
import { language, setLanguagePack } from "./text_content/compilator";
import { marked } from "marked";


export interface message {
    role: 'user' | 'assistant'
    content: string
    id?: string
    time?: Date
}

interface state {
    messages: Array<message>
    chat_story: Array<message>
    languagePack: language
    iswriting: boolean
    openMobileMenu: boolean
    windowSize: {
        width: number
        height: number
    }
}
let idlist:string[]=[]
const createID = () =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 17; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    idlist.push(result)
    return result;
}


const initialState: state = {
    messages: [{
        role: "assistant",
        content: setLanguagePack('ru').chat.bot_question
    }],
    chat_story: [{
        role: "assistant",
        content: setLanguagePack('ru').chat.bot_question,
        id: createID(),
        time: new Date
    }],
    languagePack: setLanguagePack('ru'),
    iswriting: false,
    openMobileMenu: false,
    windowSize:{
        width: window.innerWidth,
        height: window.innerHeight
    }
}

const configuration = new Configuration({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGE2ZTgxLTRiMDMtNGQxNC1hMGQxLWI3N2RkZjlkMDY2ZiIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3MjA1Mjk0NDgsImV4cCI6MjAzNjEwNTQ0OH0.Dm8QJpXfX2ChWcYZ5c0SLNzGpmEmh1dYPAMW3wz4v5M",
    basePath: "https://bothub.chat/api/v2/openai/v1",
});
const openai = new OpenAIApi(configuration);

export const getBotResponse = createAsyncThunk(
    'message/responseAI',
    async (save_context: boolean, thunkAPI) => {
        const store = thunkAPI.getState() as RootState
        const messages = store.global_store.messages
        const completion = await openai.createChatCompletion({
            messages: save_context ? messages : [messages[messages.length - 2]],
            model: "gemini-pro",
        });
        const message = (await completion.json()).choices[0].message.content as string;
        const decodeMessage = await marked(message)
        return decodeMessage
    })
const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        new_message(state, action: PayloadAction<string>) {
            state.messages.push({role: 'user', content: action.payload})
            state.chat_story.push({role: 'user', content: action.payload, id: createID(), time: new Date})
        },
        change_language(state, action: PayloadAction<'ru' | 'en'>) {
            state.languagePack = setLanguagePack(action.payload)
            state.messages[0].content = setLanguagePack(action.payload).chat.bot_question
            state.messages[1].content = setLanguagePack(action.payload).chat.human_answer
            state.chat_story[0].content = setLanguagePack(action.payload).chat.bot_question
            state.chat_story[1].content = setLanguagePack(action.payload).chat.human_answer
        },
        initial_user_message(state, action: PayloadAction<undefined>){
            state.messages[1]={role: 'user', content: state.languagePack.chat.human_answer}
            state.chat_story[1]={role: 'user', content: state.languagePack.chat.human_answer, id: createID(), time: new Date}
        },
        opClMenu(state, action:PayloadAction<null>){
            state.openMobileMenu=!(state.openMobileMenu)
        },
        setWindowSize(state, action:PayloadAction<{
            width: number
            height: number
        }>){
            state.windowSize=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBotResponse.fulfilled, (state, action) => {
            state.iswriting=false
            state.messages.push({ role: 'assistant', content: action.payload!=''? action.payload: "I'm sorry, error was hapenned"})
            state.chat_story.push({ role: 'assistant', content: action.payload!=''? action.payload: "I'm sorry, error was hapenned", id: createID(), time: new Date})
        })
        builder.addCase(getBotResponse.pending, (state, action) => {
            state.iswriting=true
        })
        builder.addCase(getBotResponse.rejected, (state, action) => {
            state.iswriting=false
            state.messages.push({ role: 'assistant', content: "I'm sorry, error was hapenned", id: createID(), time: new Date })
            state.chat_story.push({ role: 'assistant', content: "I'm sorry, error was hapenned", id: createID(), time: new Date })
        })
    }

})
export const redusers = slice.reducer
export const {
    new_message,
    change_language,
    initial_user_message,
    opClMenu,
    setWindowSize
} = slice.actions