<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

  <component>
    <nav class="navbar navbar-expand-lg navbar-light bg-light menu-cel-landingpage" style="
        position: fixed;
        top: 0;
        left: 0;
        rigth: 0;
        width: 100%;
        background: white;
        z-index: 997;
      ">
      <a class="navbar-brand" href="/">
        <img src="@/assets/Logocompleto.svg" alt="" style="max-width: 170px; margin-top: 5px" /></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#fp" @click.prevent="moveToBlue('fp')">Formar Parte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#cf" @click.prevent="moveToBlue('cf')">¿Cómo Funciona?</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#do" @click.prevent="moveToBlue('do')">Dejanos tu opinion</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="/platform/recompensas">Recompensas</a>
          </li> -->
        </ul>
      </div>
    </nav>
  </component>

  <component>
    <div style="
        position: fixed;
        top: 0;
        left: 0;
        rigth: 0;
        width: 100%;
        background: white;
        z-index: 999;
      " class="menu-desktop-landingpage">
      <div class="container">
        <div class="row">
          <div class="col-3 col-sm-3 col-md-5 flex-center-vertical" style="
              display: flex;
              align-content: flex-start;
              justify-content: center;
              align-items: flex-start;
              flex-direction: column;
            ">
            <a href="/">
              <img src="@/assets/Logocompleto.svg" alt="" style="max-width: 170px; margin-top: 12px" /></a>
          </div>
          <div class="col col-sm-8 col-md-7 ">
            <ul id="otroModo" class="menu_items" style="margin-top: 7px">
              <li class="active">
                <a class="link" href="#fp" @click.prevent="moveToBlue('fp')">Formar Parte</a>
              </li>
              <li><a class="link2" href="#cf" @click.prevent="moveToBlue('cf')">¿Cómo Funciona?</a></li>
              <li><a class="link3" href="#do" @click.prevent="moveToBlue('do')">Dejanos tu opinion</a></li>
              <!-- <li><a class="" href="/platform/recompensas">Recompensas</a></li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </component>

  <component>
    <div class="container margin-bottom margin-top">
      <div class="row">
        <div class="col-md-6 flex-center-vertical">
          <h1 class="titles" style="margin-bottom: 45px">
            ¡Bienvenido a la comunidad legal!
          </h1>
          <p style="margin-bottom: 45px">
            Encontrá y compartí legislación, doctrina, jurisprudencia y escritos
            automatizados. Hacé eficiente tu trabajo legal
          </p>
          <div class="col-md-12" style="padding: 0; padding-top: 0px;display:flex">
            <a href="#" @click.prevent="goToRegister()" class="btn btn-regis" style="margin-right: 15px">Registrarse</a>
            <a href="#" @click.prevent="goToLogin()" class="btn btn-regis" style="
                cursor: pointer;
                color: #2b44ff;
                background: transparent;
                border: 1px solid #2b44ff;
              ">Iniciar Sesión</a>
          </div>
        </div>
        <div class="col-md-6">
          <img src="@/assets/render-legal.webp" class="img-fluid" />
        </div>
      </div>
    </div>
  </component>
  <!-- <gApi> </gApi> -->
  <component>
    <div class="container margin-bottom" ref="fp">
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center titles">
            ¿Por qué formar parte de Webu?
          </h1>
          <p class="text-center mt-3">
            Somos la comunidad de abogados que, de manera colaborativa, logramos
            hacer más eficiente el trabajo legal
          </p>
        </div>

        <div class="col-md-3 text-center iconos">
          <i class="fas fa-file-contract"></i>
          <h5>Escritos automatizados</h5>
          <p>
            Automatizá tus escritos más repetitivos y decidí si los querés
            compartir a la comunidad o mantenerlos en privado
          </p>
        </div>
        <div class="col-md-3 text-center iconos">
          <i class="fas fa-book-open"></i>
          <h5>Biblioteca legal colaborativa</h5>
          <p>
            Encontrá y compartí legislación, jurisprudencia y doctrina. Ordenado
            por materias, jurisdicción y etiquetas
          </p>
        </div>
        <div class="col-md-3 text-center iconos">
          <i class="fas fa-star"></i>
          <h5>Contenido validado</h5>
          <p>
            Todo el material que encuentres en la plataforma está validado por
            otros colegas
          </p>
        </div>
        <div class="col-md-3 text-center iconos">
          <i class="fas fa-medal"></i>
          <h5>Obtené recompensas</h5>
          <p>
            Si los demás usuarios validan el contenido que compartiste, sumás
            puntos canjeables por increíbles premios
          </p>
        </div>
      </div>
    </div>
  </component>

  <component>
    <div class="container margin-bottom" ref="cf">
      <div class="row">
        <div class="col-md-12 text-center mb-5">
          <h1 class="titles">¿Como Funciona?</h1>
        </div>
      </div>

      <div class="row margin-bottom-min">
        <div class="col-md-6" style="padding: 2rem">
          <img class="img-fluid" src="@/assets/automatiza.png" alt="" />
        </div>
        <div class="col-md-6" style="padding: 2rem">
          <h1 class="text-wrap titles">
            Automatizá tus escritos mas repetitivos
          </h1>
          <p class="text-wrap mt-3">
            Ahorra tiempo y esfuerzo usando nuestra herramienta de
            automatización.
          </p>
          <p class="text-wrap mt-3">
            Decidí si querés compartirlo a la comunidad o mantenerlo privado.
          </p>
          <a target="_blank"
            href="https://drive.google.com/file/d/1iZDKJeqtXLeXPdYwFYTdj3ZYz_a7Qm9J/view?usp=sharing"><u> Saber más
            </u></a>
        </div>
      </div>

      <div class="row margin-bottom-min">
        <div class="col-md-6" style="padding: 2rem">
          <h1 class="text-wrap titles">Encontrá escritos automatizados</h1>
          <p class="text-wrap mt-3">
            Ordenados por jurisdicciones y validados por otros colegas.
          </p>
          <p class="text-wrap mt-3">
            Completá los datos y el escrito se generará automáticamente.
            Modificalo y adaptalo a tu necesidad.
          </p>
        </div>
        <div class="col-md-6" style="padding: 2rem">
          <img class="img-fluid" src="@/assets/econtra.png" alt="" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6" style="padding: 2rem">
          <img class="img-fluid" src="@/assets/bibliotecacola.png" alt="" />
        </div>
        <div class="col-md-6" style="padding: 2rem">
          <h1 class="text-wrap titles">Biblioteca legal colaborativa</h1>
          <p class="text-wrap mt-3">
            Encontrá y compartí legislación, jurisprudencia, doctrina y demás
            contenido legal, clasificado por jurisdicciones y materias.
          </p>
        </div>
      </div>
    </div>
  </component>

  <component>
    <div class="container margin-bottom" ref="do">
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center mb-5 titles">Ayudanos a mejorar</h1>
        </div>
        <div class="col-md-12">
          <p class="text-wrap mt-3">
            En <strong>Webu</strong> nos apasiona dar soluciones a los abogados
            para que puedan hacer su trabajo más eficiente. Nuestro compromiso
            es poner a disposición de la comunidad legal las herramientas que
            los abogados realmente necesiten.
          </p>
          <p class="text-wrap mt-3">
            Para ello, tu opinión es fundamental y por eso te pedimos que nos
            aportes todo tipo de críticas para poder mejorar nuestro servicio.
          </p>
          <p class="text-wrap mt-3">Muchas Gracias.</p>
        </div>

        <div class="col-md-12">
          <form action="" method="post" @submit.prevent="saveFeedback()">
            <div class="row">
              <input class="mb-3" type="email" name="" id="" placeholder="Email" v-model="feedback.email" required
                :disabled="sendStatus" />
              <input class="mb-3" type="text" name="" id="" placeholder="Nombre" v-model="feedback.name" required
                :disabled="sendStatus" />
              <input class="mb-3" type="text" name="" id="" placeholder="Comentario" v-model="feedback.message" required
                :disabled="sendStatus" />
              <button class="btn-send" type="submit" :disabled="sendStatus">
                Enviar feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </component>

  <component>
    <footer class="row">
      <div class="col-md-12 text-center iconos-footer">
        <a href="https://www.instagram.com/webu_ar/" style="background: transparent !important"><i
            class="fab fa-instagram" style="background: transparent !important"></i></a>
        <a href="https://www.linkedin.com/company/wearewebu/" style="background: transparent !important"><i
            class="fab fa-linkedin-in" style="background: transparent !important"></i></a>
        <a href="https://www.facebook.com/Webu-102265205747930" style="background: transparent !important"><i
            class="fab fa-facebook-f" style="background: transparent !important"></i></a>
      </div>
      <div class="col-md-12">
        <p class="text-center mt-3">Copyright Webu 2022</p>
      </div>
    </footer>
  </component>

  <component>
    <button id="btnScrollToTop" v-tooltip="'Scroll Top'" @click="toTop()">
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </component>
</template>

