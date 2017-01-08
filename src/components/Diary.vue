<template>
  <div>
    <!--<button class="btn btn-default" v-on:click="remove(myArticle)">X</button>-->
      <div>
        <h2 class="ui header">
        {{myArticle.title}} </h2>
        <h2 class="ui sub header">{{dateStr()}}</h2>        
      </div>
      <br>
      <div class="ui content">
        <p>{{myArticle.contents}}</p>
      </div>
    
      <div class="ui teal message">
        <p>{{ myArticle.keywords}} {{ myArticle.sentiment }}</p>
      </div>
      <br>
  </div>
</template>

<script>
  export default {
    name: 'diary',
    props: ['myArticle', 'removeArticle'],
    methods: {
      dateStr: function () {
        let d = new Date(this.myArticle.date)
        console.log(d)
        return d.toLocaleString('en-US')
      },
      remove: function () {
        console.log(this.removeArticle)
        this.removeArticle(this.myArticle)
      }
    }
  }
</script>

<!--<style>
.contents{
  text-indent: '4em';
  font: 'Consolas';
  margin-top: '20em';
  color: darkslategray;
}
</style>-->
