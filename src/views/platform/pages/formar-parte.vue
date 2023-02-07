 
<template>
  <navBar />

  <main >
     
  <div class="container-fluid">
    <div class="row">
<!--       <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
      	<columnLeft />
      </div> -->
      <div class="col-md-12 text-center" style="padding:20px;border:1px solid #E2E2E2;background:white;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;border-bottom:1px solid #E5E5E5">
         <div class="row justify-content-center">
         	 

          
           
           <div class="col-12 text-left" style="padding-top:20px;padding-bottom:20px;" >
    <a href="@" @click.prevent="$router.go(-1)" > <img src="@/assets/flecha-izquierda.svg" style="height:20px;width:20px;" /> </a>
</div>
 


       <div class="row contenedor">
                <div class="col-md-12">
                <h1 class="text-center titles" >¿Por qué formar parte de Webu?</h1>
                    <p class="text-center mt-3">
                        Somos la comunidad de abogados que, de manera colaborativa, logramos hacer más eficiente el trabajo legal</p>
                </div>
           
                <div class="col-md-3 text-center iconos">
                    <i class="fas fa-file-contract"></i> 
                    <h5>Escritos automatizados</h5>
                    <p>Automatizá tus escritos más repetitivos  y 
                        decidí si los querés compartir a la comunidad o 
                        mantenerlos en privado</p>
                </div>
                <div class="col-md-3 text-center iconos">
                    <i class="fas fa-book-open"></i> 
                    <h5>Biblioteca legal colaborativa</h5>
                    <p>Encontrá y compartí legislación,  jurisprudencia y doctrina. Ordenado por materias, jurisdicción y etiquetas

                    </p>
                </div>
                <div class="col-md-3 text-center iconos">
                    <i class="fas fa-star"></i> 
                    <h5>Contenido validado</h5>
                    <p>Todo el material que encuentres en la plataforma está validado por otros colegas</p>
                </div>
                <div class="col-md-3 text-center iconos">
                    <i class="fas fa-medal"></i> 
                    <h5>Obtené recompensas</h5>
                    <p>Si los demás usuarios validan el contenido que compartiste, sumás puntos canjeables por increíbles premios</p>
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