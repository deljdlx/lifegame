
IsoMap.GameTrigger = React.createClass({


	getDefaultProps: function() {
		return {
			seuil: 0.5,
			width: 122,
			height: 84,
		}
	},


	getInitialState: function () {

		if(Math.random()>this.props.seuil) {
			return {
				status: 'alive'
			};
		}
		else {
			return {
				status: 'dead'
			};
		}

	},



	live: function() {
		this.setState({
			status: 'alive'
		});
	},

	die: function() {
		this.setState({
			status: 'dead'
		});
	},

	isAlive: function() {
		if(this.state.status=='alive') {
			return true;
		}
		else {
			return false;
		}
	},


	render: function() {

		return React.createElement("div", {
			style: {
				width: this.props.width,
				height: this.props.height,
			},
			"data-test": "test",
			className: "sprite-grass "+this.state.status,
			dangerouslySetInnerHTML: { __html:  this.props.x+'-'+this.props.y},
			onClick: this.onClick
		})
	}
});
