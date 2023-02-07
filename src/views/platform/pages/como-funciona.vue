 
<template>
  <navBar />

  <main >
     
  <div class="container-fluid">
    <div class="row">
     <!--  <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
      	<columnLeft />
      </div> -->
      <div class="col-md-12 text-center" style="padding:20px;border:1px solid #E2E2E2;background:white;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;border-bottom:1px solid #E5E5E5">
         <div class="row justify-content-center">
         	 

          
           
           <div class="col-12 text-left" style="padding-top:20px;padding-bottom:20px;" >
    <a href="@" @click.prevent="$router.go(-1)" > <img src="@/assets/flecha-izquierda.svg" style="height:20px;width:20px;" /> </a>
</div>
 


       <div class="row contenedor justify-content-center mt-20">
                <div class="col-md-12 text-center mb-5" >
                    <h1 class="titles" >
                        ¿Como Funciona?
                    </h1>
                </div>
                <div class="col-md-7 text-left">
                    <h1 class="text-wrap titles text-left">
                        Automatizá tus escritos más repetitivos
                    </h1>
                    <p class="text-wrap mt-3 text-left">
                        Ahorra tiempo y esfuerzo usando nuestra 
                        herramienta de automatización. 
                    </p>
                    <p class="text-wrap mt-3 text-left">
                        Decidí si querés compartirlo a la 
                        comunidad o mantenerlo privado.
                    </p> 
                    <a
            target="_blank"
            href="https://drive.google.com/file/d/1iZDKJeqtXLeXPdYwFYTdj3ZYz_a7Qm9J/view?usp=sharing"
            ><u> Saber más </u></a
          >
                </div>
                <div class="col-md-5">
                    <img class="img-fluid" src="@/assets/automatiza.png" alt="">
                </div>
            </div>
             <!--SECTION 4-->
            <div style="margin: 80px auto;">
                <div class="row contenedor justify-content-center">
                    
                    <div class="col-md-7">
                        <img class="contrato" src="@/assets/econtra.png" alt="">
                    </div>
                    <div class="col-md-5">
                        <h1 class="text-wrap titles text-left" >
                            Encontrá escritos automatizados
                        </h1>
                        <p class="text-wrap mt-3 text-left">
                            Ordenados por jurisdicciones y validados por otros colegas.
                        </p>
                        <p class="text-wrap mt-3 text-left">
                            Completá los datos y el escrito se generará automáticamente. Modificalo y adaptalo a tu necesidad.
                        </p> 
                    </div>
                
                </div>
            </div>
            <!--SECTION 5-->
         <div style="margin: 80px auto;">
            <div class="row contenedor justify-content-center"> 
                
                <div class="col-md-5">
                    <h1 class="text-wrap titles text-left">
                        Biblioteca legal colaborativa
                    </h1>
                    <p class="text-wrap mt-3 text-left">
                        Encontrá y compartí legislación, jurisprudencia, doctrina y demás contenido legal, clasificado por jurisdicciones y materias. 
                    </p>
                    
                </div>
                <div class="col-md-7">
                    <img class="img-fluid" src="@/assets/bibliotecacola.png" alt="">
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
 
</style>
 
 
<script>

 export default {
  data() {
    return {
      
    }
  },
    created() {
      console.log('BestDocuments',this.BestDocuments)
    },
    mounted() {   

    }, 
    computed: { 
  }, 
  methods: { 
     
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