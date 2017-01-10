<template>
  <div id="app">
    <div id="login-modal" class="ui basic modal">
      <div class="ui center aligned header">
        Sign in
      </div>
      <div class="ui container center aligned">
        <div class="actions">
        <button class="ui inverted basic blue labeled icon button" v-on:click="onSignInClick()">
          <i class="twitter icon"/>Start
        </button>
        </div>
        <!--</div>-->
        <div class="content" v-if="loginFailure"> Log-in failed </div>
      </div>
    </div>

    <div id="menu" class="ui labeled icon small right fixed vertical inverted menu visible thin sidebar">
      <!--<div class="ui container">-->
        <a class="item" :class="{ active: status == 'list' }" id="menu-list" v-on:click="status = 'list'"><i class="unordered list icon"/><div class="ui mobile only">List</div></a>
        <!--<a class="item" id="menu-read" v-on:click="loadArticle()"><i class="file text outline icon"/>Read</a>-->
        <a class="item" :class="{ active: status == 'write' }" v-on:click="status = 'write'" ><i class="write icon"/><div class="ui mobile only">Write</div></a>
        <a class="item" :class="{ active: status == 'stats' }" v-on:click="status = 'stats'" ><i class="line chart icon"/><div class="ui mobile only">Stats</div></a>
        <!--<a class="item" :class="{ active: status == 'options' }" v-on:click="status = 'options'" ><i class="options icon"/><div class="ui mobile only">Options</div></a>-->
        <a class="item" @click="onSignOutClick()"><i class="sign out icon" /> Sign Out</a>
      <!--</div>-->
    </div>
    <div class="ui text container" id="app">
      <h1 class = "ui dividing header">Just a small diary</h1>
      <List v-if="status == 'list'" :items="getDiaryList(diary)" :on-item-click="loadArticle"></List>
      <Diary v-else-if="status == 'read'" :my-article="targetArticle" :remove-article="removeArticle" :token="token" :secret="secret"></Diary>
      <Edit v-else-if="status == 'write'" :diary="diary" :onSubmit="addEntry" :token="this.token"></Edit>
      <!--<Options v-else-if="status == 'options'" ></Options>-->
      <MyChart v-else-if="status == 'stats'" :chart-data="chartData" :options="chartOptions"></MyChart>
    </div>

  </div>
</template>
<script>
import $ from 'jquery'
import firebase from 'firebase'
// import semantic from 'semantic'
import Diary from './components/Diary'
import List from './components/List'
import Edit from './components/Edit'
import Calendar from './components/Calendar'
import MyChart from './components/MyChart'

const config = {
  apiKey: 'AIzaSyCGUiEq7RzyYn1wne4rwJZtEZn1m6QtJV0',
  authDomain: 'test-web-91d3a.firebaseapp.com',
  databaseURL: 'https://test-web-91d3a.firebaseio.com',
  storageBucket: 'test-web-91d3a.appspot.com',
  messagingSenderId: '464548710498'
}
let fb = firebase.initializeApp(config)
const db = fb.database()
const diaryRef = db.ref('diary')
const authRef = fb.auth()
// const provider = new fb.auth.TwitterAuthProvider();
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
    diary: diaryRef.orderByChild('date')
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
          data: this.sentiments,
          fill: false
        }]
      },
      status: 'login',
      loginFailure: false,
      token: '',
      secret: '',
      user: '',
      chartOptions: {
        title: {
          display: true,
          text: 'Your sentiments'
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Happiness level'
            }
          }]
        }
      }
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
          data: this.sentiments,
          fill: false
        }]
      }
    },
    token: function () {
      this.dates = this.getDates()
      this.sentiments = this.getSentiments()
      this.chartData = {
        labels: this.dates,
        datasets: [{
          label: 'Sentiments',
          data: this.sentiments,
          fill: false
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
    if (window.innerWidth < 720) { //  Some arbitrary mobile width
      $('.sidebar').addClass('bottom').removeClass('right').removeClass('vertical').addClass('four').addClass('item')
    } else {
      $('.sidebar').removeClass('bottom').addClass('right').addClass('vertical').removeClass('four').removeClass('item')
    }
    $(window).resize(function () {
      if (window.innerWidth < 720) { //  Some arbitrary mobile width
        $('.sidebar').addClass('bottom').removeClass('right').removeClass('vertical').addClass('four').addClass('item')
      } else {
        $('.sidebar').removeClass('bottom').addClass('right').addClass('vertical').removeClass('four').removeClass('item')
      }
    })
    $(this.$el).find('#login-modal').modal({
      closable: false
    }).modal('show')
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
      this.status = 'list'
      diaryRef.child(article['.key']).remove()
      this.targetArticle.title = ''
      this.targetArticle.contents = ''
      this.targetArticle.response = ''
      this.targetArticle.date = ''
    },
    getDates () {
      let token = this.token
      return this.diary.filter(function (diary) {
        return diary.token === token
      }).map(function (diary) {
        let a = new Date(diary.date)
        return a.toLocaleString('en-US')
      })
      // this.diary.filter(function(val) { return val !== null })
    },
    getSentiments () {
      let token = this.token
      return this.diary.filter(function (diary) {
        return diary.token === token
      }).map(function (diary) {
        return diary.sentiment - 0.5
      })
    },
    getDiaryList () {
      let token = this.token
      return this.diary.filter(function (diary) {
        return diary.token === token
      })
    },
    onSignInClick () {
      console.log(this.user)
      let provider = new firebase.auth.TwitterAuthProvider()
      authRef.signInWithPopup(provider).then(function (result) {
        this.token = result.credential.accessToken
        this.secret = result.credential.secret
        this.user = result.user
        $('.ui.modal').modal('hide')
        this.status = 'stats'
      }.bind(this)).catch(function (error) {
        console.log('error' + error)
      })
    },
    onSignOutClick () {
      authRef.signOut()
      this.token = ''
      this.secret = ''
      this.user = ''
      $('.ui.modal').modal('show')
      this.status = 'login'
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
  margin-top: 5em;
  margin-bottom: 5em;
}
#app .ui.dividing.header {
  margin-bottom: 2em;
}
</style>
