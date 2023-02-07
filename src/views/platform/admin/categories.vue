 <style>
  @import   '@/assets/platform.css';
     .ul-categories {
         margin: 0;
         padding: 0;
         display: flex;
         flex-direction: column;
     }
     .ul-categories li {
        padding: 0;
        margin: 0;
        display: flex;
        margin-bottom: 10px;
        flex-direction: column;
     }

     .ul-categories li a {
        padding: 10px;
        border-radius: 30px;
        border: 1px solid #E3E3E3;
        color: #5C5C5C;
        font-weight: 600;
        text-align: center;
        padding-left: 30px;
        padding-right: 30px;
     }


      .ul-categories-subcategorias {
         margin: 0;
         padding: 0;
         display: flex;
         flex-direction: column;
         margin: 30px;
         margin-top: 10px;
         margin-bottom: 10px;
     }
     .ul-categories-subcategorias li {
        padding: 0;
        margin: 0;
        display: flex;
        margin-bottom: 10px;
        flex-direction: column;
     }

     .ul-categories-subcategorias li a {
        padding: 10px;
        border-radius: 30px;
        border: 1px solid #E3E3E3;
        color: #5C5C5C;
        font-weight: 600;
        text-align: center;
        padding-left: 30px;
        padding-right: 30px;
     }
     .ul-categories-subcategorias .arrow {
    height: 28px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
     }

     .popnewCategorie {
    position: fixed;
    bottom: 0px;
    right: 0px;
    margin: 15px;
    background: white;
    /* padding: 20px; */
    font-size: 12px;
    width: 300px;
     }

.folder {
	padding-top: 20px;
	padding-bottom: 20px;
    min-height: 200px;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: column !important;
    align-content: center !important;
    min-height: 200px;
    border-radius: 8px;
    background: #f1f1f1;
    
}
.folder:hover {
	background: #D6E1E6;

}
 </style>
 
