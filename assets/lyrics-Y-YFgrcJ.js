import"./LoadingIcon-DPfaVYY0.js";import{u as a,s as d,o as c,c as i,a as e,b as r,d as t,t as l}from"./index-COOIxvE6.js";/* empty css                                                                          */import{S as u}from"./ScanPlexButton-rCZVK_MG.js";const _={class:"divide-y divide-muted"},x={class:"flex flex-col space-y-4 mt-5"},f={class:"flex justify-between items-center space-y-4 mt-5"},m=e("div",{class:"text-xl font-bold text-accent-foreground self-center"},"Paroles",-1),h={key:0,class:"flex flex-row px-4 mt-5",id:"song-infos"},p=["src"],g={class:"flex flex-col ml-5 mt-0 pt-0"},y={class:"text-lg font-bold text-accent-foreground",id:"song-title"},b={class:"text-base font-bold text-accent-foreground",id:"song-artist"},v={class:"text-xs text-accent-foreground",id:"song-album"},w={key:1,class:"text-lg text-accent-foreground"},P=["innerHTML"],S=e("div",{class:"fixed inset-0 flex items-center justify-center",id:"searching-spin",style:{display:"none"}},[e("div",{class:"animate-spin w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full"})],-1),k=e("div",{class:"flex flex-col items-center space-y-4 mt-5",id:"lyrics-source",style:{display:"none"}},[e("p",{class:"text-xs text-accent-foreground",id:"lyrics-source-text"})],-1),V={__name:"lyrics",setup(B){const o=a(),{playing:s,lyrics:n}=d(o);return o.getPlaying(),o.getPlayingLyrics(),(L,M)=>(c(),i("main",null,[e("div",_,[e("div",x,[e("div",f,[m,r(u)]),t(s).title?(c(),i("div",h,[e("img",{src:t(s).thumb??"https://via.placeholder.com/150",alt:"Pochette de l'album",id:"song-cover",class:"rounded-lg w-20 h-20 align-middle"},null,8,p),e("div",g,[e("h3",y,l(t(s).title),1),e("h4",b,l(t(s).artist),1),e("h5",v,l(t(s).album),1)])])):(c(),i("h3",w,"Aucune musique en cours de lecture")),e("div",{class:"w-full max-w-xl space-y-2 mt-4 px-4",id:"lyrics",innerHTML:t(n)},null,8,P)]),S,k])]))}};export{V as default};