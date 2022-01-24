<template>

    <div>
        <table>
            <tr>
                <th>
                    Origin
                </th>
                <th>
                    Destination
                </th>
                <th>
                    Capacity
                </th>
            </tr>
            <tr v-for="(item, index) in this.itemListRaw" :key="index">
                <td>
                    <input v-model="item.origin">
                </td>
                <td>
                    <input v-model="item.destination">
                </td>
                <td>
                    <input v-model="item.capacity">
                </td>
            </tr>
        </table>
        <div ref="canvas" id="canvas" />
        <button @click="addItem">Add Item</button>
        <button @click="removeItem">Remove Item</button><br/>

        <input v-model="smart"><button @click="smartInsert">Insert</button>

        <transition name="fade">
            <div v-if="this.errorMsg">
                {{this.errorMsg}}
            </div>
            <div v-else>
                <ChapterPlaybackControls :chapters="this.chapters" @playbackProgress="this.renderDiagramStep" />
                <div ref="diagram" />
            </div>
        </transition>
    </div>

</template>

<script lang="ts">


import {StringIndexed, stepBuilderBuilder} from '../../lib/GraphTools';
import {Item, ItemRaw, fordSolver} from '../../lib/Fordflukerson';
import {GraphRender} from '../../lib/GraphRenderer';

import Vue from 'vue'
import { PlaybackChapter } from '~/components/ChapterPlaybackControls.vue';

export default Vue.extend({
    data: (): {itemListRaw: ItemRaw[], errorMsg: string | false, steps: string[], chapters: PlaybackChapter[], smart: string, renderer?: GraphRender, pos: StringIndexed<[number, number]>} => ({
        itemListRaw: [
            {origin: "s", destination: "2", capacity: "10"},
            {origin: "s", destination: "3", capacity: "10"},

            {origin: "2", destination: "3", capacity: "2"},
            {origin: "2", destination: "5", capacity: "8"},
            {origin: "2", destination: "4", capacity: "4"},

            {origin: "3", destination: "5", capacity: "9"},

            {origin: "4", destination: "t", capacity: "10"},

            {origin: "5", destination: "4", capacity: "6"},
            {origin: "5", destination: "t", capacity: "10"},
        ],
        errorMsg: false,
        steps: [],
        chapters: [],
        smart: '',

        renderer: undefined,
        pos: {},
    }),
    mounted () {
        this.$nextTick(() => {
            (this as any).itemListRaw = [...(this as any).itemListRaw];
            (this as any).calculate();
            (this as any).renderDiagramStep(this.steps.length - 1);
            this.createRender();
        })
    },
    methods: {
        createRender () {
          const canvas = document.createElement('canvas');
          this.renderer = new GraphRender(canvas, this.nodeNames, (pos) => {
            this.pos = pos;
            this.calculate();
            this.renderDiagramStep(0);
          }, this.renderCanvas);
          this.renderer.width = window.innerWidth - 10;
          this.renderer.height = 300;
          this.renderer!.render();
        },
        renderCanvas() {
          // Render canvas on screen.
          (this as any).$renderEmpty(this.$refs.canvas);
          (this.$refs.canvas! as HTMLElement).appendChild(this.renderer!.ctx.canvas);
        },
        async renderDiagramStep(step: number) {
            if (this.steps[step]) {
                console.log(this.steps[step])
                console.log(this.pos)
                console.log(this.pos['A'])
                await (this as any).$renderDiagram(this.steps[step], {
                    parentElement: this.$refs.diagram,
                    replaceContents: true,
                    engine: 'neato'
                });
            }
        },
        addItem() {
            this.itemListRaw.push({origin: '', destination: '', capacity: '0'});
        },
        removeItem() {
            this.itemListRaw.splice(-1)
        },
        async calculate() {

            //Cleanup
            this.errorMsg = false;

            //Code
            let nodeNames = this.nodeNames;

            if (!nodeNames.includes('t') || !nodeNames.includes('s')) {
                this.errorMsg = 'A s and t node are needed';
                return;
            }

            let steps: string[] = [];

            let stepBuilder = stepBuilderBuilder(steps, nodeNames);

            let obj: StringIndexed<[number, number]> = {}; 
            Object.keys(this.pos).forEach(a => obj[a] = [this.pos[a][0] / 40, -this.pos[a][1] / 40] );

            let [sp, chap] = fordSolver(obj, this.itemList, stepBuilder, nodeNames, [{name: "Initial", steps: 1}], steps);

            this.chapters = chap;
            this.steps = sp

        },
        smartInsert() {
            let t = this.smart.split(',');
            if (t.length != 3) return;
            this.itemListRaw.push({origin: t[0], destination: t[1], capacity: t[2]});
            this.smart = "";
        }
    },
    computed: {
        itemList(): Item[] {
            return this.itemListRaw
                .map(a => ({origin: a.origin.trim(), destination: a.destination.trim(), capacity: Number(a.capacity)}))
                .filter(a => a.origin && a.destination && !isNaN(a.capacity));
        },
        nodeNames(): string[] {
            let nodeNamesS: Set<string> = new Set();

            for (let conn of this.itemList) {
                nodeNamesS.add(conn.origin);
                nodeNamesS.add(conn.destination);
            }

            let a = Array.from(nodeNamesS);
            a.sort();
            return a;
        }
    },
    watch: {
        itemList() {
            let nodeNamesS: Set<string> = new Set();

            for (let conn of this.itemList) {
                nodeNamesS.add(conn.origin);
                nodeNamesS.add(conn.destination);
            }

            let a = Array.from(nodeNamesS);
            a.sort();
            
            this.renderer?.updateNodes(a);
            this.calculate()
            },
        itemListRaw() {

            let nodeNamesS: Set<string> = new Set();

            for (let conn of this.itemList) {
                nodeNamesS.add(conn.origin);
                nodeNamesS.add(conn.destination);
            }

            let a = Array.from(nodeNamesS);
            a.sort();
            
            this.renderer?.updateNodes(a);

            this.calculate()
        },
        pos() {
            this.calculate();
        }
    }

})
</script>

<style scoped>
    table {
        border-collapse: collapse;
    }
    th {
        border: 1px solid black;
    }
    td {
        border: 1px solid black;
    }
</style>