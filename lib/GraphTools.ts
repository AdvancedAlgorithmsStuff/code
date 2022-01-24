import {Item} from './Fordflukerson';
export type StringIndexed<T = string> = { [key: string]: T };


interface StepBuilderResult {
  linkGraph: (name: string, g: StepBuilderResult) => void;
  removeLinkGraph: (name: string) => void;
  updateGraph: (g: StringIndexed<any>) => void;
  getBaseString: () => string;
  addMiddle: (s: string) => void;
  removeMiddle: (s: string) => void;
  mapColors: (fn: (s: StringIndexed) => StringIndexed) => void;
  dropVars: () => void;
  stepAction: (s: string) => void;
  arrayToList: (s: any[]) => string;
  updateBaseString: () => void;
  getCalculated: () => string;
  stepNothing: () => void;
  addToList: (s: string, b?: boolean) => void;
  popList: (b?: boolean) => void;
  createArrow: (
    origin: string,
    destination: string,
    { label, color }: { label?: string; color?: string; shape?: string }
  ) => string;
  removeVar: (s: string) => void;
  setVar: (s: string, v: any) => void;
  updateTitle: (s: string) => void;
  createVar: (nName: string, name: string, v: any) => void;
  createMiddleArrow: (
    center: string,
    origin: string,
    destination: string,
    { label, color }: { label?: string; color?: string; shape?: string }
  ) => string;
  dicToList: (d: StringIndexed) => string;
  setColor: (n: string, c: string) => void;
  deleteColor: (n: string) => void;
  updateExtra: (d: StringIndexed<any>) => void;
}

