(()=>{'use strict';
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement,media=matchMedia('(prefers-color-scheme: dark)');
let toastTimer;function announce(message){clearTimeout(toastTimer);$('#toast').textContent=message;toastTimer=setTimeout(()=>$('#toast').textContent='',4500);}
const theme=$('#theme');function updateTheme(){const dark=root.dataset.theme?root.dataset.theme==='dark':media.matches;theme.setAttribute('aria-label','Switch to '+(dark?'light':'dark')+' theme');theme.setAttribute('aria-pressed',String(dark));document.querySelector('meta[name=theme-color]').content=dark?'#111111':'#ffffff';}
theme.addEventListener('click',()=>{const dark=root.dataset.theme?root.dataset.theme==='dark':media.matches;root.dataset.theme=dark?'light':'dark';try{localStorage.setItem('skw-brand-theme',root.dataset.theme);}catch{}updateTheme();});media.addEventListener('change',updateTheme);updateTheme();
// Preserve links to the previous single-page brand portal.
const oldRoutes={identity:'/identity/',logos:'/logos/',foundation:'/colour/',applications:'/navigation/',governance:'/contributing/'};
if(location.pathname==='/'&&oldRoutes[location.hash.slice(1)])location.replace(oldRoutes[location.hash.slice(1)]);
// Local navigation filtering retains the native disclosures and link semantics.
$$('.find').forEach(input=>input.addEventListener('input',()=>{
 const nav=input.closest('nav'),term=input.value.trim().toLowerCase();let count=0;
 nav.querySelectorAll('.nav-group').forEach(group=>{let matches=0;group.querySelectorAll('a').forEach(a=>{const show=!term||a.textContent.toLowerCase().includes(term);a.hidden=!show;if(show)matches++;});group.hidden=matches===0;if(term)group.open=true;count+=matches;});
 nav.querySelector('.nav-empty').hidden=count>0;
}));
// Close account and resource popovers on outside click or Escape.
const menus=$$('.top-dropdown');menus.forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)menus.filter(m=>m!==menu).forEach(m=>m.open=false);}));
document.addEventListener('click',e=>menus.forEach(menu=>{if(!menu.contains(e.target))menu.open=false;}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('dialog[open]')){e.preventDefault();$('dialog[open]').close();return;}if(e.key==='Escape')menus.forEach(menu=>{if(menu.open){menu.open=false;menu.querySelector('summary').focus();}});if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(!$('#search-dialog').open)$('#search-dialog').showModal();$('#global-search').focus();}});
// Copy values and example code; offer a visible fallback when clipboard access is denied.
async function copy(value){try{await navigator.clipboard.writeText(value);announce('Copied to clipboard.');}catch{const dialog=document.createElement('dialog');dialog.className='sk-dialog';const label=document.createElement('label');label.textContent='Select and copy this value';const area=document.createElement('textarea');area.className='sk-input';area.value=value;area.rows=6;label.append(area);const close=document.createElement('button');close.type='button';close.className='sk-button';close.textContent='Done';close.addEventListener('click',()=>dialog.close());dialog.append(label,close);document.body.append(dialog);dialog.addEventListener('close',()=>dialog.remove());dialog.showModal();area.focus();area.select();}}
$$('[data-copy]').forEach(button=>button.addEventListener('click',()=>copy(button.dataset.copy)));
$$('.copy-code').forEach(button=>button.addEventListener('click',()=>copy(button.parentElement.querySelector('code').textContent)));
$$('[data-feedback]').forEach(button=>button.addEventListener('click',()=>announce(button.dataset.feedback)));
// Search is local and never transmits the query to a service.
let indexPromise;const search=$('#global-search'),results=$('#search-results'),count=$('#search-count');let searchRevision=0;
search.addEventListener('input',async()=>{const revision=++searchRevision,query=search.value.trim().toLowerCase();results.replaceChildren();if(!query){count.textContent='Type to search the design system.';return;}count.textContent='Searching…';try{
 indexPromise??=fetch('/search-index.json').then(r=>{if(!r.ok)throw Error('Search unavailable');return r.json();}).catch(e=>{indexPromise=undefined;throw e;});const index=await indexPromise;if(revision!==searchRevision)return;
 const words=query.split(/\s+/);const hits=index.map(item=>({item,score:words.reduce((n,w)=>n+(item.label.toLowerCase().includes(w)?8:0)+(item.title.toLowerCase().includes(w)?5:0)+(item.description.toLowerCase().includes(w)?3:0),0)})).filter(({item})=>words.every(w=>(item.title+' '+item.label+' '+item.description+' '+item.text).toLowerCase().includes(w))).sort((a,b)=>b.score-a.score).slice(0,12);
 count.textContent=hits.length?`${hits.length} matching page${hits.length===1?'':'s'}`:'No matching pages. Try “buttons”, “colour” or “tokens”.';
 hits.forEach(({item})=>{const a=document.createElement('a');a.className='search-result';a.href=item.url;const strong=document.createElement('strong');strong.textContent=item.label;const p=document.createElement('p');p.textContent=item.description;const path=document.createElement('span');path.textContent=item.url;a.append(strong,p,path);results.append(a);});
 }catch{if(revision===searchRevision)count.textContent='Search is unavailable. Use the page navigation or try again.';}});
