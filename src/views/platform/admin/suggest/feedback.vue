<template>
    <navBar /> 
    <main>
        <div class="container-fluid">
         <div class="row">
           <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
                  <columnLeft />
                </div>
                <div class="col-md-10 text-center" style="padding:20px;border:1px solid #F3F3F3;background:rgb(255,255,255,0.1);height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;position:relative;"> 
 

   <div class="col-md-12" style="margin-bottom:30px">
                             <h4 style="font-weight:bold;text-align:left;font-size:17px">Feedback</h4>
             </div>


 <div class="text-center col-md-12" v-if="data.length == 0">
                 	 <div class="col-md-12 text-left" style="border-radius:8px;color:white;font-weight:500;background:#5D5D5D;padding:15px">
               No se encontraron registros.
            </div>
                 	</div>

 


<table class="table table-inverse" style="font-size:13px !important;" v-if="data.length > 0">
               <thead>
                   <tr>
                       <th>Identificador</th>
                       <th>E-Mail</th>
                       <th>Nombre</th>
                       <th>Comentario</th>
                       <th>Acciones</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="item in data">
                       <td width="200">
                           <span style="opacity:0.5">{{item._id}}</span>
                       </td>
                       <td width="200">
                        <b>{{item.data.email}}</b>
                      </td>

                       <td width="200">
                        <b>{{item.data.name}}</b>
                      </td>

                       <td width="200">
                        <b>{{item.data.message}}</b>
                      </td>
                       
                       <td width="200">
                        <a href="#" @click.prevent="removeAction(item._id)" style="font-weight:500;margin-left:15px" ><img src="@/assets/trash.svg" style="width:14px;height:14px;margin-right:5px" /> Eliminar</a>
                       </td>
                   </tr>
               </tbody>
           </table>





                </div>
            </div>
        </div>
    </main>
</template>


 


<script>
export default {
  data() {
    return {
      currentType:0,
      currentName:null,
      saveCreateLoading:false,
      loadingStart:true,
      data:[],
      auth:localStorage.getItem('auth'), 
      endpoint: window.ENDPOINT + '/requests/get/all/feedback',
      inputCreate:null,
      tags:[],
      history:[],
      searchTarget:null,
      searchResults: false,
    }
  },
    created() {
    
    },
    mounted() { 
      this.getAll(); 
    },

    computed: { 
  },



  methods: {  


  removeAction(id) {
 const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth: localStorage.getItem('auth'),
                id: id,
             })
         };
         fetch(window.ENDPOINT + '/admin/requests/delete/single', requestOptions).then(response => response.json()).then((data) => {
            this.$toast.success("El registro fue eliminado correctamente..", {
                        position: "bottom-right"
                    })
             this.getAll();
         })
     },


    getAll() { 
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
            console.log(data)
              if(data.length == 0) {
             	 this.data = [];
             } else {
             	 this.data = data;
             }
         }) 
    } 
  }
} 
</script>

 
 
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

 <script setup>
    import columnLeft from '@/components/platform/left.vue';
    import navBar from '@/components/platform/navbar.vue'; 
</script>