(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const ROOT = new URL('../', document.currentScript.src);
  const CATALOG = document.currentScript.dataset.catalog || 'data/projects.json';
  const originalUI = {};
  for (const element of $$('[data-i18n]')) originalUI[element.dataset.i18n] = element.innerHTML;
  for (const [attribute, dataKey] of [['aria-label','i18nAria'], ['alt','i18nAlt'], ['placeholder','i18nPlaceholder']]) {
    for (const element of $$(`[data-${dataKey.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}]`)) originalUI[element.dataset[dataKey]] = element.getAttribute(attribute);
  }
  const COPY = {
    zh: {...originalUI, navigation:'主导航', all:'全部', type:'项目类型', role:'参与角色', date:'项目日期', unknown:'未注明', searchEmpty:'没有符合条件的项目。试试其他关键词或分类。', loadError:'暂时无法读取项目，请重试。', retry:'重新读取', loading:'正在读取项目…', projectImage:'项目图片', enlarge:'放大图片', sourceTranslation:'中文译文', concept1Title:'从变化出发', concept1Text:'先观察空间里正在发生的事情，再理解需要什么条件。形态，是回应这些条件的结果。', concept2Title:'让空间回应时间', concept2Text:'家庭、产品和城市都有自己的变化周期。设计需要考虑今天的使用，也需要给未来的调整留下条件。', concept3Title:'给尚未发生的生活留位置', concept3Text:'空间的价值，不止于满足已知的功能，也在于支持我们还无法完全预见的变化。', title:'吕国祥 LGX — 空间是行为的容器', description:'吕国祥的建筑作品、空间观点与数字实践。空间是行为的容器。浏览中国与新加坡的建筑设计、BIM 与规划项目。'},
    en: {
      skip:'Skip to selected works', home:'LGX home', identity:'LV GUOXIANG<br>ARCHITECTURE / SPACE / DIGITAL', navigation:'Main navigation', navWork:'Work', navThinking:'Perspective', navArchive:'Index', navAbout:'About', openMenu:'Open navigation menu', closeMenu:'Close navigation menu', menu:'Navigation menu', menuNote:'Architecture is a starting point. Space is an ongoing enquiry.',
      heroEyebrow:'LV GUOXIANG / ARCHITECT & SPATIAL OBSERVER', heroIndex:'SELECTED WORK & ONGOING ENQUIRIES / 2026', heroTitle:'Space is the<br>container of<br><em>behaviour.</em>', heroIntro:'Beginning with real architecture.<br>Understanding change. Leaving room for life.', explore:'Explore work', bydLink:'Explore the Changzhou BYD project', bydAlt:'Architectural rendering of the Changzhou BYD Full-Brand Flagship Store', heroImageLabel:'CHANGZHOU BYD / ARCHITECTURAL RENDERING', heroCaption:'FEATURED / CHANGZHOU BYD FLAGSHIP STORE', heroCaptionRight:'CHANGZHOU, CHINA / LEAD ARCHITECT',
      workKicker:'SELECTED WORK', workTitle:'Different scales.<br>A shared concern for life.', workIntro:'From a home to a part of a city,<br>spaces that respond to real needs.', allProjects:'Complete index',
      caseKicker:'DESIGN OBSERVATIONS / CHANGZHOU BYD', caseIndex:'FROM NEEDS TO SPACE', caseTitle:'Cars evolve.<br>How can space<br><em>keep its relevance?</em>', caseIntro:'When products change faster than buildings, design must leave room for future displays, operations and adaptations.', readProject:'Explore the project', enlargeByd:'Enlarge the architectural rendering', bydDetailAlt:'Architectural rendering of the Changzhou BYD project', enlargePlan:'Enlarge the site plan', planAlt:'Site plan of the Changzhou BYD project', caseImageCaption:'Architecture steps back. The display steps forward.', principle1Title:'A city-facing display', principle1Text:'The street-facing elevations serve display and urban engagement. Vehicle movement and operational routes find their own place in the overall plan.', principle2Title:'Room for change', principle2Text:'Consider floor heights and the potential to divide or combine spaces, allowing future brand displays and functional upgrades.', principle3Title:'Needs guide investment', principle3Text:'Organise space and allocate investment around actual uses, keeping design decisions connected to construction and delivery.', caseQuote:'“Designed to remain relevant,<br>not merely to be seen once.”', caseNote:'Renderings and drawings are from the original project materials.',
      thinkingKicker:'A PERSPECTIVE ON SPACE', thinkingIndex:'OBSERVE / QUESTION / VERIFY', thinkingTitle:'Observe <em>change.</em><br>Then organise space.', thinkingIntro:'For me, behaviour means more than human actions. It also describes processes of change. Architecture creates conditions for those changes.', conceptTabs:'Spatial observations', behaviour:'Behaviour', cycle:'Cycles', possibility:'Possibility', studyLabel:'A visual expression of a spatial perspective', concept1Title:'Begin with change', concept1Text:'Observe what is happening in a space, then understand the conditions it needs. Form emerges from a response to those conditions.', concept2Title:'Let space respond to time', concept2Text:'Families, products and cities have their own cycles of change. Design considers today’s use while creating conditions for future adaptation.', concept3Title:'Leave room for life yet to unfold', concept3Text:'A space’s value lies both in meeting known needs and in supporting changes we cannot yet fully anticipate.',
      lab1Title:'The housing clinic', lab1Text:'Understand real spatial needs through ten or twenty years of changing family life.', lab2Title:'The digital home', lab2Text:'Explore the relationship between a physical home and a person’s digital space.', lab3Title:'Space & AI', lab3Text:'Turn observations, design experience and digital tools into methods that can be tested over time.',
      archiveKicker:'COMPLETE PROJECT INDEX', archiveIndex:'ARCHITECTURE & DIGITAL PRACTICE', archiveTitle:'The archive<span class="accent-dot">.</span>', filters:'Project categories', searchLabel:'Search projects', searchPlaceholder:'Project, city or keyword', viewMode:'Archive view', listView:'List view', gridView:'Grid view', indexNo:'NO.', projectName:'PROJECT', type:'TYPE', location:'LOCATION', year:'YEAR', loadMore:'Show more projects', all:'All', unknown:'Not specified', searchEmpty:'No matching projects. Try another keyword or category.', loadError:'The archive could not be loaded. Please try again.', retry:'Try again', loading:'Loading projects…',
      aboutKicker:'ABOUT LV GUOXIANG', aboutAlt:'Architectural rendering of the Qingdao Haier Public Transport TOD project', aboutImageLabel:'QINGDAO HAIER TOD / ARCHITECTURAL DESIGN', aboutEyebrow:'ARCHITECT / BIM PRACTITIONER / SPATIAL OBSERVER', aboutTitle:'Architecture is a start.<br><em>Space</em> is a wider enquiry.', aboutText:'I am Lv Guoxiang, an architect from Chongqing. My work spans architectural design, BIM and digital practice, with project experience in China and Singapore. This is both a portfolio and an evolving record of how I observe space.', aboutText2:'I explore how space accommodates behaviour, responds to time and supports ways of living that have yet to unfold.', practice:'Practice', practiceValue:'Architecture · BIM · Master planning', reach:'Project regions', reachValue:'China · Singapore', approach:'Focus', approachValue:'Behaviour · Cycles · Spatial possibilities',
      contactKicker:'THE NEXT CONVERSATION STARTS HERE.', connect:'Connect on LinkedIn', contactTitle:'Space for<br>the next <em>possibility.</em>', copyright:'© 2026 LV GUOXIANG / ARCHITECTURE · SPACE · DIGITAL', backTop:'Back to top', backWorks:'Back to work', projectDetail:'PROJECT ARCHIVE', projectOverview:'PROJECT OVERVIEW', sourceNote:'Project status and dates reflect the original source at the time of writing.', originalText:'View the original source text', linkedinArticle:'Read the LinkedIn project article', nextProject:'NEXT PROJECT', role:'ROLE', date:'PROJECT DATES', projectImage:'Project image', enlarge:'Enlarge image', imageViewer:'Project image viewer', closeImage:'Close image viewer', previousImage:'Previous image', nextImage:'Next image', sourceTranslation:'Chinese translation', title:'Lv Guoxiang LGX — Space is the container of behaviour', description:'Architecture, spatial observations and digital practice by Lv Guoxiang. Explore architectural design, BIM and master planning projects in China and Singapore.'
    }
  };

  const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
  function animateIn(el){if(!reducedMotion.matches&&el?.animate)el.animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.22,1,.36,1)'});}
  const imageCount=n=>lang==='zh'?`${n} 张影像`:`${n} images`;
  function renderStrip(target,items,viewer){target.replaceChildren();for(const [i,item] of items.entries()){const b=node('button',undefined,'strip-thumb');b.type='button';b.setAttribute('aria-label',`${t('imageNumber')} ${i+1} / ${items.length}`);if(viewer){b.dataset.viewerIndex=i;b.setAttribute('aria-pressed',String(i===viewerIndex));}else b.dataset.galleryIndex=i;const atlas=galleryThumbnailAtlas,j=atlas?.images?.[item.image];if(j!==undefined){const im=node('span',undefined,'atlas-thumb');im.setAttribute('aria-hidden','true');const col=j%atlas.columns,row=Math.floor(j/atlas.columns);im.style.backgroundImage=`url("${new URL(atlas.image,ROOT).href}")`;im.style.backgroundSize=`${atlas.columns*100}% ${atlas.rows*100}%`;im.style.backgroundPosition=`${col/(atlas.columns-1)*100}% ${row/(atlas.rows-1)*100}%`;b.append(im);}else{const im=node('img');setImage(im,item.image,item.caption?.[lang]||t('projectImage'));im.loading='lazy';im.decoding='async';b.append(im);}target.append(b);}}

  Object.assign(COPY.zh,{"heroEyebrow": "吕国祥 · 建筑设计 / BIM", "heroIndex": "中国与新加坡 · 项目作品集", "heroTitle": "建筑作品。<br><em>数字实践。</em>", "heroIntro": "空间是行为的容器。<br>从项目，看见设计。", "heroCaption": "常州比亚迪全品牌旗舰店", "heroCaptionRight": "中国 · 常州 / 主创建筑师", "workTitle": "精选作品。", "workIntro": "建筑设计、BIM 与城市规划。<br>打开项目，浏览完整影像。", "archiveTitle": "所有项目<span class=\"accent-dot\">.</span>", "aboutTitle": "吕国祥。<br><em>建筑师与 BIM 从业者。</em>", "aboutText": "来自重庆，工作跨越建筑设计、BIM 与数字实践，项目经历涉及中国与新加坡。", "aboutText2": "从总体规划到具体建筑，让设计判断贯穿项目实施。", "approach": "工作方式", "approachValue": "建筑设计 · 数字协同 · 项目实施", "menuNote": "浏览作品，了解每个项目。", "contactTitle": "从作品，<br>开始下一次<em>对话。</em>", "openProject": "打开项目", "galleryTitle": "项目相册", "projectImages": "项目图片", "chooseImage": "选择图片", "imageNumber": "图片", "zoomImage": "放大细节", "description": "吕国祥的建筑设计、BIM 与城市规划作品集。浏览中国与新加坡的项目完整影像与原始资料。"});
  Object.assign(COPY.en,{"heroEyebrow": "LV GUOXIANG / ARCHITECTURE & BIM", "heroIndex": "CHINA & SINGAPORE / PORTFOLIO", "heroTitle": "Architecture.<br><em>Digital practice.</em>", "heroIntro": "Space is the container of behaviour.<br>Discover the work behind the design.", "heroCaption": "Changzhou BYD Full-Brand Flagship Store", "heroCaptionRight": "CHANGZHOU, CHINA / LEAD ARCHITECT", "workTitle": "Selected work.", "workIntro": "Architecture, BIM and master planning.<br>Open a project. Explore the complete gallery.", "archiveTitle": "All projects<span class=\"accent-dot\">.</span>", "aboutTitle": "Lv Guoxiang.<br><em>Architect & BIM practitioner.</em>", "aboutText": "An architect from Chongqing, working across architectural design, BIM and digital practice, with project experience in China and Singapore.", "aboutText2": "From master planning to individual buildings, keeping design decisions connected to project delivery.", "approach": "Approach", "approachValue": "Architectural design · Digital coordination · Project delivery", "menuNote": "Explore the work. Discover each project.", "contactTitle": "Let the work<br>start the next <em>conversation.</em>", "openProject": "Explore project", "galleryTitle": "Project gallery", "projectImages": "Project images", "chooseImage": "Choose image", "imageNumber": "Image", "zoomImage": "Zoom details", "description": "Architecture, BIM and master planning projects by Lv Guoxiang. Explore complete project galleries from China and Singapore."});
  const categories = {'展陈与汽车':'Exhibition & automotive','产业园区':'Industrial','教育建筑':'Education','居住与酒店':'Living & hospitality','办公建筑':'Office','商业与综合体':'Commercial','城市规划':'Master planning'};
  const roles = {'Lead Architect':['主创建筑师','Lead architect'],'Core Lead Architect Team Members':['主创团队核心成员','Core member of the lead architectural team'],'BIM Modeling and Rendering Services':['BIM 建模与渲染服务','BIM modelling & rendering services'],'BIM Consulting Services':['BIM 咨询服务','BIM consulting services']};
  const cities = {'上海':'Shanghai','北京':'Beijing','南昌':'Nanchang','合肥':'Hefei','郑州':'Zhengzhou','武汉':'Wuhan','青岛':'Qingdao','石家庄':'Shijiazhuang','荆门':'Jingmen','西宁':'Xining','重庆':'Chongqing','昆明':'Kunming','绍兴':'Shaoxing','西安':"Xi’an",'惠州':'Huizhou','秦皇岛':'Qinhuangdao','常州':'Changzhou','济南':'Jinan','淮安':"Huai’an",'新加坡':'Singapore'};
  const selectedIDs = ['exhibition-building-1','office-8','school-1','exhibition-building-3','industrial-park-1','residence-4'];
  const projectDialog = $('#project-dialog'), imageDialog = $('#image-dialog'), menuDialog = $('#menu-dialog');
  let lang = 'zh';
  try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('lgx-language') || 'zh'; } catch (_) {}
  if (!['zh','en'].includes(lang)) lang = 'zh';
  let projects = [], filter = 'all', limit = 12, view = 'grid', concept = 'behaviour', currentProject = null, lastTrigger = null, viewerItems = [], viewerIndex = 0, nextID = null;
  let dataLoaded = false, optimizedImages = {}, thumbnailAtlas = null, galleryThumbnailAtlas = null;
  const t = (key) => COPY[lang][key] ?? COPY.zh[key] ?? key;
  const node = (tag, value, className) => { const e=document.createElement(tag); if(value!==undefined)e.textContent=value; if(className)e.className=className; return e; };
  const name = p => lang === 'en' ? p.englishName || p.name : p.translations?.zh?.name || p.name;
  const category = p => lang === 'en' ? categories[p.category] || p.category : p.category;
  const role = p => roles[p.role]?.[lang === 'en' ? 1 : 0] || p.role || t('unknown');
  const place = p => p.translations?.[lang]?.location || (lang === 'en' ? cities[p.location] || p.location : p.location);
  const year = p => p.year ? p.year.replace('–present', lang === 'zh' ? ' 起' : '–').replace('—present', lang === 'zh' ? ' 起' : '–') : t('unknown');
  function city(p) {
    const locationText = p.location || '';
    for (const [zh,en] of Object.entries(cities)) if (locationText.includes(zh) || locationText.toLowerCase().includes(en.replace('’',"'").toLowerCase())) return lang === 'en' ? en : zh;
    return place(p) || t('unknown');
  }
  function dates(p) {
    if(!p.date)return year(p);
    if(lang==='zh')return p.date;
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return p.date.replace(/(\d{4})年(\d{1,2})月/g,(_,y,m)=>`${months[Number(m)-1]} ${y}`).replace(/(\d{4})年/g,'$1').replace('现在','ongoing in source');
  }
  const imageURL = source => optimizedImages[source] || source;
  function setImage(img, source, alt, thumbnail=false) { img.dataset.fallback=new URL(source,ROOT).href; img.dataset.failed=''; img.alt=alt; img.src=new URL(imageURL(source,thumbnail),ROOT).href; }
  function fallback(img) { if(img.dataset.fallback && !img.dataset.failed){img.dataset.failed='true';img.src=img.dataset.fallback;} }
  document.addEventListener('error', event=>{if(event.target instanceof HTMLImageElement)fallback(event.target);},true);
  for(const img of $$('img[data-fallback]'))if(img.complete&&!img.naturalWidth)fallback(img);
  function syncLock(){document.body.classList.toggle('modal-open',!!$('dialog[open]'));}
  function visibleAnchor(){return $$('.hero,#work,#archive,#about,#contact').find(e=>{const r=e.getBoundingClientRect();return r.top<=120&&r.bottom>120;});}
  function applyLanguage(updateURL=true) {
    const anchor=visibleAnchor(), offset=anchor?.getBoundingClientRect().top, dialogScroll=projectDialog.scrollTop;
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.title=t('title'); $('meta[name="description"]').content=t('description'); $('meta[property="og:title"]').content=t('title'); $('meta[property="og:description"]').content=t('description');
    for(const element of $$('[data-i18n]'))element.innerHTML=t(element.dataset.i18n);
    for(const [attribute,key,selector] of [['aria-label','i18nAria','[data-i18n-aria]'],['alt','i18nAlt','[data-i18n-alt]'],['placeholder','i18nPlaceholder','[data-i18n-placeholder]']]) for(const element of $$(selector))element.setAttribute(attribute,t(element.dataset[key]));
    for(const button of $$('[data-lang]'))button.setAttribute('aria-pressed',String(button.dataset.lang===lang));
    try{localStorage.setItem('lgx-language',lang);}catch(_){}
    if(updateURL){const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(history.state,'',url);}
    if(dataLoaded){renderSelected();renderFilters();renderArchive();if(currentProject)renderProject(currentProject,false);}else $('#archive-status').textContent=t('loading');
    if(anchor)requestAnimationFrame(()=>window.scrollBy({top:anchor.getBoundingClientRect().top-offset,behavior:'instant'}));
    if(currentProject)projectDialog.scrollTop=dialogScroll;
    for(const el of $$('.hero-heading,.section-heading h2'))animateIn(el);
  }
  let revealObserver;
  if('IntersectionObserver' in window){revealObserver=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}}, {threshold:.06});}
  function reveal(e){if(revealObserver){e.classList.add('reveal');revealObserver.observe(e);}}
  function projectLink(p,className){const a=node('a',undefined,className);a.href=`#project/${encodeURIComponent(p.id)}`;a.dataset.project=p.id;return a;}
  function renderSelected(){
    const grid=$('#selected-grid');grid.replaceChildren();
    for(const [i,id] of selectedIDs.entries()){
      const p=projects.find(x=>x.id===id);if(!p)continue;
      const a=projectLink(p,'selected-project');a.append(node('span',`P / ${String(i+1).padStart(2,'0')}`,'project-index'));
      const picture=node('div',undefined,'project-picture image-link'), img=node('img');setImage(img,p.image,`${name(p)} / ${t('projectImage')}`);img.loading='lazy';img.decoding='async';img.width=1600;img.height=1100;picture.append(img,node('span',category(p),'project-type'),node('span','↗','image-action'));
      const head=node('div',undefined,'project-head');head.append(node('h3',name(p)),node('span','↗'));
      const meta=node('div',undefined,'project-meta');meta.append(node('span',`${city(p)}${p.year?' / '+year(p):''}`),node('span',role(p)));
      const caption=node('div',undefined,'project-caption');caption.append(head,meta);const count=node('span',String(p.imageCount||gallery(p).length)+(lang==='zh'?' 张影像':' images'),'project-photo-count');picture.append(count);a.append(picture,caption);grid.append(a);reveal(a);
    }
    $('#work-total').textContent=projects.length;
  }
  function renderFilters(){
    const target=$('#filters');target.replaceChildren();
    for(const cat of ['all',...new Set(projects.map(p=>p.category))]){
      const label=cat==='all'?t('all'):(lang==='en'?categories[cat]||cat:cat), number=cat==='all'?projects.length:projects.filter(p=>p.category===cat).length;
      const button=node('button',label);button.type='button';button.dataset.category=cat;button.setAttribute('aria-pressed',String(filter===cat));button.append(node('span',number));target.append(button);
    }
  }
  function matches(){const q=$('#project-search').value.trim().toLocaleLowerCase();return projects.filter(p=>(filter==='all'||p.category===filter)&&(!q||[p.name,p.englishName,p.location,p.category,p.role,...(p.keywords||[]),p.translations?.zh?.name,p.translations?.zh?.location,p.translations?.en?.location,categories[p.category],...Object.values(roles[p.role]||{})].join(' ').toLocaleLowerCase().includes(q)));}
  function renderArchive(){
    const filtered=matches(), target=$('#archive-results');target.replaceChildren();target.dataset.view=view;$('#archive').classList.toggle('is-grid',view==='grid');$('#archive-total').textContent=projects.length;
    $('#archive-status').textContent=lang==='zh'?`显示 ${Math.min(limit,filtered.length)} / ${filtered.length} 个项目`:`Showing ${Math.min(limit,filtered.length)} of ${filtered.length} projects`;
    for(const p of filtered.slice(0,limit)){
      const a=projectLink(p,'archive-row');
      a.append(node('span',String(projects.indexOf(p)+1).padStart(2,'0'),'row-number'));
      if(view==='grid'){
        const thumb=node('span',undefined,'row-thumb'), entry=thumbnailAtlas?.projects?.[p.id];
        if(entry&&entry.image===p.image){
          const image=node('span',undefined,'atlas-image');image.setAttribute('role','img');image.setAttribute('aria-label',`${name(p)} / ${t('projectImage')}`);
          const columns=thumbnailAtlas.columns, rows=thumbnailAtlas.rows, col=entry.index%columns, row=Math.floor(entry.index/columns);
          image.style.backgroundImage=`url("${new URL(thumbnailAtlas.image,ROOT).href}")`;image.style.backgroundSize=`${columns*100}% ${rows*100}%`;image.style.backgroundPosition=`${columns>1?col/(columns-1)*100:0}% ${rows>1?row/(rows-1)*100:0}%`;thumb.append(image);
        }else{const img=node('img');setImage(img,p.image,`${name(p)} / ${t('projectImage')}`);img.loading='lazy';img.decoding='async';img.width=640;img.height=420;thumb.append(img);}
        a.append(thumb);
      }
      const title=node('span',name(p),'row-name');title.dataset.caption=`${category(p)} / ${city(p)}${p.year?' / '+year(p):''}`;
      a.append(title,node('span',String(p.imageCount||gallery(p).length)+(lang==='zh'?' 张影像':' images'),'row-image-count'),node('span',category(p),'row-category'),node('span',city(p),'row-location'),node('span',year(p),'row-year'),node('span','↗','row-arrow'));target.append(a);
    }
    if(!filtered.length)target.append(node('p',t('searchEmpty'),'empty-state'));
    animateIn(target);
    $('#load-more').hidden=limit>=filtered.length;
  }
  function gallery(p){return [{image:p.image,caption:{zh:p.translations?.zh?.name||p.name,en:p.englishName||p.name}},...(p.gallery||[])].map(x=>typeof x==='string'?{image:x,caption:{zh:t('projectImage'),en:t('projectImage')}}:x);}
  function renderProject(p,resetScroll=true){
    currentProject=p;$('#detail-title').textContent=name(p);$('#detail-subtitle').textContent=lang==='zh'?(p.englishName||''):(p.translations?.zh?.name||p.name);$('#detail-subtitle').lang=lang==='zh'?'en':'zh-CN';$('#detail-category').textContent=category(p);$('#detail-index').textContent=`P / ${String(projects.indexOf(p)+1).padStart(2,'0')}`;
    setImage($('#detail-cover'),p.image,`${name(p)} / ${t('projectImage')}`);$('#detail-cover-button').setAttribute('aria-label',`${t('enlarge')} — ${name(p)}`);
    const meta=$('#detail-meta');meta.replaceChildren();
    for(const [label,value] of [[t('year'),year(p)],[t('location'),place(p)],[t('type'),category(p)],[t('role'),role(p)],...(p.date?[[t('date'),dates(p)]]:[])]){const pair=node('div');pair.append(node('dt',label),node('dd',value));meta.append(pair);}
    $('#detail-description').textContent=lang==='zh'?(p.translations?.zh?.description||p.originalDescription):p.originalDescription;$('#detail-original').textContent=p.originalDescription;$('#original-text').hidden=lang==='en';
    const source=$('#detail-source');source.hidden=!p.linkedinUrl;if(p.linkedinUrl&&p.linkedinUrl.startsWith('https://'))source.href=p.linkedinUrl;
    const images=gallery(p), target=$('#detail-gallery');target.replaceChildren();renderStrip($('#detail-strip'),images,false);$('#gallery-count').textContent=imageCount(images.length);$('#detail-image-count').textContent=imageCount(images.length);
    for(const [i,item] of images.slice(1).entries()){
      const figure=node('div'), button=node('button',undefined,'image-link'), img=node('img');button.type='button';button.dataset.galleryIndex=i+1;figure.className='gallery-item';button.setAttribute('aria-label',`${t('enlarge')} — ${item.caption?.[lang]||name(p)}`);setImage(img,item.image,item.caption?.[lang]||name(p));img.loading='lazy';img.decoding='async';if(item.width){img.width=item.width;img.height=item.height;}button.append(img,node('span','+','image-action'));figure.append(button,node('p',item.caption?.[lang]||t('projectImage'),'gallery-caption'));target.append(figure);
    }
    const filtered=matches(), sequence=filtered.some(x=>x.id===p.id)?filtered:projects;nextID=sequence[(sequence.indexOf(p)+1)%sequence.length]?.id;$('#next-project-name').textContent=nextID?name(projects.find(x=>x.id===nextID)):'';$('.detail-next').hidden=sequence.length<2;
    if(resetScroll){projectDialog.scrollTop=0;$('#original-text').open=false;}
  }
  function openProject(id,trigger,updateHistory=true){
    const p=projects.find(x=>x.id===id);if(!p)return;
    if(!projectDialog.open)lastTrigger=trigger||document.activeElement;
    if(updateHistory){const url=new URL(location.href);url.hash=`project/${encodeURIComponent(id)}`;history.pushState({lgxProject:true,returnHash:history.state?.returnHash||location.hash||'#work'},'',url);}
    renderProject(p);
    if(!projectDialog.open){projectDialog.classList.remove('closing');projectDialog.showModal();}syncLock();
  }
  function closeProject(changeHistory=true){
    if(changeHistory&&projectDialog.open&&!projectDialog.classList.contains('closing')&&!reducedMotion.matches){projectDialog.classList.add('closing');setTimeout(()=>closeProject(true),220);return;}
    projectDialog.classList.remove('closing');
    if(imageDialog.open)imageDialog.close();
    if(projectDialog.open)projectDialog.close();currentProject=null;syncLock();
    if(changeHistory&&location.hash.startsWith('#project/')){
      if(history.state?.lgxProject)history.back();
      else {const url=new URL(location.href);url.hash='work';history.replaceState(null,'',url);}
    }
    if(lastTrigger?.isConnected)lastTrigger.focus({preventScroll:true});
  }
  function route(){
    const raw=location.hash.slice(1), prefix=raw.startsWith('project/')?'project/':raw.startsWith('project=')?'project=':null;
    if(prefix){let id;try{id=decodeURIComponent(raw.slice(prefix.length));}catch(_){return;}if(dataLoaded)openProject(id,null,false);}
    else if(projectDialog.open)closeProject(false);
  }
  function openImages(items,index=0){viewerItems=items;viewerIndex=index;imageDialog.classList.remove('is-zoomed');$('#toggle-fit').setAttribute('aria-pressed','false');renderStrip($('#viewer-strip'),items,true);renderViewer();if(!imageDialog.open)imageDialog.showModal();syncLock();}
  function renderViewer(){const item=viewerItems[viewerIndex];if(!item)return;const title=item.caption?.[lang]||t('projectImage');setImage($('#viewer-image'),item.image,title);$('#image-viewer-label').textContent=title;$('#image-viewer-count').textContent=`${viewerIndex+1} / ${viewerItems.length}`;$('#previous-image').disabled=viewerItems.length<2;$('#next-image').disabled=viewerItems.length<2;for(const b of $$('#viewer-strip button'))b.setAttribute('aria-pressed',String(Number(b.dataset.viewerIndex)===viewerIndex));$('#viewer-strip button[aria-pressed=true]')?.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'nearest',inline:'center'});if(viewerItems.length>1){const next=new Image();next.src=new URL(imageURL(viewerItems[(viewerIndex+1)%viewerItems.length].image),ROOT).href;}}
  function changeImage(step){viewerIndex=(viewerIndex+step+viewerItems.length)%viewerItems.length;renderViewer();}
  document.addEventListener('click',event=>{
    const viewerThumb=event.target.closest('[data-viewer-index]');if(viewerThumb){viewerIndex=Number(viewerThumb.dataset.viewerIndex);renderViewer();return;}
    const language=event.target.closest('[data-lang]');if(language){lang=language.dataset.lang;applyLanguage();if(imageDialog.open)renderViewer();return;}
    const p=event.target.closest('[data-project]');if(p){event.preventDefault();openProject(p.dataset.project,p);return;}
    const cat=event.target.closest('[data-category]');if(cat){filter=cat.dataset.category;limit=12;renderFilters();renderArchive();$('#filters').querySelector(`[data-category="${CSS.escape(filter)}"]`)?.focus({preventScroll:true});return;}
    const mode=event.target.closest('[data-view]');if(mode){view=mode.dataset.view;for(const button of $$('[data-view]'))button.setAttribute('aria-pressed',String(button.dataset.view===view));renderArchive();return;}
    const image=event.target.closest('[data-image]');if(image){openImages([{image:image.dataset.imageFallback||image.dataset.image,caption:{zh:lang==='zh'?image.getAttribute('aria-label'):t('projectImage'),en:lang==='en'?image.getAttribute('aria-label'):t('projectImage')}}]);return;}
    const galleryButton=event.target.closest('[data-gallery-index]');if(galleryButton&&currentProject)openImages(gallery(currentProject),Number(galleryButton.dataset.galleryIndex));
  });
  $('#project-search').addEventListener('input',()=>{limit=12;renderArchive();});
  $('#load-more').addEventListener('click',()=>{const previousLimit=limit;limit+=12;renderArchive();if($('#load-more').hidden)$$('.archive-row') [previousLimit]?.focus({preventScroll:true});});
  $('[data-close-project]').addEventListener('click',()=>closeProject());projectDialog.addEventListener('cancel',event=>{event.preventDefault();closeProject();});
  $('#next-project').addEventListener('click',()=>{if(nextID){const url=new URL(location.href);url.hash=`project/${encodeURIComponent(nextID)}`;history.replaceState(history.state,'',url);openProject(nextID,null,false);}});
  $('#detail-cover-button').addEventListener('click',()=>{if(currentProject)openImages(gallery(currentProject));});$('#close-image').addEventListener('click',()=>imageDialog.close());imageDialog.addEventListener('close',syncLock);imageDialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();changeImage(1);}if(event.key==='ArrowLeft'){event.preventDefault();changeImage(-1);}});$('#previous-image').addEventListener('click',()=>changeImage(-1));$('#next-image').addEventListener('click',()=>changeImage(1));
  function closeMenu(){menuDialog.close();$('.menu-toggle').setAttribute('aria-expanded','false');syncLock();}
  $('.menu-toggle').addEventListener('click',()=>{menuDialog.showModal();$('.menu-toggle').setAttribute('aria-expanded','true');syncLock();});$('[data-close-menu]').addEventListener('click',closeMenu);menuDialog.addEventListener('close',()=>{$('.menu-toggle').setAttribute('aria-expanded','false');syncLock();});for(const link of $$('.menu-links a'))link.addEventListener('click',closeMenu);
  window.addEventListener('popstate',route);window.addEventListener('hashchange',route);
  if('IntersectionObserver' in window){
    const navObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)for(const a of $$('.desktop-nav a')){if(a.hash===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}, {rootMargin:'-10% 0px -65% 0px'});for(const section of $$('#work,#archive,#about'))navObserver.observe(section);
  }
  async function loadProjects(){
    try{
      $('#archive-status').textContent=t('loading');
      const data=window.LGX_PREVIEW_DATA||await fetch(new URL(CATALOG,ROOT),{cache:'no-cache'}).then(response=>{if(!response.ok)throw new Error('Project request failed');return response.json();});
      if(!Array.isArray(data.projects))throw new Error('Invalid project data');
      projects=data.projects;optimizedImages=data.optimizedImages||{};thumbnailAtlas=data.thumbnailAtlas||null;galleryThumbnailAtlas=data.galleryThumbnailAtlas||null;dataLoaded=true;renderSelected();renderFilters();renderArchive();route();
    }catch(error){$('#archive-status').textContent=t('loadError');const retry=node('button',t('retry'),'pill-button retry-button');retry.type='button';retry.addEventListener('click',()=>{retry.remove();loadProjects();});$('#archive-results').replaceChildren(retry);}
  }
  $('#jump-gallery').addEventListener('click',()=>$('.gallery-heading').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'}));
  $('#toggle-fit').addEventListener('click',()=>{const on=imageDialog.classList.toggle('is-zoomed');$('#toggle-fit').setAttribute('aria-pressed',String(on));});
  $('#viewer-image').addEventListener('load',()=>animateIn($('#viewer-image')));
  let touchStart=null;$('#viewer-image').addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&!imageDialog.classList.contains('is-zoomed'))touchStart={x:e.clientX,y:e.clientY};});$('#viewer-image').addEventListener('pointerup',e=>{if(touchStart){const dx=e.clientX-touchStart.x,dy=e.clientY-touchStart.y;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.4)changeImage(dx<0?1:-1);touchStart=null;}});$('#viewer-image').addEventListener('pointercancel',()=>touchStart=null);
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reducedMotion.matches){let frame=0;document.addEventListener('pointermove',e=>{const card=e.target.closest('.selected-project,.archive-row');if(!card||frame)return;frame=requestAnimationFrame(()=>{const r=card.getBoundingClientRect();card.style.setProperty('--shine-x',`${e.clientX-r.left}px`);card.style.setProperty('--shine-y',`${e.clientY-r.top}px`);frame=0;});},{passive:true});}
  applyLanguage(false);document.documentElement.classList.add('js');loadProjects();
})();
