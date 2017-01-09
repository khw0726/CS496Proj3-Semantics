
<template>
  <div class="ui form">
    <form role="form" id="editForm" v-on:submit.prevent="addEntry">
      <div class="form-group">
        <div class="ui fluid input">
        <input type="text" v-model="newEntry.title" class="form-control" placeholder="Title"></input>
        </div>
        <br>
        <div class="ui fluid input">
        <textarea class="form-control" v-model="newEntry.contents" placeholder="How was your day?" rows="10"></textarea>
        </div>
      </div>
      <br>
      <div class=""
      <button type="submit" class = "ui right floated button">Submit</button>
    </form>
  </div>
</template>

<script>
// var contents = ''
// var response1 = ''
// var response2 = ''

let apiCall = function (type, contents) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/' + type, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '04c0ff18cfba42ee98308e132887ef84')
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve({resp: JSON.parse(xhr.response), contents: contents})
      } else {
        reject({
          status: this.status,
          statusText: 'error'
        })
      }
    }
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      })
    }
    let reqObj = {
      'documents': [{
        'language': 'en',
        'id': 'string',
        'text': contents
      }]
    }
    // console.log(reqObj)
    // console.log(contents)
    let jsonStr = JSON.stringify(reqObj)
    xhr.send(jsonStr)
  })
}
export default {
  name: 'edit',
  props: ['diary', 'onSubmit', 'token'],
  data: function () {
    return ({
      newEntry: {
        title: '',
        contents: '',
        keywords: '',
        sentiment: -1,
        date: '',
        response: '',
        token: ''
      }
    })
  },
  methods: {
    addEntry () {
      this.newEntry.date = Date()
      this.newEntry.token = this.token
      // contents = this.newEntry.contents
      // let xhr = new XMLHttpRequest()
      // xhr.open('POST', 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', false)
      // xhr.setRequestHeader('Content-Type', 'application/json')
      // xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '04c0ff18cfba42ee98308e132887ef84')
      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState === XMLHttpRequest.DONE) {
      //     response1 = xhr.response
      //   }
      // }
      // var jsonStr = JSON.stringify({
      //   'documents': [{
      //     'language': 'en',
      //     'id': 'string',
      //     'text': contents
      //   }]
      // })
      // xhr.send(jsonStr)

      // xhr = new XMLHttpRequest()
      // xhr.open('POST', 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', false)
      // //  xhr.setRequestHeader('Host', 'westus.api.cognitive.microsoft.com');
      // xhr.setRequestHeader('Content-Type', 'application/json')
      // xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '04c0ff18cfba42ee98308e132887ef84')
      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState === XMLHttpRequest.DONE) {
      //     response2 = xhr.response
      //   }
      // }
      // xhr.send(jsonStr)
      // console.log(response1)
      // this.newEntry.keywords = response1['documents']
      // this.newEntry.sentiment = response2['documents']
      // console.log(this.newEntry.keywords)
      // console.log(this.newEntry.sentiment)
      apiCall('keyPhrases', this.newEntry.contents)
      .then(function (r) {
        console.log(r.contents)
        console.log(r.resp.documents[0].keyPhrases)
        this.newEntry.keywords = r.resp.documents[0].keyPhrases
        return apiCall('sentiment', r.contents)
      }.bind(this)).then(function (r) {
        console.log(r)
        console.log(r.resp.documents[0].score)
        this.newEntry.sentiment = r.resp.documents[0].score
        this.onSubmit(this.newEntry)
        this.newEntry.title = ''
        this.newEntry.contents = ''
        this.newEntry.keywords = ''
        this.newEntry.sentiment = -1
      }.bind(this)).catch(function (err) {
        console.error(err.status)
      })
    }
  }
}
</script>

<style>
</style>
