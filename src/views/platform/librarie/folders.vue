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
        <div class="col-md-10" style="
            height: calc(100vh - 70px);
            border: 1px solid #e2e2e2;
            position: relative;
          ">
          <!-- ======================================= -->
          <div class="row">
            <div class="col-md-3" style="
                padding-right: 0px;
                padding-left: 0px;
                position: relative;
                overflow: hidden;
                overflow-y: auto;
                height: calc(100vh - 70px);
              ">
              <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="setActive('folders')"
                    :class="{ active: isActive('folders') }">Carpetas</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="setActive('tags')"
                    :class="{ active: isActive('tags') }">Etiquetas</a>
                </li>
              </ul>
              <div class="tab-content " id="myTabContent">
                <div class="tab-pane fade" :class="{ 'active show': isActive('folders') }" id="folders">
                  <div class="col-12 text-center" style="
                      padding-top: 8.5px;
                      padding-bottom: 8.5px;
                      border-bottom: 1px solid #e5e5e5;
                    ">
                    <input type="text" class="form-control type-input-3" v-model="searchTarget.target" @keyup="search()"
                      placeholder="Buscar..." />
                  </div>
                  <div class="col-12" style="padding-top: 10px; padding-bottom: 0">
                    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingFolders">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <ul style="
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        list-style: none;
                      " v-if="items.length > 0">
                      <li style="
                          padding: 0;
                          margin: 0;
                          width: 100%;
                          list-style: none;
                        " v-for="item in filteredResources" :key="index"
                        @click.prevent="getDocumentsByTag(item.id, item.text)">
                        <a href="#" style="color: black; font-weight: 600">{{
                          item.text
                        }}</a>
                      </li>
                    </ul>
                  </div>

                  <div class="col-12" style="padding-top: 10px; padding-bottom: 10px">
                    <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="openCreateFolderRootModal()">
                      <img src="@/assets/admin-add.png" style="width: 20px" />
                      Nueva carpeta raiz</a>

                    <hr />

                    <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="loadAllDocuments()">
                      Todos los documentos</a>

                    <hr />

                    <Tree id="my-tree-id" ref="my-tree" :custom-options="myCustomOptions"
                      :custom-styles="myCustomStyles" :nodes="treeDisplayData"></Tree>

                    <span style="font-size: 12px; font-weight: 500" v-if="treeDisplayData.length == 0">No se encontraron
                      carpetas.</span>
                  </div>
                </div>

                <div class="tab-pane fade" :class="{ 'active show': isActive('tags') }" id="tags">
                  <div class="col-12 text-center" style="
                   padding-top: 8.5px;
                      padding-bottom: 8.5px;
                      border-bottom: 1px solid #e5e5e5;
                    ">
                    <input type="text" class="form-control type-input-3" v-model="searchTarget.target"
                      placeholder="Buscar etiqueta.." />
                  </div>
                  <div class="col-12" style="padding-top: 10px; padding-bottom: 10px">
                    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingTags">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <!-- <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="openCreateTagModal()">
                      <img src="@/assets/admin-add.png" style="width: 20px" />
                      Nueva etiqueta</a>
                   <NewTagModal style="z-index: 1000" /> 

                    <hr /> -->
                    <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="loadAllDocuments()">
                      Todos los documentos</a>
                    <hr />

                    <a v-if="tagsSelected.length > 0" href="#" style="font-size: 13px; font-weight: 600; text ">
                      Filtros:</a>
                    <div class="col-12 text-center" v-if="tagsSelected.length > 0" style="
                        padding-top: 8.5px;
                        padding-bottom: 8.5px;
                        border-bottom: 1px solid #e5e5e5;
                      ">
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
                          " v-for="(tagSelected, index) in tagsSelected" :key="index">
                          <a href="#" style="
                              font-size: 12px;
                              padding: 5px;
                              background: rgb(234, 234, 234);
                              border-radius: 30px;
                              display: flex;
                              place-content: flex-start;
                              align-items: center;
                              flex-direction: row;
                              padding-left: 10px;
                              padding-right: 10px;
                            ">{{ tagSelected.text }}
                            <a href="#" style="margin-left: 10px" @click="removeFilterTag(index, tagSelected.text)"><i
                                class="fas fa-times"></i></a>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="col-12 text-left" style="padding: 0" v-if="tagsSelectedTags.length > 0">
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

                            margin-bottom: 3px;
                          " v-for="(tagSelectedTags, index) in tagsSelectedTags" :key="index">
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
                            ">
                            {{ tagSelectedTags.title }}
                            <a href="#" style="margin-left: 10px" @click="
                              removeFilterTags(index, tagSelectedTags.title)
                            ">
                              <i class="fas fa-times"></i>
                            </a>
                          </a>
                        </li>
                      </ul>

                      <hr />
                    </div>

                    <ul style="
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        list-style: none;
                      ">
                      <li style="
                          padding: 0;
                          margin: 0;
                          width: 100%;
                          list-style: none;
                          line-height: 15px;
                          margin-bottom: 15px;
                          margin-top: 10px;
                        " v-for="(item, index) in filteredResourcesTags" :key="index" @click.prevent="
                          getDocumentsByTag(item._id, item.data.title)
                        ">
                        <a href="#" style="
                            color: black;
                            font-weight: 600;
                            font-size: 12px;
                          ">
                          {{ item.data.title }}
                        </a>
                      </li>
                    </ul>

                    <!--  <div class="col-12 text-center" style="padding-top:2.5px;padding-bottom:2.5px;border-bottom:1px solid #E5E5E5">
                                             <a href="#" style="font-size:13px;">Nueva carpeta</a>
                                           </div>  -->

                  </div>
                </div>
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
              <!-- <div class="col-12" style="background:#e0dfdf;padding:15px;">
                                        <b style="color:#858484;font-size:16px">Lorem ipsum dolor sit amet</b>
                                        <p style="color:#858484;font-size:13px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua...</p>
                                    </div>
                                     -->

              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingDocuments"
                style="position:absolute">
                <span class="sr-only">Loading...</span>
              </div>



              <div class="col-12" style="padding:15px;border-bottom:1px solid  #e6e6e6;cursor:pointer;position:relative"
                v-for="(document, index) in fixerEditMode" :key="index" @click="getDocument(document._id)"
                v-bind:class="{ activeDocument: (document._id === activeDocumentId) }"
                @contextmenu.prevent="openContextmenu($event, document, index)">


                <div class="col-12" style="padding:0" v-if="document._ext.edit_title == false">
                  <span class="edit-mode">{{ document.data.title }} <img v-tooltip="'Editar Titulo'"
                      src="@/assets/boligrafo.png" @click.prevent="document._ext.edit_title = true" /> </span>
                </div>

                <form @submit.prevent="saveEditMode(document._id, index)" class="col-12 "
                  style="padding:0;display:flex;margin-bottom:10px" v-if="document._ext.edit_title">
                  <input type="text" class="form-control col-12" v-model="document.data.title"
                    style="font-size:13px;border-radius:30px;height:30px;min-height:30px;max-height:30px;background:white;font-weight:700" />
                  <button type="submit" hidden="true"></button>
                </form>


                <p class="edit-mode" style="color:#525252;font-size:12px" v-if="!document._ext.edit_description">
                  {{ document.data.description }} <img v-tooltip="'Editar Descripcion'" src="@/assets/boligrafo.png"
                    @click.prevent="document._ext.edit_description = true" />
                </p>


                <form @submit.prevent="saveEditMode(document._id, index)" class="col-12 "
                  style="    padding: 0px;display: flex;flex-direction: row;flex-wrap: wrap;margin-bottom:10px"
                  v-if="document._ext.edit_description">
                  <input type="text" class="form-control" v-model="document.data.description"
                    style="font-size:12px;border-radius:8px;height:fit-content;min-height:fit-content;max-height:fit-content;background:white;margin-bottom:5px" />
                  <button type="submit" hidden="true"></button>
                </form>





                <div style="position:absolute:top:0:right:0;height:100%">
                  <img v-tooltip="'Privado'" src="@/assets/cerrar-con-llave.svg" style="height:20px;width:20px;"
                    v-if="document.data.share == 0" />
                  <img v-tooltip="'Publico'" src="@/assets/candado-abierto(2).png" style="height:20px;width:20px;"
                    v-if="document.data.share == 1" />

                  <img v-tooltip="'Automatizado'" src="@/assets/automatizado.svg" style="height:20px;width:20px;"
                    v-if="document.data.complete == 1" />


                  <span v-if="document.data.complete == 0">
                    <img v-tooltip="'Modelo'" src="@/assets/a-automatizar.svg"
                      style="height:20px;width:20px;cursor:pointer" v-if="document.data.form_complete"
                      @click="getDocumentModal(document._id)" />
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
              <div class="col-12" v-if="document" style="padding: 10px">
                <div class="row">
                  <div class="col-md-8">

                    <b>{{ document.data.title }}</b>
                  </div>
                  <div class="col-md-4 text-right">
                    <a href="#" style="margin:5px" @click="openFullScreen()">
                      <img src="@/assets/expandir.svg" style="width:14px;height:14px;margin-right:5px" />
                    </a>

                    <component v-if="document.data.complete == 1">
                      <div class="dropdown" style="margin:5px;display:inline">
                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                          data-toggle="dropdown" aria-expanded="false">
                          <img src="@/assets/descargar.svg" style="width:14px;height:14px;margin-right:5px" />
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#" @click.prevent="exportWord()">Documento Word</a>
                          <a class="dropdown-item" href="#" @click.prevent="exportPDF()">Documento PDF</a>
                        </div>
                      </div>
                    </component>

                    <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />
                  </div>
                  <!-- <div class="col-md-4 text-right">
                    <a href="#" v-tooltip="'Expandir'" style="margin: 5px" @click="openFullScreen()">
                      <img src="@/assets/expandir.svg" style="width: 14px; height: 14px; margin-right: 5px" />
                    </a>
                    <div style="display: inline-block">
                      <DocumentDropdown :document="document" @go-edit-document-private="
  goEditDocumentPrivate(document)
