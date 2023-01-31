<template>
  <header class="header">
    <div class="container flex gap-50">
      <router-link class="header__title" to="/">
        Answerio
      </router-link>
      <button 
		@click="signIn"
		class="header__button"
	>Sign In
		</button>
    </div>
  </header>
</template>

<script>

import { signIn } from '@/plugin/authPopup'

export default {
  name: 'HeaderComponent',
  setup() {
	return {
		signIn
	}
  }
}
</script>

<style scoped lang="scss">

.header {
	margin-top: 24px;
	margin-bottom: 131px;
	&__title {
		text-transform: uppercase;
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		line-height: 240%;
	}
	&__button {
		font-size: 2rem;
		font-weight: 500;
		color: #7F8186;
		background: #1D1F20;
		box-shadow: 0px 34px 64px rgba(0, 0, 0, 0.25);
		border-style: none;
		border-radius: 18px;
		padding: 20px 50px;
		transition: .3s color ease-in-out, .3s background-color ease-in-out;
		&:hover {
			color: rgba(255, 255, 255, .4);
			background-color: var(--theme-color-1);
		}
	}
}

@media screen and (max-width: 1440px){
	.header {
		margin-bottom: 116px;
	}
}

@media screen and (max-width: 991px) {
	.header {
		margin-bottom: 77px;
		
		&__button {
			padding: 20px 30px;
		}
	}
}

@media screen and (max-width: 560px) {
	.header {
		&__button {
			padding: 20px 20px;
		}
	}
}
</style>
