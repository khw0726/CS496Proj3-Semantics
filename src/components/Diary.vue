<template>
  <div>
      <div>
        <h2 class="ui header">
        {{myArticle.title}} </h2>
        <h2 class="ui right floated sub header">{{dateStr()}}</h2>        
      </div>
      <br>
      <div class="ui contents diary">
        <p style="text-indent: 2em" v-html="myArticle.contents.replace(/\n\r?/g, '</p><p style=text-indent: 2em>')"></p>
      </div>
      
      <h6 class="ui icon header">
        <i class="left quote icon"/>
      </h6>
      <div v-html="myArticle.response.replace(/\n\r?/g, '<br/>')" class="ui contents response">
        <!--<p>{{ myArticle.response }}</p>-->
      </div>
      <div class="ui contents">
        {{myArticle.keywords}} {{myArticle.sentiment}}
      </div>
      <div class="ui divider"/>
      <div class="rtbutton">
        <button id="rtb" class="ui circular right floated labeled icon basic twitter button" v-on:click="retweet(myArticle.contents, myArticle.response)">
          <i class="twitter icon"/>Tweet
        </button>
      </div>
      <button class="ui circular left floated labeled icon basic negative button" v-on:click="remove(myArticle)"><i class="remove icon"/>Delete</button>
      <div class="ui inverted custom popup top left transition hidden">
        Tweet posted <i class="smile icon"/>
      </div>
      <div class="ui inverted sad popup top left transition hidden">
        Try again <i class="frown icon"/>
      </div>
      <br>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'diary',
    props: ['myArticle', 'removeArticle', 'token', 'secret'],
    mounted: function () {
      $('.rtbutton .button').popup({
        popup: $('.custom.popup'),
        on: 'click'
      })
      $('.rtbutton .button').on('click', function () {
        $('.rtbutton .button').removeClass('basic').hideOnScroll('always')
      })
    },
    methods: {
      dateStr: function () {
        let d = new Date(this.myArticle.date)
        console.log(d)
        return d.toLocaleString('en-US')
      },
      remove: function () {
        console.log(this.removeArticle)
        this.removeArticle(this.myArticle)
      },
      retweet: function (diary, response) {
        console.log(this.myArticle)
        let token = this.token
        let secret = this.secret
        new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest()
<<<<<<< HEAD
          xhr.open('GET', 'http://ec2-52-79-161-158.ap-northeast-2.compute.amazonaws.com:8080/?diary=[CS496]Just a small diary%0A[Diary] ' + diary + '%0A&response=[Sally] ' + response + '%0AFor more information: http://localhost:8080' + '&user_token=' + token + '&user_secret=' + secret, true)
=======
          xhr.open('GET', 'http://ec2-52-79-161-158.ap-northeast-2.compute.amazonaws.com:3000/?diary=[CS496]Just a small diary%0A[Diary] ' + diary + '%0A&response=[Sally] ' + response + '%0AFor more information: http://localhost:8080' + '&user_token=' + token + '&user_secret=' + secret, true)
>>>>>>> e27df33232b256359c5b8f44c8347860aaae9bf3
          xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              resolve()
            } else {
              reject()
            }
          }
          xhr.onerror = function () {
            reject()
          }
          xhr.send()
        }).then(function () {
          // console.log(this.status)
          // $('.custom .popup').popup('show')
          // $('.rtbutton .button').removeClass('basic')
        }).catch(function (err) {
          // $('.sad .popup').popup('show')
          console.log(err)
        })
      }
    }
  }
</script>

<style>
#app .ui .contents .diary {
  text-indent: 4em;
  /*font: 'Consolas';
  margin-top: '20em';
  color: darkslategray;*/
}
#app .ui.response {
  text-indent: '4em';
  font: 'Consolas';
  color: darkslategray;
}
</style>
