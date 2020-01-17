<template>
    <div>
        <div class="code"  @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
    </div>

</template>

<script>
    import identify from "./identify"
    export default {
        name: "",
        data() {
            return {
                input:'',
                identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                identifyCode: ""
            };
        },
        components:{
            's-identify':identify
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                 //console.log(this.identifyCode);
                // 获取验证码并向父组件传递
                this.$emit('code', this.identifyCode)
            },
            compare(){
//                if(this.identifyCode.toUpperCase()==this.input.toUpperCase()){
//                  alert(1)
//                }
//                else{
//                    alert(2)
//                }

                if(this.identifyCode.toLowerCase()==this.input.toLowerCase()){
//                    alert(1)
                }
                else{
//                    alert(2)
                }
            }
        }
    };
</script>

<style scoped>
    .code {
        /* margin: 0px auto; */
        width: 140px;
        height: 42px;
        display: inline-block;
         position: absolute;
        left: 200px;
        top: 242px;
    }

</style>
