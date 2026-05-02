/* فَلَج — app.js كامل ونظيف */

// ═══════════════════════════
// القسم ١: البيانات
// ═══════════════════════════
var A = {
  user:null, role:'client', curProd:null, curChat:null, curOrdId:null,
  selRating:0, tmpImg:null, tmpRvImg:null, cancelOrdId:null, refundOrdId:null,
  pendingCO:null, filterSearch:'', filterCat:'', filterSort:'',
  co: { prod:null, qty:1, delType:'standard', delFee:15, payMethod:'card', total:0, tax:0, sub:0 },
  DEL: {
    standard:{name:'أرامكس',fee:15,days:'٣-٥ أيام'},
    express: {name:'DHL',   fee:30,days:'١-٢ يوم'},
    pickup:  {name:'استلام من المزرعة',fee:0,days:'حسب الاتفاق'}
  },
  prods:[
    {id:1,name:'تمر مجدول فاخر',price:85,cat:'تمور',farm:'مزرعة الأفلاج',farmer:'محمد المزارع',desc:'تمر مجدول طازج يُجنى يدوياً.',emoji:'🌴',badge:'عضوي',stock:150,img:null,sold:340,origin:'نخيل سكري — الأفلاج',harvest:'مارس ٢٠٢٥',reviews:[{user:'أحمد',r:5,txt:'ممتاز جداً!',date:'١٢ مارس',hidden:false,img:null},{user:'سارة',r:4,txt:'جودة عالية.',date:'٢٠ مارس',hidden:false,img:null}]},
    {id:2,name:'عسل سدر طبيعي',price:120,cat:'عسل',farm:'مزرعة الوادي',farmer:'محمد المزارع',desc:'عسل سدر نقي 100% من جبال الأفلاج.',emoji:'🍯',badge:'طبيعي',stock:40,img:null,sold:210,origin:'نحل جبلي — الأفلاج',harvest:'يناير ٢٠٢٥',reviews:[{user:'فهد',r:5,txt:'أفضل عسل!',date:'٥ أبريل',hidden:false,img:null}]},
    {id:3,name:'طماطم عضوية',price:18,cat:'خضار',farm:'بستان الخير',farmer:'خالد العمري',desc:'طماطم طازجة عضوية بدون مبيدات.',emoji:'🍅',badge:'طازج',stock:200,img:null,sold:890,origin:'السليل',harvest:'أسبوعياً',reviews:[]},
    {id:4,name:'رمان أفلاجي',price:35,cat:'فواكه',farm:'مزرعة النخيل',farmer:'خالد العمري',desc:'رمان حلو حامض من الأفلاج.',emoji:'🍎',badge:'موسمي',stock:80,img:null,sold:155,origin:'الأفلاج',harvest:'أكتوبر ٢٠٢٥',reviews:[]},
    {id:5,name:'أعشاب جبلية مجففة',price:45,cat:'أعشاب',farm:'مزرعة البادية',farmer:'سالم الغامدي',desc:'مزيج زعتر ومريمية وحبق.',emoji:'🌿',badge:'جبلي',stock:60,img:null,sold:98,origin:'جبال الأفلاج',harvest:'ربيع ٢٠٢٥',reviews:[]},
    {id:6,name:'خيار عضوي',price:12,cat:'خضار',farm:'بستان الخير',farmer:'خالد العمري',desc:'خيار طازج يومي.',emoji:'🥒',badge:'طازج',stock:0,img:null,sold:620,origin:'السليل',harvest:'يومياً',reviews:[]},
    {id:7,name:'فلفل أحمر',price:22,cat:'خضار',farm:'بستان الخير',farmer:'خالد العمري',desc:'فلفل حلو أحمر طازج.',emoji:'🌶️',badge:'طازج',stock:120,img:null,sold:340,origin:'السليل',harvest:'أسبوعياً',reviews:[]},
    {id:8,name:'تمر خلاص فاخر',price:70,cat:'تمور',farm:'مزرعة الأفلاج',farmer:'محمد المزارع',desc:'تمر خلاص من النوع الفاخر.',emoji:'🌴',badge:'فاخر',stock:5,img:null,sold:180,origin:'نخيل خلاص — الأفلاج',harvest:'سبتمبر ٢٠٢٥',reviews:[]},
  ],
  orders:[
    {id:'ORD-001',prod:'تمر مجدول فاخر',qty:2,price:200,sub:170,tax:25,dFee:15,status:'done',farmer:'محمد المزارع',client:'أحمد العميل',emoji:'🌴',img:null,date:'١ مارس ٢٠٢٥',addr:{name:'أحمد العميل',phone:'0500000001',city:'الرياض',addr:'حي النخيل',notes:''},del:{type:'standard',co:'أرامكس',days:'٣-٥ أيام',trk:'ARX-48291',status:'delivered'},pay:{m:'card',status:'paid',last4:'4242'},cancelMsg:null,refund:null},
    {id:'ORD-002',prod:'عسل سدر طبيعي',qty:1,price:153,sub:120,tax:18,dFee:15,status:'pending',farmer:'محمد المزارع',client:'سارة العميلة',emoji:'🍯',img:null,date:'١٥ مارس ٢٠٢٥',addr:{name:'سارة العميلة',phone:'0500000002',city:'جدة',addr:'حي الروضة',notes:'الطابق ٣'},del:{type:'express',co:'DHL',days:'١-٢ يوم',trk:'DHL-77391',status:'shipped'},pay:{m:'mada',status:'paid',last4:'5678'},cancelMsg:null,refund:null},
    {id:'ORD-003',prod:'طماطم عضوية',qty:5,price:108,sub:90,tax:13,dFee:15,status:'cancel',farmer:'خالد العمري',client:'أحمد العميل',emoji:'🍅',img:null,date:'٢ أبريل ٢٠٢٥',addr:{name:'أحمد العميل',phone:'0500000001',city:'الرياض',addr:'حي العليا',notes:''},del:{type:'standard',co:'أرامكس',days:'٣-٥ أيام',trk:'',status:'cancelled'},pay:{m:'card',status:'refunded',last4:'4242'},cancelMsg:'نفاذ المخزون مؤقتاً',refund:'تمت إعادة المبلغ'},
    {id:'ORD-004',prod:'رمان أفلاجي',qty:3,price:120,sub:105,tax:15,dFee:0,status:'pending',farmer:'خالد العمري',client:'فهد العميل',emoji:'🍎',img:null,date:'٢٠ أبريل ٢٠٢٥',addr:{name:'فهد العميل',phone:'0500000003',city:'الدمام',addr:'حي الفيصلية',notes:''},del:{type:'pickup',co:'استلام من المزرعة',days:'حسب الاتفاق',trk:'',status:'waiting'},pay:{m:'cod',status:'unpaid',last4:null},cancelMsg:null,refund:null},
  ],
  users:[
    {id:1,name:'أحمد العميل',email:'ahmed@test.com',role:'client',phone:'0500000001',active:true},
    {id:2,name:'محمد المزارع',email:'farmer@test.com',role:'farmer',phone:'0500000002',active:true,totalSales:353,avgRating:4.7},
    {id:3,name:'سارة العميلة',email:'sara@test.com',role:'client',phone:'0500000003',active:true},
    {id:4,name:'خالد العمري',email:'khaled@test.com',role:'farmer',phone:'0500000004',active:false,totalSales:228,avgRating:4.1},
    {id:5,name:'سالم الغامدي',email:'salem@test.com',role:'farmer',phone:'0500000005',active:true,totalSales:98,avgRating:3.9},
  ],
  convs:[
    {id:1,name:'محمد المزارع',last:'سأجهّز طلبك غداً',time:'٩:٤٥',unread:2,msgs:[{txt:'هل التمر متوفر؟',out:true,time:'٩:٣٠'},{txt:'نعم متوفر وبكميات وافرة',out:false,time:'٩:٣٢'},{txt:'ممتاز، أبي ٢ كيلو',out:true,time:'٩:٤٠'},{txt:'سأجهّز طلبك غداً',out:false,time:'٩:٤٥'}]},
    {id:2,name:'خالد العمري',last:'الطماطم وصلت طازجة؟',time:'أمس',unread:0,msgs:[{txt:'الطماطم وصلت طازجة؟',out:false,time:'أمس'},{txt:'نعم ممتازة',out:true,time:'أمس'}]},
  ],
  guides:[
    {id:1,ico:'💧',title:'الري الصحيح للنخيل',intro:'يحتاج النخل ري غزير مرتين أسبوعياً في الصيف.',pts:['تجنّب الري وقت الظهيرة','استخدم الري بالتنقيط','راقب رطوبة التربة','أضف مادة عضوية حول الجذع']},
    {id:2,ico:'🌱',title:'التسميد الموسمي',intro:'التسميد الصحيح يضاعف الإنتاج.',pts:['الأسمدة العضوية أولاً','النيتروجين في بداية الموسم','الفوسفور يطور الجذور','البوتاسيوم يحسّن الثمار']},
    {id:3,ico:'🐛',title:'مكافحة الآفات طبيعياً',intro:'طرق طبيعية فعّالة بدلاً من المبيدات.',pts:['استخدم الحشرات المفيدة','رش محلول الثوم','زرع نباتات طاردة','التفقّد اليومي الصباحي']},
    {id:4,ico:'🌾',title:'موسم الحصاد المثالي',intro:'وقت الحصاد الصحيح يضمن أعلى جودة.',pts:['الحصاد في الصباح الباكر','أدوات نظيفة ومعقّمة','التخزين الفوري في بيئة باردة','الفرز قبل التعبئة']},
  ],
  ads:[
    {id:1,txt:'🌴 عروض موسم التمر — خصم ٢٠٪ على جميع أصناف التمور!',start:'2025-03-01',end:'2026-12-31',status:'active'},
    {id:2,txt:'🍯 عسل السدر الجبلي الطبيعي — أقل من ١٠٠ عبوة!',start:'2025-04-01',end:'2026-12-31',status:'active'},
  ],
};

var SL = {pending:'قيد التنفيذ',done:'مكتمل',cancel:'ملغي'};

// ═══════════════════════════
// القسم ٢: خريطة الصفحات
// ═══════════════════════════
var PG = {
  home:'pg-home', login:'pg-login', register:'pg-register',
  products:'pg-products', detail:'pg-detail', checkout:'pg-checkout',
  success:'pg-success', orders:'pg-orders', 'order-detail':'pg-order-detail',
  messages:'pg-messages', chat:'pg-chat', guides:'pg-guides', account:'pg-account',
  'farmer-dash':'pg-farmer-dash', 'admin-dash':'pg-admin-dash',
  reports:'pg-reports', ads:'pg-ads',
};
var NA = {
  home:'na-home', products:'na-products', orders:'na-orders',
  messages:'na-messages', guides:'na-guides', account:'na-account',
  'farmer-dash':'na-farmer-dash', 'admin-dash':'na-admin-dash',
  reports:'na-reports', ads:'na-ads',
};

