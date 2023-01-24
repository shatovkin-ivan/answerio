<template>
  <header class="header">
    <div class="container flex">
      <router-link class="header__title" to="/">
        Answerio
      </router-link>
      <button class="header__button">Sign In</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style scoped lang="scss">

.header {
	padding: 24px 0;
	margin-bottom: 131px;
	
	&__title {
		text-transform: uppercase;
	}

	&__button {
		font-size: 20px;
    font-weight: 500;
    color: #7F8186;
    background: #1D1F20;
    box-shadow: 0px 34px 64px rgba(0, 0, 0, 0.25);
    border-style: none;
    border-radius: 18px;
    padding: 20px 50px;
	}
}
</style>
