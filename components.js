/* Native component enhancement, usable independently of the docs shell. */
document.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role=tab]')];
  function select(tab) {
    tabs.forEach(t => {
      const active=t===tab; t.setAttribute('aria-selected',String(active)); t.tabIndex=active?0:-1;
      document.getElementById(t.getAttribute('aria-controls')).hidden=!active;
    });
  }
  tabs.forEach((tab,i) => {
    tab.addEventListener('click',()=>select(tab));
    tab.addEventListener('keydown',e=> {
      let next; if(e.key==='ArrowRight') next=(i+1)%tabs.length;
      if(e.key==='ArrowLeft') next=(i+tabs.length-1)%tabs.length;
      if(e.key==='Home') next=0; if(e.key==='End') next=tabs.length-1;
      if(next!==undefined) {e.preventDefault(); select(tabs[next]);tabs[next].focus();}
    });
  });
});
document.querySelectorAll('[data-open-dialog]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.openDialog).showModal()));
document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
