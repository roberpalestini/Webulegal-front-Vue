 
<template>
    <navBar />
    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2" style="
              height: calc(100vh - 70px);
              overflow: hidden;
              overflow-y: auto;
              padding: 0;
            ">
            <columnLeft />
          </div>
          <div class="col-md-8 text-center create-doc-writing" style="padding-top: 0">
            <div class="row" style="height: 100%" v-if="help_view">
              <div class="col-12 text-left" style="margin-top: 20px">
                <a href="@" @click.prevent="$router.go(-1)" style="margin-top: 40px">
                  <img src="@/assets/flecha-izquierda.svg" style="height: 20px; width: 20px" />
                </a>
              </div>
  
              <div class="col-12" style="
                  height: 100%;
                  display: flex;
                  align-content: center;
                  justify-content: center;
                  align-items: center;
                ">
                <div class="row justify-content-center">
                  <div class="col-12" style="padding-top: 30px; padding-bottom: 30px">
                    <h4 style="font-weight: bold">
                      Instrucciones para automatizar escritos
                    </h4>
                  </div>
                  <div class="col-md-3">
                    <div class="col-12" style="
                        display: flex;
                        flex-direction: column;
                        align-content: center;
                        justify-content: center;
                        align-items: center;
                      ">
                      <div style="
                          height: 50px;
                          width: 50px;
                          color: white;
                          font-weight: 700;
                          border-radius: 100%;
                          margin-top: 15px;
                          margin-bottom: 15px;
                          display: flex;
                          background: #2b44ff;
                          justify-content: center;
                          align-items: center;
                          align-content: center;
                        ">
                        1
                      </div>
                      <p style="color: black; font-weight: 600">
                        Pega o redacta el escrito en el editor de texto
                      </p>
                    </div>
                  </div>
  
  
  
  
  
  
  
  
  
  
  
  
                  <div class="col-md-3">
                    <div class="col-12" style="
                        display: flex;
                        flex-direction: column;
                        align-content: center;
                        justify-content: center;
                        align-items: center;
                      ">
                      <div style="
                          height: 50px;
                          width: 50px;
                          color: white;
                          font-weight: 700;
                          border-radius: 100%;
                          margin-top: 15px;
                          margin-bottom: 15px;
                          display: flex;
                          background: #2b44ff;
                          justify-content: center;
                          align-items: center;
                          align-content: center;
                        ">
                        2
                      </div>
                      <p style="color: black; font-weight: 600">
                        Selecciona las palabras modificables de a una por vez
                      </p>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="col-12" style="
                        display: flex;
                        flex-direction: column;
                        align-content: center;
                        justify-content: center;
                        align-items: center;
                      ">
                      <div style="
                          height: 50px;
                          width: 50px;
                          color: white;
                          font-weight: 700;
                          border-radius: 100%;
                          margin-top: 15px;
                          margin-bottom: 15px;
                          display: flex;
                          background: #2b44ff;
                          justify-content: center;
                          align-items: center;
                          align-content: center;
                        ">
                        3
                      </div>
                      <p style="color: black; font-weight: 600; font-size: 14px">
                        Asignale el campo que corresponda con el dato a completar.
                        Por ej. "Nombre", "DNI" , etc.
                      </p>
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary" style="max-width: 200px" @click="
                      editor_view = true;
                      help_view = false;
                      startText();
                    ">
                      Siguiente <i class="fas fa-long-arrow-alt-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="row" v-if="editor_view">
              <div class="col-12 text-left">
                <a href="@" @click.prevent="
                  help_view = true;
                  editor_view = false;
                " style="position: absolute; z-index: 1000; margin-top: 20px">
                  <img src="@/assets/flecha-izquierda.svg" style="height: 20px; width: 20px" />
                </a>
              </div>
  
              <div class="col-12" style="position: relative">
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgb(0, 0, 0, 0.1);
                    z-index: 600;
                  " v-if="showEditorLoading">
                  <div class="spinner-border text-light spinner-border-sm" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div id="editparent" style="
                    text-align: left;
                    padding: 5px;
                    position: sticky;
                    background: #fbfbfb;
                    top: 0;
                  ">
                  <div id="editControls" style="text-align: left; padding: 5px">
                    <div class="btn-group">
                      <select class="btn" v-model="temp.editFont" @change="actionTeste($event, 'font')">
                        <option value="Arial">Arial</option>
                        <option value="Calibri">Calibri</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                      </select>
                    </div>
  
                    <div class="btn-group">
                      <a class="btn" @click="actionTeste($event, 'undo')" href="#"><span
                          class="material-icons">undo</span></a>
                      <a class="btn" @click="actionTeste($event, 'redo')" href="#"><span
                          class="material-icons">redo</span></a>
                    </div>
                    <div class="btn-group">
                      <a class="btn" @click="actionTeste($event, 'bold')" href="#"><span
                          class="material-icons">format_bold</span></a>
                      <a class="btn" @click="actionTeste($event, 'italic')" href="#"><span
                          class="material-icons">format_italic</span></a>
                      <a class="btn" @click="actionTeste($event, 'underline')" href="#"><span
                          class="material-icons">format_underline</span></a>
                      <a class="btn" @click="actionTeste($event, 'strikeThrough')" href="#"><span
                          class="material-icons">strikethrough_s</span></a>
                    </div>
                    <div class="btn-group">
                      <a class="btn" @click="actionTeste($event, 'justifyLeft')" href="#"><span
                          class="material-icons">format_align_left</span></a>
                      <a class="btn" @click="actionTeste($event, 'justifyCenter')" href="#"><span
                          class="material-icons">format_align_center</span></a>
                      <a class="btn" @click="actionTeste($event, 'justifyRight')" href="#"><span
                          class="material-icons">format_align_right</span></a>
                      <a class="btn" @click="actionTeste($event, 'justifyFull')" href="#"><span
                          class="material-icons">format_align_justify</span></a>
                    </div>
                    <div class="btn-group">
                      <a class="btn" @click="actionTeste($event, 'indent')" href="#"><span
                          class="material-icons">format_indent_increase</span></a>
                      <a class="btn" @click="actionTeste($event, 'outdent')" href="#"><span
                          class="material-icons">format_indent_decrease</span></a>
                    </div>
                    <div class="btn-group">
                      <a class="btn" @click="actionTeste($event, 'insertUnorderedList')" href="#"><span
                          class="material-icons">format_list_bulleted</span></a>
                      <a class="btn" @click="actionTeste($event, 'insertOrderedList')" href="#"><span
                          class="material-icons">format_list_numbered</span></a>
                    </div>
                    <div class="btn-group">
                      <a class="btn" data-role="h1" href="#">h<sup>1</sup></a>
                      <a class="btn" data-role="h2" href="#">h<sup>2</sup></a>
                      <a class="btn" data-role="p" href="#">p</a>
                    </div>
                    <div class="btn-group">
                      <a class="btn" data-role="subscript" href="#"><i class="icon-subscript"></i></a>
                      <a class="btn" data-role="superscript" href="#"><i class="icon-superscript"></i></a>
                    </div>
  
  
                    <div class="btn-group">
                      <a class="btn" data-role="subscript" href="#" style="    display: flex;
      font-weight: 600;
      border: 1px solid #b2acac;font-size: 15px;" @click.prevent="openAddField()"><span class="material-icons"
                          style="font-size:22px;">add</span> Nuevo campo</a>
                    </div>
  
  
                  </div>
                </div>
  
                <div id="editor3" style="
                    width: 100%;
                    padding: 20px;
                    outline: none !important;
                    border: 1px solid dashed #d9d9d9 !important;
                  " contenteditable="true" class="text-left" v-html="contentText"
                  data-text="Pegá o escribí acá el modelo de escrito que querés automatizar"></div>
              </div>
            </div>
          </div>
  
          <div class="col-md-2" style="
              height: calc(100vh - 70px);
              overflow: hidden;
              overflow-y: scroll;
              padding: 0;
              text-align: center;
              padding: 20px;
            " v-if="fields.length > 0">
            <ul style="
                padding: 0;
                list-style: none;
                border: 1px solid #cfcfcf;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
              " v-if="editor_view">
              <li style="
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  background: #e0dede;
                  padding: 5px;
                  text-align: center;
                  font-weight: 700;
                  border-bottom: 1px solid #c9c9c9;
                ">
                Campos
              </li>
              <li  
                v-for="(field, index) in fields" @mouseover="mouseoverfield(index)" @mouseleave="mouseleavefield(index)"   >
                
                <div style="display:block;padding: 5px; border-bottom: 1px solid #c9c9c9;word-wrap: break-word;" v-if="field.existent == false" >
                  {{ field.field }}
                <a href="#" @click="removefield(index)"> <img src="@/assets/cerrar-simbolo-de-boton-circular.png"
                    style="max-width: 15px; max-height: 15px" /></a>
                  </div> 
              </li>
            </ul>
  
            <div class="col-12" style="position: relative" v-if="editor_view">
              <button type="submit" class="btn btn-primary" style="width: 120px; position: relative" @click="save()"
                v-if="!shopsavepop">
                Crear
              </button>
  
              <button type="submit" class="btn btn-primary" style="width: 120px; position: relative" disabled="true"
                v-if="shopsavepop">
                <div class="spinner-border text-light spinner-border-sm" role="status"
                  style="width: 15px; height: 15px; border-width: 1px; margin: 0">
                  <span class="sr-only">Loading...</span>
                </div>
              </button>
  
              <div style="
                  display: flex;
                  top: 0px;
                  left: 0px;
                  right: 0px;
                  position: fixed;
                  bottom: 0;
                  align-content: center;
                  justify-content: center;
                  align-items: center;
                " v-if="popshared">
                <div style="
                    color: rgb(52, 52, 52);
                    width: 355px;
                    right: 180px;
                    font-size: 14px;
                    border-radius: 8px;
                    font-weight: 600;
                    background: #e7e7e7;
                    padding: 10px;
                  ">
  
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                    @click="popshared = false"><span aria-hidden="true">×</span></button>
  
  
                  El escrito automatizado se guardara en tu carpeta privada "Mis
                  escritos". ¿Queres compartirlo con la comunidad legal?
                  <div class="col-12 text-right" style="display: flex">
                    <button class="btn btn-primary" style="margin: 5px" @click="saveShare(1)"
                      :disabled="saveLoadingShareDisabled">
                      <span v-if="!saveLoadingShare">Si</span>
                      <div class="spinner-border spinner-border-sm" role="status" v-if="saveLoadingShare" style="
                          height: 10px;
                          margin: 0px;
                          padding: 0px;
                          width: 10px !important;
                          color: white;
                          margin-top: -10px !important;
                        ">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </button>
  
                    <button href="#" class="btn btn-primary" style="margin: 5px" @click="saveShare(0)"
                      :disabled="saveLoadingNtShareDisabled">
                      <span v-if="!saveLoadingNtShare">No</span>
                      <div class="spinner-border spinner-border-sm" role="status" v-if="saveLoadingNtShare" style="
                          height: 10px;
                          margin: 0px;
                          padding: 0px;
                          width: 10px !important;
                          color: white;
                          margin-top: -10px !important;
                        ">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  
  
  
  
  
  
  
  
  
  
  
  
  
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content" style="border-radius: 10px; border: none">
          <div class="modal-header text-center">
            <h5 class="modal-title" style="padding-left:20px">Asignar campo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-danger" style="padding:0;">
            <form @submit="replaceSelectedText" style="padding:20px">
              <input type="text" class="form-control" style="
              font-weight: 600;
              height: 32px !important;
              max-height: 32px !important;
              min-height: 32px !important;
              font-size: 16px;
              background: #efefef;
              border-radius: 30px !important;
            " v-model="replace_text.target" id="popup-selected-text-input" />
  
              <div class="col-12 text-center" style="padding-top: 10px">
                <button type="submit" class="btn btn-primary" style="width: 100px">
                  Crear
                </button>
              </div>
            </form>
  
  
            <div class="modal-header text-center" style="padding: 10px;
      border-radius: 0 !important;"  v-if="fields.length > 0">
            <h5 class="modal-title" >Repetir campo</h5> 
          </div>
  
  
            <ul style="
            padding: 0px;
            list-style: none;
            max-height: 100px;
            overflow: hidden;
            overflow-y: scroll;
          "
            v-if="fields.length > 0">
              <li 
              
              v-for="(field, index) in fields" 
               
               >
                <a href="#" @click="addExistentField($event,index)" @mouseover="mouseoverfield(index)"  v-if="field.existent == false" 
                  @mouseleave="mouseleavefield(index)" style="padding: 7px; border-bottom: 1px solid #c9c9c9;width:100%;display:block;position:relative">{{ field.field }} 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
  
   
  </template>
  <style>
  @import "@/assets/platform.css";
  
  .text-map {
    border-bottom: 1px solid transparent;
  }
  
  .text-map:hover {
    border-bottom: 1px solid #3c00ff;
  }
  
  .text-map-hover {
    border-bottom: 1px solid #3c00ff;
    background: #3000ff;
    color: white;
  }
  
  .categorieActive {
    border: 1px solid #2b44ff !important;
    color: #2b44ff !important;
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
  }
  </style>
   
  
  
  <script> 
  import "@vueup/vue-quill/dist/vue-quill.snow.css"; 
  import striptags from 'striptags';
   
  
  function eliminarDiacriticosEs(texto) {
    return texto
      .normalize("NFD")
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        "$1"
      )
      .normalize();
  }
  
  var sel, range, base;
   
  export default {
    data() {
      return {
        data: {},
        auth: localStorage.getItem("auth"),
        endpointUpload: window.ENDPOINT + "/upload",
        endpoint: window.ENDPOINT + "/writings/create",
        endpointTags: "http://api.webu.lt/search/tags/default",
        endpointGetAll: "http://api.webu.lt/writings",
        endpointShare: "http://api.webu.lt/document/update/share",
        popshared: false,
        help_view: true,
        editor_view: false,
        categories_view: false,
        searchInputTags: null,
        editor: null,
        showEditorLoading: false,
        showPopSelected: false,
        getSelection: null,
        replace_text: { target: null },
        temp_content: null,
        fields: [],
        replaceforExistent: false,
        replaceforExistentIndex: 0,
        shopsavepop: false,
        titleDocument: null,
        descriptionDocument: null,
        saveLoadingShare: false,
        saveLoadingShareDisabled: false,
        saveLoadingNtShare: false,
        saveLoadingNtShareDisabled: false,
        categories: [
          {
            id: 1,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
          {
            id: 2,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
          {
            id: 3,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
          {
            id: 4,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
          {
            id: 5,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
          {
            id: 6,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
          {
            id: 7,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
          {
            id: 8,
            title: "Titulo de la categoria",
            description: " descripcion de la categoria ",
            active: 0,
          },
        ],
        categoriesSelected: [],
        tags: [],
        tagSelected: [],
        selected: {
          row: null,
          clientX: null,
          clientY: null,
        },
        temp: {
          editFont: "Arial",
        },
      };
    },
    created() {
      this.contentText = "";
    },
    mounted() { 
    },
    computed: { 
      
    }, 
    methods: {
  
      countExistentFieldTotal(id) {
        var countTotal = 0;
          this.fields.forEach(element => { 
              if(id == element.existent_id) {
                 countTotal++;
              } 
          }); 
        return countTotal;
      }, 
      
      actionTeste(event, role) {
        if (role == "font") {
          document.execCommand("fontName", false, this.temp.editFont);
          return;
        }
        switch (role) {
          case "h1":
          case "h2":
          case "p":
            document.execCommand("formatBlock", false, role);
            break;
          default:
            document.execCommand(role, false, null);
            break;
        }
      },
      saveShare(value) {
        console.log(this.data);
        if (value == 1) {
          this.saveLoadingShare = true;
          this.saveLoadingNtShareDisabled = true;
          this.saveLoadingShareDisabled = true;
          setTimeout(() => {
            this.$router.push({
              name: "autowriting-organize",
              params: { id: this.data.insertedId },
            });
          }, 1500);
        } else {
          this.saveLoadingNtShare = true;
          this.saveLoadingShareDisabled = true;
          this.saveLoadingNtShareDisabled = true;
          this.popshared = false;
  
          this.$router.push({
            name: "my-writings-folders",
            query: {
              id: this.data.insertedId,
            },
          });
          this.$toast.success("Escrito creado", { position: "bottom-right" });
  
          // setTimeout(() => {
          //      this.$router.push({ name: 'my-writings-view-automatic-document', params: { id: this.data.id }})
          //  },1500)
        }
      },
      removeTag(index) {
        this.tagSelected.splice(index, 1);
      },
      selectTag(index) {
        this.tagSelected.push(this.tags[index]);
      },
      searchTags() {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.auth,
            search: this.searchInputTags,
          }),
        };
        fetch(this.endpointTags, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.tags = data;
          });
      },
  
      selectCategorie(index) {
        this.categoriesSelected.push(this.categories[index]);
      },
      activeClass(index, id) {
        if (this.categories[index].active == 1) {
          this.categories[index].active = 0;
        } else {
          this.categories[index].active = 1;
        }
      },
      save() {
        this.shopsavepop = true;
  
        var temp = [];
        var copy = this.fields;
        for (var i = copy.length - 1; i >= 0; i--) {
          copy[i].element = null;
          copy[i].user = {
            input: null,
            data: null,
          };
          temp.push(copy[i]);
        }
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.auth,
            data: { 
              content: document.querySelector("#editor3").innerHTML,
              fields: temp,
              title: "Documento sin titulo", //this.titleDocument,
              description: "Documento sin descripcion", //this.descriptionDocument,
              categories: [],
              tags: [],
            },
          }),
        };
        fetch(this.endpoint, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setTimeout(() => {
              this.shopsavepop = false;
              this.popshared = true;
            }, 1500);
            this.data = data;
          });
      },
      removefield(index) {
  
        console.log(this.fields)
        var fieldData = this.fields[index];
  
        var element = this.fields[index].element;
        element.outerHTML = element.getAttribute("base");
        element.classList.remove("text-map-hover");
  
  
        // this.fields.splice(index, 1);
  
  
  
        if(fieldData.existent == false) {
  
   
        var targets = [];
  
  
        var ts = 0;
        while (ts <= t)
           
         for (let i = 0; i < this.fields.length; i++) {
           
  
          // this.events.splice(this.events.indexOf(event), 1);
  
  
          // if(this.fields[i].existent_id !== fieldData.id) {
          //   targets.push(this.fields[i])
          // }
  
          // const indexOfObject = this.fields.findIndex(object => {
          //           return object.existent_id === fieldData.id;
          // });
  
          // var element = this.fields[indexOfObject].element;
          //     element.outerHTML = element.getAttribute("base");
          //     element.classList.remove("text-map-hover"); 
          //     this.fields.splice(indexOfObject, 1);
  
  
            // var  target = this.fields[i]; 
            // if(target.existent_id && target.existent_id ==  fieldData.id) {
            //   console.log('delete')
            //   var element = this.fields[i].element;
            //   element.outerHTML = element.getAttribute("base");
            //   element.classList.remove("text-map-hover"); 
            //   this.fields.splice(i, 1);
  
            // }
          };
        }
        
  
        // if(this.fields[index].existent_fields) {
        //   console.log(this.fields[index].existent_fields)
        //   for (let u = 0; u < this.fields[index].existent_fields.length; u++) {  
        //     console.log(u)
        //     var element = this.fields[index].existent_fields[u].element;
        //     element.outerHTML = element.getAttribute("base");
        //     element.classList.remove("text-map-hover");
        //     console.log({index : u , target : this.fields[index].existent_fields[u].replace})
        //     this.fields[index].existent_fields.splice(u, 1);
        //   }
        // }
  
        setTimeout(() => {
          this.fields.splice(index, 1);
        },1000)
         
         
      },
      mouseoverfield(index) {
        var element = this.fields[index].element;
        element.className = "text-map-hover";
        console.log(element);
      },
      mouseleavefield(index) {
        var element = this.fields[index].element;
        element.classList.remove("text-map-hover");
        console.log(element);
      },
  
      addExistentField(event, index) {
        this.replaceforExistent = true;
        this.replaceforExistentIndex = index;
        this.replaceSelectedText(event);
      },
  
      openModalChangeText() {
        sel = window.getSelection();
        base = window
          .getSelection()
          .anchorNode.data.substring(
            window.getSelection().anchorOffset,
            window.getSelection().extentOffset
          );
        range = sel.getRangeAt(0);
  
        let selection = window
          .getSelection()
          .anchorNode.textContent.substring(
            window.getSelection().extentOffset,
            window.getSelection().anchorOffset
          );
  
        if (selection.length !== 0) {
          //open popup in cursor
          var event;
          // const onMouseMove = (e) => {
          //   var popup = document.querySelector("#popup-selected-text");
          //   popup.style.left = e.pageX + 20 + "px";
          //   popup.style.top = e.pageY + 20 + "px";
          //   popup.style.visibility = "visible";
          //   document.removeEventListener("mousemove", onMouseMove);
          // };
  
          // var event = document.addEventListener("mousemove", onMouseMove);
        }
      },
  
  
  
      openAddField() {
        $('#staticBackdrop4').modal('show');
      },
  
      replaceSelectedText(e) {
        console.log(this.fields)
        e.preventDefault();
        if (this.replaceforExistent) {
          var element = this.fields[this.replaceforExistentIndex].element;
          this.replace_text.target = element.getAttribute("replace");
          // this.replaceforExistent = false;
        }
        range.deleteContents();
  
        var a = document.createElement("a");
        a.innerText = "[" + this.replace_text.target + "]";
        a.className = "text-map";
        a.className = "testeo";
        var id = Math.ceil(Math.random() * 1000000);
        a.setAttribute("data-id", id);
        a.setAttribute("replace", this.replace_text.target);
        a.setAttribute(
          "base",
          eliminarDiacriticosEs(base)
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/&nbsp;/g, "")
        );
  
        var newField;
  
  
        if (this.replaceforExistent) {
          if(!this.fields[this.replaceforExistentIndex].existent_fields) {
            this.fields[this.replaceforExistentIndex].existent_fields = []; 
          }
          
          var existent_id = this.fields[this.replaceforExistentIndex].id;
          
          newField = {
            existent:true,
            existent_index :  this.replaceforExistentIndex,
            existent_id : existent_id,
            field: this.replace_text.target,
            element: a,
            id: id,
            replace: this.replace_text.target,
            base: eliminarDiacriticosEs(base)
              .replace(/[^a-zA-Z ]/g, "")
              .replace(/&nbsp;/g, ""),
          };
          this.replaceforExistent = false;
  
  
          this.fields[this.replaceforExistentIndex].existent_fields.push(newField)
        } else {
          newField = {
            existent: false,
            field: this.replace_text.target,
            element: a,
            id: id,
            replace: this.replace_text.target,
            base: eliminarDiacriticosEs(base)
              .replace(/[^a-zA-Z ]/g, "")
              .replace(/&nbsp;/g, ""),
          };
        }
  
        this.fields.push(newField);
  
        range.insertNode(a);
  
        this.replace_text.target = null;
        // var popup = document.querySelector("#popup-selected-text");
        // popup.style.visibility = "hidden";
        $('#staticBackdrop4').modal('hide');
      },
  
      next() {
        this.text_view = true;
  
        this.help_view = false;
  
        this.categories_view = false;
  
        setTimeout(() => {
          ["mouseup", "keyup", "selectionchange"].forEach((e) => {
            document
              .querySelector("#editor3")
              .addEventListener(e, this.openModalChangeText);
          });
        }, 1000);
      },
  
      startText() {
        setTimeout(() => {
          ["mouseup", "keyup", "selectionchange"].forEach((e) => {
            document
              .querySelector("#editor3")
              .addEventListener(e, this.openModalChangeText);
          });
  
  
          document
            .querySelector("#editor3")
            .addEventListener("paste", (e) => {
              e.preventDefault();
              var contentOnBlur = (e.originalEvent || e).clipboardData.getData('text/html') || prompt('Paste something..');
              // contentOnBlur = contentOnBlur.replace(/(<([^>]+)>)/ig,''); 
              contentOnBlur = striptags(contentOnBlur, ['span', 'table', 'tbody', 'tr', 'td', 'h1', 'h2', 'h3', 'h4', 'h5', 'b', 'em', 'strong', 'br', 'u', 'strike', 'p']);
              document.execCommand('insertHtml', false, contentOnBlur.replace(/[\s;]background-color:[^;]+(?=;)|^background-color:[^;]+;/g, '').replace(/[\s;]color:[^;]+(?=;)|^color:[^;]+;/g, ''));
            })
  
  
        }, 300);
      },
    },
  };
  </script>
  
  <script setup>
  import columnLeft from "@/components/platform/left.vue";
  import navBar from "@/components/platform/navbar.vue";
  import { Editable } from "@livingdocs/editable.js/src/core";
  </script>