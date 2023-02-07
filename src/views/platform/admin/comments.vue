 
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
                   <h4 style="font-weight:bold;text-align:left;font-size:17px">Comentarios</h4> 
               </div>
 
               

               <table class="table">
  <thead>
    <tr> 
      <th scope="col">Usuario</th> 
      <th scope="col">Comentario</th>
      <th scope="col">Fecha</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in data">
      <!-- <th scope="row">{{item.user.id}}</th> -->
      <td style="text-align: left;">
    {{item.user.firstname}} {{item.user.lastname}}
    <br />
    <b>{{item.user.email}}</b>
</td>  
      <td style="font-size:13.5px;text-align: left;">
         {{item.comment}} 
        <br />
        <i><b>Comentado en : {{item.document_title}}</b></i>
      </td> 
      <td>{{item.date}}</td> 
      <td> <a href="#" @click.prevent="removeAction(item._id)" style="font-weight:500;margin-left:15px" ><img src="@/assets/trash.svg" style="width:14px;height:14px;margin-right:5px" /> Eliminar</a></td>
    </tr>
    
  </tbody>
</table>



  
                
  
  
  
             </div>
  
  
           </div>
        </div>
      </div>
    </div>  
    </main>


















    

  <!-- Modal -->
  <div
    class="modal fade"
    id="createPayment"
    data-backdrop="static"
    data-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content" @submit.prevent="save()">
        <div class="modal-header text-center">
          <h5 class="modal-title">Nuevo codigo</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
            <label>Titulo</label>
            <input type="text" class="form-control" v-model="form.title" />
           </div>


           <div class="form-group">
            <label>Codigo</label>
            <input type="text" class="form-control" v-model="form.code" />
           </div>

           <div class="form-group">
            <label>Precio</label>
            <input type="number" class="form-control" v-model="form.unit_price" />
           </div>
 

        </div>
        <div class="modal-footer" style="border: none">
          <button type="submit" class="btn btn-primary" style="font-size: 15px">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>









  
  <!-- Modal -->
  <div
    class="modal fade"
    id="editPayment"
    data-backdrop="static"
    data-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content" @submit.prevent="saveEdit()">
        <div class="modal-header text-center">
          <h5 class="modal-title">Editar codigo</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
            <label>Titulo</label>
            <input type="text" class="form-control" v-model="formEdit.title" />
           </div>

           <div class="form-group">
            <label>Codigo</label>
            <input type="text" class="form-control" v-model="formEdit.code" />
           </div>

           <div class="form-group">
            <label>Precio</label>
            <input type="number" class="form-control" v-model="formEdit.unit_price" />
           </div>


           

        </div>
        <div class="modal-footer" style="border: none">
          <button type="submit" class="btn btn-primary" style="font-size: 15px">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>























  


  
  <!-- Modal -->
  <div
    class="modal fade"
    id="openRegisters"
    data-backdrop="static"
    data-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content"  >
        <div class="modal-header text-center">
          <h5 class="modal-title">Usuarios registrados</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="registers.length > 0">
          
            <div class="col-md-12 text-left" style="padding:15px;font-size:12px;margin-bottom:15px;border:1px solid #E7E7E7" v-for="item in registers">
                 <img :src="'https://ui-avatars.com/api/?background=000000&color=fff&name=' + item.firstname + item.lastname" style="height:30px;border-radius:100%" /> <span style="font-weight:600;font-size:14px;"> {{item.firstname}} {{item.lastname}}</span>
                  {{item.email}}  
           </div>
           

        </div> 
      </form>
    </div>
  </div>


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
  
   export default {
    data() {
      return {

        settings : { 
        access_token : null,
        mode : null
        },

        form : {
            title : null,
            unit_price : 0, 
            code : null,
           },
           formEdit : {
            title : null,
            unit_price : 0, 
            code : null,
           },
         
           endpoint: window.ENDPOINT + '/admin/comments',
           endpointSave: window.ENDPOINT + '/admin/payments/code/create',
           endpointUpdate: window.ENDPOINT + '/admin/payments/code/edit',
           endpointDelete: window.ENDPOINT + '/admin/comments/delete',

           endpointSaveSettings:window.ENDPOINT + '/admin/payments/settings/edit',
           endpointLoadSettings:window.ENDPOINT + '/admin/payments/settings/get',
           data : [],
           registers : [],
  
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

        openRegisters(target) {
            if(target.length > 0) {
                this.registers = target;
               $('#openRegisters').modal('show')
            }
             
        },
        openNew()  {
            $('#createPayment').modal('show')
        },

        openEdit(index)  {
            this.formEdit = this.data[index]; 
            $('#editPayment').modal('show')
        },

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
               this.data = data;
               this.$Progress.finish();
           }) 
         
      } ,

      loadSettings() {
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
           fetch(this.endpointLoadSettings, requestOptions).then(response => response.json()).then((data) => { 
               this.settings = data;
               this.$Progress.finish();
           }) 
         
      } ,

       
      saveSettings() {
         this.$Progress.start();
   
   
        const requestOptions = {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  auth: localStorage.getItem('auth'),
                  data: this.settings
               })
           }; 
           fetch(this.endpointSaveSettings, requestOptions).then(response => response.json()).then((data) => {  
               this.$Progress.finish();
               this.load();
               this.loadSettings() 
           }) 
         
      } ,
      save() {
         this.$Progress.start();
   
   
        const requestOptions = {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  auth: localStorage.getItem('auth'),
                  data: this.form
               })
           }; 
           fetch(this.endpointSave, requestOptions).then(response => response.json()).then((data) => {  
               this.$Progress.finish();
               this.load();
               $('#createPayment').modal('hide')
           }) 
         
      } ,


      saveEdit() {
         this.$Progress.start();
   
   
        const requestOptions = {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  auth: localStorage.getItem('auth'),
                  data: {
                    title: this.formEdit.title,
                    unit_price: this.formEdit.unit_price,
                    active: this.formEdit.active,
                  },
                  id: this.formEdit._id,
               })
           }; 
           fetch(this.endpointUpdate, requestOptions).then(response => response.json()).then((data) => {  
               this.$Progress.finish();
               this.load();
               $('#editPayment').modal('hide')
           }) 
         
      } 



  
       
    }
  }
   
  </script>
  
  