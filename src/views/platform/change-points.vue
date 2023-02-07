<template>
	<div style=" 
 	height: 100%;
 	background: white;">
	<div class="container" style="width: 100%;
 	height: 100%;
 	background: white;padding-top:100px">
		<div class="row justify-content-center">
			<div class="col-md-4">
				<h4 style="font-weight:900;font-size:45px;">Recompensas</h4>
				<p style="font-size:18px;margin-bottom:28px;margin-top:28px">En nuestra comunidad legal fomentamos la colaboratividad.</p>

				<p style="font-size:18px;margin-bottom:28px;margin-top:28px">Cada vez que un usuario valide algo que hayas compartido , sumas 10 puntos.</p>

				<p style="font-size:18px;margin-bottom:28px;margin-top:28px">A medida que vayas sumando puntos los podes canjear por diferentes premios. Por ejemplo, <b>cuando alcanzas los 1000 puntos , obtenes 3 meses de suscripcion gratis.</b></p>

				<div class="col-md-12">
					 <button   class="btn btn-primary "  style="font-size:20px" @click="submit()">Canjear</button>
				</div>

				<p style="font-size:14px;margin-bottom:28px;margin-top:28px">Proximamente podras canjear tus puntos por cupones de descuentos en aplicaciones de delivery y por criptomonedas , con la creacion de webu token.</p>
			</div>
			<div class="col-md-5">
				 <img class="img-fluid" src="@/assets/canje-render.png" />
			</div>
		</div>
	</div>
</div>
</template>

 
<style scoped>

a {
    -webkit-transition: color 0.2s linear, background 0.2s linear, border-color 0.2s linear, text-shadow 0.2s linear;
    transition: color 0.2s linear, background 0.2s linear, border-color 0.2s linear, text-shadow 0.2s linear;
    -webkit-text-decoration: none;
    text-decoration: none; 
    font-weight: bold;
    color: rgb(43, 68, 255);
}
</style> 
<style>
@import   '@/assets/platform.css';
 
 
</style>
<script setup>
 import router from '@/router/index.js';
</script>
 

<script>

 export default {
  data() {
    return { 
      endpoint: window.ENDPOINT + '/requests/points',
    }
  },
    created() {
    
    },
    mounted() { 
    },


  methods: { 
    submit() { 
       this.$Progress.start();  
       
        const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             }, 
             body: JSON.stringify({
                auth : localStorage.getItem('auth')
             })
         };
         fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
  
             this.$toast.show(
              "Tu solicitud ha sido procesada.",
                {
                   position: "bottom-right" 
                }
              )

               router.push('/platform/dashboard')
         
           this.$Progress.finish();  
            
         }) 
    }, 
    pause() {
       
    },
    hover() {
       
    } 
  }
}
 
</script>