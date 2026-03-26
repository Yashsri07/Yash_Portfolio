// Year
    document.getElementById('yr').textContent = new Date().getFullYear();

    // Smooth-scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const id = a.getAttribute('href');
        if(id.length>1){ e.preventDefault(); document.querySelector(id).scrollIntoView({behavior:'smooth'}); }
      });
    });

    // Slide-in buttons (staggered)
    const btns = [...document.querySelectorAll('#cta-buttons .btn')];
    btns.forEach((b,i)=>{ b.style.animationDelay = (0.2 + i*0.18) + 's'; b.classList.add('slide-in'); });

    // Count-up stats
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.querySelectorAll('.stat-num').forEach(el=>{
            const target = +el.dataset.count; let n=0;
            const step = Math.max(1, Math.floor(target/40));
            const timer = setInterval(()=>{ n+=step; el.textContent = (n>=target?target:n); if(n>=target) clearInterval(timer); }, 30);
          });
          io.unobserve(ent.target);
        }
      });
    }, {threshold: 0.4});
    const sc = document.querySelector('.stat-card'); if(sc) io.observe(sc);

    // Canvas particles (simple)
    const c = document.getElementById('bg-canvas');
    const ctx = c.getContext('2d');
    function resize(){ c.width = innerWidth; c.height = innerHeight; }
    resize(); addEventListener('resize', resize);
    const dots = Array.from({length: 80}, ()=>({
      x: Math.random()*c.width, y: Math.random()*c.height,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4, r: Math.random()*1.8+0.6
    }));
    function tick(){
      ctx.clearRect(0,0,c.width,c.height);
      dots.forEach(d=>{
        d.x+=d.vx; d.y+=d.vy;
        if(d.x<0||d.x>c.width) d.vx*=-1;
        if(d.y<0||d.y>c.height) d.vy*=-1;
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle='rgba(0,224,224,0.25)'; ctx.fill();
      });
      requestAnimationFrame(tick);
    } tick();

    // Tiny tilt effect on photo card
    const pc = document.querySelector('.photo-card');
    if(pc){
      pc.addEventListener('mousemove', e=>{
        const b = pc.getBoundingClientRect();
        const rx = ((e.clientY - b.top)/b.height - 0.5) * -8;
        const ry = ((e.clientX - b.left)/b.width - 0.5) * 8;
        pc.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      pc.addEventListener('mouseleave', ()=> pc.style.transform = 'rotateX(0) rotateY(0)');
    }

    // --- React: render Projects dynamically ---
    const projects = [
      {title:'Emotion Detection from Text', desc:'Linear Regression baseline + SVM variant.', link:'#'},
      {title:'Hangman-Game', desc:'This project was created as the mini-project which showcase the skill I have learned in my summer training and enhancement of logical skills', link:'https://yashsri07.github.io/Hangman-Game/'},
      {title:'Job-Searching', desc:'This project was build as a mini-project for building the clear concept of Reactjs and enhance the ability og implementing the skill as a project', link:' https://fluffy-puffpuff-45e47b.netlify.app/'},
      {title:'Tic-Tac-Toe Game', desc:'This game was created with the basic UI and for the logical wins JS logics are used', link:'https://yashsri07.github.io/Tic-Tac-Toe/'}
    ];
    const e = React.createElement;
    function Card({p}) {
      return e('div', {className:'col-md-4'},
        e('div', {className:'proj-card h-100'},
          e('h5', {className:'mb-2'}, p.title),
          e('p', null, p.desc),
          e('a', {href:p.link, className:'stretched-link'}, 'View →')
        )
      );
    }
    function ProjectGrid(){ return e(React.Fragment, null, projects.map((p,i)=> e(Card, {p, key:i}))); }
    ReactDOM.createRoot(document.getElementById('projects-root')).render(e(ProjectGrid));