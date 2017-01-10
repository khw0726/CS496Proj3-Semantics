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
      
      <!--<h6 class="ui icon header">
        <i class="left quote icon"/>
      </h6>-->
      <h3 class="ui header">
        Sally says:
      </h3>
      <div class="response">
        <div v-html="respLines"></div>
      </div>
<<<<<<< HEAD
      <!--<div class="ui contents">
=======
      <!--<h6 class="ui right floated icon header">
        <i class="right quote icon"/>
      </h6>-->
      <br>
      <div class="ui contents">
>>>>>>> 3edacc04f236a2a7e18bf770c1b1bb12e4627fc6
        {{myArticle.keywords}} {{myArticle.sentiment}}
      </div>-->
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
        $('.rtbutton .button').removeClass('basic')
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

          xhr.open('GET', 'http://ec2-52-79-161-158.ap-northeast-2.compute.amazonaws.com:3000/?diary=[CS496]Just a small diary%0A[Diary] ' + diary + '%0A&response=[Sally] ' + response + '%0AFor more information: http://localhost:8080' + '&user_token=' + token + '&user_secret=' + secret, true)
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
    },
    computed: {
      respLines: function () {
        let lines = this.myArticle.response.split('\n')
        for (let i = 0; i < lines.length; i++) {
          if (i !== 4) {
            lines[i] = '<p>' + lines[i] + '</p>'
          } else {
            lines[i] = '<p style=text-indent: 4em> <i class="left quote icon"></i>' + lines[i] + '<i class="right quote icon"></i> </p>'
          }
        }
        return lines.join('')
      }
    }
  }
</script>

<style>
/*#app .ui .contents .diary {
  text-indent: 4em;
  font: 'Consolas';
  margin-top: '20em';
  color: darkslategray;
}*/
response {
  font: 'Consolas';
  color: darkslategray;
}
</style>
