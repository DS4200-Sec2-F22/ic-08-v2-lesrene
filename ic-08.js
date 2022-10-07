const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left:50, right:50, top:50, bottom:50}

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

const FRAME1 = d3.select('#vis1')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_WIDTH)
					.attr('class', 'frame')


d3.csv('data/data.csv').then((data) => {

	const MAX_Y = d3.max(data, (d) => {
		return d.Value;
	});


	const X_SCALE = d3.scaleBand()
						.domain(data.map( (d) => {
							return d.Category;
						}))
						.range([0,VIS_WIDTH]);

	const Y_SCALE = d3.scaleLinear() 
                  .domain(0, [(MAX_Y + 10000)])  
                  .range([VIS_HEIGHT, 0]); 

	FRAME1.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
				.attr('x', (d) => {
					return X_SCALE(d.Category); 
				})
				.attr('y', (d) => {
					return Y_SCALE(d.Value);
				})
				.attr('width', X_SCALE.bandwidth)
				.attr('height', (d) => {
					return VIS_HEIGHT - Y_SCALE(d.Value);
				})
				.attr('class', 'bar')

	FRAME1.append('g')
		.attr('transform', 'translate('+MARGINS.left+','+ (VIS_HEIGHT + MARGINS.top)+')')
		.call(d3.axisBottom(X_SCALE))
			.attr('font-size', '20px');

	FRAME1.append("g") 
      .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
      	.call(d3.axisLeft(Y_SCALE).ticks(10)) 
        .attr("font-size", '20px'); 


});