// ═══════════════════════════
// القسم ٣: التنقل
// ═══════════════════════════
function go(name) {
  // أخفِ كل الصفحات
  document.querySelectorAll('.pg').forEach(function(p){ p.classList.remove('active'); });
  // أظهر المطلوبة
  var pgId = PG[name];
  if (!pgId) { console.error('صفحة مفقودة:', name); return; }
  var pg = document.getElementById(pgId);
  if (!pg) { console.error('div مفقود:', pgId); return; }
  pg.classList.add('active');
  // حدّث القائمة
  document.querySelectorAll('.nav-a').forEach(function(n){ n.classList.remove('active'); });
  var nb = NA[name] ? document.getElementById(NA[name]) : null;
  if (nb) nb.classList.add('active');
  // حمّل البيانات
  var loaders = {
    home: function(){ renderHomeProds(); renderHomeAds(); renderHomeGuides(); },
    products: renderProds,
    orders: renderOrds,
    messages: renderConvs,
    guides: renderGuides,
    account: renderAccount,
    'farmer-dash': renderFarmerDash,
    'admin-dash': renderAdminDash,
    reports: renderReports,
    ads: renderAds,
  };
  if (loaders[name]) loaders[name]();
}

// ═══════════════════════════
// القسم ٤: الدخول والتسجيل
// ═══════════════════════════
function doLogin() {
  var em = document.getElementById('l-em').value.trim();
  var pw = document.getElementById('l-pw').value;
  if (!em || !pw) { toast('يرجى تعبئة البيانات','gold'); return; }
  var role='client', name='أحمد العميل';
  if (em.indexOf('farmer')>-1) { role='farmer'; name='محمد المزارع'; }
  else if (em.indexOf('khaled')>-1) { role='farmer'; name='خالد العمري'; }
  else if (em.indexOf('salem')>-1)  { role='farmer'; name='سالم الغامدي'; }
  else if (em.indexOf('admin')>-1)  { role='admin';  name='مدير النظام'; }
  A.user = {name:name, email:em, role:role};
  afterLogin();
}

function doRegister() {
  var fn = document.getElementById('r-fn').value.trim();
  var em = document.getElementById('r-em').value.trim();
  var pw = document.getElementById('r-pw').value;
  if (!fn||!em||!pw) { toast('يرجى تعبئة الحقول المطلوبة','gold'); return; }
  var ln = document.getElementById('r-ln').value.trim();
  A.user = {name: fn+(ln?' '+ln:''), email:em, role:A.role};
  afterLogin();
}

function selRole(r) {
  A.role = r;
  document.querySelectorAll('.role-btn').forEach(function(b){ b.classList.remove('active'); });
  var rb = document.getElementById('rb-'+r);
  if (rb) rb.classList.add('active');
}

// ═══════════════════════════
// القسم ٥: إعداد الـ Nav
// ═══════════════════════════
function afterLogin() {
  var role = A.user.role;
  // أخفِ كل الخاصة
  ['na-farmer-dash','na-admin-dash','na-reports','na-ads','na-logout'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.classList.add('hidden');
  });
  // أظهر حسب الدور
  var show = {
    client: ['na-logout'],
    farmer: ['na-farmer-dash','na-logout'],
    admin:  ['na-admin-dash','na-reports','na-ads','na-logout'],
  }[role] || [];
  show.forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.remove('hidden'); });

  // أزرار الإضافة
  var apb=document.getElementById('add-prod-btn'); if(apb) apb.classList.toggle('hidden', role!=='farmer');
  var agb=document.getElementById('add-guide-btn'); if(agb) agb.classList.toggle('hidden', role!=='admin');

  // معلومات المستخدم في الـ sidebar
  var su=document.getElementById('sidebar-user'); if(su) su.classList.remove('hidden');
  var av=document.getElementById('su-av'); if(av) av.textContent=A.user.name[0];
  var sn=document.getElementById('su-name'); if(sn) sn.textContent=A.user.name;
  var sr=document.getElementById('su-role'); if(sr) sr.textContent={client:'عميل',farmer:'مزارع',admin:'أدمن'}[role]||role;

  // أخفِ أزرار الدخول في الرئيسية
  var ab=document.getElementById('auth-btns'); if(ab) ab.classList.add('hidden');

  // Pending checkout?
  if (A.pendingCO && role==='client') {
    var pid=A.pendingCO; A.pendingCO=null;
    toast('مرحباً '+A.user.name+'! 👋 سنكمل طلبك','lime');
    go('products');
    setTimeout(function(){ openProd(pid); setTimeout(goCheckout,150); },300);
  } else {
    var dest = role==='admin'?'admin-dash': role==='farmer'?'farmer-dash':'home';
    go(dest);
    toast('مرحباً '+A.user.name+'! 👋','lime');
  }
}

function doLogout() {
  A.user=null;
  // أعد الحالة الأصلية
  ['na-farmer-dash','na-admin-dash','na-reports','na-ads','na-logout'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.classList.add('hidden');
  });
  var apb=document.getElementById('add-prod-btn'); if(apb) apb.classList.add('hidden');
  var agb=document.getElementById('add-guide-btn'); if(agb) agb.classList.add('hidden');
  var su=document.getElementById('sidebar-user'); if(su) su.classList.add('hidden');
  var ab=document.getElementById('auth-btns'); if(ab) ab.classList.remove('hidden');
  go('home');
  toast('تم تسجيل الخروج','gold');
}

// ═══════════════════════════
// القسم ٦: الرئيسية
// ═══════════════════════════
function renderHomeProds() {
  var el=document.getElementById('home-prods'); if(!el) return;
  var show=A.prods.filter(function(p){return p.stock>0;}).slice(0,4);
  el.innerHTML = show.map(buildPC).join('');
}
function renderHomeAds() {
  var el=document.getElementById('home-ads'); if(!el) return;
  var today=new Date().toISOString().split('T')[0];
  var active=A.ads.filter(function(a){return a.start<=today&&a.end>=today;});
  el.innerHTML = active.map(function(a){return '<div class="ad-strip">📢 '+a.txt+'</div>';}).join('');
}
function renderHomeGuides() {
  var el=document.getElementById('home-guides'); if(!el) return;
  el.innerHTML = A.guides.slice(0,4).map(function(g){
    return '<div class="gc" onclick="go(\'guides\')"><h4>'+g.ico+' '+g.title+'</h4><p>'+g.intro+'</p></div>';
  }).join('');
}

// ═══════════════════════════
// القسم ٧: المنتجات
// ═══════════════════════════
function doFilter() {
  A.filterSearch = (document.getElementById('srch')||{}).value||'';
  A.filterCat    = (document.getElementById('f-cat')||{}).value||'';
  A.filterSort   = (document.getElementById('f-sort')||{}).value||'';
  renderProds();
}

function renderProds() {
  var el=document.getElementById('prods-grid'); if(!el) return;
  var list = A.prods.slice();
  var srch = A.filterSearch.toLowerCase();
  if (srch) list=list.filter(function(p){return p.name.toLowerCase().indexOf(srch)>-1||p.farm.toLowerCase().indexOf(srch)>-1||p.farmer.toLowerCase().indexOf(srch)>-1;});
  if (A.filterCat) list=list.filter(function(p){return p.cat===A.filterCat;});
  if (A.filterSort==='pa')  list.sort(function(a,b){return a.price-b.price;});
  if (A.filterSort==='pd')  list.sort(function(a,b){return b.price-a.price;});
  if (A.filterSort==='pop') list.sort(function(a,b){return b.sold-a.sold;});
  if (A.filterSort==='rat') list.sort(function(a,b){return avgR(b)-avgR(a);});
  if (!list.length) { el.innerHTML=emptyB('🌾','لا توجد منتجات','جرّب بحثاً مختلفاً'); return; }
  el.innerHTML = list.map(buildPC).join('');
}

function buildPC(p) {
  var out=p.stock===0, low=p.stock>0&&p.stock<=10;
  var avg=avgR(p);
  var stars=avg>0?starsSmall(avg):'';
  return '<div class="pc" onclick="openProd('+p.id+')" style="'+(out?'opacity:.75':'')+'">'
    +'<div class="pc-img">'+(out?'<div class="out-badge">نفد المخزون</div>':'')
    +(p.img?'<img src="'+p.img+'" alt="'+p.name+'">':p.emoji)+'</div>'
    +'<div class="pc-body">'
    +'<div class="pc-name">'+p.name+'</div>'
    +'<div class="pc-farm">'+p.farm+' · '+p.farmer+'</div>'
    +(stars?'<div style="margin-bottom:5px">'+stars+'</div>':'')
    +'<div class="pc-foot">'
    +'<div class="pc-price">'+p.price+' <small>ريال/كغ</small></div>'
    +'<div style="display:flex;gap:5px;align-items:center">'
    +'<span class="badge lime">'+p.badge+'</span>'
    +(low&&!out?'<span class="badge gold">'+p.stock+'</span>':'')
    +(A.user&&(A.user.role==='admin')&&!out?'<button class="btn-sm r" onclick="event.stopPropagation();delProd('+p.id+')" style="font-size:10px;padding:3px 8px">حذف</button>':'')
    +'</div></div>'
    +(out?'<div style="font-size:11px;color:#f09070;margin-top:5px;font-weight:700">❌ غير متوفر</div>':'')
    +'</div></div>';
}

