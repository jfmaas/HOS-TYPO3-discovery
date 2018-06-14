$(document).ready(function() {
    /* Fancifizierung der Publisher */
    var values = [];
    var colors = [];
    var labels = [];
    $('.facet-id-publisher li').each(function(ndx, elem) {
        var that = $(this);
        if (ndx < 17) {
            labels.push(that.attr('value'));
            values.push(that.attr('count'));
            colors.push(getRandomColor(false));
        }
    });
    var data = {
        datasets: [{
            data: values,
            backgroundColor: colors
        }],
        labels: labels
    };
    $(".facet-id-publisher").html('<h1>HerausgeberIn</h1><canvas height="100" width="100%" id="canvaspublisher"/>');
    try {
        function onPieClick(event, elem) {
            if (elem[0] != undefined) {
                startNextSearch(labels[elem[0]._index]);
            }
        }

        function onLegendClick(event, elem) {
            startNextSearch(elem.text);
        };

        function startNextSearch(label) {
            var link = "index.php?id=1&tx_find_find[controller]=Search&tx_find_find[facet][publisher][###NEEDLE###]=1#tx_find";
            $.toast({
                message: 'Suche nach Veröffentlichungen des Herausgebers „' + label + '“', // this is the only required field
                timeout: 3000, // sepcify time in ms after the toast closes. set to false or 0 to disable
                button: {
                    text: 'OK', // the button text, will be transformed into uppercase automatically
                }
            });
            self.location = link.replace('###NEEDLE###', encodeURI(label));
        }

        var ctx = $("#canvaspublisher")[0].getContext("2d");
        var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                legend: {
                    onClick: onLegendClick,
                    display: false,
                    position: 'bottom',
                    labels: {

                    }
                },
                onClick: onPieClick
            }
        });
    } catch (e) {}

    function getRandomColor(monochrome) {
        var letters = '0123456789ABCDEF',
            color = '#';
        if (monochrome == true) {
          var color = ''+letters[Math.floor(Math.random() * 16)] +letters[Math.floor(Math.random() * 16)];
           return '#'+color + color+color;
        } else {
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        }

    }

});
