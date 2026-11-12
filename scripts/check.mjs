import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {pages} from '../content.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const routes=['',...pages.map(p=>p.slug+'/')];
for(const path of routes){
 const html=(await readFile(root+path+'index.html','utf8')).replace(/<pre>[\s\S]*?<\/pre>/g,'');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path+' must have one h1');
 assert(html.includes('Skip to content'));assert(html.includes('lang="en-ZA"'));
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs on '+path);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)){
  const target=root+match[1].slice(1)+(match[1].endsWith('/')?'index.html':'');
  assert((await stat(target)).isFile(),'Missing local destination '+target);
 }
 for(const match of html.matchAll(/aria-(?:controls|labelledby|describedby)="([^"]+)"/g))for(const id of match[1].split(' '))assert(ids.includes(id),'Missing ARIA reference '+id);
}
const tokens=JSON.parse(await readFile(root+'tokens.json','utf8'));
function luminance(hex){const rgb=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
function contrast(a,b){const values=[luminance(a),luminance(b)].sort((a,b)=>b-a);return(values[0]+.05)/(values[1]+.05);}
for(const [name,t] of Object.entries(tokens.themes)){
 for(const [fg,bg,min] of [['text','bg',4.5],['muted','bg',4.5],['muted','surface',4.5],['on-action','action',4.5],['control-border','bg',3],['focus','bg',3],['danger','bg',4.5],['success','bg',4.5]])assert(contrast(t[fg],t[bg])>=min,`${name} contrast: ${fg}/${bg}`);
}
const search=JSON.parse(await readFile(root+'search-index.json','utf8'));assert.equal(search.length,pages.length);
assert.equal((await readFile(root+'CNAME','utf8')).trim(),'brand.skunkworks.africa');
console.log(`PASS: ${routes.length} pages, local links, unique IDs, ARIA references, search coverage and semantic contrast in both themes.`);
