$(document).ready(function() {
        /* Fancifizierung der DDC */
        var values = [];
        var colors = [];
        var labels = [];
        var facets = {};
        $('.facet-id-Fachgebiet li').each(function(ndx,elem){
                var that = $(this);
                if (ndx<17) {
                        labels.push(ddc_de[that.attr('value')]);
                        values.push(that.attr('count'));
                        colors.push(getRandomColor());
                }
        });
        $('.facet-id-Fachgebiet li').each(function(ndx,elem){
               var that = $(this);
               var ddc= that.attr('value');
               if (ddc) {
                    ddc = ddc.replace(/\./,'').substring(0,3);
                    if (!facets[ddc]) facets[ddc] = parseInt(values.push(that.attr('count')));
                    else facets[ddc]  += parseInt(that.attr('count'));
               }
        });
        var data = {
                datasets : [{
                        data : values,
                        backgroundColor : colors
                }],
                labels : labels
        };
        $(".facet-id-Fachgebiet").html('<h1>Fachgebiet (DDC)</h1><canvas height="220" width="100%" id="piechartcanvas"/>');
        try {
                function onPieClick(event,elem) {
                        if (elem[0] != undefined) {
                                startNextSearch(labels[elem[0]._index]);
                        }
                }
                function onLegendClick(event, elem) {
                        startNextSearch(elem.text);
                };
                function startNextSearch(label) {
                        // reconverting label to DDC:
                        Object.keys(ddc_de).forEach(function(ddc){
                                if (ddc_de[ddc] == label) {
                                 var link ="index.php?id=1&tx_find_find[controller]=Search&tx_find_find[facet][Fachgebiet][###NEEDLE###]=1#tx_find";
                                self.location=  link.replace('###NEEDLE###',encodeURI(ddc));
                                }
                        });
                }
                var ctx = $("#piechartcanvas")[0].getContext("2d");
                var myPieChart = new Chart(ctx,{
                        type: 'pie',//'doughnut',
                        data : data,
                        options : {
                            legend: {
                                   onClick:onLegendClick,
                                   display:true,position:'bottom',
                                   labels : {

                                   }
                            },
                            onClick : onPieClick
                        }
            });} catch(e) {}
        function getRandomColor() {var letters = '0123456789ABCDEF',color = '#';for (var i = 0; i < 6; i++) {color += letters[Math.floor(Math.random() * 16)];} return color;}
});



function FacetsToTree(DDC,facets) {
	var tree = {name:'ddc',children:[]};
	Object.keys(facets).forEach(function(code){
		var level1 = code2tree(code).level1;
		var level2 = code2tree(code).level2;
		var level3 = code2tree(code).level3;

		var level1Node = getNodeByName(tree.children,level1);
		if (level1Node == null)
			tree.children.push({name:level1,children:[]});

		var level2Node = getNodeByName(level1Node.children,level2);
		if (level2Node == null)
			level1Node.children.push({name:level2,children:[]});
		level2Node.push({name:level3,size:1});

	});
	function code2tree(code){
		return {
			level1 : DDC[code.substring(0,1)+'00'],
			level2 : DDC[code.substring(0,2)+'0'],
			level3 : DDC[code]
		}
	}
	function getNodeByName(children,name) {
		var node = null;
		var res = children.forEach(function(n){
			if (n.name==name) node = n;
		});
		return node;
	}
	return  tree;
}
