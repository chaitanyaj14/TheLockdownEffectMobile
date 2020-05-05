function functionLSTDelhi() {

    var chart = new CanvasJS.Chart("chartContainerDelhi", {
        animationEnabled: true,
        title: {
            text: "Delhi: Land Surface Temperature Terra-Aqua, 2018-2020"
        },
        axisY: {
            title: "Kelvin"
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true,
            content: toolTipFormatter
        },
        data: [{
            type: "bar",
            showInLegend: true,
            name: "2018",
            color: "#4F81BC",
            dataPoints: [
                { y: 306.95, label: "Terra" },
                { y: 310.69, label: "Aqua" }
            ]
        },
        {
            type: "bar",
            showInLegend: true,
            name: "2019",
            color: "#C0504E",
            dataPoints: [

                { y: 306.46, label: "Terra" },
                { y: 310.15, label: "Aqua" }
            ]
        },
        {
            type: "bar",
            showInLegend: true,
            name: "2020",
            color: "#9ed932",
            dataPoints: [

                { y: 305.29, label: "Terra" },
                { y: 308.70, label: "Aqua" }
            ]
        }]
    });
    chart.render();

    function toolTipFormatter(e) {
        var str = "";
        var total = 0;
        var str3;
        var str2;
        for (var i = 0; i < e.entries.length; i++) {
            var str1 = "<span style= \"color:" + e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>" + e.entries[i].dataPoint.y + "</strong> <br/>";
            total = e.entries[i].dataPoint.y + total;
            str = str.concat(str1);
        }
        str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";

        return (str2.concat(str));
    }

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

}
