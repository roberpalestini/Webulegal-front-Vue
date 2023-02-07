<template>
  <header style="
      height: 70px;
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
    " v-if="user">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 text-center">
          <a v-if="!$route.path.includes('dashboard')" style="margin-top: 40px" href="/"><img
              src="@/assets/Logocompleto.svg" class="img-fluid" style="max-width: 140px; margin-top: 25px" /></a>
        </div>
        <div class="col-md-9 text-right" style="
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
          ">
          <ul style="
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              align-content: center;
            ">
            <li style="padding: 0; display: flex">
              <RouterLink to="/platform/formar-parte" style="padding-left: 20px; padding-right: 20px; font-size: 15px">
                Formar Parte</RouterLink>
            </li>
            <li style="padding: 0; display: flex">
              <RouterLink to="/platform/como-funciona" style="padding-left: 20px; padding-right: 20px; font-size: 15px">
                ¿Cómo Funciona?</RouterLink>
            </li>
            <li style="padding: 0; display: flex">
              <RouterLink to="/platform/dejanos-tu-opinion"
                style="padding-left: 20px; padding-right: 20px; font-size: 15px">
                Dejanos tu opinion</RouterLink>
            </li>

            <li style="padding: 0; display: flex">
              <RouterLink to="/platform/recompensas" style="padding-left: 20px; padding-right: 20px; font-size: 15px">
                Recompensas</RouterLink>
            </li>

            <li style="padding: 0; display: flex">
              <button type="button" class="btn btn-primary" style="
                  width: 120px;
                  position: relative;
                  z-index: 1000;
                  padding: 5px;
                  font-size: 12px;
                  margin-left: 20px;
                " v-if="suscription.pending" @click.prevent="openModal()">
                Suscribite
              </button>
            </li>
          </ul>
        </div>

        <div class="col-md-1 text-right">
          <img :src="
            'https://ui-avatars.com/api/?background=000000&color=fff&name=' +
            user.profile.firstname +
            user.profile.lastname
          " style="
              height: 30px;
              border-radius: 100%;
              margin-right: 10px;
              margin-top: 17px;
            " @click="open_dropdown_user()" />

          <transition name="slide">
            <div style="
                width: 270px;
                height: auto;
                background: red;
                opacity: 1;
                position: absolute;
                z-index: 500;
                border-radius: 8px;
                background: white;
                border: 1px solid #d0cece;
                margin-top: 10px;
                padding-top: 20px;
                left: -200px;
              " v-if="dropdown_user" v-click-outside="onClickOutside">
              <div class="col-md-12 text-center" style="margin-bottom: 10px">
                <img :src="
                  'https://ui-avatars.com/api/?background=000000&color=fff&name=' +
                  user.profile.firstname +
                  user.profile.lastname
                " style="height: 50px; border-radius: 100%" />
              </div>
              <div class="col-md-12" style="
                  text-align: center;
                  margin-top: 20px;
                  margin-bottom: 20px;
                ">
                <h5 style="text-align: center; font-size: 15px; margin: 0">
                  {{ user.profile.firstname }} {{ user.profile.lastname }}
                </h5>
                <span class="text-muted" style="font-size: 12px">{{
                  user.email
                }}</span>
              </div>

              <div class="col-md-12" style="
                  text-align: center;
                  margin-top: 20px;
                  margin-bottom: 20px;
                ">
                <h2 style="
                    text-align: center;
                    margin: 0;
                    font-weight: 600;
                    font-size: 22px;
                  ">
                  {{ user.points }}
                </h2>
                <span class="text-muted" style="text-transform: uppercase; font-size: 12px">puntos</span>
              </div>

              <div class="col-md-12" style="
                  text-align: center;
                  margin-top: 20px;
                  margin-bottom: 20px;
                ">
                <RouterLink to="/platform/recompensas" style="font-size: 12px">Canjear</RouterLink>
              </div>

              <div class="col-md-12" style="
                  text-align: center;
                  padding-top: 15px;
                  padding-bottom: 15px;
                  text-align: center;
                  border-top: 1px solid #d0cece;
                ">
                <RouterLink to="/platform/account" style="
                    font-size: 14px;
                    font-weight: 600;
                    background: transparent !important;
                  ">Mi cuenta</RouterLink>
              </div>

              <div class="col-md-12" style="
                  text-align: center;
                  padding-top: 15px;
                  padding-bottom: 15px;
                  text-align: center;
                  border-top: 1px solid #d0cece;
                ">
                <a href="#" @click.prevent="logout()" style="font-size: 14px; font-weight: 600">Cerrar sesion</a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>

  <!-- Modal -->
  <div class="modal fade" id="suscriptionModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true" style="backdrop-filter: blur(5px)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" @submit.prevent="selectPathMoveSave()" style="
          border-radius: 10px;
          border: none;
          box-shadow: 0 0 300px #00000087;
        ">
        <div class="modal-header text-center" style="
            background: #dedcdc;
            color: #454545;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          ">
          <h5 class="modal-title" style="
              font-size: 15px;
              font-weight: 600;
              text-align: center !important;
              display: block !important;
              width: 100%;
            ">
            Suscribite
          </h5>
        </div>
        <div class="modal-body text-center" style="padding-top: 50px; padding-bottom: 50px">
          <h4 class="text-center" style="
              margin-top: 30px;
              margin-bottom: 30px;
              margin-bottom: 10px;
              font-size: 25px;
              font-weight: 600;
            ">
            FINALIZÓ TU PERIODO DE PRUEBA!
          </h4>
          <p class="text-center">
            Para seguir disfrutando de <b>Webu</b>, suscribite por sólo
          </p>
          <h1 class="text-center" style="font-size: 60px; font-weight: 600; margin-top: 50px">
            $999
          </h1>
          <p class="text-center" style="margin-bottom: 50px">Mensual</p>
          <a :href="'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084859ce0db0185a8993b17086d'"
            class="btn btn-primary" style="width: 200px; position: relative; z-index: 1000">Suscribirme</a>
        </div>
        <!--      <div class="modal-footer" style="border:none"> 
       <button type="submit" class="btn btn-primary" style="font-size:15px">Guardar</button>
      </div> -->
      </div>
    </div>
  </div>
