import{k as u,r as t,o as _,c as p,a as e,w as r,v as d,l as v,m,q as f,f as h}from"./index-58289196.js";const w={class:"login row"},g=["onSubmit"],b=e("img",{src:f},null,-1),x={class:"input-field col s12"},V=e("label",{for:"email"},"Email",-1),y=e("span",{class:"helper-text","data-error":"Invalid email"},null,-1),E={class:"input-field col s12"},k=e("label",{for:"password"},"Password",-1),C=["data-error"],L=e("div",{class:"input-field col s12"},[e("button",{class:"btn btn-login blue darken-3 waves-effect waves-light",type:"submit"},[e("i",{class:"material-icons left"},"login"),h(" Login ")])],-1),M={__name:"LoginView",setup(S){u();const l=t(""),a=t(""),i=t(""),n=t("");function c(){if(a.value.length<6){i.value="Must be at least 6 characters",n.value="invalid";return}localStorage.setItem("isLogged",!0),dispatchEvent(new CustomEvent("localStorageChanged"))}return(q,s)=>(_(),p("div",w,[e("form",{class:"col s6 offset-s3",onSubmit:m(c,["prevent"])},[b,e("div",x,[r(e("input",{id:"email",type:"email",class:"validate white-text","onUpdate:modelValue":s[0]||(s[0]=o=>l.value=o),required:""},null,512),[[d,l.value]]),V,y]),e("div",E,[r(e("input",{id:"password",type:"password",class:v(["validate white-text",n.value]),"onUpdate:modelValue":s[1]||(s[1]=o=>a.value=o),required:""},null,2),[[d,a.value]]),k,e("span",{class:"helper-text","data-error":[i.value]},null,8,C)]),L],40,g)]))}};export{M as default};
