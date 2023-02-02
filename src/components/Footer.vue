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
							<!-- <button class="footer__button facebook">
								<span>Sign Up with Facebook</span>
								<div class="footer__icon-facebook"></div>
							</button> -->
						</div>
					</div>
				</div>
				<div class="footer__rights">
					<p class="footer__rights-text">All Rights Reserved © 2023</p>
					<div class="footer__rights-line"></div>
				</div>
			
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
			margin-bottom: 133px;
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
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 24px;
			opacity: 0.4;

			&-text {
				max-width: 246px;
				width: 100%;
				font-size: 20px;
				font-weight: 500;
				line-height: 240%;
				color: #A0A1A6;
				position: relative;
			}

			&-line {
			height: 2px;
			width: 100%;
			background: #FFFFFF;
			}
		}
	}

	@media screen and (max-width: 1200px) {
	.footer {
		padding-top: 150px;

		&__wrap {
			padding: 73px 53px;
			margin-bottom: 150px;
		}

		&__title {
			max-width: 507px;
		}
	}
	}

	@media screen and (max-width: 768px) {
		.footer {
    padding-top: 70px;

		&__wrap {
			padding: 54px 24px;
			margin-bottom: 70px;
		}

		&__inner-wrap {
			flex-direction: column;
			gap: 36px;
		}

		&__title {
			font-size: 42px;
			text-align: center;
			max-width: none;
		}

		&__button.gmail {
			margin-bottom: 20px;
		}

		&__rights-text {
			font-size: 16px;
			max-width: 197px;
		}

		&__rights-line {
			opacity: 0.1;
		}
		
	}
	}

	@media screen and (max-width: 320px) {
		.footer {
			margin-bottom: 20px;
			&__wrap {
				padding: 40px 15px;
				margin-bottom: 60px;
			}

			&__rights {
				display: block;
			}

			&__rights-text {
				text-align: center;
				margin: 0 auto;
			}

			&__rights-line {
				display: none;
			}

			&__button span {
				font-size: 18px;
			}

			&__button.gmail {
				padding: 0 25px;
			}
		}
	}
	</style>
  