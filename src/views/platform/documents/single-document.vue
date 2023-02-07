 <style>
.activeMode {
  border-radius: 30px;
  font-weight: 600;
  padding: 4px;
  background: #2b44ff !important;
  color: white !important;
  font-size: 14px;
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


                <div class="col-12 text-left" style="padding-top:0;padding-bottom:20px;" >
    <a href="@" v-tooltip="'Regresar'"  @click.prevent="$router.go(-1)" > <img src="@/assets/flecha-izquierda.svg" style="height:20px;width:20px;" /> </a>
</div>


          <div class="col-12">
          	<div class="row">

          		<div class="col-6 text-left">
            <b>{{document.data.title}}</b>
            <p>{{document.data.description}}</p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Compartido por: <b>{{document.data.user.data.profile.firstname}} {{document.data.user.data.profile.lastname}}</b></p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Puntuacion:   <div v-html="displayStars(document.data.cout_validate)" style="display:inline-block;" ></div> </p> 
          </div>
           

          	</div>
          </div>



          <ToolBarDocument  v-bind:id="document._id"  v-if="getDetails" />
<!-- 
          <div class="col-12 text-right" style="height:50px;">
              <a href="#" class="icons-link" v-if="!details.validate" @click="validateDocument()">
                <img src="@/assets/estrella.png"/>
              </a>
              <a href="#" class="icons-link validate-true" v-if="details.validate">
                <img src="@/assets/estrella.png"/>
              </a>
              <a href="#"  class="icons-link" @click="saveDocument()" v-if="!details.copy">
                <img src="@/assets/marcador.svg"/>
              </a>
               <a href="#"  class="icons-link"  v-if="details.copy">
                <img src="@/assets/etiqueta.png"/>
              </a>

               
              <a href="#"  class="icons-link">
                <img src="@/assets/cuota.svg"/>
              </a>
          </div>
 -->



 

           
             <div class="col-12" style="border-radius:8px;padding:0;border-radius:8px;border:1px solid #E2E2E2"> 
              <div class="col-12" style="height:auto;padding:20px;overflow:hidden;overflow-y:auto;color:black" v-html="content"> 
              </div>
            </div>
         
             

            <div class="col-12" style="margin-top:100px;">

<div class="col-12 text-left">
<b>Comentarios</b> 
</div>



 






<div class="col-12" style="margin-top:20px;display:flex;margin-bottom: 50px;" v-for="comment in comments" > 
    <!-- <div class="" style="    display: flex;
    width: 60px;
    justify-content: center;
    align-items: center;
    align-content: center;">
      <img
              :src="'https://ui-avatars.com/api/?background=000000&color=fff&name=' + comment.user.firstname + comment.user.lastname"
              style="height:50px;border-radius:100%;margin-right:10px"   />
    </div> -->

    <div class="" style=" 
        display: flex;
    width: auto;
    text-align: left;
    flex-direction: column; 
     ">

    <b style="font-size: 13px;">{{comment.user.firstname}} {{comment.user.lastname}}</b>
    <div class="" style="      display: flex;
    width: auto;
    background: rgb(246 246 246 / 39%);
    align-items: center;
    padding: 15px;
    border-radius: 14px;
    text-align: left;
    margin-top: 10px;
    border: 1px solid #d6d6d6;
    padding-left:20px;">
      {{comment.comment}} 

      <small style="font-size:11px;opacity:0.8;margin-left:20px;">{{comment.date}}</small>
    </div>
    </div>

    <div style="    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 50px;
    padding-left: 20px;
    padding-top:20px;">
      <a href="#"  v-tooltip="'Reportar Comentario'" 
 class="icons-link"  @click.prevent="openReportModal(comment._id)">
                <img src="@/assets/exclamation.svg"/>
              </a></div>
</div>


  

<form  @submit.prevent="saveComment()" class="col-12" style="margin-top:20px;display:flex">
 
    <!-- <div class="" style="display:flex;width:60px;">
      <img
              :src="'https://ui-avatars.com/api/?background=000000&color=fff&name=' + user.profile.firstname + user.profile.lastname"
              style="height:50px;border-radius:100%;margin-right:10px"   />
    </div> -->
    <div style="display:flex;width:100%;">
      <input type="text"  class="form-control" v-model="temp.comment" placeholder="Escribe un comentario.." style="
    border-radius: 30px;
    border: 1px solid rgb(199, 199, 199) !important;
    background: rgb(251 251 251) !important;
" />
    </div>
    <div style="display:flex;width:250px;">
      <button type="submit" class="btn btn-primary" style="width:auto;position:relative" >Enviar comentario</button>
    </div>
     
  </form> 
</div>
          


 
         </div>
      </div>
    </div>
  </div>  
  </main>


  
  
     <!-- Modal -->
     <div class="modal fade commentModal" id="report-content" tabindex="-1" role="dialog" aria-labelledby="report-contentTitle" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
         <div class="modal-content" style="border-radius:10px;border:none">
           <div class="modal-header text-center" style="background : #dedcdc;color:#454545;border-top-left-radius: 10px;border-top-right-radius: 10px">
             <h5 class="modal-title" style="    font-size: 15px;font-weight: 600;text-align: center !important;display: block !important;width: 100%;">Añadir nuevo comentario</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <form @submit.prevent="saveComment()" class="modal-body">  
             <div class="col-md-12" style="margin-top:20px;">
                <textarea  class="form-control" v-model="temp.comment" placeholder="Escribe un comentario.." style="min-height: 100px;border-radius:5px;    border-radius: 30px;border: 1px solid rgb(199, 199, 199);background: rgb(231, 231, 231);"></textarea>
             </div>
             <div class="col-md-12 text-center" style="margin-top:20px;">
                <button type="submit" class="btn btn-primary" style="width:auto;position:relative" >Enviar comentario</button>
            </div>
         </form> 
         </div>
       </div>
     </div>

 
 


     <!-- Modal -->
     <div class="modal fade" id="report-content-message" tabindex="-1" role="dialog" aria-labelledby="report-contentTitle" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
         <div class="modal-content" style="border-radius:10px;border:none">
           <div class="modal-header text-center" style="background : #dedcdc;color:#454545;border-top-left-radius: 10px;border-top-right-radius: 10px">
             <h5 class="modal-title" style="    font-size: 15px;font-weight: 600;text-align: center !important;display: block !important;width: 100%;">Denunciar comentario</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <form @submit.prevent="sendReport()" class="modal-body">
            ¿Por qué querés denunciar este comentario ?

             <div class="col-md-12" style="margin-top:20px;">
                <input type="text" class="form-control" v-model="temp.report" style="height: 30px;min-height: 33px;border-radius:30px;    border-radius: 30px;border: 1px solid rgb(199, 199, 199);background: rgb(231, 231, 231);">
             </div>
             <div class="col-md-12 text-center" style="margin-top:20px;">
                <button type="submit" class="btn btn-primary" style="width:120px;position:relative" >Denunciar</button>
            </div>
         </form> 
         </div>
       </div>
     </div>


</template>

 
<style>
@import "@/assets/platform.css";
.icons-link {
  margin-right: 15px;
  opacity: 0.5;
}
.icons-link img {
  width: 15px;
  height: 15px;
}
.icons-link:hover {
  opacity: 1;
}

.validate-true {
  filter: invert(84%) sepia(51%) saturate(911%) hue-rotate(344deg)
    brightness(101%) contrast(92%);
  transform: scale(1.5);
  opacity: 1;
}
</style>

 
 
<script>
import ToolBarDocument from "@/components/platform/toolbar-document-comunity.vue";

export default {
  components: {
    ToolBarDocument,
  },
  data() {
    return {
      comments : [],
      temp : {
        comment : null,
        report : null,
        id:null,
      },
      auth: localStorage.getItem("auth"),
      endpoint: window.ENDPOINT + "/comunity/documents/get",
      endpointTextPreview: window.ENDPOINT + "/comunity/fields/preview",

      endpointSaveDocument: window.ENDPOINT + "/comunity/document/copy/library",

      endpointDetails: window.ENDPOINT + "/comunity/documents/check/details",

      documentCopy: false,
      getDetails: false,

      user : {},

      fields: [],
      content: null,
      details: {
        copy: false,
        validate: false,
      },
      document: {
        data: {
          title: "",
          description: "",
          content: "",
          validate: false,
          user: {
            data: {
              profile: {
                lastname: null,
                firstname: null,
              },
            },
          },
        },
      },
    };
  },
  created() {
    this.getDocument(this.$route.params.id);
    // this.getDetails();
    this.getAllComments(this.$route.params.id);

    this.getUserData();
  },
  mounted() {},
  computed: {},
  methods: {
    sendReport() {
      const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type:'comment', 
                    message: this.temp.report,
                    id: this.temp.id,
                    auth: localStorage.getItem('auth')
                })
            };
            fetch(window.ENDPOINT +  '/requests/new/report/comments', requestOptions).then(response => response.json()).then((data) => {
                 this.$toast.success( "Tu solicitud ha sido procesada. Muchas gracias por ayudarnos a mejorar",{position: "bottom-right" })
                 $('#report-content-message').modal('hide') 
                 this.temp.report = null
            })  
    },
    openReportModal(target) {
            $('#report-content-message').modal('show')
            this.temp.id = target;
        },
    getUserData() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auth: localStorage.getItem('auth')
        })
      };
      fetch(window.ENDPOINT + '/users/auth', requestOptions).then(response => response.json()).then((data) => {
        this.user = data.data;
      })
    },
    getAllComments(target) { 
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: target, 
        }),
      }; 
      fetch(
        window.ENDPOINT + "/comunity/comments/document",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
           
         this.comments = data;
          
        });
    },
    saveComment() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.document._id,
          comment: this.temp.comment 
        }),
      }; 
      fetch(
        window.ENDPOINT + "/comunity/comments/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
          this.$toast.success( "Comentario publicado",{position: "bottom-right" })
          this.temp.comment = null
          $('.commentModal').modal('hide');
          this.getAllComments(this.$route.params.id);
          
        });
    },
    openNewComment() {
      $('.commentModal').modal('show');
    },
    getStars(count) {
      if (count <= 10) {
        return 1;
      }

      if (count <= 20) {
        return 2;
      }
      if (count <= 30) {
        return 3;
      }

      if (count <= 40) {
        return 4;
      }
      if (count <= 50) {
        return 5;
      }

      if (count >= 50) {
        return 5;
      }
    },
    displayStars(count) {
      var svg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" style="fill: #ead723"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/></g></svg>`;
      var stars = this.getStars(count);
      var e = 1;
      var out = "";
      while (e <= stars) {
        out = out + svg;
        // statement
        e++;
      }
      console.log(stars, e, out);
      return out;
    },
    getDocument(id) {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: id,
        }),
      };
      fetch(this.endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.getDetails = true;
          this.document = data;
          this.content = data.data.content;
          this.content = data.data.content.replace("http://", "https://");
          this.$Progress.finish();
        });
    },

    getDetails() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.$route.params.id,
        }),
      };
      fetch(this.endpointDetails, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.details = data;
          this.$Progress.finish();
        });
    },

    fieldsDisplay(data) {
      this.fields = data;
    },
    changeMode(mode) {},
    search() {},

    pause() {},
    hover() {},
  },
};
</script>

<script setup="">
import columnLeft from "@/components/platform/left.vue";
import navBar from "@/components/platform/navbar.vue";
</script>