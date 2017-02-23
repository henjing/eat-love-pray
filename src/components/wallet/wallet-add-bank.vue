<template>
    <div class="k-wrap container">
        <div class="padding-t-20 ui-whitespace">
            <h4 class="font14 color-4a">添加银行卡信息</h4>
            <!--交易所对应要提交的信息-->
            <div class="certi-info margin-t-10 bg-white">
                <form id="addBankForm">
                    <div class="ui-form-item ui-border-b">
                        <label for="#">所属银行</label>
                        <input class="text-right"type="text" placeholder="如：农业银行">
                    </div>
                    <div class="ui-form-item  margin-b-10">
                        <label for="#">银行卡号</label>
                        <input class="text-right" type="tel"placeholder="请输入银行卡号">
                    </div>
                </form>
            </div>
            <div class="margin-t-20 margin-b-15">
                <router-link to="/wallet" class="recharge-btn btn-yellow">保存</router-link>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return {
            }
        },
        components: {},
        methods: {
        }
    }
</script>
