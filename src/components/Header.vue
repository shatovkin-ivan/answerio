<template>
  <header class="header">
    <div class="container flex gap-50">
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
	padding-top: 24px;
	
	&__title {
		text-transform: uppercase;
		font-size: 20px;
		font-weight: 700;
		letter-spacing: 0.1em;
		line-height: 240%;
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

@media screen and (max-width: 768px) {
	.header {
		&__button {
			padding: 20px 30px;
		}
	}
}

@media screen and (max-width: 320px) {
	.header {
		&__button {
			padding: 20px 20px;
		}
	}
}
</style>
