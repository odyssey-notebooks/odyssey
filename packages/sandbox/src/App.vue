<template>
  <div id="app">
    <div id="nav" class="relative bg-gray-400 shadow h-10">
      <div class="p-1 absolute">
        <router-link to="/">
          <img src="/img/icons/favicon-128.png" width="32px">
        </router-link>
      </div>
      <div class="h-10 flex items-center justify-center text-center pt-1">
        <h1 class="font-bold text-2xl">{{$route.meta.title}}</h1>
      </div>
    </div>
    <div class="container mx-auto pt-4">
      <router-view/>
    </div>
  </div>
</template>
