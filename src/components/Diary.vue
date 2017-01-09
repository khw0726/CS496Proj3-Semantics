<template>
  <div>
    <!--<button class="btn btn-default" v-on:click="remove(myArticle)">X</button>-->
      <div>
        <h2 class="ui header">
        {{myArticle.title}} </h2>
        <h2 class="ui right floated sub header">{{dateStr()}}</h2>        
      </div>
      <br>
      <div class="ui contents diary">
        <p>{{myArticle.contents}}</p>
      </div>
      
      <h6 class="ui icon header">
        <i class="left quote icon"/>
      </h6>
      <div class="ui contents response">
        <pre><p>{{ myArticle.response }}</p></pre>
      </div>
      <div class="ui divider"/>

      <button class="ui right floated labeled icon basic blue button" v-on:click="retweet(myArticle.contents, myArticle.response)">
        <i class="twitter icon"></i> Tweet
      </button>
      <br>
  </div>
</template>

<script>
  export default {
    name: 'diary',
    props: ['myArticle', 'removeArticle', 'token', 'secret'],
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
          xhr.open('GET', 'http://ec2-52-79-161-158.ap-northeast-2.compute.amazonaws.com:3000/?diary=diary:%20' + diary + '%0A&response=junsoo:%20' + response + '&user_token=' + token + '&user_secret=' + secret, true)
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
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
#app .ui.contents.diary {
  text-indent: '4em';
  /*font: 'Consolas';
  margin-top: '20em';
  color: darkslategray;*/
}
#app .ui.contents.response {
  text-indent: '4em';
  color: darkslategray;
}
</style>
