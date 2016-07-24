

var IsoMap={};






IsoMap.Map = React.createClass({




	getInitialState: function() {
		return {
			aliveCellsNumber:0
		}
	},







	getDefaultProps: function() {
		var properties={
			spriteClass: IsoMap.GameTrigger,
			interval:300,
			sizes: {
				width: 16,
				height: 16
			},
			cellSizes: {
				width: 122,
				height: 84,
				offsetTop:-24
			},
			cellList: []
		}


		//this.initializeCells();


		return properties;
	},



	//explication des foimules ici https://fr.wikipedia.org/wiki/R%C3%A9solution_d%27un_triangle#Deux_angles_et_le_c.C3.B4t.C3.A9_commun
	getCellByCoord:function(x, y) {

		var data=this.refs.map.getClientRects();
		var relativeX=x-data[0].left-this.props.cellSizes.width/2;
		var relativeY=y-data[0].top;



		var length=Math.sqrt(
			Math.pow(relativeX, 2)+
			Math.pow(relativeY, 2)
		);



		var angle0=
				Math.PI/2
				-this.props.cellSizes.angle0
				-Math.atan(relativeX/relativeY)
		//+Math.PI/2
			;

		var angle1=
				Math.PI
				-angle0
				-(Math.PI-this.props.cellSizes.angle0*2)
			;



		var yLength=(length*Math.sin(angle0))/Math.sin(angle0+angle1);

		var xLength=Math.sqrt(
					Math.pow(yLength, 2)-
					(Math.pow(length, 2)*Math.pow(Math.sin(angle0),2))
				)
				+length*Math.cos(angle0)
			;

		var x=Math.floor(xLength/this.props.cellSizes.sideLength);
		var y=Math.floor(yLength/this.props.cellSizes.sideLength);


		return this.getCellByXY(x, y);
	},


	getCellByRef:function(ref) {
		return this.refs[ref];
	},

	getCellByXY:function(x,y) {
		return this.getCellByRef(
			this.getCellId(x,y)
		);
	},


	getCellId:function(x, y) {
		return 'cell-'+x+'-'+y;
	},


	componentDidMount: function componentDidMount() {
		this.interval = setInterval(this.tick, this.props.interval);
	},

	componentWillUnmount: function componentWillUnmount() {
		clearInterval(this.interval);
	},




	tick:function() {

		var status=[];
		for(var x=0; x <this.props.sizes.width; x++) {
			for(var y=0; y <this.props.sizes.height; y++) {

				var cell=this.getCellByXY(x, y);

				var object={
					cell: cell,
					alive: this.isAlive(cell)
				};
				status.push(object);

			}
		}



		var aliveCellsNumber=0;



		for(var i=0; i<status.length; i++) {



			if(status[i].alive) {
				aliveCellsNumber++;
				status[i].cell.live();
			}
			else {
				status[i].cell.die();
			}
		}

		this.setState({
			aliveCellsNumber:aliveCellsNumber
		});



	},



	isAlive:function(cellule) {
		var aliveNeighbour=0;

		if(cellule.props.x>0) {
			var cell=this.getCellByXY(cellule.props.x-1, cellule.props.y);
			if(cell.isAlive()) {
				aliveNeighbour++;
			}


			if(cellule.props.y>0) {
				var cell=this.getCellByXY(cellule.props.x-1, cellule.props.y-1);
				if(cell.isAlive()) {
					aliveNeighbour++;
				}
			}

			if(cellule.props.y<this.props.sizes.height-1) {
				var cell=this.getCellByXY(cellule.props.x-1, cellule.props.y+1);
				if(cell.isAlive()) {
					aliveNeighbour++;
				}
			}
		}


		if(cellule.props.x<this.props.sizes.width-1) {
			var cell=this.getCellByXY(cellule.props.x+1, cellule.props.y);
			if(cell.isAlive()) {
				aliveNeighbour++;
			}

			//if(aliveNeighbour>3) return false;


			if(cellule.props.y>0) {
				var cell=this.getCellByXY(cellule.props.x+1, cellule.props.y-1);
				if(cell.isAlive()) {
					aliveNeighbour++;
				}
			}

			if(aliveNeighbour>3) return false;


			if(cellule.props.y<this.props.sizes.height-1) {
				var cell=this.getCellByXY(cellule.props.x+1, cellule.props.y+1);
				if(cell.isAlive()) {
					aliveNeighbour++;
				}
			}
		}


		if(cellule.props.y>0) {
			var cell=this.getCellByXY(cellule.props.x, cellule.props.y-1);
			if(cell.isAlive()) {
				aliveNeighbour++;
			}
		}
		if(cellule.props.y<this.props.sizes.height-1) {
			var cell=this.getCellByXY(cellule.props.x, cellule.props.y+1);
			if(cell.isAlive()) {
				aliveNeighbour++;
			}
		}



		if(aliveNeighbour==3) {
			return true;
		}
		else if(aliveNeighbour==2 && cellule.isAlive()) {
			return true;
		}
		else {
			return false;
		}
	},



	resetCells:function() {
		for(var x=0; x <this.props.sizes.width; x++) {
			for(var y=0; y <this.props.sizes.height; y++) {
				var cell=this.getCellByRef(
					this.getCellId(x, y)
				)


				if(Math.random()>0.5) {
					cell.live();
				}
				else {
					cell.die();
				}
			}
		}
	},


	onClick: function(event) {



		var cell=this.getCellByCoord(event.clientX, event.clientY);
		cell.live();
	},




	createCell: function(cell) {


		var sideLength=Math.sqrt(
			Math.pow(this.props.cellSizes.width/2,2)+
			Math.pow((this.props.cellSizes.height+this.props.cellSizes.offsetTop)/2,2)
		);


		this.props.cellSizes.sideLength=sideLength;



		this.props.cellSizes.angle0=Math.atan(
			((this.props.cellSizes.height+this.props.cellSizes.offsetTop)/2)/
			(this.props.cellSizes.width/2)
		);



		var left=
				(cell.y*this.props.cellSizes.width/2)
				- (cell.x*this.props.cellSizes.width/2)
			;
		var top=
				(cell.y*(this.props.cellSizes.height+this.props.cellSizes.offsetTop)/2)
				+ (cell.x*(this.props.cellSizes.height+this.props.cellSizes.offsetTop)/2)

			;

		var sprite=React.createElement(
			this.props.spriteClass, {
				ref: 'cell-'+cell.id,
				//key:'cell-'+cell.id,
				x:cell.y,
				y:cell.x,
				width:this.props.cellSizes.width,
				height:this.props.cellSizes.height,
				seuil: 0.5
			}
		);


		return React.createElement(
			'li',
			{
				key:'cellContainer-'+cell.x+'-'+cell.y,
				className: 'sprite-container',
				style: {
					left: left,
					top: top
				}
			},
			sprite
		);
	},



	initializeCells: function() {

		for(var x=0; x<this.props.sizes.width; x++) {

			for(var y=0;y<this.props.sizes.height; y++) {

				var key=x+'-'+y;

				var cell={
					id:key,
					x:y,
					y:x
				};

				this.props.cellList.push(cell);
			}
		}
	},

	render: function() {



		if(!this.props.cellList.length) {
			this.initializeCells();
		}






		return  React.createElement(
			'div', {},
			'Nombre de cellules vivantes ',
			React.createElement(
				'input', {
					ref: 'aliveCellCounter',
					value: this.state.aliveCellsNumber,
					style: {
						textAlign: 'right'
					}
				}
			),
			React.createElement(
				'ul',
				{
					'ref': 'map',
					className: 'map',
					onClick: this.onClick,
					onMouseOver: this.onMouseOver
				},
				this.props.cellList.map(this.createCell)
			)


		)



		return React.createElement(
			'ul',
			{
				'ref': 'map',
				className: 'map',
				onClick: this.onClick,
				onMouseOver: this.onMouseOver
			},
			this.props.cellList.map(this.createCell)
		);



	}
});


/*

*/