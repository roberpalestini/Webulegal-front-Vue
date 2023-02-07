 
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
 

 <div class="row contenedor justify-content-center">
                
                <div class="col-md-12">
                    <h1 class="text-center mb-5 titles" >
                        Ayudanos a mejorar
                    </h1>   
                </div>
                <div class="col-md-12">
                    <p class="text-wrap mt-3 text-left">
                        En <strong>Webu</strong>  nos apasiona dar soluciones a los abogados para que puedan hacer su trabajo
                         más eficiente. Nuestro compromiso es poner a disposición
                          de la comunidad legal las herramientas que los abogados
                           realmente necesiten. 
                    </p>
                    <p class="text-wrap mt-3 text-left">       
                        Para ello, tu opinión es fundamental y por eso te pedimos
                        que nos aportes todo tipo de críticas para
                        poder mejorar nuestro servicio.
                        
                    </p>
                    <p class="text-wrap mt-3 text-left">       
                      
                        Muchas Gracias.
                    </p>
                </div>
               
                <div class="col-md-12" >
                    <form action="" method="post" @submit.prevent="saveFeedback()">
                        <div class="row">
                            <input class="mb-3" type="email" name="" id="" placeholder="Email" v-model="feedback.email" required :disabled="sendStatus">
                            <input class="mb-3" type="text" name="" id="" placeholder="Nombre" v-model="feedback.name" required :disabled="sendStatus">
                            <input class="mb-3" type="text" name="" id="" placeholder="Comentario" v-model="feedback.message" required :disabled="sendStatus">
                            <button class="btn-send" type="submit" :disabled="sendStatus">Enviar feedback</button>
                        </div>
                    </form>
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
import * as EmailValidator from 'email-validator';
 
 
 export default {
  data() {
    return {
        feedback: {
                email : null,
                message : null,
                name : null,
             },
        sendStatus : false
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
  	 saveFeedback() { 

      if(!EmailValidator.validate(this.feedback.email)) {
        this.$toast.show(
              "E-mail incorrecto.",
                {
                   position: "bottom-right" 
                }
              ) 
           return;
      }

      const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                email : this.feedback.email,
                message : this.feedback.message,
                name : this.feedback.name,
             })
         };
         fetch( window.ENDPOINT + '/requests/new/feedback', requestOptions).then(response => response.json()).then((data) => {
                this.$toast.success( "Tu solicitud ha sido procesada. Muchas gracias por ayudarnos a mejorar",{position: "bottom-right" })
                this.sendStatus = true;
                this.feedback =  {
                email : null,
                message : null,
                name : null,
                }
         }) 
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