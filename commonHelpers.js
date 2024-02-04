import{S as w,i as l,a as S}from"./assets/vendor-b52d9f5e.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const $=document.querySelector(".form"),c=document.querySelector(".gallery"),f=document.querySelector(".loading"),o=document.querySelector("#next-btn");let d=0,g=null;const h=new w(".gallery a",{captionsData:"alt",captionDelay:250});o.addEventListener("click",b);$.addEventListener("submit",x);function p(){f.classList.remove("is-hidden")}function y(){f.classList.add("is-hidden")}async function x(e){e.preventDefault();const i=e.currentTarget.elements.input.value;g=i,d=1,o.classList.add("is-hidden");const a=e.currentTarget;if(c.innerHTML="",!i.trim()){l.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#f96c6c",backgroundColor:"#f5d1d1",position:"topRight",timeout:3e3});return}p();try{const r=await L();if(r.hits.length===0){l.show({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"#f96c6c",backgroundColor:"#f5d1d1",position:"topRight",timeout:5e3}),a.reset();return}c.innerHTML=u(r.hits),h.refresh(),r.hits.length>=40&&o.classList.remove("is-hidden"),m(),a.reset()}catch(r){v(r)}finally{y()}}async function L(){const e="https://pixabay.com/api",i=new URLSearchParams({key:"42093886-563b8eca1b4570c32a235ec3c",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40});return(await S.get(`${e}/?${i}&q=${g}&page=${d}`)).data}function u(e){return e.map(({webformatURL:i,largeImageURL:a,tags:r,likes:t,views:s,comments:n,downloads:k})=>`<li class="gallery-item">
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
          <p class="amount">${k}</p>
        </div>
      </div>
    </li>`).join("")}function v(e){console.error(e),c.innerHTML="",l.show({theme:"dark",message:e.stack,messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),o.removeEventListener("click",b),o.classList.add("is-hidden")}async function b(){p(),o.classList.add("is-hidden"),d+=1;try{const e=await L();if(d*40>=e.totalHits){l.show({title:"❕",theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),c.innerHTML+=u(e.hits),h.refresh(),o.classList.add("is-hidden"),m();return}c.innerHTML+=u(e.hits),h.refresh(),m(),o.classList.remove("is-hidden")}catch(e){v(e)}finally{y()}}function m(){window.scrollBy({top:640,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
