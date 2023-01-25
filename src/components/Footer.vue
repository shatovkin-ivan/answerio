<template>
    <footer class="footer">
			<div class="container">
				<div class="footer__wrap">
					<div class="footer__inner-wrap">
						<p class="footer__title">Sign up to get unlimited access</p>
						<div class="footer__right-block">
							<button class="footer__button gmail">
								<span>Sign Up with Gmail</span>
								<div class="footer__icon-gmail"></div>
							</button>
							<button class="footer__button facebook">
								<span>Sign Up with Facebook</span>
								<div class="footer__icon-facebook"></div>
							</button>
						</div>
					</div>
				</div>
				<p class="footer__rights">All Rights Reserved © 2023</p>
			</div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  }
  </script>

	<style scoped lang="scss">
	.footer {
		padding-top: 122px;
		margin-bottom: 50px;

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
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 10px;
			position: relative;
			background: #FFFFFF;
			border-radius: 18px;
		}

		&__button span {
			font-size: 20px;
			font-weight: 500;
			color: #224EFE;
			line-height: 320%;
		}

		&__button.gmail {
			padding: 0 55px;
			margin-bottom: 40px;
		}

		&__button.facebook {
			padding: 0 38px;
		}

		&__icon-gmail {
			width: 34px;
			height: 25px;
			background-image: url('../assets/images/gmail.svg');
			background-position: center;
			background-size: contain;
			background-repeat: no-repeat;
		}

		&__icon-facebook {
			width: 31px;
			height: 31px;
			background-image: url('../assets/images/fb.svg');
			background-position: center;
			background-size: contain;
			background-repeat: no-repeat;
		}

		&__rights {
			font-size: 20px;
			font-weight: 500;
			line-height: 240%;
			color: #A0A1A6;
			opacity: 0.4;
			position: relative;
			margin-top: 133px;

			&::after {
				content: '';
				display: block;
				position: absolute;
				right: 0;
				top: 50%;
				height: 2px;
				width: 80%;
				background: #FFFFFF;
			}
		}
	}

	@media screen and (max-width: 1200px) {
	.footer {
		&__wrap {
			padding: 73px 53px;
		}

		&__title {
			max-width: 507px;
		}
	}
	}
	</style>
  