" @open-modal-move-document="openModalMoveDocument()" @open-modal-add-tags="openModalAddTags()"
                        @save-share="saveShare(1, activeDocumentId)" @delete-document="deleteDocument(activeDocumentId)"
                        @open-compartir-privada="openCompartirPrivada()" />

                    </div>

                    <component :is="document.data.complete == 1">
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
                  </div> -->
                </div>
              </div>


              <div id="editor2" style="width:100%;padding:20px;color:black" v-html="contentDocument">
              </div>
              <!-- <div>
                <div class="editor-wrapper" style="overflow:hidden;">
                  <editor id="crearEscrito" @keyup="autoSaveFull()"
                    api-key="9a51lim0mxaojg1o8fhwtga2lfro3fnyw6k21n3r146f7weq" :init="{
  lenguage: 'es_ES',
  branding: false,
  height: '91vh',
  menubar: true,
  powerpaste_allow_local_images: true,
  powerpaste_keep_unsupported_src: true,
  smart_paste: true,
  powerpaste_html_import: 'prompt',
  powerpaste_word_import: 'clean',
  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
  toolbar: 'undo redo |  fontfamily forecolor  fontsize | bold italic underline strikethrough  removeformat| link image media table mergetags | addcomment showcomments | spellcheckdialog typography blocks| align lineheight | checklist numlist bullist indent outdent | emoticons charmap | ',
}" />



                </div>
              </div> -->

            </div>
          </div>
        </div>

        <!-- no need this. because it's in template , but i got string 'contentmodel, aaa i didnt put value for content model, ok, so the
    ternaries  are in value of the bind'
  yes it was my bad passing the string-->
        <!-- let's try -->
      </div>
    </div>

    <!-- ======================================= -->
  </main>


  <div class="box" @contextmenu="onContextMenu($event)" style="position:fixed;z-index:1000;background:rgb(248 248 248);width:150px;height:auto;padding:10px;  ; border:1px solid rgb(226, 226, 226) !important;border-radius:6px
     " :style="{ top: selected.clientY, left: selected.clientX }">
    <ul style="padding:0;margin:0;list-style:none">
      <li
        style="padding:0;margin:0;list-style:none;padding-top:6px;padding-bottom:6px; border-bottom: 1px solid rgb(225 225 225 / 48%)">
        <a href="#" style="font-size:11px;font-weight:600;color:black;" @click="openModalMoveDocument()">Mover</a>
      </li>
      <li style="padding:0;margin:0;list-style:none;padding-top:6px;padding-bottom:6px;  ">
        <a href="#" style="font-size:11px;font-weight:600;color:black;" @click="deleteDocument()">Eliminar</a>
      </li>
    </ul>
  </div>




  <!-- Modal -->
  <div class="modal fade" id="compartir-privada" tabindex="-1" role="dialog" aria-labelledby="report-contentTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
      <div class="modal-content" style="border-radius: 10px; border: none">
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
            Compartir en forma privada
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col-md-12" style="
              background: #f2f2f2;
              color: #141414;
              font-weight: 600;
              text-align: left;
              padding: 20px;
              margin-bottom: 10px;
            ">
            Escribí el mail de registro del usuario al que querés dar acceso

            <input type="text" v-model="valEmail" style="
                height: 30px;
                min-height: 33px;
                border-radius: 30px;
                border-radius: 30px;
                border: 1px solid rgb(199, 199, 199);
                background: rgb(231, 231, 231);
                margin-top: 15px;
                padding-left: 10px;
              " />
          </div>


          <div class="col-12 text-center">
            <button type="submit" class="btn btn-primary" style="width: 120px; margin-top: 3vh"
              @click="compartirPrivado(valEmail)">
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="true" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <form class="modal-content" @submit.prevent="createFolderRoot()" style="border-radius: 10px; border: none">
        <div class="modal-header text-center">
          <h5 class="modal-title">Nueva carpeta</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control type-input-2" v-model="nameNewFolder.title" required="true" />
        </div>
        <div class="modal-footer" style="border: none">
          <button type="submit" class="btn btn-primary" style="font-size: 15px">
            Crear carpeta
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="true" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <form class="modal-content" @submit.prevent="createFolder()">
        <div class="modal-header text-center">
          <h5 class="modal-title">Nueva carpeta</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control type-input-2" v-model="nameNewFolder.title" required="true" />
        </div>
        <div class="modal-footer" style="border: none">
          <button type="submit" class="btn btn-primary" style="font-size: 15px">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop4" data-backdrop="static" data-keyboard="true" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <form class="modal-content" @submit.prevent="modalDeleteFolder()" style="border-radius: 10px; border: none">
        <div class="modal-header text-center">
          <h5 class="modal-title">Eliminar carpeta</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-danger">
          Esta accion no se puede deshacer
        </div>
        <div class="modal-footer" style="border: none">
          <button type="submit" class="btn btn-primary" style="font-size: 15px">
            Eliminar
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="moveDocumentTofolder" data-backdrop="static" data-keyboard="true" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <form class="modal-content" @submit.prevent="selectPathMoveSave()">
        <div class="modal-header text-center">
          <h5 class="modal-title">Asignar carpeta</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <Tree :custom-options="myCustomOptions2" :custom-styles="myCustomStyles2" :nodes="treeDisplayData2">
          </Tree>

          <hr />
          <ul style="
              padding: 0px;
              list-style: none;
              width: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-direction: column;
              align-content: flex-start;
            " v-if="documentMoveTemp">
            <li style="
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                align-content: flex-start;
                margin-bottom: 5px;
              " v-for="(item, index) in documentMoveTemp.data.categories" :key="index">
              <a href="#" style="
                  font-size: 12px;
                  padding: 5px;
                  background: rgb(234, 234, 234);
                  border-radius: 30px;
                  display: flex;
                  place-content: flex-start;
                  align-items: center;
                  flex-direction: row;
                  padding-left: 10px;
                  padding-right: 10px;
                ">{{ item.text }}
                <a href="#" style="margin-left: 10px" @click="removeFolderInModal(index, item.id)"><i
                    class="fas fa-times"></i></a>
              </a>
            </li>
          </ul>
        </div>
        <div class="modal-footer" style="border: none">
          <button type="submit" class="btn btn-primary" style="font-size: 15px">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <!-- Modal -->
  <div class="modal fade FullScreenModal" id="FullScreenModal" tabindex="-1" role="dialog"
    aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">

      <div class="modal-content">
        <div class="modal-header text-center">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="col-12" v-if="document" style="padding:10px">
              <div class="row">
                <div class="col-md-8">
                  <b>{{ document.data.title }}</b>
                </div>
                <div class="col-md-4 text-right">
                  <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />
                  <!-- <a href="#" style="margin:5px" v-if="document.data.share == 1 "><img src="@/assets/cuota.svg" style="width:14px;height:14px;margin-right:5px" /></a> -->
                </div>
              </div>
            </div>
            <div style="width:100%;padding:20px;color:black" v-html="contentDocument">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="ModalAddTags" data-backdrop="static" data-keyboard="true" tabindex="-1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content" style="border-radius: 10px; border: none" @submit.prevent="
        !activeDocumentId
          ? createNewTag(newTagName)
          : insertDocumentTags(activeDocumentId, tagSelected)
      ">
        <div class="modal-header text-center">
          <h5 class="modal-title">Agregar etiquetas</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" style="height: 20vh">
          <ul style="margin: 16px 0">
            <li v-for="(tag, index) in tagSelected" :key="tag._id" style="
                padding: 2px 16px;
                width: 100%;
                display: flex;
                column-gap: 6px;
                align-items: center;
                width: max-content;
                border-radius: 12px;
                background: #f6f5f5;
                border-bottom: 1px solid #e6e6e6;
                font-size: 12px;
                color: black;
                font-weight: 500;
              " @click="selectTag(index)">
              <p style="margin-bottom: 0; font-size: 14px">
                {{ tag.data.name }}
              </p>
              <img src="@/assets/boton-agregar.png" style="width: 20px; height: 20px" />
            </li>
          </ul>
          <div class="col-12" style="padding-top: 0px">
            <h4 style="font-weight: bold; text-align: left; font-size: 17px">
              Asignale al documento como minimo tres etiquetas
            </h4>
            <input v-model="newTagName" type="text" class="form-control input-search-dashboard"
              placeholder="Escribe para agregar una etiqueta" />
          </div>
          <div v-if="activeDocumentId" style="margin: 16px 0">
            <div v-for="(tag, index) in tags" :key="tag._id" style="
                padding: 2px 16px;
                width: 100%;
                display: flex;
                column-gap: 6px;
                align-items: center;
                width: max-content;
                border-radius: 12px;
                background: #f6f5f5;
                border-bottom: 1px solid #e6e6e6;
                font-size: 12px;
                color: black;
                font-weight: 500;
              " @click="selectTag(index)">
              <p style="margin-bottom: 0; font-size: 14px">
                {{ tag.data.name }}
              </p>
              <img src="@/assets/boton-agregar.png" style="width: 20px; height: 20px" />
            </div>
          </div>
        </div>
        <div class="modal-footer" style="border: none">
          <button type="submit" class="btn btn-primary" style="font-size: 15px">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>

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
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="popshared = false">
        <span aria-hidden="true">×</span>
      </button>

      El escrito automatizado se guardara en tu carpeta privada "Mis escritos".
      ¿Queres compartirlo con la comunidad legal?
      <div class="col-12 text-right" style="display: flex">
        <button class="btn btn-primary" style="margin: 5px" @click="saveShare(1)" :disabled="saveLoadingShareDisabled">
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
</template>

