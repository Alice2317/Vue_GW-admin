import{h as r,i}from"./index-cTSn2okr.js";import{l as a}from"./loadingStore-6qC7Va1J.js";const s=a(),u=r("memberDefineStore",{state:()=>({user:{username:"",password:""}}),actions:{isPassword(){return/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(this.user.password)?!0:"輸入錯誤"},showPwd(){const e=document.querySelector(".eye"),t=document.querySelector(".pwd input");e.textContent==="visibility"?(e.textContent="visibility_off",t.setAttribute("type","text")):(e.textContent="visibility",t.setAttribute("type","password"))},signIn(){s.isLoading=!0,i.post("https://vue3-course-api.hexschool.io//v2/admin/signin",this.user).then(t=>{t.data.success?(document.cookie=`token=${t.data.token}; expires=${new Date(t.data.expired)};`,this.router.replace({name:"products"}),s.isLoading=!1,this.user={username:"",password:""}):this.toast("error","失敗，請重新登入")}).catch(()=>this.toast("error","失敗，請重新登入"))},logout(){s.isLoading=!0,i.post("https://vue3-course-api.hexschool.io//v2/logout").then(t=>{if(t.data.success){this.router.replace("/");const o=new Date;o.setMinutes(o.getMinutes()-480).toLocaleString(),document.cookie=`token=; expires=${o}`,s.isLoading=!1}else this.toast("error","失敗，請重新整理後再次操作")}).catch(()=>this.toast("error","失敗，請重新整理後再次操作"))}}});export{u as m};
