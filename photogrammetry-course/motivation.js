/* Original introductory teaching material; the diagrams are illustrative, not surveyed data. */
(()=>{'use strict';
const cases=[
{title:'为校园留下一份三维档案',tag:'从身边开始',question:'毕业后，还能走近今天的教学楼吗？',input:'围绕一座建筑或一件校园雕塑，从不同位置拍摄有共同内容的照片，并记录一段已知长度。',output:'一份可以转动查看的三维模型、一张尺寸表、一份误差说明。',meaning:'照片保存一个视角；三维模型让人从多个方向观察，还能在有尺度依据时量测。',first:'先选一件表面有纹理、不会移动的小物体。观察从哪些位置能看到同一个角点。',route:'#read/3/stereo',link:'为什么要从不同位置拍摄？'},
{title:'让历史细节被看见',tag:'文化遗产',question:'一块石刻的凹凸，能怎样留给后来的人？',input:'从多个方向拍摄石刻或建筑细部，保留清晰的表面纹理和尺寸参照。',output:'记录表面形状的模型、细节截图，以及供后续比较使用的数字档案。',meaning:'数字记录可以支持观察和研究。被遮挡的背面、拍不清的细节，不能靠模型“自动知道”。',first:'用普通摆件练习，比较正面照片和侧面照片分别提供了什么信息。',route:'#read/7/features',link:'软件怎样在照片间找到同一个地方？',source:'https://historicengland.org.uk/images-books/publications/photogrammetric-applications-for-cultural-heritage/',sourceTitle:'真实应用：Historic England 文化遗产摄影测量指南'},
{title:'读懂地表发生的变化',tag:'环境与工程',question:'一次暴雨之后，河岸哪里被冲走了？',input:'比较两个时期的影像及其恢复的地表形状，先统一位置、单位和高程基准。',output:'一张高程变化图，以及有范围和误差说明的变化量估计。',meaning:'高程就是一个点相对约定基准的高度。两次高度相减，可能反映冲刷或堆积，也可能包含测量误差，需要检查。',first:'从两个时期的教学数据开始，在同一位置比较高度；先解释差值，再讨论体积。',route:'#read/6/terrain',link:'怎样把地形存进计算机？',source:'https://pubs.usgs.gov/publication/ofr20211039',sourceTitle:'真实应用：USGS 风暴后海岸影像处理工作流'},
{title:'把实物带进虚拟场景',tag:'创作与表达',question:'自己拍的石头或雕塑，能成为虚拟展览中的展品吗？',input:'围绕物体拍摄照片，恢复外形，再把照片的颜色贴到表面上。',output:'可展示的数字展品、可旋转的观察视图，以及描述数据缺口的说明。',meaning:'贴上颜色叫“纹理映射”，好比给白色模型穿上来自照片的外衣。外观看着逼真，仍需另行检查尺寸是否可信。',first:'选择不透明、有细节的静止物体；想一想纯白、透明或反光的物体为什么更难处理。',route:'#demo/matching',link:'先体验：照片间的对应搜索'}
];
const steps=[
['照片','把同一个对象，从不同位置看几遍。','拍摄位置发生变化，同一个角点在照片中的位置也会变化。这种变化提供了恢复空间形状的线索。只在原地转动相机，不等于获得合适的测量基线——基线就是两个拍摄位置之间的连线。'],
['空间点','找出共同出现的角点，把它们放回空间。','同名点指同一个实物点在不同照片里的位置。结合相机位置与朝向，可以估计点的三维坐标。许多这样的点放在一起，叫“点云”：它像一团描出物体轮廓的小点。'],
['表面模型','用小面片表达连续的外形。','把空间点所描述的表面用许多小三角形连接起来，得到三角网格。再将照片的颜色映射上去，就更容易辨认物体。这一步并不能保证填补被遮挡区域的真实形状。'],
['量测结果','把“看起来像”变成“有依据地量”。','模型必须获得真实尺度，才能把模型中的距离换算成米。之后还要用未参与标定的长度或检查点验证结果，并说明误差和适用范围。']
];
const topics=[
{id:'possibilities',title:'先看看，你能用它做什么',q:'学完这门课，你希望留下哪一种作品？',body:['摄影测量，是利用照片等影像获取物体形状、位置和大小的方法。你不必一开始就懂复杂公式：先从一个想解决的问题出发，再逐步学会如何拍、如何算、如何检查。','下面四个方向共用一条主线：用多个视角建立空间关系，把影像变成可以观察、量测和解释的成果。本科入门的目标是完成小规模、可验证的作品，理解更大应用背后的方法。']},
{id:'journey',title:'四步，看见照片变成成果',q:'电脑究竟怎样从平面的照片中“找回”立体世界？',body:['试着切换下面的四个阶段。这里展示的是教学示意，不是在浏览器中实时重建真实建筑。你要观察的是每一步增加了什么信息、又留下了什么问题。']},
{id:'first-measurement',title:'第一次动手：给模型一把尺',q:'模型有形状了，为什么还不能立刻说这栋楼有多高？',body:['把一个模型整体放大两倍，再把相机与物体之间的距离也放大两倍，可以产生相同的成像几何关系。因此，仅凭没有尺度参照的影像恢复出的模型，通常不能直接读出以米为单位的大小。','下面假设模型中“参照边”长 2 个模型单位，建筑高 6 个模型单位，二者比例为 3。用一段实际测量的参照长度，就能把模型单位换算成米。这是理解尺度的简化体验；真实建模还要处理相机、匹配、遮挡和误差。']},
{id:'your-project',title:'把兴趣变成你的学期作品',q:'期末，怎样证明自己真的学会了？',body:['建议作品：为一件身边的物体制作带尺度、可检查的三维记录。可以选校园雕塑、建筑局部或普通摆件；先做好小对象，再尝试更大的场景。没有无人机，也可以从地面照片和课程提供的数据开始。','交付物包括原始照片与拍摄说明、可查看的模型或空间点、带单位的尺寸表、独立检查结果，以及一次失败尝试的分析。失败记录也有价值：它能说明你理解了方法的条件。']},
{id:'start',title:'带着一个问题，开始学习',q:'现在不会编程，也不熟悉空间几何，可以开始吗？',body:['可以。预备章会补上坐标、矩阵和误差的直觉；交互实验先让你观察变化，分步算例再把变化写成公式，实践任务最后把知识串起来。你需要的是愿意观察、提出问题、记录证据。','第一次课之后，花十分钟做一次“拍摄侦察”：选一个静止对象，想出至少三个拍摄位置，指出各张照片里能共同看到的一个细节，写下你最想量的一个尺寸。暂时不用求解，也不用买设备。']}
];
COURSE.chapters.unshift({id:11,motivation:true,title:'为什么学摄影测量',en:'MOTIVATION · YOUR FIRST SPATIAL PROJECT',desc:'把身边的世界，变成可以量测的三维作品。先看见可能，再找到自己的问题。',goal:'说出一个你想完成的项目；解释照片、三维模型与可靠量测的区别；带着问题进入后续学习。',topics});
const quizStart=Math.max(...QUIZZES.map(q=>q.id))+1;
[
['一个三维模型看起来很逼真，能直接认为尺寸准确吗？',['能，颜色越清晰越准确','还不能，需要尺度依据和独立检查','只要模型能旋转就可以'],1,'逼真主要描述外观。要报告可信尺寸，还需尺度参照、合适的几何关系和没有参与拟合的检查数据。'],
['模型参照边长 2 单位、物体高 6 单位，实测参照边长 4 米，物体高度估计是多少？',['3 米','8 米','12 米'],2,'每个模型单位对应 4÷2=2 米，高度为 6×2=12 米。这是按统一尺度换算的示例，实际精度仍需检查。'],
['适合第一次尝试的学习目标是？',['独立完成整个城市的高精度测绘','重建一个静止小物体，并检查一项尺寸','只追求模型颜色好看'],1,'小而完整的项目能让你经历采集、建模、量测和验证的全过程，为更大任务建立基础。']
].forEach((q,i)=>QUIZZES.push({id:quizStart+i,chapter:11,q:q[0],options:q[1],correct:q[2],explanation:q[3]}));
const get=(key,fallback)=>{try{return JSON.parse(localStorage.getItem('photo-course:motivation:'+key))??fallback}catch{return fallback}};
const set=(key,value)=>{try{localStorage.setItem('photo-course:motivation:'+key,JSON.stringify(value))}catch{}};
function building(stage){let points='';for(let x=0;x<9;x++)for(let y=0;y<7;y++)points+=`<circle cx="${138+x*17}" cy="${118+y*16+x*4}" r="2.6" fill="#c5a2fa"/><circle cx="${274+x*13}" cy="${150+y*16-x*5}" r="2.6" fill="#8b66cd"/>`;return `<svg viewBox="0 0 520 350" role="img" aria-label="${steps[stage][0]}阶段的建筑教学示意"><path d="M48 284L253 344 477 254 266 205Z" fill="#f1eafa"/><g fill="none" stroke="#cdbbdf"><path d="M50 310L445 150M83 326L479 165M107 204L427 300M150 190L468 286"/></g>${stage===1?points:`<path d="M138 112L274 150 378 110V232L274 279 138 238Z" fill="#d8c3ee" stroke="#8961b1" stroke-width="2"/><path d="M138 112L240 77 378 110 274 150Z" fill="#f4edfb" stroke="#8961b1" stroke-width="2"/><path d="M274 150V279" stroke="#8961b1" stroke-width="2"/>${stage===2?'<path d="M138 112L274 279 378 110M138 238L274 150 378 232M240 77L274 150" fill="none" stroke="#ac82cf"/>':''}${stage===0?'<path d="M58 91L138 112M58 91L274 279M449 75L274 279M449 75L378 110" stroke="#ab86ca" stroke-dasharray="5 5"/><g fill="#7950a5"><rect x="26" y="58" width="60" height="38" rx="8"/><rect x="422" y="42" width="60" height="38" rx="8"/></g><g fill="#fff"><circle cx="56" cy="77" r="10"/><circle cx="452" cy="61" r="10"/></g>':''}${stage===3?'<path d="M408 110V232M399 110H417M399 232H417M138 258L274 300M138 249V266M274 292V309" stroke="#633c93" stroke-width="3"/><text x="421" y="177" fill="#633c93" font-size="18">高度</text><text x="141" y="311" fill="#633c93" font-size="18">已知参照边</text>':''}`}<text x="24" y="30" fill="#633c93" font-size="16">${String(stage+1).padStart(2,'0')} / ${steps[stage][0]}</text></svg>`;}
function caseCard(c,i,print){return `<article class="mot-case"><span class="mot-tag">${c.tag}</span><h3>${c.title}</h3><p class="mot-case-question">${c.question}</p><dl><dt>你会拿到什么</dt><dd>${c.output}</dd><dt>从什么开始</dt><dd>${c.input}</dd></dl><p>${c.meaning}</p><p class="mot-first"><b>今天就能试：</b>${c.first}</p>${print?'':`<button type="button" data-interest="${i}" aria-pressed="false">我想做这个项目</button><a class="mot-link" href="${c.route}">${c.link} →</a>`}${c.source?`<a class="mot-source" href="${c.source}" target="_blank" rel="noopener">${c.sourceTitle} ↗</a>`:''}</article>`;}
function stagePanel(i){return `${building(i)}<div><span class="mot-tag">STEP ${i+1}</span><h3>${steps[i][1]}</h3><p>${steps[i][2]}</p><p class="small muted">教学示意 · 非实测建筑成果</p></div>`;}
function discussion(q,a,print){return `<div class="discussion"><b>先想一想</b><p>${q}</p>${print?`<div class="print-answer"><p>${a}</p></div>`:`<details><summary>展开参考解释</summary><p>${a}</p></details>`}</div>`;}
window.motivationExtra=(id,print)=>{
if(id==='possibilities')return `<div class="mot-cases">${cases.map((c,i)=>caseCard(c,i,print)).join('')}</div>${print?'':'<p class="mot-saved" id="mot-interest-status" role="status">选一个你最想尝试的方向，后面可以随时修改。选择只保存在本浏览器。</p>'}`;
if(id==='journey')return print?steps.map((_,i)=>`<div class="mot-stage mot-stage-print">${stagePanel(i)}</div>`).join('')+discussion('如果只在一个位置拍很多张照片，和绕着物体拍一圈一样吗？','不一样。不同拍摄位置提供了不同的空间观察方向；完全相同的照片主要重复已有信息。还需要适当共同覆盖、清晰细节和可用的成像几何。',true):`<div class="mot-story"><div class="mot-stage-buttons" role="group" aria-label="选择成果生成阶段">${steps.map((s,i)=>`<button type="button" data-stage="${i}" aria-pressed="${i===0}"><small>0${i+1}</small>${s[0]}</button>`).join('')}</div><div class="mot-stage" id="mot-stage" aria-live="polite">${stagePanel(0)}</div></div>${discussion('如果只在一个位置拍很多张照片，和绕着物体拍一圈一样吗？','不一样。改变拍摄位置可以提供不同的空间观察方向；多张完全相同的照片主要重复了已有信息。还需要适当的共同覆盖、清晰的细节和可用的成像几何。',false)}`;
if(id==='first-measurement')return `<div class="mot-scale"><div>${building(3)}</div><div><h3>给定参照长度，看看高度怎样改变</h3>${print?'<p>例：参照边实长为 4 米。</p>':'<label for="mot-scale">参照边的实测长度（米）</label><input id="mot-scale" type="range" min="1" max="8" step="0.5" value="4"><p class="small">1 米 ← 拖动参照长度 → 8 米</p>'}<div id="mot-scale-result" ${print?'':'role="status"'}><p>参照边：<b>4 米</b>　模型高度：<strong>12 米</strong></p><p>6 ÷ 2 × 4 = 12 米</p></div><p>这里改变的是对同一个模型所给的尺度依据，并不是在真实世界中把建筑拉高。</p></div></div>${discussion('若参照边长度被高估了 10%，换算出的建筑高度会怎样？怎样发现这种问题？','在这个统一尺度示例中，高度也会被高估 10%。可以另外测一段没有用于标定的长度作独立检查。把参与标定的同一条边再量一遍，不能代替独立验证。',print)}${print?'':'<a class="button" href="#demo/stereo">继续探索：两张照片怎样提供深度？ →</a>'}`;
if(id==='your-project')return `<ol class="mot-roadmap">${[
['先会观察','看清同一细节在不同照片中的变化。','预备章与第 1–3 章','#read/0'],
['再会解释','理解从照片到相机位置、再到空间点的几何关系。','第 4–5 章 · 交会与平差','#walk/intersection'],
['接着做成果','用空间点表达地表，理解匹配、重采样和正射影像。','第 6–7 章与综合补充','#read/6'],
['最后用证据说话','交出一份结果，也解释哪里可信、哪里还需要补拍或检查。','实验实践 · 项目与报告','#labs']
].map(([title,body,caption,href])=>`<li><h3>${title}</h3><p>${body}</p><a href="${href}">${caption} →</a></li>`).join('')}</ol>${discussion('两组同学，一组模型很漂亮但没有检查，另一组模型有缺口却清楚说明了误差。你更愿意用哪一组结果来决定尺寸？','应看是否有适合任务的尺度和独立检查证据，而不能只看外观。清楚标出缺口和误差的结果更便于判断能否使用；若关键量测区域仍缺失，依然需要补充数据。',print)}`;
if(id==='start')return `<div class="mot-finish"><h3>你的第一个问题，值得被量出来。</h3><p>“它有多高？”“这里变化了多少？”“我能把它保存下来吗？”<br>选一个问题，让后面的每个公式都有一个去处。</p>${print?'':`<p id="mot-chosen"></p><div class="actions"><a class="button primary" href="#read/0">带着问题出发 →</a><a class="button" href="#quiz/11">用 3 道题检验新直觉</a></div>`}</div><p class="small muted">网页原创导学 · 图示与数值为教学示例；应用参考链接见对应项目卡片。原 PPT 页码保持不变。</p>`;
return '';
};
window.initMotivation=()=>{
const interestButtons=[...document.querySelectorAll('[data-interest]')];
function showInterest(i){interestButtons.forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.interest)===i));const selected=cases[i];const status=document.querySelector('#mot-interest-status'),chosen=document.querySelector('#mot-chosen');if(status&&selected)status.textContent='我的项目方向：'+selected.title+'。已保存在本浏览器，可随时更换。';if(chosen&&selected)chosen.textContent='你选择的方向：'+selected.title;}
const saved=get('interest',-1);showInterest(Number.isInteger(saved)?saved:-1);interestButtons.forEach(b=>b.addEventListener('click',()=>{let i=Number(b.dataset.interest);set('interest',i);showInterest(i)}));
const stageButtons=[...document.querySelectorAll('[data-stage]')];function showStage(i){if(!stageButtons.length)return;document.querySelector('#mot-stage').innerHTML=stagePanel(i);stageButtons.forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.stage)===i));}
const s=get('stage',0);showStage(Number.isInteger(s)&&s>=0&&s<4?s:0);stageButtons.forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.stage);showStage(i);set('stage',i)}));
const input=document.querySelector('#mot-scale');if(input){let n=get('scale',4);input.value=Number.isFinite(n)&&n>=1&&n<=8?n:4;const update=()=>{const v=Number(input.value);document.querySelector('#mot-scale-result').innerHTML=`<p>参照边：<b>${v} 米</b>　模型高度：<strong>${3*v} 米</strong></p><p>6 ÷ 2 × ${v} = ${3*v} 米</p>`;};update();input.addEventListener('input',()=>{update();set('scale',Number(input.value))});}
};
})();

