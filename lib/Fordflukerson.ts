import { StepBuilder, StringIndexed } from "./GraphTools";
import { PlaybackChapter } from "./PlaybackControls";

export interface ItemRaw {
  origin: string;
  destination: string;
  capacity: string;
}

export interface Item<T = number> {
  origin: string;
  destination: string;
  capacity: T;
}

export const fordSolver = (
  scaledPos: StringIndexed<[number, number]>,
  itemList: Item[],
  stepBuilder: StepBuilder,
  nodeNames: string[],
  chapters: PlaybackChapter[],
  steps: string[]
): [
  string[],
  PlaybackChapter[],
  StringIndexed<number>,
  StringIndexed<number>,
  StringIndexed<number>
] => {
  let residualGraph: StringIndexed<number> = {};
  let flowGraph: StringIndexed<number> = {};
  let graph: StringIndexed<number> = {};
  for (let item of itemList) {
    residualGraph[`${item.origin}-${item.destination}`] = item.capacity;
    flowGraph[`${item.origin}-${item.destination}`] = 0;
    graph[`${item.origin}-${item.destination}`] = item.capacity;
  }

  let xs = Object.keys(scaledPos).map((a) => scaledPos[a][0]);
  let ys = Object.keys(scaledPos).map((a) => scaledPos[a][1]);

  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);

  let s = stepBuilder(graph, "GREY", {
    middle: "gm",
    rankdir: "LR",
    pos: scaledPos,
    variablePos: [xs[xs.length - 1] + 5, ys[0] - 2],
    forceVariablePos: true,
    moveVariableDirection: "down",
  });
  let residual = stepBuilder(residualGraph, "RED", {
    middle: "rm",
    //ignoreZero: true,
    prefix: "m",
    pos: scaledPos,
    yOffset: ys[0] - 2,
  });
  let flow = stepBuilder(flowGraph, "green", { middle: "fm", pos: scaledPos });
  s.updateTitle("Default graph");
  s.stepNothing();
  s.linkGraph("residual", residual);
  s.linkGraph("flow", flow);

  let search = (): [boolean, StringIndexed] => {
    s.updateTitle("Currently Searching");

    let q = ["s"];
    let visited = new Set(q);
    let parent: StringIndexed = {};

    s.createVar("_q", "Queue", "s");
    s.createVar("_v", "Visited", "s");
    s.createVar("_parent", "Parent", "");

    // Standard BFS Loop
    s.stepAction("Check if the Queue is not empty");
    while (q.length !== 0) {
      let [nName, ...q1] = q;
      q = q1;
      s.createVar("_top", "Value", nName);
      s.setVar("_q", s.arrayToList(q));
      s.addToList(s.createArrow("_q", "_top", {}), true);
      s.popList();
      for (let item of nodeNames) {
        if (residualGraph[`${nName}-${item}`] == undefined) continue;
        s.createVar("_item", "Item", item);
        s.addToList(s.createArrow(nName, item, { label: "Searching" }));
        if (residualGraph[`${nName}-${item}`]) {
          residual.addMiddle(`${nName}_${item}`);
          s.addToList(
            s.createArrow(nName, `rm_${nName}_${item}`, {
              label: "Check if > 0",
            })
          );
        }
        s.addToList(
          s.createArrow(item, "_v", { label: "Check if visited" }),
          true
        );
        if (residualGraph[`${nName}-${item}`] > 0 && !visited.has(item)) {
          q.push(item);
          s.setVar("_q", s.arrayToList(q));
          visited.add(item);
          s.setVar("_v", s.arrayToList(Array.from(visited)));
          parent[item] = nName;
          s.setVar("_parent", s.dicToList(parent));
        }
        s.popList();
        if (residualGraph[`${nName}-${item}`]) {
          s.popList();
          residual.removeMiddle(`${nName}_${item}`);
        }
        s.popList(true);
      }
      s.removeVar("_item");
      s.stepAction("Check if the Queue is not empty");
    }

    //Clean up graph
    s.popList();
    s.removeVar("_v");
    s.removeVar("_q");

    s.createVar("_b", 'Search reached \\"t\\"', visited.has("t"));

    chapters.push({
      name: "Search",
      steps:
        steps.length - chapters.map((a) => a.steps).reduce((a, b) => a + b),
    });
    return [visited.has("t"), parent];
  };

  let fordFulkerson = () => {
    let max_flow = 0;

    s.createVar("_mxFlow", "Max Flow", max_flow);

    let [b, parent] = search();
    s.updateTitle("Current step: Ford Fulkerson");

    let [v, u] = ["", ""];

    // Augment the flow while there is path from source
    // to sink

    s.stepAction('Check if search found \\"t\\"');
    while (b) {
      // Find minimum residual capacity of the edges
      // along the path filled by BFS. Or we can say
      // find the maximum flow through the path found.
      let bottleneck = Number.POSITIVE_INFINITY;
      s.createVar("_bt", "Bottleneck", Number.MAX_VALUE);
      s.stepAction("Update residual graph");
      for (v = "t"; v != "s"; v = parent[v]) {
        u = parent[v];
        // update residual graph capacities of the edges and reverse edges along the path

        s.addToList(s.createArrow("_bt", "_bt", { label: "min" }));
        if (residualGraph[`${u}-${v}`] != undefined) {
          residual.addMiddle(`${u}_${v}`);
          s.addToList(
            s.createArrow(`rm_${u}_${v}`, "_bt", { label: "min" }),
            true
          );
          residual.removeMiddle(`${u}_${v}`);
        }

        bottleneck = Math.min(bottleneck, residualGraph[`${u}-${v}`]); // find bottleneck, edge with minimum residual capacity across the edges of the path

        s.setVar("_bt", bottleneck);
        s.popList();
        s.popList(true);
      }

      s.stepAction("Update Flow graph");
      // update flow based on calculated bottleneck and residual graph from the previous loop
      for (v = "t"; v != "s"; v = parent[v]) {
        //s.addToList(stepBuilder(flowGraph, 'GREEN', {middle: 'fg'}).baseString);
        u = parent[v];

        if (graph[`${u}-${v}`] != undefined) {
          s.addMiddle(`${u}_${v}`);
          s.addToList(
            s.createArrow(u, `gm_${u}_${v}`, { label: "Check if > 0" }),
            true
          );
          s.removeMiddle(`${u}_${v}`);
          s.popList();
        }

        let st = "";
        if (graph[`${u}-${v}`] > 0) {
          flowGraph[`${u}-${v}`] = (flowGraph[`${u}-${v}`] ?? 0) + bottleneck;
          flow.addMiddle(`${u}_${v}`);
          st = s.createArrow("_bt", `fm_${u}_${v}`, { label: "+" });
        } else {
          flowGraph[`${v}-${u}`] = (flowGraph[`${v}-${u}`] ?? 0) - bottleneck;
          flow.addMiddle(`${v}_${u}`);
          st = s.createArrow("_bt", `fm_${v}_${u}`, { label: "-" });
        } // backward edge

        flow.updateGraph(flowGraph);
        s.addToList(st, true);
        flow.removeMiddle(`${u}_${v}`);
        flow.removeMiddle(`${v}_${u}`);
        s.popList();

        // update residual graph capacities of the edges and reverse edges along the path

        residual.addMiddle(`${u}_${v}`);
        if (residualGraph[`${v}-${u}`] != undefined) {
          residual.addMiddle(`${v}_${u}`)
          s.addToList(s.createArrow("_bt", `rm_${v}_${u}`, {label:"+"}), true);
        }

        s.addToList(s.createArrow("_bt", `rm_${u}_${v}`, {}), true);
        residualGraph[`${u}-${v}`] -= bottleneck; // forward edge
        residualGraph[`${v}-${u}`] = (residualGraph[`${v}-${u}`] ?? 0) + bottleneck; // backward edge
        residual.updateGraph(residualGraph);

        residual.removeMiddle(`${u}_${v}`);
        if (residualGraph[`${v}-${u}`] != undefined) {
          residual.removeMiddle(`${v}_${u}`)
          s.popList();
        }
        s.popList(true);



      }

      max_flow += bottleneck;
      s.setVar("_mxFlow", max_flow);

      chapters.push({
        name: "Ford Fulkerson",
        steps:
          steps.length - chapters.map((a) => a.steps).reduce((a, b) => a + b),
      });
      [b, parent] = search();

      s.updateTitle("Current step: Ford Fulkerson");
      s.stepAction('Check if search found \\"t\\"');
    }


    return max_flow;
  };

  let maxF = fordFulkerson();

  //s = stepBuilder(flowGraph, 'green', {});
  s.dropVars();
  s.createVar("_mx", "Max Flow", maxF);
  s.removeLinkGraph("residual");
  s.updateTitle("Result");
  s.stepNothing();
  chapters.push({ name: "Result", steps: 1 });
  //s.addToList(stepBuilder(graph, 'grey', {}).baseString, true);

  return [steps, chapters, graph, flowGraph, residualGraph];
};
