
<template>
    <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-5 text-center" style="margin-top:20px;margin-bottom:20px;">
            <img src="@/assets/logo-transparent.png" class="img-fluid"  style="max-width:180px" />
         </div>
         <div class="col-md-12"></div>
         <div class="col-md-5 text-center" style="font-size:16px;margin-top:20px;margin-bottom:20px;">
           Sumate a la comunidad y hacé más eficiente tu trabajo legal
         </div>
         <div class="col-md-12"></div>
  
         <div class="col-md-5" style="margin-top:20px;margin-bottom:20px;">
           <form @submit.prevent="save()"> 
              <div class="form-group"> 
               <input type="email" class="form-control" placeholder="Ingresa tu direccion de E-Mail"  v-model="data.email"  required="true" />
             </div> 
  
             <div class="form-group" style="margin-top:20px;margin-bottom:20px;">
              <button type="submit" class="btn btn-primary col-12" style="width:120px;position:relative;width:100%;height:45px">Recuperar contraseña</button>
            </div>
  
           </form>
         </div>
         
         <!-- <div class="col-md-12"></div>
         <div class="col-md-5" style="margin-top:20px;margin-bottom:20px;height:1px;background:#D3D3D3"></div>
         <div class="col-md-12"></div>
  
         <div class="col-md-5">
           <div class="form-group" style="margin-top:20px;margin-bottom:20px;">
              <button type="submit" class="btn btn-primary col-12 btn-social "  >Registrarse con Google</button>
           </div>
           <div class="form-group" style="margin-top:20px;margin-bottom:20px;">
              <button type="submit" class="btn btn-primary col-12 btn-social " >Registrarse con Facebook</button>
           </div>
         </div> -->
  
  
          <div class="col-md-12"></div>
  
          <div class="col-md-5">
           <div class="form-group text-center" style="margin-top:20px;margin-bottom:20px;">
              ¿Ya tenes cuenta? <RouterLink to="/login">Iniciar sesion</RouterLink> 
           </div>
         </div>
  
  
  
      </div>
    </div>
  </template>
  
  <style scoped>
    .form-control {
      background: transparent;
      border: 1px solid #b8b8b8;
      height: 45px;
      max-height: 45px;
      min-height: 45px;
  }
  .btn-social {
         width: 100%;
      position: relative;
      height: 45px;
      background: transparent;
      color: #2b44ff;
      border: 1px solid #2b44ff;
      font-weight: 500;
  }
  
  a {
      -webkit-transition: color 0.2s linear, background 0.2s linear, border-color 0.2s linear, text-shadow 0.2s linear;
      transition: color 0.2s linear, background 0.2s linear, border-color 0.2s linear, text-shadow 0.2s linear;
      -webkit-text-decoration: none;
      text-decoration: none; 
      font-weight: bold;
      color: rgb(43, 68, 255);
  }
  ::-webkit-scrollbar {
      width: 5px;
      /* Remove scrollbar space */
      background: #DDDDDD;
      /* Optional: just make scrollbar invisible */
      visibility: hidden;
  }
  /* Optional: show position indicator in red */
  
  ::-webkit-scrollbar-thumb {
      background: #A9A9A9;
      /*visibility: hidden;*/
  }
  </style> 
  <style>
  @import   '@/assets/platform.css';
   
  </style>
  <script setup>
   import router from '@/router/index.js';
  </script>
  
  
  <script>
  import * as EmailValidator from 'email-validator';
   
   
   export default {
    data() {
      return {
        data : {
          email: null,
          password: null,
          firstname: null,
          lastname: null,
        },
        loading_submit:false,
        endpoint: window.ENDPOINT + '/users/lost/password/token',
      }
    },
      created() {
      
      },
      mounted() { 
      },
  
  
    methods: { 
      save() {
              this.$Progress.start();
  
          if(!EmailValidator.validate(this.data.email)) {
          this.$toast.show(
                "E-mail incorrecto.",
                  {
                     position: "bottom-right" 
                  }
                )
           this.$Progress.finish();  
             return;
        }
  
   
          this.loading_submit = true;
          const requestOptions = {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               }, 
               body: JSON.stringify({
                  email:'robertoadrianpalestini@yahoo.com.ar'
               })
           };
           fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
            this.$toast.success(
                "Enviaremos un correo electronico con las instrucciones para recuperar tu contraseña",
                  {
                     position: "bottom-right" 
                  }
                ) 
  
            this.$Progress.finish();  
              
           }) 
      }, 
      pause() {
         
      },
      hover() {
         
      } 
    }
  }
   
  </script>