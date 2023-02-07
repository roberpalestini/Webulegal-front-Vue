 
<template>
  <navBar />
  <main>
    <div class="container-fluid">










      <div class="row">
        <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;">
          <columnLeft />
        </div>
        <div class="col-md-10 text-center create-doc-normal">















          <div class="row" v-if="editor_view">


            <div class="col-12 text-left" style="padding-top:20px;padding-bottom:20px;">
              <a href="@" @click.prevent="$router.go(-1)"> <img src="@/assets/flecha-izquierda.svg"
                  style="height:20px;width:20px;" /> </a>
            </div>




            <div id="editparent" class="col-12" style="       text-align: left;
  padding: 5px;
  position: sticky;
  background: #fbfbfb;
  top:0;">
              <div id='editControls' style='text-align:center; padding:5px;'>
                <div class="btn-group">
                  <select class="btn" v-model="temp.editSize" @change="actionTeste($event, 'size')">
                    <option value="1">8px</option>
                    <option value="2">10px</option>
                    <option value="3">12px</option>
                    <option value="4">14px</option>
                    <option value="5">16px</option>
                    <option value="6">18px</option>
                    <option value="7">20px</option>

                  </select>
                </div>
                <div class='btn-group'>
                  <a v-tooltip="'Deshacer'" class='btn' @click="actionTeste($event, 'undo')" href='#'><span
                      class="material-icons">undo</span></a>
                  <a v-tooltip="'Rehacer'" class='btn' @click="actionTeste($event, 'redo')" href='#'><span
                      class="material-icons">redo</span></a>
                </div>
                <div class='btn-group'>
                  <a v-tooltip="'Bold'" class='btn' @click="actionTeste($event, 'bold')" href='#'><span
                      class="material-icons">format_bold</span></a>
                  <a v-tooltip="'Italic'" class='btn' @click="actionTeste($event, 'italic')" href='#'><span
                      class="material-icons">format_italic</span></a>
                  <a v-tooltip="'Underline'" class='btn' @click="actionTeste($event, 'underline')" href='#'><span
                      class="material-icons">format_underline</span></a>
                  <a v-tooltip="'Tachar'" class='btn' @click="actionTeste($event, 'strikeThrough')" href='#'><span
                      class="material-icons">strikethrough_s</span></a>
                </div>
                <div class='btn-group'>
                  <a v-tooltip="'Alinear Izquierda'" class='btn' @click="actionTeste($event, 'justifyLeft')"
                    href='#'><span class="material-icons">format_align_left</span></a>
                  <a v-tooltip="'Alinear Centro'" class='btn' @click="actionTeste($event, 'justifyCenter')"
                    href='#'><span class="material-icons">format_align_center</span></a>
                  <a v-tooltip="'Alinear Derecha'" class='btn' @click="actionTeste($event, 'justifyRight')"
                    href='#'><span class="material-icons">format_align_right</span></a>
                  <a v-tooltip="'Justificar'" class='btn' @click="actionTeste($event, 'justifyFull')" href='#'><span
                      class="material-icons">format_align_justify</span></a>
                </div>
                <div class='btn-group'>
                  <a v-tooltip="'Agregar Sangria'" class='btn' @click="actionTeste($event, 'indent')" href='#'><span
                      class="material-icons">format_indent_increase</span></a>
                  <a v-tooltip="'Eliminar Sangria'" class='btn' @click="actionTeste($event, 'outdent')" href='#'><span
                      class="material-icons">format_indent_decrease</span></a>
                </div>
                <div class='btn-group'>
                  <a v-tooltip="'Lista'" class='btn' @click="actionTeste($event, 'insertUnorderedList')" href='#'><span
                      class="material-icons">format_list_bulleted</span></a>
                  <a v-tooltip="'Lista Numerada'" class='btn' @click="actionTeste($event, 'insertOrderedList')"
                    href='#'><span class="material-icons">format_list_numbered</span></a>
                </div>

                <div class='btn-group'>
                  <a class='btn' data-role='subscript' href='#'><i class='icon-subscript'></i></a>
                  <a class='btn' data-role='superscript' href='#'><i class='icon-superscript'></i></a>
                </div>

                <div class='btn-group'>
                  <form>
                    <!-- actual upload which is hidden -->
                    <input type="file" id="actual-btn" hidden @change="attachFile($event)" />

                    <!-- our custom upload button -->
                    <label for="actual-btn" class='btn btn-attach'><span class="material-icons">attach_file </span>
                      Adjuntar archivo</label>

                  </form>
                </div>
              </div>

            </div>

            <div id="editor3"
              style="width:100%;padding:20px;outline:none !important;border:1px solid dashed #D9D9D9 !important;min-height: 350px;color:black"
              contenteditable="true" class="text-left" v-html="contentText"
              data-text="Pega o escribi aca el contenido legal que quieras agregar.">




            </div>












            <div class="col-12" style="position:relative" v-if="editor_view">
              <button type="submit" class="btn btn-primary" style="width:120px;position:relative" @click="save()"
                v-if="!shopsavepop">Crear</button>


              <button type="submit" class="btn btn-primary" style="width:120px;position:relative" disabled="true"
                v-if="shopsavepop">
                <div class="spinner-border text-light spinner-border-sm" role="status" style="width: 15px;
  height: 15px;
  border-width: 1px; 
  margin: 0;">
                  <span class="sr-only">Loading...</span>
                </div>
              </button>

              <!-- v-if="popshared" -->
              <div style="    display: flex;
  top: 0px;
  left: 0px;
  right: 0px;
  position: fixed;
  bottom: 0;
  align-content: center;
  justify-content: center;
  align-items: center;" v-if="popshared">
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

                  El archivo de biblioteca se guardará en tu carpeta privada “Mi biblioteca”. ¿Querés compartirlo con la
                  comunidad legal?
                  <div class="col-12 text-right" style="
  display: flex;
