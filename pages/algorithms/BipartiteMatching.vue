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
            </tr>
            <tr v-for="(item, index) in this.itemListRaw" :key="index">
                <td>
                    <input v-model="item.origin">
                </td>
                <td>
                    <input v-model="item.destination">
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


import {StringIndexed, stepBuilderBuilder, ItemListToStringIndexed, ItemListToStringIndexedNumber} from '../../lib/GraphTools';
import {Item, ItemRaw, fordSolver} from '../../lib/Fordflukerson';
import {GraphRender} from '../../lib/GraphRenderer';

import Vue from 'vue'
import { PlaybackChapter } from '~/components/ChapterPlaybackControls.vue';

export default Vue.extend({
    data: (): {itemListRaw: ItemRaw[], errorMsg: string | false, steps: string[], chapters: PlaybackChapter[], smart: string} => ({
        itemListRaw: [],
        errorMsg: false,
        steps: [],
        chapters: [],
        smart: '',
    }),
    mounted () {
        this.$nextTick(() => {
            (this as any).itemListRaw = [...(this as any).itemListRaw];
            (this as any).calculate();
            (this as any).renderDiagramStep(this.steps.length - 1);
        })
    },
    methods: {
        async renderDiagramStep(step: number) {
            if (this.steps[step])
            console.log(this.steps[step]);
                await (this as any).$renderDiagram(this.steps[step], {
                    parentElement: this.$refs.diagram,
                    replaceContents: true,
                    engine: 'neato'
                });
        },
        addItem() {
            this.itemListRaw.push({origin: '', destination: '', capacity: 'Infinity'});
        },
        removeItem() {
            this.itemListRaw.splice(-1)
        },
        async calculate() {

            //Cleanup
            this.errorMsg = false;

            //Code
            let nodeNames = this.nodeNames;

            let stColS: Set<string> = new Set();
            let ndColS: Set<string> = new Set();
            for (let i of this.itemList) {
                stColS.add(i.origin);
                ndColS.add(i.destination);
            }
            let stCol: string[] = Array.from(stColS);
            let ndCol: string[] = Array.from(ndColS);

            for (let i of stCol) {
                if (ndCol.includes(i)) {
                    this.errorMsg = 'Items in the 1st column can not be in the 2nd';
                    return;
                }
            }

            /*if (!nodeNames.includes('t') || !nodeNames.includes('s')) {
                this.errorMsg = 'A s and t node are needed';
                return;
            }*/

            let steps: string[] = [];

            let stepBuilder = stepBuilderBuilder(steps, nodeNames);

            let chapters = [{name: "Building the graph", steps: 2 }, {name: "Initial", steps: 1}]

            let scaled: StringIndexed<[number, number]> = {}

            let sy = 0;
            for (let i = 0; i < stCol.length; i++) {
                scaled[stCol[i]] = [10, -(2 + i * 2)];
                sy += -(2 + i * 2)
            }
            sy /= stCol.length
            
            let ty = 0;
            for (let i = 0; i < ndCol.length; i++) {
                scaled[ndCol[i]] = [15, -(2 + i * 2)];
                ty += -(2 + i * 2)
            }
            ty /= ndCol.length;

            let it2: Item<string>[] = this.itemList.map(a => {
                return {origin: a.origin, destination: a.destination, capacity: ''}
            }); 

            let o = stepBuilder(ItemListToStringIndexed(it2), 'grey', {pos: scaled });
            o.stepNothing();

            let it = [...this.itemList];

            for (let i of stCol) {
                it.push({origin: 's', destination: i, capacity: 1});
            }
            for (let i of ndCol) {
                it.push({origin: i, destination: 't', capacity: 1});
            }

            scaled['t'] = [20, ty];
            scaled['s'] = [5, sy];

            let nN = [...nodeNames, 's', 't']
            stepBuilder = stepBuilderBuilder(steps, nN);

            o = stepBuilder(ItemListToStringIndexedNumber(it), 'grey', {pos: scaled});
            o.stepNothing();

            let [sp, chap, _, f] = fordSolver(scaled, it, stepBuilder, nN, chapters, steps);

            stepBuilder = stepBuilderBuilder(sp, nodeNames);

            it = Object.keys(f).filter(a => !a.match(/((s-.*)|(.*-t))/)).map(a => {
                let s = a.split('-');
                return {origin: s[0], destination: s[1], capacity: f[a]}
            }); 

            o = stepBuilder(ItemListToStringIndexed(it), 'green', {pos: scaled});
            o.stepNothing();

            it2 = it.filter(a => a.capacity > 0).map(a => ({...a, capacity: '' })); 
            o = stepBuilder(ItemListToStringIndexed(it2), 'green', {pos: scaled});
            o.stepNothing();

            
            chap.push({name: 'Clean Up', steps: 2});
            this.steps = sp;
            this.chapters = chap;
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
        itemList() {this.calculate()},
        itemListRaw() {
            this.calculate()
        },
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