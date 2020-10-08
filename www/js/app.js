//config
var conf={serverUrl:'https://apis.groupkenya.com/autorescue/api/',staticUrl:'https://apis.groupkenya.com/autorescue/',appName:'AutoRescue',appVersion:'1.0.0',
adminWeb:'www.autorescue.com',adminMail:'info@autorescue.com',adminAddress:'AutoRescue Kenya,<br/>Kenyatta Street, Kitale - Kenya'};

//server requests setup
if(localStorage.getItem('serverurl')!=null&&localStorage.getItem('staticurl')!=null){var serverUrl=localStorage.getItem('serverurl');
var staticUrl=localStorage.getItem('staticurl');}else{var serverUrl=conf.serverUrl;var staticUrl=conf.staticUrl;}
$.xhrPool=[];$.xhrPool.abortAll=function(){$(this).each(function(idx,jqXHR){jqXHR.abort();});$.xhrPool=[];}
$.ajaxSetup({beforeSend:function(jqXHR){jqXHR.setRequestHeader('Authorization','Bearer '+localStorage.getItem('authtoken'));
jqXHR.setRequestHeader('Timezone',Intl.DateTimeFormat().resolvedOptions().timeZone);$.xhrPool.push(jqXHR);},
complete:function(jqXHR){var index=$.xhrPool.indexOf(jqXHR);if(index>-1){$.xhrPool.splice(index,1);}}})