$('#search-dialog').addEventListener('close',()=>{search.value='';results.replaceChildren();count.textContent='Type to search the design system.';searchRevision++;});
// Versioned, expiring preference storage. No optional tracking is shipped.
const key='skw-design-consent',version=1,days=180;let preference;
try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved?.version===version&&typeof saved.analytics==='boolean'&&Number.isFinite(saved.timestamp)&&saved.timestamp<=Date.now()&&Date.now()-saved.timestamp<days*86400000)preference=saved;}catch{}
$('#consent-banner').hidden=Boolean(preference);
function savePreference(analytics){preference={version,analytics,timestamp:Date.now()};let stored=true;try{localStorage.setItem(key,JSON.stringify(preference));}catch{stored=false;}$('#consent-banner').hidden=true;if($('#preferences-dialog').open)$('#preferences-dialog').close();window.dispatchEvent(new CustomEvent('skw:consent-change',{detail:{...preference}}));announce(stored?'Preferences saved.':'Preferences apply to this page. Browser storage is unavailable.');}
$('#accept-all').addEventListener('click',()=>savePreference(true));$('#required-only').addEventListener('click',()=>savePreference(false));$('#preferences-required').addEventListener('click',()=>savePreference(false));
$$('[data-preferences]').forEach(b=>b.addEventListener('click',()=>{$('#analytics-choice').checked=Boolean(preference?.analytics);$('#preferences-dialog').showModal();}));$('#save-preferences').addEventListener('click',()=>savePreference($('#analytics-choice').checked));
// Documentation-only examples. No submitted values leave the browser.
const form=$('#example-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const input=$('#example-name'),invalid=!input.value.trim();input.setAttribute('aria-invalid',String(invalid));$('#name-error').hidden=!invalid;$('#form-result').textContent=invalid?'Check the name field.':'Example validated. No data was sent.';if(invalid)input.focus();});
const filter=$('#table-filter');if(filter){const table=$('#example-table'),body=table.tBodies[0],rows=[...body.rows];filter.addEventListener('input',()=>{let visible=0;rows.forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(filter.value.toLowerCase());if(!row.hidden)visible++;});$('#table-status').textContent=visible?`${visible} resource${visible===1?'':'s'}`:'No resources match. Clear the filter to show all resources.';});let ascending=true;$('#table-sort').addEventListener('click',()=>{rows.sort((a,b)=>a.cells[0].textContent.localeCompare(b.cells[0].textContent)*(ascending?1:-1)).forEach(row=>body.append(row));$('#table-sort').closest('th').setAttribute('aria-sort',ascending?'ascending':'descending');$('#table-status').textContent='Resources sorted '+(ascending?'ascending.':'descending.');ascending=!ascending;});}
})();
