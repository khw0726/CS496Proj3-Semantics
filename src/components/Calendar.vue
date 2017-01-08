<template>
  <div class="dropdown">
    <button class="btn btn-default dropdown-toggle" type="button" id="yearMenu" data-toggle="dropdown" aria-expanded="true">
      {{currentYear}}
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="yearMenu">
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
      <!--<li role="presentation">
        <a role="menuitem" tabindex="year" href="#">{{ year }}</a></li>-->
    </ul>
  </div>
</template>

<script>
let today = new Date()
export default {
  name: 'calendar',
  data: function () {
    return ({
      today: today,
      currentYear: today.getFullYear()
    })
  }
}
</script>
