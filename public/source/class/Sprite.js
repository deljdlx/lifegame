
IsoMap.Sprite = React.createClass({


	getDefaultProps: function() {
		return {
			width: 122,
			height: 84,
		}
	},

	onClick: function(event) {
		//alert(1);
	},

	//displayName: 'Sprite',

	render: function(test) {


		//var left=this.props.x*this.props.width/2;
		//var top=this.props.y*this.props.height;
		//this.left=this.props.x*(this.props.width/2);



		return React.createElement("div", {
			style: {
				width: this.props.width,
				height: this.props.height,
			},
			"data-test": "test",
			className: "sprite-grass",
			dangerouslySetInnerHTML: { __html:  this.props.x+'-'+this.props.y},
			onClick: this.onClick
		})
	}
});
