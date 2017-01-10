# vuetest002

> Just another simple diary

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

###Inner Structure

Vue.js(Front) + Node.js(Server) + Firebase(DB)

Server -> To solve the problem about CORS

1. Login 
2. Write Diary and AI(Sally) will response about it
3. Push 'Share with Twitter'
4. Connect with Node.js Server with user information plus 'Diary'
5. Node.js connects with Twitter upload system

Used 'Node-oauth' in Github for authentication

#### Inapp Photos

Inapp photos exists inside the "inapp_photos.zip" file