<style>
@import "@/assets/platform.css";

.activeFolder {
  color: #2b44ff !important;
  transition: all 250ms;
}

#column_left {
  background-color: #515151;
}

.nav-list li a {
  text-decoration: none;
  display: block;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #515151 !important;
  color: #9d9d9d;
}

.nav-list>li>a {
  color: #c4c4c4;
  font-size: 14px;
  padding-left: 13px !important;
  border-bottom: 1px solid #585858;
}

.nav-list>li>a:hover {
  background-color: #444444;
}

.folder-menu {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
}

.folder-menu li {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
}

.folder-menu li a {
  color: black;
  font-weight: 600;
  font-size: 12px;
}

.folder-menu li:hover>.icon-add {
  opacity: 1;
}

.folder-menu li .icon-add {
  opacity: 0;
  float: right;
  cursor: pointer;
}

.folder-menu-child {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
  padding-left: 10px;
}

.folder-menu-child li {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
}

.folder-menu-child li a {
  color: black;
  font-weight: 600;
  font-size: 12px;
}

.folder-menu-child li:hover>.icon-add {
  opacity: 1;
}

.folder-menu-child li .icon-add {
  opacity: 0;
  float: right;
  cursor: pointer;
}

.folder_icon_active,
.folder_icon {
  display: none !important;
}

