# Adding new facet type

## Creating a new typename

First we have to create a new string for type. The name will used in `Resources/Private/Partials/Facets/Facet/` as classname.

Inside the template two parts are implemented:

### Javascript embedding

 Example
```
<s:page.script name="find_geohash">
	$(function(){});
</s:page.script>
```

### HTML embedding
```
<div class="facetMap-container">
	<div id="schaufenster_heatmap" class="heatmapContainer"></div>
</div>
```


plugin.tx_find.settings.queryFields.type
