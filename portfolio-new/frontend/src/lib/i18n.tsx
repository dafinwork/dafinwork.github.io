'use client';
import {createContext,useContext,useEffect,useState,ReactNode} from 'react';
export const I18N_EN={}; export const I18N_ID:Record<string,string>={};
type C={lang:'en'|'id';t:(k:string)=>string;setLang:(l:'en'|'id')=>void}; const Ctx=createContext<C>({lang:'en',t:k=>k,setLang:()=>{}});
export function I18nProvider({children}:{children:ReactNode}){const [lang,set]=useState<'en'|'id'>('en'); useEffect(()=>{const l=localStorage.getItem('dafin-lang');if(l==='id')set(l)},[]);useEffect(()=>{document.documentElement.lang=lang;localStorage.setItem('dafin-lang',lang)},[lang]);return <Ctx.Provider value={{lang,t:k=>k,setLang:set}}>{children}</Ctx.Provider>}; export const useI18n=()=>useContext(Ctx);
