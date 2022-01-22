export type StringIndexed<T = string> = { [key: string]: T };

export const stepBuilderBuilder = (steps: string[], nodeNames: string[]) => {
  let stepBuilder = (
    graph: StringIndexed<number>,
    color: string,
    {
      baseStringProp,
      ignoreZero,
      prefix,
      middle,
      extra: extraProp
    }: {
      baseStringProp?: string;
      ignoreZero?: boolean;
      prefix?: string;
      middle?: string;
      extra?: StringIndexed<any>
    }
  ) => {
    let list: string[] = [];
    let vars: { [key: string]: [string, any] } = {};
    let title: string | null = null;
    let colors: { [key: string]: string } = {};
    let baseStringDef = "rank=LR; constraint=false;\n";
    let baseString = "rank=LR; constraint=false;\n";
    let extra: StringIndexed<any> = extraProp ?? {};

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

    let updateBaseString = (graph: StringIndexed<number>) =>
      (baseString =
        baseStringDef +
        (baseStringProp ? baseStringProp + "\n" : "") +
        nodeNames.map((a) => `${prefix ?? ''}${a} [label="${a}${extra[a] ? `:${extra[a]}` : ''}"]`).join("\n") +
        Object.keys(graph)
          .map((a) => {
            let s = a.split("-");
            return { o: s[0], d: s[1], cap: graph[a] };
          })
          .filter((a) => !(ignoreZero && a.cap == 0))
          .map((a) =>
            middle
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
          .join("\n"));

    updateBaseString(graph);


    let calculated = baseString;

    let stepNothing = () => steps.push(calculated);

    let getCalculated = () => calculated;

    let updateExtra = (extraProp: StringIndexed<any>) => {
        extra = extraProp;
        updateBaseString(graph);
    }

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

    let createVarF = (nName: string, name: string, value: any) => {
      return `${nName} [shape=record, label="{${name}|${value}}"]`;
    };

    let recalculate = () => {
      calculated =
        baseString +
        "\n" +
        list.join("\n") +
        "\n" +
        Object.keys(vars)
          .map((a) => createVarF(a, vars[a][0], vars[a][1]))
          .join("\n") +
        "\n" +
        (title ? `labelloc="t";\nlabel="${title}";` : "");
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
        updateBaseString(graph);
    }

    let deleteColor = (t: string) => {
        delete colors[t];
        updateBaseString(graph);
    }

    let stepAction = (action: string) => {
      steps.push(
        `${calculated}\n_tempAction [shape=plaintext, label="${action}"]`
      );
    };

    return {
      baseString,
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
