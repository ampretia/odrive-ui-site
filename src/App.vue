<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <nav class="navbar has-background-grey-lighter" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="@/assets/drive-logo.png" width="100" height="39">
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item " to="/">
          Cars
        </RouterLink>

        <RouterLink to="/trackexpr" class="navbar-item">
          Track
        </RouterLink>

      </div>
    </div>

  </nav>

  <div class="section">
    <RouterView />
  </div>
</template>

<style>

</style>
