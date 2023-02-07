 <style>
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
<template>
  <navBar />

  <main >
     
  <div class="container-fluid">
    <div class="row">
     <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
      	<columnLeft />
      </div>
        <div class="col-md-10 text-center" style="padding:20px;border:1px solid #E2E2E2;background:rgb(255,255,255,0.1);height:calc(100vh - 70px);overflow:hidden;overflow-y:auto">
         <div class="row justify-content-center">
          

          <div class="col-12 text-left">
            <b>{{document.title}}</b>
            <p>{{document.description}}</p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Compartido por: <b>USERNAME</b></p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Puntuacion:   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" style="fill: #ead723" v-for="index in 5" :key="index"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/></g></svg></p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Para crear el documento, completa el siguiente cuestionario</p>
          </div>

          <div class="col-12 text-right" style="height:50px;">
              <a href="#" class="icons-link">
                <img src="@/assets/estrella.png"/>
              </a>
              <a href="#"  class="icons-link">
                <img src="@/assets/marcador.svg"/>
              </a>
              <a href="#"  class="icons-link">
                <img src="@/assets/cuota.svg"/>
              </a>
          </div>
 

          <div class="col-4" style="position:relative;position:sticky;top:0;">
            <div class="col-12" style="border-radius:8px;background:#fbf4fe;height:400px;border:1px solid #E2E2E2;overflow:hidden;overflow-y:auto;">
            </div>
          </div>
          <div class="col-8">
             <div class="col-12" style="border-radius:8px;background:#fef8f8;padding:0;border-radius:8px;border:1px solid #E2E2E2">
              <div class="col-12" style="padding:10px;background:#2b44ff;border-top-left-radius:8px;border-top-right-radius:8px;text-align:center;font-weight:600;color:white;">
                Previsualizacion del documento
              </div>
              <div class="col-12" style="height:400px;padding:20px;overflow:hidden;overflow-y:auto;" v-html="document.content"> 
              </div>
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
    .icons-link {
margin-right:15px;
opacity:0.5;
    }
    .icons-link img {
      width:15px;height:15px;
    }
    .icons-link:hover {
     opacity: 1
    }
</style>

 
 
<script>

 export default {
  data() {
    return {
      auth:localStorage.getItem('auth'), 
      endpoint:window.ENDPOINT + '/writings/get/documents',
      document:{}, 
    }
  },
    created() {
      
    },
    mounted() {   
        this.getDocument(this.$route.params.id)
    }, 
    computed: { 
  }, 
  methods: { 
    getDocument(id) {
       const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth,  
                id:id,
             })
         };
          fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
            this.document = data;
          })
    },
    changeMode(mode) { 
    },
    search() {
      
    }, 
    
    pause() {
       
    },
    hover() {
       
    } 
  }
}
 
</script>

<script setup="">
import columnLeft from '@/components/platform/left.vue';
import navBar from '@/components/platform/navbar.vue';
 
</script>