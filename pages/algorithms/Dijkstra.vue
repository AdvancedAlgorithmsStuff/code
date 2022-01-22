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
                    Length
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
        <button @click="addItem">Add Item</button>
        <button @click="removeItem">Remove Item</button>

        <transition name="fade">
            <div v-if="this.errorMsg">
                {{this.errorMsg}}
            </div>
            <div v-else>
                <PlaybackControls :max="this.steps.length - 1" @playbackProgress="this.renderDiagramStep" />
                <div ref="diagram" />
            </div>
        </transition>
    </div>

</template>

<script lang="ts">

interface ItemRaw {
    origin: string,
    destination: string,
    capacity: string,
};

interface Item {
    origin: string,
    destination: string,
    capacity: number,
};

type StringIndexed<T = string> = {[key: string]: T}

import Vue from 'vue'

import {stepBuilderBuilder} from '../../lib/GraphTools';
export default Vue.extend({
    data: (): {itemListRaw: ItemRaw[], errorMsg: string | false, steps: string[]} => ({
        itemListRaw: [
            {origin: "s", destination: "2", capacity: "9"},
            {origin: "s", destination: "7", capacity: "15"},
            {origin: "s", destination: "6", capacity: "14"},
            {origin: "2", destination: "3", capacity: "24"},
            {origin: "3", destination: "t", capacity: "19"},
            {origin: "6", destination: "3", capacity: "18"},
            {origin: "6", destination: "5", capacity: "30"},
            {origin: "6", destination: "7", capacity: "5"},
            {origin: "7", destination: "t", capacity: "44"},
            {origin: "7", destination: "5", capacity: "20"},
            {origin: "5", destination: "t", capacity: "16"},
            {origin: "5", destination: "4", capacity: "11"},
            {origin: "4", destination: "t", capacity: "6"},
            {origin: "4", destination: "3", capacity: "6"},
            {origin: "3", destination: "5", capacity: "2"},
        ],
        errorMsg: false,
        steps: [],
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
                await (this as any).$renderDiagram(this.steps[step], {
                    parentElement: this.$refs.diagram,
                    replaceContents: true
                });
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

            let nodeNamesS: Set<string> = new Set();
            let depGraph: StringIndexed<Set<string>> = {};
            let originGraph: StringIndexed<Set<string>> = {};

            for (let conn of this.itemList) {
                nodeNamesS.add(conn.origin);
                nodeNamesS.add(conn.destination);
                if (conn.origin == null || conn.destination == null) return;
                if (originGraph[conn.origin]) {
                    originGraph[conn.origin].add(conn.destination);
                } else {
                    originGraph[conn.origin] = new Set([conn.destination]);
                }
                if (depGraph[conn.destination]) {
                    depGraph[conn.destination].add(conn.origin);
                } else {
                    depGraph[conn.destination] = new Set([conn.origin]);
                }
            }

            if (!nodeNamesS.has('t') || !nodeNamesS.has('s')) {
                this.errorMsg = 'A s and t node are needed';
                return;
            }
            
            let nodeNames = Array.from(nodeNamesS);
            nodeNames.sort();

            let nodeValues: StringIndexed<number> = {};
            nodeNames.forEach(a => nodeValues[a] = Number.MAX_VALUE);
            nodeValues['s'] = 0;

            let steps: string[] = [];

            let stepBuilder = stepBuilderBuilder(steps, nodeNames);

            // Create a residual graph and fill the residual graph 
            // with given capacities in the original graph as 
            // residual capacities in residual graph 
            let graph: StringIndexed<number> = {};
            for(let item of this.itemList) {
                graph[`${item.origin}-${item.destination}`] = item.capacity;
            }

            let s =  stepBuilder(graph, 'black', {extra: nodeValues});
            s.updateTitle('Origin graph');

            let current = 's';
            let selected = ['s'];
            let options: Set<[string , string]> = new Set();
            s.createVar('_current', 'Current', 's');
            s.createVar('_selected', 'Selected', 's');
            s.createVar('_options', 'Options', '');
            s.stepNothing();
            while (true) {
                
                //Set colors
                for (let d of originGraph[current]) {
                    if (!selected.includes(d)) {
                        s.setColor(`${current}_${d}`, 'red');
                        options.add([current, d]);
                    }
                }
                let a = Array.from(options);
                a.sort((a, b) => graph[`${a[0]}-${a[1]}`] - graph[`${b[0]}-${b[1]}`]);

                s.setVar('_options', s.arrayToList(a.map(a => `${a[0]} to ${a[1]}`)));
                s.stepNothing();

                while (true) {
                    let [b, ...a1] = a;
                    a = a1;
                    s.setColor(`${b[0]}_${b[1]}`, 'green');

                    if (nodeValues[b[0]] + graph[`${b[0]}-${b[1]}`] <  nodeValues[b[1]]) {
                        nodeValues[b[1]] = nodeValues[b[0]] + graph[`${b[0]}-${b[1]}`]
                    }
                    s.updateExtra(nodeValues);
                    s.stepAction('Update value')

                    if (selected.includes(b[1])) {
                        if (a.length == 0) {
                            s.stepAction('No Solution found');
                            this.steps = steps;
                            return;
                        } else {
                            s.stepAction('Continue checking');
                        }
                    } else {
                        selected.push(b[1]);
                        current = b[1];
                        s.setVar('_selected', s.arrayToList(selected))
                        s.addToList(s.createArrow('_options', '_current', {label: `Set ${current} as current`}), true);
                        s.addToList(s.createArrow('_options', '_selected', {label: `Add ${current} to selected`}), true);
                        s.popList();
                        s.popList();
                        break
                    }
                }

                if (current == 't') {
                    s.stepAction('Solution found!');
                    break;
                }
            }


            current = "t";
            while (true) {

                if (current == "s") break;
                
                //Set colors
                for (let d of depGraph[current]) {
                    if (selected.includes(d)) {
                        s.setColor(`${current}_${d}`, 'red');
                        options.add([current, d]);
                    }
                }
                let a = Array.from(options);
                a.sort((a, b) => graph[`${a[0]}-${a[1]}`] - graph[`${b[0]}-${b[1]}`]);
                
                s.setVar('_options', s.arrayToList(a.map(a => `${a[0]} to ${a[1]}`)));
                s.stepNothing();

                while (true) {
                    let [b, ...a1] = a;
                    a = a1;
                    s.setColor(`${b[0]}_${b[1]}`, 'green');

                    if (nodeValues[b[0]] + graph[`${b[0]}-${b[1]}`] <  nodeValues[b[1]]) {
                        nodeValues[b[1]] = nodeValues[b[0]] + graph[`${b[0]}-${b[1]}`]
                    }
                    s.updateExtra(nodeValues);
                    s.stepAction('Update value')

                    if (selected.includes(b[1])) {
                        if (a.length == 0) {
                            s.stepAction('No Solution found');
                            this.steps = steps;
                            return;
                        } else {
                            s.stepAction('Continue checking');
                        }
                    } else {
                        selected.push(b[1]);
                        current = b[1];
                        s.setVar('_selected', s.arrayToList(selected))
                        s.addToList(s.createArrow('_options', '_current', {label: `Set ${current} as current`}), true);
                        s.addToList(s.createArrow('_options', '_selected', {label: `Add ${current} to selected`}), true);
                        s.popList();
                        s.popList();
                        break
                    }
                }

                if (current == 't') {
                    s.stepAction('Solution found!');
                    break;
                }
            }



            this.steps = steps;
        }
    },
    computed: {
        itemList(): Item[] {
            return this.itemListRaw
                .map(a => ({origin: a.origin.trim(), destination: a.destination.trim(), capacity: Number(a.capacity)}))
                .filter(a => a.origin && a.destination && !isNaN(a.capacity));
        }
    },
    watch: {
        itemList() {this.calculate()}
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