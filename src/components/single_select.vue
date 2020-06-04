<template>
    <div>
      <ul>
        <li v-for="(content,index) in chooses"  :key="index">
          <input type="radio" name="xuanze" v-model="result" :id="index" :value="getCharOrder(index)"/>
          <label :for="index">{{ content }}</label>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        props: ['chooses'],
        data(){
            return{
                result: ''
            }
        },
        methods: {
            getCharOrder(index){
                return String.fromCharCode(65 + index);
            },
            getNumberOrder(index){
                return index;
            },
            getResult(){
                this.$parent.setResult(this.result);
            },
            reset(){
                this.result = '';
                this.$parent.setResult(this.result);
            },
            setResult(result){
                if(!result.length){
                    this.$parent.setResult(this.result);
                }else{
                    this.result = result;
                    this.$parent.setResult(this.result);
                }
            }
        }
    }
</script>

<style >

</style>
