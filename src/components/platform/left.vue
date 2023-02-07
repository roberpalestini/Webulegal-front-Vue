<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.1s cubic-bezier(0.55, 0, 0.1, 1) !important;
}

/* 2. declare enter from and leave to state */

.fade-enter-from,
.fade-leave-to {
    opacity: 0 !important;
    transform: scaleY(0.5) translate(5px, 0) !important;
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */

.fade-leave-active {
    position: absolute !important;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
<template>
    <div v-if="!$route.path.includes('dashboard')" style="margin-top:15PX"></div>

    <div class="col-md-12 text-center" style="padding-bottom:30px;position:relative;padding-top:0px">
        <button type="submit" class="btn btn-primary" style="width:120px;position:relative;z-index:1000"
            @click.prevent="new_doc_pop = true">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg> Nuevo



        </button>


        <div style="
    height: auto;
    background: #ffffff;
    position: absolute;
     
    z-index: 1000;
    top: 0px;
    left:0;
    border-radius: 8px; 
    position: absolute;
    min-width: 203px;
    max-width: 260px;
    width: 230px;
  
    border:1px solid #E2E2E2;
   
" v-if="new_doc_pop" v-click-outside="closePopDoc">

            <ul style="margin:0;padding:0;list-style:none;width:100%">

                <li style="
    padding: 0;
    margin: 0;
    width: 100%;
"><a herf="#" @click.prevent="goToCreate(2, $event)"
                        style="font-size: 12px;padding: 14px;font-weight: 600;border-bottom: 1px solid rgb(229, 229, 229);text-align: left;width: 100%;display: block;padding-left:10px;color: rgb(25, 24, 71);cursor:pointer;"><img
                            src="@/assets/align-justify.svg" style="width:20px;height:20px;margin-right:10px" /> Archivo
                        biblioteca</a>


                </li>
                <li style="padding: 0;margin: 0;width: 100%;"><a herf="#" @click.prevent="goToCreate(1, $event)"
                        style="font-size: 12px;padding: 14px;font-weight: 600;border-bottom: 1px solid transparent;text-align: left;width: 100%;display: block;padding-left:10px;color: rgb(25, 24, 71);cursor:pointer;"><img
                            src="@/assets/assept-document.svg" style="width:20px;height:20px;margin-right:10px" />
                        Escrito automatizado</a>
                </li>
            </ul>
        </div>


    </div>

    <ul
        style="margin: 0;padding: 0;display: flex;justify-content: center;align-items: flex-start;align-content: flex-start;flex-direction: column;">
        <li style="padding:0;display:flex;width:100%;">
            <RouterLink to="/platform/dashboard"
                style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;width:100%;">
                <img src="@/assets/casa.svg" style="width:14px;height:14px;margin-right:5px" /> Inicio
            </RouterLink>
        </li>

        <li style="padding:0;display:flex;width:100%;">
            <RouterLink to="/platform/librarie"
                style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;width:100%;">
                <img src="@/assets/book-alt.svg" style="width:14px;height:14px;margin-right:5px" /> Mi Biblioteca
            </RouterLink>
        </li>


        <li style="padding:0;display:flex;width:100%;">
            <RouterLink to="/platform/my-writings"
                style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;width:100%;">
                <img src="@/assets/file.svg" style="width:14px;height:14px;margin-right:5px" /> Mis Escritos
            </RouterLink>
        </li>


        <!-- <li style="padding:0;display:flex;width:100%;">
            <RouterLink to="/platform/shared-with-me"
                style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;width:100%;">
                <img src="@/assets/users.svg" style="width:14px;height:14px;margin-right:5px" /> Compartidos Conmigo
            </RouterLink>
        </li> -->

        <li style="padding:0;display:flex;flex-direction:column;margin-top:150px;" v-if="user.data.role == 'admin'">
            <a href="@" style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;">
                Administracion</a>

            <ul
                style="margin: 0;padding: 0;display: flex;justify-content: center;align-items: flex-start;align-content: flex-start;flex-direction: column;padding:0;margin-bottom:100px">


                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/comments/documents"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">
                        Comentarios</RouterLink>
                </li>



                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/activity"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">
                        Actividad</RouterLink>
                </li>
                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/payments/suscriptions"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Bajas de
                        suscripcion</RouterLink>
                </li>


                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/payments"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Medios
                        de pago</RouterLink>
                </li>

                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/payments/code"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Codigos
                        promocionales</RouterLink>
                </li>



                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/users"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Usuarios
                    </RouterLink>
                </li>
                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/folders/v2/documents"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">
                        Carpetas documentos</RouterLink>
                </li>
                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/folders/v2/writings"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Carpetas
                        escritos</RouterLink>
                </li>
                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/tags"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">
                        Etiquetas</RouterLink>
                </li>





                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/suggest/feedback"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Dejanos
                        tu opinión</RouterLink>
                </li>

                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/suggest/reports/comments"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Reportes
                        de comentarios</RouterLink>
                </li>

                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/suggest/reports"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">Reportes
                    </RouterLink>
                </li>
                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/suggest/folders"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">
                        Solicitudes carpetas</RouterLink>
                </li>
                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/suggest/tags"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">
                        Solicitudes tags</RouterLink>
                </li>


                <li style="padding:0;display:flex;">
                    <RouterLink to="/platform/admin/suggest/points"
                        style="padding:6px;padding-left:20px;padding-right:20px;font-weight:700;font-size:12px">
                        Solicitudes Puntos</RouterLink>
                </li>


            </ul>
        </li>



    </ul>

</template> 
 
<script>
import vClickOutside from 'click-outside-vue3'
import { RouterLink } from "vue-router";


export default {
    data() {
        return {
            isDashboard: false,
            new_doc_pop: false,
            lib_submenu: false,
            writes_submenu: false,
            endpoint: window.ENDPOINT + '/users/auth',
            user: {
                data: {
                    role: 'user',
                    email: null,

                }
            },

        }
    },
    created() {

        this.checkDashboard()

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                auth: localStorage.getItem('auth')
            })
        };
        fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
            this.user = data;
        })

    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    methods: {
        checkDashboard() {
            if (window.location.pathname.includes('platform/dashboard')) {
                this.isDashboard = true
            }
            else {
                this.isDashboard = false
            }

            console.log(window.location.pathname)

        },

        goToCreate(type, event) {
            event.preventDefault();
            if (type == 1) {
                this.$router.push({ name: 'autowriting-new' })
            } else {
                this.$router.push({ name: 'document-new' })
            }
        },
        preventDefault(e) {
            e.preventDefault();
        },
        open_doc_pop(e) {
            e.preventDefault();
            if (this.new_doc_pop) {
                this.new_doc_pop = false;
            } else {
                this.new_doc_pop = true;
            }
        },
        open_writes() {
            // e.preventDefault();
            if (this.writes_submenu) {
                this.writes_submenu = false;
            } else {
                this.writes_submenu = true;
            }
        },
        open_lib() {
            // e.preventDefault();
            if (this.lib_submenu) {
                this.lib_submenu = false;
            } else {
                this.lib_submenu = true;
            }
        },

        closePopDoc(event) {
            this.new_doc_pop = false;
        }

    }
}

</script>

 


