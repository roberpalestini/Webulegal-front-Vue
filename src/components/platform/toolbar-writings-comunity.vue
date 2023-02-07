<template>


  <div class="col-md-12 text-right" v-if="!showToolbar" style="height:50px;">
    <div class="spinner-border spinner-border-sm" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="col-12 text-right" style="height:50px;" v-if="showToolbar">

    <a href="#" v-tooltip="'Validar'" class="icons-link" v-if="details.validate == false && details.owner == false"
      @click.prevent="validateDocument()">
      <img src="@/assets/estrella.png" />
    </a>

    <a href="#" v-tooltip="'Documento validado'" class="icons-link validate-true"
      v-if="details.validate == true && details.owner == false">
      <img src="@/assets/estrella.png" />
    </a>


    <a href="#" v-tooltip="'Guardar'" class="icons-link" @click.prevent="saveDocument()" v-if="!details.copy">
      <img src="@/assets/marcador.svg" />
    </a>

    <a href="#" v-tooltip="'Olvidar'" class="icons-link" v-if="details.copy">
      <img src="@/assets/etiqueta.png" />
    </a>

    <a href="#" v-tooltip="'Reportar'" class="icons-link" @click.prevent="openReportModal()">
      <img src="@/assets/exclamation.svg" />
    </a>

    <a href="#" v-tooltip="'Compartir'" class="icons-link" @click.prevent="openShareContent()">
      <img src="@/assets/cuota.svg" />
    </a>

  </div>




  <!-- Modal -->
  <div class="modal fade" id="report-content" tabindex="-1" role="dialog" aria-labelledby="report-contentTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content" style="border-radius:10px;border:none">
        <div class="modal-header text-center"
          style="background : #dedcdc;color:#454545;border-top-left-radius: 10px;border-top-right-radius: 10px">
          <h5 class="modal-title"
            style="    font-size: 15px;font-weight: 600;text-align: center !important;display: block !important;width: 100%;">
            Denunciar contenido</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="save()" class="modal-body">
          ¿Por qué querés denunciar este contenido ?

          <div class="col-md-12" style="margin-top:20px;">
            <input type="text" class="form-control" v-model="temp.input"
              style="height: 30px;min-height: 33px;border-radius:30px;    border-radius: 30px;border: 1px solid rgb(199, 199, 199);background: rgb(231, 231, 231);">
          </div>
          <div class="col-md-12 text-center" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary" style="width:120px;position:relative">Denunciar</button>
          </div>
        </form>
      </div>
    </div>
  </div>





  <!-- Modal -->
  <div class="modal fade" id="social-share-content" tabindex="-1" role="dialog" aria-labelledby="report-contentTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
      <div class="modal-content" style="border-radius:10px;border:none">
        <div class="modal-header text-center"
          style="background : #dedcdc;color:#454545;border-top-left-radius: 10px;border-top-right-radius: 10px">
          <h5 class="modal-title"
            style="    font-size: 15px;font-weight: 600;text-align: center !important;display: block !important;width: 100%;">
            Compartir documento</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col-md-12" @click.prevent="share('facebook')"
            style="background:#3b5998;color:white;font-weight:600;text-align:left;padding:20px;margin-bottom:10px;border-radius:5px">
            Facebook
          </div>

          <div class="col-md-12" @click.prevent="share('twitter')"
            style="background:#00acee;color:white;font-weight:600;text-align:left;padding:20px;margin-bottom:10px;border-radius:5px">
            Twitter
          </div>


          <!-- <div class="col-md-12" @click.prevent="share('pinterest')" style="background:#c8232c ;color:white;font-weight:600;text-align:left;padding:20px;margin-bottom:10px;border-radius:5px">
              Pinterest
           </div> -->


          <div class="col-md-12" @click.prevent="share('linkedin')"
            style="background:#0e76a8  ;color:white;font-weight:600;text-align:left;padding:20px;margin-bottom:10px;border-radius:5px">
            Linkedin
          </div>

          <div class="col-md-12" @click.prevent="share('whatsapp')"
            style="background:#075e54  ;color:white;font-weight:600;text-align:left;padding:20px;margin-bottom:10px;border-radius:5px">
            Whatsapp
          </div>


          <hr />


          <div class="col-md-12"
            style="background:#F2F2F2  ;color:#141414;font-weight:600;text-align:left;padding:20px;margin-bottom:10px">
            Compartir link

            <input type="text" class="form-control" v-model="valUrl" readonly="true" style="    height: 30px;
   min-height: 33px;border-radius:30px;    border-radius: 30px;
   border: 1px solid rgb(199, 199, 199);
   background: rgb(231, 231, 231);margin-top:15px" />
          </div>



        </div>

      </div>
    </div>
  </div>








