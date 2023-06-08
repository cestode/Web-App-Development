//import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
import Vue from 'vue'
const CSRF_INPUT = document.getElementById('csrfmiddlewaretoken')
const CSRF_TOKEN = CSRF_INPUT ? CSRF_INPUT.value : ""
axios.Axios.defaults.headers.common['X-CSRFTOKEN'] = CSRF_TOKEN

Vue.component('link-view',{
  props:['id','shortUrl','url'],
  methods :{
    onLinkChange: function(){
      const text = this.$refs.linkInput.value
      if(text === "") {
        this.$refs.linkInput.value = this.url
      } else {
        this.$emit('on-original-change',this.id,text)
      }
    }
  },
  template:
  `
  <div class="row">
            <div class="col">
                <input ref ="linkInput" type="text" class="form-control" :value = url v-on:change = "onLinkChange">
            </div>
            <div class="col" style="padding-left: 0%;">
                <div class="url-list-group input-group" style="margin-left: 0%;">
                    <input type="text" class="form-control" disabled :value=shortUrl>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-default btn-copy js-tooltip js-copy shadow-none" data-toggle="tooltip" data-placement="bottom" title="Copy to clipboard">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            	<div class = "col-auto"><button type="button" class="btn btn-danger" v-on:click = "$emit('on-delete',id)">X</button></div>
    </div>
  `
})
Vue.component('virtual-link-view',{

  mounted : function() {
    const linkInputRef = this.$refs.linkInput;
    linkInputRef.focus();
  },
  methods:{
    onFocusChange : function() {
      this.$emit('on-edit-end',this.$refs.linkInput.value)
    }
  },
  template:
  `
  <div class="row">
            <div class="col">
                <input ref ="linkInput" type="text" class="form-control" v-on:focusout = "onFocusChange">
            </div>
            <div class="col" style="padding-left: 0%;">
                <div class="url-list-group input-group" style="margin-left: 0%;">
                    <input type="text" class="form-control" disabled>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-default btn-copy js-tooltip js-copy shadow-none" data-toggle="tooltip" data-placement="bottom" title="Copy to clipboard">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
  </div>
  `
})

let App = new Vue({
    el: '#app',
    
    data: {
      links : [],
      showVirtualLink : false,
    },
    methods: {
      onAdd : function() {
        this.showVirtualLink = true
      },
      addItem : function(text) {
        if(text === "") {
          this.showVirtualLink = false
          return
        }
        if(this.links.find((val,index,obj) => val.original_link === text) === undefined) {
          let self = this;
          axios.post('/createShort',{
            link: text
          })
          .then((response)=>{
            console.log(response.data)
            self.links.push({
                id : response.data.id,
                original_link : text,
                short_link : window.location.host + '/' +response.data.short_link})
          })
        }
        this.showVirtualLink = false
      },
      changeItem : function(id,newText) {
        let updateItemId = this.links[id].id
        axios.patch('/updateLink',{
          id : updateItemId,
          newText : newText
        })
        console.log(id + " " + newText)
      },
      removeItem : function(id) {
        let removeItemId = this.links[id].id
        axios.delete('/deleteLink',{
          data : {
            id : removeItemId,
          }
        })
        this.links.splice(id,1)
      },
      validateUrl : function(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
      }
    },
    created: function () {
      let self = this
      axios.get('/getAllLinksData')
      .then((response) => {

        const obj = JSON.parse(response.data);
        for (let index = 0; index < obj.length; index++) {
          const element = obj[index];
          self.links.push({
            id : element.pk,
            original_link : element.fields.original_link,
            short_link : window.location.host + '/' + element.fields.short_link})
        }
      })
    }
  })

  export default App;