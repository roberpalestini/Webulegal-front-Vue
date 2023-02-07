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
        <div class="col-md-10" style="height: calc(100vh - 70px); border: 1px solid #e2e2e2">
          <!-- ======================================= -->

          <div class="row">
            <div class="col-md-3" style="height: calc(100vh - 70px)">
              <div class="col-12" style="
                    font-weight: 600;
                    color: black;
                    padding-top: 2.5px;
                    padding-bottom: 2.5px;
                    border-bottom: 1px solid #e6e6e6;
                  ">
                Etiquetas
              </div>
              <!--  <div class="col-12 text-center" style="padding-top:2.5px;padding-bottom:2.5px;border-bottom:1px solid #E5E5E5">
                                     <a href="#" style="font-size:13px;">Nueva carpeta</a>
                                   </div>  -->
              <div class="col-12 text-center" style="
                    padding-top: 8.5px;
                    padding-bottom: 8.5px;
                    border-bottom: 1px solid #e5e5e5;
                  ">
                <input type="text" class="form-control type-input-3" v-model="searchTarget.target"
                  placeholder="Buscar etiqueta.." />
              </div>
              <div class="col-12" style="padding-top: 10px; padding-bottom: 10px">
                <div class="spinner-border spinner-border-sm" role="status" v-if="loadingFolders">
                  <span class="sr-only">Loading...</span>
                </div>
                <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="loadAllDocuments()">
                  Todos los documentos</a>
                <hr />

                <div class="col-12 text-left" style="padding: 0" v-if="tagsSelected.length > 0">
                  <p style="font-size: 13px; font-weight: 600">Filtros :</p>
                  <ul style="
                        padding: 0px;
                        list-style: none;
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-direction: column;
                        align-content: flex-start;
                      ">
                    <li style="
                          width: 100%;
                          display: flex;
                          justify-content: flex-start;
                          align-items: flex-start;
                          flex-direction: column;
                          align-content: flex-start;
                          margin-bottom: 5px;
                        " v-for="(tagSelected, index) in tagsSelected">
                      <a href="#" style="
                            font-size: 12px;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            background: rgb(206, 206, 206);
                            border-radius: 30px;
                            display: flex;
                            place-content: flex-start;
                            align-items: center;
                            flex-direction: row;
                            font-weight: 600;
                            padding-left: 10px;
                            padding-right: 10px;
                          ">{{ tagSelected.title }}
                        <a href="#" style="margin-left: 10px" @click="removeFilterTag(index, tagSelected.title)"><i
                            class="fas fa-times"></i></a>
                      </a>
                    </li>
                  </ul>
                  <hr />
                </div>

                <ul style="padding: 0; margin: 0; width: 100%; list-style: none" v-if="items.length > 0">
                  <li style="
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        list-style: none;
                        line-height: 15px;
                        margin-bottom: 15px;
                      " v-for="item in filteredResources" :key="index" @click.prevent="
                        getDocumentsByTag(item._id, item.data.title)
                      ">
                    <a href="#" style="color: black; font-weight: 600; font-size: 12px">{{ item.data.title }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-3" style="
                  border-left: 1px solid #e6e6e6;
                  border-right: 1px solid #e6e6e6;
                  padding: 0;
                  height: calc(100vh - 70px);
                  overflow: hidden;
                  overflow-y: auto;
                  position: relative;
                ">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingDocuments"
                style="position: absolute">
                <span class="sr-only">Loading...</span>
              </div>

              <div class="col-12" style="
                    padding: 15px;
                    border-bottom: 1px solid #e6e6e6;
                    cursor: pointer;
                  " v-for="(document, index) in documents" :key="index" @click="getDocument(document._id)"
                v-bind:class="{
                  activeDocument: document._id === activeDocumentId,
                }">
                <div class="col-12" style="padding: 0" v-if="document._ext.edit_title == false">
                  <span class="edit-mode">{{ document.data.title }}
                    <img src="@/assets/boligrafo.png" @click.prevent="document._ext.edit_title = true" />
                  </span>
                </div>

                <form @submit.prevent="saveEditMode(document._id, index)" class="col-12"
                  style="padding: 0; display: flex; margin-bottom: 10px" v-if="document._ext.edit_title">
                  <input type="text" class="form-control col-12" v-model="document.data.title" style="
                        font-size: 13px;
                        border-radius: 30px;
                        height: 30px;
                        min-height: 30px;
                        max-height: 30px;
                        background: white;
                        font-weight: 700;
                      " />
                  <button type="submit" hidden="true"></button>
                </form>

                <p class="edit-mode" style="color: #525252; font-size: 12px" v-if="!document._ext.edit_description">
                  {{ document.data.description }}
                  <img src="@/assets/boligrafo.png" @click.prevent="document._ext.edit_description = true" />
                </p>

                <form @submit.prevent="saveEditMode(document._id, index)" class="col-12" style="
                      padding: 0px;
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      margin-bottom: 10px;
                    " v-if="document._ext.edit_description">
                  <input type="text" class="form-control" v-model="document.data.description" style="
                        font-size: 12px;
                        border-radius: 8px;
                        height: fit-content;
                        min-height: fit-content;
                        max-height: fit-content;
                        background: white;
                        margin-bottom: 5px;
                      " />
                  <button type="submit" hidden="true"></button>
                </form>

                <!--  <b style="color:black;font-size:15px">{{document.data.title}}</b>
                                        <p style="color:#525252;font-size:12px">{{document.data.description}}</p> -->

                <div style="position:absolute:top:0:right:0;height:100%">
                  <img src="@/assets/cerrar-con-llave.svg" style="height: 20px; width: 20px"
                    v-if="document.data.share == 0" />
                  <img src="@/assets/candado-abierto(2).png" style="height: 20px; width: 20px"
                    v-if="document.data.share == 1" />

                  <img src="@/assets/automatizado.svg" style="height: 20px; width: 20px"
                    v-if="document.data.complete == 1" />

                  <span v-if="document.data.complete == 0">
                    <img src="@/assets/a-automatizar.svg" style="height: 20px; width: 20px; cursor: pointer"
                      v-if="document.data.form_complete" @click="getDocumentModal(document._id)" />
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-6 scroll-size-medium" style="
                  border-left: 1px solid #e6e6e6;
                  border-right: 1px solid #e6e6e6;
                  padding: 0;
                  height: calc(100vh - 70px);
                  overflow: hidden;
                  overflow-y: auto;
                  position: relative;
                ">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingDocument"
                style="position: absolute">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="col-12" v-if="document.data.title" style="padding: 10px">
                <div class="row">
                  <div class="col-md-8">
                    <b>{{ document.data.title }}</b>
                  </div>
                  <div class="col-md-4 text-right">
                    <span v-if="document.data.complete == 0">
                      <a href="#" style="margin: 5px" v-if="document.data.form_complete"
                        @click="getDocumentModal(document._id)">
                        <img src="@/assets/expandir.svg" style="width: 14px; height: 14px; margin-right: 5px" />
                      </a>
                    </span>

                    <a href="#" style="margin: 5px" v-if="document.data.complete == 1" @click="openFullScreen()">
                      <img src="@/assets/expandir.svg" style="width: 14px; height: 14px; margin-right: 5px" />
                    </a>

                    <component v-if="document.data.complete == 1">
                      <div class="dropdown" style="margin: 5px; display: inline">
                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                          data-toggle="dropdown" aria-expanded="false">
                          <img src="@/assets/descargar.svg" style="
                                width: 14px;
                                height: 14px;
                                margin-right: 5px;
                              " />
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#" @click.prevent="exportWord()">Documento Word</a>
                          <a class="dropdown-item" href="#" @click.prevent="exportPDF()">Documento PDF</a>
                        </div>
                      </div>
                    </component>

                    <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />
                  </div>
                </div>
              </div>

              <div id="editparent" v-if="editor_enabled">
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
                </div>
              </div>

              <div id="editor2" contenteditable="true" style="
                    width: 100%;
                    padding: 20px;
                    overflow: hidden;
                    height: calc(100vh - 316px);
                    overflow-y: auto;
                    color: black;
                  " v-html="contentDocument" @keyup="autoSave()"></div>

              <!--  <div class="col-12 text-center" style="position:sticky;bottom:0;left:0;rigth:0;padding-bottom:15px" v-if="document.data.complete == 0">
                                          <button type="submit" class="btn btn-primary" style="width:auto;position:relative" @click="openmodalcomplete()"  v-if="document.data.form_complete" >1 formulario guardado</button>
                                      </div> -->
            </div>
          </div>

          <!-- ======================================= -->
        </div>
      </div>
    </div>
  </main>


  <!-- Modal -->
  <div class="modal fade ModalFullScreen" id="ModalFullScreen" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row justify-content-center">
            <div class="col-12" v-if="document.data.title" style="padding: 10px">
              <div class="row">
                <div class="col-md-8">
                  <b>{{ document.data.title }}</b>
                </div>
                <div class="col-md-4 text-right">
                  <a href="#" style="margin: 5px" @click="openFullScreen()"><img src="@/assets/expandir.svg"
                      style="width: 14px; height: 14px; margin-right: 5px" /></a>

                  <component v-if="document.data.complete == 1">
                    <div class="dropdown" style="margin: 5px; display: inline">
                      <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-expanded="false">
                        <img src="@/assets/descargar.svg" style="width: 14px; height: 14px; margin-right: 5px" />
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#" @click.prevent="exportWord()">Documento Word</a>
                        <a class="dropdown-item" href="#" @click.prevent="exportPDF()">Documento PDF</a>
                      </div>
                    </div>
                  </component>

                  <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />
                </div>
              </div>
            </div>

            <div class="col-md-12" id="editparent" v-if="editor_enabled" style="background: #ececec">
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
              </div>
            </div>

            <div id="editor2-full" contenteditable="true" style="
                width: 100%;
                padding: 20px;
                overflow: hidden;
                height: calc(100vh - 316px);
                overflow-y: auto;
                color: black;
              " v-html="contentDocument" @keyup="autoSaveFull()"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row justify-content-center">
            <div class="col-12 text-left" style="margin-bottom: 20px">
              <b>{{ document.data.title }}</b>
              <p>{{ document.data.description }}</p>

              <p style="padding: 0; margin: 0; margin-top: 8px; font-size: 14px">
                Para crear el documento, completa el siguiente cuestionario
              </p>
            </div>

            <div class="col-4" style="position: relative; position: sticky; top: 0">
              <div class="col-12 view-writing-fields-content">


                <div class="col-12" style="padding: 0; min-height: 300px" v-if="version == '1.00'">
                  <div class="form-group" v-for="(field, index) in documentModal.data.fields"
                    style="text-align: left; padding: 10px">
                    <label style="font-size: 13px; color: black; font-weight: 600">{{ field.replace }}</label>
                    <input type="text" class="form-control input-field" style="
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
    " v-model="field.user.input" @keyup="previewText(index)" />
                  </div>
                </div>





                <div class="col-12" style="padding:0;min-height:380px" v-if="version == '2.00'">
                  <div v-for="(field, index) in documentModal.data.fields">
                    <div class="form-group" style="text-align: left;padding: 10px;" v-if="field.existent == false">
                      <label style="font-size: 13px;color: black;font-weight: 600;">{{ field.replace }}</label>
                      <input type="text" class="form-control input-field" style="height: 30px !important;
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
    border-radius: 0 !important;" v-model="field.user.input" @keyup="previewText(index)" />
                    </div>
                  </div>
                </div>






                <div class="col-12 text-center">
                  <button type="submit" class="btn btn-primary" style="width: 120px; position: relative"
                    @click="createDocument()">
                    Crear
                  </button>
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="col-12 view-writing-content">
                <div class="col-12 header">Previsualizacion del documento</div>
                <div class="col-12 content" v-html="documentModal.data.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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

