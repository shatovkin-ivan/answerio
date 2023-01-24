<template>
    <header class="footer">
			<div class="container">
				<div class="footer__wrap">
					<div class="footer__inner-wrap">
						<p class="footer__title">Sign up to get unlimited access</p>
						<div class="footer__right-block">
							<button class="footer__button gmail">Sign Up with Gmail</button>
							<button class="footer__button facebook">Sign Up with Facebook</button>
						</div>
					</div>
				</div>
			</div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  }
  </script>

	<style scoped lang="scss">
	.footer {
		padding-top: 122px;

		&__wrap {
			background: #224EFE;
			border-radius: 30px;
			padding: 122px 0;
		}

		&__inner-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			max-width: 1437px;
			width: 100%;
			margin: 0 auto;
		}

		&__title {
			font-size: 84px;
			line-height: 120%;
			max-width: 835px;
			width: 100%;
		}

		&__button {
			position: relative;
			max-width: 323px;
			width: 100%;
			background: #FFFFFF;
			border-radius: 18px;
			font-size: 20px;
			font-weight: 500;
			color: #224EFE;
			line-height: 320%;
		}

		&__button.gmail {
			margin-bottom: 40px;
		
			&::after {
				content: '';
				position: absolute;
				top: 19px;
				right: 30px;
				width: 34px;
				height: 25px;
				background-image: url('../assets/images/gmail.svg');
				background-position: center;
				background-size: contain;
				background-repeat: no-repeat;
			}
		}

		&__button.facebook {
		
			&::after {
				content: '';
				position: absolute;
				top: 19px;
				right: 20px;
				width: 31px;
				height: 31px;
				background-image: url('../assets/images/fb.svg');
				background-position: center;
				background-size: contain;
				background-repeat: no-repeat;
			}
		}
	}
	</style>
  