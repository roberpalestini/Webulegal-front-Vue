
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5 text-center" style="margin-top:20px;margin-bottom:20px;">
        <img src="@/assets/Logocompleto.svg" alt="" style="max-width: 270px" class="img-fluid" />
      </div>
      <div class="col-md-12"></div>
      <div class="col-md-5 text-center" style="font-size:16px;margin-top:20px;margin-bottom:20px;">
        Sumate a la comunidad y hacé más eficiente tu trabajo legal
      </div>
      <div class="col-md-12"></div>

      <div class="col-md-5" style="margin-top:20px;margin-bottom:20px;">
        <form @submit.prevent="save()">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Nombre" v-model="data.firstname" required="true" />
          </div>

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Apellido" v-model="data.lastname" required="true" />
          </div>

          <div class="form-group">
            <input type="email" class="form-control" placeholder="E-Mail" v-model="data.email" required="true" />
          </div>

          <div class="form-group">
            <input type="password" class="form-control" placeholder="Contraseña" v-model="data.password"
              required="true" />
          </div>

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Telefono (Opcional)" v-model="data.phone" />
          </div>

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Codigo promocional (Opcional)"
              v-model="data.code_promotional" />
          </div>



          <div class="form-group" style="margin-top:20px;margin-bottom:20px;">
            <p>Al ingresar aceptás los <a href='assets/TÉRMINOS-Y-CONDICIONES-GENERALES-WEBU.pdf'
                target="_blank">términos y
                condiciones</a> y la <a href="assets/Politica-de-Privacidad-Webu.pdf" target="_blank">política de
                privacidad</a>.
            </p>
          </div>

          <div class="form-group" style="margin-top:20px;margin-bottom:20px;">
            <button type="submit" class="btn btn-primary col-12"
              style="width:120px;position:relative;width:100%;height:45px">Registrarse</button>
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

        <div class="form-group" style="margin-top:20px;margin-bottom:20px;    text-align: center;">
          <v-facebook-login app-id="394916662616132" @login="callbackFacebook"
            :login-options="{ scope: 'email,user_likes' }" @sdk-init="handleSdkInit" style="       transition: background-color 0.25s ease-in-out 0s;
    
    width: 230px;
    font-size: 13px;
    border-radius: 30px;
    height: 40px;
    font-weight: 600;
    text-align: right;
    /* background: rgb(59, 89, 152); */" sdk-locale="ar_AR" :slot="{ login: 'test' }">
            <template v-slot:login>
              Continuar con Facebook
              <!-- content for the header slot -->
            </template>


          </v-facebook-login>

          <!-- <button type="submit" class="btn btn-primary col-12 btn-social " >Iniciar sesion con Facebook</button> -->
        </div>
        <div class="form-group" style="margin-top:20px;margin-bottom:20px;">
          <GoogleLogin :callback="callbackGoogle" :buttonConfig="buttonConfig" />
          <!-- <button type="submit" class="btn btn-primary col-12 btn-social "  >Iniciar sesion con Google</button> -->
        </div>
      </div>



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


input[type=email],
input[type=text],
input[type=password] {
  width: 98%;
  height: 40px;
  margin: auto;
  border: 1px solid #999;
  border-radius: 0;
  -webkit-appearance: none;
}



.g-btn-wrapper {
  display: inline-block;
  width: 100%;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold !important;
}

.nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-BPrWId {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: "Google Sans", arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold !important;
}

#container {
  width: 100% !important;
}

.haAclf {
  width: 100% !important;
}

.v-facebook-login {
  transition: background-color 0.25s ease-in-out 0s;
  width: 100%;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: background-color .218s, border-color .218s;
  transition: background-color .218s, border-color .218s;
  -webkit-user-select: none;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dadce0;
  color: #3c4043;
  cursor: pointer;
  font-family: "Google Sans", arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  width: 100%;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold !important;
}