// ═══════════════════════════
// القسم ٨: تفاصيل المنتج
// ═══════════════════════════
function openProd(id) {
  var p=A.prods.find(function(x){return x.id===id;});
  if(!p) return;
  A.curProd=p; A.selRating=0;
  // الصورة
  var di=document.getElementById('d-img');
  di.innerHTML=p.img?'<img src="'+p.img+'" alt="'+p.name+'">':p.emoji;
  // الأزرار
  var da=document.getElementById('d-acts');
  var canOrder=(A.user&&A.user.role==='client')||!A.user;
  if(canOrder&&p.stock===0) {
    da.innerHTML='<button class="btn-pri full" disabled style="opacity:.5;cursor:not-allowed">❌ نفد المخزون</button><button class="btn-out full" onclick="startChat()">💬 تواصل مع المزارع</button>';
  } else if(canOrder) {
    da.innerHTML='<button class="btn-pri full" onclick="goCheckout()">🛒 طلب المنتج</button><button class="btn-out full" onclick="startChat()">💬 تواصل مع المزارع</button>';
  } else {
    da.innerHTML='<button class="btn-out full" onclick="startChat()">💬 تواصل مع المزارع</button>';
  }
  // البيانات
  document.getElementById('d-name').textContent=p.name;
  document.getElementById('d-farm').textContent=p.farm+' · '+p.farmer;
  document.getElementById('d-price').textContent=p.price+' ريال/كغ';
  // المخزون
  var stEl=document.getElementById('d-stock');
  if(p.stock===0){stEl.textContent='❌ نفد المخزون';stEl.className='stock-badge stock-ou';}
  else if(p.stock<=10){stEl.textContent='⚠️ متبقي '+p.stock;stEl.className='stock-badge stock-lo';}
  else{stEl.textContent='✓ متوفر ('+p.stock+' كغ)';stEl.className='stock-badge stock-av';}
  // التقييم
  var avg=avgR(p), rEl=document.getElementById('d-rating');
  rEl.innerHTML=avg>0?'<div class="stars-sm">'+starsFull(avg)+'<span class="rn">('+p.reviews.filter(function(r){return !r.hidden;}).length+' تقييم)</span></div>':'<span style="font-size:12px;color:rgba(255,255,255,.28)">لا يوجد تقييمات بعد</span>';
  // الشارات
  document.getElementById('d-badges').innerHTML='<span class="badge lime">'+p.badge+'</span><span class="badge gold">'+p.cat+'</span>'+(p.origin?'<span class="badge mu">🌍 '+p.origin+'</span>':'')+(!A.user||A.user.role!=='client'?'<span class="badge mu">مخزون: '+p.stock+'</span>':'');
  document.getElementById('d-desc').textContent=p.desc;
  // الميتا
  var m='';
  if(p.cat)     m+='<div class="meta-it"><span class="meta-k">نوع المحصول</span><span class="meta-v">'+p.cat+'</span></div>';
  if(p.origin)  m+='<div class="meta-it"><span class="meta-k">المصدر</span><span class="meta-v">'+p.origin+'</span></div>';
  if(p.harvest) m+='<div class="meta-it"><span class="meta-k">تاريخ الحصاد</span><span class="meta-v">'+p.harvest+'</span></div>';
  m+='<div class="meta-it"><span class="meta-k">المبيعات</span><span class="meta-v">'+p.sold+' وحدة</span></div>';
  document.getElementById('d-meta').innerHTML=m;
  // التقييم
  var rs=document.getElementById('rating-sec');
  rs.classList.toggle('hidden', !(A.user&&A.user.role==='client'));
  resetStars();
  renderRevs(p);
  go('detail');
}

// ═══════════════════════════
// القسم ٩: إضافة/تعديل منتج
// ═══════════════════════════
function openAddProduct(eid) {
  var editing=eid!==null&&eid!==undefined;
  document.getElementById('m-prod-title').textContent=editing?'تعديل المنتج':'إضافة منتج جديد';
  document.getElementById('p-eid').value=eid||'';
  if(editing){
    var p=A.prods.find(function(x){return x.id===eid||x.id==eid;});
    if(!p)return;
    document.getElementById('p-name').value=p.name;
    document.getElementById('p-price').value=p.price;
    document.getElementById('p-cat').value=p.cat;
    document.getElementById('p-stock').value=p.stock;
    document.getElementById('p-emoji').value=p.emoji;
    document.getElementById('p-origin').value=p.origin||'';
    document.getElementById('p-harvest').value=p.harvest||'';
    document.getElementById('p-desc').value=p.desc;
    if(p.img){var z=document.getElementById('photo-up');z.innerHTML='<input type="file" id="p-photo" accept="image/*" style="display:none" onchange="prevPhoto(this)"><img src="'+p.img+'" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r)">';z.onclick=function(){document.getElementById('p-photo').click();};A.tmpImg=p.img;}
    else resetPhotoZone();
  } else {
    ['p-name','p-price','p-stock','p-emoji','p-origin','p-harvest','p-desc'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
    resetPhotoZone();
  }
  showM('m-product');
}

function saveProduct() {
  var name=document.getElementById('p-name').value.trim();
  var price=document.getElementById('p-price').value;
  if(!name||!price){toast('الاسم والسعر مطلوبان','gold');return;}
  var eid=document.getElementById('p-eid').value;
  if(eid){
    var p=A.prods.find(function(x){return x.id==eid;});
    if(!p)return;
    p.name=name; p.price=Number(price);
    p.cat=document.getElementById('p-cat').value;
    p.stock=Number(document.getElementById('p-stock').value)||p.stock;
    p.emoji=document.getElementById('p-emoji').value||p.emoji;
    p.origin=document.getElementById('p-origin').value.trim();
    p.harvest=document.getElementById('p-harvest').value.trim();
    p.desc=document.getElementById('p-desc').value.trim()||p.desc;
    if(A.tmpImg&&A.tmpImg!==p.img)p.img=A.tmpImg;
    toast('✓ تم تحديث المنتج','lime');
  } else {
    A.prods.unshift({
      id:Date.now(), name:name, price:Number(price),
      cat:document.getElementById('p-cat').value,
      farm:(A.user?A.user.name:'مزارع')+' للزراعة',
      farmer:A.user?A.user.name:'مزارع',
      desc:document.getElementById('p-desc').value.trim()||'منتج طازج',
      emoji:document.getElementById('p-emoji').value||'🌾',
      stock:Number(document.getElementById('p-stock').value)||100,
      badge:'جديد', img:A.tmpImg||null, sold:0,
      origin:document.getElementById('p-origin').value.trim(),
      harvest:document.getElementById('p-harvest').value.trim(),
      reviews:[]
    });
    toast('✓ تمت إضافة المنتج!','lime');
  }
  A.tmpImg=null; closeM('m-product'); renderProds();
  if(A.user&&A.user.role==='farmer')renderFarmerDash();
  if(A.user&&A.user.role==='admin')renderAdminDash();
}

function delProd(id) {
  if(!confirm('حذف هذا المنتج؟'))return;
  A.prods=A.prods.filter(function(p){return p.id!==id;});
  renderProds(); if(A.user&&A.user.role==='admin')renderAdminDash();
  toast('تم الحذف','red');
}

// ═══════════════════════════
// القسم ١٠: رفع الصور
// ═══════════════════════════
function prevPhoto(input) {
  if(!input.files||!input.files[0])return;
  var reader=new FileReader();
  reader.onload=function(e){
    A.tmpImg=e.target.result;
    var z=document.getElementById('photo-up');
    z.innerHTML='<input type="file" id="p-photo" accept="image/*" style="display:none" onchange="prevPhoto(this)"><img src="'+e.target.result+'" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r)">';
    z.onclick=function(){document.getElementById('p-photo').click();};
  };
  reader.readAsDataURL(input.files[0]);
}
function resetPhotoZone(){
  A.tmpImg=null;
  var z=document.getElementById('photo-up');
  if(!z)return;
  z.innerHTML='<input type="file" id="p-photo" accept="image/*" style="display:none" onchange="prevPhoto(this)"><div id="photo-inner">📷 <span>اضغط لإضافة صورة (اختياري)</span></div>';
  z.onclick=function(){document.getElementById('p-photo').click();};
}
function previewRvPhoto(input){
  if(!input.files||!input.files[0])return;
  var reader=new FileReader();
  reader.onload=function(e){
    A.tmpRvImg=e.target.result;
    var n=document.getElementById('rv-photo-name'); if(n)n.textContent='✓ صورة مختارة';
  };
  reader.readAsDataURL(input.files[0]);
}

// ═══════════════════════════
// القسم ١١: التقييم
// ═══════════════════════════
function setStar(v){
  A.selRating=v;
  document.querySelectorAll('#stars-in .star').forEach(function(s,i){s.classList.toggle('on',i<v);});
  var labels=['','ضعيف','مقبول','جيد','جيد جداً','ممتاز!'];
  var l=document.getElementById('star-lbl'); if(l)l.textContent=labels[v]||'';
}
function resetStars(){
  A.selRating=0; A.tmpRvImg=null;
  document.querySelectorAll('#stars-in .star').forEach(function(s){s.classList.remove('on');});
  var l=document.getElementById('star-lbl'); if(l)l.textContent='اختر تقييمك';
  var n=document.getElementById('rv-photo-name'); if(n)n.textContent='';
}
function submitReview(){
  if(!A.selRating){toast('اختر عدد النجوم','gold');return;}
  var p=A.curProd;
  p.reviews.push({user:A.user.name,r:A.selRating,txt:document.getElementById('rv-txt').value.trim()||'تقييم جيد',date:'الآن',hidden:false,img:A.tmpRvImg||null});
  var avg=avgR(p);
  var rEl=document.getElementById('d-rating');
  if(rEl)rEl.innerHTML='<div class="stars-sm">'+starsFull(avg)+'<span class="rn">('+p.reviews.filter(function(r){return !r.hidden;}).length+' تقييم)</span></div>';
  document.getElementById('rv-txt').value=''; resetStars(); renderRevs(p);
  toast('✓ تم إرسال تقييمك!','lime');
}
function renderRevs(p){
  var el=document.getElementById('reviews'); if(!el)return;
  var vis=p.reviews.filter(function(r){return !r.hidden;});
  if(!vis.length){el.innerHTML='<div style="font-size:13px;color:rgba(255,255,255,.28);padding:10px 0">لا توجد تعليقات بعد — كن أول من يقيّم!</div>';return;}
  var isAdmin=A.user&&A.user.role==='admin';
  el.innerHTML=vis.map(function(rv){
    var ri=p.reviews.indexOf(rv);
    return '<div class="rv-card">'
      +'<div class="rv-head"><span class="rv-user">'+rv.user+'</span>'
      +'<div style="display:flex;align-items:center;gap:7px"><div class="stars-sm">'+starsFull(rv.r)+'</div>'
      +(isAdmin?'<button class="btn-sm gold" style="font-size:10px;padding:2px 7px" onclick="hideRv('+p.id+','+ri+')">إخفاء</button><button class="btn-sm r" style="font-size:10px;padding:2px 7px" onclick="delRv('+p.id+','+ri+')">حذف</button>':'')
      +'</div></div>'
      +'<div class="rv-text">'+rv.txt+'</div>'
      +(rv.img?'<img src="'+rv.img+'" class="rv-img" onclick="window.open(\''+rv.img+'\')">':'')
      +'<div class="rv-date">'+rv.date+'</div></div>';
  }).join('');
}
function hideRv(pid,idx){var p=A.prods.find(function(x){return x.id===pid;});if(p&&p.reviews[idx]){p.reviews[idx].hidden=true;renderRevs(p);toast('تم إخفاء التعليق','gold');}}
function delRv(pid,idx){if(!confirm('حذف التعليق؟'))return;var p=A.prods.find(function(x){return x.id===pid;});if(p){p.reviews.splice(idx,1);renderRevs(p);toast('تم حذف التعليق','red');}}
function avgR(p){var v=p.reviews.filter(function(r){return !r.hidden;});if(!v.length)return 0;return v.reduce(function(s,r){return s+r.r;},0)/v.length;}
function starsSmall(avg){if(!avg)return '';var f=Math.round(avg);return '<div class="stars-sm">'+Array.from({length:5},function(_,i){return '<span class="'+(i<f?'sf':'se')+'">★</span>';}).join('')+'</div>';}
function starsFull(avg){var f=Math.round(avg);return Array.from({length:5},function(_,i){return '<span class="'+(i<f?'sf':'se')+'">★</span>';}).join('');}

// ═══════════════════════════
// القسم ١٢: الدفع Checkout
// ═══════════════════════════
function goCheckout(){
  if(!A.user){A.pendingCO=A.curProd&&A.curProd.id;toast('يرجى تسجيل الدخول أولاً','gold');go('login');return;}
  var p=A.curProd;
  if(!p){toast('اختر منتجاً أولاً','red');return;}
  if(p.stock===0){toast('هذا المنتج نفد مخزونه','red');return;}
  A.co={prod:p,qty:1,delType:'standard',delFee:15,payMethod:'card',total:0,tax:0,sub:0};
  // ملء المنتج
  var cpEl=document.getElementById('co-prod');
  cpEl.innerHTML='<div class="co-prod-card"><div class="co-prod-ico">'+(p.img?'<img src="'+p.img+'" alt="'+p.name+'">':p.emoji)+'</div><div style="flex:1"><div style="font-size:15px;font-weight:700">'+p.name+'</div><div style="font-size:12px;color:var(--mu);margin-top:3px">'+p.farm+'</div><div style="font-size:13px;color:var(--lime);font-weight:700;margin-top:4px">'+p.price+' ريال/كغ</div></div></div><div class="qty-row"><span style="font-size:13px;color:var(--mu)">الكمية (كغ):</span><button class="qty-b" onclick="chgQty(-1)">−</button><span id="co-qty">1</span><button class="qty-b" onclick="chgQty(1)">+</button><span style="font-size:12px;color:var(--mu)">متاح: '+p.stock+' كغ</span></div>';
  document.getElementById('sh-name').value=A.user.name;
  setDel('standard'); setPay('card'); calcPrice();
  go('checkout');
}
function chgQty(d){var p=A.co.prod;A.co.qty=Math.max(1,Math.min(p.stock,A.co.qty+d));var el=document.getElementById('co-qty');if(el)el.textContent=A.co.qty;calcPrice();}
function setDel(t){
  A.co.delType=t; A.co.delFee=A.DEL[t].fee;
  ['do-std','do-exp','do-pick'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.remove('active');});
  var map={'standard':'do-std','express':'do-exp','pickup':'do-pick'};
  var el=document.getElementById(map[t]); if(el)el.classList.add('active');
  calcPrice();
}
function setPay(m){
  A.co.payMethod=m;
  ['pb-card','pb-mada','pb-stc','pb-cod'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.remove('active');});
  var map={'card':'pb-card','mada':'pb-mada','stc':'pb-stc','cod':'pb-cod'};
  var el=document.getElementById(map[m]); if(el)el.classList.add('active');
  var cf=document.getElementById('card-flds'); if(cf)cf.classList.toggle('hidden',m!=='card'&&m!=='mada');
  var sf=document.getElementById('stc-fld'); if(sf)sf.classList.toggle('hidden',m!=='stc');
  var cn=document.getElementById('cod-note'); if(cn)cn.classList.toggle('hidden',m!=='cod');
  calcPrice();
}
function calcPrice(){
  var p=A.co.prod; if(!p)return;
  var sub=p.price*A.co.qty, dFee=A.co.delFee, codFee=A.co.payMethod==='cod'?5:0;
  var tax=Math.round(sub*0.15), total=sub+dFee+codFee+tax;
  A.co.sub=sub; A.co.tax=tax; A.co.total=total;
  var el=document.getElementById('price-rows'); if(!el)return;
  var di=A.DEL[A.co.delType];
  el.innerHTML='<div class="pr"><span class="lbl">المنتج ('+A.co.qty+' كغ × '+p.price+' ر)</span><span>'+sub+' ريال</span></div>'
    +'<div class="pr"><span class="lbl">توصيل — '+di.name+'</span><span>'+(dFee===0?'<span style="color:var(--lime)">مجاناً</span>':dFee+' ريال')+'</span></div>'
    +'<div class="pr"><span class="lbl">ضريبة ١٥٪</span><span>'+tax+' ريال</span></div>'
    +(codFee?'<div class="pr"><span class="lbl">رسوم الاستلام</span><span>'+codFee+' ريال</span></div>':'')
    +'<div class="pr total"><span>المجموع</span><span>'+total+' ريال</span></div>';
}