export type StepBuilder = (
  graph: StringIndexed<any>,
  color: string,
  {
    baseStringProp,
    ignoreZero,
    prefix,
    middle,
    extra: extraProp,
    allMiddle,
    rankdir,
    pos,
    yOffset,
    variablePos,
    forceVariablePos,
    moveVariableDirection,
  }: {
    baseStringProp?: string;
    ignoreZero?: boolean;
    prefix?: string;
    middle?: string;
    allMiddle?: boolean;
  extra?: StringIndexed<any>;
  rankdir?: string;
  pos?: StringIndexed<[number, number]>;
  yOffset?: number;
  variablePos?: [number, number];
  forceVariablePos?: boolean;
  moveVariableDirection?: "down" | "right";
}
) => StepBuilderResult;
export const stepBuilderBuilder = (steps: string[], nodeNames: string[]) => {
let stepBuilder = (
  graph: StringIndexed<any>,
    color: string,
    {
      baseStringProp,
      ignoreZero,
      prefix,
      middle,
      extra: extraProp,
      allMiddle,
      rankdir,
      pos,
      yOffset,
      variablePos,
      forceVariablePos,
      moveVariableDirection,
    }: {
      baseStringProp?: string;
      ignoreZero?: boolean;
      prefix?: string;
      middle?: string;
      allMiddle?: boolean;
      extra?: StringIndexed<any>;
      rankdir?: string;
      pos?: StringIndexed<[number, number]>;
      yOffset?: number;
      variablePos?: [number, number];
      forceVariablePos?: boolean;
      moveVariableDirection?: "down" | "right";
    }
  ): StepBuilderResult => {
    let list: string[] = [];
    let vars: { [key: string]: [string, any] } = {};
    let title: string | null = null;
    let colors: { [key: string]: string } = {};
    //let baseStringDef = "rank=LR; constraint=false;\n";
    let baseStringDef = "";
    let baseString = baseStringDef;
    let extra: StringIndexed<any> = extraProp ?? {};
    let dynamicMiddle: string[] = [];
    let pGraph = graph;
    let linkedGraphs: StringIndexed<StepBuilderResult> = {};

    let createMiddleArrow = (
      center: string,
      origin: string,
      destination: string,
      { label, color }: { label?: string; color?: string; shape?: string }
    ) => {
      let attr = [];
      if (label) attr.push(`label="${label}"`);
      if (color) attr.push(`color=${color}`);
      return `${center} [shape=point, style=invis, width=0, height=0, label=""]\n${origin} -> ${center}[arrowhead=none, headclip=false, ${attr.join(
        ","
      )}, label=""]\n ${center} -> ${destination} [tailclip=false, constrain=false,${attr.join(
        ","
      )}]`;
    };

    let createArrow = (
      origin: string,
      destination: string,
      { label, color }: { label?: string; color?: string; shape?: string }
    ) => {
      let attr = [];
      if (label) attr.push(`label="${label}"`);
      if (color) attr.push(`color=${color}`);
      return `${origin} -> ${destination} [${attr.join(",")}]`;
    };

    let recalculate = () => {
      counter = 0;
      calculated =
        baseString +
        "\n" +
        list.join("\n") +
        "\n" +
        Object.keys(vars)
          .map((a) => createVarF(a, vars[a][0], vars[a][1]))
          .join("\n") +
        "\n" +
        Object.keys(linkedGraphs)
          .map((a) => linkedGraphs[a].getCalculated())
          .join("\n") +
        "\n" +
        (title ? `labelloc="t";\nlabel="${title}";` : "");
    };

    let updateBaseString = () => {
      baseString =
        baseStringDef +
        (baseStringProp ? baseStringProp + "\n" : "") +
        `${rankdir ? `rankdir=${rankdir};` : ""}\n` +
        nodeNames
          .map(
            (a) =>
              `${prefix ?? ""}${a} [label="${a}${
                extra[a] ? `:${extra[a]}` : ""
              }"${
                pos && pos[a]
                  ? `, pos="${pos[a][0]},${pos[a][1] + (yOffset ?? 0)}!"`
                  : ""
              }]`
          )
          .join("\n") +
        //"}" +
        Object.keys(pGraph)
          .map((a) => {
            let s = a.split("-");
            return { o: s[0], d: s[1], cap: pGraph[a] };
          })
          .filter((a) => !(ignoreZero && a.cap == 0))
          .map((a) =>
            allMiddle || dynamicMiddle.includes(`${a.o}_${a.d}`)
              ? createMiddleArrow(
                  `${middle}_${a.o}_${a.d}`,
                  `${prefix ?? ""}${a.o}`,
                  `${prefix ?? ""}${a.d}`,
                  { label: `${a.cap}`, color: colors[`${a.o}_${a.d}`] ?? color }
                )
              : createArrow(`${prefix ?? ""}${a.o}`, `${prefix ?? ""}${a.d}`, {
                  label: `${a.cap}`,
                  color: colors[`${a.o}_${a.d}`] ?? color,
                })
          )
          .join("\n") +
        "";
      recalculate();
    };

    updateBaseString();

    let calculated = baseString;

    let stepNothing = () => steps.push(calculated);

    let getCalculated = () => calculated;

    let updateExtra = (extraProp: StringIndexed<any>) => {
      extra = extraProp;
      updateBaseString();
    };

    let addToList = (l: string, step?: boolean) => {
      list.push(l);
      recalculate();
      if (step) stepNothing();
    };
    let popList = (step?: boolean) => {
      list.pop();
      recalculate();
      if (step) stepNothing();
    };

    let removeVar = (name: string) => {
      delete vars[name];
      recalculate();
    };

    let createVar = (nodeName: string, name: string, value: any) => {
      vars[nodeName] = [name, value];
      recalculate();
    };

    let setVar = (nodeName: string, value: any) => {
      if (!vars[nodeName]) return;
      vars[nodeName][1] = value;
      recalculate();
    };

    let counter = 0;
    let createVarF = (nName: string, name: string, value: any) => {
      let pos = [...(variablePos ?? [0, 0])];
      if (moveVariableDirection == "down") {
        pos[1] += counter;
      } else {
        pos[0] += counter;
      }
      let s = `${nName} [shape=record, label="{${name}|${value}}"${
        variablePos
          ? `,pos="${pos[0]},${pos[1]}${forceVariablePos ? "!" : ""}"`
          : ""
      }]`;
      counter++;
      return s;
    };

    let arrayToList = (s: string[]) => `${s.join("|")}`;
    let dicToList = (s: StringIndexed) =>
      `${Object.keys(s)
        .map((a) => `${a}: ${s[a]}`)
        .join("|")}`;

    let updateTitle = (t: string | null) => {
      title = t;
      recalculate();
    };

    let setColor = (t: string, color: string) => {
      colors[t] = color;
      updateBaseString();
    };

    let deleteColor = (t: string) => {
      delete colors[t];
      updateBaseString();
    };

    let stepAction = (action: string) => {
      steps.push(
        `${calculated}\n_tempAction [shape=plaintext, label="${action}"]`
      );
    };

    let dropVars = () => {
      vars = {};
      recalculate();
    };

    let mapColors = (fn: (t: StringIndexed) => StringIndexed) => {
      colors = fn(colors);
      updateBaseString();
    };

    let addMiddle = (s: string) => {
      dynamicMiddle.push(s);
      updateBaseString();
    };

    let removeMiddle = (s: string) => {
      dynamicMiddle = dynamicMiddle.filter((a) => a != s);
      updateBaseString();
    };

    let updateGraph = (graph: StringIndexed<any>) => {
      pGraph = graph;
      updateBaseString();
    };

    let getBaseString = () => baseString;

    let linkGraph = (name: string, graphF: StepBuilderResult) => {
      linkedGraphs[name] = graphF;
      recalculate();
    };

    let removeLinkGraph = (name: string) => {
      delete linkedGraphs[name];
      recalculate();
    };

    return {
      linkGraph,
      removeLinkGraph,
      updateGraph,
      getBaseString,
      addMiddle,
      removeMiddle,
      mapColors,
      dropVars,
      stepAction,
      arrayToList,
      updateBaseString,
      getCalculated,
      stepNothing,
      addToList,
      popList,
      createArrow,
      removeVar,
      setVar,
      updateTitle,
      createVar,
      createMiddleArrow,
      dicToList,
      setColor,
      deleteColor,
      updateExtra,
    };
  };
  return stepBuilder;
};


export const ItemListToStringIndexedNumber = <T>(items: Item<T>[]): StringIndexed<number> => {
  let r:StringIndexed<number> = {};
  items.forEach(a => r[`${a.origin}-${a.destination}`] = Number(a.capacity));
  return r;
} 

export const ItemListToStringIndexed = <T>(items: Item<T>[]): StringIndexed<T> => {
  let r:StringIndexed<T> = {};
  items.forEach(a => r[`${a.origin}-${a.destination}`] = a.capacity);
  return r;
} 