@import "@/assets/platform.css";



.modal-content {
  border: none;
}

.modal-backdrop {
  background-color: #3b3b3b2e;
  backdrop-filter: blur(1px);
}

.edit-mode {
  color: black;
  font-size: 15px;
}

.edit-mode img {
  visibility: collapse;
  width: 15px;
  height: 15px;
}

.edit-mode:hover img {
  visibility: visible;
}
</style>

<script setup="">
import columnLeft from "@/components/platform/left.vue";
import navBar from "@/components/platform/navbar.vue";
import buttonShare from "@/components/platform/share-button-writting-private.vue";
</script>

<script>
import { alphabetizeByProperty } from "@writetome51/alphabetize-by-property";

export default {
  data() {
    return {
      auth: localStorage.getItem("auth"),
      endpoint: window.ENDPOINT + "/writings/get/tags",
      endpointDocuments: window.ENDPOINT + "/writings/get/tags/documents",
      endpointDocument: window.ENDPOINT + "/writings/get/document",
      endpointGetAll: window.ENDPOINT + "/writings/get/documents",
      endpointTextPreview: window.ENDPOINT + "/writings/fields/preview",

      editor_enabled: false,
      version: '1.00',
      items: [],
      documentsSearch: [],
      documents: [],
      loadingFolders: true,
      loadingDocument: false,
      tagsSelected: [],
      contentDocument: null,
      activeDocumentId: null,
      documentModal: {
        data: {
          title: null,
          description: null,
          complete: 0,
          fields: [],
          content: null,
        },
      },

      document: {
        data: {
          title: null,
          description: null,
          complete: 0,
        },
      },
      searchTarget: { target: null },
      temp: {
        editFont: "Arial",
      },
    };
  },
  created() { },
  mounted() {
    this.loadAllDocuments();
    this.loadTags();

  },
  computed: {
    searchTagsInResults() {
      return this.documentsSearch.filter((item) => {
        if (this.tagsSelected.length > 0) {
          for (var i = item.data.tags.length - 1; i >= 0; i--) {
            var row = item.data.tags[i];
            for (var i = this.tagsSelected.length - 1; i >= 0; i--) {
              var rowTarget = this.tagsSelected[i];
              if (row._id == rowTarget.id) {
                return item;
              }
            }
          }
        } else {
          return item;
        }
      });
    },

    filteredResources() {
      if (this.searchTarget.target) {
        this.searchDocuments();
        return this.items.filter((item) => {
          return item.data.title
            .toLowerCase()
            .startsWith(this.searchTarget.target.toLowerCase());
        });
      } else {
        return this.items;
      }
    },
  },
  methods: {
    openFullScreen() {
      $(".ModalFullScreen").modal("show");
    },
    fixerArray(data) {
      return new Promise((resolve, reject) => {
        for (var i = data.length - 1; i >= 0; i--) {
          data[i]._ext = { edit_title: false, edit_description: false };
        }
        resolve(data);
      });
    },
    searchDocuments() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          target: this.searchTarget.target,
        }),
      };
      fetch(window.ENDPOINT + "/writings/search", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            if (data.length > 0) {
              for (var i = data.length - 1; i >= 0; i--) {
                data[i]._ext = { edit_title: false, edit_description: false };
              }
            }

            this.documents = data;
            this.$Progress.finish();
          }
          this.$Progress.finish();
          return;
        });
    },

    autoSaveFull() {
      const content = document.querySelector("#editor2-full").innerHTML;

      this.document.data.content = content;
      document.querySelector("#editor2").innerHTML = content;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.document._id,
          data: {
            content: content,
          },
        }),
      };
      fetch(window.ENDPOINT + "/writings/edit/auto", requestOptions)
        .then((response) => response.json())
        .then((data) => { });
    },

    autoSave() {
      const content = document.querySelector("#editor2").innerHTML;
      this.document.data.content = content;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.document._id,
          data: {
            content: content,
          },
        }),
      };
      fetch(window.ENDPOINT + "/writings/edit/auto", requestOptions)
        .then((response) => response.json())
        .then((data) => { });
    },

    saveEditMode(id, index) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: id,
          data: {
            title: this.documents[index].data.title,
            description: this.documents[index].data.description,
          },
        }),
      };
      fetch(window.ENDPOINT + "/writings/edit", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.documents[index]._ext.edit_title = false;
          this.documents[index]._ext.edit_description = false;
          this.$Progress.finish();
          this.$toast.success("Documento editado", {
            position: "bottom-right",
          });
          if (this.document._id == id) {
            this.document.data.title = this.documents[index].data.title;
            this.document.data.description =
              this.documents[index].data.description;
          }
        });
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
    download(file, text, type) {
      //creating an invisible element
      var element = document.createElement("a");
      element.setAttribute("href", file);
      element.setAttribute("download", text);
      element.setAttribute("target", "_blank");

      // Above code is equivalent to
      // <a href="path of file" download="file name">

      document.body.appendChild(element);

      //onClick property
      element.click();

      document.body.removeChild(element);
    },
    exportPDF() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.activeDocumentId,
        }),
      };
      fetch(window.ENDPOINT + "/writings/export/pdf", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$toast.show("Descargando", {
            position: "bottom-right",
          });

          this.download(
            window.ENDPOINTEXPORTS + "/" + data.name,
            data.name,
            "data:application/pdf"
          );

          this.$Progress.finish();
          console.log(data);
        });
    },
    exportWord() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.activeDocumentId,
        }),
      };
      fetch(window.ENDPOINT + "/writings/export/word", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$toast.show("Descargando", {
            position: "bottom-right",
          });

          this.download(
            window.ENDPOINTEXPORTS + "/" + data.name,
            data.name,
            "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          );
          this.$Progress.finish();
          console.log(data);
        });
    },
    createDocument() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.documentModal._id,
          doc_original: this.documentModal._id,
          fields: this.documentModal.data.fields,
          content: this.documentModal.data.content,
        }),
      };
      fetch(
        window.ENDPOINT + "/writings/document/create/writing",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (this.tagsSelected.length > 0) {
            const requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                auth: this.auth,
                tags: this.tagsSelected,
              }),
            };
            fetch(this.endpointDocuments, requestOptions)
              .then((response) => response.json())
              .then((data) => {
                if (data.empty) {
                  this.documents = [];
                  this.loadingDocuments = false;
                  this.$Progress.finish();
                  return;
                }

                if (data.error == true) {
                } else {
                  this.documents = data;
                  this.loadingDocuments = false;
                }
              });
          } else {
            this.loadAllDocuments();
          }

          this.$Progress.finish();
          this.$toast.success("Documento creado correctamente", {
            position: "bottom-right",
          });
          $("#exampleModalLong").modal("hide");
        });
    },
    previewText(index = null) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.documentModal._id,
          fields: this.documentModal.data.fields,
        }),
      };
      fetch(this.endpointTextPreview, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.documentModal.data.content = data.content;
        });
    },
    openmodalcomplete() {
      $("#exampleModalLong").modal("show");
      this.previewText();
    },
    loadTags() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
        }),
      };
      fetch(this.endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.loadingFolders = false;
            this.items = [];
            this.$Progress.finish();
            return;
          }

          if (data.error == true) {
          } else {
            alphabetizeByProperty("data.title", data);
            this.items = data;
            this.loadingFolders = false;
            this.$Progress.finish();
          }
        });
    },
    loadAllDocuments() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
        }),
      };
      fetch(this.endpointGetAll, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.loadingDocuments = false;
            this.documents = [];
            this.$Progress.finish();
            return;
          }

          if (data.length > 0) {
            for (var i = data.length - 1; i >= 0; i--) {
              data[i]._ext = { edit_title: false, edit_description: false };
            }
          }
          this.documents = data;
          this.$Progress.finish();
        });
    },

    removeFilterTag(index, name) {
      this.$Progress.start();

      delete this.tagsSelected[index];
      this.tagsSelected = this.tagsSelected.filter(function (a) {
        return typeof a !== "undefined";
      });

      if (this.tagsSelected.length == 0) {
        this.loadAllDocuments();
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          tags: this.tagsSelected,
          // id_tag:idtag,
          // name:tag
        }),
      };
      fetch(this.endpointDocuments, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.loadingDocuments = false;
            this.documents = [];
            this.$Progress.finish();
            return;
          }

          if (data.error == true) {
          } else {
            if (data.length > 0) {
              for (var i = data.length - 1; i >= 0; i--) {
                data[i]._ext = { edit_title: false, edit_description: false };
              }
            }
            this.documents = data;
            this.$Progress.finish();
          }
        });
    },

    getDocumentModal(id) {

      this.$Progress.start();
      this.activeDocumentId = id;
      this.loadingDocument = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: id,
          // id_tag:idtag,
          // name:tag
        }),
      };
      fetch(this.endpointDocument, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error == true) {
          } else {
            if (!data.data.version) {
              this.version = '1.00';
            }
            if (data.data.complete == 0) {
              this.editor_enabled = false;
              if (data.data.form_complete) {
                this.documentModal = data;
                this.contentDocument = null;
                this.loadingDocument = false;
                this.$Progress.finish();

                if (data.data.version) {
                  this.version = '2.00';
                }
                this.openmodalcomplete();
                return;
              }
            } else {
              this.editor_enabled = true;
            }
            this.$Progress.finish();
          }
        });
    },
    getDocument(id) {
      this.$Progress.start();
      this.activeDocumentId = id;
      this.loadingDocument = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: id,
          // id_tag:idtag,
          // name:tag
        }),
      };
      fetch(this.endpointDocument, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error == true) {
          } else {
            if (data.data.complete == 0) {
              this.editor_enabled = false;
              this.document = data;
              this.contentDocument = null;
              this.loadingDocument = false;
              this.$Progress.finish();
            } else {
              this.editor_enabled = true;
              this.document = data;
              this.contentDocument = data.data.content;
              this.loadingDocument = false;
              this.$Progress.finish();
            }
          }
        });
    },
    getDocumentsByTag(idtag, tag) {
      this.$Progress.start();
      this.tagsSelected.push({
        title: tag,
        id: idtag,
      });
      this.loadingDocuments = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          tags: this.tagsSelected,
        }),
      };
      fetch(this.endpointDocuments, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.loadingDocuments = false;
            this.documents = [];
            this.$Progress.finish();
            return;
          }

          console.log('soy yo' + data);
          if (data.error == true) {
          } else {
            if (data.length > 0) {
              for (var i = data.length - 1; i >= 0; i--) {
                data[i]._ext = { edit_title: false, edit_description: false };
              }
            }
            this.documents = data;
            this.loadingDocuments = false;
            this.$Progress.finish();
          }
        });
    },
    pause() { },
    hover() { },
  },
};
</script>
