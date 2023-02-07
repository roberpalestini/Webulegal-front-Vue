 
<template>
  <navBar />

  <main>
     
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
        <columnLeft />
      </div>
      <div class="col-md-10 text-center" style="padding:20px;border:1px solid #E2E2E2;background:white;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;border-bottom:1px solid #E5E5E5">
         <div class="row justify-content-center">
            
 
           <!-- <div class="col-md-3">
           </div> -->
           <div class="col-md-12 text-left" v-if="user">
             <div class="col-md-12" style="margin-bottom:30px">
                  <h4 style="font-weight:bold;text-align:left;font-size:17px">Editar usuario | {{user.data.email}}</h4>
             </div>

              
              <form @submit.prevent="save()">
               <div class="form-group">
               	<label>Nombre</label>
               	<input type="text" class="form-control" v-model="user.data.profile.firstname" />
               </div>

               <div class="form-group">
               	<label>Apellido</label>
               	<input type="text" class="form-control" v-model="user.data.profile.lastname" />
               </div>

               <div class="form-group">
               	<label>E-mail</label>
               	<input type="text" class="form-control" v-model="user.data.email" />
               </div>

               <div class="form-group">
               	<label>Contraseña</label>
               	<input type="text" class="form-control" v-model="user.data.password" />
               </div>


               <div class="form-group">
               	<label>Token de acceso</label>
               	<input type="text" class="form-control" v-model="user.data.auth" disabled="true" />
               </div>

               <div class="form-group">
                <label>Puntos</label>
                <input type="number" class="form-control" v-model="user.data.points" />
               </div>


               <div class="form-group">
                <label>Fecha de registro  : <b>{{user.data.date.create}}</b> </label>
                <input type="datetime-local" class="form-control" v-model="user.data.date.create" />
               </div>


               <div class="form-group">
                <label>Dias de prueba</label>
                <input type="number" class="form-control" v-model="user.data.trial_days" />
               </div>


                

               <div class="form-group">
               	<button type="submit" class="btn btn-primary">Guardar</button>
               </div>





              </form>




           </div>


         </div>
      </div>
    </div>
  </div>  
  </main>
</template>

 
<style>
    @import   '@/assets/platform.css';
 .activeMode {
  border-radius:30px;
  font-weight:600;
  padding:4px;
  background: #2b44ff !important;
  color: white  !important;
  font-size:14px;
  padding-left: 10px;
  padding-right: 10px;
 }
 .form-control {
    border-radius: 30px !important;
    border: 1px solid rgb(199, 199, 199) !important;
    background: rgb(231, 231, 231) !important;
    padding-left: 15px !important;
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
import moment from 'moment'
 export default {
  data() {
    return {
       
         endpoint: window.ENDPOINT + '/admin/users/get',
         endpointSave: window.ENDPOINT + '/admin/users/edit',
         user:false

    }
  },
    created() { 
       this.load();
    },
    mounted() {  
    }, 
    computed: { 
  }, 
  methods: { 
     createDate(date) {
        return  moment(String(date)).format('MM/DD/YYYY hh:mm')
     },

     load() {
       this.$Progress.start();
 
 
      const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
               auth: localStorage.getItem('auth'),
                id:this.$route.params.id
             })
         }; 
         fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => { 
           this.user = data; 
           this.$Progress.finish();
         }) 
       
    },


     save() {
       this.$Progress.start();
 
 
      const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
               auth: localStorage.getItem('auth'),
                id:this.$route.params.id,
                data:this.user.data
             })
         }; 
         fetch(this.endpointSave, requestOptions).then(response => response.json()).then((data) => { 
          
            this.$toast.success("Usuario editado correctamente..", {
                        position: "bottom-right"
                    })

             this.$Progress.finish();
             
         }) 
       
    } 



     
  }
}
 
</script>

