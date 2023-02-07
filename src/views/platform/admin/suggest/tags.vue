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
                             <h4 style="font-weight:bold;text-align:left;font-size:17px">Solicitudes de etiquetas</h4>
             </div>


   <div class="text-center col-md-12" v-if="data.length == 0">
                 	 <div class="col-md-12 text-left" style="border-radius:8px;color:white;font-weight:500;background:#5D5D5D;padding:15px">
               No se encontraron registros.
            </div>
                 	</div>

 <div class="col-md-12 text-left" style="padding:15px;font-size:12px;margin-bottom:15px;border:1px solid #E7E7E7" v-for="item in data"  v-if="data.length > 0">
                 <img :src="'https://ui-avatars.com/api/?background=000000&color=fff&name=' + item.data.user.firstname + item.data.user.lastname" style="height:30px;border-radius:100%" /> <span style="font-weight:600;font-size:14px;"> {{item.data.user.firstname}} {{item.data.user.lastname}}</span>
                                {{item.data.user.email}}
                 <hr /> 

                 <p><b>Mensaje</b> : {{item.data.message}}</p> 
               </div>
 

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
      endpoint: window.ENDPOINT + '/requests/get/all/tag',
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
         fetch(window.ENDPOINT + '/admin/requests/delete', requestOptions).then(response => response.json()).then((data) => {
            this.$toast.success("El registro fue eliminado correctamente..", {
                        position: "bottom-right"
                    })
             this.getAll();
         })
     },

    getAll() {
      localStorage.getItem('auth')
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
              if(data.empty) {
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