// ═══════════════════════════
// القسم ١٣: التحقق من البطاقة
// ═══════════════════════════
function fmtCardNum(input){
  var v=input.value.replace(/\D/g,'');
  v=(v.match(/.{1,4}/g)||[]).join(' ');
  input.value=v;
  var f=v.replace(/\s/g,'')[0];
  var b=document.getElementById('cc-brand');
  if(b)b.textContent=f==='4'?'💳 Visa':f==='5'?'🔵 MC':f==='9'?'🏧 مدى':'💳';
}
function fmtCardExp(input){
  var v=input.value.replace(/\D/g,'');
  if(v.length>=2)v=v.slice(0,2)+'/'+v.slice(2);
  input.value=v;
}
function validateCard(){
  var m=A.co.payMethod;
  if(m!=='card'&&m!=='mada')return true;
  var num=(document.getElementById('cc-num')||{}).value||'';
  var name=(document.getElementById('cc-name')||{}).value||'';
  var exp=(document.getElementById('cc-exp')||{}).value||'';
  var cvv=(document.getElementById('cc-cvv')||{}).value||'';
  if(num.replace(/\s/g,'').length!==16){toast('رقم البطاقة ١٦ رقماً','red');return false;}
  if(!name.trim()){toast('أدخل اسم حامل البطاقة','red');return false;}
  if(!exp.match(/^\d{2}\/\d{2}$/)){toast('تاريخ الانتهاء MM/YY','red');return false;}
  var mm=parseInt(exp.split('/')[0]), yy=parseInt(exp.split('/')[1]);
  if(new Date(2000+yy,mm-1)<new Date()){toast('البطاقة منتهية الصلاحية','red');return false;}
  if(cvv.length<3){toast('CVV ٣ أرقام على الأقل','red');return false;}
  return true;
}

// ═══════════════════════════
// القسم ١٤: تأكيد الطلب
// ═══════════════════════════
function confirmOrder(){
  var nm=(document.getElementById('sh-name')||{}).value||'';
  var ph=(document.getElementById('sh-phone')||{}).value||'';
  var ci=(document.getElementById('sh-city')||{}).value||'';
  var ad=(document.getElementById('sh-addr')||{}).value||'';
  if(!nm||!ph||!ci||!ad){toast('يرجى تعبئة بيانات الشحن','red');return;}
  if(A.co.payMethod==='stc'){
    var sp=(document.getElementById('stc-ph')||{}).value||'';
    if(!sp){toast('أدخل رقم STC Pay','red');return;}
  }
  if(!validateCard())return;
  var btn=document.getElementById('confirm-btn');
  btn.textContent='⏳ جاري معالجة الدفع...'; btn.disabled=true;
  setTimeout(function(){
    btn.textContent='🔒 تأكيد الطلب والدفع'; btn.disabled=false;
    var p=A.co.prod, di=A.DEL[A.co.delType];
    var notes=(document.getElementById('sh-notes')||{}).value||'';
    var last4='';
    if(A.co.payMethod==='card'||A.co.payMethod==='mada'){
      var nn=(document.getElementById('cc-num')||{}).value||'';
      last4=nn.replace(/\s/g,'').slice(-4);
    }
    var ord={
      id:'ORD-'+String(A.orders.length+1).padStart(3,'0'),
      prod:p.name, qty:A.co.qty, price:A.co.total,
      sub:A.co.sub, tax:A.co.tax, dFee:A.co.delFee,
      status:'pending', farmer:p.farmer, client:A.user.name,
      emoji:p.emoji, img:p.img, date:new Date().toLocaleDateString('ar-SA'),
      addr:{name:nm,phone:ph,city:ci,addr:ad,notes:notes},
      del:{type:A.co.delType,co:di.name,days:di.days,trk:di.fee>0?'TRK-'+Math.random().toString(36).slice(2,9).toUpperCase():'',status:'waiting'},
      pay:{m:A.co.payMethod,status:'paid',last4:last4},
      cancelMsg:null, refund:null
    };
    A.orders.unshift(ord);
    p.stock=Math.max(0,p.stock-A.co.qty); p.sold+=A.co.qty;
    // صفحة النجاح
    var sn=document.getElementById('suc-num'); if(sn)sn.textContent='رقم الطلب: '+ord.id;
    var sd=document.getElementById('suc-detail');
    if(sd)sd.innerHTML='<div style="background:var(--card);border:1px solid var(--bdr);border-radius:var(--r);padding:16px;text-align:right"><div style="font-size:14px;font-weight:700;margin-bottom:7px">'+ord.prod+'</div><div style="font-size:13px;color:var(--mu)">المبلغ: <strong style="color:var(--lime)">'+ord.price+' ريال</strong></div><div style="font-size:13px;color:var(--mu);margin-top:4px">التوصيل: '+di.name+' · '+di.days+'</div>'+(ord.del.trk?'<div style="font-size:12px;color:var(--mu);margin-top:5px">رقم التتبع: <span style="color:var(--lime);font-family:monospace">'+ord.del.trk+'</span></div>':'')+'</div>';
    go('success');
  },2000);
}

