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
      <div class="" <button type="submit" class="ui right floated button">Submit</button>
    </form>
    </div>
</template>

<script>
  // var contents = ''
  // var response1 = ''
  // var response2 = ''
  /*eslint-disable */
  let apiCall = function (type, contents) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/' + type, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '04c0ff18cfba42ee98308e132887ef84')
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve({ resp: JSON.parse(xhr.response), contents: contents })
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
      addEntry() {
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

            var keyword = this.newEntry.keywords[Math.floor(Math.random() * this.newEntry.keywords.length)]

            var bad0 = ["That's too bad.<br>", "I'm so sorry about that.<br>"]
            var bad1 = ["Even though " + keyword + " made you feel bad, You are really nice person!<br>",
            "So you are saying that " + keyword + " made you feel bad, right?<br>",
            "So you are saying that " + keyword + " made you so tired, right?<br>"]
            var bad2 = ["Actually, don't take it too seriously.<br>", "Just forget all about it.<br>",
              "Actually, that's not your fault.<br>"]
            var bad3 = "There's a saying:<br>"
            var bad4 = [keyword + " is a great teacher, but unfortunately it kills all its pupils.<br>",
              "Although the world is full of suffering, it is full also of the overcoming of it.<br>",
              "You can learn a little from victory; you can learn everything from defeat.<br>",
              "Never, never, never, never give up.<br>",
              "A good medicine tastes bitter.<br>",
              "No pain, no gain.<br>",
              "Every cloud has a silver lining.<br>",
              "Try your best rather than be the best.<br>"]
            var bad5 = "Anyway, "
            var alcohol = ["soju", "beer", "whisky", "makgeolli", "wine"]
            var game = ["Overwatch", "LoL", "Heroes of the Storm", "Tetris"]
            var bad6 = ["Why don't you drink some " + alcohol[Math.floor(Math.random() * alcohol.length)] + " for a change?<br>",
            "Why don't you play some game like " + game[Math.floor(Math.random() * game.length)] + " for your feeling?<br>",
              "Why don't you enroll CS496 course and write some code?<br>",
              "Why don't you take a break for your work and travel around the world?<br>"]
            var bad7 = "It'll make you feel better.<br>"
            var for_alcohol = "But make sure you drink it a little.<br>Too much alcohol will take your energy away.<br>"
            var for_game = "But make sure you play it for a while.<br>Too much game will take your energy away.<br>"
            var bad8 = ["Finally, I wish you have a great day tomorrow.<br>", "Finally, I think you can start again tomorrow.<br>"]
            var bad9 = ["Do your best! ><<br>", "Hang in there! ><<br>", "Cheer up! ><<br>", "You can do it! ><<br>"]
            var bye = ["Bye!<br>", "Annyeong!<br>", "Sayonara!<br>", "Adios!<br>"]
            var good0 = ["Congratulations!<br>", "Amazing!<br>"]
            var good1 = ["So you are saying that " + keyword + " made you feel great, right?<br>",
            "I think " + keyword + " made you happy, right?<br>",
            "I think " + keyword + " made you feel great, right?<br>"]
            var good2 = ["Good for you!<br>", "You had a really great day!<br>", "I'm so happy for you.<br>", "That's great.<br>"]
            var good3 = "Also, I totally agree with the saying like this: <br>"
            var good4 = [keyword + " banishes those three great evils- boredom, vice and poverty.<br>",
            "Who controls the " + keyword + " controls the future.<br>",
            "All roads lead to " + keyword + ".<br>",
            keyword + " is a second nature.<br>",
            keyword + " is power.<br>"]
            var good5 = "I believe you also like this saying. :)<br>"
            var good6 = "Anyway, "
            var good7 = ["Why don't you drink some " + alcohol[Math.floor(Math.random() * alcohol.length)] + "?<br>",
            "Why don't you play some game like " + game[Math.floor(Math.random() * game.length)] + "?<br>",
              "Why don't you enroll CS496 course and write some code?<br>",
              "Why don't you take some time with your friends?<br>"]
            var good8 = "It'll help you finish this day with happiness.<br>"
            var good9 = ["Finally, I hope you also have a great day tomorrow!<br>", "Finally, I wish you also have a happy day tomorrow!<br>",
              "Finally, I wish you also have a nice day tomorrow!<br>"]
            var final_response = ""

            if (this.newEntry.sentiment >= 0.5) {
              var is_alcohol = 0;
              var is_game = 0;
              var check = 0;
              check = Math.floor(Math.random() * good7.length);

              final_response = good0[Math.floor(Math.random() * good0.length)] + good1[Math.floor(Math.random() * good1.length)] + good2[Math.floor(Math.random() * good2.length)] + good3 + good4[Math.floor(Math.random() * good4.length)] + good5 + good6 +
                good7[check]
              if (check == 0)
                final_response = final_response + for_alcohol
              if (check == 1)
                final_response = final_response + for_game
              final_response = final_response + good8 + good9[Math.floor(Math.random() * good9.length)] + bye[Math.floor(Math.random() * bye.length)]
            }
            else {
              var is_alcohol = 0;
              var is_game = 0;
              var check = 0;
              check = Math.floor(Math.random() * bad6.length);
              final_response = bad0[Math.floor(Math.random() * bad0.length)] + bad1[Math.floor(Math.random() * bad1.length)] + bad2[Math.floor(Math.random() * bad2.length)] + bad3 + bad4[Math.floor(Math.random() * bad4.length)] + bad5 +
                bad6[check]
              if (check == 0)
                final_response = final_response + for_alcohol
              if (check == 1)
                final_response = final_response + for_game
              final_response = final_response + bad8[Math.floor(Math.random() * bad8.length)] + bad9[Math.floor(Math.random() * bad9.length)] + bye[Math.floor(Math.random() * bye.length)]
            }

            this.newEntry.response = final_response

            this.onSubmit(this.newEntry)
            this.newEntry.response = ''
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