.logo {
  padding: 0px 0px 0px 50px;
  position: absolute;
  left: 0;
  top: 0;
  background: rgb(255, 255, 255);
  top: 6px;
  background: url(https://cdn.icon-icons.com/icons2/1584/PNG/128/3721668-facebook-flat_108056.png);
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 4px;
}

.S9gUrf-YoZ4jf {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 100%;
}
</style> 

<style>
@import '@/assets/platform.css';
</style>


<style scoped>
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
</style> 
<style>
@import '@/assets/platform.css';


.flex-center-vertical {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.margin-top {
  margin-top: 150px;
}

.margin-bottom {
  margin-bottom: 400px;
}

.margin-bottom-min {
  margin-bottom: 100px;
}

html body {
  overflow-x: hidden;
}

@media screen and (max-width: 858px) {
  .menu-desktop-landingpage {
    display: none !important;
  }
}

@media screen and (max-width: 1280px) {
  .link {
    font-size: 14px;
  }

  .link2 {
    font-size: 13px;
  }

  .link3 {
    font-size: 13px;
  }

  .menu_items li a {
    padding: 0px;
    display: block;
  }

  .btn-regis {
    width: 170px;
    height: 45px;
  }


}

.menu_items li a {
  padding: 0px;
  display: block;
}

.btn-regis {
  margin-right: 15px;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.menu_items {
  display: flex;
  list-style: none;
  margin-right: 0px !important;
}

.g-btn-wrapper {
  display: inline-block;
  width: 100%;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold !important;
}

.nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-BPrWId {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: "Google Sans", arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold !important;
}

#container {
  width: 100% !important;
}

.haAclf {
  width: 100% !important;
}

.v-facebook-login {
  transition: background-color 0.25s ease-in-out 0s;
  width: 100%;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: background-color .218s, border-color .218s;
  transition: background-color .218s, border-color .218s;
  -webkit-user-select: none;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dadce0;
  color: #3c4043;
  cursor: pointer;
  font-family: "Google Sans", arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  width: 100%;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold !important;
}

.logo {
  padding: 0px 0px 0px 50px;
  position: absolute;
  left: 0;
  top: 0;
  background: rgb(255, 255, 255);
  top: 6px;
  background: url(https://cdn.icon-icons.com/icons2/1584/PNG/128/3721668-facebook-flat_108056.png);
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 4px;
  border-radius: 30px;
  width: 25px;
  height: 25px;
  padding: 0;
  margin: 0;
  margin-left: 10px;
}

.S9gUrf-YoZ4jf {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 100%;
}
</style>
<script setup>
import router from '@/router/index.js';
</script>


<script>
import * as EmailValidator from 'email-validator';

import { decodeCredential } from "vue3-google-login"

import VFacebookLogin from 'vue-facebook-login-component-next'



export default {
  components: {
    VFacebookLogin,
  },
  data() {
    return {
      buttonConfig: {
        theme: 'outline',
        shape: 'circle',
        locale: 'es',
        text: "continue_with"
      },
      scopeFB: [{ scope: 'email' }, { scope: 'name' }],
      endpointGoogle: window.ENDPOINT + '/users/login/google',
      endpointFacebook: window.ENDPOINT + '/users/login/facebook',
      sdkFB: null,

      data: {
        email: null,
        password: null,
        firstname: null,
        lastname: null,
        phone: null,
        code_promotional: null
      },
      loading_submit: false,
      endpoint: window.ENDPOINT + '/users/register',
    }
  },
  created() {

  },
  mounted() {
  },


  methods: {
    handleSdkInit({ FB, scope }) {
      this.sdkFB = FB;
      // $('.v-facebook-login span').html('Acceder con facebook')
    },
    callbackFacebook(response) {

      var test = this.submitFacebook;

      this.sdkFB.api('/me?fields=id,name,email', function (dataUser) {
        console.log(response, ' data me ')
        console.log('Welcome, ' + response.name + "!");
        console.log('Your email id is : ' + response.email);
        test(response, dataUser)

      });


    },
    callbackGoogle(response) {

      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData, response)
      this.submitGoogle(response, userData);

    },
    submitGoogle(response, data) {
      this.$Progress.start();
      this.loading_submit = true;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: response,
          data: data
        })
      };
      fetch(this.endpointGoogle, requestOptions).then(response => response.json()).then((data) => {

        if (data.error) {
          return;
        }

        this.$Progress.finish();
        console.log('test', data)
        localStorage.setItem('auth', data.auth);
        localStorage.setItem('user', JSON.stringify(data));
        if (this.$route.query.rel) {
          window.location.href = this.$route.query.rel
          return;
        }

        router.push('/platform/dashboard')

        this.$Progress.finish();

      })
    },
    submitFacebook(response, data) {
      this.$Progress.start();
      this.loading_submit = true;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: response,
          data: data
        })
      };
      fetch(this.endpointFacebook, requestOptions).then(response => response.json()).then((data) => {

        if (data.error) {
          return;
        }

        this.$Progress.finish();
        console.log('test', data)
        localStorage.setItem('auth', data.auth);
        localStorage.setItem('user', JSON.stringify(data));
        if (this.$route.query.rel) {
          window.location.href = this.$route.query.rel
          return;
        }

        router.push('/platform/dashboard')

        this.$Progress.finish();

      })
    },
    save() {
      this.$Progress.start();

      if (!EmailValidator.validate(this.data.email)) {
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
          email: this.data.email,
          password: this.data.password,
          firstname: this.data.firstname,
          lastname: this.data.lastname,
          phone: this.data.phone,
          code_promotional: this.data.code_promotional,
        })
      };
      fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {


        if (data.error) {

          this.$toast.show(
            "E-Mail no disponible..",
            {
              position: "bottom-right"
            }
          )


        } else {
          this.$toast.success(
            "Gracias por registrarte , ya puedes iniciar sesion.",
            {
              position: "bottom-right"
            }
          )


          if (this.$route.query.rel) {
            this.$router.push({
              name: 'login',
              query: {
                rel: this.$route.query.rel
              }
            })
            return;
          }


          this.$router.push('/login')
        }

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