// ═══════════════════════════
// القسم ١٥: الطلبات
// ═══════════════════════════
function renderOrds(filter){
  var el=document.getElementById('ords-list'); if(!el)return;
  var role=A.user&&A.user.role;
  var list=A.orders.slice();
  if(role==='client')list=list.filter(function(o){return o.client===A.user.name;});
  else if(role==='farmer')list=list.filter(function(o){return o.farmer===A.user.name;});
  if(filter&&filter!=='all')list=list.filter(function(o){return o.status===filter;});
  if(!list.length){el.innerHTML=emptyB('📦','لا توجد طلبات','ستظهر طلباتك هنا');return;}
  el.innerHTML=list.map(function(o){
    return '<div class="ord-card" onclick="openOrdDetail(\''+o.id+'\')">'
      +'<div class="ord-hd"><div><span class="ord-id">'+o.id+'</span><span class="ord-dt">📅 '+o.date+'</span></div>'
      +'<span class="st-badge '+o.status+'">'+SL[o.status]+'</span></div>'
      +'<div class="ord-body">'
      +'<div class="ord-ico">'+(o.img?'<img src="'+o.img+'">':o.emoji)+'</div>'
      +'<div><div class="ord-nm">'+o.prod+'</div>'
      +'<div class="ord-mt">'+(role==='client'?'المزارع: '+o.farmer:role==='farmer'?'العميل: '+o.client:o.client+' ← '+o.farmer)+' · '+o.qty+' كغ</div></div>'
      +'<div class="ord-pr">'+o.price+' ريال</div></div>'
      +(o.cancelMsg?'<div class="cancel-note"><span style="font-size:12px;color:#f09070;font-weight:700">⚠️ سبب الإلغاء: </span><span style="font-size:12px">'+o.cancelMsg+'</span></div>':'')
      +'</div>';
  }).join('');
}
function filterOrds(el,f){
  document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});
  el.classList.add('active');
  renderOrds(f==='all'?null:f);
}

// ═══════════════════════════
// القسم ١٦: تفاصيل الطلب
// ═══════════════════════════
function openOrdDetail(ordId){
  var o=A.orders.find(function(x){return x.id===ordId;});
  if(!o)return;
  A.curOrdId=ordId;
  var ts=o.del&&o.del.status||'waiting';
  var steps=[
    {ico:'📋',lbl:'تم استلام الطلب',done:true},
    {ico:'💳',lbl:'تأكيد الدفع',done:o.pay&&(o.pay.status==='paid'||o.pay.status==='refunded')},
    {ico:'📦',lbl:'قيد التجهيز',done:['preparing','shipped','delivered'].indexOf(ts)>-1},
    {ico:'🚚',lbl:'في الطريق',done:['shipped','delivered'].indexOf(ts)>-1},
    {ico:'✅',lbl:'تم التسليم',done:ts==='delivered'},
  ];
  var ai=steps.reduce(function(l,s,i){return s.done?i:l;},0);
  var role=A.user&&A.user.role;
  var el=document.getElementById('ord-detail'); if(!el)return;

  function dc(head,rows){
    return '<div class="od-card"><div class="od-hd">'+head+'</div>'
      +rows.map(function(r){return '<div class="od-row"><span class="k">'+r[0]+'</span><span class="v'+(r[2]?' hl':'')+'">'+r[1]+'</span></div>';}).join('')
      +'</div>';
  }

  var ord_info=dc('📦 معلومات الطلب',[
    ['رقم الطلب','<span style="font-family:monospace">'+o.id+'</span>'],
    ['تاريخ الطلب','📅 '+o.date],
    ['المنتج',o.prod],
    ['الكمية',o.qty+' كغ'],
    ['الحالة','<span class="st-badge '+o.status+'">'+SL[o.status]+'</span>'],
    role==='client'?['المزارع',o.farmer]:role==='farmer'?['العميل',o.client]:['العميل → المزارع',o.client+' → '+o.farmer],
  ]);

  var amounts=dc('💰 تفصيل المبالغ',[
    ['سعر المنتج',(o.sub||o.price)+' ريال'],
    ['رسوم التوصيل',o.dFee===0?'مجاناً':o.dFee+' ريال'],
    ['ضريبة القيمة المضافة',(o.tax||0)+' ريال'],
    ['المبلغ الإجمالي',o.price+' ريال',true],
  ]);

  var addr=o.addr&&o.addr.city?dc('📍 عنوان الشحن',[
    ['المستلم',o.addr.name],['الجوال',o.addr.phone],
    ['المدينة',o.addr.city],['العنوان',o.addr.addr],
    o.addr.notes?['ملاحظات',o.addr.notes]:null,
  ].filter(Boolean)):'';

  var tracking='';
  if(o.del&&o.del.co){
    var trk_rows=[['شركة الشحن',o.del.co],['الوقت المتوقع',o.del.days]];
    if(o.del.trk)trk_rows.push(['رقم التتبع','<span style="font-family:monospace;color:var(--lime)">'+o.del.trk+'</span>']);
    var stepsHTML=steps.map(function(s,i){
      return '<div class="tr-step'+(s.done?' done':'')+'">'
        +'<div class="tr-ico">'+s.ico+'</div>'
        +'<div><div class="tr-lbl">'+s.lbl+'</div></div></div>';
    }).join('');
    tracking='<div class="od-card od-card-full"><div class="od-hd">🚚 تتبع التوصيل</div>'
      +trk_rows.map(function(r){return '<div class="od-row"><span class="k">'+r[0]+'</span><span class="v">'+r[1]+'</span></div>';}).join('')
      +'<div class="track-wrap">'+stepsHTML+'</div></div>';
  }

  var payment='';
  if(o.pay&&o.pay.m){
    var pm={card:'بطاقة ائتمانية',mada:'بطاقة مدى',stc:'STC Pay',cod:'الدفع عند الاستلام'};
    var pr=[['طريقة الدفع',pm[o.pay.m]||o.pay.m]];
    if(o.pay.last4)pr.push(['آخر ٤ أرقام','<span style="font-family:monospace">•••• '+o.pay.last4+'</span>']);
    pr.push(['حالة الدفع','<span class="badge '+(o.pay.status==='paid'?'lime':o.pay.status==='refunded'?'gold':'red')+'">'+(o.pay.status==='paid'?'مدفوع':o.pay.status==='refunded'?'مسترد':'غير مدفوع')+'</span>']);
    payment=dc('💳 معلومات الدفع',pr);
  }

  // الأزرار
  var acts='<div class="od-acts">'
    +'<button class="btn-sm g" onclick="printInv(\''+o.id+'\')">🖨️ طباعة الفاتورة</button>';
  if(o.status==='done'&&role==='client'&&!o.refund)
    acts+='<button class="btn-sm gold" onclick="openRefund(\''+o.id+'\')">💰 طلب استرداد</button>';
  if(o.status==='pending'&&role==='farmer'){
    acts+='<button class="btn-sm g" onclick="updOrdStatus(\''+o.id+'\',\'done\')">✓ تأكيد الطلب</button>';
    acts+='<button class="btn-sm r" onclick="openCancel(\''+o.id+'\')">✕ إلغاء مع السبب</button>';
  }
  acts+='</div>';

  var cancel_box=o.cancelMsg?'<div style="padding:11px 15px;background:var(--red-d);border-top:1px solid rgba(224,90,42,.25)"><span style="color:#f09070;font-weight:700">⚠️ سبب الإلغاء: </span><span style="font-size:13px">'+o.cancelMsg+'</span></div>':'';
  var refund_box=o.refund?'<div style="padding:11px 15px;background:var(--gold-d);border-top:1px solid rgba(200,168,50,.25)"><span style="color:var(--gold2);font-weight:700">💰 حالة الاسترداد: </span><span style="font-size:13px">'+o.refund+'</span></div>':'';

  el.innerHTML='<div class="tr-full">'
    +'<div class="od-card"><div class="od-hd">📋 معلومات الطلب</div>'
    +'<div class="od-row"><span class="k">رقم الطلب</span><span class="v" style="font-family:monospace">'+o.id+'</span></div>'
    +'<div class="od-row"><span class="k">تاريخ الطلب</span><span class="v">📅 '+o.date+'</span></div>'
    +'<div class="od-row"><span class="k">المنتج</span><span class="v">'+o.prod+'</span></div>'
    +'<div class="od-row"><span class="k">الكمية</span><span class="v">'+o.qty+' كغ</span></div>'
    +'<div class="od-row"><span class="k">الحالة</span><span class="v"><span class="st-badge '+o.status+'">'+SL[o.status]+'</span></span></div>'
    +(role==='client'?'<div class="od-row"><span class="k">المزارع</span><span class="v">'+o.farmer+'</span></div>':role==='farmer'?'<div class="od-row"><span class="k">العميل</span><span class="v">'+o.client+'</span></div>':'<div class="od-row"><span class="k">العميل</span><span class="v">'+o.client+'</span></div><div class="od-row"><span class="k">المزارع</span><span class="v">'+o.farmer+'</span></div>')
    +cancel_box+refund_box+acts+'</div></div>'
    +amounts
    +addr
    +tracking
    +payment;

  var pb=document.getElementById('print-btn'); if(pb)pb.onclick=function(){printInv(o.id);};
  go('order-detail');
}

function updOrdStatus(id,status){
  var o=A.orders.find(function(x){return x.id===id;}); if(o)o.status=status;
  toast(status==='done'?'✓ تم تأكيد الطلب':'تم التحديث','lime');
  openOrdDetail(id);
}

// ═══════════════════════════
// القسم ١٧: طباعة الفاتورة
// ═══════════════════════════
function printInv(ordId){
  var o=A.orders.find(function(x){return x.id===ordId;}); if(!o)return;
  var pa=document.getElementById('print-area'); pa.style.display='block';
  pa.innerHTML='<div class="inv-logo">حصادي — منصة مزارع الأفلاج</div>'
    +'<div style="font-size:11px;color:#666;margin-bottom:18px">AL-AFLAJ FARMS | '+new Date().toLocaleDateString('ar-SA')+'</div>'
    +'<div style="font-size:18px;font-weight:700;margin-bottom:14px">فاتورة ضريبية: '+o.id+'</div>'
    +'<table class="inv-table"><tr><th>البند</th><th>التفاصيل</th></tr>'
    +'<tr><td>رقم الطلب</td><td>'+o.id+'</td></tr>'
    +'<tr><td>تاريخ الطلب</td><td>'+o.date+'</td></tr>'
    +'<tr><td>العميل</td><td>'+o.client+'</td></tr>'
    +'<tr><td>المزارع</td><td>'+o.farmer+'</td></tr>'
    +'<tr><td>المنتج</td><td>'+o.prod+'</td></tr>'
    +'<tr><td>الكمية</td><td>'+o.qty+' كغ</td></tr>'
    +'<tr><td>سعر المنتج</td><td>'+(o.sub||o.price)+' ريال</td></tr>'
    +'<tr><td>رسوم التوصيل</td><td>'+(o.dFee===0?'مجاناً':o.dFee+' ريال')+'</td></tr>'
    +'<tr><td>ضريبة ١٥٪</td><td>'+(o.tax||0)+' ريال</td></tr>'
    +'<tr><td style="font-weight:800">المجموع</td><td class="inv-total">'+o.price+' ريال</td></tr>'
    +'</table>'
    +(o.addr&&o.addr.city?'<div style="margin-top:16px;font-size:12px"><b>عنوان التوصيل:</b> '+o.addr.city+' — '+o.addr.addr+'</div>':'')
    +(o.del&&o.del.trk?'<div style="margin-top:7px;font-size:12px"><b>رقم التتبع:</b> '+o.del.trk+'</div>':'')
    +'<div style="margin-top:20px;padding-top:14px;border-top:1px solid #ccc;font-size:11px;color:#666">شكراً لتعاملكم مع منصة حصادي | support@hasadi.sa</div>';
  window.print();
  setTimeout(function(){pa.innerHTML='';pa.style.display='none';},1000);
}

