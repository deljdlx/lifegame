<!DOCTYPE html>
<html>

<head>
	<script src="vendor/babelcore.js"></script>
	<script src="vendor/react/build/react.js"></script>
	<script src="vendor/react/build/react-dom.js"></script>

	<script src="source/class/Map.js"></script>
	<script src="source/class/Sprite.js"></script>
	<script src="source/class/GameTrigger.js"></script>

	<style>

		.map {
			position:absolute;
			left:50%;
		}

		li.sprite-container {
			list-style: none;
			position: absolute;
			/*outline: solid 1px rgba(255,0,0,0.05);*/
			color: rgba(0, 0, 0, 0);
			width:122px;
			height:84px;
			line-height: 20px;
			text-align:center;
		}


		.sprite-grass.dead {
			background-image: url(image/00-grass.png);
		}

		.sprite-grass.alive {
			background-image: url(image/00-grass-2.png);

		}
	</style>

</head>

<body>


<div id="container">
	<!-- This element's contents will be replaced with your component. -->
</div>




<script>




	ReactDOM.render(
		React.createElement(IsoMap.Map, {
			spriteClass: IsoMap.GameTrigger,
			sizes : {
				width:32,
				height: 32
			},
			cellSizes: {
				width: 64,
				height: 52,
				offsetTop:-20
			},
		})
		,document.getElementById('container')
	);


</script>


</body>

</html>