">

                    <button class="btn btn-primary" style="margin:5px;" @click="saveShare(1)"
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


                    <button href="#" class="btn btn-primary" style="margin:5px" @click="saveShare(0)"
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
    </div>
  </main>

  <!-- 
<div id="editor3"   style="width:100%;padding:20px;outline:none !important;border:1px solid dashed #D9D9D9 !important "  contenteditable="true" class="text-left"  >

<vue-pdf-embed :source="source1" />
</div>
-->



</template>
<style>
@import '@/assets/platform.css';

.btn-attach {
  background: #efeded;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #6e6e6e;
}

.text-map {
  border-bottom: 1px solid transparent;
}

.text-map:hover {
  border-bottom: 1px solid #3C00FF;
}

.text-map-hover {
  border-bottom: 1px solid #3C00FF;
  background: #3000FF;
  color: white;
}

.categorieActive {
  border: 1px solid #2b44ff !important;
  color: #2b44ff !important;
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
  border-top: 0px;
  border-top: 1px solid #cfcfcf;
}

.ql-toolbar.ql-snow {
  border: 1px solid #d1d5db;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  padding: 8px;
  border: none;
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
  border-top: 0px;
  background: white;
  border: transparent;
}

.ql-video,
.ql-image,
.ql-link,
.ql-size,
.ql-code-block {
  display: none !important;
}

#toolbarViewer {
  height: 32px;
  background: #f4f2f2 !important;
}

iframe {
  border: 1px solid #bbbbbb;
  border-radius: 8px;
  width: 100% !important;
}

.ql-toolbar.ql-snow {
  border: 1px solid #d1d5db;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  padding: 8px;
  border: none;
  top: 0;
  position: sticky;
  z-index: 1000;
  background: #f4f2f2;
}
</style>

<script setup>
import columnLeft from '@/components/platform/left.vue';
import navBar from '@/components/platform/navbar.vue';
import { Editable } from '@livingdocs/editable.js/src/core'

</script>

<script>
import striptags from 'striptags';