// ═══════════════════════════
// القسم ١٨: الاسترداد
// ═══════════════════════════
function openRefund(ordId){
  A.refundOrdId=ordId;
  var o=A.orders.find(function(x){return x.id===ordId;});
  var ri=document.getElementById('refund-info');
  if(ri)ri.textContent='الطلب: '+o.id+' | المنتج: '+o.prod+' | المبلغ: '+o.price+' ريال';
  document.getElementById('ref-reason').value='';
  document.getElementById('ref-detail').value='';
  showM('m-refund');
}
function submitRefund(){
  var r=(document.getElementById('ref-reason')||{}).value;
  if(!r){toast('اختر سبب الاسترداد','red');return;}
  var d=document.getElementById('ref-detail').value.trim();
  var o=A.orders.find(function(x){return x.id===A.refundOrdId;});
  if(o){o.refund='طلب استرداد: '+r+(d?' — '+d:'')+' | قيد المراجعة'; o.pay.status='refunded';}
  closeM('m-refund');
  toast('✓ تم إرسال طلب الاسترداد — سيُراجع خلال ٣-٥ أيام','lime');
  openOrdDetail(A.refundOrdId);
}

// ═══════════════════════════
// القسم ١٩: إلغاء الطلب
// ═══════════════════════════
function openCancel(ordId){
  A.cancelOrdId=ordId;
  document.getElementById('can-reason').value='';
  document.getElementById('can-note').value='';
  showM('m-cancel');
}
function confirmCancel(){
  var r=(document.getElementById('can-reason')||{}).value;
  if(!r){toast('اختر سبب الإلغاء','red');return;}
  var note=document.getElementById('can-note').value.trim();
  var msgs={'نفاذ المخزون':'نأسف، نفد المخزون مؤقتاً','المنتج غير متوفر':'غير متوفر الآن','مشكلة في التوصيل':'تعذّر التوصيل','مشكلة في الدفع':'حدثت مشكلة في الدفع','طلب العميل الإلغاء':'تم الإلغاء بناءً على طلبك','سبب آخر':'تم الإلغاء'};
  var o=A.orders.find(function(x){return x.id===A.cancelOrdId;});
  if(o){o.status='cancel'; o.cancelMsg=(msgs[r]||r)+(note?' — '+note:'');}
  closeM('m-cancel');
  toast('تم إلغاء الطلب وإبلاغ العميل','gold');
  openOrdDetail(A.cancelOrdId);
}

// ═══════════════════════════
// القسم ٢٠: الرسائل
// ═══════════════════════════
function renderConvs(){
  var el=document.getElementById('convs-wrap'); if(!el)return;
  var isAdmin=A.user&&A.user.role==='admin';
  var html=isAdmin?'<div style="margin-bottom:13px;padding:12px 15px;background:var(--red-d);border:1px solid rgba(224,90,42,.28);border-radius:var(--r);font-size:13px">🛡️ <b style="color:#f09070">وضع الأدمن</b> — مراقبة فقط</div>':'';
  if(!A.convs.length){el.innerHTML=html+emptyB('💬','لا توجد رسائل','ابدأ محادثة من صفحة أي منتج');return;}
  html+=A.convs.map(function(c){
    return '<div class="conv-it" onclick="openChat('+c.id+')">'
      +'<div class="conv-av">'+c.name[0]+'</div>'
      +'<div style="flex:1;min-width:0">'
      +'<div style="display:flex;justify-content:space-between"><span class="conv-nm">'+c.name+'</span><span class="conv-tm">'+c.time+'</span></div>'
      +'<div style="display:flex;justify-content:space-between;align-items:center">'
      +'<span class="conv-last">'+c.last+'</span>'
      +(c.unread&&!isAdmin?'<span class="unread-dot">'+c.unread+'</span>':'')
      +'</div></div></div>';
  }).join('');
  el.innerHTML=html;
}
function openChat(id){
  var conv=A.convs.find(function(c){return c.id===id;}); if(!conv)return;
  A.curChat=conv; conv.unread=0;
  document.getElementById('chat-nm').textContent=conv.name;
  document.getElementById('chat-av').textContent=conv.name[0];
  var ci=document.getElementById('chat-input');
  if(ci)ci.classList.toggle('hidden',A.user&&A.user.role==='admin');
  renderMsgs(); go('chat');
}
function renderMsgs(){
  var conv=A.curChat; if(!conv)return;
  var box=document.getElementById('chat-msgs');
  var isAdmin=A.user&&A.user.role==='admin';
  box.innerHTML=(isAdmin?'<div style="text-align:center;padding:10px;font-size:12px;color:var(--mu)">🛡️ وضع المراقبة — لا يمكنك الإرسال</div>':'')
    +conv.msgs.map(function(m){
      return '<div><div class="bubble '+(m.out?'out':'in')+'">'+m.txt+'</div>'
        +'<div class="b-time" style="text-align:'+(m.out?'right':'left')+';padding:0 3px">'+m.time+'</div></div>';
    }).join('');
  setTimeout(function(){box.scrollTop=box.scrollHeight;},50);
}
function sendMsg(){
  if(A.user&&A.user.role==='admin')return;
  var inp=document.getElementById('msg-txt'), txt=inp.value.trim();
  if(!txt||!A.curChat)return;
  A.curChat.msgs.push({txt:txt,out:true,time:'الآن'});
  A.curChat.last=txt; inp.value=''; inp.style.height='';
  renderMsgs();
  setTimeout(function(){A.curChat.msgs.push({txt:'شكراً على تواصلك 🌾',out:false,time:'الآن'});renderMsgs();},1200);
}
function autoH(el){el.style.height='';el.style.height=Math.min(el.scrollHeight,100)+'px';}
function startChat(){
  if(!A.user){go('login');return;}
  var p=A.curProd;
  var conv=A.convs.find(function(c){return c.name===p.farmer;});
  if(!conv){conv={id:Date.now(),name:p.farmer,last:'',time:'الآن',unread:0,msgs:[]};A.convs.unshift(conv);}
  openChat(conv.id);
}

// ═══════════════════════════
// القسم ٢١: الإرشادات
// ═══════════════════════════
function renderGuides(){
  var el=document.getElementById('guides-grid'); if(!el)return;
  var isAdmin=A.user&&A.user.role==='admin';
  el.innerHTML=A.guides.map(function(g){
    return '<div class="gc"><h4>'+g.ico+' '+g.title+(isAdmin?' <button class="btn-sm r" style="margin-right:auto;font-size:10px" onclick="delGuide('+g.id+')">حذف</button>':'')+'</h4>'
      +'<p>'+g.intro+'</p><ul>'+g.pts.map(function(pt){return '<li>'+pt+'</li>';}).join('')+'</ul></div>';
  }).join('');
}
function saveGuide(){
  var t=document.getElementById('g-title').value.trim();
  if(!t){toast('أدخل العنوان','gold');return;}
  A.guides.unshift({id:Date.now(),ico:'🌿',title:t,intro:document.getElementById('g-intro').value.trim()||'إرشاد جديد',pts:document.getElementById('g-pts').value.trim().split('\n').filter(Boolean)});
  closeM('m-guide');
  ['g-title','g-intro','g-pts'].forEach(function(id){document.getElementById(id).value='';});
  renderGuides(); toast('✓ تم نشر الإرشاد','lime');
}
function delGuide(id){
  if(!confirm('حذف هذا الإرشاد؟'))return;
  A.guides=A.guides.filter(function(g){return g.id!==id;});
  renderGuides(); toast('تم الحذف','red');
}

// ═══════════════════════════
// القسم ٢٢: الحساب
// ═══════════════════════════
function renderAccount(){
  var el=document.getElementById('acc-content'); if(!el||!A.user)return;
  var role=A.user.role;
  var myOrds=A.orders.filter(function(o){return role==='client'?o.client===A.user.name:o.farmer===A.user.name;});
  var rl={client:'عميل',farmer:'مزارع',admin:'أدمن'};
  el.innerHTML='<div style="display:grid;grid-template-columns:280px 1fr;gap:22px;padding-top:16px">'
    +'<div>'
    +'<div style="background:var(--card);border:1px solid var(--bdr);border-radius:var(--r);padding:22px;text-align:center;margin-bottom:14px">'
    +'<div style="width:68px;height:68px;border-radius:16px;background:linear-gradient(135deg,#2a6a2a,#5aaa2a);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#fff;margin:0 auto 12px">'+A.user.name[0]+'</div>'
    +'<div style="font-size:19px;font-weight:800">'+A.user.name+'</div>'
    +'<div style="font-size:13px;color:var(--mu);margin-top:3px">'+A.user.email+'</div>'
    +'<div style="margin-top:9px"><span class="badge '+(role==='farmer'?'lime':role==='admin'?'red':'gold')+'">'+rl[role]+'</span></div></div>'
    +'<div style="background:var(--card);border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden">'
    +(role==='farmer'?'<div onclick="go(\'farmer-dash\')" style="padding:12px 15px;cursor:pointer;font-size:14px;color:var(--lime);border-bottom:1px solid var(--bdr)">⚡ لوحة تحكم المزارع</div>':'')
    +'<div onclick="go(\'orders\')" style="padding:12px 15px;cursor:pointer;font-size:14px;border-bottom:1px solid var(--bdr)">📦 طلباتي ('+myOrds.length+')</div>'
    +'<div onclick="go(\'messages\')" style="padding:12px 15px;cursor:pointer;font-size:14px;border-bottom:1px solid var(--bdr)">💬 رسائلي</div>'
    +'<div onclick="go(\'guides\')" style="padding:12px 15px;cursor:pointer;font-size:14px">📖 الإرشادات</div></div></div>'
    +'<div><div style="font-size:16px;font-weight:700;margin-bottom:13px">آخر الطلبات</div>'
    +(myOrds.length?'<div class="ords-wrap">'+myOrds.slice(0,5).map(function(o){return '<div class="ord-card" onclick="openOrdDetail(\''+o.id+'\')"><div class="ord-hd"><div><span class="ord-id">'+o.id+'</span><span class="ord-dt"> '+o.date+'</span></div><span class="st-badge '+o.status+'">'+SL[o.status]+'</span></div><div class="ord-body"><div class="ord-ico">'+(o.img?'<img src="'+o.img+'">':o.emoji)+'</div><div><div class="ord-nm">'+o.prod+'</div><div class="ord-mt">'+o.qty+' كغ</div></div><div class="ord-pr">'+o.price+' ريال</div></div></div>';}).join('')+'</div>':'<div style="padding:30px;text-align:center;color:var(--mu)">لا توجد طلبات بعد</div>')
    +'</div></div>';
}

