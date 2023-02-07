<template>


  <a href="#" style="margin:5px" @click="openShareContent()"><img src="@/assets/cuota.svg"
      style="width:14px;height:14px;margin-right:5px" /></a>


  <!-- Modal -->
  <div class="modal fade" id="social-share-content" tabindex="-1" role="dialog" aria-labelledby="report-contentTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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


          <!--  <div class="col-md-12" @click.prevent="share('pinterest')" style="background:#c8232c ;color:white;font-weight:600;text-align:left;padding:20px;margin-bottom:10px;border-radius:5px">
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
.modal-dialog {
   /* width: 500px; */

   margin-bottom: 10vh;
 }

 .modal-dialog-centered {
   align-items: center
 }



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
  data() {
    return {
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
      baseurl: window.BASEURL,
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
    openShareContent() {
      $('#social-share-content').modal('show')
    },

  }
}
</script>

 