//app views
appviews={

intropage:{htm:'<div class="appview landingpage" data-view="intropage" '+
'style="background-image:url(\'img/bg1.jpg\');background-size:cover;background-position:center;text-align:center;">'+
'<div style="position:absolute;bottom:16px;left:16px;width:calc(100vw - 96px);">'+
'<div class="tofade intropitchappname" style="text-align:left;padding-left:8px;font-size:13px;font-weight:bold;color:#009900;">'+conf.appName+'</div>'+
'<div class="tofade intropitch" style="text-align:left;padding:0 0 16px 8px;font-size:24px;color:#fff;">Breakdowns hurt,<br/>getting a tow truck nearby is easy.</div>'+
'<span class="tofade appbutton ripple initlogin" style="width:100%;">Request service</span>'+
'<span class="tofade appbutton secondary gotopage ripple learnmore" data-page="aboutpage" style="width:100%;">Learn more</span></div></div>',
afterinit:function(){
if(localStorage.getItem('authtoken')!=null){route('back','homepage');}else{
cfadeIn(document.querySelector('.intropitchappname'),300).then(function(){cfadeIn(document.querySelector('.intropitch'),400)
.then(function(){cfadeIn(document.querySelector('.initlogin'),500).then(function(){cfadeIn(document.querySelector('.learnmore'),600)})});});}}},

aboutpage:{htm:'<div class="appview hastopnav" data-view="aboutpage">'+
'<div class="topnav"><span class="appiconnav left goback material-icons">arrow_back_ios</span><span class="pagetitle">About '+conf.appName+'</span></div><div class="contentblock">'+
'<div style="border-bottom:1px solid #eee;"><p style="font-weight:bold;margin-top:0;color:#757575;">Breakdown towing 24/7/365</p><p>If you\'ve broken down and need a tow, we will link you up with a towing service close to you for quick help, day or night, any day of the year.</p></div>'+
'<div style="border-bottom:1px solid #eee;"><p style="font-weight:bold;color:#757575;">Equipment & machinery towing</p><p>Get in touch with our service providers for equipment and machinery towing wherever you may be.</p></div>'+
'<div style="border-bottom:1px solid #eee;"><p style="font-weight:bold;color:#757575;">Specialty towing & recovery services</p><p>With experienced service providers and tow truck operators  on call, we make it easy to get good service.</p></div>'+
'<div style="border-bottom:1px solid #eee;"><p style="font-weight:bold;color:#757575;">On-demand car repairs & road rescue</p><p>We make it easier for you to find and link up with accredited auto repair garages and experienced mechanics.</p></div>'+
'<div style="border-bottom:1px solid #eee;"><p style="font-weight:bold;color:#757575;">Contact us</p><p>Email: '+conf.adminMail+'</p><p>Web: '+conf.adminWeb+'</p><p>Address: '+conf.adminAddress+'</p></div>'+
'<div style="border-bottom:1px solid #eee;"><p style="font-size:12px;text-align:center;padding:8px;color:#757575;">App version '+conf.appVersion+'</p></div>'+
'</div><div class="clear" style="padding:16px;"></div></div>'},

signuppage:{htm:'<div class="appview hastopnav" data-view="signuppage">'+
'<div class="topnav"><span class="pagetitle">Join '+conf.appName+'</span><span class="appiconnav right gotopage material-icons" data-page="aboutpage">info</span></div><div class="contentblock">'+
'The phone number <span class="signupno" style="font-weight:bold;"></span> has not been registered. Please sign up to start using our services or '+
'<span class="cstlink logoutapp">use another phone number</span>.'+
'<form autocomplete="off" class="ajaxform"><input class="signupnodef" name="joinuserphone" type="hidden" required><input class="signupotp" name="joinuserotp" type="hidden" required>'+
'<div class="materialgroup"><input name="joinfname" type="text" required><label>First name</label></div>'+
'<div class="materialgroup"><input name="joinlname" type="text" required><label>Last name</label></div>'+
'<div class="materialgroup"><input name="joinoname" value="-" type="text" required><label>Other names</label></div>'+
'<div class="materialgroup"><input name="joinmail" type="text" required><label>Email address</label></div>'+
'<div class="clear"></div><div class="buttongroup"><span style="margin:0px;" class="appbutton ripple submitform">Sign up</span>'+
'<div class="clear"></div></div><div class="clear"></div></form></div></div>',
afterinit:function(){
if(localStorage.getItem('authtoken')!=null){route('back','homepage');}else{
let a=setInterval(function(){if($('.signupno').length&&$('.signupnodef').length&&localStorage.getItem('otpreguser')!=null&&localStorage.getItem('otpreg')!=null)
{clearInterval(a);setTimeout(function(){$('.signupno').text(localStorage.getItem('otpreguser'));$('.signupnodef').val(localStorage.getItem('otpreguser'));
$('.signupotp').val(localStorage.getItem('otpreg'));},200);}},50);}}},

homepage:{htm:'<div class="appview" style="background:#ccc;background-image:url(\'https://image.maps.api.here.com/mia/1.6/mapview?app_id=dDJU8S8EF5fsh01atMFS&app_code=kLo0nCzosus-hzcNg1e7CQ&poi=&z=17&t=3&sb=k&w=600&h=900\');background-size:cover;background-position:center;" data-view="homepage">'+
'<span class="logoutapp" style="position:absolute;z-index:20;padding:4px 8px;background:rgb(0,0,0);background:rgba(0,0,0,0.3);margin:8px;border-radius:30px;">'+
'<span style="color:#fff;" class="right material-icons">menu</span><span style="top:-7px;position:relative;left:4px;color:#fff;">Hello '+helloLanding()+'</span></span>'+

'<div class="contentblock"><span class="appbutton ripple" style="width:calc(100% - 80px);position:absolute;bottom:16px;margin:0;z-index:10;left:16px;">Request service</span>'+

'</div></div>'}
	
};

//APP FUNCTIONS START

function helloLanding(){	
if(localStorage.getItem('fullnames')!=null){let nm=localStorage.getItem('fullnames').replace(/ .*/,'').toLowerCase();return nm.charAt(0).toUpperCase()+nm.slice(1);}else{return '';}}

//init
function init(ev='none'){
if(ev!='none'){localStorage.removeItem('lastpage');route('back',ev,'y');}else{
if(localStorage.getItem('authtoken')!=null&&localStorage.getItem('passrequired')!=null){var pageone='passrequired';}
else if(localStorage.getItem('authtoken')!=null&&localStorage.getItem('lastpage')!=null){var pageone=localStorage.getItem('lastpage');}
else if(localStorage.getItem('authtoken')!=null){var pageone='homepage';}
else if(localStorage.getItem('otpreg')!=null&&localStorage.getItem('otpreguser')!=null){var pageone='signuppage';}
else{var pageone='intropage';} route('back',pageone);
ajaxReq('POST','',{appjs:encodeURI(localStorage.getItem('appjst')),appcss:encodeURI(localStorage.getItem('appcsst'))});}}

