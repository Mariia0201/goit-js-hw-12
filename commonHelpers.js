import{S as b,i as c,a as k}from"./assets/vendor-b52d9f5e.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const w=document.querySelector(".form"),l=document.querySelector(".gallery"),d=document.querySelector(".loading"),o=document.querySelector("#next-btn");let h=0,g=null;const u=new b(".gallery a",{captionsData:"alt",captionDelay:250});o.addEventListener("click",L);w.addEventListener("submit",S);async function S(e){e.preventDefault();const i=e.currentTarget.elements.input.value;g=i,h=1,o.classList.add("is-hidden");const a=e.currentTarget;if(l.innerHTML="",!i.trim()){c.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#f96c6c",backgroundColor:"#f5d1d1",position:"topRight",timeout:3e3});return}d.classList.remove("is-hidden");try{const r=await p();if(r.hits.length===0){c.show({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"#f96c6c",backgroundColor:"#f5d1d1",position:"topRight",timeout:5e3}),a.reset();return}l.innerHTML=m(r.hits),u.refresh(),r.hits.length>=40&&o.classList.remove("is-hidden"),f(),a.reset()}catch(r){y(r)}finally{d.classList.add("is-hidden")}}async function p(){const e="https://pixabay.com/api",i=new URLSearchParams({key:"42093886-563b8eca1b4570c32a235ec3c",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40});return(await k.get(`${e}/?${i}&q=${g}&page=${h}`)).data}function m(e){return e.map(({webformatURL:i,largeImageURL:a,tags:r,likes:t,views:s,comments:n,downloads:v})=>`<li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img
          class="gallery-image"
          src="${i}"
          alt="${r}"
          width="360"
        />
      </a>
      <div class="info">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${t}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${s}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${n}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${v}</p>
        </div>
      </div>
    </li>`).join("")}function y(e){console.error(e),l.innerHTML="",c.show({iconUrl:icon,theme:"dark",message:e.stack,messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),o.removeEventListener("click",L),o.classList.add("is-hidden")}async function L(){d.classList.remove("is-hidden"),o.classList.add("is-hidden"),h+=1;try{const e=await p();if(h*40>=e.totalHits){c.show({title:"❕",theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),l.innerHTML+=m(e.hits),u.refresh(),o.classList.add("is-hidden"),f();return}l.innerHTML+=m(e.hits),u.refresh(),f(),o.classList.remove("is-hidden")}catch(e){y(e)}finally{d.classList.add("is-hidden")}}function f(){window.scrollBy({top:640,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
