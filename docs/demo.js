import React, { useMemo, useState } from "react";
import ChartistGraph from "react-chartist";
import { createRoot } from "react-dom/client";

const h = React.createElement;
const chartTypes = ["Line", "Bar", "Pie"];
const samples = [
  [8, 12, 9, 15, 18, 14, 22],
  [11, 7, 14, 10, 20, 17, 24],
  [6, 10, 16, 13, 17, 21, 19],
];

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function chartConfig(type, sampleIndex) {
  const values = samples[sampleIndex];

  if (type === "Pie") {
    return {
      data: {
        labels: ["Product", "Platform", "Support"],
        series: [values[2] + 12, values[4] + 8, values[6]],
      },
      options: {
        chartPadding: 20,
        donut: true,
        donutWidth: 26,
        labelOffset: 30,
        showLabel: true,
      },
    };
  }

  if (type === "Bar") {
    return {
      data: { labels, series: [values] },
      options: {
        axisY: { onlyInteger: true },
        chartPadding: { top: 20, right: 18, bottom: 0, left: 0 },
        distributeSeries: false,
        high: 26,
        low: 0,
      },
    };
  }

  return {
    data: { labels, series: [values] },
    options: {
      axisY: { onlyInteger: true },
      chartPadding: { top: 20, right: 18, bottom: 0, left: 0 },
      fullWidth: true,
      high: 26,
      lineSmooth: false,
      low: 0,
      showArea: true,
    },
  };
}

function CodeSample({ type }) {
  const data = type === "Pie" ? "{ series: [28, 31, 24] }" : "{ labels, series: [[8, 12, 9, 15]] }";
  const code = `<ChartistGraph\n  data={${data}}\n  type="${type}"\n/>`;

  return h(
    "pre",
    { className: "code-sample", "aria-label": `${type} chart React example` },
    h("code", null, code),
  );
}

function App() {
  const [type, setType] = useState("Line");
  const [sampleIndex, setSampleIndex] = useState(0);
  const [lastEvent, setLastEvent] = useState("waiting for Chartist");
  const config = useMemo(() => chartConfig(type, sampleIndex), [type, sampleIndex]);
  const listener = useMemo(
    () => ({
      created: () => setLastEvent("created event received"),
    }),
    [],
  );

  function chooseType(nextType) {
    setLastEvent("recreating chart");
    setType(nextType);
  }

  function updateData() {
    setLastEvent("updating data");
    setSampleIndex((current) => (current + 1) % samples.length);
  }

  return h(
    "div",
    { className: "site-shell" },
    h(
      "header",
      { className: "site-header" },
      h(
        "a",
        { className: "wordmark", href: "https://github.com/fraserxu/react-chartist" },
        h("span", { "aria-hidden": "true", className: "wordmark-mark" }, "⌁"),
        "react-chartist",
      ),
      h(
        "nav",
        { "aria-label": "Project links" },
        h("a", { href: "https://www.npmjs.com/package/react-chartist" }, "npm"),
        h("a", { href: "https://github.com/fraserxu/react-chartist" }, "GitHub"),
        h("span", { className: "version-pill" }, "v1.0.0"),
      ),
    ),
    h(
      "main",
      null,
      h(
        "section",
        { className: "hero" },
        h(
          "div",
          { className: "hero-copy" },
          h("p", { className: "eyebrow" }, "React 18/19 × Chartist 1.5"),
          h("h1", null, "Charts that speak React."),
          h(
            "p",
            { className: "lede" },
            "A small, typed component for Line, Bar, and Pie charts—now rebuilt for the modern Chartist API.",
          ),
          h(
            "div",
            { className: "install-line" },
            h("span", { "aria-hidden": "true" }, "$"),
            h("code", null, "npm install react-chartist chartist"),
          ),
        ),
        h(
          "aside",
          { className: "release-note", "aria-label": "Release status" },
          h("span", { className: "signal-dot", "aria-hidden": "true" }),
          h(
            "div",
            null,
            h("strong", null, "Stable release"),
            h("span", null, "Published with provenance"),
          ),
        ),
      ),
      h(
        "section",
        { className: "workbench", "aria-labelledby": "workbench-title" },
        h(
          "div",
          { className: "workbench-toolbar" },
          h(
            "div",
            null,
            h("p", { className: "eyebrow" }, "Live component"),
            h("h2", { id: "workbench-title" }, "Switch the constructor. Keep the API."),
          ),
          h(
            "div",
            { className: "chart-tabs", role: "tablist", "aria-label": "Chart type" },
            ...chartTypes.map((chartType) =>
              h(
                "button",
                {
                  "aria-selected": type === chartType,
                  className: type === chartType ? "is-active" : "",
                  key: chartType,
                  onClick: () => chooseType(chartType),
                  role: "tab",
                  type: "button",
                },
                chartType,
              ),
            ),
          ),
        ),
        h(
          "div",
          { className: "plotter-frame", "data-chart": type.toLowerCase() },
          h("span", { className: "plotter-coordinate plotter-coordinate-x" }, "x / 07"),
          h("span", { className: "plotter-coordinate plotter-coordinate-y" }, "y / 26"),
          h(ChartistGraph, {
            "aria-label": `${type} chart showing a seven-day sample`,
            className: "demo-chart",
            data: config.data,
            listener,
            options: config.options,
            role: "img",
            type,
          }),
        ),
        h(
          "div",
          { className: "workbench-footer" },
          h(
            "p",
            { className: "event-readout", "aria-live": "polite" },
            h("span", { "aria-hidden": "true" }, "●"),
            lastEvent,
          ),
          h(
            "button",
            { className: "update-button", onClick: updateData, type: "button" },
            "Update data ↗",
          ),
        ),
      ),
      h(
        "section",
        { className: "api-section", "aria-labelledby": "api-title" },
        h(
          "div",
          null,
          h("p", { className: "eyebrow" }, "The familiar API"),
          h("h2", { id: "api-title" }, "One component, typed to the chart you choose."),
          h(
            "p",
            null,
            "Data and options update in place. Changing the chart type safely recreates the Chartist instance.",
          ),
          h(
            "a",
            { className: "text-link", href: "https://github.com/fraserxu/react-chartist#usage" },
            "Read the documentation →",
          ),
        ),
        h(CodeSample, { type }),
      ),
    ),
    h(
      "footer",
      { className: "site-footer" },
      h("span", null, "MIT licensed · Fraser Xu"),
      h("span", null, "Rendered live in your browser"),
    ),
  );
}

createRoot(document.getElementById("root")).render(h(App));
