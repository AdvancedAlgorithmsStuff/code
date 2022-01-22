<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th colspan="2">Items</th>
                </tr>
                <tr>
                    <th>Value</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in this.itemListRaw" :key="key">
                    <td>
                        <input type="number" v-model="item[0]"/>
                    </td>
                    <td>
                        <input type="number" v-model="item[1]"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table>
            <thead>
                <tr>
                    <th colspan="3">Sorted items</th>
                </tr>
                <tr>
                    <th>Item number</th>
                    <th>Value</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in this.itemList" :key="key">
                    <td>
                        {{key + 1}}
                    </td>
                    <td>
                        {{item[0]}}
                    </td>
                    <td>
                        {{item[1]}}
                    </td>
                </tr>
            </tbody>
        </table>
        
        <p>
            <button @click="this.addItem">Add Item</button>
            <button @click="this.removeItem">Remove Item</button>
        </p>

        <p>
            <label for="bottom-up">
                Bottom Up?
            </label>
            <input id="bottom-up" type="checkbox" v-model="bottUp">
        </p>
        <p>
            <label for="max-w">
                Max Weight
            </label>
            <input id="max-w" type="number" v-model="maxWeightRaw">
        </p>

        <br>
        
        <transition name="fade">
            <div v-if="this.chapter1Length > 0">
                <ChapterPlaybackControls
                    @playbackProgress="renderCurrentStep"
                    :chapters="[{ name: 'Building Matrix', steps: this.chapter1Length }, { name: 'Finding Optimal Solution', steps: this.steps.length - this.chapter1Length - 1 }]" />
                <br><br>
                
                <div ref="diagram" />
            </div>
            <div v-else>
                <pre>Please enter some values!</pre>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'KnapsackPage',
    
    data: (): {itemListRaw: string[][], bottUp: number, m: number[][], maxWeightRaw: number, steps: string[], chapter1Length: number} => ({
        itemListRaw: [["5","1"],["10","1"],["12","5"],["12","6"]],
        bottUp:1,
        maxWeightRaw: 3,
        m: [],

        steps: [],
        chapter1Length: 0
    }),

    watch: {
        itemList() {this.calculate(); },
        maxWeight() { this.calculate(); },
        bottUp() { this.calculate(); }
    },
    
    computed: {
        itemList() {
            let s = this.itemListRaw.map(a => a.map(a => Number(a)));
            s.sort((a, b) => a[1] - b[1]);
            return s;
        },
        maxWeight() {
            return Number(this.maxWeightRaw);
        },
    },

    methods: {
        addItem() {
            this.itemListRaw.push(["",""]);
        },
        removeItem() {
            this.itemListRaw.splice(-1);
        },

        async renderCurrentStep (step: number) {
            this.calculate();
            if (this.steps[step])
                await this.$renderDiagram(this.steps[step], {
                    parentElement: this.$refs.diagram,
                    replaceContents: true
                });

        },

        async calculate () {
            let m = Array(this.itemList.length + 1).fill(0).map(_ => Array(this.maxWeight + 1).fill(0));

            for (let i = 0; i < this.maxWeightRaw + 1; i++) {
                m[0][i] = 0; 
            }

            let steps:string[] = [];
            
            let getDiagString = (item?: number) => {
                let diagString = 'node [shape=record]\n table [label="';

                diagString += '{'
                for (let i = 0; i < this.itemList.length + 1; i++) {
                    diagString += i > 0 ? `|Nr. Item: ${i}` :` / `;
                }
                diagString += '}'

                for (let x = 0; x < this.maxWeight + 1; x++) {
                    diagString += '|{';
                    for (let y = 0; y < this.itemList.length + 1; y++) {
                        let v = m[y][x];
                        diagString += y > 0 ? `|<t${x}${y}>${v}` : `<t${x}${y}>${v}`;
                    }
                    diagString+= '}';
                }

                diagString += '"]'

                
                let tempF = item !== undefined ? `${diagString}\nitem [label="{ item | {Value | Weight} | {<v>${this.itemList[item][0]}|<w>${this.itemList[item][1]}}}"]` : diagString;
                let temp = tempF;
                let step = ([oy, ox]: [number, number], [dy, dx]: [number, number], msg: string ) => {
                    steps.push(`${temp}\ntable:t${ox}${oy} -> table:t${dx}${dy} [label="${msg}"]`);
                };
                let stepS = (origin: boolean, [oy, ox]: [number, number], other: string, msg: string, extra?: string ) => {
                    let temp2 = temp;
                    if (extra) temp2 = temp + "\n" + extra;
                    if (origin) {
                        steps.push(`${temp2}\ntable:t${ox}${oy} -> ${other} [label="${msg}"]`);
                    } else {
                        steps.push(`${temp2}\n${other} -> table:t${ox}${oy} [label="${msg}"]`);
                    }
                };
                let stepNoT = (origin:string, other: string, msg: string, extra?: string ) => {
                    let temp2 = temp;
                    if (extra) temp2 = temp + "\n" + extra;
                    steps.push(`${temp2}\n${origin} -> ${other} [label="${msg}"]`);
                    
                };
                let stepNoTs = (origin: string[], other: string[], msg: string[], extra?: string ) => {
                    let temp2 = temp;
                    if (extra) temp2 = temp + "\n" + extra;
                    for (let i in origin) {
                        temp2 += `\n${origin[i]} -> ${other[i]} [label="${msg[i]}"]`
                    }
                    steps.push(temp2);
                };
                let resetTemp = () => temp = tempF;
                let updateTemp = (t:string) => temp += "\n" + t;
                let stepNoMsg = () => steps.push(temp);
                return {step, stepS, stepNoMsg, stepNoT, resetTemp, updateTemp, stepNoTs};
            }

            let createVar = (nName:string, name: string, value: any) => {
                return `${nName} [label="{${name}|${value}}"]`
            }

            let solveBottomUp = () => {
                for (let y = 1; y < m.length; y++) {
                    let s = getDiagString(y-1);
                    for (let x = 1; x < this.maxWeight + 1; x++) {
                        let item = this.itemList[y - 1];
                        s.stepNoT("item:w", "cw", "Check if it's bigger", `cw [label="Current Weight: ${x}"]`)
                        if (x < item[1]) {
                            s.stepNoT("item:w", "cw", "It's bigger", `cw [label="Current Weight: ${x}"]`)
                            s.step([y -1, x], [y, x], "Set the value");
                            m[y][x] = m[y-1][x];
                            s = getDiagString(y-1);
                            s.stepNoMsg();
                        } else {
                            s.stepNoT("item:w", "cw", "It's smaller", `cw [label="Current Weight: ${x}"]`)
                            let v1 = m[y - 1][x];
                            s.updateTemp(`v1 [label="{m[y-1, x] | ${v1}}"]`)
                            s.stepS(true, [y-1, x], "v1", "Get value");
                            let v2 = item[0] + m[y - 1][x - item[1]];
                            s.updateTemp(`v2 [label="{sum|${v2}}"]`)
                            s.stepNoTs(['item:v', `table:t${x - item[1]}${y-1}`], ["v2", "v2"], ["sum", "sum"]);
                            let max = Math.max(v1, v2);
                            s.updateTemp(`max [label="{max|${max}}"]`)
                            s.stepNoTs(['v1', 'v2'], ['max', 'max'], ['max', 'max']);
                            m[y][x] = max;
                            s = getDiagString(y-1);
                            s.updateTemp(`max [label="{max|${max}}"]`)
                            s.stepS(false, [y, x], 'max', "Set Value");
                            s.resetTemp();
                        }
                    }
                }
            }
            let s = getDiagString();
            let solveOpt = (index: number, weight: number) => {
                if (index == 0) return 0;

                let r = m[index][weight];
                s = getDiagString();

                if (r == 0) {
                    s.step([index, weight], [index, weight], 'It\'s calculate it\'s value');
                    let i = this.itemList[index - 1]

                    s = getDiagString(index - 1);
                    s.updateTemp(createVar('w', 'Weight', weight));
                    s.stepNoT("item:w", "w", 'Check if it\'s bigger!');
                    if (i[1] > weight) {
                        s.step([index, weight], [index - 1, weight], 'Calculate the best value that fit\'s in the bag');
                        r = solveOpt(index - 1, weight); 
                        s.step([index - 1, weight], [index, weight], 'Set as the optimal value');
                    } else {
                        
                        s.stepNoTs([`table:t${weight}${index}`, `item:w`], [`table:t${weight-i[1]}${index-1}`, `table:t${weight-i[1]}${index-1}`], ['It\'s calculate it\'s value', 'Based on it\'s weight']);
                        let v1 = solveOpt(index-1, weight - i[1]);
                        s = getDiagString(index - 1);
                        s.updateTemp(createVar('sum', 'Sum', i[0] + v1));
                        s.stepNoTs(['item:v', `table:t${weight - i[1]}${index-1}`], ['sum', 'sum'], ['Sum', 'Sum']);
                        s.step([index,weight], [index-1,weight], 'It\'s calculate it\'s value');
                        let v2 = solveOpt(index-1, weight);
                        s = getDiagString(index - 1);
                        s.updateTemp(createVar('sum', 'Sum', i[0] + v1));
                        r = Math.max(v2, i[0] + v1);
                        s.updateTemp(createVar('max', 'Max', r));
                        s.stepNoTs(['sum', `table:t${weight}${index-1}`], ['max', 'max'], ['Max', 'Max']);
                        s.stepS(false, [index, weight], 'max', 'Set Value');
                    }

                }
                
                m[index][weight] = r;
                s = getDiagString();
                s.stepNoMsg();
                return r;
            }

            if (this.bottUp == 1)
                solveBottomUp();
            else
                solveOpt(this.itemList.length, this.maxWeight);

            this.chapter1Length = steps.length;
            s = getDiagString(); 
            let lookIndex = this.itemList.length;
            let lookWeight = this.maxWeight;


            let itemsResult: number[] = [];

            s.updateTemp(createVar('result', 'Result Items', `{${itemsResult.map(a => `Item: ${a + 1}`)}}`));
            s.updateTemp(createVar('li', 'Look Index', lookIndex ))
            s.updateTemp(createVar('lw', 'Look Weight', lookWeight ))
            s.stepNoMsg();

            while(true) {
                s.stepNoT('li', 'li', 'Check if it\' not 0')
                if (lookIndex == 0) {
                    s.stepNoT('li', 'li', 'It\'s 0');
                    break;
                }

                s.step([lookIndex - 1, lookWeight], [lookIndex, lookWeight], "Check if bigger or equals to")
                if (m[lookIndex][lookWeight] <= m[(lookIndex - 1)][lookWeight]) {
                    s.step([lookIndex - 1, lookWeight], [lookIndex, lookWeight], "It's bigger do nothing");
                } else {
                    itemsResult.push(lookIndex - 1);
                    s.resetTemp();
                    s.updateTemp(createVar('result', 'Result Items', `{${itemsResult.map(a => `Item: ${a + 1}`)}}`));
                    s.updateTemp(createVar('li', 'Look Index', lookIndex ))
                    s.updateTemp(createVar('lw', 'Look Weight', lookWeight ))
                    s.stepNoT('li', 'result', "Get the current item add it to the result list");

                    s = getDiagString(lookIndex-1); 
                    lookWeight = lookWeight - this.itemList[lookIndex - 1][1];
                    s.updateTemp(createVar('result', 'Result Items', `{${itemsResult.map(a => `Item: ${a + 1}`)}}`));
                    s.updateTemp(createVar('li', 'Look Index', lookIndex ))
                    s.updateTemp(createVar('lw', 'Look Weight', lookWeight ))
                    s.stepNoT('item:w', 'lw', "Subtract");
                    s = getDiagString(); 
                }
                s.resetTemp();
                lookIndex = lookIndex - 1;
                s.updateTemp(createVar('result', 'Result Items', `{${itemsResult.map(a => `Item: ${a + 1}`)}}`));
                s.updateTemp(createVar('li', 'Look Index', lookIndex ))
                s.updateTemp(createVar('lw', 'Look Weight', lookWeight ))
                s.stepNoT('li', 'li', "-1");
            }

            steps.push(`node [shape=record]\n${createVar('a', 'Result Items', `{${itemsResult.map(a => `Item: ${a + 1}`)}}`)}`)
            //steps.push(createVar('a', 'Result Value', `{${itemsResult.map(a => `Item: ${a}`)}}`))

            this.steps = steps;
            this.m = m;
        }

    }


});
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

