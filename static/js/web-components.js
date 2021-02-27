class CookiePopup extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
      const _style = document.createElement('style');
      const _template = document.createElement('template');
      _style.innerHTML = `.popcont{
        width: 100%;
        height:100%;
        position:fixed;
        z-index: 6;
        background-color: rgba(0, 0, 0, 0.6);
        display:none;
      }
    .popup{
        background-color: #fff;
        box-shadow: -4px 4px 5px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        padding: 20px 30px;
        text-align: center;
      width:600px;
      position:fixed;
      z-index:1001;
      position: fixed;
      left: 50%;
      top:0;
      transform: translate(-50%, 0);
      height:350px;
      display: none;
    }
    
    .popup p {
        color: #555;
    }
    
    .btn-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .btn {
        background-color: var(--accent-color);
        border: 0;
        border-radius: 5px;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        padding: 15px 30px;
        position: relative;
        margin: 10px;
    }
    
    .btn:active {
        box-shadow: none;
        transform: scale(0.98);
    }
    
    .btn:focus {
        outline: none;
    }
    
    .btn.ghost {
        background-color: #fff;
        color: var(--accent-color);
        box-shadow: none;
    }
    
    .btn.ghost span {
        background-color: var(--accent-color);
        border: 0;
        border-radius: 5px;
        color: #fff;
        font-size: 10px;
        padding: 3px 7px;
        position: absolute;
        top: -10px;
        right: -10px;
        transform: rotate(10deg);
    }
    .popup img {
        width: 70px;
    }`;
  
      _template.innerHTML = `<div class="popcont" id="popcont">
      <div class="popup" id="cookiespopup">
          <img src="https://image.flaticon.com/icons/svg/2078/2078580.svg" alt="">
          <h2>Heya! This site uses cookies.</h2>
          <p>Cookies allow the website publisher to do useful things like find out whether the computer (and probably its user) has visited the site before.</p>
          <div class="btn-container">
              <button class="btn" id="cookie_btn">Sweet... cookies!</button>
              <button class="btn ghost" id="trick">
                  No. Not for me!
                  <span>Don't click me</span>
              </button>
          </div>
      </div>
      </div>`;
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(_style);
      this.shadowRoot.appendChild(_template.content.cloneNode(true));
    }

    connectedCallback(){
        const element_root=this.shadowRoot;
        const trickBtn = element_root.getElementById('trick');
        const btnContainer = element_root.querySelector('.btn-container');
        // setting it initially
        btnContainer.style.flexDirection = 'row';
        
        trickBtn.addEventListener('mouseover', (e) => {
            const currentDir = btnContainer.style.flexDirection;
            if(currentDir === 'row') {
                btnContainer.style.flexDirection = 'row-reverse';
            } else {
                btnContainer.style.flexDirection = 'row';
            }
        })
        element_root.getElementById("cookie_btn").addEventListener('click',cookiesaccepted);
        
        function cookiesaccepted(){
            element_root.getElementById("cookiespopup").style.display="none";
          document.body.style.overflowY="auto";
          element_root.getElementById("popcont").style.display="none"; 
          localStorage.setItem("AcceptedCookie","true");
        }
        
        if(localStorage.getItem("AcceptedCookie")!="true"){
            element_root.getElementById("cookiespopup").style.display="block";
            document.body.style.overflowY="hidden";
            element_root.getElementById("popcont").style.display="block"; 
        }
        };
  }
  customElements.define('cookie-popup', CookiePopup);


class NavBar extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        const _style = document.createElement('style');
        const _template = document.createElement('template');
        _style.innerHTML = ``;
    
        _template.innerHTML = ``;
    
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(_style);
        this.shadowRoot.appendChild(_template.content.cloneNode(true));
      }
  
      connectedCallback(){
          const element_root=this.shadowRoot;
          console.log("Spawned");
          };
    }

customElements.define('nav-bar', NavBar);