//routing
function route(oPage,nPage,forcel='n'){
if(forcel=='n'&&$('.cstdialogcover,.cstdialogcover1')[0]){$('.cstdialog,.cstdialogcover,.cstdialogcover1').css({'opacity':'0'});setTimeout(function(){xdialogs();},300);return false;}
else{xdialogs();if(loadingPage!=1&&appviews[nPage]!=null){var loadingPage=1;
if($('[data-view="'+nPage+'"]').length==0){document.querySelector('.appcontent').innerHTML+=appviews[nPage].htm;}
$('.appview').css({'z-index':'450','opacity':'0','top':'50px'});$('.appview .topnav').css({'top':'50px'});$('.appview .bottomnav').css({'bottom':'50px'});
localStorage.setItem('lastpage',nPage);if(oPage!='back'){history.pushState({page:nPage},'','#'+nPage);}
let c=setInterval(function(){if($('[data-view="'+nPage+'"]').length){clearInterval(c);
setTimeout(function(){setTimeout(function(){if(typeof appviews[nPage].afterinit=='function'){appviews[nPage].afterinit();}},400);
$('[data-view="'+nPage+'"]').css({'z-index':'455','opacity':'1','top':'0px'});$('[data-view="'+nPage+'"] .topnav').css({'top':'0px'});
$('[data-view="'+nPage+'"] .bottomnav').css({'bottom':'0px'});},200);}},50);
var loadingPage=0;}}}
function gotopage(vars){let v=vars.split(',');route(v[0],v[1],v[2]);}

//ajax get
function ajaxReq(m,notice,cnt,loc=serverUrl){if(notice.length>3){toastinfo({0:{'msg':notice,'type':'info','action':'okay'}});}
$.ajax({method:m,url:loc,dataType:'json',timeout:120000,data:cnt,
success:function(response){$('.csttoast').remove();for(let key in response){if(response.hasOwnProperty(key)){try{window[key](response[key]);}catch(e){}}}},
error:function(){$('.csttoast').remove();if(notice.length>3){toastinfo({0:{'msg':'Connection failed.','type':'info','action':'reload'}});}}})}

//ajax submit
function ajaxSubmit(e,theform,loc=serverUrl){	
e.preventDefault();theform.removeClass('invalid');let emptyFields=-1;
	//check blanks
$(theform).find('input,textarea,select').each(function(){	
if(!$.trim(this.value).length){emptyFields++;if(typeof theEmptyFieldToAlert=='undefined'){theEmptyFieldToAlert=$(this).siblings('label').text();}
theform.addClass('invalid');$(this).css({'border':'1px solid red'});}else{$(this).css({'background':''});}})
	//submit if no blanks
if(theform.hasClass('invalid')){
if(emptyFields==0){var messageToShow='"'+theEmptyFieldToAlert+'" is required.';}
else{if(emptyFields==1){var pcs='piece';var jo='is';}else{var pcs='pieces';var jo='are';}
var messageToShow='"'+theEmptyFieldToAlert+'" and '+emptyFields+' other '+pcs+' of information '+jo+' required.';}
messageinfo({0:{'msg':messageToShow,'type':'info','action':'okay'}});delete theEmptyFieldToAlert;}
else{let submitdeftxt=theform.find('.submitform,.confirmsbmt').html();theform.find('.submitform,.confirmsbmt').html('<span style="font-size:16px;" class="material-icons spin">settings</span>');
theform.find('.submitform').addClass('zokaybtn');theform.find('.submitform').removeClass('submitform');
	//check image base64
if(theform.find('.imb64').length){var imageData=$('.image-editor').cropit('export',{type:'image/jpeg'});$('.imb64').val(imageData);}
	//submit
$.ajax({url:loc,method:'POST',dataType:'json',timeout:120000,data:theform.serialize(),
success:function(response){theform.find('.zokaybtn').addClass('submitform');theform.find('.submitform').html(submitdeftxt);
if(response.hasOwnProperty('resetform')){theform[0].reset();}
for(let key in response){if(response.hasOwnProperty(key)){try{window[key](response[key]);}catch(e){}}}},
error:function(){messageinfo({0:{'msg':'Connection failed. Please try again.','type':'info','action':'okay'}});theform.find('.zokaybtn').addClass('submitform');
theform.find('.submitform').html(submitdeftxt);}})}}