</template>

<style>
.textHover span {
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  bottom: 0;
  left: 0px;
  line-height: 38px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 0;

  /* CSS3 Transition: */
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  transition: 0.5s;
}

.textHover:hover span {
  width: auto;
  padding: 0 30px;
  overflow: visible;
}

.textHover:hover {
  text-decoration: none;
}
</style>

<script>



import vClickOutside from "click-outside-vue3";

export default {
  data() {
    return {
      dropdown_user: false,
      user: false,
      userId: null,
      suscription: {
        pending: false,
      },
      tmpEvent: null,
      amount: 0,
      link: "",
      isDashboard: false,
    };
  },
  created() { },
  mounted() {
    this.auth();
    this.checkSuscription();
    this.checkDashboard();
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  methods: {
    checkDashboard() {
      if (window.location.pathname == "platform/dashboard")
        this.isDashboard = true;
      else this.isDashboard = false;

      console.log(this.isDashboard);
    },

    openModal() {
      $("#suscriptionModal").modal("show");
    },
    checkSuscription() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: localStorage.getItem("auth"),
        }),
      };
      fetch(window.ENDPOINT + "/users/check/suscription", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.suscription.pending = data.pending;
          if (data.pending) {
            this.amount =
              data.payment.response.auto_recurring.transaction_amount;
            this.link = ''
            $("#suscriptionModal").modal("show");
          }
        });
    },
    auth() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: localStorage.getItem("auth"),
        }),
      };
      fetch(window.ENDPOINT + "/users/auth", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.user = data.data;
          this.userId = data.id;
        });
      localStorage.setItem("userIdValue", this.userId);
    },
    logout() {
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
      this.$router.push("/");
      this.$toast.show("Gracias por utilizar nuestra plataforma.", {
        position: "bottom-right",
      });
    },
    open_dropdown_user() {
      if (this.dropdown_user) {
        this.dropdown_user = false;
      } else {
        this.dropdown_user = true;
      }
    },

    onClickOutside(event) {
      this.dropdown_user = false;
    },
  },
};
</script>