<template>
    <navBar /> 
    <main>
        <div class="container-fluid">
        	<div class="row">
        		 <div class="col-md-2" style="height:calc(100vh - 70px);">
                    <columnLeft />
                </div>
                <div class="col-md-8 text-center" style="padding:20px;border:1px solid #F3F3F3;background:rgb(255,255,255,0.1);height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;position:relative;"> 
                	
                	<div class="col-12" style="height:100%;width:100%;position:absolute;z-index:600;background:rgb(255,255,255,0.1);backdrop-filter:blur(4px);display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center;" v-if="modalCreate">
                		<div style="background:white;width:300px;padding: 30px;box-shadow: 0 0 20px #00000030;border-radius: 6px;">
                		<form @submit="saveCreate">
                			<label style="font-size: 13px;font-weight: 500;margin-bottom: 20px;">Nombre de la categoria / carpeta</label>
                		<input type="text" class="form-control" style="height: 30px !important;min-height: 30px !important;border-radius: 30px;background: #efefef;border: 1px solid #d7d7d7;" v-model="inputCreate">
                       
                       <button type="submit" class="btn btn-primary" style="margin-top:20px" @click="saveCreate()" v-if="!saveCreateLoading">Guardar</button>

                       <button type="submit" class="btn btn-primary" style="margin-top:20px" disabled="true" v-if="saveCreateLoading">
                       <div class="spinner-border text-light spinner-border-sm" role="status">
                			   <span class="sr-only">Loading...</span>
                			  </div>
                	  </button>

                        
                   </form>
                       <a href="#" @click="modalCreate = false"><img src="@/assets/flecha-izquierda.svg" style="max-width:15px;max-height:15px;margin-top:15px" /></a>
                   </div>
                </div>




                	<div class="col-md-12" style="padding-top:30px;padding-bottom:30px">
                             <h4 style="font-weight:bold;text-align:left;font-size:20px">Gestion de categorias</h4> 
                    </div>

                    <div class="col-12" v-if="loadingStart" style="display: flex;justify-content: flex-start;align-items: center;font-weight:500;font-size:14px;">
                			 	<div class="spinner-border text-primary spinner-border-sm" role="status">
                			   <span class="sr-only">Loading...</span>
                			  </div> Cargando carpetas...
                			</div>


                	<div class="col-12" style="border:1px solid #E0E0E0;border-radius:6px;padding:25px"  v-if="!loadingStart">
                		<div class="row">

                			<div class="col-12"> 
                			<nav aria-label="breadcrumb">
                			  <ol class="breadcrumb">
                			    <li class="breadcrumb-item" style="font-size:12.5px;" @click="getFolder(0)" ><a href="#">Home</a></li>
                			    <li class="breadcrumb-item" aria-current="page"  v-for="(history,index) in history"  style="font-size:12.5px;" @click="page(index)" >{{history.name}}</li>
                			  </ol>
                			</nav>
                			</div>

                			  
                			<!-- <div class="col-12 text-left" style="margin-bottom:25px">
                				 <a href="#" @click="back"><img src="@/assets/flecha-izquierda.svg" style="max-width:15px;max-height:15px;" /></a>
                			</div> -->

                			<div class="col-3" style="padding:5px" v-for="(categorie,index) in categories">
                				<RouterLink :to="{ name: 'admin-categories-folder', params: { id: categorie.id }}"   class="col-12 text-center folder" >
                				  <img src="@/assets/admin-folder.png"  @click="getFolder(categorie.id,categorie.name)" style=" cursor: pointer;" />
                				  <p class="text-center" style="font-size:13px;font-weight:500; cursor: pointer;" @click="getFolder(categorie.id)"  >{{categorie.name}}</p>
                				  
                			    </RouterLink>
                			</div> 

                		</div>
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
      data:{},
      auth:localStorage.getItem('auth'), 
      endpointSave:'http://api.webu.lt/admin/categories/create',
      endpointGet: 'http://api.webu.lt/admin/categories/get',
      endpointGetAll: 'http://api.webu.lt/admin/categories/getAll',
      endpointDelete:'http://api.webu.lt/admin/categories/delete',
      modalCreate:false,
      inputCreate:null,
      categories:[],
      history:[],
    }
  },
    created() {
    
    },
    mounted() { 
    	this.getFolderAll(); 
    },


  methods: { 
  	deleteFolder(id) { 
  		const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth, 
                id:id, 
                getFolder:this.currentType
             })
         };
         fetch(this.endpointDelete, requestOptions).then(response => response.json()).then((data) => {
              this.categories = data.categories; 
            
         }) 
  	},
  	page(index) {
  		var temp = [];
  		for (var i = this.history.length - 1; i >= 0; i--) {
  			if(index <= i) {
               this.temp.push({id:this.history[i].id,name:this.history[i].name})
  			}
  		}
        console.log(temp);
  		this.history = temp;
  	},
  	back(e) {
  		e.preventDefault();
  		this.history.splice((this.history.length - 1),1);
        this.getFolder(this.history[this.history.length - 1].id); 
  	},
  	getFolder(id,name) {
  		this.currentName = name; 
  		const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth, 
                id: id, 
             })
         };
         fetch(this.endpointGet, requestOptions).then(response => response.json()).then((data) => {
              this.categories = data;
              this.currentType = id; 

              this.history.push({
              	id: id,
              	name:this.currentName
              })
         }) 

         console.log(this.history)
  	},

  	getFolderAll() {
  		const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth, 
             })
         };
         fetch(this.endpointGetAll, requestOptions).then(response => response.json()).then((data) => {
              this.categories = data;
              this.currentType = 0; 
               this.history.push({
              	id: 0,
              })
               this.loadingStart = false;
         }) 
  	},

 
    saveCreate(e) { 
    	  e.preventDefault();
    	 this.saveCreateLoading = true;
        const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth, 
                id_parent:this.currentType,
                name:this.inputCreate,
                getFolder:this.currentType
             })
         };
         fetch(this.endpointSave, requestOptions).then(response => response.json()).then((data) => {
              this.categories = data.categories;
              this.modalCreate = false;
              this.inputCreate = null;
              this.saveCreateLoading = false;
            
         }) 
      
    } 
  }
} 
</script>

 
 <script setup>
    import columnLeft from '@/components/platform/left.vue';
    import navBar from '@/components/platform/navbar.vue';
    import {Editable} from '@livingdocs/editable.js/src/core';
</script>