import{h as P,i as g,m as w,b as k,_ as V,r as h,o as m,g as L,w as S,a as e,d,j as y,l as N,v as I,c as _,n as M,t as r,F as v,p as O,f as c}from"./index-cTSn2okr.js";import{l as T}from"./loadingStore-6qC7Va1J.js";import{P as U}from"./PageC-3QNLfm4c.js";const C=P("orderModalDefineStore",{state:()=>({isShow:!1,tempProduct:{user:{},products:{}},productsId:[]})}),l=C(),i=T(),$=P("ordersDefineStore",{state:()=>({orders:[],pagination:{},order:{}}),actions:{getOrders(s=1){i.isLoading=!0;const t=`https://vue3-course-api.hexschool.io//v2/api/rongapi/admin/orders?page=${s}`;g.get(t).then(n=>{i.isLoading=!1,n.data.success?(this.orders=n.data.orders,this.pagination=n.data.pagination):this.toast("error","請重新登入")}).catch(()=>this.toast("error","資料取得失敗，請重新登入"))},isPhone(s){return/^(09)[0-9]{8}$/.test(s)?!0:"需要正確的電話號碼"},sortNumber(s){this.orders.sort((t,n)=>t[s]>n[s]?1:-1)},getOrder(s){l.isShow=!0,this.order=s,l.tempProduct={...s},l.productsId=this.orders.filter(t=>t.id===l.tempProduct.id),l.productsId=l.productsId[0].products},hideModal(){l.isShow=!1},updateOrder(){i.isLoading=!0;const s=`https://vue3-course-api.hexschool.io//v2/api/rongapi/admin/order/${l.tempProduct.id}`;delete l.tempProduct.id,g.put(s,{data:l.tempProduct}).then(t=>{i.isLoading=!1,t.data.success?(this.toast("success","上傳成功"),this.getOrders(),i.isLoading=!1,l.isShow=!1):this.toast("error","上傳失敗")}).catch(()=>this.toast("error","上傳失敗"))},removeOrder(s){i.isLoading=!0;const t=`https://vue3-course-api.hexschool.io/api/rongapi/admin/order/${s}`;this.alert().then(n=>{n.isConfirmed&&g.delete(t).then(f=>{i.isLoading=!1,f.data.success?(this.toast("success","刪除成功"),this.getOrders()):this.toast("error","刪除失敗")}).catch(()=>this.toast("error","刪除失敗"))})}}}),F={inject:["date"],methods:{...w($,["hideModal","updateOrder","isPhone"])},computed:{...k(C,["isShow","tempProduct","productsId"])}},j={class:"modal-dialog modal-dialog-centered modal-dialog-scrollable"},B={class:"modal-content"},E={class:"modal-header"},q=e("ul",{class:"nav nav-pills",id:"pills-tab",role:"tablist"},[e("li",{class:"nav-item",role:"presentation"},[e("button",{class:"nav-link active",id:"pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#pills-home",type:"button",role:"tab","aria-controls":"pills-home","aria-selected":"true"}," 訂單內容 ")]),e("li",{class:"nav-item",role:"presentation"},[e("button",{class:"nav-link",id:"pills-contact-tab","data-bs-toggle":"pill","data-bs-target":"#pills-contact",type:"button",role:"tab","aria-controls":"pills-contact","aria-selected":"false"}," 商品內容 ")])],-1),D={class:"modal-body"},H={class:"container"},A={class:"tab-content",id:"pills-tabContent"},z={class:"tab-pane fade show active",id:"pills-home",role:"tabpanel","aria-labelledby":"pills-home-tab"},X={class:"row"},G={class:"mb-3 col-md-6"},J=e("label",{for:"name",class:"form-label"},[c("姓名"),e("span",{class:"text-danger"},"*")],-1),K={class:"mb-3 col-md-6"},Q=e("label",{for:"phone",class:"form-label"},[c("電話"),e("span",{class:"text-danger"},"*")],-1),R={class:"row"},W={class:"mb-3 col-md-6"},Y=e("label",{for:"email",class:"form-label"},[c("EMAIL"),e("span",{class:"text-danger"},"*")],-1),Z={class:"mb-3 col-md-6"},ee=e("label",{for:"create_at",class:"form-label"},[c("建立時間"),e("span",{class:"text-danger"},"*")],-1),se=["value"],te={class:"mb-3"},oe=e("label",{for:"address",class:"form-label"},[c("地址"),e("span",{class:"text-danger"},"*")],-1),ae={class:"mb-3"},le=e("label",{for:"message",class:"form-label"},"留言",-1),de={class:"mb-3"},ne={class:"form-check"},re=e("label",{class:"form-check-label",for:"is_enabled"},"是否已付款",-1),ie={class:"tab-pane fade",id:"pills-contact",role:"tabpanel","aria-labelledby":"pills-contact-tab"},ce={class:"col"},ue=["src"],pe={class:"col"},me={class:"pt-4 pt-lg-0"},he=["innerHTML"],_e=["innerHTML"],be=e("div",{class:"modal-footer border-0 p-0"},[e("button",{type:"submit",class:"btn btn-primary border-0 border-top w-100 m-0"}," 確認 ")],-1);function fe(s,t,n,f,x,b){const u=h("VField"),p=h("ErrorMessage"),a=h("VForm");return m(),L(a,{onSubmit:s.updateOrder},{default:S(()=>[e("div",{class:O(["modal",{"d-block":s.isShow}]),tabindex:"-1"},[e("div",j,[e("div",B,[e("div",E,[q,e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:t[0]||(t[0]=(...o)=>s.hideModal&&s.hideModal(...o))})]),e("div",D,[e("div",H,[e("div",A,[e("div",z,[e("div",X,[e("div",G,[J,d(u,{id:"name",name:"姓名",type:"text",rules:"required",class:"form-control",placeholder:"請輸入收件者姓名",modelValue:s.tempProduct.user.name,"onUpdate:modelValue":t[1]||(t[1]=o=>s.tempProduct.user.name=o)},null,8,["modelValue"]),d(p,{class:"text-danger",name:"姓名"})]),e("div",K,[Q,d(u,{id:"phone",name:"電話",type:"text",rules:s.isPhone,class:"form-control",placeholder:"請輸入收件者電話",modelValue:s.tempProduct.user.tel,"onUpdate:modelValue":t[2]||(t[2]=o=>s.tempProduct.user.tel=o)},null,8,["rules","modelValue"]),d(p,{class:"text-danger",name:"電話"})])]),e("div",R,[e("div",W,[Y,d(u,{id:"email",name:"email",type:"text",rules:"required|email",class:"form-control",placeholder:"請輸入收件者EMAIL",modelValue:s.tempProduct.user.email,"onUpdate:modelValue":t[3]||(t[3]=o=>s.tempProduct.user.email=o)},null,8,["modelValue"]),d(p,{class:"text-danger",name:"email"})]),e("div",Z,[ee,e("input",{id:"create_at",name:"create_at",type:"date",class:"form-control opacity-50",value:b.date(s.tempProduct.create_at),disabled:""},null,8,se)])]),e("div",te,[oe,d(u,{id:"address",name:"地址",type:"text",rules:"required",class:"form-control",placeholder:"請輸入收件者地址",modelValue:s.tempProduct.user.address,"onUpdate:modelValue":t[4]||(t[4]=o=>s.tempProduct.user.address=o)},null,8,["modelValue"]),d(p,{class:"text-danger",name:"地址"})]),e("div",ae,[le,y(e("textarea",{id:"message",type:"text",name:"message",class:"form-control",placeholder:"請輸入想對廠商說的話","onUpdate:modelValue":t[5]||(t[5]=o=>s.tempProduct.message=o)},`\r
                    `,512),[[N,s.tempProduct.message]])]),e("div",de,[e("div",ne,[y(e("input",{id:"is_enabled",name:"is_enabled",class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=o=>s.tempProduct.is_paid=o),"true-value":!0,"false-value":!1},null,512),[[I,s.tempProduct.is_paid]]),re])])]),e("div",ie,[(m(!0),_(v,null,M(s.productsId,o=>(m(),_("div",{class:"row row-cols-1 row-cols-lg-2 py-3",key:o.id},[e("div",ce,[e("img",{class:"img-fluid mt-3",src:o.product.imageUrl,alt:"主圖"},null,8,ue)]),e("div",pe,[e("h5",me,r(o.product.title),1),e("p",null,r(o.qty)+" X NT$"+r(o.product.price),1),e("p",{innerHTML:o.product.content},null,8,he),e("p",{innerHTML:o.product.description},null,8,_e)])]))),128))])])])]),be])])],2)]),_:1},8,["onSubmit"])}const ge=V(F,[["render",fe]]),ve={inject:["date","currency"],components:{OrderModal:ge,PageC:U},methods:{...w($,["getOrders","sortNumber","getOrder","removeOrder"])},computed:{...k($,["orders","pagination"])},async created(){await this.getOrders()}},$e={class:"d-flex justify-content-between align-items-end"},ye=e("h2",null,"訂單",-1),Pe={class:"text-end"},we={class:"p-0"},ke={class:"table-responsive text-nowrap scrollBar-dark"},Ve={class:"table mt-4"},Me={class:"table-dark"},Oe=e("span",{class:"material-symbols-outlined fs-6"}," sort ",-1),Ce=e("th",null,"姓名",-1),xe=e("span",{class:"material-symbols-outlined fs-6"}," sort ",-1),Le=e("th",null,"備註",-1),Se=e("th",null,"操作",-1),Ne={class:"btn-group"},Ie=e("span",{class:"material-symbols-outlined fs-6"},"payments",-1),Te=[Ie],Ue=["href"],Fe=e("span",{class:"material-symbols-outlined fs-6"},"map",-1),je=[Fe],Be=["href"],Ee=e("span",{class:"material-symbols-outlined fs-6"},"call",-1),qe=[Ee],De=["href"],He=e("span",{class:"material-symbols-outlined fs-6"},"email",-1),Ae=[He],ze=["onClick"],Xe=e("span",{class:"material-symbols-outlined fs-6"},"edit",-1),Ge=[Xe],Je=["onClick"],Ke=e("span",{class:"material-symbols-outlined fs-6"},"delete",-1),Qe=[Ke],Re={class:"d-flex justify-content-center"};function We(s,t,n,f,x,b){const u=h("PageC"),p=h("OrderModal");return m(),_(v,null,[e("div",$e,[ye,e("div",Pe,[e("p",we,"總 "+r(s.orders.length)+" 筆數",1)])]),e("div",ke,[e("table",Ve,[e("thead",null,[e("tr",Me,[e("th",null,[e("button",{class:"btn p-0 m-0 text-light",type:"button",onClick:t[0]||(t[0]=a=>s.sortNumber("create_at"))},[c(" 建立時間"),Oe])]),Ce,e("th",null,[e("button",{class:"btn p-0 m-0 text-light",type:"button",onClick:t[1]||(t[1]=a=>s.sortNumber("total"))},[c(" 金額"),xe])]),Le,Se])]),e("tbody",null,[(m(!0),_(v,null,M(s.orders,a=>(m(),_("tr",{key:a.id},[e("td",null,r(b.date(a.create_at)),1),e("td",null,r(a.user.name),1),e("td",null,"NT$"+r(b.currency(a.total)),1),e("td",null,r(a.message===void 0?"無":a.message),1),e("td",null,[e("div",Ne,[e("button",{type:"button",class:O(["btn btn-outline-primary d-flex pe-none",{"btn-secondary":a.is_paid}])},Te,2),e("a",{href:`https://www.google.com/maps/place/${a.user.address}`,class:"btn btn-outline-primary d-flex",target:"_"},je,8,Ue),e("a",{href:`tel:${a.user.tel}`,class:"btn btn-outline-primary d-flex"},qe,8,Be),e("a",{href:`mailto:${a.user.email}`,class:"btn btn-outline-primary d-flex"},Ae,8,De),e("button",{type:"button",class:"btn btn-outline-primary d-flex",onClick:o=>s.getOrder(a)},Ge,8,ze),e("button",{type:"button",class:"btn btn-outline-danger d-flex",onClick:o=>s.removeOrder(a.id)},Qe,8,Je)])])]))),128))])])]),e("div",Re,[d(u,{pagination:s.pagination,onPage:s.getOrders},null,8,["pagination","onPage"])]),d(p)],64)}const ss=V(ve,[["render",We]]);export{ss as default};
