<template>
  <div>
    <div class="ui relaxed divided list">
      <div v-for="item in items" role="presentation" class="item">
        <h3 class="ui header"><a href="#" v-on:click="onItemClick(item)" class="header"> {{ item.title }}</a></h3>
        <div class="right floated content">{{ getDate(item) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'list',
    props: ['items', 'onItemClick'],
    methods: {
      getDate: function (item) {
        let a = new Date(item.date)
        return a.toLocaleString('en-US')
      }
    }
  }

</script>

<!--<style>
/*Sidebar from https://jsfiddle.net/gableroux/S2SMK/*/
.bs-docs-sidebar {
    padding-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

/* all links */
.bs-docs-sidebar .nav>li>a {
    color: #999;
    border-left: 2px solid transparent;
    padding: 4px 20px;
    font-size: 13px;
    font-weight: 400;
}


/* active & hover links */
.bs-docs-sidebar .nav>.active>a, 
.bs-docs-sidebar .nav>li>a:hover, 
.bs-docs-sidebar .nav>li>a:focus {
    color: #563d7c;                 
    text-decoration: none;          
    background-color: transparent;  
    border-left-color: #563d7c; 
}
/* all active links */
.bs-docs-sidebar .nav>.active>a, 
.bs-docs-sidebar .nav>.active:hover>a,
.bs-docs-sidebar .nav>.active:focus>a {
    font-weight: 700;
}

/* hide inactive nested list */
.bs-docs-sidebar .nav ul.nav {
    display: none;           
}
/* show active nested list */
.bs-docs-sidebar .nav>.active>ul.nav {
    display: block;           
}
</style>-->
