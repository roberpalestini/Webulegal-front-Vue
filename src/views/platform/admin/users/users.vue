 
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
           <div class="col-md-12">
             <div class="col-md-12" style="margin-bottom:30px">
               <h4 style="font-weight:bold;text-align:left;font-size:17px">Usuarios registrados : {{users.length}}</h4>
             </div>

               <div class="col-md-12 text-left" style="padding:15px;font-size:12px;margin-bottom:15px;border:1px solid #E7E7E7" v-for="item in users">
                 <img :src="'https://ui-avatars.com/api/?background=000000&color=fff&name=' + item.data.profile.firstname + item.data.profile.lastname" style="height:30px;border-radius:100%" /> <span style="font-weight:600;font-size:14px;"> {{item.data.profile.firstname}} {{item.data.profile.lastname}}</span>
                  {{item.data.email}}
                 <hr /> 
                  Fecha de creacion : <b>{{item.data.date.create}}</b>
                <hr />
                  <RouterLink :to="{ name: 'admin-users-edit', params: { id: item._id}}" style="font-weight:500;" ><img src="@/assets/edit.svg" style="width:14px;height:14px;margin-right:5px" /> Editar</RouterLink>

                  <a href="#" @click.prevent="removeAction(item._id)" style="font-weight:500;margin-left:15px" ><img src="@/assets/trash.svg" style="width:14px;height:14px;margin-right:5px" /> Eliminar</a>
               </div>




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
</style>

<script setup="">
import columnLeft from '@/components/platform/left.vue';
import navBar from '@/components/platform/navbar.vue';
 
</script>
 
<script>

 export default {
  data() {
    return {
       
         endpoint: window.ENDPOINT + '/admin/users',
         endpointDelete: window.ENDPOINT + '/admin/users/delete',
         users : []

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
    removeAction(id) {
        this.$Progress.start();
        const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth: localStorage.getItem('auth'),
                id: id 
             })
         }; 
         fetch(this.endpointDelete, requestOptions).then(response => response.json()).then((data) => {  
             this.$Progress.finish();
             this.load();
         }) 
       

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
             })
         }; 
         fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => { 
             this.users = data;
             this.$Progress.finish();
         }) 
       
    } 

     
  }
}
 
</script>

