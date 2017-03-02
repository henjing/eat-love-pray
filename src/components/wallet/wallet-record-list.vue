<template>
    <div class="jin-wrap">

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [{
                    list: [{

                    }],
                    title: ''
                }]
            }
        },
        created() {
            axios.get('/api/Billing/getList').then(function (res) {
                console.log('res', res);
            }).catch(function () {

            });
        }
    }
</script>