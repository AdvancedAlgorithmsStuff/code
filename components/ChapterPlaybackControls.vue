<template>
    <div class="playbackControlsComponent">
        <div class="markerRow">
            <div class="marker" v-for="(chapter, index) in chapters" :key="index" :style="{ 'flex-grow': chapter.steps }">
                <p v-if="index == 0">{{ 0 }}</p>
                <p v-else />

                <p>{{ endOfChapter(chapter)}}</p>
            </div>
        </div>
        <div class="statusRow">
            <p>Step: {{value}}</p>
        </div>
        <div class="progressWrapper js">
            <div class="progressRowWrapper">
                <div class="progressRow">
                    <div
                        v-for="(chapter, index) in chapters"
                        :key="index"
                        class="progressCell"
                        :style="{ 'flex-grow': chapter.steps }">
                        <input
                            tabindex="-1"
                            class="progressBar"
                            :class="{ active: value >= startOfChapter(chapter) && (value < endOfChapter(chapter) || index == chapters.length - 1) }"
                            type="range"
                            ref="progress"
                            step="1" :min="startOfChapter(chapter)" :max="endOfChapter(chapter)"
                            :value="value"
                            @input="updateValue"
                            :style="{ '--min': startOfChapter(chapter), '--max': endOfChapter(chapter), '--val': value }">
                    </div>
                </div>

                <Draggable @newLocation="progressJump" />
            </div>
            <div class="chapterTitles">
                <p
                    class="title"
                    v-for="(chapter, index) in chapters" :key="index"
                    :style="{ 'flex-grow': chapter.steps }">
                    {{ chapter.name }}
                </p>
            </div>
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

    max-width: 100%;
    width: 700px;

    .markerRow {
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: space-between;

        .marker {
            display: flex;
            justify-content: space-between;
            flex-shrink: 1;
            flex-basis: 0;

            p {
                display: inline-block;
            }
        }
    }

    .statusRow {
        display: inline-block;
        align-self: center;
    }

    .progressWrapper {
        display: block;
        width: 100%;
        position: relative;

        .progressRow {
            display: flex;
            flex-direction: row;

            width: 100%;

            // input[type="range"] {
            //     display: block;
            //     width: 100%;
            // }

            .progressCell {
                display: block;
                flex-shrink: 1;
                flex-basis: 0;

                input[type="range"] {
                    display: block;
                    width: 100%;
                }
            }
        }

        .chapterTitles {
            display: flex;
            flex-direction: row;

            p.title {
                flex-shrink: 1;
                flex-basis: 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
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

<!-- <ChapterPlaybackControls :chapters="[{ name: 'Building Matrix', steps: 3}, { name: 'Finding Optimal Solution', steps: 5 }]" /> -->

<script lang="ts">
import Vue, { PropOptions } from 'vue';

export interface PlaybackChapter {
    name: string;
    steps: number;
};

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

        value: 0,
        isPlaying: false,

        speed: 1,

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

    computed: {
        max () {
            return this.chapters
                .map(chapter => chapter.steps)
                .reduce((accumulator, next) => accumulator + next, 0);
        }
    },

    props: {
        chapters: <PropOptions<PlaybackChapter[]>>{
            required: true,
            type: Array,
            default: () => []
        }
    },

    methods: {
        startOfChapter (chapter: number | PlaybackChapter) {
            if (typeof chapter === "object") chapter = this.chapters.indexOf(chapter);

            let n = 0;

            for (let i = 0; i < chapter; i++) {
                n += this.chapters[i].steps;
            }

            return n;
        },

        endOfChapter (chapter: number | PlaybackChapter) {
            if (typeof chapter === "object") chapter = this.chapters.indexOf(chapter);

            let n = 0;

            for (let i = 0; i < chapter; i++) {
                n += this.chapters[i].steps;
            }

            n += this.chapters[chapter].steps;
            return n;
        },

        nextStep (delta = 1) {
            const mod = (x: number, m: number) => (x%m + m) % m;
            this.value = mod(this.value + delta, this.max + 1);
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

        step (delta) {
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

        updateValue (step: any, chapter: PlaybackChapter) {
            this.value = step.target.value;
        },

        progressJump (data: any) {
            this.value = Math.round(data.percentX * this.max);
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