<style>
@import "@/assets/landing/style.css";
@import "@/assets/landing/home.css";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

html,
body {
  font-family: "Montserrat", sans-serif !important;
}

::-webkit-scrollbar {
  width: 10px !important;
  background: #dddddd !important;
  visibility: visible;
}

::-webkit-scrollbar-thumb {
  background: #a9a9a9 !important;
  width: 50px;
  display: block !important;
  visibility: visible;
  height: 10px !important;
}

.flex-center-vertical {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.margin-top {
  margin-top: 100px;
}

.margin-bottom {
  margin-bottom: 400px;
}

.margin-bottom-min {
  margin-bottom: 100px;
}

html body {
  overflow-x: hidden;
}

@media screen and (max-width: 858px) {
  .menu-desktop-landingpage {
    display: none !important;
  }
}

@media screen and (max-width: 1280px) {
  .link {
    font-size: 14px;
  }

  .link2 {
    font-size: 13px;
  }

  .link3 {
    font-size: 13px;
  }

  .menu_items li a {
    padding: 0px;
    display: block;
  }

  .btn-regis {
    width: 170px;
    height: 45px;
  }


}

.menu_items li a {
  padding: 0px;
  display: block;
}

.btn-regis {
  margin-right: 15px;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.menu_items {
  display: flex;
  list-style: none;
  margin-right: 0px !important;
}
</style>

<script>
import * as EmailValidator from "email-validator";
// import gApi from '../components/gapi/index.vue'

export default {
  // components: {
  //   gApi
  // },
  data() {
    return {
      feedback: {
        email: null,
        message: null,
        name: null,
      },
      sendStatus: false,
    };
  },
  created() {
    addEventListener("DOMContentLoaded", () => {
      var contadorcart = 0;
      const btn_menu = document.querySelector(".btn_menu");
      if (btn_menu) {
        btn_menu.addEventListener("click", () => {
          const menu_items = document.querySelector(".menu_items");
          menu_items.classList.toggle("show");
          const btn_menu2 = document.querySelector(".btn_menu2");
          var contadora = 0;

          if (contadora == 0) {
            btn_menu.classList.toggle("btn_menu_none");
            contadora = 1;
          } else contadora == 1;
          {
            btn_menu2.classList.remove("btn_menu_none");
            if (contadorcart == 1) {
              btn_menu2.classList.toggle("btn_menu_none");
            }
            contadora = 0;
          }
        });
      }
      const btn_menu2 = document.querySelector(".btn_menu2");
      if (btn_menu2) {
        btn_menu2.addEventListener("click", () => {
          const menu_items = document.querySelector(".menu_items");
          menu_items.classList.remove("show");
          const btn_menu = document.querySelector(".btn_menu");
          btn_menu.classList.remove("btn_menu_none");
          btn_menu2.classList.toggle("btn_menu_none");
        });
      }
      const link = document.querySelector(".link");
      if (link) {
        link.addEventListener("click", () => {
          const menu_items = document.querySelector(".menu_items");
          menu_items.classList.remove("show");
          const btn_menu = document.querySelector(".btn_menu");
          btn_menu.classList.remove("btn_menu_none");
          const btn_menu2 = document.querySelector(".btn_menu2");
          btn_menu2.classList.toggle("btn_menu_none");
        });
      }
      const link2 = document.querySelector(".link2");
      if (link2) {
        link2.addEventListener("click", () => {
          const menu_items = document.querySelector(".menu_items");
          menu_items.classList.remove("show");
          const btn_menu = document.querySelector(".btn_menu");
          btn_menu.classList.remove("btn_menu_none");
          const btn_menu2 = document.querySelector(".btn_menu2");
          btn_menu2.classList.toggle("btn_menu_none");
        });
      }
      const link3 = document.querySelector(".link3");
      if (link3) {
        link3.addEventListener("click", () => {
          const menu_items = document.querySelector(".menu_items");
          menu_items.classList.remove("show");
          const btn_menu = document.querySelector(".btn_menu");
          btn_menu.classList.remove("btn_menu_none");
          const btn_menu2 = document.querySelector(".btn_menu2");
          btn_menu2.classList.toggle("btn_menu_none");
        });
      }
    });
  },
  methods: {
    moveToBlue(target) {
      let position = this.$refs[target].getBoundingClientRect();
      // scrolls to 20px above element
      window.scrollTo(position.left, position.top + window.scrollY - 150); //202
    },

    toTop() {
      window.scrollTo(0, 0);
    },

    saveFeedback() {
      if (!EmailValidator.validate(this.feedback.email)) {
        this.$toast.show("E-mail incorrecto.", {
          position: "bottom-right",
        });
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.feedback.email,
          message: this.feedback.message,
          name: this.feedback.name,
        }),
      };
      fetch(window.ENDPOINT + "/requests/new/feedback", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$toast.success(
            "Tu solicitud ha sido procesada. Muchas gracias por ayudarnos a mejorar",
            { position: "bottom-right" }
          );
          this.sendStatus = true;
          this.feedback = {
            email: null,
            message: null,
            name: null,
          };
        });
    },

    goToLogin() {
      if (this.$route.query.rel) {
        this.$router.push({
          name: "login",
          query: {
            rel: this.$route.query.rel,
          },
        });
        return;
      }

      this.$router.push("/login");
    },
    goToRegister() {
      if (this.$route.query.rel) {
        this.$router.push({
          name: "register",
          query: {
            rel: this.$route.query.rel,
          },
        });
        return;
      }

      this.$router.push("/register");
    },
  },
};
</script>
