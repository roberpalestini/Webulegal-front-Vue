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
                  <h4 style="font-weight:bold;text-align:left;font-size:17px">Reportes de comentarios</h4>
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

                 <hr />

                 <p style="margin-top:5px;margin-bottom:0"><b>Comentario</b> : {{item.data.comment.comment}}</p> 
                 <p style="margin-top:5px;margin-bottom:0"><b>Publicado en </b> : {{item.data.comment.document_title}}</p>
                 <p style="margin-top:5px;margin-bottom:0"><b>Publicado por </b> : {{item.data.comment.user.firstname}} {{item.data.comment.user.lastname}}</p>
                 <p style="margin-top:5px;margin-bottom:0"><b>Id</b> :  {{item.data.comment._id}}</p>

                 <hr /> 
                  <a href="#" @click.prevent="removeAction(item.data.comment._id,item._id)" style="font-weight:500;margin-left:15px" ><img src="@/assets/trash.svg" style="width:14px;height:14px;margin-right:5px" /> Eliminar comentario y reporte</a>

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
      endpoint: window.ENDPOINT + '/requests/get/all/comments',
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
 removeAction(id,idReport) {
 const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth: localStorage.getItem('auth'),
                id: id,
                id_report: idReport
             })
         };
         fetch(window.ENDPOINT + '/admin/requests/delete/comments', requestOptions).then(response => response.json()).then((data) => {
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