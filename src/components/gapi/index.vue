<template>
  <gDocs>MMMM</gDocs>
</template>


<styles>

</styles>



<script>
import { defineComponent } from 'vue'

export default defineComponent({

  name: 'gDocs',
  props: {
    // msg: String
  },
  components: {

  },
  data() {
    return {
      isInit: false,
      tokenClient,
      gapiInited,
      gisInited

    }
  },
  computed: {

  },
  created() {
    const that = this
    this.$init()

    const checkGALoad = () => that.gapiLoaded()
    checkGALoad()
      .then((e) => {
        console.log(e)
      })


  },
  started() {

    console.log(this.$gapi) //vue-gapi global is this.$gapi

    const loadLibrary = function () {
      return new Promise(function (resolve, reject) {
        const src = 'https://apis.google.com/js/api.js'
        let s = document.querySelector('script[src="' + src + '"]')
        let shouldAppend = false
        if (!s) {
          s = document.createElement('script')
          s.src = src
          s.async = true
          s.onload = function () {
            s.setAttribute('data-loaded', true)
            resolve()
          }
          s.onerror = reject
          shouldAppend = true
        } else if (s.hasAttribute('data-loaded')) {
          resolve()
        }
        if (shouldAppend) {
          document.head.appendChild(s)
        }
      })
    }

    const initClient = (config) => {
      return new Promise((resolve, reject) => {
        window.gapi.load('client:auth2', () => {
          window.gapi.client.init(config)
            .then(() => {
              resolve(window.gapi)
            }).catch((error) => {
              reject(error)
            })
        })
      })
    }

    const Google = class {
      constructor() {
        this.api = null
        this.isInit = false
      }
      load(config) {
        loadLibrary().then(() => {
          return initClient(config)
        }).then((gapi) => {
          this.api = gapi
          this.isInit = true
        })
      }
    }
  },
  methods: {
    gapiLoaded() {
      this.$init().load('client', initializeGapiClient);
    },



    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async initializeGapiClient() {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      gapiInited = true;
      maybeEnableButtons();
    },

    /**
     * Callback after Google Identity Services are loaded.
     */
    // gisLoaded() {
    //   tokenClient = google.accounts.oauth2.initTokenClient({
    //     client_id: CLIENT_ID,
    //     scope: SCOPES,
    //     callback: '', // defined later
    //   });
    //   gisInited = true;
    //   maybeEnableButtons();
    // }


  }
}



</script>
