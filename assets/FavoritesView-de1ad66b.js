import{_ as r,r as _,e as i,f as p,o,c as t,a,F as l,k as d,g as u,p as m,b as v,P as f}from"./index-686766ba.js";const k=e=>(m("data-v-58bf5ce2"),e=e(),v(),e),h={class:"container white-text"},g=k(()=>a("h3",null,"Favorites pokemons",-1)),w={class:"grid"},F={__name:"FavoritesView",setup(e){const s=_([]),c=localStorage.getItem("favorites").split(",");return i(async()=>{s.value=await p.searchPokemons(c)}),(I,x)=>(o(),t("main",h,[g,a("div",w,[(o(!0),t(l,null,d(s.value,n=>(o(),u(f,{pokemon:n},null,8,["pokemon"]))),256))])]))}},B=r(F,[["__scopeId","data-v-58bf5ce2"]]);export{B as default};