</template>



<style>
.icons-link {
   margin-right: 15px;
   opacity: 0.5;
 }

 .icons-link img {
   width: 15px;
   height: 15px;
 }

 .icons-link:hover {
   opacity: 1
 }

 .validate-true {
   filter: invert(84%) sepia(51%) saturate(911%) hue-rotate(344deg) brightness(101%) contrast(92%);
   transform: scale(1.5);
   opacity: 1;
 }
</style>


<script>


export default {

  props: ["id"],
  // components: { SWhatsApp },

  data() {
    return {
      baseurl: window.BASEURL,
      valUrl: window.BASEURL + '/share/w/' + this.$props.id,
      temp: {
        input: null
      },
      details: {
        copy: false,
        validate: false,
        owner: false,
      },
      endpoint: window.ENDPOINT,
      showToolbar: false,
    }
  },
  created() { },
  mounted() {
    setTimeout(() => {
      this.init();
      this.valUrl = this.baseurl + '/share/w/' + this.$props.id;

    }, 300)


  },
  computed: {},
  methods: {
    share(red) {
      // var thisUrl = window.location.href;
      var thisUrl = this.baseurl + '/share/w/' + this.$props.id;


      let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
      if (red === 'facebook') {
        var url = 'https://www.facebook.com/sharer/sharer.php?u='
      }
      if (red === 'twitter') {
        var url = 'https://twitter.com/intent/tweet?url='
      }
      if (red === 'pinterest') {
        var url = 'https://pinterest.com/pin/create/button/?url='
      }
      if (red === 'linkedin') {
        var url = 'https://www.linkedin.com/shareArticle?mini=true&url='
      }

      if (red === 'whatsapp') {
        var url = 'whatsapp://send?text='
      }

      window.open(url + thisUrl, 'test', params);
    },
    save() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auth: localStorage.getItem('auth'),
          type: 'writings',
          message: this.temp.input,
          id: this.$props.id
        })
      };
      fetch(window.ENDPOINT + '/requests/new/report', requestOptions).then(response => response.json()).then((data) => {
        this.$toast.success("Tu solicitud ha sido procesada. Muchas gracias por ayudarnos a mejorar", { position: "bottom-right" })
        $('#report-content').modal('hide')
        this.temp.input = null;
      })
    },
    openReportModal() {
      $('#report-content').modal('show')
    },

    openShareContent() {
      $('#social-share-content').modal('show')
    },
    init() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auth: localStorage.getItem('auth'),
          id: this.$props.id
        })
      };
      fetch(window.ENDPOINT + '/comunity/documents/check/details', requestOptions).then(response => response.json()).then((data) => {

        this.details = data;
        this.showToolbar = true;
      })

    },
    validateDocument() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auth: localStorage.getItem('auth'),
          id: this.$props.id
        })
      };
      fetch(window.ENDPOINT + '/comunity/document/validate', requestOptions).then(response => response.json()).then((data) => {

        if (data.success) {
          this.details.validate = true;
          this.$toast.success(
            "Contenido validado",
            {
              position: "bottom-right"
            }
          )
        } else {
          this.$toast.error(
            "Error",
            {
              position: "bottom-right"
            }
          )
        }
        this.$Progress.finish();
      })

    },
    saveDocument() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auth: localStorage.getItem('auth'),
          id: this.$props.id
        })
      };
      fetch(window.ENDPOINT + '/comunity/document/copy/writing', requestOptions).then(response => response.json()).then((data) => {
        if (data.insertedId) {
          this.details.copy = true;
          this.$toast.success(
            "El documento se ha guardado correctamente",
            {
              position: "bottom-right"
            }
          )
        } else {
          this.$toast.error(
            "Error",
            {
              position: "bottom-right"
            }
          )
        }
        this.$Progress.finish();

      })
    },
  }
}
</script>


