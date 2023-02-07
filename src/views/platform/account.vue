<style>
.activeMode {
    border-radius: 30px;
    font-weight: 600;
    padding: 4px;
    background: #2b44ff !important;
    color: white !important;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
<template>
    <navBar />

    <main>

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;">
                    <columnLeft />
                </div>
                <div class="col-md-10 text-left"
                    style="padding:20px;border:1px solid #E2E2E2;background:white;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;border-bottom:1px solid #E5E5E5">
                    <div class="row ">
                        <div class="col-12 text-left" style="padding-top:20px;padding-bottom:50px;">
                            <a href="@" @click.prevent="$router.go(-1)" style="    margin-right: 20px;"> <img
                                    src="@/assets/flecha-izquierda.svg" style="height:20px;width:20px;" /> </a> <span
                                style="font-weight: 600;
                    color: black;">Mi cuenta</span>
                        </div>

                        <div class="col-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Nombre</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control type-input-2" required="" v-model="user.data.profile.firstname"> 
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="margin-bottom:30px;"></div>



                        <div class="col-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Apellido</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control type-input-2" required="" v-model="user.data.profile.lastname"> 
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="margin-bottom:30px;"></div>



                        <div class="col-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Mail</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="email" class="form-control type-input-2" required="" v-model="user.data.email" disabled="true">
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="margin-bottom:30px;"></div>



                        <div class="col-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Contraseña</label>
                                </div>
                                <div class="col-md-3">
                                    <input :type="type_input_password" class="form-control type-input-2" required="true" :readonly="active_password" v-model="user.data.password"> 
                                </div>
                                <div class="col-md-5">
                                    <button type="submit" class="btn btn-primary"
                                        style="width:auto;position:relative" @click="changePassword()">Cambiar contraseña</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="margin-bottom:30px;"></div>





                        <div class="col-6" v-if="user.data.sucription_pay == false">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Suscripción</label>
                                </div>
                                <div class="col-md-8">
                                    <b>PRUEBA GRATUITA</b>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="margin-bottom:30px;"></div>




                        <div class="col-6" v-if="user.data.sucription_pay == true">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Suscripción</label>
                                </div>
                                <div class="col-md-2">
                                    <b>ACTIVA</b>
                                </div>
                                <div class="col-md-6">
                                    <button type="submit" class="btn btn-primary"
                                        style="width:auto;position:relative" @click="removeSuscriptionModal = true">Dar de baja suscripcion</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="margin-bottom:30px;" v-if="user.data.sucription_pay == true"></div>




                        <div class="col-md-12 text-center" style="margin-top:100px">
                            <button type="submit" class="btn btn-primary"
                                        style="width:auto;position:relative" @click="save()">Guardar cambios</button>
                        </div>







                    </div>
                </div>
            </div>
        </div>
    </main>

























    <div
              style="
                display: flex;
                top: 0px;
                left: 0px;
                right: 0px;
                position: fixed;
                bottom: 0;
                align-content: center;
                justify-content: center;
                align-items: center;
              "
              v-if="removeSuscriptionModal"
            >
              <div
                style="
                  color: rgb(52, 52, 52);
                  width: 355px;
                  right: 180px;
                  font-size: 14px;
                  border-radius: 8px;
                  font-weight: 600;
                  background: #e7e7e7;
                  padding: 15px;
                "
              >
              ¿Estas seguro que querés darle de baja a tu suscripción?
                <div class="col-12 text-right" style="display: flex">
                  <button
                    class="btn btn-primary"
                    style="margin: 5px" 
                    @click="removeSuscription()" 
                  >
                    Si 
                  </button>

                  <button
                    href="#"
                    class="btn btn-primary"
                    style="margin: 5px"
                    @click="removeSuscriptionModal = false"
                  >
                     No 
                  </button>
                </div>
              </div>
            </div>




</template>
   
    
<style>
@import '@/assets/platform.css';

.type-input-2 {
    border: 1px solid #DDDDDD !important;
    border-radius: 5px !important;
    height: 30px !important;
    padding: 5px !important;
    max-height: 30px !important;
    min-height: 36px !important;
    background: transparent !important;
}

label {
    font-weight: 500;
    color: black;
    font-size: 14px;
}
</style>
   
<script setup="">
import columnLeft from '@/components/platform/left.vue';
import navBar from '@/components/platform/navbar.vue';

</script>
    
<script>

export default {
    data() {
        return {
            removeSuscriptionModal : false,
            type_input_password: 'password',
            active_password:true,
            auth: localStorage.getItem('auth'),
            endpointRemove : window.ENDPOINT + '/users/suscription/remove',
            endpoint: window.ENDPOINT + '/users/auth',
            endpointSave: window.ENDPOINT + '/users/account/edit',
            user: {
                data: {
                    role: 'user',
                    email: null,

                }
            },

        }
    },
    created() {

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                auth: localStorage.getItem('auth')
            })
        };
        fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
            this.user = data;

            if(data.data.sucription_pay == undefined) {
               this.user.data.sucription_pay = false;
            }
            
        })

    },
    mounted() {
        
    },
    computed: {
    },
    methods: {
        
        removeSuscription() {
            const requestOptions = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  auth: localStorage.getItem('auth')
              })
           };
           fetch(this.endpointRemove, requestOptions).then(response => response.json()).then((data) => {
            this.$toast.success(
              "Tu suscripcion fue eliminada.",
              { position: "bottom-right" }
            );

            window.location.href = "/platform/dashboard"

           })
        },
        

        save() {
            const requestOptions = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  auth: localStorage.getItem('auth'),
                  data: this.user.data
              })
           };
           fetch(this.endpointSave, requestOptions).then(response => response.json()).then((data) => {
            this.$toast.success(
              "Tu perfil fue actualizado con exito.",
              { position: "bottom-right" }
            );
            
           })
        },
        

        changePassword() {
             this.active_password = false;
             this.type_input_password = 'text';
        }
    }
}

</script>
   
   