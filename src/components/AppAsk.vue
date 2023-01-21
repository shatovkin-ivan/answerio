<template>
  <div class="ask">
    <div class="container">
      <h1 class="h1">From <span>science</span> fiction to reality</h1>
      <p class="ask-text">Get an instant AI-based response from reliable sources</p>
      <form class="form">
        <input class="form-input" type="text" placeholder="Ask any question...">
        <div class="content">
          <div class="left-block">
            <label class="label" for="choice">Rate the answer</label>
            <input class="radio radio-1" type="radio" name="choice" id="choice-for">
            <input class="radio radio-2" type="radio" name="choice" id="choice-against">
          </div>
         <div class="right-block">
          <button>Clear</button>
          <button>Ask a question</button>
         </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.h1 {
  font-size: 74px;
  font-weight: 400;
  color: #A0A1A6;
  text-align: center;
  margin-bottom: 25px;
}
.h1 span {
  color: #ffffff;
}

.ask-text {
  font-size: 24px;
  font-weight: 400;
  color: #A0A1A6;
  text-align: center;
  margin-bottom: 70px;
}

.form {
  background: linear-gradient(181.25deg, #224EFE -41.38%, #0E36D6 87.57%);
  box-shadow: 0px 34px 64px 0px #00000040;
  border-radius: 30px;
  text-align: center;
  padding: 26px 29px 32px;
}

.form-input {
  display: block;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border-style: none;
  font-size: 24px;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  padding: 15px 30px;
  min-height: 230px;
  margin-bottom: 25px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 20px;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  margin-right: 20px;
} 
.left-block {
  display: flex;
  align-items: center;
}

.radio {
  width: 29px;
  height: 73px;
  appearance: none;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.radio-1 {
  background-image: url('../assets/images/thumb-down.svg');
}

.radio-2 {
  background-image: url('../assets/images/thumb-up.svg');
}
</style>

<script>
export default {

}
</script>