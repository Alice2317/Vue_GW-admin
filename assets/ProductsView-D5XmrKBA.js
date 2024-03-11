import{h as U,i as _,m as v,b as w,_ as C,r as g,o as u,g as E,w as I,a as t,d as l,j as k,v as q,f as i,c as h,k as V,l as N,n as S,F as P,p as D,t as b}from"./index-30_fELIg.js";import{l as F}from"./loadingStore-4v_CStFw.js";import{P as L}from"./PageC-tVi07o6H.js";const $=U("productModalDefineStore",{state:()=>({isShow:!1,tempProduct:{}}),actions:{addImagesUrl(e){e===null?this.toast("error","請填寫圖片連結"):this.tempProduct.imagesUrl.push(e)},uploadImageUrl(){const e=new FormData,s=document.querySelector("#fileInput").files[0];e.append("file-to-upload",s),_.post("https://vue3-course-api.hexschool.io//v2/api/rongapi/admin/upload",e).then(p=>{p.status===200&&(this.tempProduct.imageUrl=p.data.imageUrl,this.toast("success","上傳成功"))}).catch(()=>this.toast("error","上傳失敗"))}}}),d=$(),m=F(),y=U("productsDefineStore",{state:()=>({products:[],pagination:{},sort:[],isEdit:!1}),actions:{getProducts(e=1){m.isLoading=!0;const s=`https://vue3-course-api.hexschool.io//v2/api/rongapi/admin/products?page=${e}`;_.get(s).then(n=>{m.isLoading=!1,n.data.success?(this.products=n.data.products,this.pagination=n.data.pagination):this.toast("error","請重新登入")}).catch(()=>this.toast("error","資料取得失敗，請重新登入"))},sortNumber(e){this.products.sort((s,n)=>s[e]>n[e]?1:-1)},sortPrice(e){this.products.sort((s,n)=>s[e]-n[e])},hideModal(){d.tempProduct={},d.isShow=!1},getProduct(e,s){d.isShow=!0,this.isEdit=e,this.isEdit?(d.tempProduct={...s},d.tempProduct.imagesUrl===void 0&&(d.tempProduct.imagesUrl=[])):d.tempProduct={imagesUrl:[],is_enabled:0,image:""}},updateProduct(){m.isLoading=!0;let e="post",s="https://vue3-course-api.hexschool.io//v2/api/rongapi/admin/product";this.isEdit===!0&&(e="put",s=`https://vue3-course-api.hexschool.io//v2/api/rongapi/admin/product/${d.tempProduct.id}`),delete d.tempProduct.image,_[e](s,{data:d.tempProduct}).then(n=>{m.isLoading=!1,n.data.success?(this.toast("success","上傳成功"),d.isShow=!1,this.getProducts()):this.toast("error","上傳失敗")}).catch(()=>this.toast("error","上傳失敗"))},updateEnabled(e,s){this.isEdit=e,s.is_enabled===1?s.is_enabled=0:s.is_enabled=1,d.tempProduct={...s},this.updateProduct()},removeProduct(e){m.isLoading=!0;const s=`https://vue3-course-api.hexschool.io/api/rongapi/admin/product/${e}`;this.alert().then(n=>{n.isConfirmed&&_.delete(s).then(p=>{m.isLoading=!1,p.data.success?(this.toast("success","刪除成功"),this.getProducts()):this.toast("error","刪除失敗")}).catch(()=>this.toast("error","刪除失敗"))})}}}),j={methods:{...v($,["uploadImageUrl","addImagesUrl"]),...v(y,["hideModal","updateProduct"])},computed:{...w($,["isShow","tempProduct"])}},B={class:"modal d-block",tabindex:"-1"},T={class:"modal-dialog modal-dialog-centered modal-dialog-scrollable"},A={class:"modal-content"},z={class:"modal-header"},G=t("ul",{class:"nav nav-pills",id:"pills-tab",role:"tablist"},[t("li",{class:"nav-item",role:"presentation"},[t("button",{class:"nav-link active",id:"pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#pills-home",type:"button",role:"tab","aria-controls":"pills-home","aria-selected":"true"}," 商品內容 ")]),t("li",{class:"nav-item",role:"presentation"},[t("button",{class:"nav-link",id:"pills-contact-tab","data-bs-toggle":"pill","data-bs-target":"#pills-contact",type:"button",role:"tab","aria-controls":"pills-contact","aria-selected":"false"}," 上傳圖片 ")])],-1),H={class:"modal-body overflow-auto"},J={class:"container"},K={class:"tab-content",id:"pills-tabContent"},O={class:"tab-pane fade show active",id:"pills-home",role:"tabpanel","aria-labelledby":"pills-home-tab"},Q={class:"mb-3"},R=t("label",{for:"title",class:"form-label"},[i("標題"),t("span",{class:"text-danger"},"*")],-1),W={class:"row"},X={class:"mb-3 col-md-6"},Y=t("label",{for:"category",class:"form-label"},[i("分類"),t("span",{class:"text-danger"},"*")],-1),Z={class:"mb-3 col-md-6"},tt=t("label",{for:"unit",class:"form-label"},[i("單位"),t("span",{class:"text-danger"},"*")],-1),et={class:"row"},st={class:"mb-3 col-md-6"},ot=t("label",{for:"origin_price",class:"form-label"},[i("原價"),t("span",{class:"text-danger"},"*")],-1),lt={class:"mb-3 col-md-6"},at=t("label",{for:"price",class:"form-label"},[i("售價"),t("span",{class:"text-danger"},"*")],-1),nt={class:"mb-3"},it=t("label",{for:"description",class:"form-label"},[i("產品描述"),t("span",{class:"text-danger"},"*")],-1),dt={class:"mb-3"},rt=t("label",{for:"content",class:"form-label"},[i("說明內容"),t("span",{class:"text-danger"},"*")],-1),ct={class:"mb-3"},ut={class:"form-check"},pt=t("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),mt={class:"tab-pane fade",id:"pills-contact",role:"tabpanel","aria-labelledby":"pills-contact-tab"},ht=t("p",null,[i("主圖"),t("span",{class:"text-danger"},"*"),i(":")],-1),bt={class:"row"},gt={class:"col col-md-6"},_t={class:"btn btn-outline-dark w-100",for:"fileInput"},ft={class:"col col-md-6"},vt=["src"],Pt={class:"mt-5"},$t=t("p",null,"縮圖:",-1),yt={class:"input-group mt-3"},kt={class:"d-flex overflow-auto"},Vt={class:"card bg-dark text-white rounded-0 border-0"},Ut=["src"],wt={class:"card-img-overlay text-end"},Ct=["onClick"],St=t("div",{class:"modal-footer border-0 p-0"},[t("button",{type:"submit",class:"btn btn-primary border-0 border-top w-100 m-0"}," 確認 ")],-1);function Mt(e,s,n,p,M,f){const r=g("VField"),c=g("ErrorMessage"),a=g("VForm");return e.isShow?(u(),E(a,{key:0,onSubmit:D(e.updateProduct,["prevent"])},{default:I(()=>[t("div",B,[t("div",T,[t("div",A,[t("div",z,[G,t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:s[0]||(s[0]=(...o)=>e.hideModal&&e.hideModal(...o))})]),t("div",H,[t("div",J,[t("div",K,[t("div",O,[t("div",Q,[R,l(r,{id:"title",name:"標題",type:"text",class:"form-control",rules:"required",placeholder:"請輸入標題",modelValue:e.tempProduct.title,"onUpdate:modelValue":s[1]||(s[1]=o=>e.tempProduct.title=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"標題"})]),t("div",W,[t("div",X,[Y,l(r,{id:"category",name:"分類",type:"text",class:"form-control",rules:"required",placeholder:"請輸入分類",modelValue:e.tempProduct.category,"onUpdate:modelValue":s[2]||(s[2]=o=>e.tempProduct.category=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"分類"})]),t("div",Z,[tt,l(r,{id:"unit",name:"單位",type:"text",class:"form-control",placeholder:"請輸入單位",rules:"required",modelValue:e.tempProduct.unit,"onUpdate:modelValue":s[3]||(s[3]=o=>e.tempProduct.unit=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"單位"})])]),t("div",et,[t("div",st,[ot,l(r,{id:"origin_price",name:"原價",type:"number",min:"0",class:"form-control",rules:"required|integer|min_value:1",placeholder:"請輸入原價",modelValue:e.tempProduct.origin_price,"onUpdate:modelValue":s[4]||(s[4]=o=>e.tempProduct.origin_price=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"原價"})]),t("div",lt,[at,l(r,{id:"price",name:"售價",type:"number",min:"0",class:"form-control",rules:"required|integer|min_value:1",placeholder:"請輸入售價",modelValue:e.tempProduct.price,"onUpdate:modelValue":s[5]||(s[5]=o=>e.tempProduct.price=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"售價"})])]),t("div",nt,[it,l(r,{id:"description",type:"text",name:"描述",class:"form-control",rules:"required",as:"textarea",placeholder:"請輸入產品描述",modelValue:e.tempProduct.description,"onUpdate:modelValue":s[6]||(s[6]=o=>e.tempProduct.description=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"描述"})]),t("div",dt,[rt,l(r,{id:"content",type:"text",name:"內容",class:"form-control",placeholder:"請輸入說明內容",as:"textarea",rules:"required",modelValue:e.tempProduct.content,"onUpdate:modelValue":s[7]||(s[7]=o=>e.tempProduct.content=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"內容"})]),t("div",ct,[t("div",ut,[k(t("input",{id:"is_enabled",name:"is_enabled",class:"form-check-input",type:"checkbox","onUpdate:modelValue":s[8]||(s[8]=o=>e.tempProduct.is_enabled=o),"true-value":1,"false-value":0},null,512),[[q,e.tempProduct.is_enabled]]),pt])])]),t("div",mt,[ht,t("div",bt,[t("div",gt,[t("label",_t,[i(" 上傳主圖 "),t("input",{type:"file",class:"form-control d-none",name:"file-to-upload",accept:"image/png,image/jpeg,image/jpg",id:"fileInput",placeholder:"請上傳主圖",onChange:s[9]||(s[9]=(...o)=>e.uploadImageUrl&&e.uploadImageUrl(...o))},null,32)])]),t("div",ft,[l(r,{type:"text",class:"form-control",id:"imageUrl",name:"主圖",rules:"required",placeholder:"輸入主圖連結",modelValue:e.tempProduct.imageUrl,"onUpdate:modelValue":s[10]||(s[10]=o=>e.tempProduct.imageUrl=o)},null,8,["modelValue"]),l(c,{class:"text-danger",name:"主圖"})])]),e.tempProduct.imageUrl?(u(),h("img",{key:0,class:"img-fluid mt-3",src:e.tempProduct.imageUrl,alt:"主圖"},null,8,vt)):V("",!0),t("div",Pt,[$t,t("div",yt,[k(t("input",{type:"text",name:"imagesUrl",id:"imagesUrl",class:"form-control",placeholder:"請輸入縮圖連結","onUpdate:modelValue":s[11]||(s[11]=o=>e.tempProduct.image=o)},null,512),[[N,e.tempProduct.image]]),t("button",{class:"btn btn-outline-dark",type:"button",onClick:s[12]||(s[12]=o=>e.addImagesUrl(e.tempProduct.image))}," 新增 ")]),t("div",kt,[(u(!0),h(P,null,S(e.tempProduct.imagesUrl,(o,x)=>(u(),h("div",{class:"py-3 me-2",key:o.id},[t("div",Vt,[t("img",{class:"card-image",width:"150",src:o,alt:"縮圖"},null,8,Ut),t("div",wt,[t("button",{type:"button",class:"btn-close bg-white position-absolute top-0 end-0","aria-label":"Close",onClick:le=>e.tempProduct.imagesUrl.splice(x,1)},null,8,Ct)])])]))),128))])])])])])]),St])])])]),_:1},8,["onSubmit"])):V("",!0)}const xt=C(j,[["render",Mt]]),Et={inject:["currency"],components:{ProductModal:xt,PageC:L},methods:{...v(y,["getProducts","sortPrice","getProduct","updateProduct","removeProduct","sortNumber","updateEnabled"])},computed:{...w(y,["products","pagination"])},async created(){await this.getProducts()}},It={class:"d-flex justify-content-between align-items-center"},qt={class:"d-flex align-items-center"},Nt=t("h2",null,"產品",-1),Dt=t("span",{class:"material-symbols-outlined"},"add_circle",-1),Ft=[Dt],Lt={class:"table-responsive text-nowrap scrollBar-dark"},jt={class:"table mt-4"},Bt={class:"table-dark"},Tt=t("th",null,"分類",-1),At=t("th",null,"產品名稱",-1),zt=t("span",{class:"material-symbols-outlined fs-6"}," sort ",-1),Gt=t("span",{class:"material-symbols-outlined fs-6"}," sort ",-1),Ht=t("span",{class:"material-symbols-outlined fs-6"}," sort ",-1),Jt=t("th",null,"操作",-1),Kt={class:"form-check form-switch"},Ot=["checked","onChange"],Qt={class:"form-check-label pe-none",for:"flexSwitchCheckDefault"},Rt={class:"btn-group"},Wt=["onClick"],Xt=t("span",{class:"material-symbols-outlined fs-6"},"edit",-1),Yt=[Xt],Zt=["onClick"],te=t("span",{class:"material-symbols-outlined fs-6"},"delete",-1),ee=[te],se={class:"d-flex justify-content-center"};function oe(e,s,n,p,M,f){const r=g("PageC"),c=g("ProductModal");return u(),h(P,null,[t("div",It,[t("div",qt,[Nt,t("button",{type:"button",class:"btn",onClick:s[0]||(s[0]=a=>e.getProduct(!1))},Ft)])]),t("div",Lt,[t("table",jt,[t("thead",null,[t("tr",Bt,[Tt,At,t("th",null,[t("button",{class:"btn p-0 m-0 text-light",type:"button",onClick:s[1]||(s[1]=a=>e.sortPrice("origin_price"))},[i(" 原價"),zt])]),t("th",null,[t("button",{class:"btn p-0 m-0 text-light",type:"button",onClick:s[2]||(s[2]=a=>e.sortPrice("price"))},[i(" 售價"),Gt])]),t("th",null,[t("button",{class:"btn p-0 m-0 text-light",type:"button",onClick:s[3]||(s[3]=a=>e.sortNumber("is_enabled"))},[i(" 是否啟動"),Ht])]),Jt])]),t("tbody",null,[(u(!0),h(P,null,S(e.products,a=>(u(),h("tr",{key:a.id},[t("td",null,b(a.category),1),t("td",null,b(a.title),1),t("td",null,"NT$"+b(f.currency(a.origin_price)),1),t("td",null,"NT$"+b(f.currency(a.price)),1),t("td",null,[t("div",Kt,[t("input",{class:"form-check-input",type:"checkbox",name:"isEnabled",id:"flexSwitchCheckDefault",checked:a.is_enabled,"true-value":1,"false-value":0,onChange:o=>e.updateEnabled(!0,a)},null,40,Ot),t("label",Qt,b(a.is_enabled?"啟動":"未啟動"),1)])]),t("td",null,[t("div",Rt,[t("button",{type:"button",class:"btn btn-outline-primary d-flex",onClick:o=>e.getProduct(!0,a)},Yt,8,Wt),t("button",{type:"button",class:"btn btn-outline-danger d-flex",onClick:o=>e.removeProduct(a.id)},ee,8,Zt)])])]))),128))])])]),t("div",se,[l(r,{pagination:e.pagination,onPage:e.getProducts},null,8,["pagination","onPage"])]),l(c)],64)}const de=C(Et,[["render",oe]]);export{de as default};
