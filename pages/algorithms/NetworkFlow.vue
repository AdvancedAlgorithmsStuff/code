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
        
        {{!!this.errorMsg}}
        <transition name="fade">
            <div v-if="this.errorMsg">
                {{this.errorMsg}}
            </div>
            <div v-else>
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
import { nextTick } from 'vue/types/umd';
export default Vue.extend({
    data: (): {itemListRaw: ItemRaw[], errorMsg: string | false} => ({
        itemListRaw: [],
        errorMsg: false,
    }),
    methods: {
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

            let diagString = "";

            let depGraph: {[key: string]: Set<string>} = {};
            let originGraph: {[key: string]: Set<string>} = {};
            let nodeNamesS: Set<string> = new Set();

            for (let conn of this.itemList) {
                nodeNamesS.add(conn.origin);
                nodeNamesS.add(conn.destination);
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


            let search = (): [boolean, StringIndexed] => {
                
                let q = ['s'];
                let visited = new Set(q);
                let parent: StringIndexed = {};

                // Standard BFS Loop  
                while (q.length !== 0) { 
                    let [nName, ...q1] = q;
                    q = q1;
                    for (let item of nodeNames) { 
                        if (residualGraph[`${nName}-${item}`] > 0 && visited.has(item)) { 
                            q.push(item); 
                            visited.add(item);
                            parent[item] = nName; 
                        } 
                    } 
                } 

                return [visited.has('t'), parent];
            }

            let fordFulkerson = () => {

                let max_flow = 0;

                let [b, parent] = search();

                let [v, u] = ['', ''];

                // Augment the flow while there is path from source 
                // to sink 
                while(b) {
             		// Find minimum residual capacity of the edges 
             		// along the path filled by BFS. Or we can say 
             		// find the maximum flow through the path found. 
             		let bottleneck = Number.MAX_VALUE; 
             		for (v='t'; v!='s'; v=parent[v]) { 
             			u = parent[v]; 
             			// update residual graph capacities of the edges and reverse edges along the path 
             			residualGraph[`${u}-${v}`] = graph[`${u}-${v}`] - flowGraph[`${u}-${v}`]; 			// forward edge
             			residualGraph[`${u}-${v}`] = flowGraph[`${u}-${v}`]; 			// forward edge
             			bottleneck = Math.min(bottleneck, residualGraph[`${u}-${v}`]); 	// find bottleneck, edge with minimum residual capacity across the edges of the path
             		}
                     
                     
             		// update flow based on calculated bottleneck and residual graph from the previous loop 
             		for (v='t'; v != 's'; v=parent[v]) { 
             			u = parent[v]; 
             			if (flowGraph[`${u}-${v}`] > 0) 							// forward edge
             				flowGraph[`${u}-${v}`] += bottleneck; 
             			else											// backward edge
             				flowGraph[`${u}-${v}`] -= bottleneck;
             		} 
                }

            }


            // int[][] fordFulkerson(int graph[][], int s, int t) { 
            // 	int u, v; 


            // 	while (bfs(this.rGraph, s, t, parent))  { 


            // 		// Add path flow to overall flow 
            // 		max_flow += bottleneck; 
            // 	} 
                
            // 	// printing the min cut using the max flow found
            // 	printMinCut(rGraph, graph, s, t, max_flow);
            // 	// Return the overall flow 
            // 	return flow; 
            // } 

            
            diagString += this.itemList
                .map(a => `${a.origin} -> ${a.destination} [label="${a.capacity}"]`).join('\n');

            console.log(diagString,);
            
            this.$nextTick(async () => {
                await (this as any).$renderDiagram(diagString, {
                    parentElement: this.$refs.diagram,
                    replaceContents: true
                });
            });
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