// ═══════════════════════════
// القسم ٢٣: لوحة المزارع
// ═══════════════════════════
function renderFarmerDash(){
  var el=document.getElementById('farmer-dash'); if(!el||!A.user)return;
  var myP=A.prods.filter(function(p){return p.farmer===A.user.name;});
  var myO=A.orders.filter(function(o){return o.farmer===A.user.name;});
  var pen=myO.filter(function(o){return o.status==='pending';});
  var don=myO.filter(function(o){return o.status==='done';});
  var rev=don.reduce(function(s,o){return s+o.price;},0);
  var avgRat=myP.length?myP.reduce(function(s,p){return s+avgR(p);},0)/myP.length:0;
  el.innerHTML='<div class="dash-stats">'
    +'<div class="scard g-bdr"><div class="sn">'+myP.length+'</div><div class="sl">🌾 منتجاتي</div></div>'
    +'<div class="scard gd-bdr"><div class="sn" style="color:var(--gold2)">'+pen.length+'</div><div class="sl">⏳ معلّقة</div></div>'
    +'<div class="scard g-bdr"><div class="sn">'+don.length+'</div><div class="sl">✓ مكتملة</div></div>'
    +'<div class="scard gd-bdr"><div class="sn" style="color:var(--gold2);font-size:20px">'+rev+'ر</div><div class="sl">💰 الإيرادات</div></div>'
    +'</div>'
    +'<div style="background:var(--card);border:1px solid var(--bdr);border-radius:var(--r);padding:14px 18px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center">'
    +'<span style="font-size:14px;color:var(--mu)">متوسط تقييمك</span>'
    +'<span style="font-size:17px;font-weight:800;color:var(--gold)">'+( avgRat?avgRat.toFixed(1)+' ★':'لا يوجد بعد')+'</span></div>'
    // الطلبات المعلّقة
    +(pen.length?'<div class="pen-sec"><h3>⚡ طلبات تحتاج ردك ('+pen.length+')</h3>'
      +pen.map(function(o){return '<div class="ord-card" style="margin-bottom:9px" onclick="openOrdDetail(\''+o.id+'\')">'
        +'<div class="ord-hd"><span class="ord-id">'+o.id+'</span><span class="ord-dt"> '+o.date+'</span><span class="st-badge pending">معلّق</span></div>'
        +'<div class="ord-body"><div class="ord-ico">'+(o.img?'<img src="'+o.img+'">':o.emoji)+'</div><div><div class="ord-nm">'+o.prod+'</div><div class="ord-mt">العميل: '+o.client+' · '+o.qty+' كغ</div></div><div class="ord-pr">'+o.price+' ريال</div></div>'
        +'<div class="ord-acts" onclick="event.stopPropagation()">'
        +'<button class="btn-sm g" onclick="updOrdStatus(\''+o.id+'\',\'done\')">✓ تأكيد الطلب</button>'
        +'<button class="btn-sm r" onclick="openCancel(\''+o.id+'\')">✕ إلغاء مع السبب</button>'
        +'</div></div>';}).join('')+'</div>'
      :'<div style="background:rgba(143,201,58,.08);border:1px solid rgba(143,201,58,.2);border-radius:var(--r);padding:14px 18px;margin-bottom:18px;font-size:14px;color:var(--lime2)">✓ لا توجد طلبات معلّقة</div>')
    // منتجاتي
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
    +'<h3 style="font-size:15px;font-weight:700">منتجاتي الخاصة</h3>'
    +'<button class="btn-pri" onclick="openAddProduct(null)">+ إضافة منتج</button></div>'
    +(myP.length?myP.map(function(p){return '<div class="fp-card">'
      +'<div class="fp-ico">'+(p.img?'<img src="'+p.img+'">':p.emoji)+'</div>'
      +'<div style="flex:1">'
      +'<div style="font-size:14px;font-weight:700">'+p.name+'</div>'
      +'<div style="font-size:12px;color:var(--mu);margin-top:3px">'+p.price+'ر/كغ · <span style="color:'+(p.stock===0?'#f09070':p.stock<=10?'var(--gold2)':'var(--lime2)')+'">'+( p.stock===0?'❌ نفد':p.stock<=10?'⚠️ '+p.stock:'✓ '+p.stock+' كغ')+'</span> · '+p.sold+' مبيعات</div></div>'
      +'<div style="display:flex;gap:7px">'
      +'<button class="btn-sm g" onclick="openAddProduct('+p.id+')">تعديل</button>'
      +'<button class="btn-sm r" onclick="delProd('+p.id+')">حذف</button></div></div>';}).join('')
      :'<div style="text-align:center;padding:28px;color:var(--mu)">أضف أول منتج لمزرعتك!</div>');
}

// ═══════════════════════════
// القسم ٢٤: لوحة الأدمن
// ═══════════════════════════
function renderAdminDash(){
  var el=document.getElementById('admin-dash'); if(!el||!A.user)return;
  var rev=A.orders.filter(function(o){return o.status==='done';}).reduce(function(s,o){return s+o.price;},0);
  var pen=A.orders.filter(function(o){return o.status==='pending';}).length;
  el.innerHTML='<div class="dash-stats">'
    +'<div class="scard r-bdr"><div class="sn" style="color:#f09070">'+A.users.length+'</div><div class="sl">👥 المستخدمون</div></div>'
    +'<div class="scard r-bdr"><div class="sn" style="color:#f09070">'+A.prods.length+'</div><div class="sl">📦 المنتجات</div></div>'
    +'<div class="scard gd-bdr"><div class="sn" style="color:var(--gold2)">'+pen+'</div><div class="sl">⏳ معلّقة</div></div>'
    +'<div class="scard gd-bdr"><div class="sn" style="color:var(--gold2);font-size:20px">'+rev+'ر</div><div class="sl">💰 الإيرادات</div></div>'
    +'</div>'
    // المستخدمون
    +'<div style="font-size:15px;font-weight:700;margin-bottom:12px">إدارة المستخدمين</div>'
    +'<div class="users-table" style="margin-bottom:20px">'+A.users.map(function(u){
      return '<div class="u-row">'
        +'<div class="u-av" style="background:'+(u.role==='farmer'?'linear-gradient(135deg,#2a6a2a,#5aaa2a)':u.role==='admin'?'linear-gradient(135deg,#8a2a2a,#c04a2a)':'linear-gradient(135deg,#2a4a8a,#4a6aaa)')+'">'+u.name[0]+'</div>'
        +'<div style="flex:1"><div style="font-size:13px;font-weight:700">'+u.name+'</div><div style="font-size:11px;color:var(--mu);margin-top:1px">'+u.email+'</div></div>'
        +'<div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">'
        +'<span class="badge '+(u.role==='farmer'?'lime':u.role==='admin'?'red':'gold')+'">'+(u.role==='farmer'?'مزارع':u.role==='admin'?'أدمن':'عميل')+'</span>'
        +'<span style="font-size:10px;color:'+(u.active?'var(--lime2)':'var(--mu)')+'">'+(u.active?'● نشط':'○ غير نشط')+'</span></div></div>';
    }).join('')+'</div>'
    // آخر الطلبات
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
    +'<div style="font-size:15px;font-weight:700">آخر الطلبات</div>'
    +'<button class="btn-sm g" onclick="go(\'orders\')">عرض الكل</button></div>'
    +'<div class="ords-wrap" style="margin-bottom:20px">'+A.orders.slice(0,4).map(function(o){
      return '<div class="ord-card" onclick="openOrdDetail(\''+o.id+'\')">'
        +'<div class="ord-hd"><div><span class="ord-id">'+o.id+'</span><span class="ord-dt"> '+o.date+'</span></div><span class="st-badge '+o.status+'">'+SL[o.status]+'</span></div>'
        +'<div class="ord-body"><div class="ord-ico">'+o.emoji+'</div><div><div class="ord-nm">'+o.prod+'</div><div class="ord-mt">'+o.client+' ← '+o.farmer+'</div></div><div class="ord-pr">'+o.price+' ريال</div></div>'
        +(o.status==='pending'?'<div class="ord-acts" onclick="event.stopPropagation()"><button class="btn-sm g" onclick="updOrdStatus(\''+o.id+'\',\'done\')">✓ تأكيد</button><button class="btn-sm r" onclick="openCancel(\''+o.id+'\')">✕ إلغاء</button></div>':'')
        +'</div>';
    }).join('')+'</div>'
    // روابط سريعة
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">'
    +['reports:📊:التقارير','ads:📢:الإعلانات','products:📦:المنتجات','orders:🧾:الطلبات'].map(function(it){
      var parts=it.split(':');
      return '<div onclick="go(\''+parts[0]+'\')" style="background:var(--card);border:1px solid var(--bdr);border-radius:var(--r);padding:18px;text-align:center;cursor:pointer;transition:transform .2s" onmouseover="this.style.transform=\'translateY(-3px)\'" onmouseout="this.style.transform=\'\'"><div style="font-size:26px;margin-bottom:7px">'+parts[1]+'</div><div style="font-size:13px;font-weight:700">'+parts[2]+'</div></div>';
    }).join('')+'</div>';
}

