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
export default Vue.extend({
    data: (): {itemListRaw: ItemRaw[], errorMsg: string | false, steps: string[]} => ({
        itemListRaw: [{origin: "s", destination: "t", capacity: "10"}],
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

            let stepBuilder = (graph: StringIndexed<number>, color: string, {baseStringProp, ignoreZero, prefix, middle}: {baseStringProp?: string, ignoreZero?: boolean, prefix?: string, middle?: string}) => {
                
                let baseString = 'rank=LR; constraint=false;\n';

                let createMiddleArrow = (center:string, origin: string, destination: string, {label, color}: {label?: string, color?: string, shape?: string}) => {
                    let attr = [];
                    if (label) attr.push(`label="${label}"`);
                    if (color) attr.push(`color=${color}`);
                    return `${center} [shape=point, style=invis, width=0, height=0, label=""]\n${origin} -> ${center}[arrowhead=none, headclip=false, ${attr.join(',')}, label=""]\n ${center} -> ${destination} [tailclip=false, constrain=false,${attr.join(',')}]`;
                }

                
                let createArrow = (origin: string, destination: string, {label, color}: {label?: string, color?: string, shape?: string}) => {
                    let attr = [];
                    if (label) attr.push(`label="${label}"`);
                    if (color) attr.push(`color=${color}`);
                    return `${origin} -> ${destination} [${attr.join(',')}]`;
                }
                
                let updateBaseString = (graph: StringIndexed<number>) => baseString += (baseStringProp ? baseStringProp + '\n' : '') +
                    (!prefix ? '' : nodeNames.map(a => `${prefix}${a} [label="${a}"]`).join('\n')) + 
                    Object.keys(graph).map(a => {
                        let s = a.split('-');
                        return ({o: s[0], d: s[1], cap: graph[a]});
                    })
                        .filter(a => !(ignoreZero && a.cap == 0))
                        .map(a => middle ? 
                            createMiddleArrow(`${middle}_${a.o}_${a.d}`, `${prefix ?? ''}${a.o}`, `${prefix ?? ''}${a.d}`, {label: `${a.cap}`, color: color})
                            : createArrow(`${prefix ?? ''}${a.o}`, `${prefix ?? ''}${a.d}`, {label: `${a.cap}`, color: color})
                        )
                        .join('\n');
                
                updateBaseString(graph);

                
                let list: string[] = [];
                let vars: {[key: string]: [string, any]} = {};
                let title: string | null = null;

                let calculated = baseString;

                let stepNothing = () => steps.push(calculated); 

                let getCalculated = () => calculated;

                let addToList = (l: string, step?: boolean) => {
                    list.push(l);
                    recalculate();
                    if (step) stepNothing();
                }
                let popList = (step?: boolean) => {
                    list.pop();
                    recalculate();
                    if (step) stepNothing();
                }

                let removeVar = (name: string) => {
                    delete vars[name];
                    recalculate();
                }
                
                let createVar = (nodeName: string, name: string, value: any) => {
                    vars[nodeName] = [name, value];
                    recalculate();
                }
                
                let setVar = (nodeName: string, value: any) => {
                    if (!vars[nodeName]) return;
                    vars[nodeName][1] = value;
                    recalculate();
                }

                let createVarF = (nName:string, name: string, value: any) => {
                    return `${nName} [shape=record, label="{${name}|${value}}"]`
                }

                let recalculate = () => {
                    calculated = 
                        baseString + "\n" + 
                        list.join("\n") + "\n" + 
                        Object.keys(vars).map(a => createVarF(a, vars[a][0], vars[a][1])).join("\n") + "\n" +
                        (title ? `labelloc="t";\nlabel="${title}";` : '');
                }

                let arrayToList = (s: string[]) => `${s.join('|')}`
                let dicToList = (s: StringIndexed) => `${Object.keys(s).map(a => `${a}: ${s[a]}`).join('|')}`

                let updateTitle = (t: string | null) => {
                    title = t
                    recalculate();
                };

                let stepAction = (action: string) => {
                    steps.push(`${calculated}\n_tempAction [shape=plaintext, label="${action}"]`)
                }

                return {baseString, stepAction, arrayToList, updateBaseString, getCalculated, stepNothing, addToList, popList, createArrow, removeVar, setVar, updateTitle, createVar, createMiddleArrow, dicToList};
            }


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

            let base = stepBuilder(graph, 'GREY', {middle: 'g'});
            let s = base;
            s.updateTitle('Default graph');
            s.stepNothing();

            let search = (): [boolean, StringIndexed] => {
                s.updateTitle('Currently Searching');

                let q = ['s'];
                let visited = new Set(q);
                let parent: StringIndexed = {};
                
                s.createVar('_q', 'Queue', 's');
                s.createVar('_v', 'Visited', 's');
                s.createVar('_parent', 'Parent', '');
                s.addToList(stepBuilder(residualGraph, 'RED', {prefix: 're_', middle: 'rem'}).baseString);

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
                        s.createVar('_item', 'Item', item);
                        s.addToList(s.createArrow(nName, item, {label: 'Searching'}));
                        if (residualGraph[`${nName}-${item}`]) 
                            s.addToList(s.createArrow(nName, `rem_${nName}_${item}`, {label: "Check if > 0"}))
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
                        if (residualGraph[`${nName}-${item}`])
                            s.popList();
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

                return [visited.has('t'), parent];
            }


            let fordFulkerson = () => {

                let max_flow = 0;

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
             		let bottleneck = Number.MAX_VALUE; 
                    s.createVar('_bt', 'Bottleneck', Number.MAX_VALUE);
                    s.stepAction('Update residual graph');
             		for (v='t'; v!='s'; v=parent[v]) { 
             			u = parent[v]; 

                        s.addToList(stepBuilder(flowGraph, 'GREEN', {middle: 'fg'}).baseString);
                        s.addToList(stepBuilder(residualGraph, 'RED', {middle: 'rg'}).baseString);
             			// update residual graph capacities of the edges and reverse edges along the path 
                        
                        s.createVar('_temp', 'Temp', (graph[`${u}-${v}`] ?? 0) - (flowGraph[`${u}-${v}`] ?? 0));
                        if (graph[`${u}-${v}`])
                            s.addToList(s.createArrow(`g_${u}_${v}`, '_temp', {label: '+'}));
                        if (flowGraph[`${u}-${v}`])
                            s.addToList(s.createArrow(`fg_${u}_${v}`, '_temp', {label: '-'}));
                        s.addToList(s.createArrow('_temp', `rg_${u}_${v}`, {}), true);
             			residualGraph[`${u}-${v}`] = (graph[`${u}-${v}`] ?? 0) - (flowGraph[`${u}-${v}`] ?? 0); // forward edge
             			residualGraph[`${v}-${u}`] = flowGraph[`${u}-${v}`] ?? 0; 			// forward edge
                        if (graph[`${u}-${v}`])
                            s.popList();
                        if (flowGraph[`${u}-${v}`])
                            s.popList();
                        s.popList();
                        s.popList();
                        s.popList();
                        s.removeVar('_temp')

                        s.addToList(stepBuilder(residualGraph, 'RED', {middle: 'rg'}).baseString, true);
                        s.addToList(stepBuilder(flowGraph, 'GREEN', {middle: 'fg'}).baseString, true);
                        if (flowGraph[`${u}-${v}`]) {
                            s.addToList(s.createArrow(`fg_${u}_${v}`, `rg_${v}_${u}`, {}), true);
                        } else {
                            s.createVar('_temp', 'Temp', 0);
                            s.addToList(s.createArrow('_temp', `rf_${u}_${v}`, {}), true);
                        }
                        s.popList();
                        s.removeVar('_temp');

                        s.addToList(s.createArrow('_bt', '_bt', {label: 'min'}));
                        s.addToList(s.createArrow(`rg_${u}_${v}`, '_bt', {label: 'min'}), true);

             			bottleneck = Math.min(bottleneck, residualGraph[`${u}-${v}`]); 	// find bottleneck, edge with minimum residual capacity across the edges of the path

                        s.setVar('_bt', bottleneck);
                        s.popList();
                        s.popList(true);

                        s.popList();
                        s.popList();
             		}
                     
                    s.stepAction('Update Flow graph')
             		// update flow based on calculated bottleneck and residual graph from the previous loop 
             		for (v='t'; v != 's'; v=parent[v]) { 
                        s.addToList(stepBuilder(flowGraph, 'GREEN', {middle: 'fg'}).baseString);
             			u = parent[v]; 

                        s.addToList(s.createArrow(u, `g_${u}_${v}`, {label: 'Check if > 0'}), true);
                        s.popList();


                        let st = "";
             			if (graph[`${u}-${v}`] > 0) {
             				flowGraph[`${u}-${v}`] = (flowGraph[`${u}-${v}`] ?? 0) + bottleneck; 
                            st = s.createArrow('_bt', `fg_${u}_${v}`, {label: '+'});
                        } else {
             				flowGraph[`${u}-${v}`] = (flowGraph[`${u}-${v}`] ?? 0) - bottleneck;
                            st = s.createArrow('_bt', `fg_${u}_${v}`, {label: '-'});
                        }											// backward edge

                        s.popList();
                        s.addToList(stepBuilder(flowGraph, 'GREEN', {middle: 'fg'}).baseString);
                        s.addToList(st, true);
                        s.popList()
                        s.popList();
             		} 

                    max_flow += bottleneck;
                    
                    [b, parent] = search();
                    
                    s.updateTitle('Current step: Ford Fulkerson');
                    s.stepAction('Check if search found \\"t\\"');
                }

                return max_flow;
            }

            fordFulkerson();

            s = stepBuilder(flowGraph, 'green', {});
            s.updateTitle('Result');
            s.addToList(stepBuilder(graph, 'grey', {}).baseString, true);

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