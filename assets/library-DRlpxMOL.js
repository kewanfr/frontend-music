import{a as h}from"./CoverImage-LISNsYhY.js";import{S as w}from"./ScanPlexButton-BMMxU2bk.js";import{u as p,g as m,s as L,w as C,o as n,c as i,a as r,b as l,d as _,F as x,r as g,e as b,f as k}from"./index-CKrxaPkD.js";import{_ as y}from"./TrackItem-BztDR0vN.js";import{_ as B}from"./SearchBar-CQd6GS9_.js";import"./LoadingIcon-CqBP_Is8.js";const S={class:"flex justify-between items-center space-y-4 mt-5"},N=r("div",{class:"text-xl font-bold"},"Sons téléchargés",-1),T={class:"divide-y divide-muted"},V={class:"flex flex-col items-center space-y-4 mt-5"},$={key:0,class:"w-full max-w-xl space-y-2 mt-4",id:"results-list"},F=r("div",{id:"toasts",class:"fixed bottom-0 right-0 p-4 z-20"},null,-1),P={__name:"library",setup(j){const c=p(),u=m(""),{tracks:s,isLoading:f}=L(c),o=m([]);setTimeout(()=>{(!s.length||s.length==0)&&c.sendWebSocket("tracks")},800),C(s,()=>{const e=u.value;if(e===""){o.value=s.value;return}o.value=s.value.filter(t=>{var a;return((a=t.name.toLowerCase())==null?void 0:a.includes(e.toLowerCase()))||t.artists.toLowerCase().includes(e.toLowerCase())||t.album_name.toLowerCase().includes(e.toLowerCase())})});const v=e=>{if(e===""){o.value=s.value;return}u.value=e,o.value=s.value.filter(t=>{var a;return((a=t.name.toLowerCase())==null?void 0:a.includes(e.toLowerCase()))||t.artists.toLowerCase().includes(e.toLowerCase())||t.album_name.toLowerCase().includes(e.toLowerCase())})};return(e,t)=>{var a;return n(),i("main",null,[r("div",S,[N,l(w)]),l(B,{searchAction:v,searchButton:!0,searchOnInput:!0}),r("div",T,[r("div",V,[((a=_(s))==null?void 0:a.length)>0?(n(),i("div",$,[(n(!0),i(x,null,g(o.value,d=>(n(),b(y,{key:d.id,track:d},null,8,["track"]))),128))])):k("",!0),l(h,{isLoading:_(f)},null,8,["isLoading"]),F])])])}}};export{P as default};
