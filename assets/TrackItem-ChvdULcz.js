import{_ as h,o as r,c as i,a as s,u as k,s as m,d as o,e as y,b as n,f as b,t as _}from"./index-DLkg8bh_.js";import{L as p,_ as v}from"./LoadingIcon-DhQwsO2U.js";/* empty css                                                                          */const x={},w={class:"w-6 h-6","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24","stroke-width":"1.5",fill:"none",viewBox:"0 0 24 24"},g=s("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"},null,-1),B=[g];function T(e,t){return r(),i("svg",w,B)}const $=h(x,[["render",T]]),S={__name:"DeleteTrackButton",props:{spotify_id:String,youtube_id:String},setup(e){const t=k(),{downloading:c,queue:d}=m(t),u=e,f=()=>{try{t.deleteTrack(u.spotify_id??u.youtube_id??null)}catch(l){console.error(l)}};return(l,N)=>o(c).includes(e.spotify_id)||o(c).includes(e.youtube_id)?(r(),y(p,{key:0})):!o(d).find(a=>a.spotify_id===e.spotify_id)&&!o(d).find(a=>a.youtube_id===e.youtube_id)?(r(),i("button",{key:1,class:"text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white stroke-red-500 hover:stroke-white",onClick:f},[n($)])):b("",!0)}},V=h(S,[["__scopeId","data-v-18a6e839"]]),D={class:"flex items-center space-x-2 border-b pb-2 pt-2"},I={class:"flex-grow"},M={class:"font-semibold"},C={class:"text-gray-400"},Z={__name:"TrackItem",props:{track:Object},setup(e){return(t,c)=>(r(),i("div",D,[n(v,{src:e.track.cover_url,alt:e.track.name,type:"track"},null,8,["src","alt"]),s("div",I,[s("h3",M,_(e.track.name),1),s("p",C,_(e.track.artist),1)]),n(V,{spotify_id:e.track.spotify_id,youtube_id:e.track.youtube_id},null,8,["spotify_id","youtube_id"])]))}};export{Z as _};