 
<template>
  <navBar />

  <main>

    <div class="container-fluid">
      <div class="row">
        <!--       <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
      	<columnLeft />
      </div> -->
        <div class="col-md-12 text-center"
          style="padding:20px;border:1px solid #E2E2E2;background:white;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;border-bottom:1px solid #E5E5E5">
          <div class="row justify-content-center">




            <div class="col-12 text-left" style="padding-top:20px;padding-bottom:20px;">
              <a href="@" @click.prevent="$router.go(-1)"> <img src="@/assets/flecha-izquierda.svg"
                  style="height:20px;width:20px;" /> </a>
            </div>



            <div class="row contenedor">

              <div class="col-md-12" style="margin-bottom:3.5vh">
                <h1 class="text-left titles">Recompensas</h1>
                <p class="text-left mt-3">
                  En nuestra comunidad legal fomentamos la colaboratividad. <br /><br />
                  Cada vez que un usuario valide algo que hayas compartido, sumas 10 puntos. <br /><br />
                  A medida que vayas sumando puntos los podes canjear por diferentes premios.
                </p>
              </div>

              <div class="col-md-12" style="margin:1vw;display: flex; align-items:center; justify-content: center;">
                <div class="col-md-4 text-center iconos card shadow"
                  style="
                  max-height:33vh;
                  
                  min-height:33vh;
                  margin:1vw;display: flex; align-items:center; justify-content: center;padding-top:20px;padding-bottom:20px;">
                  <img src="../../../assets/pedidosya.svg" class="fas fa-book-open"
                    style="max-width:14vw;margin-bottom:3vh">
                  <h5>Orden de compra por $1000</h5>
                  <p style="margin-top:-1vh">100 Puntos</p>
                </div>
                <div class="col-md-4 text-center iconos card shadow"
                  style="
                  max-height:33vh;
                  
                  min-height:33vh;
                  margin:1vw;display: flex; align-items:center; justify-content: center;padding-top:20px;padding-bottom:20px;">
                  <img src="../../../assets/rappi-logo.png" class="fas fa-book-open"
                    style="max-width:9vw;margin-bottom:3vh">
                  <h5>Orden de compra por $1000</h5>
                  <p style="margin-top:-1vh">100 Puntos</p>
                </div>
                <div class="col-md-4 text-center iconos card shadow"
                  style="
                  max-height:33vh;;
                  margin:1vw;
                  
                  min-height:33vh;;display: flex; align-items:center; justify-content: center;padding-top:20px;padding-bottom:20px;">
                  <img src="../../../assets/IsoLogo.svg" class="fas fa-book-open"
                    style="max-width:6vw;margin-bottom:3vh">
                  <h5>2 Meses de subscripcion gratis</h5>
                  <p style="margin-top:-1vh">100 Puntos</p>
                </div>


              </div>

              <div class="col-md-12" style="display: flex; align-items:center; justify-content: center;margin-top:5vh">
                <div class="col-md-3 text-center">
                  <button type="submit" class="btn btn-primary" style="width: 120px; position: relative"
                    @click="submit()">Canjear</button>
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
@import '@/assets/platform.css';
</style>


 
<script>

export default {
  data() {
    return {

    }
  },
  created() {
    console.log('BestDocuments', this.BestDocuments)
  },
  mounted() {

  },
  computed: {
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
          auth: localStorage.getItem('auth')
        })
      };
      fetch(window.ENDPOINT + '/requests/points', requestOptions).then(response => response.json()).then((data) => {

        this.$toast.show(
          "Tu solicitud ha sido procesada.",
          {
            position: "bottom-right"
          }
        )

        this.$router.push({
          name: "dashboard",
        });

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


<script setup="">
import columnLeft from '@/components/platform/left.vue';
import navBar from '@/components/platform/navbar.vue';

</script>