input[type="checkbox"],
input[type="radio"] {
  display: none !important;
}

.expanded_icon {
  transform: rotate(0deg);
  transition: all 0.2s ease;
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: -2px 0 4px 8px;
  border-color: transparent transparent transparent #555;
}

.button-move-tree {
  background-image: url(/src/assets/boton-agregar.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}

.add_icon {
  background-image: url(/src/assets/boton-agregar.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}

.add_icon::before {
  display: none !important;
  content: "";
}

.row_data:hover {
  color: #0c00ff !important;
}

.expanded_icon {
  transform: rotate(0deg);
  transition: all 0.2s ease;
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: -2px 0 4px 8px;
  border-color: transparent transparent transparent #555;
}

.button-add-tree {
  background-image: url("/src/assets/add(1).png");
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}

.button-edit-tree {
  background-image: url(/src/assets/trash.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}

.button-move-tree {
  background-image: url(/src/assets/angle-small-right.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}

.add_icon {
  background-image: url(/src/assets/boton-agregar.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}

.add_icon::before {
  display: none !important;
  content: "";
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

<script setup>


import columnLeft from "@/components/platform/left.vue";
import navBar from "@/components/platform/navbar.vue";
import Tree from "vuejs-tree";
import buttonShare from "@/components/platform/share-button-document-private.vue";
</script>

<script>
import Editor from '@tinymce/tinymce-vue';
import { alphabetizeByProperty } from "@writetome51/alphabetize-by-property";
import DocumentDropdown from "../../../components/platform/DocumentDropdown.vue";

export default {
  components: {
    DocumentDropdown,
    'editor': Editor
  },
  data() {
    return {
      auth: localStorage.getItem("auth"),
      endpoint: window.ENDPOINT + "/library/get/folders",
      endpointDocuments: window.ENDPOINT + "/library/get/folders/documents",
      endpointDocument: window.ENDPOINT + "/library/get/document",
      endpointGetAll: window.ENDPOINT + "/library/get/documents",
      endpointTextPreview: window.ENDPOINT + "/library/fields/preview",
      endpointSaveFolders: window.ENDPOINT + "/library/save/folders",
      endpointMoveSave: window.ENDPOINT + "/library/save/folders/organize",
      endpointDeleteDocument: window.ENDPOINT + "/library/delete/documents",
      endpointSavePrivateTags: window.ENDPOINT + "/private/save/tags",
      endpointOrganizePrivateTags: window.ENDPOINT + "/private/save/tags/organize",
      endpointGetPrivateTags: window.ENDPOINT + "/private/get/tags",
      endpointSave: window.ENDPOINT + "/library/folders/edit",
      editor_enabled: false,
      items: [],
      valEmail: null,
      documents: [],
      loadingFolders: true,
      loadingDocument: false,
      tagsSelected: [],
      endpointTags: window.ENDPOINT + "/library/get/tags",
      endpointTaggedDocuments: window.ENDPOINT + "/library/get/tags/documents",
      endpointTaggedPrivateDocuments: window.ENDPOINT + "/private/get/tags/documents",
      itemsTags: [],
      itemsTagsPrivate: [],
      tags: [],
      tagSelected: [],
      newTagName: "",
      documentsSearchTags: [],
      documentsTags: [],
      loadingTags: true,
      tagsSelectedTags: [],
      contentDocument: "",
      activeDocumentId: null,
      popshared: false,
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
      searchTarget: {
        target: null,
      },
      editField: {
        index: null,
        id: null,
        enabled: false,
      },
      temp: {
        editFont: "Arial",
        index: null,
        node: null,
      },
      treeDisplayData: [],
      treeDisplayData2: [],
      nameNewFolder: {
        title: null,
      },
      nameEditFolder: {
        title: null,
      },
      showContextMenu: false,
      selected: {
        row: {},
        action: "",
        clientX: null,
        clientY: null,
      },
      selectedIdDocument: null,
      selectedIndexDocument: null,
      pathMoveSelected: null,
      modalMoveDocument: false,
      documentMoveTemp: false,
      activeItem: "folders",
      editDocument: null,
    };
  },
  created() {
    document.addEventListener("click", () => {
      this.showContextMenu = false;
      this.selected.row = {};
      this.selected.clientX = null;
      this.selected.clientY = null;
      // setTimeout(() => {
      //    if(this.modalCreateTouchClose) {
      //    this.modalCreate = false;
      //    this.modalCreateTouchClose = false;
      // }
      // },500)
    });
  },
  mounted() {
    this.loadAllDocuments();
    this.loadFolders();
    this.loadTags()
    this.loadFoldersTree2();
    if (this.$route.query.id) {
      this.activeDocumentId = this.$route.query.id;
      this.getDocument(this.$route.query.id);
    }
  },
  computed: {

    fixerEditMode() {
      for (var i = this.documents.length - 1; i >= 0; i--) {
        this.documents[i]._ext = {
          edit_title: false,
          edit_description: false,
        };
      }
      return this.documents;
    },
    filteredResourcesPrivateTags() {
      if (this.searchTarget.target) {
        this.searchDocuments();
        return this.itemsTagsPrivate.filter((item) => {
          return item.data.name
            .toLowerCase()
            .startsWith(this.searchTarget.target.toLowerCase());
        });
      } else {
        return this.itemsTagsPrivate;
      }
    },
    filteredResourcesTags() {
      if (this.searchTarget.target) {
        this.searchDocuments();
        return this.itemsTags.filter((item) => {
          return item.data.title
            .toLowerCase()
            .startsWith(this.searchTarget.target.toLowerCase())
        });
      } else {
        return this.itemsTags;
      }
    },
    filteredResources() {
      if (this.searchTarget.target) {
        return this.items.filter((item) => {
          console.log(item.text.startsWith(this.searchTarget.target));
          return item.text
            .toLowerCase()
            .startsWith(this.searchTarget.target.toLowerCase())
        });
      } else {
        return this.items;
      }
    },
    myCustomStyles() {
      return {
        tree: {
          style: {
            height: "auto",
            maxHeight: "300px",
            overflowY: "visible",
            display: "inline-block",
            textAlign: "left",
          },
        },
        editNode: {
          class: "button-edit-tree",
          style: {
            color: "#EE5F5B",
          },
        },
        row: {
          style: {
            width: "500px",
            cursor: "pointer",
          },
          child: {
            class: "",
            style: {
              height: "35px",
            },
            active: {
              style: {
                height: "35px",
              },
            },
          },
        },
        rowIndent: {
          paddingLeft: "20px",
        },
        text: {
          // class: "" // uncomment this line to overwrite the 'capitalize' class, or add a custom class
          style: {
            "font-weight": "600",
            "font-size": "12px",
          },
          active: {
            style: {
              "font-weight": "bold",
              color: "#1200FF",
              "font-size": "12px",
            },
          },
        },
      };
    },
    myCustomOptions() {
      return {
        treeEvents: {
          expanded: {
            state: true,
            // fn: this.getDocumentsFromFolder,
            fn: (data) => {
              this.getChilds(data);
            },
          },
          collapsed: {
            state: true,
            // fn: this.getDocumentsFromFolder,
          },
          selected: {
            state: false,
            fn: this.mySelectedFunction,
          },
          checked: {
            state: false,
            fn: this.myCheckedFunction,
          },
        },
        events: {
          expanded: {
            state: true,
          },
          selected: {
            state: true,
          },
          checked: {
            state: true,
          },
          editableName: {
            state: true,
            calledEvent: "expanded",
          },
        },
        addNode: {
          state: true,
          fn: this.addNodeFunction,
          appearOnHover: true,
        },
        editNode: {
          state: true,
          fn: this.deleteFolder,
          appearOnHover: true,
        },
        deleteNode: {
          state: true,
          fn: (data) => {
            this.getDocumentsFromFolder(data.id);
          },
          appearOnHover: true,
        },
        showTags: true,
      };
    },
    myCustomStyles2() {
      return {
        tree: {
          style: {
            height: "auto",
            maxHeight: "300px",
            overflowY: "visible",
            display: "inline-block",
            textAlign: "left",
          },
        },
        deleteNode: {
          class: "button-move-tree",
          style: {
            color: "#EE5F5B",
          },
        },
        row: {
          style: {
            width: "500px",
            cursor: "pointer",
          },
          child: {
            class: "",
            style: {
              height: "35px",
            },
            active: {
              style: {
                height: "35px",
              },
            },
          },
        },
        rowIndent: {
          paddingLeft: "20px",
        },
        text: {
          // class: "" // uncomment this line to overwrite the 'capitalize' class, or add a custom class
          style: {
            "font-weight": "600",
            "font-size": "12px",
          },
          active: {
            style: {
              "font-weight": "bold",
              color: "#1200FF",
              "font-size": "12px",
            },
          },
        },
      };
    },
    myCustomOptions2() {
      return {
        treeEvents: {
          expanded: {
            state: true,
            fn: (data) => {
              this.getChildsTree2(data);
            },
          },
          collapsed: {
            state: true,
          },
          selected: {
            state: false,
            fn: this.mySelectedFunction,
          },
          checked: {
            state: false,
            fn: this.myCheckedFunction,
          },
        },
        events: {
          expanded: {
            state: true,
            // fn: this.testeoEvent,
          },
          selected: {
            state: true,
            // fn: this.testeoEvent,
          },
          checked: {
            state: true,
            // fn: this.testeoEvent,
          },
          editableName: {
            state: true,
            calledEvent: "expanded",
          },
        },
        addNode: {
          state: false,
          class: "add_icon",
          style: {
            color: "red",
          },
          fn: this.addNodeFunction,
          appearOnHover: true,
        },
        editNode: {
          state: false,
          fn: null,
          appearOnHover: true,
        },
        deleteNode: {
          state: true,
          fn: this.selectPathMove,
          appearOnHover: false,
        },
      };
    },
  },
  methods: {
    onReadyCK(editor) {
      // Insert the toolbar before the editable area.
      // editor.ui
      //   .getEditableElement()
      //   .parentElement.insertBefore(
      //     editor.ui.view.toolbar.element,
      //     editor.ui.getEditableElement()
      //   );
    },
    goEditDocumentPrivate(doc) {
      localStorage.setItem("editDocumentPrivate", JSON.stringify(doc));
      console.log(doc);

      this.$router.push({
        name: "document-edit",
        params: { id: doc._id },
      });
    },

    saveShare(value, activeDocumentId) {
      console.log(this.data);
      if (value == 1) {
        this.saveLoadingShare = true;
        this.saveLoadingNtShareDisabled = true;
        this.saveLoadingShareDisabled = true;
        this.$router.push({
          name: "document-organize",
          params: { id: activeDocumentId },
        });
      } else {
        this.saveLoadingNtShare = true;
        this.saveLoadingShareDisabled = true;
        this.saveLoadingNtShareDisabled = true;
        this.popshared = false;

        setTimeout(() => {
          this.$router.push({
            name: "librarie",
            params: {
              id: activeDocumentId,
            },
          });
        }, 700);

        this.$toast.success("El documento ahora es publico", {
          position: "bottom-right",
        });

        // setTimeout(() => {
        //      this.$router.push({ name: 'my-writings-view-automatic-document', params: { id: this.data.id }})
        //  },1500)
      }
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
      fetch(this.endpointSearch, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            if (data.length > 0) {
              for (var i = data.length - 1; i >= 0; i--) {
                data[i]._ext = { edit_title: false, edit_description: false };
              }
            }
            this.documentsTags = data;
            this.$Progress.finish();
          }
          this.$Progress.finish();
          return;
        });
    },
    removeTag(index) {
      this.tagSelected.splice(index, 1);
    },
    selectTag(index) {
      if (this.tagSelected.length < 5) {
        this.tagSelected.push(this.tags[index]);
      } else {
        this.$toast.show("Solo puedes seleccionar 5 etiquetas", {
          position: "bottom-right",
        });
      }
    },
    searchTags() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          search: this.searchInputTags.target,
        }),
      };
      fetch(this.endpointTags, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data == {}) {
            this.tags = [];
          } else {
            this.tags = data;
            console.log("soytags");
          }
        });
    },

    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    openFullScreen() {
      $(".FullScreenModal").modal("show");
    },
    openModalMoveDocument() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.selectedIdDocument,
        }),
      };
      fetch(window.ENDPOINT + "/library/get/document", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.documentMoveTemp = data;
          $("#moveDocumentTofolder").modal("show");
        });
    },
    getTags() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          data: {
            type: "library",
          },
        }),
      };
      fetch(this.endpointGetPrivateTags, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.itemsTagsPrivate = data;
          this.$Progress.finish();
          this.tags = data;
        });
    },
    openCreateTagModal() {
      $("#ModalAddTags").modal("show");
    },
    createNewTag(name) {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          data: {
            name,
            type: "library",
          },
        }),
      };
      fetch(this.endpointSavePrivateTags, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
          this.newTagName = "";
          this.$toast.success("Crear con éxito nuevas etiquetas", {
            position: "bottom-right",
          });
          $("#ModalAddTags").modal("hide");
        });
    },
    insertDocumentTags(documentId, tags) {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          data: {
            name: tags.map((tag) => tag.data.name),
            documentId,
            type: "library",
          },
        }),
      };
      fetch(this.endpointOrganizePrivateTags, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
          this.tagSelected = [];
          this.$toast.success("Crear con éxito nuevas etiquetas", {
            position: "bottom-right",
          });
          $("#ModalAddTags").modal("hide");
        });
    },
    openCreateFolderRootModal() {
      $("#staticBackdrop").modal("show");
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
      fetch(window.ENDPOINT + "/library/edit", requestOptions)
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
                console.log(data);
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
    openModalAddTags() {
      $("#ModalAddTags").modal("show");
    },
    openmodalcomplete() {
      $("#exampleModalLong").modal("show");
      this.previewText();
    },
    // getPrice(prices,currency) {
    //    for (var i = prices.length - 1; i >= 0; i--) {
    //        if(prices[i].currency === currency) {
    //         return prices[i].price
    //        }
    //    }
    // },
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
      fetch(this.endpointTags, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.loadingTags = false;
            this.itemsTags = [];
            this.$Progress.finish();
            return;
          }
          if (data.error == true) {
          } else {
            alphabetizeByProperty("data.title", data);
            this.itemsTags = data;
            this.loadingTags = false;
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
          if (data.length == 0) {
            this.loadingDocuments = false;
            this.documents = [];
            this.$Progress.finish();
            return;
          }
          this.documents = data;
          this.$Progress.finish();
        });
    },
    search() {
      if (this.searchTarget.target == "") {
        this.loadAllDocuments();
        return;
      }
      this.$Progress.start();
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
      fetch(window.ENDPOINT + "/library/search", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.length == 0) {
            this.loadingDocuments = false;
            this.documents = [];
            this.$Progress.finish();
            return;
          }
          this.loadingDocuments = false;
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
          if (data.code) {
            this.document = false;
            this.loadingDocument = false;
            this.$Progress.finish();
            return;
          }

          if (data.empty) {
            this.document = false;
            this.loadingDocument = false;
            this.$Progress.finish();
            return;
          }

          if (data.error == true) {
          } else {
            if (data.data.complete == 0) {
              this.editor_enabled = false;
              if (data.data.form_complete) {
                this.documentModal = data;
                this.contentDocument = data.data.content;
                this.loadingDocument = false;
                this.$Progress.finish();

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
    removeFilterTags(index, name) {
      this.$Progress.start();
      delete this.tagsSelectedTags[index];
      this.tagsSelectedTags = this.tagsSelectedTags.filter(function (a) {
        return typeof a !== "undefined";
      });
      if (this.tagsSelectedTags.length == 0) {
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
          tags: this.tagsSelectedTags,
          // id_tag:idtag,
          // name:tag
        }),
      };
      fetch(this.endpointTaggedDocuments, requestOptions)
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
          if (data.code) {
            this.document = false;
            this.loadingDocument = false;
            this.$Progress.finish();
            return;
          }
          if (data.empty) {
            this.document = false;
            this.loadingDocument = false;
            this.$Progress.finish();
            return;
          }
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

              this.contentDocument = data.data.content.replace("http://", "https://");

              this.loadingDocument = false;
              this.$Progress.finish();
            }

          }
        });
    },
    getDocumentsByTagPrivate(idtag, tag) {
      this.$Progress.start();
      this.tagsSelected.push({
        text: tag,
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
          data: {
            name: this.tagsSelected.map((tag) => tag.text),
            type: "library",
          },
        }),
      };
      fetch(this.endpointTaggedPrivateDocuments, requestOptions)
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
            this.documents = data;
            this.loadingDocuments = false;
            this.$Progress.finish();
          }
        });
    },
    getDocumentsByTag(idtag, tag) {
      this.$Progress.start();
      this.tagsSelected.push({
        text: tag,
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
      fetch(this.endpointTaggedDocuments, requestOptions)
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
            this.documents = data;
            this.loadingDocuments = false;
            this.$Progress.finish();
          }
        });
    },
    openCompartirPrivada() {
      // open private share mode
      $("#compartir-privada").modal("show");
    },
    loadFolders() {
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
          console.log(data);
          setTimeout(() => {
            if (data.empty) {
              this.treeDisplayData = [];
              this.loadingFolders = false;
              return;
            }
            if (data.error == true) {
            } else {
              this.treeDisplayData = this.prepareArray(data);
              // alert(this.treeDisplayData.length)
              this.loadingFolders = false;
            }
          }, 200);
        });
    },
    loadFoldersTree2() {
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
          console.log(data);
          setTimeout(() => {
            if (data.empty) {
              this.treeDisplayData2 = [];
              this.loadingFolders = false;
              return;
            }
            if (data.error == true) {
            } else {
              this.treeDisplayData2 = this.prepareArray(data);
              // alert(this.treeDisplayData.length)
              this.loadingFolders = false;
            }
          }, 200);
        });
    },
    compartirPrivado(email) {
      //function to fetch baack

      const user = JSON.parse(localStorage.getItem("user"));

      console.log(user);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          documentId: this.document._id,
          firstName: user.profile.firstname,
          lastName: user.profile.lastname,
        }),
      };
      fetch(window.ENDPOINT + "/librarie/share/private", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$toast.success("Se envio por email.", {
            position: "bottom-right",
          });
        });
    },
    getDocumentsFromFolder(nodeId, state) {
      this.lastnodeId = nodeId;
      this.$Progress.start();
      this.loadingDocuments = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          folders: nodeId,
        }),
      };
      fetch(this.endpointDocuments, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            if (data.empty) {
              this.loadingDocuments = false;
              this.documents = [];
              this.$Progress.finish();
              return;
            }
            if (data.error == true) {
            } else {
              this.documents = data;
              this.loadingDocuments = false;
              //this.$Progress.tempColor('#66DE82')
              this.$Progress.finish();
            }
          }, 200);
        });
    },
    mySelectedFunction: function (nodeId, state) {
      console.log(`is ${nodeId} selected ? ${state}`);
      console.log(this.$refs["my-tree"].getSelectedNode());
      // this.$refs['my-tree-2'].getSelectedNode().$el.classList.add('some-class')
    },
    selectPathMoveSave() {
      this.$Progress.start();
      console.log(this.selectedIdDocument);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          folders: this.documentMoveTemp.data.categories,
          id: this.selectedIdDocument,
        }),
      };
      fetch(this.endpointMoveSave, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.modalMoveDocument = false;
          //this.$Progress.tempColor('#66DE82')
          this.$Progress.finish();
          // this.getDocumentsFromFolder(this.lastnodeId,null);
          this.$toast.success("El documento fue movido correctamente", {
            position: "bottom-right",
          });
          $("#moveDocumentTofolder").modal("hide");
        });
    },
    pathMoveSelectedRemove(index, nodeid) {
      delete this.pathMoveSelected[index];
      this.pathMoveSelected = this.pathMoveSelected.filter(function (a) {
        return typeof a !== "undefined";
      });
    },
    removeFolderInModal(index, nodeid = null) {
      delete this.documentMoveTemp.data.categories[index];
      this.documentMoveTemp.data.categories =
        this.documentMoveTemp.data.categories.filter(function (a) {
          return typeof a !== "undefined";
        });
    },
    selectPathMove(node) {
      this.documentMoveTemp.data.categories.push({
        id: node.id,
        text: node.text,
      });
    },
    deleteDocument() {
      this.$Progress.start();
      console.log(this.selectedIdDocument);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.selectedIdDocument,
        }),
      };
      fetch(this.endpointDeleteDocument, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
          this.$toast.success("Documento eliminado", {
            position: "bottom-right",
          });
          delete this.documents[this.selectedIndexDocument];
          this.documents = this.documents.filter(function (a) {
            return typeof a !== "undefined";
          });
        });
    },
    addNodeFunction: function (node) {
      $("#staticBackdrop2").modal("show");
      this.modalCreateNode = node;
    },
    createFolder() {
      this.$Progress.start();
      const newNode = {
        text: this.nameNewFolder.title,
        id: Math.floor(Math.random() * 100),
        state: {
          checked: false,
          selected: false,
          expanded: false,
        },
        parent: this.modalCreateNode.id,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          data: newNode,
        }),
      };
      fetch(window.ENDPOINT + "/library/save/folders", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
          $("#staticBackdrop2").modal("hide");
          this.nameNewFolder = {
            title: null,
          };
          this.getChilds(this.modalCreateNode.id);
          this.loadFoldersTree2();
        });
    },
    createFolderRoot() {
      this.$Progress.start();
      const newNode = {
        text: this.nameNewFolder.title,
        id: Math.floor(Math.random() * 100),
        state: {
          checked: false,
          selected: false,
          expanded: false,
        },
        nodes: [],
        parent: null,
      };
      this.treeDisplayData.push(newNode);
      var test = this.treeDisplayData;
      this.treeDisplayData = [];
      this.treeDisplayData = test;
      // save tree
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          data: newNode,
        }),
      };
      fetch(this.endpointSaveFolders, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
          $("#staticBackdrop").modal("hide");
          this.nameNewFolder = {
            title: null,
          };
          this.loadFoldersTree2();
        });
    },
    openContextmenu(evt, row, index = null) {
      this.showContextMenu = true;
      this.selected.row = row;
      this.selected.clientX = (evt.pageX || evt.clientX) + 1 + "px";
      this.selected.clientY = (evt.pageY || evt.clientY) + "px";
      this.selectedIdDocument = row._id;
      this.selectedIndexDocument = index;
      this.pathMoveSelected = row.data.categories;
    },
    modalDeleteFolder() {
      const nodePath = this.$refs["my-tree"].findNodePath(this.temp.node.id);
      const parentNodeId = nodePath.slice(-2, -1)[0];
      if (parentNodeId === undefined) {
        var test = this.$refs["my-tree"].nodes.findIndex(
          (x) => x.id == this.temp.node.id
        );
        this.$refs["my-tree"].nodes.splice(test, 1);
      } else {
        const parentNode = this.$refs["my-tree"].findNode(parentNodeId);
        // child node
        if (parentNode.nodes === undefined) {
          var test = this.$refs["my-tree"].nodes.findIndex(
            (x) => x.id == this.temp.node.id
          );
          this.$refs["my-tree"].nodes.splice(test, 1);
          $("#staticBackdrop4").modal("hide");
          this.deleteForlderRequest(this.temp.node.id);
          // this.saveFolders();
          return;
          // console.log('CHILD',parentNode.nodes);
        }
        const nodeIndex = parentNode.nodes.findIndex(
          (x) => x.id == this.temp.node.id
        );
        parentNode.nodes.splice(nodeIndex, 1);
      }
      $("#staticBackdrop4").modal("hide");
      this.deleteForlderRequest(this.temp.node.id);
      // this.saveFolders(true);
    },
    deleteFolder(node, index) {
      console.log("deleteforlder", node, index);
      this.temp = {
        index: index,
        node: node,
      };
      $("#staticBackdrop4").modal("show");
      return;
    },
    deleteForlderRequest(id) {
      this.$Progress.start();
      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: id,
        }),
      };
      fetch(window.ENDPOINT + "/library/delete/folders", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
        });
    },
    saveFolders(deletefolder = false) {
      this.$Progress.start();
      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          data: this.treeDisplayData,
        }),
      };
      if (deletefolder) {
        var requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.auth,
            data: this.treeDisplayData,
            delete: true,
            target: this.temp.node,
          }),
        };
      }
      fetch(this.endpointSave, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$Progress.finish();
          this.pathMoveSelected = [];
        });
    },
    getChilds(parent) {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          parent: parent,
        }),
      };
      fetch(window.ENDPOINT + "/library/get/folders/child", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            return;
          }
          this.$refs["my-tree"].findNode(parent).nodes =
            this.prepareArray(data);
          this.nodeSelect = this.prepareArray(data);
          this.$Progress.finish();
        });
    },
    getChildsTree2(parent) {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          parent: parent,
        }),
      };
      fetch(window.ENDPOINT + "/library/get/folders/child", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            return;
          }
          this.$refs["my-tre-2"].findNode(parent).nodes =
            this.prepareArray(data);
          this.nodeSelect = this.prepareArray(data);
          this.$Progress.finish();
        });
    },
    prepareArray(data) {
      var fix = [];
      for (var i = data.length - 1; i >= 0; i--) {
        fix.push({
          id: data[i]._id,
          text: data[i].data.text,
          nodes: [
            {
              id: "934",
              text: "Cargando carpetas..",
              nodes: [],
              state: {
                checked: false,
                selected: false,
                expanded: false,
              },
            },
          ],
          state: {
            checked: false,
            selected: false,
            expanded: false,
          },
        });
      }
      return fix;
    },
  },
};
</script>