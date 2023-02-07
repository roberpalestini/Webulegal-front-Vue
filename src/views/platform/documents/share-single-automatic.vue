 <style>
 .activeMode {
  border-radius:30px;
  font-weight:600;
  padding:4px;
  background: #2b44ff !important;
  color: white  !important;
  font-size:14px;
  padding-left: 10px;
  padding-right: 10px;
 }
 </style>
<template>
  <navBar />

  <form >
     
  <div class="container-fluid">
    <div class="row">
     <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
      	<columnLeft />
      </div>
        <div class="col-md-10 text-center" style="padding:20px;border:1px solid #E2E2E2;background:rgb(255,255,255,0.1);height:calc(100vh - 70px);overflow:hidden;overflow-y:auto">
         <div class="row justify-content-center">
          
  <div class="col-12 text-left" style="padding-top:0;padding-bottom:20px;" >
    <a href="@" @click.prevent="$router.go(-1)" > <img src="@/assets/flecha-izquierda.svg" style="height:20px;width:20px;" /> </a>
</div>

          <div class="col-12 text-left">
            <b>{{document.data.title}}</b>
            <p>{{document.data.description}}</p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Compartido por: <b>{{document.data.user.data.profile.firstname}} {{document.data.user.data.profile.lastname}}</b></p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Puntuacion:   <div v-html="displayStars(document.data.cout_validate)" style="display:inline-block;" ></div> </p>
            <p style="padding:0;margin:0;margin-top:8px;font-size:14px;">Para crear el documento, completa el siguiente cuestionario</p>
          </div>

         <ToolBarDocument  v-bind:id="document._id"  v-if="getDetails" />


 

          <div class="col-4" style="position:relative;position:sticky;top:0;">
            <div class="col-12 view-writing-fields-content" >

 <div class="form-group" v-for="(field,index) in document.data.fields" style="text-align: left;padding: 10px;">
                <label style="font-size: 13px;color: black;font-weight: 600;">{{field.replace}}</label>
                <input type="text" class="form-control input-field " style="height: 30px !important;
    min-height: 30px !important;
    border-top: none !important;
    border-right: none !important;
    border-bottom: 2px solid rgb(141, 141, 141) !important;
    border-left: none !important;
    border-image: initial !important;
    background: transparent !important;
    font-size: 13px !important;
    color: black !important;
    font-weight: 500 !important;
    border-radius: 0 !important;" v-model="field.user.input"   @keyup="previewText(index)" />
              </div>


          <a class="btn btn-primary" style="width:120px;position:relative" @click="createDocument()" >Crear</a>

            </div>
          </div>
          <div class="col-8">
             <div class="col-12 view-writing-content">
              <div class="col-12 header">
                Previsualizacion del documento
              </div>
              <div class="col-12 content" v-html="content"> 
              </div>
            </div>
          </div>
          


 
         </div>
      </div>
    </div>
  </div>  
  </form>
</template>

 
<style>
    @import   '@/assets/platform.css';
    .icons-link {
margin-right:15px;
opacity:0.5;
    }
    .icons-link img {
      width:15px;height:15px;
    }
    .icons-link:hover {
     opacity: 1
    }

    .validate-true {
  filter: invert(84%) sepia(51%) saturate(911%) hue-rotate(344deg) brightness(101%) contrast(92%);
  transform: scale(1.5);
  opacity: 1;
}


.input-field {
    height: 30px !important;
    min-height: 30px !important;
    border-top: none !important;
    border-right: none !important;
    border-bottom: 2px solid rgb(141, 141, 141) !important;
    border-left: none !important;
    border-image: initial !important;
    background: transparent !important;
    font-size: 13px !important;
    color: black !important;
    font-weight: 500 !important;
    border-radius: 0 !important;
}
</style>

 
 
<script>
import ToolBarDocument from '@/components/platform/toolbar-writings-comunity.vue'

 export default {
  components : {
     ToolBarDocument
  },
    data() {
        return {
            auth: localStorage.getItem('auth'),
            endpoint: window.ENDPOINT + '/comunity/documents/get',
            endpointTextPreview: window.ENDPOINT + '/comunity/fields/preview',
            endpointSaveDocument: window.ENDPOINT + '/comunity/document/copy/writing',
            endpointDetails: window.ENDPOINT + '/writings/documents/check/details',
            documentCopy: false,
            details: {
                copy: false,
                validate: false,
            },
            fields: [],
            content: null,
            document: {
                data: {
                    title: '',
                    description: '',
                    content: '',
                    validate: false,
                    user: {
                        data: {
                            profile: {
                                lastname: null,
                                firstname: null,
                            }
                        }
                    }
                }
            },
        }
    },
    created() {
    // 	if(localStorage.getItem('auth') == undefined || localStorage.getItem('auth') == null ||  localStorage.getItem('auth') == '' ||   localStorage.getItem('auth') == ' '){
    //      this.$router.push({
    //                         name: 'home',
    //                         query: {
    //                             rel: window.location.href
    //                         }
    //      })
    // 	return;
    // }
    //     this.getDocument(this.$route.params.id) 
    },
    mounted() {},
    computed: {},
    methods: {
        createDocument() {
            this.$Progress.start();
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    id: this.document._id,
                    doc_original: this.document.data.doc_original,
                    fields: this.fields,
                    content:this.content
                })
            };
            fetch(window.ENDPOINT + '/comunity/document/create/writing', requestOptions).then(response => response.json()).then((data) => { 
                this.$Progress.finish();
                this.$toast.success("Documento creado correctamente", {
                    position: "bottom-right"
                })
                     this.$router.push({
                            name: 'my-writings-folders',
                            query: {
                                id: data.id
                            }
                        })
            })
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
            var out = '';
            while (e <= stars) {
                out = out + svg;
                // statement
                e++;
            }
            console.log(stars, e, out)
            return out;
        },
        getDocument(id) {
            this.$Progress.start();
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    id: id,
                })
            };
            fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
                this.document = data;
                this.fieldsDisplay(data.data.fields)
                this.content = data.data.content;
                this.getDetails = true;
                this.$Progress.finish();
            })
        },
        
        fieldsDisplay(data) { 
            this.fields = data;
        },
        changeMode(mode) {},
        search() {},
        pause() {},
        hover() {},
        fieldsDisplay(data) {
            this.fields = data;
        },
        previewText(index) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    id: this.$route.params.id,
                    fields: this.fields
                })
            };
            fetch(this.endpointTextPreview, requestOptions).then(response => response.json()).then((data) => {
                console.log(data)
                this.content = data.content;
            })
        }
    }
}
</script>

<script setup="">
import columnLeft from '@/components/platform/left.vue';
import navBar from '@/components/platform/navbar.vue';
 
</script>