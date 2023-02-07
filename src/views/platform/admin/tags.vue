<template>
    <navBar /> 
    <main>
        <div class="container-fluid">
         <div class="row">
            <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
                  <columnLeft />
                </div>
                <div class="col-md-10 text-left" style="padding:20px;border:1px solid #F3F3F3;background:white;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;position:relative;"> 





                  <div class="col-md-12" style="margin-bottom:30px">
                  <h4 style="font-weight:bold;text-align:left;font-size:17px">Etiquetas </h4>
                  <button type="submit" class="btn btn-primary" style="width:auto;position:relative;z-index:1000" @click.prevent="openNew()">Añadir nuevo</button>
             </div>



   <div class="text-center col-md-12" v-if="data.length == 0">
                     <div class="col-md-12 text-left" style="border-radius:8px;color:white;font-weight:500;background:#5D5D5D;padding:15px">
               No se encontraron registros.
            </div>
                    </div>

            <input type="text" class="form-control" v-model="search.target" style=" border-radius: 30px !important;
    border: 1px solid rgb(199, 199, 199) !important;
    background: rgb(231, 231, 231) !important;
    padding-left: 15px !important;;margin-top:20px;margin-bottom:20px;font-weight:600;font-size:13px;padding-left:20px;" placeholder="Buscar por titulo..."  v-if="data.length > 0" />

           <table class="table table-inverse" style="font-size:13px !important;" v-if="data.length > 0">
               <thead>
                   <tr>
                       <th>Identificador</th>
                       <th>Titulo</th>
                       <th>Descripcion</th>
                       <th>Acciones</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="item in filteredResources">
                       <td width="200">
                           <span style="opacity:0.5">{{item._id}}</span>
                       </td>
                       <td width="200">
                        <b>{{item.data.title}}</b>
                      </td>
                       <td width="200">
                           <component v-if="item.data.description">{{item.data.description}}</component>
                           <component v-if="!item.data.description">Descripcion no disponible.</component>
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




<!-- Modal -->
<div class="modal fade" id="staticBackdrop4" data-backdrop="static" data-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-md">
    <form class="modal-content" @submit.prevent="modalDeleteFolder()" style="border-radius:10px;border:none">
      <div class="modal-header text-center" style="background : #dedcdc;color:#454545;border-top-left-radius: 10px;
    border-top-right-radius: 10px">
             <h5 class="modal-title" style="    font-size: 15px;
    font-weight: 600;
    text-align: center !important;
    display: block !important;
    width: 100%;">Nueva etiqueta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="form-group">
            <label>Titulo</label>
             <input type="text" class="form-control" v-model="form.title" style="    border: 1px solid #DDDDDD;
    border-radius: 5px;
    height: 30px;
    padding: 5px;
    max-height: 30px;
    min-height: 36px;background:transparent" >
         </div>
         <div class="form-group">
             <label>Descripcion</label>
             <input type="text" class="form-control" v-model="form.description" style="    border: 1px solid #DDDDDD;
    border-radius: 5px;
    height: 30px;
    padding: 5px;
    max-height: 30px;
    min-height: 36px;background:transparent" >
         </div>
      </div>
      <div class="modal-footer" style="border:none"> 
        <button type="submit" class="btn btn-primary" style="font-size:15px" @click="save()">Crear etiqueta</button>
      </div>
    </form>
  </div>
</div>



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
      endpoint: window.ENDPOINT + '/admin/tags',
      inputCreate:null,
      tags:[],
      history:[],
      searchTarget:null,
      searchResults: false,
      form : {
        title : '',
        description : '',
      },
      search : {
        target : ''
      }
    }
  },
    created() {
    
    },
    mounted() { 
      this.getAll(); 
    },

    computed: { 


        filteredResources() {
            if (this.search.target) { 
                return this.data.filter((item) => { 
                  return item.data.title.toLowerCase().startsWith(this.search.target.toLowerCase());
                })
            } else {
                return this.data;
            }
        }

  },



  methods: { 
    openNew() {
        $('#staticBackdrop4').modal('show');
    },
      save() {

 const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth: localStorage.getItem('auth'),
                data: this.form,
             })
         };
         fetch(window.ENDPOINT + '/admin/tags/default/create', requestOptions).then(response => response.json()).then((data) => {
            this.$toast.success("La etiqueta fue creada correctamente..", {
                        position: "bottom-right"
                    })
             this.getAll();
              $('#staticBackdrop4').modal('hide');
         })
     },


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
         fetch(window.ENDPOINT + '/tags/default/delete', requestOptions).then(response => response.json()).then((data) => {
            this.$toast.success("La etiqueta fue eliminada correctamente..", {
                        position: "bottom-right"
                    })
             this.getAll();
         })
     },

    getAll() {
        this.$Progress.start();
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
         fetch(window.ENDPOINT + '/admin/tags/default/get/all', requestOptions).then(response => response.json()).then((data) => {
             if(data.empty) {
                 this.data = [];
             } else {
                 this.data = data;
             }
             this.$Progress.finish();
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