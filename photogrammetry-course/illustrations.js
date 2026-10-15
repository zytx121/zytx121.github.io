/* GPT Image conceptual illustrations. Actual project evidence stays in scene-process-data. */
const COURSE_ILLUSTRATIONS={
 mission:{title:'从一组照片，到自己的校园作品',alt:'学生协作观察校园模型，照片、点云与模型依次呈现的学习情境插画',look:'先看照片，再看点云和模型：每一步都在增加可以解释的空间信息。',points:['选一个身边的小目标：一段立面、一处花坛或一个路口。','用多个位置的照片恢复形状，再用可靠参照赋予尺度。','交付作品时，把模型、数据来源和检查结果一起交出来。']},
 capture:{title:'同一处地物，要被多次看见',alt:'无人机在不同位置拍摄校园，地面覆盖区域在航向和相邻航带间重叠',look:'沿航线看相邻覆盖，再横向看两条航带：共同区域把照片连成网络。',points:['重叠让相邻照片拥有共同内容，便于找同名点。','改变拍摄位置提供基线；只在原地转镜头通常不够。','清晰度、遮挡和视角同样重要，不能只追求照片数量。']},
 projection:{title:'照片上的大小，同时受距离影响',alt:'相机拍摄远近两棵树，照片中近树较大、远树较小的透视情境',look:'比较近树和远树在照片中的大小：只看像长，还不能判断真实高度。',points:['在真实尺寸相同的条件下，物体越近，通常成像越大。','一个像点对应一条视线；沿线不同距离也能投到同一位置。','原始照片有透视效应，不能直接作为处处等比例的地图。']},
 stereo:{title:'两条视线，约束同一个空间点',alt:'两台分开的相机观察同一建筑屋顶角点，下方照片展示不同的像点位置',look:'先找到两个橙色像点，再沿上方两条视线找到共同的屋角。',points:['先认出同一个物点在两张照片中的位置。','已知相机几何后，将两个像点还原为两条空间视线。','理想视线相交确定物点；有误差时需用多观测求最佳估计。']},
 matching:{title:'认的是同一个位置，不是相似的颜色',alt:'两张不同视角的校园插图中，同一屋脊交汇点用橙色连线对应',look:'只跟踪橙色屋脊交汇点：换了视角，照片位置变了，物理位置没有变。',points:['同名点是同一个物理位置在不同照片中的成像。','重复窗户、相似车位和相同颜色都可能造成误配。','外观匹配只给候选，还要用相机几何检查是否合理。']},
 at:{title:'空三：让照片、相机和地面点一起对上',alt:'多台相机通过观测射线共同观察建筑特征点，外围设有测量标志的空三概念图',look:'先看一个点被哪些相机共同观测，再看这些点怎样把整组照片连接起来。',points:['初始化先估计相机位置、朝向和连接点三维坐标。','光束法平差联合调整未知量，让投影更贴近照片观测。','控制资料提供外部约束；独立检查资料用来验证精度。']},
 surface:{title:'点、面和颜色，提供不同的信息',alt:'同一房屋从左至右以离散点云、三角网表面和带颜色纹理的模型表示',look:'从左到右看：离散的点 → 三角形表面 → 表面颜色。',points:['点云记录一批空间位置，点之间并不自动构成表面。','网格用三角形连接表面；生成时仍须处理孔洞和噪声。','纹理提供颜色细节，看起来逼真不等于几何精度可靠。']},
 ortho:{title:'把照片，变成适合地图表达的影像',alt:'左侧为校园透视斜视图，右侧为同类布局的俯视表达，对比侧墙可见性与道路方向',look:'比较建筑侧墙和道路方向；右侧表达弱化透视，帮助理解地图式观察。',points:['原始影像中的位置受到相机姿态和地形起伏影响。','正射纠正利用定向与高程信息，为地图网格查找影像颜色。','俯视拍摄不等于完成正射纠正；真实 DOM 还需检查坐标、遮挡和精度。']}
};
const COURSE_ILLUSTRATION_TOPICS={
 '11/possibilities':'mission','1/why':'mission','1/products':'surface',
 '2/acquisition':'capture','12/capture':'capture','2/projection':'projection',
 '3/stereo':'stereo','4/intersection':'stereo','4/bundle':'at','5/regional':'at',
 '6/grid-tin':'surface','7/features':'matching','10/dom':'ortho','10/pipeline':'surface'
};
function courseIllustration(key,print=false,points=true){const v=COURSE_ILLUSTRATIONS[key];if(!v)return '';return `<div class="visual-lesson"><figure class="course-illustration"><div class="visual-heading"><span>先看图，建立直觉</span><b>${v.title}</b></div><a href="illustration-${key}.png" ${print?'':'target="_blank" rel="noopener"'} aria-label="打开大图：${v.title}"><img src="illustration-${key}.png" width="1536" height="1024" loading="${print?'eager':'lazy'}" decoding="async" alt="${v.alt}"></a><figcaption><b>看图提示</b> ${v.look}<small>GPT Image 教学情境示意 · 非实测数据，位置、比例与射线不用于计算。${key==='capture'?'图中机型为示意，操作以本课设备手册为准。':''}${key==='ortho'?'左右为概念对照，不是同一影像的实际纠正结果。':''}</small></figcaption></figure>${points?`<ol class="visual-takeaways" aria-label="三个阅读要点">${v.points.map((p,i)=>`<li><span>${i+1}</span><p>${p}</p></li>`).join('')}</ol>`:''}</div>`;}
function illustratedTopicBody(c,t,print,escape){const key=COURSE_ILLUSTRATION_TOPICS[`${c.id}/${t.id}`],body=t.body.map(p=>`<p>${escape(p)}</p>`).join('');if(!key)return body;return courseIllustration(key,print)+(print?`<div class="visual-full-text">${body}</div>`:`<details class="visual-deeper"><summary>继续读：完整解释与专业术语</summary>${body}</details>`);}
