<template>
    <div ref="autoSizeWrapper" class="autoSizeWrapper">
        <slot />
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    
    mounted () {
        console.log(this.$refs.autoSizeWrapper.getBoundingClientRect());
    }

});
</script>
