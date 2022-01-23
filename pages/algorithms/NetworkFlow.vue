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

import {StringIndexed, stepBuilderBuilder} from '../../lib/GraphTools';

import Vue from 'vue'
import { PlaybackChapter } from '~/components/ChapterPlaybackControls.vue';
export default Vue.extend({
    data: (): {itemListRaw: ItemRaw[], errorMsg: string | false, steps: string[], chapters: PlaybackChapter[], smart: string} => ({
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

            for (let conn of this.itemList) {
                nodeNamesS.add(conn.origin);
                nodeNamesS.add(conn.destination);
            }

            if (!nodeNamesS.has('t') || !nodeNamesS.has('s')) {
                this.errorMsg = 'A s and t node are needed';
                return;
            }
            
            let nodeNames = Array.from(nodeNamesS);
            nodeNames.sort();

            let steps: string[] = [];

            let stepBuilder = stepBuilderBuilder(steps, nodeNames);


            let chapters: PlaybackChapter[] = [{name: "Initial", steps: 1}]

            // Create a residual graph and fill the residual graph 
            // with given capacities in the original graph as 
            // residual capacities in residual graph 
            let residualGraph: StringIndexed<number> = {};
            let flowGraph: StringIndexed<number> = {};
            let graph: StringIndexed<number> = {};
            for(let item of this.itemList) {
                residualGraph[`${item.origin}-${item.destination}`] = item.capacity;
                flowGraph[`${item.origin}-${item.destination}`] = 0;
                graph[`${item.origin}-${item.destination}`] = item.capacity;
            }

            let base = stepBuilder(graph, 'GREY', {middle: 'gm', rankdir: 'LR'});
            let residual = stepBuilder(residualGraph, 'RED', {middle: 'rm', ignoreZero: true, prefix: 'm'});
            let flow = stepBuilder(flowGraph, 'green', {middle: 'fm'});
            let s = base;
            s.updateTitle('Default graph');
            s.stepNothing();
            s.linkGraph('residual', residual);
            s.linkGraph('flow', flow);

            let search = (): [boolean, StringIndexed] => {
                s.updateTitle('Currently Searching');

                let q = ['s'];
                let visited = new Set(q);
                let parent: StringIndexed = {};
                
                s.createVar('_q', 'Queue', 's');
                s.createVar('_v', 'Visited', 's');
                s.createVar('_parent', 'Parent', '');

                // Standard BFS Loop  
                s.stepAction('Check if the Queue is not empty');
                while (q.length !== 0) { 
                    let [nName, ...q1] = q;
                    q = q1;
                    s.createVar('_top', 'Value', nName);
                    s.setVar('_q', s.arrayToList(q));
                    s.addToList(s.createArrow('_q', '_top', {}), true)
                    s.popList();
                    for (let item of nodeNames) {
                        if (!graph[`${nName}-${item}`]) continue
                        s.createVar('_item', 'Item', item);
                        s.addToList(s.createArrow(nName, item, {label: 'Searching'}));
                        if (residualGraph[`${nName}-${item}`]) {
                            residual.addMiddle(`${nName}_${item}`);
                            s.addToList(s.createArrow(nName, `rm_${nName}_${item}`, {label: "Check if > 0"}))
                        }
                        s.addToList(s.createArrow(item, '_v', {label: "Check if visited"}), true)
                        if (residualGraph[`${nName}-${item}`] > 0 && !visited.has(item)) { 
                            q.push(item); 
                            s.setVar('_q', s.arrayToList(q));
                            visited.add(item);
                            s.setVar('_v', s.arrayToList(Array.from(visited)));
                            parent[item] = nName; 
                            s.setVar('_parent', s.dicToList(parent));
                        } 
                        s.popList();
                        if (residualGraph[`${nName}-${item}`]) {
                            s.popList();
                            residual.removeMiddle(`${nName}_${item}`);
                        }
                        s.popList(true);
                    } 
                    s.removeVar('_item');
                    s.stepAction('Check if the Queue is not empty');
                } 
                
                //Clean up graph
                s.popList();
                s.removeVar('_v');
                s.removeVar('_q');

                s.createVar('_b', 'Search reached \\"t\\"', visited.has('t'));

                chapters.push({name: 'Search', steps: steps.length - chapters.map(a=> a.steps).reduce((a,b)=>a+b)})
                return [visited.has('t'), parent];
            }


            let fordFulkerson = () => {

                let max_flow = 0;

                s.createVar('_mxFlow', 'Max Flow', max_flow);

                let [b, parent] = search();
                s.updateTitle('Current step: Ford Fulkerson');

                let [v, u] = ['', ''];

                console.log(b, parent);

                // Augment the flow while there is path from source 
                // to sink 

                s.stepAction('Check if search found \\"t\\"');
                while(b ) {
             		// Find minimum residual capacity of the edges 
             		// along the path filled by BFS. Or we can say 
             		// find the maximum flow through the path found. 
             		let bottleneck = Number.POSITIVE_INFINITY; 
                    s.createVar('_bt', 'Bottleneck', Number.MAX_VALUE);
                    s.stepAction('Update residual graph');
             		for (v='t'; v!='s'; v=parent[v]) { 
             			u = parent[v]; 
             			// update residual graph capacities of the edges and reverse edges along the path 
                        
                        s.createVar('_temp', 'Temp', (graph[`${u}-${v}`] ?? 0) - (flowGraph[`${u}-${v}`] ?? 0));
                        if (graph[`${u}-${v}`]) {
                            s.addMiddle(`${u}_${v}`)
                            s.addToList(s.createArrow(`gm_${u}_${v}`, '_temp', {label: '+'}));
                        }
                        if (flowGraph[`${u}-${v}`]) {
                            flow.addMiddle(`${u}_${v}`)
                            s.addToList(s.createArrow(`fm_${u}_${v}`, '_temp', {label: '-'}));
                        }
                        residual.addMiddle(`${u}_${v}`)
                        s.addToList(s.createArrow('_temp', `rm_${u}_${v}`, {}), true);
             			residualGraph[`${u}-${v}`] = (graph[`${u}-${v}`] ?? 0) - (flowGraph[`${u}-${v}`] ?? 0); // forward edge
             			residualGraph[`${v}-${u}`] = flowGraph[`${u}-${v}`] ?? 0; 			// forward edge
                        residual.removeMiddle(`${u}_${v}`)
                        if (graph[`${u}-${v}`]) {
                            s.popList();
                            s.removeMiddle(`${u}_${v}`)
                        }
                        if (flowGraph[`${u}-${v}`]) {
                            s.popList();
                            flow.removeMiddle(`${u}_${v}`)
                        }
                        s.popList();
                        s.removeVar('_temp')

                        residual.updateGraph(residualGraph);
                        flow.updateGraph(flowGraph);
                        if (flowGraph[`${u}-${v}`]) {
                            residual.addMiddle(`${v}_${u}`)
                            flow.addMiddle(`${u}_${v}`)
                            s.addToList(s.createArrow(`fm_${u}_${v}`, `rm_${v}_${u}`, {}), true);
                            residual.removeMiddle(`${v}_${u}`)
                            flow.removeMiddle(`${u}_${v}`)
                        } else {
                            s.createVar('_temp', 'Temp', 0);
                            residual.addMiddle(`${u}_${v}`)
                            s.addToList(s.createArrow('_temp', `rm_${u}_${v}`, {}), true);
                            residual.removeMiddle(`${v}_${u}`)
                        }
                        s.popList();
                        s.removeVar('_temp');

                        s.addToList(s.createArrow('_bt', '_bt', {label: 'min'}));
                        residual.addMiddle(`${u}_${v}`)
                        s.addToList(s.createArrow(`rm_${u}_${v}`, '_bt', {label: 'min'}), true);
                        residual.removeMiddle(`${u}_${v}`)

             			bottleneck = Math.min(bottleneck, residualGraph[`${u}-${v}`]); 	// find bottleneck, edge with minimum residual capacity across the edges of the path

                        s.setVar('_bt', bottleneck);
                        s.popList();
                        s.popList(true);
             		}
                     
                    s.stepAction('Update Flow graph')
             		// update flow based on calculated bottleneck and residual graph from the previous loop 
             		for (v='t'; v != 's'; v=parent[v]) { 
                        //s.addToList(stepBuilder(flowGraph, 'GREEN', {middle: 'fg'}).baseString);
             			u = parent[v]; 

                        s.addMiddle(`${u}_${v}`)
                        s.addToList(s.createArrow(u, `gm_${u}_${v}`, {label: 'Check if > 0'}), true);
                        s.removeMiddle(`${u}_${v}`)
                        s.popList();


                        let st = "";
                        flow.addMiddle(`${u}_${v}`)
             			if (graph[`${u}-${v}`] > 0) {
             				flowGraph[`${u}-${v}`] = (flowGraph[`${u}-${v}`] ?? 0) + bottleneck; 
                            st = s.createArrow('_bt', `fm_${u}_${v}`, {label: '+'});
                        } else {
             				flowGraph[`${u}-${v}`] = (flowGraph[`${u}-${v}`] ?? 0) - bottleneck;
                            st = s.createArrow('_bt', `fm_${u}_${v}`, {label: '-'});
                        }											// backward edge

                        flow.updateGraph(flowGraph);
                        s.addToList(st, true);
                        flow.removeMiddle(`${u}_${v}`)
                        s.popList();
             		} 

                    max_flow += bottleneck;
                    s.setVar('_mxFlow', max_flow);
                    

                    
                    chapters.push({name: 'Ford Fulkerson', steps: steps.length - chapters.map(a=> a.steps).reduce((a,b)=>a+b) });
                    [b, parent] = search();
                    
                    s.updateTitle('Current step: Ford Fulkerson');
                    s.stepAction('Check if search found \\"t\\"');
                }

                return max_flow;
            }

            let maxF = fordFulkerson();

            //s = stepBuilder(flowGraph, 'green', {});
            s.dropVars();
            s.createVar('_mx', 'Max Flow', maxF);
            s.removeLinkGraph('residual');
            s.updateTitle('Result');
            s.stepNothing();
            chapters.push({name: 'Result', steps: 1 });
            console.log(chapters);
            //s.addToList(stepBuilder(graph, 'grey', {}).baseString, true);

            this.steps = steps;
            this.chapters = chapters;
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