// ═══════════════════════════
// القسم ٢٥: التقارير
// ═══════════════════════════
function renderReports(){
  var el=document.getElementById('reports-content'); if(!el)return;
  var done=A.orders.filter(function(o){return o.status==='done';});
  var rev=done.reduce(function(s,o){return s+o.price;},0);
  var cancelRate=A.orders.length?Math.round(A.orders.filter(function(o){return o.status==='cancel';}).length/A.orders.length*100):0;
  var catSales={};
  done.forEach(function(o){var p=A.prods.find(function(x){return x.name===o.prod;});if(p)catSales[p.cat]=(catSales[p.cat]||0)+o.price;});
  var maxCat=Math.max.apply(null,Object.values(catSales).concat([1]));
  var top5=[].concat(A.prods).sort(function(a,b){return b.sold-a.sold;}).slice(0,5);
  el.innerHTML='<div class="dash-stats" style="margin-bottom:20px">'
    +'<div class="scard"><div class="sn">'+rev+'</div><div class="sl">💰 إجمالي الإيرادات (ر)</div></div>'
    +'<div class="scard"><div class="sn">'+A.orders.length+'</div><div class="sl">📦 إجمالي الطلبات</div></div>'
    +'<div class="scard"><div class="sn">'+done.length+'</div><div class="sl">✓ مكتملة</div></div>'
    +'<div class="scard gd-bdr"><div class="sn" style="color:var(--gold2)">'+cancelRate+'%</div><div class="sl">✕ معدل الإلغاء</div></div>'
    +'</div>'
    +'<div class="rep-grid">'
    +'<div class="rep-card"><h4>📊 المبيعات حسب الفئة</h4>'
    +Object.entries(catSales).map(function(e){var pct=Math.round(e[1]/maxCat*100);return '<div class="bar-it"><div class="bar-lbl">'+e[0]+'</div><div class="bar-bg"><div class="bar-fill" style="width:'+pct+'%"></div></div><div class="bar-val">'+e[1]+'ر</div></div>';}).join('')
    +(Object.keys(catSales).length?'':'<div style="color:var(--mu);font-size:13px">لا توجد مبيعات بعد</div>')
    +'</div>'
    +'<div class="rep-card"><h4>🏆 أعلى المنتجات مبيعاً</h4>'
    +top5.map(function(p,i){return '<div class="rep-stat"><span>'+(i+1)+'. '+p.emoji+' '+p.name+'</span><span style="color:var(--lime);font-weight:700">'+p.sold+' وحدة</span></div>';}).join('')
    +'</div>'
    +'<div class="rep-card"><h4>🌾 المزارعون</h4>'
    +A.users.filter(function(u){return u.role==='farmer';}).map(function(u){return '<div class="rep-stat"><span>'+u.name+'</span><div style="display:flex;gap:7px"><span class="badge lime">'+(u.totalSales||0)+'ر</span><span class="badge gold" style="font-size:11px">'+(u.avgRating?u.avgRating+' ★':'')+'</span></div></div>';}).join('')
    +'</div>'
    +'<div class="rep-card"><h4>📈 توزيع الطلبات</h4>'
    +['pending','done','cancel'].map(function(s){
      var cnt=A.orders.filter(function(o){return o.status===s;}).length;
      var pct=A.orders.length?Math.round(cnt/A.orders.length*100):0;
      var colors={pending:'linear-gradient(to left,var(--gold),rgba(200,168,50,.4))',done:'linear-gradient(to left,var(--lime),rgba(143,201,58,.4))',cancel:'linear-gradient(to left,var(--red),rgba(224,90,42,.4))'};
      return '<div class="bar-it"><div class="bar-lbl">'+SL[s]+'</div><div class="bar-bg"><div class="bar-fill" style="width:'+pct+'%;background:'+colors[s]+'"></div></div><div class="bar-val">'+cnt+' ('+pct+'%)</div></div>';
    }).join('')+'</div></div>';
}
function printRep(){
  var pa=document.getElementById('print-area'); pa.style.display='block';
  var done=A.orders.filter(function(o){return o.status==='done';});
  pa.innerHTML='<div class="inv-logo">حصادي — تقرير المبيعات</div>'
    +'<div style="font-size:12px;color:#666;margin-bottom:18px">'+new Date().toLocaleDateString('ar-SA')+'</div>'
    +'<table class="inv-table"><tr><th>المؤشر</th><th>القيمة</th></tr>'
    +'<tr><td>إجمالي الإيرادات</td><td class="inv-total">'+done.reduce(function(s,o){return s+o.price;},0)+' ريال</td></tr>'
    +'<tr><td>إجمالي الطلبات</td><td>'+A.orders.length+'</td></tr>'
    +'<tr><td>مكتملة</td><td>'+done.length+'</td></tr>'
    +'<tr><td>ملغاة</td><td>'+A.orders.filter(function(o){return o.status==='cancel';}).length+'</td></tr>'
    +'<tr><td>المنتجات</td><td>'+A.prods.length+'</td></tr>'
    +'<tr><td>المستخدمون</td><td>'+A.users.length+'</td></tr>'
    +'</table></div>';
  window.print();
  setTimeout(function(){pa.innerHTML='';pa.style.display='none';},1000);
}

// ═══════════════════════════
// القسم ٢٦: الإعلانات
// ═══════════════════════════
function renderAds(){
  var el=document.getElementById('ads-content'); if(!el)return;
  var today=new Date().toISOString().split('T')[0];
  if(!A.ads.length){el.innerHTML=emptyB('📢','لا توجد إعلانات','أضف أول إعلان');return;}
  el.innerHTML='<div class="ads-wrap">'+A.ads.map(function(a){
    var st=a.end<today?'ended':a.start>today?'scheduled':'active';
    var stL={active:'نشط',ended:'منتهي',scheduled:'مجدول'}[st];
    return '<div class="ad-card"><div class="ad-top"><div class="ad-txt">'+a.txt+'</div><span class="ad-st '+st+'">'+stL+'</span></div>'
      +'<div class="ad-dates">📅 '+a.start+' ← '+a.end+'</div>'
      +'<div class="ad-actions"><button class="btn-sm '+(st==='active'?'r':'g')+'" onclick="toggleAd('+a.id+')">'+(st==='active'?'⏸ إيقاف':'▶ تفعيل')+'</button>'
      +'<button class="btn-sm r" onclick="delAd('+a.id+')">🗑 حذف</button></div></div>';
  }).join('')+'</div>';
}
function saveAd(){
  var txt=document.getElementById('ad-txt').value.trim();
  var s=document.getElementById('ad-start').value, e=document.getElementById('ad-end').value;
  if(!txt||!s||!e){toast('يرجى تعبئة جميع الحقول','gold');return;}
  A.ads.unshift({id:Date.now(),txt:txt,start:s,end:e,status:'active'});
  closeM('m-ad');
  ['ad-txt','ad-start','ad-end'].forEach(function(id){document.getElementById(id).value='';});
  renderAds(); renderHomeAds(); toast('✓ تم نشر الإعلان','lime');
}
function toggleAd(id){
  var a=A.ads.find(function(x){return x.id===id;}); if(!a)return;
  var today=new Date().toISOString().split('T')[0];
  var isActive=a.start<=today&&a.end>=today;
  if(isActive){a.end='2000-01-01';toast('تم إيقاف الإعلان','gold');}
  else{a.start=today;var d=new Date();d.setDate(d.getDate()+30);a.end=d.toISOString().split('T')[0];toast('تم تفعيل الإعلان','lime');}
  renderAds(); renderHomeAds();
}
function delAd(id){
  if(!confirm('حذف هذا الإعلان؟'))return;
  A.ads=A.ads.filter(function(a){return a.id!==id;});
  renderAds(); renderHomeAds(); toast('تم الحذف','red');
}

// ═══════════════════════════
// القسم ٢٧: الخلفية
// ═══════════════════════════
(function(){
  var c=document.getElementById('bgc'), ctx=c.getContext('2d'), W, H;
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight;}
  window.addEventListener('resize',resize); resize();
  var lines=Array.from({length:6},function(_,i){return {y:H*(.05+i*.16),sp:.1+Math.random()*.2,w:Math.random()*Math.PI*2,a:4+Math.random()*8,f:.002+Math.random()*.003,col:i%2?'rgba(42,90,42,':'rgba(143,201,58,'};});
  var pts=Array.from({length:40},function(){return {x:Math.random()*9999,y:Math.random()*9999,r:.3+Math.random()*1.1,s:.02+Math.random()*.1,o:.02+Math.random()*.07};});
  var t=0;
  function draw(){
    ctx.clearRect(0,0,W,H);
    var g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#07130a');g.addColorStop(.5,'#0c1e0e');g.addColorStop(1,'#111f13');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    lines.forEach(function(l){
      l.y=((l.y+l.sp*.07)%H);
      ctx.beginPath();
      for(var x=0;x<=W;x+=4){var y=l.y+Math.sin(x*l.f+t*.5+l.w)*l.a;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}
      ctx.strokeStyle=l.col+'0.07)';ctx.lineWidth=1.1;ctx.stroke();
    });
    [[W*.15,H*.2,200,'#2a5a2a'],[W*.85,H*.65,240,'#4a8a1a']].forEach(function(d){
      var gr=ctx.createRadialGradient(d[0],d[1],0,d[0],d[1],d[2]);
      gr.addColorStop(0,d[3]+'25');gr.addColorStop(.6,d[3]+'0a');gr.addColorStop(1,'transparent');
      ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    });
    pts.forEach(function(p){
      p.y-=p.s;if(p.y<-4){p.y=H+4;p.x=Math.random()*W;}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(143,201,58,'+p.o+')';ctx.fill();
    });
    t+=.007;requestAnimationFrame(draw);
  }
  draw();
})();

// ═══════════════════════════
// القسم ٢٨: مساعد عام
// ═══════════════════════════
function showM(id){document.getElementById(id).classList.add('open');}
function closeM(id){document.getElementById(id).classList.remove('open');}
function closeOverlay(el){el.classList.remove('open');}
function toast(msg,type){
  var t=document.getElementById('toast');
  t.textContent=msg; t.className='toast show '+(type||'lime');
  clearTimeout(t._t); t._t=setTimeout(function(){t.classList.remove('show');},3000);
}
function emptyB(ico,title,sub){
  return '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:13px;text-align:center">'
    +'<div style="font-size:56px">'+ico+'</div>'
    +'<h4 style="font-size:18px;font-weight:700">'+title+'</h4>'
    +'<p style="font-size:14px;color:rgba(255,255,255,.4);line-height:1.7">'+sub+'</p></div>';
}

// إخفاء الأزرار الخاصة عند التحميل
(function(){
  ['na-farmer-dash','na-admin-dash','na-reports','na-ads','na-logout'].forEach(function(id){
    var el=document.getElementById(id); if(el)el.classList.add('hidden');
  });
  var apb=document.getElementById('add-prod-btn'); if(apb)apb.classList.add('hidden');
  var agb=document.getElementById('add-guide-btn'); if(agb)agb.classList.add('hidden');
  var su=document.getElementById('sidebar-user'); if(su)su.classList.add('hidden');
})();

// تشغيل التطبيق
go('home');
// ═══════════════════════════
// Bottom Nav للجوال
// ═══════════════════════════
function bnAct(id){
  document.querySelectorAll('#bottom-nav a').forEach(function(a){a.classList.remove('active');});
  var el=document.getElementById(id); if(el)el.classList.add('active');
}