//sequential fadein
function cfadeIn(el,time){return new Promise(function(resolve,reject){try{let last=+new Date();
let tick=function(){el.style.opacity=+el.style.opacity+(new Date()-last)/time;last=+new Date();
if(+el.style.opacity<1){(window.requestAnimationFrame&&requestAnimationFrame(tick))||setTimeout(tick,16);}else{resolve();}};tick();
}catch(e){resolve();}})}

//alert
function messageinfo(msg){
for(let key in msg){$('body').append('<div class="msgholder" style="z-index:1000;transition:.3s ease-out all;">'+
'<div class="cstdialogcover"></div><div class="cstdialog alertmsgholder"><div style="text-align:center;padding:8px;">'+msg[key]['msg']+'</div>'+
'<div style="position:absolute;bottom:0;display:block;text-align:right;width:inherit;" class="msgactionbar"><span class="msgclose '+msg[key]['action']+'">'+
msg[key]['action'].charAt(0).toUpperCase()+msg[key]['action'].slice(1)+'</span></div></div></div>');}
setTimeout(function(){$('.alertmsgholder').css({'width':'calc(100vw - 96px)','left':'32px','height':'120px','opacity':'1','top':'calc(50% - 80px)'});
$('.cstdialogcover').css({'opacity':'.4'})},200);}

//toast
function toastinfo(msg){
for(let key in msg){$('body').append('<div class="csttoast">'+msg[key]['msg']+'<span class="cstcommand csttoastclose" data-cmd="'+msg[key]['action']+'" data-args="">'+msg[key]['action'].toUpperCase()+'</span></div>');}
setTimeout(function(){$('.csttoast').css({'opacity':'1'});},200);}
//save to localstorage
function localstore(data){for(let key in data){if(typeof data[key]==='object'&&data[key]!==null){localStorage.setItem(key,JSON.stringify(data[key]));}
else{if(data[key]=='cstcmdremove'){localStorage.removeItem(key);}else{localStorage.setItem(key,data[key]);}}}}

//init login
function initlogin(){xdialogs();localStorage.removeItem('authing');
$('.appcontent').append('<div class="cstdialogcover1"></div><div class="cstdialog initloginn"><form autocomplete="off" class="ajaxform">'+
'<div style="width:calc(100% - 64px);margin:16px;" class="materialgroup"><input name="initlogintel" class="inittel" type="tel" required><label>Your phone number</label></div>'+
'<div class="clear"></div><div class="buttongroup"><span style="margin:0px;" class="appbutton ripple submitform">Login</span><div class="clear"></div></div><div class="clear"></div></form></div>');
setTimeout(function(){$('.initloginn').css({'width':'calc(100vw - 96px)','left':'32px','height':'130','opacity':'1','top':'calc(50% - 80px)'});$('.cstdialogcover1').css({'opacity':'.4'})},200);}

//otp confirmation
function confirmcode(ph){xdialogs();localStorage.setItem('authing',ph.authing);
$('.appcontent').append('<div class="cstdialogcover1"></div><div class="cstdialog initloginn">'+
'<form autocomplete="off" class="ajaxform"><input name="logintel" type="text" value="'+ph.authing+'" style="display:none;" required>'+
'<div style="width:calc(100% - 64px);margin:16px;" class="materialgroup"><input name="otpcode" type="number" required><label>OTP code</label></div>'+
'<div class="clear"></div><div class="buttongroup"><span style="margin:0px;" class="appbutton ripple submitform">Submit</span>'+
'<span style="margin:0px;" class="appbutton ripple restartlogin secondary">Try again</span><div class="clear"></div></div><div class="clear"></div></form></div>');
setTimeout(function(){$('.initloginn').css({'width':'calc(100vw - 96px)','left':'32px','height':'180','opacity':'1','top':'calc(50% - 100px)'});$('.cstdialogcover1').css({'opacity':'.4'})},200);}

