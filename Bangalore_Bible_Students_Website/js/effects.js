/* =====================================================================
   EFFECTS — golden confetti burst around the logo
   (on load, every 6 seconds, and on hover). Safe to delete this file
   and its <script> line in index.html to switch the confetti off.
   ===================================================================== */
/* Golden confetti burst around the logo: on load, every 6 seconds, and on hover */
(function(){
  var wrap=document.querySelector('.logo-wrap'); if(!wrap) return;
  var cols=['#F6D27A','#E6C35C','#D4AF37','#FFF3C4','#B8860B','#FFFFFF'];
  function burst(){
    for(var i=0;i<26;i++){
      var p=document.createElement('span'), a=Math.random()*Math.PI*2, d=34+Math.random()*46;
      p.className='gconf'+(i%3===0?' s':'');
      var c=cols[i%cols.length]; p.style.background=c;
      if(i%3===0){p.style.background=c;}
      p.style.setProperty('--x',Math.cos(a)*d+'px');
      p.style.setProperty('--y',Math.sin(a)*d+'px');
      p.style.setProperty('--r',(Math.random()*540-270)+'deg');
      p.style.animationDelay=(Math.random()*.15)+'s';
      wrap.appendChild(p); setTimeout(function(x){x.remove()},1900,p);
    }
  }
  setTimeout(burst,2600); setInterval(burst,6000);
  var last=0; wrap.addEventListener('mouseenter',function(){var n=Date.now(); if(n-last>1200){last=n;burst();}});
})();