export default {
  components: {

  },
  data() {
    return {
      editor: null,

      data: {},
      auth: localStorage.getItem('auth'),
      endpointUpload: window.ENDPOINT + '/upload',
      endpoint: window.ENDPOINT + '/documents/save',

      endpointShare: window.ENDPOINT + '/documents/save',
      popshared: false,
      editor_view: true,
      categories_view: false,
      searchInputTags: null,
      showEditorLoading: false,
      showPopSelected: false,
      getSelection: null,
      replace_text: null,
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
      attachFiles: [],
      temp: {
        editFont: "Arial",
        editSize: null
      },

    }
  },
  created() {
    this.contentText = ``;

  },
  mounted() {

    document
      .querySelector("#editor3")
      .addEventListener("paste", (e) => {
        e.preventDefault();
        var contentOnBlur = (e.originalEvent || e).clipboardData.getData('text/html') || prompt('Paste something..');
        // contentOnBlur = contentOnBlur.replace(/(<([^>]+)>)/ig,''); 
        contentOnBlur = striptags(contentOnBlur, ['span', 'table', 'tbody', 'tr', 'td', 'h1', 'h2', 'h3', 'h4', 'h5', 'b', 'em', 'strong', 'br', 'u', 'strike', 'p']);
        document.execCommand('insertHtml', false, contentOnBlur.replace(/[\s;]background-color:[^;]+(?=;)|^background-color:[^;]+;/g, '').replace(/[\s;]color:[^;]+(?=;)|^color:[^;]+;/g, ''));
      })


    //   document.querySelector('#editor3').addEventListener('paste', (event) => {



    //      let paste = (event.clipboardData || window.clipboardData).getData('text');
    //       paste.replace(/<[^>]*>?/gm, '');

    //     const selection = window.getSelection();
    //     if (!selection.rangeCount) return false;
    //     selection.deleteFromDocument();
    //    selection.getRangeAt(0).insertNode(document.createTextNode(paste));


    //     event.preventDefault();
    // });

  },
  methods: {
    attachFile(event) {
      this.$Progress.start();
      console.log(event)
      const files = event.target.files[0];
      const formData = new FormData()
      formData.append('file', files)

      fetch(this.endpointUpload, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            const url = window.PATHUPLOAD + data.data.name;

            // if(data.data.ext === ".doc") {
            if (data.data.ext.startsWith('.doc')) {

              // $('#editor3').append(` <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=https://www.mtsac.edu/webdesign/accessible-docs/word/example03.docx" width="100%" height="500px"></iframe><br/><p></p>`)
              $('#editor3').append(` <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=` + url + `" width="100%" height="500px"></iframe><br/><p></p>`)
            }


            if (data.data.ext === ".pdf") {
              $('#editor3').append(` <iframe src="` + url + `" width="100%" height="500px"></iframe><br/><p></p>`)
            }

            // if(data.data.ext === ".xls") {
            if (data.data.ext.startsWith('.xl')) {
              // $('#editor3').append(` <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=https://dornsife.usc.edu/assets/sites/298/docs/ir211wk12sample.xls" width="100%" height="500px"></iframe><br/><p></p>`) 

              $('#editor3').append(` <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=` + url + `" width="100%" height="500px"></iframe><br/><p></p>`)
            }
            this.attachFiles.push(data.data);

            this.$Progress.finish();
          }
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    actionTeste(event, role) {
      if (role == "size") {
        document.execCommand("fontSize", false, this.temp.editSize)
      }
      switch (role) {
        case 'h1':
        case 'h2':
        case 'p':
          document.execCommand('formatBlock', false, role);
          break;
        default:
          document.execCommand(role, false, null);
          break;
      }
    },

    saveShare(value) {
      this.$Progress.start();
      if (value == 1) {
        this.saveLoadingShare = true;
        this.saveLoadingNtShareDisabled = true;
        this.saveLoadingShareDisabled = true;
        this.$router.push({ name: 'document-organize', params: { id: this.data.insertedId } })

      } else {
        this.saveLoadingNtShare = true;
        this.saveLoadingShareDisabled = true;
        this.saveLoadingNtShareDisabled = true;
        this.popshared = false;

        this.$router.push({
          name: 'librarie',
        })
        this.$toast.success("Archivo creado", { position: "bottom-right" })
      }
      this.$Progress.finish();
    },

    save() {
      this.shopsavepop = true;

      var temp = [];
      var copy = this.fields;
      for (var i = copy.length - 1; i >= 0; i--) {
        copy[i].element = null;
        temp.push(copy[i]);
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auth: this.auth,
          data: {
            type: 'document',
            content: document.querySelector('#editor3').innerHTML,
            fields: temp,
            title: 'Documento sin titulo', //this.titleDocument,
            description: 'Documento sin descripcion', //this.descriptionDocument, 
            categories: [],
            tags: [],
            attachment: this.attachFiles
          }

        })
      };
      fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
        console.log(data)
        setTimeout(() => {
          this.shopsavepop = false;
          this.popshared = true;
        }, 1500)
        this.data = data;
      })
    },


    next() {
      this.text_view = true;

      this.help_view = false;

      this.categories_view = false;



    }
  }
}

</script>

