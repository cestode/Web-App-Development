<template>
<p class="history-header">Your URls</p>
      <table class="table table-text-color center-table">
        <tbody>
            <div v-for = "(link,key) in links" :key="key">
                <link-view :id = "key" :url = "link.original_link" :short-url = "link.short_link" v-on:on-delete = "removeItem" v-on:on-original-change = "changeItem"></link-view>
            </div>
            <virtual-link-view v-on:on-edit-end = "addItem" v-if = "showVirtualLink"></virtual-link-view>
        </tbody>
      </table>
      <div class="row">
          <div class="col add-btn-center">
            <button type="submit" class="btn btn-outline-light rounded-pill" v-on:click = "onAdd">Add</button>
          </div>
      </div>
</template>

<script>
import VirtualLinkView from './components/VirtualLinkView.vue'
import LinkView from './components/LinkView.vue'
import axios from 'axios'

const CSRF_INPUT = document.getElementById('csrfmiddlewaretoken')
const CSRF_TOKEN = CSRF_INPUT ? CSRF_INPUT.value : ""
axios.defaults.headers.common['X-CSRFTOKEN'] = CSRF_TOKEN

export default {
  name: 'App',
  components: {
    VirtualLinkView,
    LinkView,
  },
  data() {
    return {
      links : [],
      showVirtualLink : false,
    }
  },
  methods: {
      onAdd() {
        this.showVirtualLink = true
      },
      addItem(text) {
        if(text === "") {
          this.showVirtualLink = false
          return
        }
        if(this.links.find((val) => val.original_link === text) === undefined) {
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
      changeItem(id,newText) {
        let updateItemId = this.links[id].id
        axios.patch('/updateLink',{
          id : updateItemId,
          newText : newText
        })
        console.log(id + " " + newText)
      },
      removeItem(id) {
        let removeItemId = this.links[id].id
        axios.delete('/deleteLink',{
          data : {
            id : removeItemId,
          }
        })
        this.links.splice(id,1)
      },
      validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
      }
    },
    created() {
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
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
