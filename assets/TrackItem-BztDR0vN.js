import{_,o as s,c as l,a as d,u as y,s as f,d as o,e as b,b as u,f as m,t as k}from"./index-CKrxaPkD.js";import{L as w}from"./LoadingIcon-CqBP_Is8.js";import{_ as g}from"./CoverImage-LISNsYhY.js";const x={},p={class:"w-6 h-6","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24","stroke-width":"1.5",fill:"none",viewBox:"0 0 24 24"},$=d("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"},null,-1),B=[$];function T(t,e){return s(),l("svg",p,B)}const S=_(x,[["render",T]]),I={__name:"EditTrackButton",props:{spotify_id:String,youtube_id:String},setup(t){const e=y(),{downloading:i,queue:c}=f(e),n=t,h=()=>{try{e.editTrack(n.spotify_id??n.youtube_id??null)}catch(a){console.error(a)}};return(a,v)=>o(i).includes(t.spotify_id)||o(i).includes(t.youtube_id)?(s(),b(w,{key:0})):!o(c).find(r=>r.spotify_id===t.spotify_id)&&!o(c).find(r=>r.youtube_id===t.youtube_id)?(s(),l("button",{key:1,class:"text-slate-500 border border-slate-500 px-2 py-1 rounded hover:bg-slate-500 hover:text-white stroke-slate-500 hover:stroke-white",onClick:h},[u(S)])):m("",!0)}},C=_(I,[["__scopeId","data-v-b3300370"]]),M={},V={class:"w-6 h-6","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24","stroke-width":"1.5",fill:"none",viewBox:"0 0 24 24"},j=d("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"},null,-1),D=[j];function E(t,e){return s(),l("svg",V,D)}const H=_(M,[["render",E]]),L={__name:"DeleteTrackButton",props:{spotify_id:String,youtube_id:String},setup(t){const e=y(),{downloading:i,queue:c}=f(e),n=t,h=()=>{try{e.deleteTrack(n.spotify_id??n.youtube_id??null)}catch(a){console.error(a)}};return(a,v)=>o(i).includes(t.spotify_id)||o(i).includes(t.youtube_id)?(s(),b(w,{key:0})):!o(c).find(r=>r.spotify_id===t.spotify_id)&&!o(c).find(r=>r.youtube_id===t.youtube_id)?(s(),l("button",{key:1,class:"text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white stroke-red-500 hover:stroke-white",onClick:h},[u(H)])):m("",!0)}},N=_(L,[["__scopeId","data-v-18a6e839"]]),Z={class:"flex items-center space-x-2 border-b pb-2 pt-2"},q={class:"flex-grow"},O={class:"font-semibold"},R={class:"text-gray-400"},G={__name:"TrackItem",props:{track:Object},setup(t){return(e,i)=>(s(),l("div",Z,[u(g,{src:t.track.cover_url,alt:t.track.name,type:"track"},null,8,["src","alt"]),d("div",q,[d("h3",O,k(t.track.name),1),d("p",R,k(t.track.artist??typeof t.track.artists=="string"?t.track.artists:t.track.artists.join(", ")),1)]),u(C,{spotify_id:t.track.spotify_id,youtube_id:t.track.youtube_id},null,8,["spotify_id","youtube_id"]),u(N,{spotify_id:t.track.spotify_id,youtube_id:t.track.youtube_id},null,8,["spotify_id","youtube_id"])]))}};export{G as _};
