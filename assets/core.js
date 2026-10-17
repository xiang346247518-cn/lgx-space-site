export const REPO='xiang346247518-cn/lgx-space-site';
export const ROOT=new URL('../',import.meta.url);
export const LOCAL=await (async()=>{if(!['127.0.0.1','localhost'].includes(location.hostname))return null;try{const r=await fetch(new URL('api/bootstrap',ROOT));if(r.ok){const d=await r.json();if(d.local&&d.token)return d}}catch{}return null})();
export async function localRequest(path,value){if(!LOCAL)throw Error('请在电脑上打开本地网站工作台');const r=await fetch(new URL('api/'+path,ROOT),value===undefined?{cache:'no-store'}:{method:'POST',headers:{'Content-Type':'application/json','X-LGX-Token':LOCAL.token},body:JSON.stringify(value)});const d=await r.json();if(!r.ok)throw Error(d.error||'本地服务暂不可用');return d;}
export const categories={'展陈与汽车':'Exhibition & automotive','产业园区':'Industrial','教育建筑':'Education','居住与酒店':'Living & hospitality','办公建筑':'Office','商业与综合体':'Commercial','城市规划':'Master planning'};
export let taxonomy={groups:[{id:'living',name:'居住类',englishName:'Residential'},{id:'public',name:'公共建筑类',englishName:'Public architecture'}],categories:Object.entries(categories).map(([name,englishName],i)=>({id:['exhibition','industrial','education','living-hospitality','office','commercial','planning'][i],parentId:name==='居住与酒店'?'living':'public',name,englishName}))};
export function setTaxonomy(value){if(!value||!Array.isArray(value.groups)||!Array.isArray(value.categories))throw Error('分类资料无法读取');taxonomy=value;}
export function subcategory(p){return taxonomy.categories.find(c=>c.id===p.categoryId)||taxonomy.categories.find(c=>c.name===p.category);}
export function majorId(p){return subcategory(p)?.parentId||p.majorCategory||'';}
export function categoryText(p,l='zh'){const c=subcategory(p);return c?(l==='en'?c.englishName||c.name:c.name):p.category||'';}
export function majorText(p,l='zh'){const g=taxonomy.groups.find(x=>x.id===majorId(p));return g?(l==='en'?g.englishName||g.name:g.name):'';}
export const roles={'Lead Architect':['主创建筑师','Lead architect'],'Core Lead Architect Team Members':['主创团队核心成员','Core member of the lead architectural team'],'BIM Modeling and Rendering Services':['BIM 建模与渲染服务','BIM modelling & rendering services'],'BIM Consulting Services':['BIM 咨询服务','BIM consulting services']};
export const $=(s,r=document)=>r.querySelector(s);
export function el(tag,text,cls){const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;}
export function title(p,l){return l==='en'?p.englishName:p.translations?.zh?.name||p.name;}
export function locationText(p,l){return p.translations?.[l]?.location||p.location||'';}
export function description(p,l){return l==='en'?p.translations?.en?.description||p.originalDescription:p.translations?.zh?.description||p.originalDescription;}
export function role(p,l){return roles[p.role]?.[l==='en'?1:0]||p.role||'';}
export function imageURL(src){if(/^data:image\/(webp|png|jpeg);base64,[a-z0-9+/=]+$/i.test(src))return src;if(/^https:\/\//.test(src))return src;if(/^assets\/[a-zA-Z0-9_./-]+$/.test(src)&&!src.includes('..'))return new URL(src,ROOT).href;return '';}
export function image(src,alt,cls){const im=el('img',null,cls);im.src=imageURL(src);im.alt=alt||'';im.decoding='async';im.loading='lazy';return im;}
export async function getJSON(path){const r=await fetch(new URL(path,ROOT),{cache:'no-cache'});if(!r.ok)throw Error(`无法读取资料 (${r.status})`);return r.json();}
export async function album(p){if(!p.album)return {version:1,projectId:p.id,images:[{src:p.image,caption:{zh:title(p,'zh'),en:title(p,'en')}}]};return getJSON(p.album+'?v='+encodeURIComponent(p.revision||''));}
export function sortProjects(ps){return [...ps].sort((a,b)=>(a.order??999)-(b.order??999));}
export async function db(){return new Promise((resolve,reject)=>{const r=indexedDB.open('lgx-portfolio-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('drafts',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function draft(action,value){if(LOCAL)return localRequest('drafts',{action,value});const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction('drafts',['get','all'].includes(action)?'readonly':'readwrite');const s=tx.objectStore('drafts');const r=action==='all'?s.getAll():action==='get'?s.get(value):action==='delete'?s.delete(value):s.put(value);let result;r.onsuccess=()=>result=r.result;tx.oncomplete=()=>{d.close();resolve(result)};tx.onerror=()=>{d.close();reject(tx.error)};});}
export function validateProject(p,a){if(!p||!/^[a-z0-9][a-z0-9-]{0,79}$/.test(p.id))throw Error('项目编号只能使用小写英文、数字和短横线');if(!title(p,'zh')?.trim()||!p.englishName?.trim())throw Error('请填写中文及英文项目名');if(!subcategory(p)||!taxonomy.groups.some(g=>g.id===majorId(p)))throw Error('请选择项目大类和小类');if(!imageURL(p.image))throw Error('请设置有效封面');if(!a||a.projectId!==p.id||!Array.isArray(a.images)||!a.images.length)throw Error('请至少保留一张项目图片');if(a.images.length>80)throw Error('每个项目最多 80 张图片');for(const x of a.images)if(!imageURL(x.src))throw Error('相册存在无效图片');if(JSON.stringify(a).length>24*1024*1024)throw Error('相册超过 24 MB，请减少部分图片后重试');}
