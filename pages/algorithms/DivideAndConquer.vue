<template>

    <div>

        <center>
            <br>
            <h2>Divide and Conquer</h2>
            <br>

            <div id="controls">
                <p>
                    Enter list to sort:
                    <input v-model="rawList" type="text" value="">
                </p>
                <p>
                    Choose algorithm:
                    <select v-model="algorithm" pr="12">
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">QuickSort</option>
                        <option value="minMax">MinMax</option>
                        <option value="countingInversions">Counting Inversions</option>
                    </select>
                </p>
            </div>
        </center>

        <br>

        <transition name="fade">
            <div v-if="maxPlaybackStep > 0">
                <center>
                    <PlaybackControls :max="maxPlaybackStep" @playbackProgress="renderDiagramStep" />
                </center>
            </div>
            <div v-else>
                <pre>Please enter some values!</pre>
            </div>
        </transition>

        <div v-if="maxPlaybackStep > 0">
            <center>
                    <div ref="diagram" />
            </center>
        </div>

    </div>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: "DivideAndConquerPage",

    head: () => ({
        title: "Divide and Conquer"
    }),
    
    data: () => ({
        algorithm: 'mergeSort',
        rawList: '1,2,3,4,5,6',

        playbackSteps: undefined as undefined | string[]
    }),

    computed: {
        /**
         * The sanitized list.
         */
        list () : number[] {
            return this.rawList.split(',')
                .filter(entry => entry.trim().length > 0)
                .map(entry => Number(entry.trim()))
                .filter(entry => !isNaN(entry));
        },

        /**
         * Combine algorithm and list to allow watching both with a watcher.
         */
        algorithmAndList () : any {
            return { algorithm: this.algorithm, list: (this as any).list }
        },

        maxPlaybackStep () {
            if (!this.playbackSteps) return 0;
            return this.playbackSteps!.length - 1;
        }
    },

    watch: {
        /**
         * When the algorithm OR list change, call renderAlgorithm
         * to re-render the graph.
         */
        algorithmAndList () {
            (this as any).renderAlgorithm();
        }
    },

    mounted () {
        this.$nextTick(() => {
            (this as any).renderAlgorithm();
        });
    },

    methods: {

        async renderAlgorithm() : Promise<void> {
            this.playbackSteps = undefined;
            let list = (this as any).list;

            if (list.length < 1) return;

            let diagramSteps;
            let diagram;

            switch (this.algorithm) {
                case 'mergeSort': {
                    diagramSteps = (this as any).mergeSort(list);
                    break;
                }
                
                case 'quickSort': {
                    diagramSteps = (this as any).quickSort(list);
                    break;
                }

                case 'minMax': {
                    diagramSteps = (this as any).minMax(list);
                    break;
                }
                case 'countingInversions': {
                    diagramSteps = (this as any).countingInversions(list);
                    break;
                }

                default: {
                    (this as any).$renderText(`Unspecified algorithm: ${this.algorithm}`, {
                        parentElement: this.$refs.diagram,
                        replaceContents: true
                    });
                    return;
                }
            }

            if (!diagramSteps) {
                await (this as any).$renderDiagram(diagram, {
                    parentElement: this.$refs.diagram,
                    replaceContents: true
                });
                return;
            }

            this.playbackSteps = diagramSteps;
            await (this as any).renderDiagramStep((this as any).maxPlaybackStep);
        },

        async renderDiagramStep (step: number) {
            await (this as any).$renderDiagram((this as any).playbackSteps[step], {
                parentElement: this.$refs.diagram,
                replaceContents: true
            });
        },

        mergeSort (list: number[]) {
            let diagString = "node [shape=record];\n";

            let steps: string[] = [];

            let step = 0;
            const mergeSortF = (l: number[], id = 'a', idPar?: string) => {
                if (l.length <= 1) {
                    diagString += `${id}r [label="${l.join(' | ')}"];\n`
                    if (idPar) diagString += `${idPar} -> ${id}r [label="${step}"]\n`
                    steps.push(diagString);
                    return;
                }

                diagString += `${id} [label="${l.join(' | ')}"];\n`
                if (idPar) diagString += `${idPar} -> ${id} [label="${step}"]\n`
                steps.push(diagString);

                //Split the list
                let mid = Math.floor(l.length / 2);
                let l1 = l.slice(0, mid);
                let l2 = l.slice(mid);

                step++;
                mergeSortF(l1, `${id}1`, id);
                step++;
                mergeSortF(l2, `${id}2`, id);

                let i = 0;
                let p1 = 0;
                let p2 = 0;

                while (p1 < l1.length || p2 < l2.length) {
                    let n1 = null;
                    let n2 = null;
                    if (p1 < l1.length) n1 = l1[p1];
                    if (p2 < l2.length) n2 = l2[p2];

                    if (n1 == null) {
                        (l as any)[i] = n2;
                        p2++;
                    } else if (n2 == null) {
                        l[i] = n1;
                        p1++;
                    } else if (n2 > n1) {
                        l[i] = n1;
                        p1++;
                    } else {
                        l[i] = n2;
                        p2++;
                    }
                    i++;
                }

                step++;
                diagString += `${id}r [label="${l.join(' | ')}"];\n`
                diagString += `${id + "1"}r -> ${id}r [label="${step}"];\n`
                diagString += `${id + "2"}r -> ${id}r [label="${step}"];\n`
                steps.push(diagString);
                
                return id;
            }

            mergeSortF([...list]);
            return steps;
        },

        quickSort (list: number[]) {
            let diagString = "node [shape=record];\n";

            let step = 0;
            let steps: string[] = [];

            const quickSortF = (l: number[], id = 'a', idPar ="") => {
                if (l.length == 0) return [];

                if (l.length <= 1) {
                    diagString += `${id}r [label="${l.join(' | ')}"];\n`
                    if (idPar) diagString += `${idPar} -> ${id}r [label="${step}"]\n`
                    steps.push(diagString);
                    return [l[0]];
                }

                //Split the list
                let f = l[0];
                let l1 = [];
                let l2 = [];

                for (let i = 1; i < l.length; i++) {
                    if (f > l[i]) {
                        l1.push(l[i]);
                    } else {
                        l2.push(l[i]);
                    }
                }

                diagString += `${id} [label="${l.join(' | ')}"];\n`
                diagString += `${id}m [fillcolor=green, style="filled", label="${f}"];\n`
                diagString += `${id} -> ${id}m [color=green]\n`
                if (idPar) diagString += `${idPar} -> ${id} [label="${step}"]\n`
                steps.push(diagString);

                step++;
                let l1t = quickSortF(l1, id + "1", id);
                if (l1t.length == 0) {
                    step--;
                }
                let s2 = step;
                step++;
                let l2t = quickSortF(l2, id + "2", id);
                if (l2t.length == 0) {
                    step--;
                }

                l1 = l1t;
                l2 = l2t;



                l = [...l1, f, ...l2];

                step++;
                diagString += `${id}r [label="${l.join(' | ')}"];\n`
                diagString += `${id}m -> ${id}r[color=green label="${step}"]\n`;
                if (l1.length != 0) {
                    diagString += `${id + "1"}r -> ${id}r [label=${step}];\n`
                }
                if (l2.length != 0) {
                    diagString += `${id + "2"}r -> ${id}r [label=${step}];\n`
                }
                steps.push(diagString);
                
                return l;
            }

            quickSortF([...list]);
            return steps;
        },

        minMax (list: number[]) {
            let diagString = "node [shape=record];\n";

            let step = 0;
            let steps: string[] = [];

            const minmaxF = (l: number[], id = 'a', idPar = "") => {
                
                if (l.length <= 1) {
                    diagString += `${id}r [label="${l.join(' | ')}"];\n`
                    if (idPar) diagString += `${idPar} -> ${id}r [label="${step}"]\n`
                    steps.push(diagString);
                    return [l[0], l[0]];
                }

                diagString += `${id} [label="${l.join(' | ')}"];\n`
                if (idPar) diagString += `${idPar} -> ${id} [label="${step}"]\n`
                steps.push(diagString);

                //Split the list
                let mid = Math.floor(l.length / 2);
                let l1 = l.slice(0, mid);
                let l2 = l.slice(mid);
                
                step++;
                let v1 = minmaxF(l1, id + "1", id);
                step++;
                let v2 = minmaxF(l2, id + "2", id);

                l = [v1[0] > v2[0] ? v2[0] : v1[0], v1[1] > v2[1] ? v1[1] : v2[1]];
            
                step++;
                diagString += `${id}r [label="${l.join(' | ')}"];\n`
                diagString += `${id + "1"}r -> ${id}r [label="${step}"];\n`
                diagString += `${id + "2"}r -> ${id}r [label="${step}"];\n`
                steps.push(diagString);
                
                return [l[0], l[1]];
            }

            minmaxF([...list]);

            return steps;
        },

        countingInversions (list: number[]) {
            let diagString = "node [shape=record];\n";

            let step = 0;
            let steps: string[] = [];

            const countingInversionsF = (l: number[], id = 'a', idPar = ""): [number, number[]] => {
                
                if (l.length <= 1) {
                    diagString += `${id}r [label="${l.join(' | ')}"];\n`
                    if (idPar) diagString += `${idPar} -> ${id}r [label="${step}"]\n`
                    steps.push(diagString);
                    return [0, l];
                }

                diagString += `${id} [label="${l.join(' | ')}"];\n`
                if (idPar) diagString += `${idPar} -> ${id} [label="${step}"]\n`
                steps.push(diagString);

                //Split the list
                let mid = Math.floor(l.length / 2);
                let l1 = l.slice(0, mid);
                let l2 = l.slice(mid);

                step++;
                let [inv1, l1t] = countingInversionsF(l1, `${id}1`, id);
                l1 = l1t;
                step++;
                let [inv2, l2t] = countingInversionsF(l2, `${id}2`, id);
                l2 = l2t;

                let i = 0;
                let ic = l1.length;
                let p1 = 0;
                let p2 = 0;

                let inv = 0;

                while (p1 < l1.length || p2 < l2.length) {
                    let n1 = null;
                    let n2 = null;
                    if (p1 < l1.length) n1 = l1[p1];
                    if (p2 < l2.length) n2 = l2[p2];

                    if (n1 == null) {
                        (l as any)[i] = n2;
                        p2++;
                    } else if (n2 == null) {
                        l[i] = n1;
                        p1++;
                    } else if (n2 >= n1) {
                        l[i] = n1;
                        ic--;
                        p1++;
                    } else {
                        l[i] = n2;
                        inv += ic;
                        p2++;
                    }
                    i++;
                }

                step++;
                diagString += `${id}r [label="{ {${l.join(' | ')} }|${inv1}(L) + ${inv} + ${inv2}(R) = ${inv1 + inv + inv2}}"];\n`
                diagString += `${id + "1"}r -> ${id}r [label="${step}"];\n`
                diagString += `${id + "2"}r -> ${id}r [label="${step}"];\n`
                steps.push(diagString);
                
                return [inv + inv1 + inv2, l];
            }

            countingInversionsF([...list]);
            return steps;
        },

    }
});
</script>