//log out
function logoutapp(){for(let k in localStorage){if(localStorage.hasOwnProperty(k)&&!['appcss','appcsst','appjs','appjst'].includes(k)){localStorage.removeItem(k);}}
let a=setInterval(function(){$('.csttoast').remove();if(localStorage.getItem('otpreguser')==null){clearInterval(a);setTimeout(function(){init('intropage');
toastinfo({0:{'msg':'Logged out','type':'info','action':'okay'}});},200);}},50);}

//remove dialogs
function xdialogs(){$('.cstdialog,.cstdialogcover,.cstdialogcover1,.msgholder').remove();}

//run scripts
function runscript(data){for(let key in data){try{eval(atob(data[key]));}catch(e){}}}

//add styles
function addstyles(data){for(let key in data){
try{let sta=document.createElement('style');sta.setAttribute('type','text/css');sta.innerHTML=atob(data[key]);document.head.appendChild(sta);}catch(e){}}}

//reload
function reloadapp(){window.location.reload();}

//APP FUNCTIONS END

//$('body').on('contextmenu','.nocontext',function(e){e.preventDefault();});
$('body').on('keydown','.ajaxform input',function(e){if(e.which==13){$('input').blur();$(this).closest('form').submit();return false;}})
$('body').on('click','.submitform',function(){$('input').blur();$(this).closest('form').submit();})
$('body').on('submit','.ajaxform',function(e){ajaxSubmit(e,$(this));})
$('body').on('click','.cstcommand',function(){var cmd=$(this).data('cmd');var args=$(this).data('args');try{window[cmd](args);}catch(e){}})
$('body').on('click','.csttoastclose',function(){t=this;$(this).closest('.csttoast').css({'opacity':'0'});setTimeout(function(){$(t).closest('.csttoast').remove();},300);})
$('body').on('click','.msgclose',function(){t=this;$(this).closest('.msgholder').css({'opacity':'0'});
$(this).closest('.cstdialog').css({'height':'80px','left':'50px','width':'calc(100vw - 136px)','top':'calc(50% - 70px)'});setTimeout(function(){$(t).closest('.msgholder').remove();},300);})
$('body').on('click','.cstdialogcover1',function(){$('.cstdialog,.cstdialogcover1,.cstdialogcover').css({'opacity':'0'});setTimeout(function(){$('.cstdialog,.cstdialogcover1,.cstdialogcover').remove();},300);})
$('body').on('click','.goback',function(){window.history.back();})
$('body').on('click','.logoutapp',function(){ajaxReq('POST','Logging out...',{logoutdevice:'this'});})
$('body').on('touchstart','.appview',function(e){s=e.changedTouches[0].screenX;});
$('body').on('touchend','.appview',function(e){e=e.changedTouches[0].screenX;
if(e>s+100){if(localStorage.getItem('lastpage')!='intropage'){window.history.back();}} if(s>e+100){window.history.forward();}}); 
$('body').on('click','.gotopage',function(){l=this;setTimeout(function(){route(l.closest('.appview').getAttribute('data-view'),l.getAttribute('data-page'));},100);});
$('body').on('click','.initlogin',function(){if(localStorage.getItem('authing')==null){initlogin();}else{confirmcode({authing:localStorage.getItem('authing')});
messageinfo({0:{'msg':'We sent an OTP code to '+localStorage.getItem('authing')+'. Please enter it to login or tap \'Try again\'','type':'info','action':'okay'}});}})
$('body').on('click','.restartlogin',function(){initlogin();})
window.onpopstate=function(e){if($('.cstdialogcover,.cstdialogcover1').length){e.preventDefault;$('.cstdialog,.cstdialogcover,.cstdialogcover1').css({'opacity':'0'});
setTimeout(function(){xdialogs();},300);}else{if(window.location.hash){let p=window.location.hash.substring(1);route('back',p);}else{route('back','intropage');}}}

//init when ready
document.addEventListener('DOMContentLoaded',init(),false);



