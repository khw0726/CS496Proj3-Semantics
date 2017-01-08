<template>
  <div id="app">
    <div id="login-modal" class="ui basic modal">
      <div class="ui center aligned header">
        Sign in
      </div>
      <div class="ui container center aligned">
        <div class="ui vertical buttons">
        <button class="ui approve labeled icon button">
          <i class="google icon"/>Continue
        </button>
        <br><br>
        <button class="ui approve inverted basic green labeled icon button">
          <i class="google icon"/>Start
        </button>
        </div>
      </div>
    </div>
    <div id="menu" class="ui labeled icon small right fixed vertical hidden inverted menu">
      <!--<div class="ui container">-->
        <a class="item" :class="{ active: status == 'list' }" id="menu-list" v-on:click="status = 'list'"><i class="calendar icon"/>List</a>
        <!--<a class="item" id="menu-read" v-on:click="loadArticle()"><i class="file text outline icon"/>Read</a>-->
        <a class="item" :class="{ active: status == 'write' }" v-on:click="status = 'write'" ><i class="write icon"/>Write</a>
        <a class="item" :class="{ active: status == 'stats' }" v-on:click="status = 'stats'" ><i class="line chart icon"/>Stats</a>
        <a class="item"><i class="sign out icon"/> Sign Out</a>
      <!--</div>-->
    </div>
    <div class="ui text container" id="app">
      <h1 class = "ui dividing header">Just a small diary</h1>
      <List v-if="status == 'list'" :items="diary" :on-item-click="loadArticle"></List>
      <Diary v-else-if="status == 'read'" :my-article="targetArticle" :remove-article="removeArticle"></Diary>
      <Edit v-else-if="status == 'write'" :diary="diary" :onSubmit="addEntry"></Edit>
      <MyChart v-else-if="status == 'stats'" :chart-data="chartData" :options="null"></MyChart>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'

// import semantic from 'semantic'
import Diary from './components/Diary'
import List from './components/List'
import Edit from './components/Edit'
import Calendar from './components/Calendar'
import MyChart from './components/MyChart'
import db from './db'
const diaryRef = db.ref('diary')
export default {
  name: 'app',
  components: {
    Diary,
    List,
    Edit,
    Calendar,
    MyChart
  },
  firebase: {
    diary: diaryRef
  },
  data: function () {
    return ({
      targetArticle: {
        title: '',
        contents: '',
        keyPhrases: [],
        sentiment: -1,
        date: ''
      },
      dates: this.getDates(),
      sentiments: this.getSentiments(),
      chartData: {
        labels: this.dates,
        datasets: [{
          label: 'Sentiments',
          data: this.sentiments
        }]
      },
      status: 'login'
    })
  },
  watch: {
    diary: function () {
      this.dates = this.getDates()
      this.sentiments = this.getSentiments()
      this.chartData = {
        labels: this.dates,
        datasets: [{
          label: 'Sentiments',
          data: this.sentiments
        }]
      }
    }
  },
  mounted: function () {
    // $(function () {
    //   console.log($('.ui .item'))
    //   $('.ui .item').on('click', function () {
    //     // console.log(this)
    //     $('.ui .item').removeClass('active')
    //     $(this).addClass('active')
    //   })
    // })
    // $(function () {
    //   $('.modal').ready(function () {
    //     console.log($('.modal .dimmer'))
    //     $('.modal .dimmer').show()
    //   })
    // })
    $(this.$el).find('#login-modal').modal('setting', 'closable', false).modal('show')
  },

  //   // $('#sb').sidebar({context: '#app'})
  // },
  methods: {
    addEntry (newEntry) {
      let newPostKey = diaryRef.push(newEntry).key
      diaryRef.child(newPostKey).once('value').then(function (snapshot) {
        this.targetArticle = snapshot.val()
      }.bind(this))
      this.status = 'read'
      // $('.ui .item').removeClass('active')
    },
    loadArticle (article) {
      // $('.ui .item').removeClass('active')
      this.targetArticle = article
      this.status = 'read'
    },
    removeArticle (article) {
      diaryRef.child(article['.key']).remove()
      this.targetArticle.title = ''
      this.targetArticle.contents = ''
      this.targetArticle.response = ''
      this.targetArticle.date = ''
    },
    getDates () {
      return this.diary.map(function (diary) {
        let a = new Date(diary.date)
        return a.toLocaleString('en-US')
      })
    },
    getSentiments () {
      return this.diary.map(function (diary) {
        return diary.sentiment
      })
    },
    onLoginClick () {
      // if login successes, Continue. else go back to the modal
    }
    // },
    // onListingClick () {
    //   // console.log($('#list-menu'))
    //   // $('#list-menu').addClass('active').sibilings().removeClass('active')
    //   this.status = 'list'
    // },
    // // },
    // // toggle () {
    // //   console.log(this.$refs)
    // //   // $('.sb').sidebar('toggle')
    // //   this.sb('toggle')
    // // }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
