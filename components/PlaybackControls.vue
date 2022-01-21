<template>
    <div class="playbackControlsComponent">
        <div class="statusRow">
            <p>0</p>
            <p>Step: {{value}}</p>
            <p>{{max}}</p>
        </div>
        <div class="progressRow js">
            <input
                class="active"
                type="range" ref="progress" step="1"
                min="0" :max="max" :value="value"
                :style="{ '--min': 0, '--max': max, '--val': value }"
                @input="updateValue">
        </div>
        <div class="controlsRow">
            <button @click.prevent="skipStart">{{ symbols.START }}</button>
            <button @click.prevent="step(-1)">{{ symbols.BACK }}</button>
            <button @click.prevent="togglePlayPause">{{ isPlaying ? symbols.PAUSE : symbols.PLAY }}</button>
            <button @click.prevent="step(1)">{{ symbols.FORWARD }}</button>
            <button @click.prevent="skipEnd">{{ symbols.END }}</button>
            <button @click.prevent="nextSpeed">(x{{ speed }} speed)</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.playbackControlsComponent {

    display: inline-flex;
    flex-direction: column;

    width: 500px;

    .statusRow {
        display: inline-flex;
        flex-direction: row;

        align-items: center;
        justify-content: space-between;

        p {
            display: inline-block;
        }
    }

    .progressRow {
        width: 100%;

        input[type="range"] {
            display: block;
            width: 100%;
        }
    }

    .controlsRow {
        display: inline-flex; 
        flex-direction: row;

        align-items: center;
        justify-content: space-around;
    }

}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'PlaybackControls',

    data: () => ({
        symbols: {
            START: '\u23EE',
            BACK: '\u23EA',
            PLAY: '\u25B6',
            PAUSE: '\u23F8',
            FORWARD: '\u23E9',
            END: '\u23ED'
        },

        speed: 1,

        value: 0,
        isPlaying: false,

        timerInterval: undefined as undefined | NodeJS.Timer,
        shifting: false
    }),

    watch: {
        value () {
            this.$emit('playbackProgress', this.value);
        },

        max () {
            this.value = this.max;
            this.isPlaying = false;
            this.$emit('playbackProgress', this.value);
        }
    },

    props: {
        max: {
            type: Number,
            required: true
        }
    },

    methods: {
        nextStep (delta = 1) {
            const mod = (x: number, m: number) => (x%m + m) % m;
            this.value = mod(parseInt(this.value.toString()) + delta, this.max + 1);

            console.log(this.value);
        },

        nextSpeed () {
            if (this.shifting) {
                return this.prevSpeed();
            }

            (() => {
                switch (this.speed) {
                    case 1: return this.speed = 2;
                    case 2: return this.speed = 4;
                    case 4: return this.speed = 8;
                    case 8: return this.speed = 16;
                    case 16: return this.speed = 32;
                    case 32: return this.speed = 0.25;
                    case 0.25: return this.speed = 0.5;
                    case 0.5: return this.speed = 1;
                }
            })();

            if (this.isPlaying) {
                this.stopPlayback();
                this.startPlayback();
            }
        },

        prevSpeed () {
            (() => {
                switch (this.speed) {
                    case 1: return this.speed = 0.5;
                    case 2: return this.speed = 1;
                    case 4: return this.speed = 2;
                    case 8: return this.speed = 4;
                    case 16: return this.speed = 8;
                    case 32: return this.speed = 16;
                    case 0.25: return this.speed = 32;
                    case 0.5: return this.speed = 0.25;
                }
            })();

            if (this.isPlaying) {
                this.stopPlayback();
                this.startPlayback();
            }
        },

        togglePlayPause () {
            if (!this.isPlaying) this.startPlayback();
            else this.stopPlayback();
        },

        startPlayback () {
            if (!this.timerInterval) {
                this.timerInterval = setInterval(() => {
                    if (this.isPlaying) {
                        this.nextStep();
                    }
                }, 1000 * (1/this.speed));
            }
            this.isPlaying = true;
        },

        stopPlayback () {
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.timerInterval = undefined;
            this.isPlaying = false;
        },

        step (delta: number) {
            if (this.isPlaying) this.stopPlayback();
            this.nextStep(delta);
        },

        skipStart () {
            if (this.isPlaying) this.stopPlayback();
            this.value = 0;
        },

        skipEnd () {
            if (this.isPlaying) this.stopPlayback();
            this.value = this.max;
        },

        updateValue (step: any) {
            this.value = parseInt(step.target.value);
        },

        onKeyDown (event: any) {
            if (event.shiftKey) this.shifting = true;
            else this.shifting = false;
        },

        onKeyUp (event: any) {
            if (!event.shiftKey) this.shifting = false;
            else this.shifting = true;
        }
    },

    mounted () {
        this.value = this.max;
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    },

    destroyed () {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
        this.stopPlayback();
    }
});
</script>
