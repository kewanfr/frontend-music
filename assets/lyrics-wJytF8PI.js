/* empty css                                                    */import{u as d,s as a,o as c,c as l,a as e,d as t,t as i}from"./index-DT81bRGf.js";/* empty css                                                                          */const r={class:"divide-y divide-muted"},u={class:"flex flex-col space-y-4 mt-5"},_=e("h2",{class:"text-xl font-bold text-accent-foreground self-center"},"Paroles",-1),x={key:0,class:"flex flex-row px-4 mt-5",id:"song-infos"},f=["src"],m={class:"flex flex-col ml-5 mt-0 pt-0"},h={class:"text-lg font-bold text-accent-foreground",id:"song-title"},g={class:"text-base font-bold text-accent-foreground",id:"song-artist"},p={class:"text-xs text-accent-foreground",id:"song-album"},y={key:1,class:"text-lg text-accent-foreground"},b=["innerHTML"],v=e("div",{class:"fixed inset-0 flex items-center justify-center",id:"searching-spin",style:{display:"none"}},[e("div",{class:"animate-spin w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full"})],-1),w=e("div",{class:"flex flex-col items-center space-y-4 mt-5",id:"lyrics-source",style:{display:"none"}},[e("p",{class:"text-xs text-accent-foreground",id:"lyrics-source-text"})],-1),T={__name:"lyrics",setup(k){const o=d(),{playing:s,lyrics:n}=a(o);return o.getPlaying(),o.getPlayingLyrics(),(P,B)=>(c(),l("main",null,[e("div",r,[e("div",u,[_,t(s).title?(c(),l("div",x,[e("img",{src:t(s).thumb??"https://via.placeholder.com/150",alt:"Pochette de l'album",id:"song-cover",class:"rounded-lg w-20 h-20 align-middle"},null,8,f),e("div",m,[e("h3",h,i(t(s).title),1),e("h4",g,i(t(s).artist),1),e("h5",p,i(t(s).album),1)])])):(c(),l("h3",y,"Aucune musique en cours de lecture")),e("div",{class:"w-full max-w-xl space-y-2 mt-4 px-4",id:"lyrics",innerHTML:t(n)},null,8,b)]),v,w])]))}};export{T as default};